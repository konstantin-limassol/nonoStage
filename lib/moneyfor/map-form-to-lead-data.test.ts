import { describe, expect, it } from "vitest"
import { LEAD_POST_SOURCE } from "@/lib/moneyfor/constants"
import { mapFormToMoneyforLeadData } from "@/lib/moneyfor/map-form-to-lead-data"

describe("mapFormToMoneyforLeadData", () => {
  it("maps form fields and includes source in leadData", () => {
    const leadData = mapFormToMoneyforLeadData(
      {
        debtAmount: "10000-14999",
        debtType: "credit_card",
        state: "ca",
        firstName: " Test ",
        lastName: " User ",
        email: " test@example.com ",
        phone: "5551234567",
      },
      {
        client_ip: "203.0.113.1",
      },
    )

    expect(leadData).toMatchObject({
      debt_amount: "10000-14999",
      debt_type: "credit_card",
      state: "CA",
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      home_phone: "5551234567",
      source: LEAD_POST_SOURCE,
      client_ip: "203.0.113.1",
    })
  })
})
