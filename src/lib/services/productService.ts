import { ProductType } from '@/lib/types/productType'
import { CartType } from '@/lib/types/cartType'
import { products } from '@/lib/data/dummy'

export const getProductDetailService = (productID: ProductType['productID']) => {
  const response = products.data.find(product => product.productID === productID)

  return productID ? response : null
}

export const getCartData = (cart: CartType[]) => {
  const productsInCart = products.data.filter(product =>
    cart.some(cartItem => cartItem.productID === product.productID)
  )

  return productsInCart ?? []
}
