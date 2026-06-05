import { normalizeFormData } from "@/lib/normalize-form"
import type { LeadClientMeta, LeadMapInput, MoneyforLeadData } from "@/lib/moneyfor/types"

export function mapFormToMoneyforLeadData(
  data: LeadMapInput,
  clientMeta: LeadClientMeta = {},
): MoneyforLeadData {
  const { source, ...formData } = data
  const normalized = normalizeFormData(formData)

  return {
    debt_amount: normalized.debtAmount,
    debt_type: normalized.debtType,
    state: normalized.state,
    first_name: normalized.firstName,
    last_name: normalized.lastName,
    email: normalized.email,
    home_phone: normalized.phone,
    source,
    ...clientMeta,
  }
}
