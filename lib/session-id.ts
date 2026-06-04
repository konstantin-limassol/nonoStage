const SESSION_STORAGE_KEY = "nonodebt_session_id"

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") {
    return ""
  }

  const existing = sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (existing) {
    return existing
  }

  const sessionId = crypto.randomUUID()
  sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId)
  return sessionId
}
