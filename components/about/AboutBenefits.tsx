import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

const customerBenefits = [
  {
    title: "A real name, not a mystery",
    body: "The technician, their area, skills, and verified status are attached to the service before you request it.",
  },
  {
    title: "The estimate comes first",
    body: "Starting prices are visible on every listing, so the conversation begins with a range instead of a blank cheque.",
  },
  {
    title: "Progress in one place",
    body: "Requested, accepted, in progress, completed: a shared status language instead of phone-tag updates.",
  },
  {
    title: "Payment waits for the work",
    body: "The final amount is confirmed at completion. Payment opens only after the repair is marked done.",
  },
]

const technicianBenefits = [
  {
    title: "A listing with context",
    body: "Category, mode, area, duration, and starting price live together, so requests arrive with the right expectations.",
  },
  {
    title: "Requests you can act on",
    body: "Customer contact, address, preferred date, and problem description arrive in one place.",
  },
  {
    title: "Availability control",
    body: "Pause a service when the bench is full without deleting the listing or starting over.",
  },
  {
    title: "A state the customer can see",
    body: "Accepted, in progress, completed: fewer update calls, and a payment step that follows completed work.",
  },
]

function BenefitList({
  items,
  dark = false,
}: {
  items: { title: string; body: string }[]
  dark?: boolean
}) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li className="flex gap-3" key={item.title}>
          <span
            className={
              dark
                ? "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10 text-paper"
                : "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-card text-spruce"
            }
          >
            <Check aria-hidden className="size-3" strokeWidth={2.2} />
          </span>
          <div>
            <p
              className={
                dark
                  ? "text-sm font-semibold text-paper"
                  : "text-sm font-semibold text-ink"
              }
            >
              {item.title}
            </p>
            <p
              className={
                dark
                  ? "mt-0.5 text-sm leading-6 text-sage"
                  : "mt-0.5 text-sm leading-6 text-muted-ink"
              }
            >
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function AboutBenefits() {
  return (
    <section className="section scroll-mt-24" id="benefits">
      <div className="container-page">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="type-h2 max-w-[14ch]">
            One platform, two clear sides.
          </h2>
          <p className="max-w-[55ch] text-base leading-7 text-muted-ink lg:justify-self-end">
            Customers get visibility before, during, and after the repair.
            Technicians get structured work with the context needed to do it
            well.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line lg:grid lg:grid-cols-2">
          <div className="bg-sage/60 p-6 sm:p-8">
            <h3 className="type-h2 text-[1.75rem]">For customers</h3>
            <p className="mt-2 max-w-[40ch] text-sm leading-6 text-muted-ink">
              The repair stays legible from the first listing to the final
              receipt.
            </p>
            <BenefitList items={customerBenefits} />
            <Link
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-spruce transition-colors hover:text-fern"
              href="/services"
            >
              Browse services
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="bg-spruce p-6 text-paper sm:p-8">
            <h3 className="type-h2 text-[1.75rem] text-paper">
              For technicians
            </h3>
            <p className="mt-2 max-w-[40ch] text-sm leading-6 text-sage">
              A structured marketplace for the work you already do, with fewer
              repeated questions.
            </p>
            <BenefitList dark items={technicianBenefits} />
            <Link
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-paper transition-colors hover:text-ember-soft focus-visible:outline-paper"
              href="/services"
            >
              See how listings appear
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
