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

- `app/globals.css` — brand tokens, typography, layout utilities, and global interaction styles
- `components/ui/` — reusable buttons, badges, cards, skeletons, state components, and the toaster
- `components/layout/` — shared brand components
- `constants/` — categories, status language, roles, and navigation configuration
- `types/` — User, Service, Booking, Payment, API response, and pagination contracts
- `lib/` — site configuration and API base configuration
- `DESIGN.md` — the visual system future phases must follow

The `/` route currently contains a temporary design-foundation preview. Public pages, dashboards, and shared flows are added in subsequent phases.

## Scope

This repository is frontend-only. It contains no authentication, payment processing, API integration, mock backend, or simulated workflows. Sample content is presentation data.
