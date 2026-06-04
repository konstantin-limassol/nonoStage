export function isProdLocation(): boolean {
  return process.env.NEXT_PUBLIC_LOCATION === "prod"
}
