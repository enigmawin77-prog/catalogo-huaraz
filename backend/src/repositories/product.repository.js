import { getDb } from '../config/database.js'

const SELECT = `
  SELECT p.*,
         c.name AS category_name,
         c.slug AS category_slug,
         c.icon AS category_icon
  FROM products p
  JOIN categories c ON c.id = p.category_id
`

function whereClause(filters) {
  const clauses = []
  const params = []

  if (filters.publishedOnly) {
    clauses.push('p.is_published = 1')
  }
  if (filters.search) {
    clauses.push(
      `(p.name LIKE ? OR p.brand LIKE ? OR p.description LIKE ? OR c.name LIKE ? OR c.slug LIKE ?)`,
    )
    const like = `%${filters.search}%`
    params.push(like, like, like, like, like)
  }
  if (filters.category) {
    clauses.push('(c.slug = ? OR c.id = ?)')
    params.push(filters.category, Number(filters.category) || 0)
  }
  if (filters.brand) {
    clauses.push('LOWER(p.brand) = LOWER(?)')
    params.push(filters.brand)
  }
  if (filters.availability) {
    clauses.push('p.availability = ?')
    params.push(filters.availability)
  }
  if (filters.featured) {
    clauses.push('p.is_featured = 1')
  }
  if (filters.isNew) {
    clauses.push('p.is_new = 1')
  }
  if (filters.onSale) {
    clauses.push('p.previous_price IS NOT NULL AND p.previous_price > p.price')
  }

  return {
    sql: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    params,
  }
}

function orderClause(sort) {
  switch (sort) {
    case 'price_asc':
      return 'ORDER BY p.price ASC, p.name ASC'
    case 'price_desc':
      return 'ORDER BY p.price DESC, p.name ASC'
    case 'name_asc':
      return 'ORDER BY p.name ASC'
    case 'name_desc':
      return 'ORDER BY p.name DESC'
    case 'newest':
      return 'ORDER BY p.created_at DESC, p.id DESC'
    default:
      return 'ORDER BY p.is_featured DESC, p.created_at DESC, p.id DESC'
  }
}

export const productRepository = {
  list(filters) {
    const { sql, params } = whereClause(filters)
    const order = orderClause(filters.sort)
    const limit = filters.limit
    const offset = (filters.page - 1) * filters.limit

    const totalRow = getDb()
      .prepare(`SELECT COUNT(*) AS total FROM products p JOIN categories c ON c.id = p.category_id ${sql}`)
      .get(...params)

    const items = getDb()
      .prepare(`${SELECT} ${sql} ${order} LIMIT ? OFFSET ?`)
      .all(...params, limit, offset)

    return { items, total: totalRow.total }
  },

  findById(id) {
    return getDb().prepare(`${SELECT} WHERE p.id = ?`).get(id)
  },

  findBySlug(slug) {
    return getDb().prepare(`${SELECT} WHERE p.slug = ?`).get(slug)
  },

  slugExists(slug, excludeId) {
    const row = excludeId
      ? getDb().prepare('SELECT id FROM products WHERE slug = ? AND id != ?').get(slug, excludeId)
      : getDb().prepare('SELECT id FROM products WHERE slug = ?').get(slug)
    return Boolean(row)
  },

  related(product, limit = 4) {
    return getDb()
      .prepare(
        `${SELECT}
         WHERE p.is_published = 1 AND p.id != ? AND p.category_id = ?
         ORDER BY p.is_featured DESC, p.created_at DESC
         LIMIT ?`,
      )
      .all(product.id, product.category_id, limit)
  },

  create(data) {
    const result = getDb()
      .prepare(
        `INSERT INTO products (
          name, slug, brand, category_id, description, price, previous_price,
          image_url, gallery, specs, highlights, stock, availability,
          is_published, is_featured, is_new
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        data.name,
        data.slug,
        data.brand,
        data.category_id,
        data.description,
        data.price,
        data.previous_price,
        data.image_url,
        data.gallery,
        data.specs,
        data.highlights,
        data.stock,
        data.availability,
        data.is_published,
        data.is_featured,
        data.is_new,
      )
    return this.findById(result.lastInsertRowid)
  },

  update(id, data) {
    getDb()
      .prepare(
        `UPDATE products SET
          name = ?, slug = ?, brand = ?, category_id = ?, description = ?,
          price = ?, previous_price = ?, image_url = ?, gallery = ?, specs = ?,
          highlights = ?, stock = ?, availability = ?, is_published = ?,
          is_featured = ?, is_new = ?, updated_at = datetime('now')
         WHERE id = ?`,
      )
      .run(
        data.name,
        data.slug,
        data.brand,
        data.category_id,
        data.description,
        data.price,
        data.previous_price,
        data.image_url,
        data.gallery,
        data.specs,
        data.highlights,
        data.stock,
        data.availability,
        data.is_published,
        data.is_featured,
        data.is_new,
        id,
      )
    return this.findById(id)
  },

  remove(id) {
    return getDb().prepare('DELETE FROM products WHERE id = ?').run(id)
  },

  brands(publishedOnly) {
    const sql = publishedOnly
      ? 'SELECT DISTINCT brand FROM products WHERE is_published = 1 ORDER BY brand'
      : 'SELECT DISTINCT brand FROM products ORDER BY brand'
    return getDb().prepare(sql).all().map((row) => row.brand)
  },

  stats() {
    const db = getDb()
    const total = db.prepare('SELECT COUNT(*) AS n FROM products').get().n
    const published = db.prepare('SELECT COUNT(*) AS n FROM products WHERE is_published = 1').get().n
    const featured = db.prepare('SELECT COUNT(*) AS n FROM products WHERE is_featured = 1').get().n
    const offers = db
      .prepare(
        'SELECT COUNT(*) AS n FROM products WHERE previous_price IS NOT NULL AND previous_price > price',
      )
      .get().n
    const outOfStock = db
      .prepare("SELECT COUNT(*) AS n FROM products WHERE availability = 'out_of_stock'")
      .get().n
    const categories = db.prepare('SELECT COUNT(*) AS n FROM categories').get().n
    return { total, published, featured, offers, outOfStock, categories }
  },
}
