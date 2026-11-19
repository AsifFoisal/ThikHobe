import { Eye, ReceiptText, ShieldCheck } from "lucide-react"

import { Card } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"

const trustIndicators = [
  {
    label: "Reviewed technicians",
    description:
      "Technician listings are reviewed before they appear in the public marketplace.",
    icon: ShieldCheck,
  },
  {
    label: "Visible job status",
    description:
      "Every request moves through a server-enforced status pipeline you can follow from your dashboard.",
    icon: Eye,
  },
  {
    label: "Final bill before payment",
    description:
      "The technician sets the final amount at completion, and payment opens only after that.",
    icon: ReceiptText,
  },
]

export function TrustSection() {
  return (
    <section className="section border-y border-line bg-sage/50" id="trust">
      <div className="container-page">
        <SectionHeading
          description="Every FixMate job carries a technician, a status, and a final amount you can see. Here is the visibility the platform is built around."
          title="A repair you can follow, not just hope for."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {trustIndicators.map((item) => {
            const Icon = item.icon
            return (
              <Card className="h-full p-6" key={item.label}>
                <span className="grid size-10 place-items-center rounded-full bg-sage text-spruce">
                  <Icon aria-hidden className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="type-h3 mt-4 text-[1.0625rem]">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-ink">
                  {item.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
