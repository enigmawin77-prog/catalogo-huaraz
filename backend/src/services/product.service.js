import { productRepository } from '../repositories/product.repository.js'
import { categoryRepository } from '../repositories/category.repository.js'
import { HttpError, parseBool, parsePositiveInt } from '../utils/http.js'
import { parseJson, stringifyJson } from '../utils/json.js'
import { uniqueSlug } from '../utils/slug.js'

function mapProduct(row) {
  if (!row) return null
  const previous = row.previous_price == null ? null : Number(row.previous_price)
  const price = Number(row.price)
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    brand: row.brand,
    categoryId: row.category_id,
    category: {
      id: row.category_id,
      name: row.category_name,
      slug: row.category_slug,
      icon: row.category_icon,
    },
    description: row.description,
    price,
    previousPrice: previous,
    onSale: previous != null && previous > price,
    imageUrl: row.image_url,
    gallery: parseJson(row.gallery, []),
    specs: parseJson(row.specs, {}),
    highlights: parseJson(row.highlights, []),
    stock: row.stock,
    availability: row.availability,
    isPublished: Boolean(row.is_published),
    isFeatured: Boolean(row.is_featured),
    isNew: Boolean(row.is_new),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function normalizePayload(body, existing) {
  const name = String(body.name || '').trim()
  const brand = String(body.brand || '').trim()
  const description = String(body.description || '').trim()
  const categoryId = Number(body.categoryId ?? body.category_id)
  const price = Number(body.price)
  const previousRaw = body.previousPrice ?? body.previous_price
  const previousPrice =
    previousRaw === '' || previousRaw == null ? null : Number(previousRaw)
  const stock = Number(body.stock ?? existing?.stock ?? 0)
  const availability = body.availability || existing?.availability || 'in_stock'
  const imageUrl = body.imageUrl ?? body.image_url ?? existing?.image_url ?? null
  const gallery = body.gallery ?? parseJson(existing?.gallery, [])
  const specs = body.specs ?? parseJson(existing?.specs, {})
  const highlights = body.highlights ?? parseJson(existing?.highlights, [])

  const errors = []
  if (name.length < 3 || name.length > 140) errors.push('El nombre debe tener entre 3 y 140 caracteres')
  if (brand.length < 2 || brand.length > 80) errors.push('La marca debe tener entre 2 y 80 caracteres')
  if (description.length < 10) errors.push('La descripción debe tener al menos 10 caracteres')
  if (!Number.isInteger(categoryId) || categoryId < 1) errors.push('La categoría es obligatoria')
  if (!Number.isFinite(price) || price < 0) errors.push('El precio debe ser un número válido')
  if (previousPrice != null && (!Number.isFinite(previousPrice) || previousPrice < 0)) {
    errors.push('El precio anterior debe ser un número válido')
  }
  if (previousPrice != null && previousPrice <= price) {
    errors.push('El precio anterior debe ser mayor que el precio actual para registrar una oferta')
  }
  if (!Number.isInteger(stock) || stock < 0) errors.push('El stock debe ser un entero mayor o igual a 0')
  if (!['in_stock', 'limited', 'out_of_stock'].includes(availability)) {
    errors.push('La disponibilidad no es válida')
  }
  if (!categoryRepository.findById(categoryId)) errors.push('La categoría no existe')
  if (errors.length) throw new HttpError(400, 'Datos de producto inválidos', errors)

  const slugSource = body.slug || name
  const slug = uniqueSlug(slugSource, (candidate) =>
    productRepository.slugExists(candidate, existing?.id),
  )

  return {
    name,
    slug,
    brand,
    category_id: categoryId,
    description,
    price,
    previous_price: previousPrice,
    image_url: imageUrl || null,
    gallery: stringifyJson(Array.isArray(gallery) ? gallery : [], []),
    specs: stringifyJson(specs && typeof specs === 'object' ? specs : {}, {}),
    highlights: stringifyJson(Array.isArray(highlights) ? highlights : [], []),
    stock,
    availability,
    is_published: parseBool(body.isPublished ?? body.is_published, existing ? Boolean(existing.is_published) : true)
      ? 1
      : 0,
    is_featured: parseBool(body.isFeatured ?? body.is_featured, existing ? Boolean(existing.is_featured) : false)
      ? 1
      : 0,
    is_new: parseBool(body.isNew ?? body.is_new, existing ? Boolean(existing.is_new) : true) ? 1 : 0,
  }
}

export const productService = {
  map: mapProduct,

  list(query, { includeUnpublished = false } = {}) {
    const page = parsePositiveInt(query.page, 1)
    const limit = Math.min(parsePositiveInt(query.limit, 12), 48)
    const result = productRepository.list({
      search: String(query.search || query.q || '').trim(),
      category: query.category || '',
      brand: query.brand || '',
      availability: query.availability || '',
      featured: parseBool(query.featured, false),
      isNew: parseBool(query.isNew ?? query.new, false),
      onSale: parseBool(query.onSale ?? query.offers, false),
      sort: query.sort || 'featured',
      publishedOnly: includeUnpublished ? parseBool(query.publishedOnly, false) : true,
      page,
      limit,
    })

    return {
      items: result.items.map(mapProduct),
      meta: {
        page,
        limit,
        total: result.total,
        pages: Math.max(1, Math.ceil(result.total / limit)),
      },
    }
  },

  getByParam(param) {
    const byId = Number.parseInt(param, 10)
    const row = Number.isInteger(byId) && String(byId) === String(param)
      ? productRepository.findById(byId)
      : productRepository.findBySlug(param)
    if (!row || !row.is_published) throw new HttpError(404, 'Producto no encontrado')
    return {
      product: mapProduct(row),
      related: productRepository.related(row).map(mapProduct),
    }
  },

  getAdmin(id) {
    const row = productRepository.findById(id)
    if (!row) throw new HttpError(404, 'Producto no encontrado')
    return mapProduct(row)
  },

  create(body) {
    const payload = normalizePayload(body)
    return mapProduct(productRepository.create(payload))
  },

  update(id, body) {
    const existing = productRepository.findById(id)
    if (!existing) throw new HttpError(404, 'Producto no encontrado')
    const payload = normalizePayload(body, existing)
    return mapProduct(productRepository.update(id, payload))
  },

  remove(id) {
    const existing = productRepository.findById(id)
    if (!existing) throw new HttpError(404, 'Producto no encontrado')
    productRepository.remove(id)
    return { id: Number(id) }
  },

  brands(publishedOnly = true) {
    return productRepository.brands(publishedOnly)
  },

  stats() {
    return productRepository.stats()
  },
}
