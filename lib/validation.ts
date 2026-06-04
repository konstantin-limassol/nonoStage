const regExps = {
  EMAIL: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,20}$/i,
  PERSONAL_NAME: /^[a-z'‘’❜‛ -]{2,}$/i,
  USA_PHONE_NUMBER: /^[2-9]{1}\d{2}[2-9]\d{6}$/,
  US_STATE_CODE: /^[A-Z]{2}$/,
}

function isBetween(min: number, val: number, max: number): boolean {
  return min <= val && val <= max
}

export const validation = {
  email: (value: string): boolean => regExps.EMAIL.test(value),
  length: (value: string, minLength = 0, maxLength = 0): boolean =>
    isBetween(minLength, value.length, maxLength),
  personalName: (value: string): boolean => regExps.PERSONAL_NAME.test(value),
  phoneNumberUS: (value: string): boolean => regExps.USA_PHONE_NUMBER.test(value),
  usStateCode: (value: string): boolean => regExps.US_STATE_CODE.test(value),
}
