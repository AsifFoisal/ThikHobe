import { Mail, MapPin, Phone } from "lucide-react"
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

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
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

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.2fr] lg:gap-12">
          <div>
            <Link
              className="inline-flex rounded-lg focus-visible:outline-paper"
              href="/"
            >
              <Logo tone="light" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-sage">
              Verified technicians for phones, laptops, and home appliances—with
              clear progress and payment only after the repair is complete.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-sage transition-colors hover:border-white/25 hover:bg-white/5 hover:text-paper focus-visible:outline-paper"
                  href={href}
                  key={label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.14em] text-sage uppercase">
              Quick links
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-sage transition-colors hover:text-paper focus-visible:outline-paper"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Repair categories">
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.14em] text-sage uppercase">
              Popular repairs
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICE_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    className="text-sm text-sage transition-colors hover:text-paper focus-visible:outline-paper"
                    href={`/services?category=${encodeURIComponent(category)}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.14em] text-sage uppercase">
              Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-sage">
              <li>
                <a
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-paper focus-visible:outline-paper"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  <Mail
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-sage"
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
                    className="mt-0.5 size-4 shrink-0 text-sage"
                  />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-sage"
                />
                <span className="leading-6">{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-sage">
            © {new Date().getFullYear()} ThikHobe. All rights reserved.
          </p>
          <p className="text-xs text-sage">Repairs, handled in Bangladesh.</p>
        </div>
      </div>
    </footer>
  )
}
