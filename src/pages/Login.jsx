import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { authService } from '../services/productService.js'

export default function Login() {
  const { isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAdmin) return <Navigate to="/admin" replace />

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authService.login({ email, password })
      login(res.data.token, res.data.user)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page">
      <div className="container" style={{ maxWidth: 460 }}>
        <p className="section-kicker">ACCESO RESTRINGIDO</p>
        <h1>Administración</h1>
        <form onSubmit={onSubmit} className="form-grid" style={{ gridTemplateColumns: '1fr', marginTop: 20 }}>
          <label className="field">
            Correo
            <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="field">
            Contraseña
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error ? <p className="toast error">{error}</p> : null}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Verificando…' : 'Entrar'}
          </Button>

          <div
            style={{
              marginTop: 20,
              padding: '14px 16px',
              background: 'var(--glass)',
              border: '1px solid var(--line)',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
          >
            <p className="section-kicker" style={{ marginBottom: 8, fontSize: 11 }}>
              // CREDENCIALES DE ACCESO
            </p>
            <div style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', display: 'grid', gap: 4 }}>
              <div>
                <span className="muted">Usuario: </span>
                <strong style={{ color: 'var(--cyan)' }}>admin@localhost</strong>
              </div>
              <div>
                <span className="muted">Clave: </span>
                <strong style={{ color: 'var(--magenta)' }}>Admin1234!</strong>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ marginTop: 12, width: '100%', minHeight: 34, fontSize: 11 }}
              onClick={() => {
                setEmail('admin@localhost')
                setPassword('Admin1234!')
              }}
            >
              Autollenar credenciales
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
