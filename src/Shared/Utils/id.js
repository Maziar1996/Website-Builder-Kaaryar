export function createId(prefix = 'sec') {
  const randomPart = Math.random().toString(36).slice(2, 9)
  return `${prefix}_${randomPart}`
}
