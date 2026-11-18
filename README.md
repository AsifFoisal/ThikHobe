# FixMate

A complete visual prototype of a smart device and home appliance repair service platform, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Base UI
- Lucide icons
- Sonner

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run format     # Prettier
```

## Foundation

- `app/(public)/` — public layout with the shared navbar and footer, and the homepage
- `app/globals.css` — brand tokens, typography, layout utilities, and global interaction styles
- `components/home/` — homepage sections
- `components/services/` — reusable service cards and loading skeletons
- `components/ui/` — reusable buttons, badges, avatars, cards, skeletons, state components, and the toaster
- `components/layout/` — logo, public navbar, and footer
- `components/icons/` — authored social logos, including the modern X mark
- `constants/` — categories, status language, roles, navigation configuration, and the demo account
- `data/` — clearly separated illustrative service listings
- `types/` — User, Service, Booking, Payment, API response, and pagination contracts
- `lib/` — site configuration, formatting, and API base configuration
- `public/images/` — local photography, with credits in `CREDITS.md`
- `DESIGN.md` — the visual system future phases must follow

The `/` route is the public homepage. Services, About, authentication, profile, and dashboards arrive in subsequent phases. The public route group keeps the footer out of the future dashboard layout.

## Scope

This repository is frontend-only. It contains no authentication, payment processing, API integration, mock backend, or simulated workflows. The navbar's profile, loading, and sign-out states are visual presentation only. Homepage service listings, platform figures, and customer stories are illustrative sample data. Photography is sourced from Pexels and credited locally.
