import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { userRepository } from '../repositories/user.repository.js'
import { HttpError } from '../utils/http.js'

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || ''
  const [, token] = header.split(' ')
  if (!token) return next(new HttpError(401, 'Autenticación requerida'))

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    const user = userRepository.findById(payload.sub)
    if (!user) return next(new HttpError(401, 'Sesión inválida'))
    req.user = user
    return next()
  } catch {
    return next(new HttpError(401, 'Token inválido o expirado'))
  }
}

export function requireAdmin(req, _res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return next(new HttpError(403, 'Se requieren permisos de administrador'))
  }
  return next()
}
