import { env } from '../config/env.js'
import { productService } from '../services/product.service.js'
import { authService } from '../services/auth.service.js'
import { asyncHandler, HttpError, ok } from '../utils/http.js'

export const authController = {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body || {}
    if (!email || !password) throw new HttpError(400, 'Correo y contraseña son obligatorios')
    return ok(res, await authService.login(email, password))
  }),

  me: asyncHandler((req, res) => ok(res, req.user)),

  stats: asyncHandler((_req, res) => ok(res, productService.stats())),

  settings: asyncHandler((_req, res) => {
    const social = Object.fromEntries(Object.entries(env.social).filter(([, value]) => value))
    const contact = Object.fromEntries(Object.entries(env.contact).filter(([, value]) => value))
    return ok(res, {
      siteName: 'Catálogo Tecnológico Huaraz',
      contact,
      social,
    })
  }),
}
