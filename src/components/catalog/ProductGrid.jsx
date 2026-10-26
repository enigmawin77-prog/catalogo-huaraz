import { ProductCard } from './ProductCard.jsx'

export function ProductGrid({ products, view = 'grid' }) {
  return (
    <div className={view === 'list' ? 'list-view' : 'grid-view'}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} layout={view} />
      ))}
    </div>
  )
}
