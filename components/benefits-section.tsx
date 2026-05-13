import { BadgePercent, PhoneOff, Calendar, DollarSign, ShieldCheck, Clock } from "lucide-react"

const benefits = [
  {
    icon: BadgePercent,
    title: "Reduce Your Debt",
    description:
      "Qualified participants may be able to settle their debts for significantly less than what they owe.",
  },
  {
    icon: PhoneOff,
    title: "Stop Collection Calls",
    description:
      "Many debt relief programs can help reduce or eliminate harassing creditor calls.",
  },
  {
    icon: Calendar,
    title: "One Monthly Payment",
    description:
      "Consolidate multiple debts into a single, manageable monthly payment that fits your budget.",
  },
  {
    icon: DollarSign,
    title: "No Upfront Fees",
    description:
      "Reputable debt settlement companies only charge fees after successfully settling your debts.",
  },
  {
    icon: ShieldCheck,
    title: "Free Consultation",
    description:
      "Get a no-obligation consultation to understand your options with no pressure to enroll.",
  },
  {
    icon: Clock,
    title: "Become Debt-Free Faster",
    description:
      "Many clients complete their programs in 24-48 months, compared to decades of minimum payments.",
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="bg-card py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Debt Relief?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the benefits of working with a certified debt relief specialist
            to tackle your financial challenges.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                <benefit.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
