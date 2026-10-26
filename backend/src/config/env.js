import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendRoot = path.resolve(__dirname, '../..')

dotenv.config({ path: path.join(backendRoot, '.env') })

function required(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined || value === '') {
    throw new Error(`Falta la variable de entorno ${name}`)
  }
  return value
}

export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  jwtSecret: required('JWT_SECRET', process.env.NODE_ENV === 'production' ? undefined : 'dev-only-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  sqlitePath: path.resolve(backendRoot, process.env.SQLITE_PATH || './data/catalogo.db'),
  uploadDir: path.resolve(backendRoot, process.env.UPLOAD_DIR || './uploads'),
  contact: {
    email: process.env.CONTACT_EMAIL || '',
    phone: process.env.CONTACT_PHONE || '',
    address: process.env.CONTACT_ADDRESS || '',
  },
  social: {
    facebook: process.env.SOCIAL_FACEBOOK || '',
    instagram: process.env.SOCIAL_INSTAGRAM || '',
    whatsapp: process.env.SOCIAL_WHATSAPP || '',
  },
  adminEmail: process.env.ADMIN_EMAIL || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  backendRoot,
}

export function ensureRuntimeDirs() {
  fs.mkdirSync(path.dirname(env.sqlitePath), { recursive: true })
  fs.mkdirSync(env.uploadDir, { recursive: true })
  fs.mkdirSync(path.join(env.uploadDir, 'products'), { recursive: true })
}
