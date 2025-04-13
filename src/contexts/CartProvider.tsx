import { useEffect, useState, type ReactNode } from 'react'
import { CartContext, cartContextDefaultValue, CartContextType } from './CartContext'
import localStorageKey from '@/lib/config/localStorage'

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartContextType['cart']>(cartContextDefaultValue.cart)

  const [selectedProducts, setSelectedProducts] = useState<CartContextType['selectedProducts']>(
    cartContextDefaultValue.selectedProducts
  )

  const [totalPrice, setTotalPrice] = useState<CartContextType['totalPrice']>(cartContextDefaultValue.totalPrice)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(localStorageKey.cart) || '[]')

    if (cart) {
      setCart(cart)
    }
  }, [])

  const resetCart = () => {
    setCart([])
    localStorage.removeItem(localStorageKey.cart)
  }

  const addToCart = ({ productID, quantity }: CartContextType['cart'][number]) => {
    if (!productID || quantity < 1) return

    const updatedCart = cart.some(item => item.productID === productID)
      ? cart.map(item => (item.productID === productID ? { ...item, quantity: item.quantity + quantity } : item))
      : [...cart, { productID: String(productID), quantity }]

    updateCart(updatedCart)
  }

  const removeFromCart = (productID?: CartContextType['cart'][number]['productID'] | null) => {
    if (!productID) return
    const updatedCart = cart.filter(obj => obj.productID !== productID)

    updateCart(updatedCart)
  }

  const setQuantity = ({ productID, quantity }: CartContextType['cart'][number]) => {
    const updatedCart = cart.some(data => data.productID === productID)
      ? cart.map(item => (item.productID === productID ? { ...item, quantity } : item))
      : [...cart, { productID, quantity }]

    updateCart(updatedCart)
  }

  const decreaseQuantity = ({ productID, quantity }: CartContextType['cart'][number]) => {
    const updatedCart = cart
      .map(item => (item.productID === productID ? { ...item, quantity: item.quantity - quantity } : item))
      .filter(item => item.quantity > 0)

    updateCart(updatedCart)
  }

  const toggleSelectItem = (productID: CartContextType['cart'][number]['productID']) => {
    setSelectedProducts(prev => (prev.includes(productID) ? prev.filter(id => id !== productID) : [...prev, productID]))
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === cart.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(cart.map(item => item.productID))
    }
  }

  const updateCart = (updatedCart: CartContextType['cart']) => {
    setCart(updatedCart)
    localStorage.setItem(localStorageKey.cart, JSON.stringify(updatedCart))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        setQuantity,
        decreaseQuantity,
        resetCart,
        selectedProducts,
        setSelectedProducts,
        toggleSelectItem,
        toggleSelectAll,
        totalPrice,
        setTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
