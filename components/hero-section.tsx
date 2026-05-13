"use client"

import { Shield, Star, Users } from "lucide-react"
import { LeadForm } from "./lead-form"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 lg:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.05]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              Trusted by Thousands of Americans
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Say No to Debt.
              <br />
              <span className="text-accent">Say Yes to Freedom.</span>
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
              Connect with certified debt relief specialists who can help you explore options
              to reduce your debt by up to 50%. Get your free, no-obligation consultation today.
            </p>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Users className="h-5 w-5 text-accent" />
                <span>500,000+ People Helped</span>
              </div>
            </div>

            {/* Accreditations */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-white/20 pt-8 lg:justify-start">
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <span className="text-xs font-bold text-white">BBB</span>
                </div>
                <span className="text-xs text-white/70">A+ Rated</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <span className="text-xs font-bold text-white">IAPDA</span>
                </div>
                <span className="text-xs text-white/70">Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <span className="text-xs font-bold text-white">AFCC</span>
                </div>
                <span className="text-xs text-white/70">Member</span>
              </div>
            </div>
          </div>

          {/* Right Column - Lead Form */}
          <div className="flex justify-center lg:justify-end">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
