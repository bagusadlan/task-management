import ProductCard from '@/components/container/ProductCard'
import { Container, Grid, Text } from '@/components/ui'
import { products } from '@/lib/data/dummy'

export default function ProductsPage() {
  return (
    <Container>
      <Text variant='h2' className='text-2xl md:text-3xl'>All Products</Text>
      <Grid columns={1} className='md:mt-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 lg:gap-y-4'>
        {products.data &&
          products.data.length > 0 &&
          products.data.map((product, index) => <ProductCard key={index} data={product} />)}
      </Grid>
    </Container>
  )
}
