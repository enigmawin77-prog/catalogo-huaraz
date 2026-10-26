import { categoryService } from '../services/category.service.js'
import { asyncHandler, created, ok } from '../utils/http.js'

export const categoryController = {
  list: asyncHandler((_req, res) => ok(res, categoryService.list())),
  get: asyncHandler((req, res) => ok(res, categoryService.getByParam(req.params.id))),
  create: asyncHandler((req, res) => created(res, categoryService.create(req.body))),
  update: asyncHandler((req, res) => ok(res, categoryService.update(req.params.id, req.body))),
  remove: asyncHandler((req, res) => ok(res, categoryService.remove(req.params.id))),
}
