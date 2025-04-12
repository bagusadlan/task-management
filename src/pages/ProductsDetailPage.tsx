import { useParams } from 'react-router-dom'

import { Card, Grid, Stack, Divider, Image, Container, Text } from '@/components/ui'
import { getProductDetailService } from '@/lib/services/productService'
import ProductAction from '@/components/container/ProductAction'
import { formatPrice } from '@/helper'

export default function ProductsDetailPage() {
  const { productID } = useParams()
  const product = getProductDetailService(String(productID))

  return product ? (
    <>
      <Container className='px-2 pb-6 md:pb-8'>
        <Stack spacing={0} className='md:space-y-4'>
          <Stack spacing={8}>
            <article>
              <Grid
                columns={1}
                className='grid-cols-1 md:grid-cols-[minmax(0px,248px)_1fr_minmax(0px,188px)] md:gap-x-6 lg:grid-cols-[minmax(0px,278px)_1fr_minmax(0px,238px)] lg:gap-x-8 xl:grid-cols-[minmax(0px,348px)_1fr_minmax(0px,288px)] xl:gap-x-[52px]'
              >
                <Image
                  alt={product.productName}
                  src={product.mediaURL}
                  className='rounded-lg border aspect-square object-contain object-center mx-auto'
                  loading='eager'
                />
                <Stack className='overflow-x-hidden'>
                  <Stack className='space-y-0 md:space-y-4'>
                    <Text
                      variant='h1'
                      className='text-lg lg:text-lg font-normal md:font-extrabold order-2 md:-order-1 md:mb-0'
                    >
                      {product.productName}
                    </Text>
                    <Stack direction='row' spacing={2} className='items-center'>
                      <Text variant='h3' className='text-xl'>
                        {formatPrice(product.finalPrice)}
                      </Text>
                      <span className='line-through text-gray-400'>{formatPrice(product.price)}</span>
                    </Stack>
                  </Stack>
                  <div>
                    <Text variant='h2' className='md:first:mt-0 text-md'>
                      Detail produk:
                    </Text>
                    <Stack spacing={1}>
                      <Stack direction='row' spacing={1} className='items-start'>
                        <span className='text-muted-foreground min-w-32 text-sm'>Kondisi</span>
                        <span className='text-sm hidden md:block'>:</span>
                        <span className='text-sm'>{product.condition}</span>
                      </Stack>
                      <Divider className='h-[0.5px] bg-gray-200 md:hidden' />
                      <Stack direction='row' spacing={1}>
                        <span className='text-muted-foreground min-w-32 text-sm'>Min. Pemesanan</span>
                        <span className='text-sm hidden md:block'>:</span>
                        <span className='text-sm'>{product.minimumOrderQuantity}</span>
                      </Stack>
                      <Divider className='h-[0.5px] bg-gray-200 md:hidden' />
                    </Stack>
                  </div>
                  <div>
                    <Text variant='h2' className='text-md'>
                      Deskripsi produk:
                    </Text>
                    <div
                      className='leading-normal text-xs md:text-sm'
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                </Stack>
                <div>
                  <Card className='fixed z-20 bottom-0 md:sticky md:top-[170px] left-0 w-full p-2.5 sm:px-2.5 rounded-none md:rounded-md md:h-auto'>
                    <Stack spacing={2}>
                      <ProductAction productID={String(productID)} />
                    </Stack>
                  </Card>
                </div>
              </Grid>
            </article>
          </Stack>
        </Stack>
      </Container>
      <Divider className='py-1 bg-gray-100' />
      <Container className='py-6 md:py-8 pb-16'>
        <Stack spacing={2} className='w-full md:space-y-4'>
          <Stack direction='row' className='justify-between'>
            <Text variant='h3' className='text-md md:text-2xl'>
              Ulasan Pembeli
            </Text>
          </Stack>
          <div>
            <Text>Belum ada ulasan</Text>
          </div>
        </Stack>
      </Container>
    </>
  ) : (
    <Text variant='error' className='text-center'>
      Product tidak ditemukan
    </Text>
  )
}
