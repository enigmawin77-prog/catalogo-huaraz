import { Link } from 'react-router-dom'
import { useSettings } from '../../context/SettingsContext.jsx'
import { yearNow } from '../../utils/format.js'
import { Logo } from './Logo.jsx'

export function Footer() {
  const { contact, social, siteName } = useSettings()
  const socialEntries = Object.entries(social || {}).filter(([, url]) => url)
  const contactEntries = Object.entries(contact || {}).filter(([, value]) => value)

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <Logo />
            <span className="brand-name">
              <strong>{siteName}</strong>
              <span>NODO ANDINO</span>
            </span>
          </div>
          <p className="muted" style={{ marginTop: 12, maxWidth: '36ch' }}>
            Plataforma de consulta tecnológica para Huaraz. Los precios de demostración están identificados en cada ficha.
          </p>
        </div>
        <div>
          <p className="section-kicker">Navegación</p>
          <p><Link to="/catalogo">Catálogo</Link></p>
          <p><Link to="/categorias">Categorías</Link></p>
          <p><Link to="/ofertas">Ofertas</Link></p>
          <p><Link to="/nosotros">Nosotros</Link></p>
        </div>
        <div>
          <p className="section-kicker">Contacto</p>
          {contactEntries.length === 0 && socialEntries.length === 0 ? (
            <p className="muted">Datos de contacto no configurados.</p>
          ) : (
            <>
              {contact.email ? <p>{contact.email}</p> : null}
              {contact.phone ? <p>{contact.phone}</p> : null}
              {contact.address ? <p>{contact.address}</p> : null}
              {socialEntries.map(([name, url]) => (
                <p key={name}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {name}
                  </a>
                </p>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="container">
        <small>© {yearNow()} {siteName}. Catálogo de demostración. Todos los derechos reservados.</small>
      </div>
    </footer>
  )
}
