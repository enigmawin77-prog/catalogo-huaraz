export function formatPrice(value) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

export function availabilityLabel(value) {
  return {
    in_stock: 'En stock',
    limited: 'Stock limitado',
    out_of_stock: 'Agotado',
  }[value] || value
}

export function yearNow() {
  return new Date().getFullYear()
}
