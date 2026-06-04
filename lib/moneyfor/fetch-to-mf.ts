import { getDomainMf } from "@/lib/utils/domains"

type FetchToMfOptions = {
  path: string
  method?: string
  headers?: HeadersInit
  body?: string
  signal?: AbortSignal
}

/** Mirrors moneyfor-admin front-api-v2/services/fetch-to-mf.ts */
export async function fetchToMf({
  path,
  method = "GET",
  headers,
  body,
  signal,
}: FetchToMfOptions): Promise<Response> {
  const url = new URL(path.replace(/^\//, ""), getDomainMf()).href

  return fetch(url, {
    method,
    headers,
    body,
    signal,
  })
}
