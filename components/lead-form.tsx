"use client"

import { useState } from "react"
import { Lock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function LeadForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    debtAmount: "",
    debtType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // Handle form submission
      console.log("Form submitted:", formData)
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground">Thank You!</h3>
          <p className="mt-2 text-muted-foreground">
            A debt relief specialist will contact you shortly to discuss your options.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div id="get-started" className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-foreground">
          Get Your Free Consultation
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          See how much you could save in just 60 seconds
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <div
          className={`h-2 w-16 rounded-full ${
            step >= 1 ? "bg-accent" : "bg-secondary"
          }`}
        />
        <div
          className={`h-2 w-16 rounded-full ${
            step >= 2 ? "bg-accent" : "bg-secondary"
          }`}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="debtAmount">Total Unsecured Debt Amount</Label>
              <Select
                value={formData.debtAmount}
                onValueChange={(value) =>
                  setFormData({ ...formData, debtAmount: value })
                }
                required
              >
                <SelectTrigger id="debtAmount" className="border-border/80 bg-background shadow-sm">
                  <SelectValue placeholder="Select debt amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10000-15000">$10,000 - $15,000</SelectItem>
                  <SelectItem value="15000-25000">$15,000 - $25,000</SelectItem>
                  <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50000-75000">$50,000 - $75,000</SelectItem>
                  <SelectItem value="75000-100000">$75,000 - $100,000</SelectItem>
                  <SelectItem value="100000+">$100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="debtType">Primary Type of Debt</Label>
              <Select
                value={formData.debtType}
                onValueChange={(value) =>
                  setFormData({ ...formData, debtType: value })
                }
                required
              >
                <SelectTrigger id="debtType" className="border-border/80 bg-background shadow-sm">
                  <SelectValue placeholder="Select debt type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-cards">Credit Cards</SelectItem>
                  <SelectItem value="medical">Medical Bills</SelectItem>
                  <SelectItem value="personal-loans">Personal Loans</SelectItem>
                  <SelectItem value="collections">Collections</SelectItem>
                  <SelectItem value="other">Other Unsecured Debt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) =>
                  setFormData({ ...formData, state: value })
                }
                required
              >
                <SelectTrigger id="state" className="border-border/80 bg-background shadow-sm">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AL">Alabama</SelectItem>
                  <SelectItem value="AK">Alaska</SelectItem>
                  <SelectItem value="AZ">Arizona</SelectItem>
                  <SelectItem value="AR">Arkansas</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="CO">Colorado</SelectItem>
                  <SelectItem value="CT">Connecticut</SelectItem>
                  <SelectItem value="DE">Delaware</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="GA">Georgia</SelectItem>
                  <SelectItem value="HI">Hawaii</SelectItem>
                  <SelectItem value="ID">Idaho</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                  <SelectItem value="IN">Indiana</SelectItem>
                  <SelectItem value="IA">Iowa</SelectItem>
                  <SelectItem value="KS">Kansas</SelectItem>
                  <SelectItem value="KY">Kentucky</SelectItem>
                  <SelectItem value="LA">Louisiana</SelectItem>
                  <SelectItem value="ME">Maine</SelectItem>
                  <SelectItem value="MD">Maryland</SelectItem>
                  <SelectItem value="MA">Massachusetts</SelectItem>
                  <SelectItem value="MI">Michigan</SelectItem>
                  <SelectItem value="MN">Minnesota</SelectItem>
                  <SelectItem value="MS">Mississippi</SelectItem>
                  <SelectItem value="MO">Missouri</SelectItem>
                  <SelectItem value="MT">Montana</SelectItem>
                  <SelectItem value="NE">Nebraska</SelectItem>
                  <SelectItem value="NV">Nevada</SelectItem>
                  <SelectItem value="NH">New Hampshire</SelectItem>
                  <SelectItem value="NJ">New Jersey</SelectItem>
                  <SelectItem value="NM">New Mexico</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="NC">North Carolina</SelectItem>
                  <SelectItem value="ND">North Dakota</SelectItem>
                  <SelectItem value="OH">Ohio</SelectItem>
                  <SelectItem value="OK">Oklahoma</SelectItem>
                  <SelectItem value="OR">Oregon</SelectItem>
                  <SelectItem value="PA">Pennsylvania</SelectItem>
                  <SelectItem value="RI">Rhode Island</SelectItem>
                  <SelectItem value="SC">South Carolina</SelectItem>
                  <SelectItem value="SD">South Dakota</SelectItem>
                  <SelectItem value="TN">Tennessee</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="UT">Utah</SelectItem>
                  <SelectItem value="VT">Vermont</SelectItem>
                  <SelectItem value="VA">Virginia</SelectItem>
                  <SelectItem value="WA">Washington</SelectItem>
                  <SelectItem value="WV">West Virginia</SelectItem>
                  <SelectItem value="WI">Wisconsin</SelectItem>
                  <SelectItem value="WY">Wyoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  className="border-border/80 bg-background shadow-sm"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  className="border-border/80 bg-background shadow-sm"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                className="border-border/80 bg-background shadow-sm"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                className="border-border/80 bg-background shadow-sm"
                placeholder="(555) 555-5555"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            {/* TCPA Consent */}
            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Clicking &quot;Get My Free Quote&quot;, I consent to receive calls and text messages,
                including by autodialer and prerecorded voice, from NonoDebt and its
                marketing partners at the phone number provided. I understand consent
                is not a condition of purchase. Message and data rates may apply.
                Reply STOP to opt-out.
              </p>
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
        >
          {step === 1 ? "Continue" : "Get My Free Quote"}
        </Button>

        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Back to previous step
          </button>
        )}
      </form>

      {/* Security Note */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" />
        <span>Your information is secure and encrypted</span>
      </div>
    </div>
  )
}
