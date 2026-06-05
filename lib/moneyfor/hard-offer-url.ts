import {
  HARD_OFFER_ORIGIN_PROD,
  HARD_OFFER_ORIGIN_STAGING,
  HARD_OFFER_SUCCESS_PATH,
} from "@/lib/moneyfor/constants"
import { isProdLocation } from "@/lib/utils/app"

export function getHardOfferOrigin(): string {
  return isProdLocation() ? HARD_OFFER_ORIGIN_PROD : HARD_OFFER_ORIGIN_STAGING
}

/** `source` must match `LEAD_POST_SOURCE` in `constants.ts` (e.g. `nonodebt`). */
export function buildHardOfferRedirectUrl(
  correlationId: string,
  source: string,
): string {
  const url = new URL(HARD_OFFER_SUCCESS_PATH, getHardOfferOrigin())
  url.searchParams.set("source", source)
  url.searchParams.set("correlationId", correlationId)
  return url.href
}

export function correlationIdFromMfReject(leadId: string | undefined): string {
  const trimmed = leadId?.trim()
  return trimmed ? trimmed : "empty"
}

export function correlationIdFromHttpResponse(response: Response): string {
  if (response.status === 500) {
    return "error"
  }

  const requestId = response.headers.get("X-Request-ID")?.trim()
  if (requestId) {
    return requestId
  }

  return "empty"
}

export function correlationIdFromFetchError(error: unknown): string {
  if (error instanceof Error && error.name === "TimeoutError") {
    return "timeout"
  }

  return "empty"
}
