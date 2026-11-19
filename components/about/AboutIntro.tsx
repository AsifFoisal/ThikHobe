import { ArrowDown, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"

const pageIndex = [
  { label: "The problem", href: "#problem" },
  { label: "How ThikHobe works", href: "#how-it-works" },
  { label: "For customers & technicians", href: "#benefits" },
  { label: "Paying after service", href: "#payment" },
  { label: "What we repair", href: "#categories" },
] as const

export function AboutIntro() {
  return (
    <section className="overflow-hidden">
      <div className="container-page grid gap-10 pt-10 pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16 lg:pt-16 lg:pb-16">
        <div>
          <h1 className="type-display max-w-[13ch] text-[clamp(2.5rem,4.4vw,4rem)]">
            Repair should be something you can see through.
          </h1>
          <p className="type-lead mt-6 max-w-[55ch]">
            ThikHobe is a repair marketplace built around one idea: you should
            know who is coming, what stage the job is at, and what you will pay
            before you pay it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link className={buttonVariants({ size: "lg" })} href="/services">
              Browse services
              <ArrowRight aria-hidden />
            </Link>
            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href="#how-it-works"
            >
              How it works
            </Link>
          </div>
        </div>

        <aside className="lg:pt-2">
          <p className="max-w-[48ch] text-sm leading-6 text-muted-ink">
            We connect people across Bangladesh with verified technicians for phones,
            laptops, cooling, laundry, and home electrical work. Every request
            carries a technician, a status, and a final amount confirmed at
            completion.
          </p>
          <nav aria-label="On this page" className="mt-8">
            <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-ink uppercase">
              On this page
            </p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {pageIndex.map((item) => (
                <li key={item.href}>
                  <Link
                    className="group flex items-center justify-between gap-4 py-3 text-sm font-medium text-ink transition-colors hover:text-spruce"
                    href={item.href}
                  >
                    {item.label}
                    <ArrowDown
                      aria-hidden
                      className="size-3.5 text-muted-ink transition-transform group-hover:translate-y-0.5 group-hover:text-spruce"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <figure className="border-y border-line">
        <div className="relative h-[clamp(16rem,30vw,26rem)] w-full bg-sage">
          <Image
            alt="A technician repairing a laptop at a workbench"
            className="object-cover object-[center_40%]"
            fill
            loading="eager"
            sizes="100vw"
            src="/images/hero-technician.jpg"
          />
        </div>
        <figcaption className="container-page flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-ink">
            A repair is easier to trust when you can see the work.
          </p>
          <p className="text-xs text-muted-ink">A technician at work · Bangladesh</p>
        </figcaption>
      </figure>
    </section>
  )
}
