import { ArrowUp, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import {
  FacebookLogo,
  InstagramLogo,
  LinkedInLogo,
  XLogo,
} from "@/components/icons/SocialIcons"
import { Logo } from "@/components/layout/Logo"
import { SERVICE_CATEGORIES } from "@/constants"
import { siteConfig } from "@/lib/config"

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
] as const

const socialLinks = [
  { label: "ThikHobe on X", href: siteConfig.social.x, Icon: XLogo },
  {
    label: "ThikHobe on Facebook",
    href: siteConfig.social.facebook,
    Icon: FacebookLogo,
  },
  {
    label: "ThikHobe on Instagram",
    href: siteConfig.social.instagram,
    Icon: InstagramLogo,
  },
  {
    label: "ThikHobe on LinkedIn",
    href: siteConfig.social.linkedin,
    Icon: LinkedInLogo,
  },
] as const

const headingClass = "text-[0.9375rem] font-semibold text-paper"
const linkClass =
  "text-[0.8125rem] text-paper/60 transition-colors hover:text-paper focus-visible:outline-paper"

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="container-page pt-16 pb-8 lg:pt-20 lg:pb-10">
        <div aria-hidden className="text-center select-none">
          <span className="block text-[clamp(2.75rem,13vw,9rem)] leading-[0.9] font-bold tracking-[-0.04em] text-paper">
            Thik<span className="text-ember">Hobe</span>
          </span>
        </div>

        <div aria-hidden className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-paper/15" />
          <span className="h-0.5 w-24 rounded-full bg-ember sm:w-36" />
          <span className="h-px flex-1 bg-paper/15" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:mt-14 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr] lg:gap-10">
          <div className="col-span-2 max-w-sm lg:col-span-1">
            <Link
              className="inline-flex rounded-lg focus-visible:outline-paper"
              href="/"
            >
              <Logo tone="light" />
            </Link>
            <p className="mt-5 text-sm leading-6 text-paper/60">
              <strong className="font-semibold text-paper">
                Verified technicians
              </strong>{" "}
              for phones, laptops, and home appliances — with clear progress and
              payment only after the repair is complete.
            </p>
            <div className="mt-6 flex items-center gap-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full text-paper/60 transition-colors hover:text-ember focus-visible:outline-paper"
                  href={href}
                  key={label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Explore" className="lg:text-center">
            <h2 className={headingClass}>Explore</h2>
            <ul className="mt-4 flex flex-col gap-2.5 lg:items-center">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link className={linkClass} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Repair categories" className="lg:text-center">
            <h2 className={headingClass}>Repairs</h2>
            <ul className="mt-4 flex flex-col gap-2.5 lg:items-center">
              {SERVICE_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    className={linkClass}
                    href={`/services?category=${encodeURIComponent(category)}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h2 className={headingClass}>Contact</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[0.8125rem] text-paper/60">
              <li>
                <a
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-paper focus-visible:outline-paper"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  <Mail
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-paper/35"
                  />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-paper focus-visible:outline-paper"
                  href={`tel:${siteConfig.contact.phoneHref}`}
                >
                  <Phone
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-paper/35"
                  />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-paper/35"
                />
                <span className="leading-6">{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ThikHobe. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>Repairs, handled in Bangladesh.</p>
            <a
              className="inline-flex items-center gap-1.5 text-paper/60 transition-colors hover:text-paper focus-visible:outline-paper"
              href="#main"
            >
              Back to top
              <ArrowUp aria-hidden className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
