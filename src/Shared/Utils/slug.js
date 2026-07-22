export function normalizeSlug(value) {
  const trimmed = value.trim()
  if (trimmed.startsWith('/')) {
    return trimmed.slice(1)
  }
  return trimmed
}

export function buildActiveHref(slug) {
  const normalized = normalizeSlug(slug)
  if (!normalized || normalized === 'home') {
    return '/site'
  }
  return `/site/${normalized}`
}
