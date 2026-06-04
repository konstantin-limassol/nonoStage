export type FormData = {
  debtAmount: string
  debtType: string
  state: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type FormErrors = Partial<Record<keyof FormData, string>>

export const emptyFormData: FormData = {
  debtAmount: "",
  debtType: "",
  state: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
}
