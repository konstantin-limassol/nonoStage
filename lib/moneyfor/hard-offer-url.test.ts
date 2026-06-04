import { afterEach, describe, expect, it } from "vitest"
import {
  buildHardOfferRedirectUrl,
  correlationIdFromFetchError,
  correlationIdFromHttpResponse,
  correlationIdFromMfReject,
  getHardOfferOrigin,
} from "@/lib/moneyfor/hard-offer-url"
import {
  HARD_OFFER_ORIGIN_PROD,
  HARD_OFFER_ORIGIN_STAGING,
} from "@/lib/moneyfor/constants"

const ORIGINAL_LOCATION = process.env.NEXT_PUBLIC_LOCATION

afterEach(() => {
  if (ORIGINAL_LOCATION === undefined) {
    delete process.env.NEXT_PUBLIC_LOCATION
  } else {
    process.env.NEXT_PUBLIC_LOCATION = ORIGINAL_LOCATION
  }
})

describe("getHardOfferOrigin", () => {
  it("uses staging origin when not prod", () => {
    process.env.NEXT_PUBLIC_LOCATION = "staging"
    expect(getHardOfferOrigin()).toBe(HARD_OFFER_ORIGIN_STAGING)
  })

  it("uses prod origin when NEXT_PUBLIC_LOCATION is prod", () => {
    process.env.NEXT_PUBLIC_LOCATION = "prod"
    expect(getHardOfferOrigin()).toBe(HARD_OFFER_ORIGIN_PROD)
  })
})

describe("buildHardOfferRedirectUrl", () => {
  it("builds surveys1 success URL with publisher as source", () => {
    process.env.NEXT_PUBLIC_LOCATION = "staging"

    const url = buildHardOfferRedirectUrl("abc-lead", "nonodebt")

    expect(url).toBe(
      "https://stage.surveys1.com/p/success?source=nonodebt&correlationId=abc-lead",
    )
  })

  it("uses prod host when location is prod", () => {
    process.env.NEXT_PUBLIC_LOCATION = "prod"

    const url = buildHardOfferRedirectUrl("timeout", "my-publisher")

    expect(url).toBe(
      "https://surveys1.com/p/success?source=my-publisher&correlationId=timeout",
    )
  })
})

describe("correlationIdFromMfReject", () => {
  it("returns leadId when present", () => {
    expect(correlationIdFromMfReject("lead-99")).toBe("lead-99")
  })

  it("returns empty when leadId is missing or blank", () => {
    expect(correlationIdFromMfReject(undefined)).toBe("empty")
    expect(correlationIdFromMfReject("   ")).toBe("empty")
  })
})

describe("correlationIdFromHttpResponse", () => {
  it("returns error for HTTP 500", () => {
    const response = new Response(null, { status: 500 })
    expect(correlationIdFromHttpResponse(response)).toBe("error")
  })

  it("returns X-Request-ID when present", () => {
    const response = new Response(null, {
      status: 502,
      headers: { "X-Request-ID": "req-xyz" },
    })
    expect(correlationIdFromHttpResponse(response)).toBe("req-xyz")
  })

  it("prefers error over X-Request-ID on 500", () => {
    const response = new Response(null, {
      status: 500,
      headers: { "X-Request-ID": "req-xyz" },
    })
    expect(correlationIdFromHttpResponse(response)).toBe("error")
  })

  it("returns empty for other non-ok responses without header", () => {
    const response = new Response(null, { status: 400 })
    expect(correlationIdFromHttpResponse(response)).toBe("empty")
  })
})

describe("correlationIdFromFetchError", () => {
  it("returns timeout for TimeoutError", () => {
    const error = new Error("timed out")
    error.name = "TimeoutError"
    expect(correlationIdFromFetchError(error)).toBe("timeout")
  })

  it("returns empty for other errors", () => {
    expect(correlationIdFromFetchError(new Error("network"))).toBe("empty")
    expect(correlationIdFromFetchError(null)).toBe("empty")
  })
})
