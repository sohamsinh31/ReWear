'use client'

import { createContext, useContext, useState } from 'react'

type Product = {
  id: string
  name: string
  images: string[]
}

type CartItem = Product & { quantity: number }

const CartContext = createContext<{
  cart: CartItem[],
  addToCart: (product: Product) => void
}>({
  cart: [],
  addToCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
