import path from 'node:path'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import adminRoutes from './routes/admin.routes.js'
import authRoutes from './routes/auth.routes.js'
import categoryRoutes from './routes/category.routes.js'
import productRoutes from './routes/product.routes.js'
import { asyncHandler, ok } from './utils/http.js'
import { authController } from './controllers/auth.controller.js'

export function createApp() {
  const app = express()

  app.set('trust proxy', 1)
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false,
    }),
  )
  app.use(
    cors({
      origin: env.frontendOrigin.split(',').map((item) => item.trim()),
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use('/uploads', express.static(path.join(env.uploadDir)))

  app.get(
    '/api/health',
    asyncHandler((_req, res) =>
      ok(res, {
        status: 'ok',
        service: 'catalogo-huaraz-api',
        time: new Date().toISOString(),
      }),
    ),
  )
  app.get('/api/settings', authController.settings)
  app.use('/api/products', productRoutes)
  app.use('/api/categories', categoryRoutes)
  app.use('/api/auth', authRoutes)
  app.use('/api/admin', adminRoutes)

  app.use(notFound)
  app.use(errorHandler)
  return app
}
