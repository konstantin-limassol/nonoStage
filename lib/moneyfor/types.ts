export type MoneyforLeadData = {
  debt_amount: string
  debt_type: string
  state: string
  first_name: string
  last_name: string
  email: string
  home_phone: string
}

export type MoneyforLeadPostRequest = {
  campaignId: string
  leadData: MoneyforLeadData
  source?: string
  subId1?: string
  pathName?: string
  [key: string]: string | MoneyforLeadData | undefined
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
  source?: string
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
