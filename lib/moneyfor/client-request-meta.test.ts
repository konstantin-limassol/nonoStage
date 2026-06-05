import { describe, expect, it } from "vitest"
import { getClientRequestMeta } from "@/lib/moneyfor/client-request-meta"

function makeRequest(headers: Record<string, string>): Request {
  return new Request("https://nonostage.vercel.app/api/lead", {
    method: "POST",
    headers,
  })
}

describe("getClientRequestMeta", () => {
  it("extracts user agent, ip, and referer from request headers", () => {
    const request = makeRequest({
      "user-agent": "Mozilla/5.0 Test",
      "x-forwarded-for": "203.0.113.1, 10.0.0.1",
      referer: "https://nonostage.vercel.app/",
    })

    expect(getClientRequestMeta(request)).toEqual({
      client_user_agent: "Mozilla/5.0 Test",
      client_ip: "203.0.113.1",
      client_browser_referer: "https://nonostage.vercel.app/",
    })
  })

  it("falls back to x-real-ip and x-vercel-forwarded-for", () => {
    const request = makeRequest({
      "x-real-ip": "198.51.100.2",
    })

    expect(getClientRequestMeta(request).client_ip).toBe("198.51.100.2")

    const vercelRequest = makeRequest({
      "x-vercel-forwarded-for": "192.0.2.3, 10.1.1.1",
    })

    expect(getClientRequestMeta(vercelRequest).client_ip).toBe("192.0.2.3")
  })

  it("omits empty header values", () => {
    expect(getClientRequestMeta(makeRequest({}))).toEqual({})
  })
})
