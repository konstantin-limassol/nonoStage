import type { FormData } from "@/lib/form-types"
import { onlyNumbersInString } from "@/lib/string"

export function normalizeFormData(data: FormData): FormData {
  return {
    ...data,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    phone: onlyNumbersInString(data.phone).slice(0, 10),
    state: data.state.trim().toUpperCase(),
  }
}
