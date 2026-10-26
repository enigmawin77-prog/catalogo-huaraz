import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductGrid } from '../components/catalog/ProductGrid.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Loader } from '../components/ui/Loader.jsx'
import { useCart } from '../context/CartContext.jsx'
import { mediaUrl } from '../services/api.js'
import { productService } from '../services/productService.js'
import { availabilityLabel, formatPrice } from '../utils/format.js'

export default function ProductDetail() {
  const { slug } = useParams()
  const { add } = useCart()
  const [data, setData] = useState(null)
  const [active, setActive] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setData(null)
    productService
      .get(slug)
      .then((res) => {
        setData(res.data)
        setActive(res.data.product.imageUrl)
      })
      .catch((err) => setError(err.message))
  }, [slug])

  if (error) {
    return (
      <section className="page container">
        <p className="toast error">{error}</p>
        <Button as={Link} to="/catalogo">
          Volver al catálogo
        </Button>
      </section>
    )
  }

  if (!data) return <Loader />

  const { product, related } = data
  const gallery = [product.imageUrl, ...(product.gallery || [])].filter(Boolean)
  const unique = [...new Set(gallery)]
  const soldOut = product.availability === 'out_of_stock'

  return (
    <section className="page">
      <div className="container">
        <Button as={Link} to="/catalogo" variant="ghost">
          ← Catálogo
        </Button>
        <div className="detail" style={{ marginTop: 16 }}>
          <div>
            <div className="gallery-main">
              <img src={mediaUrl(active || product.imageUrl, product.category?.icon)} alt={product.name} />
            </div>
            {unique.length > 1 ? (
              <div className="thumbs">
                {unique.map((src) => (
                  <button type="button" key={src} onClick={() => setActive(src)}>
                    <img src={mediaUrl(src, product.category?.icon)} alt="" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <p className="section-kicker">
              {product.brand} / {product.category?.name}
            </p>
            <h1>{product.name}</h1>
            <p className="price">
              {formatPrice(product.price)}
              {product.onSale ? <s>{formatPrice(product.previousPrice)}</s> : null}
            </p>
            <p className="muted">{availabilityLabel(product.availability)}</p>
            <p style={{ margin: '16px 0' }}>{product.description}</p>
            {product.highlights?.length ? (
              <ul>
                {product.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <div className="specs">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key}>
                  <span>{key}</span>
                  <strong>{String(value)}</strong>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="primary" type="button" disabled={soldOut} onClick={() => add(product)}>
                {soldOut ? 'Sin stock' : 'Añadir al carrito'}
              </Button>
              <Button as={Link} to={`/catalogo?category=${product.category?.slug}`}>
                Más de {product.category?.name}
              </Button>
            </div>
          </div>
        </div>
        {related.length ? (
          <div style={{ marginTop: 48 }}>
            <p className="section-kicker">RELACIONADOS</p>
            <h2>También en este módulo</h2>
            <ProductGrid products={related} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
