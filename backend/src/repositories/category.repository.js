import { getDb } from '../config/database.js'

export const categoryRepository = {
  list() {
    return getDb()
      .prepare(
        `SELECT c.*,
          (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS product_count,
          (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id AND p.is_published = 1) AS published_count
         FROM categories c
         ORDER BY c.name ASC`,
      )
      .all()
  },

  findById(id) {
    return getDb().prepare('SELECT * FROM categories WHERE id = ?').get(id)
  },

  findBySlug(slug) {
    return getDb().prepare('SELECT * FROM categories WHERE slug = ?').get(slug)
  },

  create(data) {
    const result = getDb()
      .prepare(
        `INSERT INTO categories (slug, name, description, icon)
         VALUES (?, ?, ?, ?)`,
      )
      .run(data.slug, data.name, data.description, data.icon)
    return this.findById(result.lastInsertRowid)
  },

  update(id, data) {
    getDb()
      .prepare(
        `UPDATE categories
         SET slug = ?, name = ?, description = ?, icon = ?, updated_at = datetime('now')
         WHERE id = ?`,
      )
      .run(data.slug, data.name, data.description, data.icon, id)
    return this.findById(id)
  },

  remove(id) {
    return getDb().prepare('DELETE FROM categories WHERE id = ?').run(id)
  },

  countProducts(id) {
    const row = getDb().prepare('SELECT COUNT(*) AS total FROM products WHERE category_id = ?').get(id)
    return row?.total ?? 0
  },
}
