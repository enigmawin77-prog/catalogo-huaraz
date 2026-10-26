import { productService } from '../services/product.service.js'
import { asyncHandler, created, ok } from '../utils/http.js'

export const productController = {
  list: asyncHandler((req, res) => {
    const result = productService.list(req.query)
    return ok(res, result.items, 200, result.meta)
  }),

  listAdmin: asyncHandler((req, res) => {
    const result = productService.list(req.query, { includeUnpublished: true })
    return ok(res, result.items, 200, result.meta)
  }),

  get: asyncHandler((req, res) => {
    return ok(res, productService.getByParam(req.params.id))
  }),

  getAdmin: asyncHandler((req, res) => {
    return ok(res, productService.getAdmin(req.params.id))
  }),

  create: asyncHandler((req, res) => {
    const product = productService.create(req.body)
    return created(res, product)
  }),

  update: asyncHandler((req, res) => {
    return ok(res, productService.update(req.params.id, req.body))
  }),

  remove: asyncHandler((req, res) => {
    return ok(res, productService.remove(req.params.id))
  }),

  brands: asyncHandler((_req, res) => {
    return ok(res, productService.brands(true))
  }),

  upload: asyncHandler((req, res) => {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'No se recibió ninguna imagen' })
    }
    const imageUrl = `/uploads/products/${req.file.filename}`
    return created(res, { imageUrl })
  }),
}
