"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is debt settlement?",
    answer:
      "Debt settlement is a debt relief option where you or a company negotiates with creditors to pay less than the full amount owed. It is typically used for unsecured debts like credit cards, medical bills, and personal loans. This can help you become debt-free faster and for less money than paying the full balance.",
  },
  {
    question: "How much debt do I need to qualify?",
    answer:
      "Most debt relief programs require a minimum of $10,000 in unsecured debt to qualify. The debt must be unsecured, meaning it is not backed by collateral like a house or car. Common qualifying debts include credit card balances, medical bills, personal loans, and private student loans.",
  },
  {
    question: "Will debt settlement affect my credit score?",
    answer:
      "Debt settlement may have a temporary negative impact on your credit score. However, if you are already struggling with debt and missed payments, your credit may already be affected. Many people find that once their debts are settled and paid off, they can begin rebuilding their credit.",
  },
  {
    question: "How long does the debt settlement process take?",
    answer:
      "The typical debt settlement program takes between 24 to 48 months to complete, depending on the amount of debt and your ability to make monthly deposits. Some clients may complete their programs faster if they can make larger monthly contributions.",
  },
  {
    question: "Are there any upfront fees?",
    answer:
      "Reputable debt settlement companies do not charge upfront fees. Under FTC regulations, debt settlement companies can only charge fees after they have successfully negotiated and settled a debt on your behalf. Be cautious of any company that asks for payment before providing services.",
  },
  {
    question: "What types of debt can be settled?",
    answer:
      "Debt settlement typically works for unsecured debts including credit card debt, medical bills, personal loans, private student loans, and some business debts. It does not work for secured debts like mortgages or car loans, federal student loans, or tax debt.",
  },
  {
    question: "Is debt settlement right for everyone?",
    answer:
      "Debt settlement is not the right solution for everyone. It works best for people who are experiencing financial hardship and have significant unsecured debt. During your free consultation, a specialist will evaluate your situation and help determine if debt settlement or another option is right for you.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get answers to common questions about debt relief options
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
