# FixMate

A complete visual prototype of a smart device and home appliance repair service platform, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Base UI
- React Hook Form + Zod
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

- `app/(public)/` — public layout with the shared navbar and footer, the homepage, and Browse Services
- `app/(public)/services/` — server-rendered browse page, loading skeletons, error boundary, and service details
- `app/(public)/services/[id]/` — service details, Not Found, loading, and error states
- `app/globals.css` — brand tokens, typography, layout utilities, and global interaction styles
- `components/home/` — homepage sections
- `components/services/` — service cards, skeletons, URL-backed filters, pagination, summary, and technician cards
- `components/bookings/` — role-aware request section and validated request form
- `components/forms/` — shared field, label, hint, and error primitives
- `components/ui/` — reusable buttons, badges, avatars, cards, skeletons, state components, and the toaster
- `components/layout/` — logo, public navbar, and footer
- `components/icons/` — authored social logos, including the modern X mark
- `constants/` — categories, modes, sort options, status language, roles, and navigation configuration
- `data/` — clearly separated illustrative service listings
- `lib/` — site configuration, formatting, API base configuration, and the server service-query contract
- `types/` — User, Service, Booking, Payment, API response, and pagination contracts
- `public/images/` — local photography, with credits in `CREDITS.md`
- `DESIGN.md` — the visual system future phases must follow

The `/` homepage, `/services` Browse Services page, and `/services/[id]` service details page are implemented. About, authentication, profile, and dashboards arrive in subsequent phases. The public route group keeps the footer out of the future dashboard layout.

## Scope

This repository is frontend-only. It contains no authentication, payment processing, API integration, mock backend, or simulated workflows. The navbar's profile, loading, and sign-out states are visual presentation only. Homepage service listings, platform figures, and customer stories are illustrative sample data. The Browse Services query runs on the server over that static dataset; MongoDB/API integration is outside this frontend build. The public site currently runs as the demo customer so the request form is visible; guest and staff branches are implemented in the components. The repair request form validates locally but does not send or persist a booking, so there is no success toast, duplicate-request handling, or My Bookings redirect yet. Photography is sourced from Pexels and credited locally.
