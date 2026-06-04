/** Lower bound of range → debt_amount (MF leadData). */
export const DEBT_AMOUNT_OPTIONS = [
  { value: "10000", label: "$10,000 - $15,000" },
  { value: "15000", label: "$15,000 - $25,000" },
  { value: "25000", label: "$25,000 - $50,000" },
  { value: "50000", label: "$50,000 - $75,000" },
  { value: "75000", label: "$75,000 - $100,000" },
  { value: "100000", label: "$100,000+" },
] as const

/** Primary Type of Debt → debt_type (MF leadData). */
export const DEBT_TYPE_OPTIONS = [
  { value: "CREDIT_CARDS", label: "Credit Cards" },
  { value: "MEDICAL", label: "Medical Bills" },
  { value: "PERSONAL_LOANS", label: "Personal Loans" },
  { value: "COLLECTIONS", label: "Collections" },
  { value: "OTHER", label: "Other Unsecured Debt" },
] as const
