import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button.jsx'
import { Counter } from '../components/ui/Counter.jsx'
import { Loader } from '../components/ui/Loader.jsx'
import { Modal } from '../components/ui/Modal.jsx'
import { authService, categoryService, productService } from '../services/productService.js'
import { formatPrice } from '../utils/format.js'

const EMPTY_PRODUCT = {
  name: '',
  brand: '',
  categoryId: '',
  description: '',
  price: '',
  previousPrice: '',
  stock: 0,
  availability: 'in_stock',
  imageUrl: '',
  isPublished: true,
  isFeatured: false,
  isNew: true,
  highlights: '',
  specs: '{\n  \n}',
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState({ page: 1, pages: 1 })
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [catForm, setCatForm] = useState({ name: '', description: '', icon: 'chip' })
  const [loading, setLoading] = useState(true)

  async function refresh() {
    setLoading(true)
    try {
      const [s, p, c] = await Promise.all([
        authService.stats(),
        authService.adminProducts({ search, page, limit: 8 }),
        categoryService.list(),
      ])
      setStats(s.data)
      setProducts(p.data)
      setMeta(p.meta)
      setCategories(c.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [search, page])

  function onField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function saveProduct(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    let specs = {}
    try {
      specs = JSON.parse(form.specs || '{}')
    } catch {
      setError('Las especificaciones deben ser JSON válido')
      return
    }
    const body = {
      ...form,
      categoryId: Number(form.categoryId),
      price: Number(form.price),
      previousPrice: form.previousPrice === '' ? null : Number(form.previousPrice),
      stock: Number(form.stock),
      highlights: form.highlights
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      specs,
    }
    try {
      if (editingId) await productService.update(editingId, body)
      else await productService.create(body)
      setMessage(editingId ? 'Producto actualizado' : 'Producto creado')
      setForm(EMPTY_PRODUCT)
      setEditingId(null)
      setTab('products')
      await refresh()
    } catch (err) {
      setError(err.details?.join('. ') || err.message)
    }
  }

  function editProduct(product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      brand: product.brand,
      categoryId: product.categoryId,
      description: product.description,
      price: product.price,
      previousPrice: product.previousPrice ?? '',
      stock: product.stock,
      availability: product.availability,
      imageUrl: product.imageUrl || '',
      isPublished: product.isPublished,
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      highlights: (product.highlights || []).join(', '),
      specs: JSON.stringify(product.specs || {}, null, 2),
    })
    setTab('form')
  }

  async function confirmDelete() {
    try {
      await productService.remove(pendingDelete.id)
      setPendingDelete(null)
      setMessage('Producto eliminado')
      refresh()
    } catch (err) {
      setError(err.message)
    }
  }

  async function upload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const res = await productService.upload(file)
      onField('imageUrl', res.data.imageUrl)
      setMessage('Imagen subida')
    } catch (err) {
      setError(err.message)
    }
  }

  async function saveCategory(event) {
    event.preventDefault()
    try {
      await categoryService.create(catForm)
      setCatForm({ name: '', description: '', icon: 'chip' })
      setMessage('Categoría creada')
      refresh()
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteCategory(id) {
    if (!window.confirm('¿Eliminar esta categoría? Solo es posible si no tiene productos.')) return
    try {
      await categoryService.remove(id)
      refresh()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="page">
      <div className="container">
        <p className="section-kicker">PANEL</p>
        <h1>Administración</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '16px 0' }}>
          <Button type="button" variant={tab === 'dashboard' ? 'primary' : 'default'} onClick={() => setTab('dashboard')}>
            Dashboard
          </Button>
          <Button type="button" variant={tab === 'products' ? 'primary' : 'default'} onClick={() => setTab('products')}>
            Productos
          </Button>
          <Button type="button" variant={tab === 'form' ? 'primary' : 'default'} onClick={() => setTab('form')}>
            {editingId ? 'Editar' : 'Nuevo'}
          </Button>
          <Button type="button" variant={tab === 'categories' ? 'primary' : 'default'} onClick={() => setTab('categories')}>
            Categorías
          </Button>
        </div>
        {message ? <p className="toast ok">{message}</p> : null}
        {error ? <p className="toast error">{error}</p> : null}

        {tab === 'dashboard' && stats ? (
          <div className="stats">
            {Object.entries({
              Productos: stats.total,
              Publicados: stats.published,
              Destacados: stats.featured,
              Ofertas: stats.offers,
              Agotados: stats.outOfStock,
              Categorías: stats.categories,
            }).map(([label, value]) => (
              <div className="stat" key={label}>
                <span className="muted">{label}</span>
                <b>
                  <Counter value={value} />
                </b>
              </div>
            ))}
          </div>
        ) : null}

        {tab === 'products' ? (
          <>
            <label className="field">
              Buscar
              <input value={search} onChange={(e) => { setPage(1); setSearch(e.target.value) }} placeholder="Nombre o marca" />
            </label>
            {loading ? <Loader /> : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Estado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          {product.name}
                          <div className="muted">{product.brand}</div>
                        </td>
                        <td>{formatPrice(product.price)}</td>
                        <td>{product.stock}</td>
                        <td>{product.isPublished ? 'Publicado' : 'Oculto'}</td>
                        <td>
                          <Button type="button" onClick={() => editProduct(product)}>Editar</Button>
                          <Button type="button" variant="magenta" onClick={() => setPendingDelete(product)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="pager">
              <Button type="button" disabled={meta.page <= 1} onClick={() => setPage((p) => p - 1)}>Anterior</Button>
              <span>{meta.page} / {meta.pages}</span>
              <Button type="button" disabled={meta.page >= meta.pages} onClick={() => setPage((p) => p + 1)}>Siguiente</Button>
            </div>
          </>
        ) : null}

        {tab === 'form' ? (
          <form className="form-grid" onSubmit={saveProduct}>
            <label className="field">
              Nombre
              <input value={form.name} onChange={(e) => onField('name', e.target.value)} required />
            </label>
            <label className="field">
              Marca
              <input value={form.brand} onChange={(e) => onField('brand', e.target.value)} required />
            </label>
            <label className="field">
              Categoría
              <select value={form.categoryId} onChange={(e) => onField('categoryId', e.target.value)} required>
                <option value="">Selecciona</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </label>
            <label className="field">
              Precio (PEN)
              <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => onField('price', e.target.value)} required />
            </label>
            <label className="field">
              Precio anterior
              <input type="number" min="0" step="0.01" value={form.previousPrice} onChange={(e) => onField('previousPrice', e.target.value)} />
            </label>
            <label className="field">
              Stock
              <input type="number" min="0" value={form.stock} onChange={(e) => onField('stock', e.target.value)} />
            </label>
            <label className="field">
              Disponibilidad
              <select value={form.availability} onChange={(e) => onField('availability', e.target.value)}>
                <option value="in_stock">En stock</option>
                <option value="limited">Limitado</option>
                <option value="out_of_stock">Agotado</option>
              </select>
            </label>
            <label className="field span-2">
              Descripción
              <textarea value={form.description} onChange={(e) => onField('description', e.target.value)} required />
            </label>
            <label className="field span-2">
              URL de imagen (o sube un archivo)
              <input value={form.imageUrl} onChange={(e) => onField('imageUrl', e.target.value)} />
              <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={upload} />
            </label>
            <label className="field span-2">
              Destacados (separados por coma)
              <input value={form.highlights} onChange={(e) => onField('highlights', e.target.value)} />
            </label>
            <label className="field span-2">
              Especificaciones (JSON)
              <textarea value={form.specs} onChange={(e) => onField('specs', e.target.value)} />
            </label>
            <label><input type="checkbox" checked={form.isPublished} onChange={(e) => onField('isPublished', e.target.checked)} /> Publicado</label>
            <label><input type="checkbox" checked={form.isFeatured} onChange={(e) => onField('isFeatured', e.target.checked)} /> Destacado</label>
            <label><input type="checkbox" checked={form.isNew} onChange={(e) => onField('isNew', e.target.checked)} /> Nuevo</label>
            <div className="span-2">
              <Button variant="primary" type="submit">{editingId ? 'Guardar cambios' : 'Registrar producto'}</Button>
            </div>
          </form>
        ) : null}

        {tab === 'categories' ? (
          <>
            <form className="form-grid" onSubmit={saveCategory}>
              <label className="field">
                Nombre
                <input value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} required />
              </label>
              <label className="field">
                Icono
                <input value={catForm.icon} onChange={(e) => setCatForm({ ...catForm, icon: e.target.value })} />
              </label>
              <label className="field span-2">
                Descripción
                <input value={catForm.description} onChange={(e) => setCatForm({ ...catForm, description: e.target.value })} />
              </label>
              <Button variant="primary" type="submit">Crear categoría</Button>
            </form>
            <ul>
              {categories.map((cat) => (
                <li key={cat.id} style={{ margin: '10px 0' }}>
                  {cat.name} · {cat.productCount} productos{' '}
                  <Button type="button" variant="magenta" onClick={() => deleteCategory(cat.id)}>Eliminar</Button>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <Modal open={Boolean(pendingDelete)} title="Confirmar eliminación" onClose={() => setPendingDelete(null)}>
        <p>¿Eliminar {pendingDelete?.name}? Esta acción no se puede deshacer.</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Button variant="magenta" type="button" onClick={confirmDelete}>Eliminar</Button>
          <Button type="button" onClick={() => setPendingDelete(null)}>Cancelar</Button>
        </div>
      </Modal>
    </section>
  )
}
