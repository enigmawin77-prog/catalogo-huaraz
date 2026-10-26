import { Router } from 'express'
import { productController } from '../controllers/product.controller.js'
import { requireAdmin, requireAuth } from '../middlewares/auth.js'
import { uploadProductImage } from '../middlewares/upload.js'

const router = Router()

// Rutas de solo lectura (públicas)
router.get('/', productController.list)
router.get('/brands', productController.brands)

// IMPORTANTE: /upload debe ir ANTES de /:id para que Express no
// interprete "upload" como un parámetro :id
router.post('/upload', requireAuth, requireAdmin, uploadProductImage, productController.upload)

router.get('/:id', productController.get)
router.post('/', requireAuth, requireAdmin, productController.create)
router.put('/:id', requireAuth, requireAdmin, productController.update)
router.delete('/:id', requireAuth, requireAdmin, productController.remove)

export default router
