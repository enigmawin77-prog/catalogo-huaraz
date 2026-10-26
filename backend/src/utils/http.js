export class HttpError extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

export function ok(res, data, status = 200, meta) {
  const body = { ok: true, data }
  if (meta) body.meta = meta
  return res.status(status).json(body)
}

export function created(res, data) {
  return ok(res, data, 201)
}

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export function parseBool(value, fallback = undefined) {
  if (value === undefined || value === null || value === '') return fallback
  if (value === true || value === 'true' || value === '1' || value === 1) return true
  if (value === false || value === 'false' || value === '0' || value === 0) return false
  return fallback
}

export function parsePositiveInt(value, fallback) {
  const n = Number.parseInt(String(value), 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}
