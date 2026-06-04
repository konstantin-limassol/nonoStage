import type { FormData, FormErrors } from "@/lib/form-types"
import { validation } from "@/lib/validation"

const STEP_1_FIELDS = ["debtAmount", "debtType", "state"] as const
const STEP_2_FIELDS = ["firstName", "lastName", "email", "phone"] as const

function validateDebtAmount(value: string): string | null {
  if (!value) {
    return "Please choose a valid debt amount."
  }
  return null
}

function validateDebtType(value: string): string | null {
  if (!value) {
    return "Please choose a valid debt type."
  }
  return null
}

function validateState(value: string): string | null {
  if (!value || !validation.usStateCode(value.toUpperCase())) {
    return "Please select your state."
  }
  return null
}

function validateFirstName(value: string): string | null {
  if (!validation.personalName(value)) {
    return 'Please, enter a First Name'
  }
  return null
}

function validateLastName(value: string): string | null {
  if (!validation.personalName(value)) {
    return 'Please, enter a Last Name'
  }
  return null
}

function validateEmail(value: string): string | null {
  if (!validation.email(value)) {
    return 'Please, enter a correct Email'
  }
  return null
}

function validatePhone(value: string): string | null {
  if (!validation.phoneNumberUS(value)) {
    return 'Please, enter a correct Phone Number'
  }
  return null
}

const validators: Record<keyof FormData, (value: string) => string | null> = {
  debtAmount: validateDebtAmount,
  debtType: validateDebtType,
  state: validateState,
  firstName: validateFirstName,
  lastName: validateLastName,
  email: validateEmail,
  phone: validatePhone,
}

function validateFields(
  data: FormData,
  fields: readonly (keyof FormData)[],
): FormErrors {
  const errors: FormErrors = {}

  for (const field of fields) {
    const message = validators[field](data[field])
    if (message) {
      errors[field] = message
    }
  }

  return errors
}

export function validateStep1(data: FormData): FormErrors {
  return validateFields(data, STEP_1_FIELDS)
}

export function validateStep2(data: FormData): FormErrors {
  return validateFields(data, [...STEP_1_FIELDS, ...STEP_2_FIELDS])
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0
}

export function step1HasErrors(errors: FormErrors): boolean {
  return STEP_1_FIELDS.some((field) => errors[field])
}
