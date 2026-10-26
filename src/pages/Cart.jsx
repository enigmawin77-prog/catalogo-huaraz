import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'
import { useCart } from '../context/CartContext.jsx'
import { mediaUrl } from '../services/api.js'
import { formatPrice } from '../utils/format.js'

export default function Cart() {
  const { items, total, setQty, remove, clear } = useCart()

  if (!items.length) {
    return (
      <section className="page container">
        <EmptyState title="Carrito vacío" text="Añade productos desde el catálogo para armar una consulta." />
        <Button as={Link} to="/catalogo" variant="primary">
          Ir al catálogo
        </Button>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Carrito</h1>
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={mediaUrl(item.imageUrl, item.category?.icon)} alt="" width="88" height="64" />
              <div>
                <Link to={`/producto/${item.slug}`}>{item.name}</Link>
                <p className="muted">{formatPrice(item.price)}</p>
                <div className="qty">
                  <button className="icon-btn" type="button" onClick={() => setQty(item.id, item.qty - 1)}>
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button className="icon-btn" type="button" onClick={() => setQty(item.id, item.qty + 1)}>
                    +
                  </button>
                </div>
              </div>
              <button className="btn btn-magenta" type="button" onClick={() => remove(item.id)}>
                Quitar
              </button>
            </article>
          ))}
        </div>
        <p className="price" style={{ marginTop: 20 }}>
          Total {formatPrice(total)}
        </p>
        <p className="muted">El carrito se guarda en este navegador. No hay pasarela de pago configurada.</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Button type="button" variant="magenta" onClick={clear}>
            Vaciar
          </Button>
          <Button as={Link} to="/catalogo">
            Seguir explorando
          </Button>
        </div>
      </div>
    </section>
  )
}
