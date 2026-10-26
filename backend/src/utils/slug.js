export function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function uniqueSlug(base, existsFn) {
  const root = slugify(base) || 'item'
  let candidate = root
  let i = 2
  while (existsFn(candidate)) {
    candidate = `${root}-${i}`
    i += 1
  }
  return candidate
}
