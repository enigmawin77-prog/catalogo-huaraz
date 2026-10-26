import { Router } from 'express'
import { authController } from '../controllers/auth.controller.js'
import { productController } from '../controllers/product.controller.js'
import { requireAdmin, requireAuth } from '../middlewares/auth.js'

const router = Router()

router.use(requireAuth, requireAdmin)
router.get('/stats', authController.stats)
router.get('/products', productController.listAdmin)
router.get('/products/:id', productController.getAdmin)

export default router
