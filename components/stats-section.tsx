const stats = [
  {
    value: "$10B+",
    label: "Debt Resolved",
    description: "By our partner network",
  },
  {
    value: "500K+",
    label: "People Helped",
    description: "Across the United States",
  },
  {
    value: "50%",
    label: "Average Savings",
    description: "On qualified debts*",
  },
  {
    value: "24-48",
    label: "Months to Freedom",
    description: "Typical program length",
  },
]

export function StatsSection() {
  return (
    <section className="bg-primary py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-lg font-semibold text-primary-foreground/90">
                {stat.label}
              </div>
              <div className="mt-1 text-sm text-primary-foreground/70">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
