import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { userRepository } from '../repositories/user.repository.js'
import { HttpError } from '../utils/http.js'

function tokenFor(user) {
  return jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
}

export const authService = {
  async login(email, password) {
    const user = userRepository.findByEmail(String(email || '').trim())
    if (!user) throw new HttpError(401, 'Credenciales inválidas')
    const valid = await bcrypt.compare(String(password || ''), user.password_hash)
    if (!valid) throw new HttpError(401, 'Credenciales inválidas')
    return {
      token: tokenFor(user),
      user: { id: user.id, email: user.email, role: user.role },
    }
  },

  me(id) {
    const user = userRepository.findById(id)
    if (!user) throw new HttpError(401, 'Sesión inválida')
    return user
  },

  async createAdmin(email, password) {
    const normalized = String(email || '').trim().toLowerCase()
    if (!normalized.includes('@')) throw new HttpError(400, 'Correo inválido')
    if (String(password || '').length < 10) {
      throw new HttpError(400, 'La contraseña debe tener al menos 10 caracteres')
    }
    if (userRepository.findByEmail(normalized)) {
      throw new HttpError(409, 'Ya existe un usuario con ese correo')
    }
    const passwordHash = await bcrypt.hash(password, 12)
    return userRepository.create({ email: normalized, passwordHash })
  },
}
