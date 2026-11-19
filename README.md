# FixMate

A complete visual prototype of a smart device and home appliance repair service platform, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Base UI
- React Hook Form + Zod
- Recharts
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

- `app/(public)/` — public layout with the shared navbar and footer, the homepage, Browse Services, and About
- `app/(public)/services/` — server-rendered browse page, loading skeletons, error boundary, and service details
- `app/(public)/services/[id]/` — service details, Not Found, loading, and error states
- `app/(public)/about/` — detailed About / How It Works page
- `app/(auth)/` — sign-in and sign-up shell and forms
- `app/(dashboard)/` — role-aware dashboard shell, the `/dashboard` component foundation, and all three demo workspaces; the shell selects the demo identity by route, not authentication
- `app/(dashboard)/dashboard/customer/` — customer overview, My bookings, booking timeline details, and payment history
- `app/(dashboard)/dashboard/technician/` — technician overview, Add Service, My Services, and Repair Requests
- `app/(dashboard)/dashboard/admin/` — admin overview, Manage Users, Service Approvals, All Bookings, and Transactions
- `app/(dashboard)/dashboard/profile/` — shared profile surface, with role-specific demo entry points at `/dashboard/profile`, `/dashboard/profile/technician`, and `/dashboard/profile/admin`
- `app/globals.css` — brand tokens, typography, layout utilities, and global interaction styles
- `components/home/` — homepage sections
- `components/about/` — About page sections
- `components/auth/` — sign-up/sign-in forms and password field
- `components/dashboard/` — shell, sidebar, stat cards, data tables, filters, pagination, charts, confirmation dialog, and skeletons
- `components/customer/` — customer overview cards, responsive bookings table/cards, timeline, action previews, and payment history
- `components/technician/` — add-service form, local image field, editable service previews, availability toggle, and request action dialogs
- `components/admin/` — role-change and service-approval dialogs
- `components/profile/` — shared profile form and local profile-photo preview
- `components/services/` — service cards, skeletons, URL-backed filters, pagination, summary, technician cards, and category icons
- `components/bookings/` — role-aware request modal and validated request form
- `components/forms/` — shared field, label, hint, and error primitives
- `components/ui/` — reusable buttons, badges, avatars, cards, skeletons, state components, and the toaster
- `components/layout/` — logo, public navbar, and footer
- `components/icons/` — authored social logos, including the modern X mark
- `constants/` — categories, modes, sort options, status language, roles, demo profile details, booking-status chart colors, and dashboard/public navigation configuration
- `data/` — illustrative services, customer bookings and payments, plus shared technician/admin platform records
- `lib/` — site configuration, formatting, API base configuration, shared pagination helpers, and the server service-query contract
- `types/` — User, Service, Booking, Payment, API response, and pagination contracts
- `public/images/` — local photography, with credits in `CREDITS.md`
- `DESIGN.md` — the visual system future phases must follow

The `/` homepage, `/services` Browse Services page, `/services/[id]` service details page, `/about` page, `/sign-in` / `/sign-up` screens, the shared dashboard foundation at `/dashboard`, the customer, technician, and admin workspaces, and the shared profile surfaces are implemented. Authentication is visual only; the dashboard shell selects `DEMO_USER`, `DEMO_TECHNICIAN`, or `DEMO_ADMIN` by route, no session checks or route guards run, and technician/admin profiles use the role-specific profile URLs so their workspace identity survives a direct load. The public route group keeps the footer out of the dashboard layout.

## Scope

This repository is frontend-only. It contains no authentication, payment processing, API integration, mock backend, or simulated workflows. The navbar's profile, loading, and sign-out states are visual presentation only. The sign-in and sign-up screens validate field input and preserve redirect context visually, but do not connect to BetterAuth, create accounts or sessions, fake toasts/loading, or enforce role-aware route protection. The dashboard foundation at `/dashboard` shares one shell across all three roles, and each role workspace is selected by URL rather than a session. No session checks or route guards run. The customer workspace at `/dashboard/customer` displays sample bookings, a status-only timeline without fabricated timestamps, and sample receipts. Cancel opens a confirmation but leaves the record unchanged; Pay now is available only for Completed and Unpaid bookings and opens a checkout preview rather than contacting Stripe. Its payment page includes loading, empty, and error UI, and none of those states writes data. The technician workspace adds local-only image selection, preview, validation, form submission, service editing, deletion confirmation, availability toggling, and request status/amount validation, but does not upload to ImgBB, persist services, or change bookings. The admin workspace filters static users, services, and bookings and shows role-change and approval confirmations without changing accounts, services, or records. The shared profile validates and previews edits and a selected photo locally, but does not upload to ImgBB, persist the profile, synchronize session data, or update the navbar and dashboard identity. Homepage service listings, platform figures, and customer stories are illustrative sample data. The Browse Services query runs on the server over that static dataset; MongoDB/API integration is outside this frontend build. The public site currently runs as the demo customer so the request modal is reachable; guest and staff branches are implemented in the components. The repair request form validates locally but does not send or persist a booking, so there is no success toast, duplicate-request handling, or My Bookings redirect yet. Photography is sourced from Pexels and credited locally.
