import type { MouseEvent, ReactNode } from 'react'

import { Link } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'

import { motion } from 'framer-motion'

import type { ProductType } from '@/lib/types/productType'
import { ROUTES } from '@/lib/config/routes'
import { useCartContext } from '@/contexts/CartContext'

import { Button, Card, Image, Stack, Text } from '@/components/ui'
import type { CardProps } from '@/components/ui/Card'

import { formatDateTime, formatPrice, formatTime, isDiscountValid } from '@/helper'

type ProductCardProps = CardProps & {
  data: ProductType
  imageAction?: ReactNode
}

export default function ProductCard({ data, className, imageAction, ...props }: ProductCardProps) {
  const { addToCart } = useCartContext()
  const discountStartDateTimeISO = formatDateTime(
    new Date(data.discountStartDate || ''),
    formatTime(new Date(data.discountStartDate || ''))
  )

  const discountEndDateTimeISO = formatDateTime(
    new Date(data.discountEndDate || ''),
    formatTime(new Date(data.discountEndDate || ''))
  )

  const discountValid = isDiscountValid({
    discountActive: data.discountActive,
    discountStartDate: data.discountStartDate ? discountStartDateTimeISO : null,
    discountEndDate: data.discountEndDate ? discountEndDateTimeISO : null
  })

  function handleAddToCart(e: MouseEvent<HTMLElement>, productID: ProductType['productID']) {
    e.stopPropagation()
    e.preventDefault()

    addToCart({ productID, quantity: 1 })
  }

  const imageActionMotion = {
    rest: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'tween'
      }
    },
    hover: {
      opacity: 1,
      y: -16,
      transition: {
        duration: 0.5,
        type: 'tween'
      }
    }
  }

  return (
    <Link to={ROUTES.productsDetailPageRoute.replace(':productID', data.productID)}>
      <Card
        className={twMerge('bg-transparent px-0 py-0 sm:px-0 border-none h-full shadow-transparent', className)}
        {...props}
      >
        <div className='flex flex-col justify-between'>
          <div>
            <motion.div
              initial='rest'
              animate='rest'
              whileHover='hover'
              className="group relative rounded-lg after:md:content-[''] after:md:bg-black/30 after:md:absolute after:md:opacity-0 after:md:duration-500 after:md:w-full after:md:h-full after:md:rounded-lg after:md:top-0 after:md:left-0 hover:after:md:opacity-100 overflow-hidden"
            >
              {discountValid && (
                <div className='absolute z-10 top-0 left-0'>
                  <div className='px-1.5 bg-danger pr-4 rounded-br-full flex items-center justify-center text-xs text-danger-foreground shadow-lg pb-0.5'>
                    {`${data.discountValuePercent}%`}
                  </div>
                </div>
              )}
              <picture className='block overflow-hidden'>
                <Image
                  alt={data.productName}
                  src={data.mediaURL}
                  height={150}
                  width={150}
                  className='w-full rounded-lg border aspect-square object-contain object-center group-hover:md:scale-105 md:ease-in md:duration-300'
                />
              </picture>
              {imageAction ?? (
                <motion.div
                  variants={imageActionMotion}
                  className='hidden md:flex justify-center items-center absolute z-10 inset-x-0 -bottom-2'
                >
                  <Button
                    onClick={e => handleAddToCart(e, data.productID)}
                    className='hidden md:block'
                    text='Add to Cart'
                  />
                </motion.div>
              )}
            </motion.div>
            <Stack spacing={1} className='p-2'>
              <Text variant='h5' className='text-[12px] md:text-sm font-normal md:text-ellipsis'>
                {data.productName}
              </Text>
              <Stack spacing={0} className='md:flex-row md:space-x-2 md:items-center'>
                <Text className='text-sm font-semibold'>{formatPrice(data.finalPrice)}</Text>
                {discountValid && (
                  <Text className='line-through text-gray-400 text-xs sm:text-xs'>{formatPrice(data.price)}</Text>
                )}
              </Stack>
            </Stack>
          </div>
        </div>
      </Card>
    </Link>
  )
}
