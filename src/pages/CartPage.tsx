import { useEffect } from 'react'

import { Button, Card, Image, Checkbox, Grid, Stack, Text, Container, QuantityInput } from '@/components/ui'
import { DeleteOutlineIcon } from '@/components/icons'

import { formatPrice } from '@/helper'

import { useCartContext } from '@/context/CartContext'
import { getCartData } from '@/lib/services/productService'

export default function CartPage() {
  const {
    cart,
    selectedProducts,
    setSelectedProducts,
    toggleSelectItem,
    toggleSelectAll,
    setQuantity,
    removeFromCart,
    totalPrice,
    setTotalPrice
  } = useCartContext()
  const data = { data: getCartData(cart) }

  const calculateTotalPrice = () => {
    const total = cart
      .filter(cartItem => selectedProducts.includes(cartItem.productID))
      .reduce((acc, cartItem) => {
        const product = data?.data.find(p => p.productID === cartItem.productID)

        return product ? acc + product.finalPrice * cartItem.quantity : acc
      }, 0)

    setTotalPrice(total)
  }

  useEffect(() => {
    setSelectedProducts(cart.map(item => item.productID))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    calculateTotalPrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts, data?.data])

  return (
    <Container className='!px-0 md:!px-2 pb-16 md:pb-10'>
      <Stack spacing={0} className='md:space-y-2'>
        <Text variant='h2' className='text-2xl md:text-3xl hidden md:block'>
          Cart
        </Text>
        <Grid
          columns={1}
          className='md:grid-cols-[1fr_minmax(0px,248px)] md:gap-x-4 lg:grid-cols-[1fr_minmax(0px,288px)] lg:gap-x-6 md:items-start'
        >
          <Stack spacing={2}>
            {!!data?.data && data.data.length > 0 ? (
              data?.data.map((data, index) => {
                const cartItem = cart.find(item => item.productID === data.productID)

                return (
                  <Card className='flex flex-col space-y-3 md:space-y-4 rounded-none md:rounded-xl py-4' key={index}>
                    <Stack direction='row' spacing={3} className='md:space-x-4'>
                      <Checkbox
                        checked={selectedProducts.includes(data.productID)}
                        onChange={() => toggleSelectItem(data.productID)}
                      />
                      <Stack direction='row' className='md:space-x-4 flex-1'>
                        <Image
                          alt={data.productName}
                          height={100}
                          width={100}
                          src={data.mediaURL}
                          className='self-start h-20 w-20 md:h-24 md:w-24'
                        />
                        <Stack className='flex-1'>
                          <Stack spacing={2} direction='column' className='md:flex-row md:space-x-4 md:space-y-0'>
                            <Stack className='flex-1'>
                              <Text variant='h1' className='text-sm md:text-lg lg:text-lg font-normal'>
                                {data.productName}
                              </Text>
                            </Stack>
                            <Stack spacing={0} className='md:items-end'>
                              <Text variant='h3' className='text-sm md:text-lg'>
                                {formatPrice(data.finalPrice)}
                              </Text>
                              <span className='text-xs md:text-base line-through text-gray-400'>
                                {formatPrice(data.price)}
                              </span>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack direction='row' spacing={6} className='items-center justify-end'>
                      <Button
                        icon={<DeleteOutlineIcon />}
                        variant='ghost'
                        className='py-1 hover:text-danger p-0 h-auto'
                        onClick={() => removeFromCart(data.productID)}
                      />
                      <QuantityInput
                        min={1}
                        max={20}
                        value={cartItem?.quantity}
                        onChange={quantity => setQuantity({ productID: data.productID, quantity })}
                      />
                    </Stack>
                  </Card>
                )
              })
            ) : (
              <Text variant='error' className='text-center'>
                Cart is empty!
              </Text>
            )}
          </Stack>
          <Card className='fixed z-20 bottom-0 md:sticky md:top-[152px] left-0 w-full lg:w-72 py-2.5 sm:px-6 rounded-none md:rounded-md lg:rounded-xl md:h-auto'>
            <Stack spacing={2}>
              <Stack spacing={0} className='md:space-y-4'>
                <Stack direction='row' spacing={4} className='md:flex-col md:space-x-0 md:space-y-2'>
                  <Stack spacing={2} direction='row' className='items-center md:mb-2'>
                    <Checkbox
                      checked={selectedProducts.length === cart.length && cart.length > 0}
                      onChange={toggleSelectAll}
                    />
                    <Stack direction='row' spacing={1}>
                      <span className='text-gray-500 text-sm hidden md:block'>Pilih</span>
                      <span className='text-gray-500 text-sm md:lowercase'>Semua</span>
                    </Stack>
                  </Stack>
                  <Stack spacing={0} className='items-end justify-between flex-1 md:flex-row md:items-center md:mt-2'>
                    <div className='text-xs md:text-sm text-gray-500'>Total</div>
                    <span className='text-sm md:text-lg font-bold'>{formatPrice(totalPrice)}</span>
                  </Stack>
                  <Button text='Checkout' className='w-24 md:w-full' />
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Container>
  )
}
