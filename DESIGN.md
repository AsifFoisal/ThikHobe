# FixMate Design Foundation

## Direction

**Workshop calm.** A repair service should feel precise, transparent, and easy to deal with. Deep spruce carries trust and structure, fern supports it, and ember supplies the one live-wire moment. Public pages use generous editorial typography and real repair imagery; dashboards tighten the same system into dense, scannable surfaces. No gradients, decorative glass, or ornamental chrome.

The `/` route is the public homepage. Browse Services, service details, About, and authentication are implemented. The shared dashboard shell and the customer workspace live under `app/(dashboard)/`; technician and admin pages arrive in later phases.

## Brand colors — exactly three

| Token      | Value     | Role      | Primary use                                 |
| ---------- | --------- | --------- | ------------------------------------------- |
| `--spruce` | `#0D4436` | Primary   | Navigation, primary actions, deep surfaces  |
| `--fern`   | `#2E6B55` | Secondary | Supporting emphasis, links, charts, icons   |
| `--ember`  | `#E86F3A` | Accent    | Live-wire highlights, ratings, warm moments |

Neutral surfaces are derived from the spruce hue: `--paper` `#FAFBF8`, `--ink` `#12211B`, `--muted-ink` `#50655C`, `--sage` `#E8F0EA`, `--sage-strong` `#D7E3DA`, `--line` `#E0E8E1`, and `--line-strong` `#C8D7CD`.

Do not introduce another brand color. Functional status colors are restricted to the booking, payment, and approval languages below. Use tints of the palette rather than gray for secondary text on colored surfaces.

## Typography

One family: **Hanken Grotesk**, self-hosted through `next/font/google`, weights 400–700, with a `Noto Sans Bengali` fallback in the stack. Never mix in a second display or body family.

| Class           | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `.type-display` | Public hero headlines; fluid 44–88px, tight tracking |
| `.type-h1`      | Page titles                                          |
| `.type-h2`      | Section headings                                     |
| `.type-h3`      | Card and panel headings                              |
| `.type-lead`    | Introductory paragraphs                              |
| `.type-label`   | Small uppercase group labels                         |
| `.type-meta`    | Metadata, helper text, timestamps                    |
| `.tabular`      | Prices, statistics, tables, and IDs                  |

Body copy is 16px with relaxed leading and a 65–75 character measure. Use weight and scale for hierarchy, not extra colors.

The homepage hero uses the display face at 36–56px with controlled line breaks so the mandated headline holds together on desktop and mobile. Other page heroes may use the larger `.type-display` end of the scale.

## Homepage composition

The public homepage follows this rhythm: paper hero → white featured services → spruce process section → paper categories → white why-FixMate split → sage trust band → spruce final CTA → ink footer.

- **Hero** (`components/home/hero.tsx`): split at `lg`, 4:3 repair photo with a verified badge and a static repair-progress card. The search form is native `GET /services`; the secondary CTA anchors to `#how-it-works`.
- **Featured services** (`components/home/featured-services.tsx`): six latest approved and available sample services, using the reusable `ServiceCard`.
- **How it works** (`components/home/how-it-works.tsx`): four numbered steps on a hairline rail plus a pay-after-completion promise panel. The section carries the strongest business differentiator.
- **Categories** (`components/home/popular-categories.tsx`): seven category tiles plus an all-services tile, each linking to `/services?category=…`.
- **Why FixMate** (`components/home/why-fixmate.tsx`): image-led split with five concrete advantages, not a generic card grid.
- **Trust** (`components/home/trust-section.tsx`): illustrative platform figures, customer stories, and three trust indicators. The disclosure line is mandatory while data is static.
- **Final CTA** and **SiteFooter**: the CTA uses the ember accent; the footer is ink, four columns, and exists only inside the public route group.

Service cards keep a 4:3 image, two-line title clamp, bottom-aligned price row, and a bordered details action. Use the same card on the homepage and Browse Services.

## Browse Services

`app/(public)/services/page.tsx` is a dynamic server-rendered page. URL contract:

- `search` — free text against service title and category
- `category` — one of the seven service categories
- `mode` — `Home Visit` or `Shop Drop-off`
- `sort` — `newest` (default), `price-asc`, `price-desc`
- `page` — 1-based page number, 9 services per page

`lib/services-query.ts` owns parsing, canonical link building, filtering, sorting, and slicing. **No filtering or pagination runs in client JavaScript.** The module currently queries the static presentation dataset and returns `PaginatedData<SampleService>`; replace its internals with the MongoDB query layer when backend integration is in scope. The page contract, filters, and pagination stay unchanged.

- The filter bar is a native `GET /services` form. Submitting it omits `page`, so changing filters resets pagination.
- Active search/category/mode chips remove one filter at a time. “Clear filters” resets everything.
- Pagination preserves the current search, filters, and sort; the current page carries `aria-current="page"`.
- Results show a range and total, with an empty state that offers a clear action.
- `services/loading.tsx` provides matching card skeletons and a filter-bar skeleton; `services/error.tsx` provides retry and home actions.
- The grid is 1 column on mobile, 2 on tablet, and 3 on desktop.

## Service details & booking

`app/(public)/services/[id]/page.tsx` is a server-rendered detail page. Approved and available services are pre-rendered; pending, rejected, unavailable, or unknown IDs call `notFound()` and render the themed service Not Found page.

- **Layout:** breadcrumb → two columns at `lg` (title, description, large image, technician on the left; sticky price summary on the right). The customer request form opens in an accessible modal from the summary CTA.
- **Summary:** starting price, final-amount explanation, estimated duration, mode, area, role-aware CTA, and the no-upfront-payment promise.
- **Technician:** monogram avatar, verified and Pro badges when applicable, area, bio, and skills.
- **Request modal:** the customer CTA opens a Base UI dialog with the validated form; guest CTA links to sign-in with the intended destination preserved; technician/admin accounts see a disabled customer-only CTA and note. The prototype runs as the demo customer (`DEMO_USER`) so the modal is reachable; the guest and staff branches remain implemented through component props.
- **Form:** read-only name and email, phone, service address, preferred date, and problem description. React Hook Form and Zod enforce required fields, phone format, no past dates, and a 20-character description minimum.
- **Scope:** a valid submit shows an honest preview notice and does not send or persist a booking. There is no success toast, duplicate-request check, or My Bookings navigation until a backend is in scope.
- **States:** segment-specific loading skeletons and error boundary; `notFound` covers removed, pending, rejected, and unavailable services.

## About page

`app/(public)/about/page.tsx` is a static long-form page. It must stay distinct from the homepage rather than repeating its hero, featured services, trust cards, or category tile grid.

- **Introduction:** text-led editorial opening with an on-page index, followed by a full-bleed technician image and caption.
- **Problem:** ink section with four specific “not-knowing” pain points and the “information first, payment last” thesis.
- **Process:** a vertical, detailed four-stage list with status badges, paired with a sticky introductory statement. This replaces the homepage’s horizontal step rail.
- **Benefits:** one split panel contrasting the customer experience with the technician experience; the technician side is spruce.
- **Payment:** a dedicated explanation with a status ledger from Requested through Paid, using the shared booking/payment badges.
- **Categories:** an editorial list of all seven categories with descriptions and links, not the homepage tile grid.
- **Final CTA:** a light sage closing band with a spruce browse action, distinct from the homepage’s dark final CTA.

Section IDs: `#problem`, `#how-it-works`, `#benefits`, `#payment`, `#categories`. Every anchor has `scroll-mt-24` so the sticky navbar does not overlap it.

## Authentication screens

`app/(auth)/` owns `/sign-in` and `/sign-up` outside the public marketing shell. The layout is a full-height split: a spruce brand panel with the light logo, supporting promises, and the shared status language; a paper form side with “Back to home,” the form, and a minimal legal line. On mobile the brand panel collapses to a logo bar.

- **Sign up:** Full name, email, password, and Customer/Technician account type. Admin registration is absent; the UI states that admin accounts are managed internally.
- **Sign in:** Email and password with a preserved `redirect` context shown as a return note.
- **Interaction:** React Hook Form and Zod validation, inline errors, password visibility toggles, account-type selection with native radios styled as cards, and links between the two auth pages that preserve `redirect`.
- **Scope:** this is a visual authentication prototype. It does not connect to BetterAuth, create accounts or sessions, show fake success/error toasts, simulate loading, or enforce role-aware route protection. Valid submissions show an explicit preview notice instead. The customer dashboard is implemented, but it is not session-aware or guarded.

## Dashboard foundation

`app/(dashboard)/` owns the shared shell for all three roles. `/dashboard` remains the component-preview route that exercises the shell and primitives; the customer pages are built under `/dashboard/customer`, while technician and admin pages are intentionally not built yet. It is dynamic only because its preview pagination reads `searchParams`.

- **Shell** (`components/dashboard/dashboard-shell.tsx`): a 256px sticky sidebar at `lg`, reduced to a 76px icon rail when collapsed, and a sticky top bar at 64px / 72px. The top bar carries the workspace label, avatar, name, and role. The sidebar toggle sits in the sidebar header; the mobile menu and logo sit in the top bar. The mobile drawer is a Base UI dialog with a backdrop, focus trap, Escape close, and focus return to the trigger.
- **Role navigation** (`constants/dashboard-nav.ts`): one typed map for all roles. Customer — Overview, My bookings, Payments, Profile. Technician — Overview, Add service, My services, Requests, Profile. Admin — Overview, Users, Services, Bookings, Transactions, Profile. The longest matching href is active, receives `aria-current="page"` and a sage fill, and the `/dashboard` preview maps to the role's Overview. Collapsed links keep their accessible labels and tooltips.
- **Top bar identity**: name and role are hidden below `sm`; the drawer repeats them with the full email so identity is never lost on mobile.
- **Primitives**: `StatCard` / `StatCardSkeleton`; `DataTable` (desktop table, stacked definition lists below `md`, 36rem table minimum); `SearchInput` and `FilterSelect`; `DashboardPagination` (URL-backed with current and disabled states); `ChartCard` (Recharts bars using the fern token and CSS-variable axes); `ConfirmDialog` (Base UI modal with focus trap, Escape, scroll lock, and a destructive confirm; `onConfirm` is optional and changes no data by default); `TableSkeleton`; shared `EmptyState`; and the existing `Field` controls. `/dashboard` shows these in a gallery: stats, sample bookings, a weekly chart, form fields, confirmation, empty, and loading specimens.
- **Responsive rhythm**: four stats from `xl`; table and chart share a row from `xl`; the four specimen cards stay 2-up until the named `wide` breakpoint. The table becomes stacked definition rows below `md`, and the sidebar becomes a drawer below `lg`.
- **Scope**: preview pagination changes `?page` over the sample table. Search, status filtering, form fields, and the confirmation action are presentational. No mock backend, fake notifications, persisted changes, or success flows are wired in.

## Customer dashboard

`app/(dashboard)/dashboard/customer/` is the first completed role workspace. Every screen runs on `DEMO_USER` and the static records in `data/sample-customer-bookings.ts`; none of it is session-aware.

- **Overview** (`/dashboard/customer`): four stats derived from the sample bookings — total requests, active jobs, completed jobs, and paid to date — followed by five recent bookings, a Recharts donut for the six booking statuses, and a four-item recent activity summary. Header actions link to My bookings and Payment history. Activity deliberately omits timestamps because live history is not connected.
- **My bookings** (`/dashboard/customer/bookings`): all 11 sample bookings, covering Requested, Accepted, In Progress, Completed, Rejected, and Cancelled, with Unpaid and Paid states. A six-column desktop table starts at `xl`; below that the same records become cards, 2-up from `md` and single-column on phones. Each card keeps the service image, technician, preferred date, base price, final amount, status badges, and timeline link.
- **Actions**: Cancel appears only for Requested bookings and opens the shared confirmation dialog. Pay now appears only for Completed + Unpaid bookings, and Paid bookings show only the Paid badge. Both actions are honest previews: confirming a cancel leaves the record unchanged, and Pay now opens a checkout preview that states Stripe is not connected. No cancellation, success toast, or payment state is simulated.
- **Job timeline** (`/dashboard/customer/bookings/[id]`): completed, current, and pending stages for Requested → Accepted → In Progress → Completed → Paid. The current stage uses the ember accent; closed bookings show a dedicated cancelled or rejected panel instead of a fabricated path. Timestamps are intentionally absent and a visible note explains why; the backend-owned history is not invented.
- **Payment history** (`/dashboard/customer/payments`): four sample receipts with service, technician, amount, transaction ID, payment date, and paid badge. The desktop table starts at `xl`; cards follow below. Loading uses `loading.tsx` with table skeletons, the error boundary uses the shared error state, and an empty-state branch covers no payments.
- **Data and formatting**: `data/sample-customer-bookings.ts` derives bookings from the approved sample services and builds payments and status-only activity from those records. `formatDate` and `formatBookingFinalAmount` live in `lib/format.ts`, with monospace-like tabular numerals used for money, dates, IDs, and transaction references.
- **Scope**: the workspace is sample data behind the demo identity. Authentication, route guards, persistence, Stripe Checkout, backend status history, and live cancellation are not implemented.

## Spacing and layout

- Base unit: 4px, using the Tailwind spacing scale. Do not invent arbitrary margins.
- Section rhythm: `.section` (64–112px block padding) and `.section-tight` (40–64px).
- Public container: `.container-page`, max 80rem with fluid 20–40px gutters.
- Dashboard container: `.container-dashboard`, max 96rem with fluid 16–32px gutters.
- Breakpoints: Tailwind defaults — `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem — plus the named `wide` breakpoint at 87.5rem for dashboard rows that need four comfortable columns.
- Public grids: 1 column on mobile, 2 on tablet, 3–4 on desktop. The shared compact `DataTable` switches below `md`; the richer customer booking and payment tables hold the table from `xl` and switch to cards below it.
- Customer booking cards are 2-up from `md` and single-column on phones; the booking-detail summary moves above the repair details below `xl`.

## Shape and elevation

- Control radius: 10px. Card radius: `rounded-xl` (about 17px). Large panels: `rounded-2xl` (about 22px). Pills only for badges and small segmented controls.
- Cards use a **border only** at rest. Do not combine a 1px border with a wide soft shadow.
- `shadow-float` is reserved for floating layers such as menus, dialogs, and toasts.
- Control heights: 36px (`sm`), 40px (default), 48px (`lg`). Icon controls match their row height.

## Components

- **Logo** (`components/layout/logo.tsx`): spruce tile with a tilted wrench, ink wordmark with fern/ember second syllable. Use `tone="light"` on dark surfaces.
- **PublicNavbar** (`components/layout/public-navbar.tsx`): sticky global header. Accepts `user` and `isAuthLoading`; use it on every public page.
- **SiteFooter** (`components/layout/site-footer.tsx`): ink four-column footer with quick links, all repair categories, contact details, modern X/Facebook/Instagram/LinkedIn icons, and copyright. It belongs to the public layout only.
- **SectionHeading** (`components/ui/section-heading.tsx`): shared section title, supporting copy, and optional action.
- **ServiceCard** (`components/services/service-card.tsx`): the shared service card for the homepage and Browse Services. `ServiceCardSkeleton` and `FeaturedServicesSkeleton` provide the loading state.
- **ServicesFilters** (`components/services/services-filters.tsx`): native GET filter bar for search, category, mode, and sort.
- **ServicesPagination** (`components/services/services-pagination.tsx`): URL-preserving previous/next and page numbers with disabled and current states.
- **ServiceSummaryCard** (`components/services/service-summary-card.tsx`): sticky price/duration/mode/area summary with the role-aware request CTA.
- **TechnicianCard** (`components/services/technician-card.tsx`): technician identity, verification, bio, and skills.
- **About sections** (`components/about/`): editorial intro, problem, vertical process, customer/technician benefits, payment ledger, category list, and closing CTA.
- **Category icons** (`components/services/category-icons.tsx`): the shared Lucide map for all seven categories, used by the homepage and About page.
- **Auth screens** (`app/(auth)/`): split auth shell with sign-up and sign-in pages.
- **Auth forms** (`components/auth/`): validated sign-up/sign-in forms, shared password field with visibility toggle, and account-type cards.
- **Dashboard foundation** (`components/dashboard/` and `app/(dashboard)/`): role-aware shell and sidebar, stat cards, data table, search and filter controls, URL pagination, Recharts chart cards, confirmation dialog, and table skeleton. Navigation lives in `constants/dashboard-nav.ts`; the shared page-item helper lives in `lib/pagination.ts`.
- **Customer dashboard** (`components/customer/` and `app/(dashboard)/dashboard/customer/`): overview bookings and activity, booking-status donut, responsive bookings table/cards, action previews, job timeline, and payment history. Sample records live in `data/sample-customer-bookings.ts`.
- **RequestRepairDialog** (`components/bookings/request-repair-dialog.tsx`): accessible trigger and modal containing the customer request form.
- **RepairRequestForm** (`components/bookings/repair-request-form.tsx`): the validated customer request form with an honest prototype-only submit state.
- **Field** (`components/forms/field.tsx`): shared labels, controls, hints, and inline error styling for forms.
- **Avatar** (`components/ui/avatar.tsx`): initials by default, optional image, shared `sm`/`md`/`lg` sizes.
- **Button** (`components/ui/button.tsx`): `default`, `secondary`, `outline`, `ghost`, `accent`, `destructive`, `link`; sizes `sm`, `default`, `lg`, `icon`, `icon-sm`.
- **Badge** (`components/ui/badge.tsx`): tinted, full-radius status label with optional dot. Tones must come from the shared map.
- **RoleBadge** (`components/ui/role-badge.tsx`): the shared Customer / Technician / Admin role indicator.
- **StatusBadge** (`components/ui/status-badge.tsx`): the only place booking, payment, and approval labels are resolved.
- **Card**, **Skeleton**, **EmptyState**, **ErrorState**, and **LoadingState** provide shared surfaces and feedback.
- **Toaster** (`components/ui/toaster.tsx`): Sonner, bottom-right, light theme, brand tokens. Do not fire simulated notifications.

### Status mapping

- Requested: blue
- Accepted: indigo
- In Progress: amber
- Completed: green
- Rejected: red
- Cancelled: gray
- Unpaid: neutral; Paid: green
- Service Pending: amber; Approved: green; Rejected: red

Use this mapping everywhere. Never remap a status for visual variety.

## Navigation

- Sticky public header on paper with a 1px line: 64px tall below `lg`, 72px at `lg` and above. It shares `.container-page` with the content.
- Desktop links are 36px pills; the active route uses a sage fill, spruce text, and `aria-current="page"`.
- Guest state: ghost **Sign in** and primary **Sign up**. Signed-in state: 32px avatar, truncated name, role badge, and chevron opening a 320px Base UI menu with account details, role dashboard, profile, and sign out.
- Below `lg`, the header shows an identity avatar and a 40px menu toggle. The panel expands in the header flow with the same navigation links and an inline account card or guest CTA pair. Escape closes it and returns focus to the toggle.
- Role tones: Customer neutral, Technician fern, Admin accent.
- `isAuthLoading` renders size-matched skeletons in both the header and mobile panel. Session restoration is intentionally not implemented; this is the visual state reserved for it.
- The demo account lives in `constants/demo.ts` and is presentation data only. The public layout currently passes it so the booking surface can show the customer state; guest and staff states remain supported through the navbar and request-section props. Sign out closes the menu but does not alter authentication.
- The dashboard shell is separate from the public navbar and footer: it owns a sticky sidebar, workspace top bar, and its own mobile drawer. Its role-aware map and responsive behavior are documented under Dashboard foundation. The customer Overview, My bookings, and Payments destinations are implemented; Profile and the technician/admin destinations remain placeholders.

## Motion and interaction

- One purposeful transition language: 200ms ease for controls, soft hover lifts, no bouncing or looping decoration.
- All non-essential motion is removed under `prefers-reduced-motion`.
- Focus is always visible: 2px fern outline with a 3px offset. Buttons additionally use a ring on keyboard focus.
- Hover states change background, border, or text color; they do not change layout dimensions.

## Content and prototype scope

This is a **visual prototype**. Sample services, people, prices, bookings, and statistics may be used to make screens believable, but they must read as examples. Authentication, payments, API calls, mock backends, CRUD operations, and simulated loading-to-success workflows are intentionally not implemented. The navbar's session loading and sign-out states are visual only. Interface controls are designed in place and may be presentational; never imply that a fake operation succeeded.

Homepage services live in `data/sample-services.ts` and are filtered and sorted synchronously; no API is called. Browse Services reuses the same dataset through the server query module. Service technicians use monogram avatars because no real profile photos were supplied. The repair request form validates locally and shows a prototype-only notice; it does not create a booking. The customer dashboard uses static sample bookings, receipts, and derived statistics. Its Cancel action is a confirmation preview only, and Pay now opens a checkout preview instead of contacting Stripe. The shell runs on the demo customer without session-aware routing or live actions, and the job timeline omits timestamps rather than inventing them. Platform statistics and customer stories are illustrative and carry a visible disclosure. Photography is stored locally under `public/images/` and credited in `public/images/CREDITS.md`.
