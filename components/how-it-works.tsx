import { ClipboardList, UserCheck, Handshake, TrendingDown } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Submit Your Information",
    description:
      "Complete a quick, confidential questionnaire about your debt situation. It takes less than 2 minutes.",
  },
  {
    icon: UserCheck,
    title: "Get Matched with a Specialist",
    description:
      "Based on your needs, you will be connected with a certified debt relief specialist in your area.",
  },
  {
    icon: Handshake,
    title: "Receive a Personalized Plan",
    description:
      "Your specialist will analyze your situation and present debt relief options tailored to your needs.",
  },
  {
    icon: TrendingDown,
    title: "Start Reducing Your Debt",
    description:
      "Once enrolled in a program, begin your journey toward financial freedom with a clear path forward.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Getting started is simple. Find out how debt relief could help you in just a few steps.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-y-1/2 bg-border lg:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Icon with Step Number */}
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-md ring-1 ring-accent/20">
                    <step.icon className="h-9 w-9 text-accent" />
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
