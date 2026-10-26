import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { authController } from '../controllers/auth.controller.js'
import { productController } from '../controllers/product.controller.js'
import { requireAdmin, requireAuth } from '../middlewares/auth.js'

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Demasiados intentos de acceso. Espera unos minutos.' },
})

const router = Router()

router.post('/login', loginLimiter, authController.login)
router.get('/me', requireAuth, authController.me)
router.get('/stats', requireAuth, requireAdmin, authController.stats)
router.get('/products', requireAuth, requireAdmin, productController.listAdmin)

export default router
