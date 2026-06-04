export function getUrlSearchParams(): Record<string, string> {
  if (typeof window === "undefined") {
    return {}
  }

  return Object.fromEntries(new URLSearchParams(window.location.search))
}

export function getSubmitParams(): Record<string, string> & {
  pathName: string
  source: string
} {
  const searchParams = getUrlSearchParams()
  const source =
    searchParams.source ?? searchParams.utm_source ?? searchParams.utm_campaign ?? ""

  return {
    ...searchParams,
    pathName: typeof window !== "undefined" ? window.location.pathname : "/",
    source,
  }
}
