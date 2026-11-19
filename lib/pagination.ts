export function getPageItems(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages = new Set([1, total, current - 1, current, current + 1])
  const sorted = [...pages]
    .filter((page) => page > 0 && page <= total)
    .sort((a, b) => a - b)
  const items: (number | "ellipsis")[] = []
  let previous = 0

  for (const page of sorted) {
    if (page - previous > 1) items.push("ellipsis")
    items.push(page)
    previous = page
  }

  return items
}
