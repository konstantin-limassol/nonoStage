export function formatPhone(digits: string): string {
  const match = digits.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/)
  if (!match) {
    return ""
  }

  const [, area, mid, last] = match
  const first = mid ? `(${area})` : `(${area}`
  return `${area ? first : ""}${mid ? ` - ${mid}` : ""}${last ? ` - ${last}` : ""}`
}
