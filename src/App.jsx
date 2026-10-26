import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import About from './pages/About.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Cart from './pages/Cart.jsx'
import Catalog from './pages/Catalog.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Offers from './pages/Offers.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import { ProtectedRoute } from './pages/ProtectedRoute.jsx'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SettingsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/categorias" element={<CategoriesPage />} />
                <Route path="/ofertas" element={<Offers />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/producto/:slug" element={<ProductDetail />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SettingsProvider>
      </CartProvider>
    </AuthProvider>
  )
}
