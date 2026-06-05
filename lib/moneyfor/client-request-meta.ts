import type { LeadClientMeta } from "@/lib/moneyfor/types"

function firstForwardedIp(value: string | null): string | undefined {
  if (!value) {
    return undefined
  }

  const first = value.split(",")[0]?.trim()
  return first || undefined
}

function getClientIp(request: Request): string | undefined {
  return (
    firstForwardedIp(request.headers.get("x-forwarded-for")) ??
    (request.headers.get("x-real-ip")?.trim() ||
      firstForwardedIp(request.headers.get("x-vercel-forwarded-for")))
  )
}

/** Server-side client metadata for MF leadData (from incoming proxy request). */
export function getClientRequestMeta(request: Request): LeadClientMeta {
  const client_user_agent = request.headers.get("user-agent")?.trim()
  const client_ip = getClientIp(request)
  const client_browser_referer = request.headers.get("referer")?.trim()

  return {
    ...(client_user_agent ? { client_user_agent } : {}),
    ...(client_ip ? { client_ip } : {}),
    ...(client_browser_referer ? { client_browser_referer } : {}),
  }
}
