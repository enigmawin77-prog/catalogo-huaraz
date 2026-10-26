import { Link } from 'react-router-dom'
import { Button } from '../ui/Button.jsx'

export function Hero({ featured }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="reveal">
          <p className="section-kicker">HUARAZ / SECTOR TECNOLÓGICO</p>
          <h1>EL FUTURO DE LA TECNOLOGÍA</h1>
          <p className="hero-sub">Catálogo Tecnológico Huaraz</p>
          <p className="hero-copy">
            Explora laptops, componentes, redes y gaming con una interfaz de control de próxima generación.
            Filtra, compara y consulta disponibilidad real del inventario de demostración.
          </p>
          <div className="hero-actions">
            <Button as={Link} to="/catalogo" variant="primary">
              Explorar catálogo
            </Button>
            <Button as={Link} to="/catalogo?sort=newest" variant="magenta">
              Ver novedades
            </Button>
          </div>
        </div>

        <div className="hero-frame reveal reveal-delay-2">
          <div className="hero-scan" />
          <div className="hud-row">
            <span>SYS.OK</span>
            <span>LAT -9.52 / LON -77.53</span>
            <span>NODO-01</span>
          </div>
          <div className="hud-product">
            <p className="muted">UNIDAD DESTACADA</p>
            <strong>{featured?.name || 'Sincronizando inventario'}</strong>
            <p className="muted">{featured ? `${featured.brand} · ${featured.category?.name}` : 'Esperando API'}</p>
            {featured ? (
              <Button as={Link} to={`/producto/${featured.slug}`} style={{ marginTop: 16, width: 'fit-content' }}>
                Inspeccionar
              </Button>
            ) : null}
          </div>
          <div className="orbit" />
        </div>
      </div>
    </section>
  )
}
