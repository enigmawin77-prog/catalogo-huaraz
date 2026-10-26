import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/productService.js'

const SettingsContext = createContext({
  siteName: 'Catálogo Tecnológico Huaraz',
  contact: {},
  social: {},
})

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    siteName: 'Catálogo Tecnológico Huaraz',
    contact: {},
    social: {},
  })

  useEffect(() => {
    authService
      .settings()
      .then((res) => setSettings(res.data))
      .catch(() => {})
  }, [])

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}
