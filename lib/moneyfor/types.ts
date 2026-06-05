export type LeadClientMeta = {
  client_user_agent?: string
  client_ip?: string
  client_browser_referer?: string
}

export type MoneyforLeadData = {
  debt_amount: string
  debt_type: string
  state: string
  first_name: string
  last_name: string
  email: string
  home_phone: string
  source: string
} & LeadClientMeta

export type MoneyforLeadPostRequest = {
  campaignId: string
  source: string
  leadData: MoneyforLeadData
  subId1?: string
  pathName?: string
}

export type MoneyforLeadPostStatus = "accepted" | "rejected"

export type MoneyforLeadPostResponse = {
  leadId: string
  status: MoneyforLeadPostStatus
  redirectURL?: string | null
  errors?: string[]
}

export type LeadProxyClientBody = {
  debtAmount: string
  debtType: string
  state: string
  firstName: string
  lastName: string
  email: string
  phone: string
  subId1?: string
  pathName?: string
}

export type LeadProxySuccessResponse = {
  ok: true
  leadId: string
  redirectUrl: string
}

export type LeadProxyErrorResponse = {
  ok: false
  message: string
}
