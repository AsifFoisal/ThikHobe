import { Eye, ReceiptText, ShieldCheck, Star } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { formatNumber } from "@/lib/format"

const stats = [
  { value: String(7), label: "Repair categories" },
  { value: String(48), label: "Verified technicians" },
  { value: `${formatNumber(1240)}+`, label: "Completed jobs" },
  { value: "4.8/5", label: "Average satisfaction" },
]

const testimonials = [
  {
    name: "Nusrat A.",
    area: "Dhanmondi",
    quote:
      "The AC technician showed me the blocked filter before he started and the final amount matched the quote. I paid after the room was cool again.",
  },
  {
    name: "Rifat H.",
    area: "Mirpur",
    quote:
      "My laptop was back the same evening. Seeing “In progress” meant I didn't have to call anyone for an update.",
  },
  {
    name: "Sadia K.",
    area: "Uttara",
    quote:
      "I could see the technician's name and area before the visit. No upfront payment and no surprise add-ons.",
  },
]

const trustIndicators = [
  { label: "Reviewed technicians", icon: ShieldCheck },
  { label: "Visible job status", icon: Eye },
  { label: "Final bill before payment", icon: ReceiptText },
]

function Stars() {
  return (
    <div
      aria-label="5 out of 5 stars"
      className="flex items-center gap-0.5"
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          aria-hidden
          className="size-3.5 fill-ember text-ember"
          key={index}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export function TrustSection() {
  return (
    <section className="section border-y border-line bg-sage/50" id="trust">
      <div className="container-page">
        <SectionHeading
          description="Every FixMate job carries a technician, a status, and a final amount you can see. Here is the kind of visibility the platform is built around."
          title="A repair you can follow, not just hope for."
        />

        <dl className="mt-10 grid grid-cols-2 gap-y-8 border-y border-line py-8 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {stats.map((stat) => (
            <div
              className="lg:px-8 lg:first:pl-0 lg:last:pr-0"
              key={stat.label}
            >
              <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-ink uppercase">
                {stat.label}
              </dt>
              <dd className="tabular mt-2 text-4xl leading-none font-bold tracking-[-0.03em] text-spruce">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="type-h3">What customers notice</h3>
          <p className="type-meta">Illustrative customer stories.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card className="flex h-full flex-col p-6" key={testimonial.name}>
              <Stars />
              <figure className="flex flex-1 flex-col">
                <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-7 text-ink">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <Avatar name={testimonial.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {testimonial.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-ink">
                      {testimonial.area}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
          {trustIndicators.map((item) => {
            const Icon = item.icon
            return (
              <span
                className="inline-flex items-center gap-2 text-sm text-muted-ink"
                key={item.label}
              >
                <Icon
                  aria-hidden
                  className="size-4 text-fern"
                  strokeWidth={1.9}
                />
                {item.label}
              </span>
            )
          })}
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-ink">
          Platform figures and customer stories are illustrative for this
          prototype.
        </p>
      </div>
    </section>
  )
}
