"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Phone, DollarSign, Calendar, Home, Info, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Mock data - in real app this would come from URL params or API
const userData = {
  firstName: "David",
  estimatedDebt: 62697,
}

// Calculate estimates based on debt amount and payment
function calculateEstimates(debt: number, monthlyPayment: number) {
  const settlementRate = 0.50 // Typically settle for 50% of debt
  const programFee = 0.25 // 25% of enrolled debt as fee
  const totalCost = debt * settlementRate + debt * programFee
  const months = Math.ceil(totalCost / monthlyPayment)
  
  return {
    totalCost: Math.round(totalCost),
    monthlyPayment: monthlyPayment,
    payoffMonths: months,
  }
}

export default function PlanPage() {
  // Calculate min/max payments based on debt
  const minPayment = Math.round(userData.estimatedDebt * 0.012) // ~1.2% of debt
  const maxPayment = Math.round(userData.estimatedDebt * 0.025) // ~2.5% of debt
  
  const [monthlyPayment, setMonthlyPayment] = useState(
    Math.round((minPayment + maxPayment) / 2)
  )
  const [showStickyButton, setShowStickyButton] = useState(true)
  const mainCtaRef = useRef<HTMLDivElement>(null)
  
  // Hide sticky button when main CTA is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButton(!entry.isIntersecting)
      },
      { threshold: 0.5 }
    )
    
    if (mainCtaRef.current) {
      observer.observe(mainCtaRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  const estimates = calculateEstimates(userData.estimatedDebt, monthlyPayment)

  const benefits = [
    {
      title: "Free up cash each month",
      description:
        "Debt resolution programs could let you pay less than your combined monthly minimums to resolve your debt.",
      borderColor: "bg-blue-500",
    },
    {
      title: "Pay less than you owe",
      description:
        "Debt specialists negotiate with creditors to reduce your debt as much as possible.",
      borderColor: "bg-accent",
    },
    {
      title: "Resolve your debt faster",
      description:
        "Compared to making minimum payments, debt resolution programs can be a much quicker solution.",
      borderColor: "bg-rose-500",
    },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              Nono<span className="text-accent">Debt</span>
            </Link>
            <a
              href="tel:1-800-000-0000"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">(800) 000-0000</span>
            </a>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Personalized Greeting */}
          <div className="mb-6 text-left">
            <p className="text-base text-foreground sm:text-lg">
              <span className="font-semibold text-accent">{userData.firstName}</span>, you are eligible for a debt resolution program!
            </p>
          </div>

          {/* Main Debt Resolution Card */}
          <Card className="mb-8 overflow-hidden shadow-lg">
            <CardContent className="p-6">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Debt Resolution</h2>
                <button className="text-sm font-medium text-accent hover:underline">
                  Disclosures
                </button>
              </div>

              {/* Description */}
              <p className="mb-6 text-muted-foreground">
                Resolve your debt with{" "}
                <span className="font-semibold text-foreground">one low monthly payment</span>{" "}
                that could free up extra cash, without a loan or good credit.
              </p>

              {/* Estimated Debt */}
              <div className="mb-6 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span>Estimated debt</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on the information you provided</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  ${userData.estimatedDebt.toLocaleString()}
                </span>
              </div>

              {/* Monthly Payment Slider */}
              <div className="mb-6">
                <p className="mb-2 text-center text-sm font-medium text-muted-foreground">
                  Monthly payment
                </p>
                <p className="mb-4 text-center text-4xl font-bold text-accent">
                  ${monthlyPayment.toLocaleString()}
                </p>

                <div className="px-2">
                  <Slider
                    value={[monthlyPayment]}
                    onValueChange={(value) => setMonthlyPayment(value[0])}
                    min={minPayment}
                    max={maxPayment}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Min</span>
                    <span>Max</span>
                  </div>
                </div>
              </div>

              {/* Estimates Breakdown */}
              <div className="space-y-4 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span>Est. cost</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Estimated total cost including program fees</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${estimates.totalCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span>Est. monthly payment</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your estimated monthly deposit</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${estimates.monthlyPayment.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Home className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span>Est. payoff time</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Estimated time to resolve your debt</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <span className="font-semibold text-accent">
                    {estimates.payoffMonths} Months
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div ref={mainCtaRef} className="mt-6">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <a href="tel:1-800-000-0000">
                    <Phone className="mr-2 h-4 w-4" />
                    (800) 000-0000
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mb-8">
            <p className="mb-6 text-center text-muted-foreground">
              See how you could put your debt in the past quickly and affordably.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-5">
                      <h3 className="mb-3 text-lg font-semibold text-foreground">
                        {benefit.title}
                      </h3>
                      <div className="mb-4 h-px bg-border" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                    <div className={`h-1.5 ${benefit.borderColor}`} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Success Story */}
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/3] w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">Michael</h3>
                <p className="mt-1 text-sm text-white/80">Graduated 2023</p>
                <p className="text-sm text-white/80">Enrolled debt: $58,240</p>
                <p className="text-sm text-white/80">Number of debts settled: 5</p>
                <Button
                  variant="secondary"
                  className="mt-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch his story
                </Button>
              </div>
            </div>
          </Card>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
            * Estimates are for illustrative purposes only and are based on the information
            you provided. Actual results may vary. Debt resolution programs are not
            available in all states. Contact a debt specialist for personalized information.
          </p>
        </main>

        {/* Simple Footer */}
        <footer className="border-t border-border bg-card py-6 pb-24 sm:pb-6">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} NonoDebt. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Sticky Mobile CTA */}
        {showStickyButton && (
          <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg sm:hidden">
            <Button
              asChild
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href="tel:1-800-000-0000">
                <Phone className="mr-2 h-4 w-4" />
                (800) 000-0000
              </a>
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
