import { env } from '../config/env.js'
import { HttpError } from '../utils/http.js'

export function notFound(_req, res) {
  res.status(404).json({ ok: false, error: 'Ruta no encontrada' })
}

export function errorHandler(err, _req, res, _next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      ok: false,
      error: err.message,
      details: err.details,
    })
  }

  if (err?.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ ok: false, error: 'El archivo supera el tamaño máximo permitido (2 MB)' })
  }

  console.error(err)
  const message = env.nodeEnv === 'production' ? 'Error interno del servidor' : err.message
  return res.status(500).json({ ok: false, error: message })
}
