import path from 'node:path'
import multer from 'multer'
import { env } from '../config/env.js'
import { HttpError } from '../utils/http.js'

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(env.uploadDir, 'products')),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const safeExt = ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext) ? ext : '.bin'
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`)
  },
})

export const uploadProductImage = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED.has(file.mimetype)) {
      cb(new HttpError(400, 'Solo se permiten imágenes JPG, PNG, WEBP o SVG'))
      return
    }
    cb(null, true)
  },
}).single('image')
