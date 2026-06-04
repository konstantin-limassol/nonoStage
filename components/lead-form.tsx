"use client"

import { useEffect, useState } from "react"
import { Lock } from "lucide-react"
import { toast } from "sonner"
import { FieldError } from "@/components/field-error"
import { Spinner } from "@/components/ui/spinner"
import { PhoneInput } from "@/components/phone-input"
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
import { DEBT_AMOUNT_OPTIONS, DEBT_TYPE_OPTIONS } from "@/constants/debt-options"
import { US_STATES } from "@/constants/us-states"
import { emptyFormData, type FormData, type FormErrors } from "@/lib/form-types"
import { getOrCreateSessionId } from "@/lib/session-id"
import { submitLead } from "@/lib/submit-lead"
import { scrollToLeadForm } from "@/lib/scroll-to-lead-form"
import {
  hasErrors,
  step1HasErrors,
  validateStep1,
  validateStep2,
} from "@/lib/validate-form"
const SUBMIT_ERROR_MESSAGE = "Something went wrong. Try again."

function FormField({
  error,
  children,
}: {
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex flex-col gap-2">{children}</div>
      <FieldError message={error} />
    </div>
  )
}

export function LeadForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<FormData>(emptyFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getOrCreateSessionId()
  }, [])

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) {
        return prev
      }
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors = validateStep1(formData)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      return
    }

    setStep(2)
    requestAnimationFrame(() => {
      scrollToLeadForm()
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const nextErrors = validateStep2(formData)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      if (step1HasErrors(nextErrors)) {
        setStep(1)
      }
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitLead(formData)

      if (result.leadId) {
        sessionStorage.setItem("nonodebt_lead_id", result.leadId)
      }

      window.location.replace(result.redirectUrl)
    } catch {
      toast.error(SUBMIT_ERROR_MESSAGE)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      id="get-started"
      className="w-full max-w-md scroll-mt-20 rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-foreground">
          Get Your Free Consultation
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          See how much you could save in just 60 seconds
        </p>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        <div
          className={`h-2 w-16 rounded-full ${step >= 1 ? "bg-accent" : "bg-secondary"}`}
        />
        <div
          className={`h-2 w-16 rounded-full ${step >= 2 ? "bg-accent" : "bg-secondary"}`}
        />
      </div>

      <form
        onSubmit={step === 1 ? handleContinue : handleSubmit}
        className="space-y-4"
        noValidate
      >
        {step === 1 ? (
          <>
            <FormField error={errors.debtAmount}>
              <Label htmlFor="debtAmount">Total Unsecured Debt Amount</Label>
              <Select
                value={formData.debtAmount}
                onValueChange={(value) => updateField("debtAmount", value)}
              >
                <SelectTrigger
                  id="debtAmount"
                  className="border-border/80 bg-background shadow-sm"
                  aria-invalid={Boolean(errors.debtAmount)}
                >
                  <SelectValue placeholder="Select debt amount" />
                </SelectTrigger>
                <SelectContent>
                  {DEBT_AMOUNT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField error={errors.debtType}>
              <Label htmlFor="debtType">Primary Type of Debt</Label>
              <Select
                value={formData.debtType}
                onValueChange={(value) => updateField("debtType", value)}
              >
                <SelectTrigger
                  id="debtType"
                  className="border-border/80 bg-background shadow-sm"
                  aria-invalid={Boolean(errors.debtType)}
                >
                  <SelectValue placeholder="Select debt type" />
                </SelectTrigger>
                <SelectContent>
                  {DEBT_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField error={errors.state}>
              <Label htmlFor="state">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => updateField("state", value)}
              >
                <SelectTrigger
                  id="state"
                  className="border-border/80 bg-background shadow-sm"
                  aria-invalid={Boolean(errors.state)}
                >
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField error={errors.firstName}>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="border-border/80 bg-background shadow-sm"
                  value={formData.firstName}
                  onChange={(event) => updateField("firstName", event.target.value)}
                  aria-invalid={Boolean(errors.firstName)}
                />
              </FormField>
              <FormField error={errors.lastName}>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="border-border/80 bg-background shadow-sm"
                  value={formData.lastName}
                  onChange={(event) => updateField("lastName", event.target.value)}
                  aria-invalid={Boolean(errors.lastName)}
                />
              </FormField>
            </div>

            <FormField error={errors.email}>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                className="border-border/80 bg-background shadow-sm"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
            </FormField>

            <FormField error={errors.phone}>
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                id="phone"
                value={formData.phone}
                onChange={(digits) => updateField("phone", digits)}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.phone)}
              />
            </FormField>

            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Clicking &quot;Get My Free Quote&quot;, I consent to receive calls and text
                messages, including by autodialer and prerecorded voice, from NoNoDebt and its
                marketing partners at the phone number provided. I understand consent is not a
                condition of purchase. Message and data rates may apply. Reply STOP to opt-out.
              </p>
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner className="size-5 text-accent-foreground" />
              Processing...
            </>
          ) : step === 1 ? (
            "Continue"
          ) : (
            "Get My Free Quote"
          )}
        </Button>

        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full cursor-pointer text-center text-sm text-muted-foreground hover:text-foreground disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Back to previous step
          </button>
        )}
      </form>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" />
        <span>Your information is secure and encrypted</span>
      </div>
    </div>
  )
}
