import { DatabaseSync } from 'node:sqlite'
import { env, ensureRuntimeDirs } from './env.js'

let db

const SCHEMA = `
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'chip',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL CHECK (price >= 0),
  previous_price REAL CHECK (previous_price IS NULL OR previous_price >= 0),
  image_url TEXT,
  gallery TEXT NOT NULL DEFAULT '[]',
  specs TEXT NOT NULL DEFAULT '{}',
  highlights TEXT NOT NULL DEFAULT '[]',
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  availability TEXT NOT NULL DEFAULT 'in_stock' CHECK (availability IN ('in_stock', 'limited', 'out_of_stock')),
  is_published INTEGER NOT NULL DEFAULT 1 CHECK (is_published IN (0, 1)),
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
  is_new INTEGER NOT NULL DEFAULT 0 CHECK (is_new IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`

export function getDb() {
  if (!db) {
    throw new Error('La base de datos no está inicializada')
  }
  return db
}

export function initDatabase() {
  ensureRuntimeDirs()
  db = new DatabaseSync(env.sqlitePath)
  db.exec(SCHEMA)
  return db
}

export function closeDatabase() {
  if (db) {
    db.close()
    db = undefined
  }
}
