import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { Logo } from './Logo.jsx'

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/categorias', label: 'Categorías' },
  { to: '/ofertas', label: 'Ofertas' },
  { to: '/nosotros', label: 'Nosotros' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAdmin, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <Logo />
          <span className="brand-name">
            <strong>CATÁLOGO TECNOLÓGICO</strong>
            <span>HUARAZ // CTH-01</span>
          </span>
        </NavLink>

        <nav aria-label="Principal">
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            type="button"
            aria-label="Buscar productos"
            onClick={() => {
              navigate('/catalogo')
              requestAnimationFrame(() => document.getElementById('catalog-search')?.focus())
            }}
          >
            ⌕
          </button>
          <button className="icon-btn" type="button" aria-label="Carrito" onClick={() => navigate('/carrito')}>
            ▣
            {count > 0 ? <span className="badge-count">{count}</span> : null}
          </button>
          {isAdmin ? (
            <>
              <NavLink className="btn admin-link" to="/admin">
                Admin
              </NavLink>
              <button className="btn btn-ghost admin-link" type="button" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <NavLink className="btn admin-link" to="/login">
              Acceso
            </NavLink>
          )}
          <button
            className="icon-btn menu-toggle"
            type="button"
            aria-expanded={open}
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}
