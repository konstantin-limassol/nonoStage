export function onlyNumbersInString(str: string): string {
  return str.replace(/\D/g, "")
}
