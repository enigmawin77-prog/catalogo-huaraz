import { Router } from 'express'
import { categoryController } from '../controllers/category.controller.js'
import { requireAdmin, requireAuth } from '../middlewares/auth.js'

const router = Router()

router.get('/', categoryController.list)
router.get('/:id', categoryController.get)
router.post('/', requireAuth, requireAdmin, categoryController.create)
router.put('/:id', requireAuth, requireAdmin, categoryController.update)
router.delete('/:id', requireAuth, requireAdmin, categoryController.remove)

export default router
