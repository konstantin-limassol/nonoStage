import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to Take Control of Your Debt?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Connect with a certified debt specialist today and discover how much you could save.
          Your free consultation is just a click or call away.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#get-started">
              Get Your Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <a href="tel:1-800-000-0000">
              <Phone className="mr-2 h-4 w-4" />
              Call 1-800-000-0000
            </a>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          No obligation. No credit check required. 100% free consultation.
        </p>
      </div>
    </section>
  )
}
