import type { ProductType } from './productType'

export type CartType = {
  productID: ProductType['productID']
  quantity: number
}
