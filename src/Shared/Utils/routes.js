import { normalizeSlug } from './slug'

export function getPublicPath(slug) {
  const normalized = normalizeSlug(slug)
  if (!normalized || normalized === 'home') {
    return '/site'
  }
  return `/site/${normalized}`
}

export function resolvePublicSlug(paramSlug) {
  return paramSlug || 'home'
}
