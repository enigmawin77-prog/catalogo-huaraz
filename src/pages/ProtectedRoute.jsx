import { Navigate } from 'react-router-dom'
import { Loader } from '../components/ui/Loader.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth()
  if (loading) return <Loader label="Validando sesión…" />
  if (!isAdmin) return <Navigate to="/login" replace />
  return children
}
