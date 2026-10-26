import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)
const KEY = 'cth_cart'

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)

  function persist(next) {
    setItems(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
      add(product) {
        if (product.availability === 'out_of_stock') return
        const current = readCart()
        const found = current.find((item) => item.id === product.id)
        if (found) {
          found.qty += 1
        } else {
          current.push({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            qty: 1,
          })
        }
        persist(current)
      },
      setQty(id, qty) {
        const next = readCart()
          .map((item) => (item.id === id ? { ...item, qty } : item))
          .filter((item) => item.qty > 0)
        persist(next)
      },
      remove(id) {
        persist(readCart().filter((item) => item.id !== id))
      },
      clear() {
        persist([])
      },
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
