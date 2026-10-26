export function Loader({ label = 'Sincronizando catálogo…' }) {
  return (
    <div className="loader" role="status">
      <div className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className="skeleton-grid" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <div className="skeleton" key={i} />
      ))}
    </div>
  )
}
