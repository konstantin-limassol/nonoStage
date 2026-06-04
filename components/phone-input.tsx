"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { formatPhone } from "@/lib/format-phone"
import { onlyNumbersInString } from "@/lib/string"

export const PHONE_NUMBER_LENGTH = 10

type PhoneInputProps = {
  id: string
  value: string
  onChange: (digits: string) => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export function PhoneInput({
  id,
  value,
  onChange,
  disabled,
  "aria-invalid": ariaInvalid,
}: PhoneInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyNumbersInString(event.target.value).slice(0, PHONE_NUMBER_LENGTH)
    onChange(digits)
  }

  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-md border border-border/80 bg-background shadow-sm transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        ariaInvalid && "border-destructive ring-destructive/20 aria-invalid:border-destructive",
        disabled && "opacity-50",
      )}
    >
      <div
        className="flex h-9 shrink-0 items-center justify-center gap-1 border-r border-border/80 px-3 text-sm font-medium text-foreground"
        aria-hidden
      >
        <span>🇺🇸</span>
        <span>+1</span>
      </div>
      <Input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        className="h-9 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
        placeholder="(555) - 555 - 5555"
        value={formatPhone(value)}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={ariaInvalid}
      />
    </div>
  )
}
