import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductFilters } from '../components/catalog/ProductFilters.jsx'
import { ProductGrid } from '../components/catalog/ProductGrid.jsx'
import { SearchBar } from '../components/catalog/SearchBar.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'
import { ProductSkeleton } from '../components/ui/Loader.jsx'
import { categoryService, productService } from '../services/productService.js'

const DEFAULT = {
  search: '',
  category: '',
  brand: '',
  availability: '',
  sort: 'featured',
  page: 1,
}

export default function Catalog({ preset } = {}) {
  const [params, setParams] = useSearchParams()
  const [view, setView] = useState('grid')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const filters = useMemo(
    () => ({
      search: params.get('search') || DEFAULT.search,
      category: params.get('category') || preset?.category || DEFAULT.category,
      brand: params.get('brand') || DEFAULT.brand,
      availability: params.get('availability') || DEFAULT.availability,
      sort: params.get('sort') || preset?.sort || DEFAULT.sort,
      onSale: params.get('onSale') || preset?.onSale || '',
      page: Number(params.get('page') || 1),
    }),
    [params, preset],
  )

  function write(next) {
    const sp = new URLSearchParams()
    Object.entries(next).forEach(([key, value]) => {
      if (value && value !== DEFAULT[key]) sp.set(key, value)
    })
    setParams(sp)
  }

  useEffect(() => {
    categoryService.list().then((res) => setCategories(res.data)).catch(() => {})
    productService.brands().then((res) => setBrands(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')
    productService
      .list({ ...filters, limit: 9 })
      .then((res) => {
        setItems(res.data)
        setMeta(res.meta)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [filters])

  return (
    <section className="page">
      <div className="container">
        <p className="section-kicker">INVENTARIO</p>
        <h1 className="section-title">Catálogo</h1>
        <SearchBar
          id="catalog-search"
          compact
          value={filters.search}
          onChange={(search) => write({ ...filters, search, page: 1 })}
        />
        <ProductFilters
          categories={categories}
          brands={brands}
          filters={filters}
          onChange={write}
          onClear={() => setParams(new URLSearchParams())}
          view={view}
          onView={setView}
        />
        {error ? <p className="toast error">{error}</p> : null}
        {loading ? <ProductSkeleton /> : null}
        {!loading && items.length === 0 ? (
          <EmptyState text="Prueba otra categoría, marca o término de búsqueda." />
        ) : null}
        {!loading && items.length > 0 ? <ProductGrid products={items} view={view} /> : null}
        {meta.pages > 1 ? (
          <div className="pager">
            <button className="btn" type="button" disabled={meta.page <= 1} onClick={() => write({ ...filters, page: meta.page - 1 })}>
              Anterior
            </button>
            <span className="muted">
              {meta.page} / {meta.pages} · {meta.total} productos
            </span>
            <button className="btn" type="button" disabled={meta.page >= meta.pages} onClick={() => write({ ...filters, page: meta.page + 1 })}>
              Siguiente
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
