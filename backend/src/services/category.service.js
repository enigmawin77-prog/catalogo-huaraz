import { categoryRepository } from '../repositories/category.repository.js'
import { HttpError } from '../utils/http.js'
import { uniqueSlug } from '../utils/slug.js'

function mapCategory(row) {
  if (!row) return null
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    icon: row.icon,
    productCount: row.published_count ?? row.product_count ?? 0,
    totalProducts: row.product_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function normalize(body, existing) {
  const name = String(body.name || '').trim()
  const description = String(body.description || '').trim()
  const icon = String(body.icon || existing?.icon || 'chip').trim()
  if (name.length < 3) throw new HttpError(400, 'El nombre de la categoría es demasiado corto')
  const slug = uniqueSlug(body.slug || name, (candidate) => {
    const found = categoryRepository.findBySlug(candidate)
    return found && found.id !== existing?.id
  })
  return { name, description, icon, slug }
}

export const categoryService = {
  list() {
    return categoryRepository.list().map(mapCategory)
  },

  getByParam(param) {
    const byId = Number.parseInt(param, 10)
    const row = Number.isInteger(byId)
      ? categoryRepository.findById(byId)
      : categoryRepository.findBySlug(param)
    if (!row) throw new HttpError(404, 'Categoría no encontrada')
    return mapCategory(row)
  },

  create(body) {
    return mapCategory(categoryRepository.create(normalize(body)))
  },

  update(id, body) {
    const existing = categoryRepository.findById(id)
    if (!existing) throw new HttpError(404, 'Categoría no encontrada')
    return mapCategory(categoryRepository.update(id, normalize(body, existing)))
  },

  remove(id) {
    const existing = categoryRepository.findById(id)
    if (!existing) throw new HttpError(404, 'Categoría no encontrada')
    if (categoryRepository.countProducts(id) > 0) {
      throw new HttpError(409, 'No se puede eliminar una categoría con productos asociados')
    }
    categoryRepository.remove(id)
    return { id: Number(id) }
  },
}
