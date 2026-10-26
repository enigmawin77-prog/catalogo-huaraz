import { ProductGrid } from '../catalog/ProductGrid.jsx'

export function FeaturedProducts({ title, kicker, products }) {
  if (!products?.length) return null
  return (
    <section className="page" style={{ paddingTop: 8 }}>
      <div className="container">
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-title">{title}</h2>
        <div style={{ marginTop: 20 }}>
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  )
}
