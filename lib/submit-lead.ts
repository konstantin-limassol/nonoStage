"use client"

import type { FormData } from "@/lib/form-types"
import { getOrCreateSessionId } from "@/lib/session-id"
import { getSubmitParams } from "@/lib/url-params"
import { LEAD_POST_TIMEOUT_MS } from "@/lib/moneyfor/constants"
import { LEAD_PROXY_PREFIX } from "@/lib/moneyfor/proxy"
import type {
  LeadProxyErrorResponse,
  LeadProxySuccessResponse,
} from "@/lib/moneyfor/types"

type LeadProxyResponse = LeadProxySuccessResponse | LeadProxyErrorResponse

export async function submitLead(
  formData: FormData,
): Promise<LeadProxySuccessResponse> {
  const params = getSubmitParams()

  const response = await fetch(LEAD_PROXY_PREFIX, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(LEAD_POST_TIMEOUT_MS + 2_000),
    body: JSON.stringify({
      ...formData,
      source: params.source,
      pathName: params.pathName,
      subId1: getOrCreateSessionId(),
    }),
  })

  const result = (await response.json()) as LeadProxyResponse

  if (!response.ok || !result.ok) {
    const message = result.ok ? "Submit failed" : result.message
    throw new Error(message)
  }

  return result
}
