import {
  Activity,
  CalendarCheck,
  Layers,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"

const advantages: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Verified technicians",
    description:
      "Each technician is reviewed before their services appear, and their name and area stay attached to the job.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent repair progress",
    description:
      "Requested, accepted, in progress, completed: you can see exactly where the repair stands.",
    icon: Activity,
  },
  {
    title: "Convenient repair requests",
    description:
      "Describe the problem, choose a date, and select a home visit or shop drop-off in one request.",
    icon: CalendarCheck,
  },
  {
    title: "Pay only after completion",
    description:
      "No upfront charge. The final amount is confirmed at completion, then paid through a secure checkout.",
    icon: Wallet,
  },
  {
    title: "Multiple repair categories",
    description:
      "Phones, laptops, cooling, refrigeration, TVs, laundry, and electrical work in one place.",
    icon: Layers,
  },
]

export function WhyThikHobe() {
  return (
    <section className="section border-y border-line bg-card" id="why-thikhobe">
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sage">
            <Image
              alt="An experienced technician testing an electronic component at a workshop bench"
              className="object-cover object-[center_35%]"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              src="/images/why-technician.jpg"
            />
            <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-card p-4 shadow-float">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sage text-spruce">
                  <ShieldCheck aria-hidden className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Reviewed before listing
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-ink">
                    Technician identity and service details are checked before a
                    listing goes live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="type-h2 max-w-[18ch]">
            Repair service without the runaround.
          </h2>
          <p className="type-lead mt-4 max-w-[55ch]">
            Unclear quotes, phone-tag updates, and paying before you see the
            result are the norm. ThikHobe replaces them with a visible process
            and a payment that waits for the work.
          </p>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {advantages.map((advantage) => {
              const Icon = advantage.icon
              return (
                <li className="flex gap-4 py-5" key={advantage.title}>
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-sage text-spruce">
                    <Icon aria-hidden className="size-4" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {advantage.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-ink">
                      {advantage.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
