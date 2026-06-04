/**
 * Client → local Next proxy (like moneyfor-admin fetchMutatorMf + PROXY_PREFIX).
 * Server → getDomainMf() + MF API path (like fetch-to-mf.ts).
 */

/** Browser calls only this prefix; credentials stay on the server. */
export const LEAD_PROXY_PREFIX = "/api/lead"

/** Moneyfor publisher API path (server-side). */
export const MF_LEAD_POST_PATH = "api/lead/post"
