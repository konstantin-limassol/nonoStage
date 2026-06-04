"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  handleMobileScrollToLeadForm,
  handleScrollToLeadForm,
  LEAD_FORM_SECTION_ID,
} from "@/lib/scroll-to-lead-form"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="relative">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
            NoNo<span className="text-accent">Debt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#benefits"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Benefits
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href="tel:1-800-000-0000"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              1-800-000-0000
            </a>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link
                href={`#${LEAD_FORM_SECTION_ID}`}
                onClick={handleScrollToLeadForm}
              >
                Get Your Quote
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu — overlay, does not expand document flow */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full z-50 border-t border-border bg-card shadow-lg md:hidden">
            <div className="space-y-1 px-4 pb-4 pt-2">
              <Link
                href="#how-it-works"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={closeMobileMenu}
              >
                How It Works
              </Link>
              <Link
                href="#benefits"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={closeMobileMenu}
              >
                Benefits
              </Link>
              <Link
                href="#faq"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={closeMobileMenu}
              >
                FAQ
              </Link>
              <a
                href="tel:1-800-000-0000"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                1-800-000-0000
              </a>
              <div className="pt-2">
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link
                    href={`#${LEAD_FORM_SECTION_ID}`}
                    onClick={(event) =>
                      handleMobileScrollToLeadForm(event, closeMobileMenu)
                    }
                  >
                    Get Your Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
