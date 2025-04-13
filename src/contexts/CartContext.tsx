import type { Dispatch, SetStateAction } from 'react'
import { createContext, useContext } from 'react'

import type { CartType } from '@/lib/types/cartType'

export type CartContextType = {
  cart: CartType[]
  addToCart: ({ productID, quantity }: CartContextType['cart'][number]) => void
  removeFromCart: (productID?: CartContextType['cart'][number]['productID'] | null) => void
  setQuantity: ({ productID, quantity }: CartContextType['cart'][number]) => void
  decreaseQuantity: ({ productID, quantity }: CartContextType['cart'][number]) => void
  resetCart: () => void

  selectedProducts: string[]
  setSelectedProducts: Dispatch<SetStateAction<CartContextType['selectedProducts']>>
  toggleSelectItem: (productID: CartContextType['cart'][number]['productID']) => void
  toggleSelectAll: () => void

  totalPrice: number
  setTotalPrice: Dispatch<SetStateAction<CartContextType['totalPrice']>>
}

export const cartContextDefaultValue: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  setQuantity: () => {},
  decreaseQuantity: () => {},
  resetCart: () => {},

  selectedProducts: [],
  setSelectedProducts: () => {},
  toggleSelectItem: () => {},
  toggleSelectAll: () => {},

  totalPrice: 0,
  setTotalPrice: () => {}
}

export const CartContext = createContext<CartContextType>(cartContextDefaultValue)

export function useCartContext() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCartContext must use inside CartProvider')
  }

  return context
}
