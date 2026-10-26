import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/productService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cth_token') || '')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(token))

  useEffect(() => {
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    authService
      .me()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('cth_token')
        setToken('')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAdmin: user?.role === 'admin',
      login(nextToken, nextUser) {
        localStorage.setItem('cth_token', nextToken)
        setToken(nextToken)
        setUser(nextUser)
      },
      logout() {
        localStorage.removeItem('cth_token')
        setToken('')
        setUser(null)
      },
    }),
    [user, token, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
