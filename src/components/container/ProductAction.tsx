import { useState } from 'react'

import { useCartContext } from '@/contexts/CartContext'

import { Button, QuantityInput, Stack } from '@/components/ui'
import { AddIcon } from '@/components/icons'
import { ProductType } from '@/lib/types/productType'

export default function ProductAction({ productID }: { productID: ProductType['productID'] }) {
  const { addToCart } = useCartContext()

  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart({ productID, quantity })
    setQuantity(1)
  }

  return (
    <>
      <Stack spacing={0} className='md:space-y-2'>
        <Stack
          direction='row'
          spacing={0}
          className='items-center hidden md:flex md:flex-col md:space-x-0 lg:flex-row lg:items-center lg:space-x-2'
        >
          <QuantityInput
            min={1}
            max={20}
            className='hidden md:flex'
            value={quantity}
            onChange={qty => setQuantity(qty)}
          />
          <div className='md:hidden lg:block text-nowrap'>Stok: 20</div>
        </Stack>
        <Stack direction='row' spacing={2} className='md:flex-col md:space-x-0 md:space-y-2'>
          <Button icon={<AddIcon />} text='Keranjang' className='w-full' onClick={handleAddToCart} />
        </Stack>
      </Stack>
    </>
  )
}
