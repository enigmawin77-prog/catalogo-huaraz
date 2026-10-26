import { getDb } from '../config/database.js'

export const userRepository = {
  count() {
    return getDb().prepare('SELECT COUNT(*) AS n FROM users').get().n
  },

  findByEmail(email) {
    return getDb().prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').get(email)
  },

  findById(id) {
    return getDb().prepare('SELECT id, email, role, created_at FROM users WHERE id = ?').get(id)
  },

  create({ email, passwordHash, role = 'admin' }) {
    const result = getDb()
      .prepare('INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)')
      .run(email.trim().toLowerCase(), passwordHash, role)
    return this.findById(result.lastInsertRowid)
  },
}
