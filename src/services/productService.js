import { api } from './api.js'

function qs(params) {
  const search = new URLSearchParams()
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, value)
  })
  const str = search.toString()
  return str ? `?${str}` : ''
}

export const productService = {
  list: (params) => api(`/products${qs(params)}`),
  brands: () => api('/products/brands'),
  get: (id) => api(`/products/${id}`),
  create: (body) => api('/products', { method: 'POST', body }),
  update: (id, body) => api(`/products/${id}`, { method: 'PUT', body }),
  remove: (id) => api(`/products/${id}`, { method: 'DELETE' }),
  upload: (file) => {
    const body = new FormData()
    body.append('image', file)
    return api('/products/upload', { method: 'POST', body })
  },
}

export const categoryService = {
  list: () => api('/categories'),
  create: (body) => api('/categories', { method: 'POST', body }),
  update: (id, body) => api(`/categories/${id}`, { method: 'PUT', body }),
  remove: (id) => api(`/categories/${id}`, { method: 'DELETE' }),
}

export const authService = {
  login: (body) => api('/auth/login', { method: 'POST', body }),
  me: () => api('/auth/me'),
  stats: () => api('/admin/stats'),
  adminProducts: (params) => api(`/admin/products${qs(params)}`),
  settings: () => api('/settings'),
}
