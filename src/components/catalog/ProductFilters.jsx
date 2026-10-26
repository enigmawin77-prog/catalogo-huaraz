export function ProductFilters({
  categories,
  brands,
  filters,
  onChange,
  onClear,
  view,
  onView,
}) {
  function set(key, value) {
    onChange({ ...filters, [key]: value, page: 1 })
  }

  return (
    <div className="filters">
      <label>
        Categoría
        <select value={filters.category} onChange={(e) => set('category', e.target.value)}>
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Marca
        <select value={filters.brand} onChange={(e) => set('brand', e.target.value)}>
          <option value="">Todas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
      <label>
        Disponibilidad
        <select value={filters.availability} onChange={(e) => set('availability', e.target.value)}>
          <option value="">Cualquiera</option>
          <option value="in_stock">En stock</option>
          <option value="limited">Limitado</option>
          <option value="out_of_stock">Agotado</option>
        </select>
      </label>
      <label>
        Orden
        <select value={filters.sort} onChange={(e) => set('sort', e.target.value)}>
          <option value="featured">Destacados</option>
          <option value="newest">Novedades</option>
          <option value="price_asc">Precio: menor</option>
          <option value="price_desc">Precio: mayor</option>
          <option value="name_asc">A-Z</option>
          <option value="name_desc">Z-A</option>
        </select>
      </label>
      <div className="view-toggle">
        <button className="btn" type="button" aria-pressed={view === 'grid'} onClick={() => onView('grid')}>
          Cuadrícula
        </button>
        <button className="btn" type="button" aria-pressed={view === 'list'} onClick={() => onView('list')}>
          Lista
        </button>
      </div>
      <button className="btn btn-magenta" type="button" onClick={onClear}>
        Limpiar filtros
      </button>
    </div>
  )
}
