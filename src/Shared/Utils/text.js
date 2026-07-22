export function splitParagraphs(value) {
  const paragraphs = []
  const lines = value.split('\n')
  let current = ''

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === '') {
      if (current.trim()) {
        paragraphs.push(current.trim())
        current = ''
      }
      continue
    }

    current = current ? `${current}\n${line}` : line
  }

  if (current.trim()) {
    paragraphs.push(current.trim())
  }

  return paragraphs
}

export function joinParagraphs(paragraphs) {
  return (paragraphs || []).join('\n\n')
}
