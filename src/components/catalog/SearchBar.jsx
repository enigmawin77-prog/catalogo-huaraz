import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce.js'
import { productService } from '../../services/productService.js'
import { formatPrice } from '../../utils/format.js'

export function SearchBar({ id = 'global-search', compact = false, value, onChange }) {
  const [query, setQuery] = useState(value || '')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [searched, setSearched] = useState(false)
  const debounced = useDebounce(query)

  useEffect(() => {
    setQuery(value || '')
  }, [value])

  useEffect(() => {
    if (onChange) onChange(debounced)
    if (compact) return
    if (!debounced.trim()) {
      setResults([])
      setSearched(false)
      return
    }
    productService
      .list({ search: debounced, limit: 6 })
      .then((res) => {
        setResults(res.data)
        setSearched(true)
      })
      .catch(() => {
        setResults([])
        setSearched(true)
      })
    // onChange is an inline setter from the parent; depend only on the query.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, compact])

  return (
    <div className="search-panel">
      <form className="search-bar" onSubmit={(e) => e.preventDefault()} role="search">
        <span aria-hidden="true">⌕</span>
        <input
          id={id}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar por nombre, marca, categoría o descripción"
          aria-label="Buscar productos"
        />
      </form>
      {!compact && open && searched ? (
        <div className="search-results">
          {results.length === 0 ? (
            <p className="empty-inline">No hay coincidencias para “{debounced}”.</p>
          ) : (
            results.map((item) => (
              <Link key={item.id} to={`/producto/${item.slug}`} onClick={() => setOpen(false)}>
                {item.name} · {item.brand} · {formatPrice(item.price)}
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}
