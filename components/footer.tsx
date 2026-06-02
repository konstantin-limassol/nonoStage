import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">
                NoNo<span className="text-primary">Debt</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              NoNoDebt connects consumers with certified debt relief specialists.
              We are a lead generation service and do not provide debt relief services directly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#how-it-works"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#benefits"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#get-started"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/ccpa"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  CCPA Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/do-not-sell"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Do Not Sell My Info
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
            <p>
              <strong>IMPORTANT DISCLOSURES:</strong> NoNoDebt is a marketing lead generator
              and is not a lender, debt settlement company, debt consolidation company,
              or credit counseling service. By submitting your information, you are
              requesting to be contacted by one or more of our partner companies who may
              be able to assist you with your debt relief needs.
            </p>
            <p>
              *Results vary based on individual circumstances. Not all debts are eligible
              for settlement. The average savings of 50% is based on enrolled debts settled
              by our partner network. Actual results will vary based on your specific
              circumstances and ability to save funds. Debt settlement programs typically
              take 24-48 months to complete.
            </p>
            <p>
              Debt settlement may have tax consequences. Forgiven debt over $600 may be
              considered taxable income. Consult with a tax professional regarding your
              specific situation. Debt settlement may negatively impact your credit score.
              Not all creditors will negotiate, and there is no guarantee that debts will
              be settled.
            </p>
            <p>
              By submitting the form on this website, you consent to receive calls and
              SMS/text messages from NoNoDebt and its marketing partners at the phone
              number provided, including calls made using an automatic telephone dialing
              system or prerecorded voice. Consent is not a condition of purchase.
              Message and data rates may apply. Reply STOP to opt-out of text messages.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NoNoDebt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
