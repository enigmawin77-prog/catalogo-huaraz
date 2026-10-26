import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { mediaUrl } from '../../services/api.js'
import { availabilityLabel, formatPrice } from '../../utils/format.js'
import { Button } from '../ui/Button.jsx'

export function ProductCard({ product, layout = 'grid' }) {
  const { add } = useCart()
  const soldOut = product.availability === 'out_of_stock'

  return (
    <article className="product-card">
      <Link to={`/producto/${product.slug}`} className="product-media" aria-label={product.name}>
        <img src={mediaUrl(product.imageUrl, product.category?.icon)} alt="" />
      </Link>
      <div className="tags">
        {product.isNew ? <span className="tag new">NUEVO</span> : null}
        {product.onSale ? <span className="tag offer">OFERTA</span> : null}
        {product.isFeatured ? <span className="tag">DESTACADO</span> : null}
        {soldOut ? <span className="tag out">AGOTADO</span> : null}
      </div>
      <div className="product-meta">
        <span>{product.brand}</span>
        <span>{product.category?.name}</span>
      </div>
      <h3 style={{ fontSize: layout === 'list' ? '1.05rem' : '1rem' }}>
        <Link to={`/producto/${product.slug}`}>{product.name}</Link>
      </h3>
      <p className="price">
        {formatPrice(product.price)}
        {product.onSale ? <s>{formatPrice(product.previousPrice)}</s> : null}
      </p>
      <p className="muted">{availabilityLabel(product.availability)}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto', flexWrap: 'wrap' }}>
        <Button as={Link} to={`/producto/${product.slug}`}>
          Ver detalles
        </Button>
        <Button variant="magenta" type="button" disabled={soldOut} onClick={() => add(product)}>
          {soldOut ? 'Sin stock' : 'Añadir'}
        </Button>
      </div>
    </article>
  )
}
