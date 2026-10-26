const API_BASE = import.meta.env.VITE_API_URL || '/api'

function getToken() {
  return localStorage.getItem('cth_token') || ''
}

export async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  const isForm = options.body instanceof FormData
  if (!isForm && options.body && typeof options.body === 'object') {
    headers['Content-Type'] = 'application/json'
    options = { ...options, body: JSON.stringify(options.body) }
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers })
  } catch {
    throw new Error('No se pudo conectar con el servidor. Comprueba que la API esté en marcha.')
  }

  const payload = await response.json().catch(() => ({}))
  if (!response.ok || payload.ok === false) {
    const error = new Error(payload.error || `Error ${response.status}`)
    error.details = payload.details
    error.status = response.status
    throw error
  }
  return payload
}

/** Mapeo de icono de categoría → imagen de placeholder */
const ICON_PLACEHOLDER = {
  laptop: '/images/placeholders/laptop.svg',
  cpu: '/images/placeholders/cpu.svg',
  keyboard: '/images/placeholders/keyboard.svg',
  phone: '/images/placeholders/phone.svg',
  game: '/images/placeholders/gamepad.svg',
  audio: '/images/placeholders/headset.svg',
  storage: '/images/placeholders/ssd.svg',
  network: '/images/placeholders/router.svg',
  chip: '/images/placeholders/cpu.svg',
  desktop: '/images/placeholders/desktop.svg',
  gpu: '/images/placeholders/gpu.svg',
  ram: '/images/placeholders/ram.svg',
  hdd: '/images/placeholders/hdd.svg',
  mouse: '/images/placeholders/mouse.svg',
  tablet: '/images/placeholders/tablet.svg',
  speaker: '/images/placeholders/speaker.svg',
  chair: '/images/placeholders/chair.svg',
  usb: '/images/placeholders/usb.svg',
}

const DEFAULT_PLACEHOLDER = '/images/placeholders/laptop.svg'

/**
 * Devuelve la URL completa de una imagen de producto.
 * Si no hay imagen, intenta usar el placeholder correspondiente al icono
 * de la categoría del producto.
 *
 * @param {string|null} src   - imagen del producto
 * @param {string}      icon  - icono de la categoría (e.g. "laptop", "cpu")
 */
export function mediaUrl(src, icon = '') {
  if (!src) return ICON_PLACEHOLDER[icon] || DEFAULT_PLACEHOLDER
  if (src.startsWith('http')) return src
  return src
}
