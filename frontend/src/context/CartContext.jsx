import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from './cartContextCore'

const STORAGE_KEY = 'wijaya_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((product) => {
    setItems((current) => {
      const existing = current.find((item) => item.cartId === product.cartId)
      if (existing) {
        return current.map((item) =>
          item.cartId === product.cartId ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((cartId) => {
    setItems((current) => current.filter((item) => item.cartId !== cartId))
  }, [])

  const updateQuantity = useCallback((cartId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartId)
      return
    }
    setItems((current) =>
      current.map((item) => (item.cartId === cartId ? { ...item, quantity } : item)),
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => setItems([]), [])

  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { count, subtotal }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      ...totals,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [addToCart, clearCart, items, removeFromCart, totals, updateQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
