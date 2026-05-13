import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Take Control of Your Debt?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Connect with a certified debt specialist today and discover how much you could save.
          Your free consultation is just a click or call away.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto">
            <Link href="#get-started">
              Get Your Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white sm:w-auto"
          >
            <a href="tel:1-800-000-0000">
              <Phone className="mr-2 h-4 w-4" />
              Call 1-800-000-0000
            </a>
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/70">
          No obligation. No credit check required. 100% free consultation.
        </p>
      </div>
    </section>
  )
}
