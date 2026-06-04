import type { FormData } from "@/lib/form-types"
import { normalizeFormData } from "@/lib/normalize-form"
import type { MoneyforLeadData } from "@/lib/moneyfor/types"

export function mapFormToMoneyforLeadData(data: FormData): MoneyforLeadData {
  const normalized = normalizeFormData(data)

  return {
    debt_amount: normalized.debtAmount,
    debt_type: normalized.debtType,
    state: normalized.state,
    first_name: normalized.firstName,
    last_name: normalized.lastName,
    email: normalized.email,
    home_phone: normalized.phone,
  }
}
