# ThikHobe Design Foundation

> **Implementation note:** the visual system in this document remains current. Older auth/data scope statements below describe the pre-integration prototype. The app now uses Better Auth, the Express API, MongoDB, Stripe, and ImgBB; see `README.md`, `API.md`, and `server/README.md` for current behavior.

## Direction

**Workshop calm.** A repair service should feel precise, transparent, and easy to deal with. Deep spruce carries trust and structure, fern supports it, and ember supplies the one live-wire moment. Public pages use generous editorial typography and real repair imagery; dashboards tighten the same system into dense, scannable surfaces. No gradients, decorative glass, or ornamental chrome.

The `/` route is the public homepage. Browse Services, service details, About, and authentication are implemented. The shared dashboard shell and all three role workspaces — customer, technician, and admin — live under `app/(dashboard)/`.

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

The homepage hero uses the display face at 32–68px with a controlled two-line break so the headline holds together on desktop and mobile. Other page heroes may use the larger `.type-display` end of the scale.

## Homepage composition

The public homepage follows this rhythm: spruce photo hero → white featured services → spruce process section → paper categories → white why-ThikHobe split → sage trust band → spruce final CTA → ink footer.

- **Hero** (`components/home/Hero.tsx`): full-bleed workshop photo under a flat spruce scrim that starts behind the transparent homepage header, centered display headline, **Browse services** and **How it works** actions, and a paper trust-badge row. Search lives on Browse Services.
- **Featured services** (`components/home/FeaturedServices.tsx`): six latest approved and available sample services, using the reusable `ServiceCard`.
- **How it works** (`components/home/HowItWorks.tsx`): four numbered steps on a hairline rail plus a pay-after-completion promise panel. The section carries the strongest business differentiator.
- **Categories** (`components/home/PopularCategories.tsx`): seven category tiles plus an all-services tile, each linking to `/services?category=…`.
- **Why ThikHobe** (`components/home/WhyThikHobe.tsx`): image-led split with five concrete advantages, not a generic card grid.
- **Trust** (`components/home/TrustSection.tsx`): illustrative platform figures, customer stories, and three trust indicators. The disclosure line is mandatory while data is static.
- **Final CTA** and **SiteFooter**: the CTA uses the ember accent; the footer is ink, four columns, and exists only inside the public route group.

Service cards use a framed 4:3 image, category line, technician/area row, a from-price and mode meta row, and a bottom action row with a spruce details button and a verified seal. Use the same card on the homepage and Browse Services.

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
- **Scope:** this is a visual authentication prototype. It does not connect to BetterAuth, create accounts or sessions, show fake success/error toasts, simulate loading, or enforce role-aware route protection. Valid submissions show an explicit preview notice instead. All three dashboards are implemented, but none is session-aware or guarded.

## Dashboard foundation

`app/(dashboard)/` owns the shared shell for all three roles. `/dashboard` remains the component-preview route that exercises the shell and primitives; the customer, technician, and admin pages are built under their role segments. It is dynamic only because its preview pagination reads `searchParams`.

- **Shell** (`components/dashboard/DashboardShell.tsx`): a 256px sticky sidebar at `lg`, reduced to a 76px icon rail when collapsed, and a sticky top bar at 64px / 72px. The top bar carries the workspace label, avatar, name, and role. The sidebar toggle sits in the sidebar header; the mobile menu and logo sit in the top bar. The mobile drawer is a Base UI dialog with a backdrop, focus trap, Escape close, and focus return to the trigger.
- **Role navigation** (`constants/dashboard-nav.ts`): one typed map for all roles. Customer — Overview, My bookings, Payments, Profile. Technician — Overview, Add service, My services, Requests, Profile. Admin — Overview, Users, Services, Bookings, Transactions, Profile. The longest matching href is active, receives `aria-current="page"` and a sage fill, and the `/dashboard` preview maps to the role's Overview. Collapsed links keep their accessible labels and tooltips.
- **Top bar identity**: name and role are hidden below `sm`; the drawer repeats them with the full email so identity is never lost on mobile.
- **Primitives**: `StatCard` / `StatCardSkeleton`; `DataTable` (a spruce ledger header with an ember top rule, sentence-case labels, hairline rows, right-aligned numeric columns, squircle identity cells, and a stacked mobile ledger with a dark caption band; `tableFrom="md" | "xl"`, 36rem minimum); `SearchInput` and `FilterSelect`; `DashboardPagination` (URL-backed with current and disabled states); `ChartCard` (Recharts bars using the fern token and CSS-variable axes, with a `fill` option for stretched grid cards); `ConfirmDialog` (Base UI modal with focus trap, Escape, scroll lock, and a destructive confirm; `onConfirm` is optional and changes no data by default); `TableSkeleton`; shared `EmptyState`; and the existing `Field` controls. `/dashboard` shows these in a gallery: stats, sample bookings, a weekly chart, form fields, confirmation, empty, and loading specimens.
- **Responsive rhythm**: four stats from `xl`; table and chart share a row from `xl`; the four specimen cards stay 2-up until the named `wide` breakpoint. The table becomes stacked definition rows below `md`, and the sidebar becomes a drawer below `lg`.
- **Scope**: preview pagination changes `?page` over the sample table. Search, status filtering, form fields, and the confirmation action are presentational. No mock backend, fake notifications, persisted changes, or success flows are wired in.

## Customer dashboard

`app/(dashboard)/dashboard/customer/` is the customer workspace. Every screen runs on `DEMO_USER` and the static records in `data/sample-customer-bookings.ts`; none of it is session-aware.

- **Overview** (`/dashboard/customer`): four stats derived from the sample bookings — total requests, active jobs, completed jobs, and paid to date — followed by five recent bookings, a Recharts donut for the six booking statuses, and a four-item recent activity summary. Header actions link to My bookings and Payment history. Activity deliberately omits timestamps because live history is not connected.
- **My bookings** (`/dashboard/customer/bookings`): all 11 sample bookings, covering Requested, Accepted, In Progress, Completed, Rejected, and Cancelled, with Unpaid and Paid states. A six-column desktop table starts at `xl`; below that the same records become cards, 2-up from `md` and single-column on phones. Each card keeps the service image, technician, preferred date, base price, final amount, status badges, and timeline link.
- **Actions**: Cancel appears only for Requested bookings and opens the shared confirmation dialog. Pay now appears only for Completed + Unpaid bookings, and Paid bookings show only the Paid badge. Pay now opens an honest checkout handoff preview: it shows the booking ID and amount on record, states that the backend would create the Stripe session and control the charge, and never calculates or trusts the payment amount on the client. No cancellation, success toast, or payment state is simulated.
- **Job timeline** (`/dashboard/customer/bookings/[id]`): completed, current, and pending stages for Requested → Accepted → In Progress → Completed → Paid. The current stage uses the ember accent; closed bookings show a dedicated cancelled or rejected panel instead of a fabricated path. Timestamps are intentionally absent and a visible note explains why; the backend-owned history is not invented.
- **Payment history** (`/dashboard/customer/payments`): four sample receipts with service, technician, amount, transaction ID, payment date, and paid badge. The desktop table starts at `xl`; cards follow below. Loading uses `loading.tsx` with table skeletons, the error boundary uses the shared error state, and an empty-state branch covers no payments.
- **Data and formatting**: `data/sample-customer-bookings.ts` derives bookings from the approved sample services and builds payments and status-only activity from those records. `formatDate` and `formatBookingFinalAmount` live in `lib/format.ts`, with monospace-like tabular numerals used for money, dates, IDs, and transaction references.
- **Scope**: the workspace is sample data behind the demo identity. Authentication, route guards, persistence, Stripe Checkout, backend status history, and live cancellation are not implemented.

## Technician dashboard

`app/(dashboard)/dashboard/technician/` renders the demo technician workspace for Rafiul Islam. The route-aware shell resolves `DEMO_TECHNICIAN` from the pathname; this is a presentation identity, not a session.

- **Overview** (`/dashboard/technician`): total services, approved services, and pending requests, followed by recent repair requests, a service-approval composition bar, a weekly booking-activity chart, and a service-availability summary. Lists and charts are derived from the shared sample data.
- **Add a service** (`/dashboard/technician/add-service`): React Hook Form and Zod cover title, category, description, base price, duration, mode, area, and image. The technician name and email come from the demo workspace and are displayed read-only. The real file input supports local preview, file-type and 5 MB validation, replace, and remove. ImgBB is not connected, so no upload loading, network error, or uploaded state is simulated; the field states that the preview is local. A valid submit shows an honest "Ready for approval" notice describing the eventual Pending + Available result; no toast, upload, or service record is created.
- **My services** (`/dashboard/technician/my-services`): all seven technician services with image, category, price, approval status, availability switch, edit, and delete. The switch is enabled only for approved listings and changes the local visual state only. The prefilled edit dialog validates locally and explains that a live save would return the listing to Pending approval. Delete uses the shared confirmation dialog. Nothing is persisted.
- **Repair requests** (`/dashboard/technician/requests`): the eight bookings assigned to the demo technician. Status filters cover All, Requested, Accepted, In Progress, and Completed; Rejected and Cancelled remain visible under All. Action sets are status-exact: Accept/Reject for Requested, Start work for Accepted, and Mark completed for In Progress. Mark completed includes base price, a final-amount field, and `> 0` validation. Completed, rejected, and cancelled requests show payment information and no status actions. Every action is a confirmation/validation preview; no status, final amount, or payment record changes.
- **Data**: `data/sample-technician.ts` owns the demo technician's services; `data/sample-platform.ts` adds requests, payments, users, platform services, monthly revenue, and activity. Demo identities live in `constants/demo.ts`.

## Admin dashboard

`app/(dashboard)/dashboard/admin/` renders the demo administrator workspace for Nabil Hasan, resolved by the same route-aware shell. It is not protected.

- **Overview** (`/dashboard/admin`): total users, technicians, pending services, and platform revenue, followed by users-by-role bars, a platform booking-status donut, a monthly revenue chart, and recent platform activity. All samples are explicitly labelled.
- **Manage users** (`/dashboard/admin/users`): the platform directory with monogram avatars, name, email, role, and joined date. Search and role filtering run over the static dataset through a native GET form. The role-change dialog offers Customer, Technician, and Admin and requires an explicit review step; it never updates an account. The current administrator's control is disabled and labelled as the current account. `loading.tsx` shows header and table skeletons; the filtered-empty state offers a clear recovery.
- **Service approvals** (`/dashboard/admin/services`): all 26 platform services, with Pending selected by default and pending listings sorted first in All. Filters are All, Pending, Approved, and Rejected. Approve and Reject use confirmation dialogs and explicitly state that the service remains pending. The table shows image, title, technician, category, price, approval status, and creation date.
- **All bookings** (`/dashboard/admin/bookings`): read-only table of every platform booking with service, customer, technician, preferred date, booking status, payment status, and amount. Status filters cover all six booking states. No row actions render.
- **Transactions** (`/dashboard/admin/transactions`): all nine sample payments with customer, technician, service, amount, transaction ID, and payment date. Total revenue and average payment sit above a monthly revenue chart; the total is repeated beside the table heading. No payment provider is connected.
- **Responsive data**: the dense technician and admin record tables switch to stacked definition rows below `xl`; the simpler transactions table holds its table from `md`. This keeps tablet content out of horizontal table scroll.

## Shared profile

`/dashboard/profile` is the shared profile surface for all three demo roles. Because there is no real session, the demo identity follows an explicit workspace profile URL: `/dashboard/profile` for the customer, `/dashboard/profile/technician` for the technician, and `/dashboard/profile/admin` for the admin. All three render the same `ProfileView` and the route-aware shell, so the sidebar, top bar, and form keep the same identity across reloads.

- **Fields:** editable name, phone, area, and bio; read-only email and role; a real file input for the profile photo with a circular local preview, replace/remove controls, file-type checks, and a 5 MB limit. `ProfileView` reads the demo identity from `DashboardUserContext` and seeds contact details from `constants/demo-profiles.ts`.
- **Read-only identity:** the email and role fields are visibly locked, and a sidebar card repeats the current demo identity and role.
- **Scope:** ImgBB is not connected. There is no upload loading state, network upload error, uploaded state, profile persistence, session synchronization, or top-bar/navbar update. A valid submit validates the form and shows an explicit notice; no toast is fired and the current identity card stays unchanged.
- **After a live save:** the sidebar explains the intended backend sequence — upload the photo to ImgBB, save the profile, then refresh session data so the navbar and dashboard identity update without another sign-in.
- **Responsive:** the form and sidebar stack below `xl`; the photo field, fields, and read-only identity remain usable at phone width.

## Payment surfaces

`app/payment/` owns the standalone `/payment/success` and `/payment/cancel` pages, outside both the public marketing shell and the dashboard. A minimal header (logo and My bookings), centered surface, and a footer note make clear this is a sample payment area; no card data is collected.

- **Pay now gate:** the customer booking action renders only when the booking is Completed and payment is Unpaid. Its handoff dialog names the booking ID, labels the amount as a server-controlled record, explains the intended backend-to-Stripe redirect, and does not create a session or redirect in the current UI.
- **Success** (`/payment/success`): reads `session_id`; missing IDs render an invalid-session state. A supplied ID is verified server-side with Stripe Checkout Session retrieval. Verification failures, open sessions, and other non-complete statuses never show a success receipt. Complete sessions render the verified service line item, customer email, amount paid, transaction ID, payment date, confirmation badge, Return to My Bookings, and Payment history. A route skeleton covers verification loading and `error.tsx` covers unexpected failures.
- **Cancel** (`/payment/cancel`): says no payment was completed, the booking remains unpaid, and no payment information was modified on the client. Try Again and Return to My Bookings lead back to the customer bookings, where a Completed + Unpaid booking can start checkout again in a connected flow.
- **Trust boundary**: the success amount is derived from the verified Stripe session on the server; the client does not calculate or trust a query-string amount. No payment records are modified on the result pages.
- **Scope**: the server-side verification page and a checkout API scaffold are present, but Pay Now is not yet wired to the scaffold and the scaffold still contains placeholder price/integration values. The verified success page is real verification UI; no fake success state is rendered.

## Application-wide states

- **Loading:** route-level skeletons cover the public homepage/featured services, Browse Services, service details, the customer/technician/admin overview statistics, admin and technician tables, customer booking lists and detail, technician repair requests, payment history, admin transactions, profile information, and payment verification. Shared primitives are `StatCardSkeleton`, `StatGridSkeleton`, `ChartSkeleton`, `TableSkeleton`, and `Skeleton`; motion is reduced under `prefers-reduced-motion`.
- **Empty:** meaningful states exist for no available services, no matching service results, no customer bookings, no technician requests, no technician services, no payment history, no platform transactions, no users, and no filtered admin records. Each offers the relevant next action, such as Browse services, Clear filters, View bookings, Add service, or View my bookings.
- **Errors:** the root `error.tsx` and dashboard `error.tsx` provide a clear explanation plus Retry and Return Home/dashboard actions. Service and booking detail routes have themed Not Found states for missing or invalid IDs. Payment verification catches Stripe failures and non-complete sessions without showing success. Image fields validate file type and size locally. Unauthorized/forbidden and unexpected API-response states are not reachable because the app has no authenticated routes or general data API; the generic error boundaries remain the fallback.
- **Not Found:** the root `app/not-found.tsx` uses a repair-tools illustration, a plain-language message, Back to Home, and Browse services. A dashboard-specific not-found surface and the service/booking not-found pages cover nested missing records.

## Notifications and confirmations

- **Sonner:** one global bottom-right Toaster uses the shared paper/card/line tokens, close button, 4.2 s duration, and 10 px gap. It is loaded from the root layout only.
- **Truthful preview notifications:** confirmation actions, availability changes, and request accept/reject/start actions emit one `toast.info("Preview only", …)` with a fixed id, so repeated actions update one toast rather than stacking. Messages state exactly what did not change.
- **No fake success:** actions that do not persist—auth, profile save, service create/edit, uploads, booking creation, payment initiation—do not fire success toasts. Forms keep inline validation notices instead. The verified payment page confirms by its receipt rather than duplicating the result in a toast.
- **Confirmation dialogs:** the shared `ConfirmDialog` is used for booking cancellation, service deletion, and service approval; the repair-request status dialog covers rejection, acceptance, and starting work. Messages name the consequence and this preview boundary. Dialogs close on a single confirm, the completion form disables its submit after local validation, and no artificial pending spinner is shown without a backend request.

## Spacing and layout

- Base unit: 4px, using the Tailwind spacing scale. Do not invent arbitrary margins.
- Section rhythm: `.section` (64–112px block padding) and `.section-tight` (40–64px).
- Public container: `.container-page`, max 80rem with fluid 20–40px gutters.
- Dashboard container: `.container-dashboard`, max 96rem with fluid 16–32px gutters.
- Breakpoints: Tailwind defaults — `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem — plus the named `wide` breakpoint at 87.5rem for dashboard rows that need four comfortable columns.
- Public grids: 1 column on mobile, 2 on tablet, 3–4 on desktop. Dashboard tables use the spruce ledger header and hairline rows. The shared `DataTable` and customer booking/payment tables use a stacked ledger below `md`/`xl`; the transaction table holds its table from `md`. The stacked ledger keeps a dark caption band, a primary identity block, and right-aligned meta values.
- Customer booking cards are 2-up from `md` and single-column on phones; the booking-detail summary moves above the repair details below `xl`.

## Shape and elevation

- Control radius: 10px. Card radius: `rounded-xl` (about 17px). Large panels: `rounded-2xl` (about 22px). Pills only for badges and small segmented controls.
- Cards use a **border only** at rest. Do not combine a 1px border with a wide soft shadow.
- `shadow-float` is reserved for floating layers such as menus, dialogs, and toasts.
- Control heights: 36px (`sm`), 40px (default), 48px (`lg`). Icon controls match their row height.

## Components

- **Logo** (`components/layout/Logo.tsx`): spruce tile with a tilted wrench, ink wordmark with an ember second syllable (`paper` wordmark on dark surfaces). Use `tone="light"` on dark surfaces.
- **PublicNavbar** (`components/layout/PublicNavbar.tsx`): sticky global header. Accepts `user` and `isAuthLoading`; use it on every public page.
- **SiteFooter** (`components/layout/SiteFooter.tsx`): ink brand-closing footer with an oversized paper/ember ThikHobe wordmark, a flat ember divider, brand copy and social icons, Explore/Repairs/Contact columns, and a copyright bar. It belongs to the public layout only.
- **SiteIntro** (`components/layout/SiteIntro.tsx`): homepage-only film opening using the DiMaac `FilmSplitLoader` (`components/dimaac/film-split-loader.tsx`, GSAP). It appears on each full homepage document load/reload, using document-level entry-path and intro-shown markers. It locks page scroll while open and hands off on completion with a 700ms crossfade: the loader fades and scales away while the public shell fades and rises from 18px. It never renders on other pages, client route changes, or inside the dashboard/auth/payment shells. There is no title/subtitle/logo layer: the split opens directly into the homepage. `--film-bg`, `--film-fg`, and `--film-on` map to spruce/paper, the `Hobe` word uses ember, and the loader keeps its reduced-motion fallback.
- **SectionHeading** (`components/ui/SectionHeading.tsx`): shared section title, supporting copy, and optional action.
- **ServiceCard** (`components/services/ServiceCard.tsx`): the shared service card for the homepage and Browse Services. `ServiceCardSkeleton` and `FeaturedServicesSkeleton` provide the loading state.
- **ServicesFilters** (`components/services/ServicesFilters.tsx`): native GET filter bar for search, category, mode, and sort.
- **ServicesPagination** (`components/services/ServicesPagination.tsx`): URL-preserving previous/next and page numbers with disabled and current states.
- **ServiceSummaryCard** (`components/services/ServiceSummaryCard.tsx`): sticky price/duration/mode/area summary with the role-aware request CTA.
- **TechnicianCard** (`components/services/TechnicianCard.tsx`): technician identity, verification, bio, and skills.
- **About sections** (`components/about/`): editorial intro, problem, vertical process, customer/technician benefits, payment ledger, category list, and closing CTA.
- **Category icons** (`components/services/CategoryIcons.tsx`): the shared Lucide map for all seven categories, used by the homepage and About page.
- **Auth screens** (`app/(auth)/`): split auth shell with sign-up and sign-in pages.
- **Auth forms** (`components/auth/`): validated sign-up/sign-in forms, shared password field with visibility toggle, and account-type cards.
- **Dashboard foundation** (`components/dashboard/` and `app/(dashboard)/`): role-aware shell and sidebar, stat cards, data table, search and filter controls, URL pagination, Recharts chart cards, confirmation dialog, and table skeleton. Navigation lives in `constants/dashboard-nav.ts`; the shared page-item helper lives in `lib/pagination.ts`.
- **Customer dashboard** (`components/customer/` and `app/(dashboard)/dashboard/customer/`): overview bookings and activity, booking-status donut, responsive bookings table/cards, action previews, job timeline, and payment history. Sample records live in `data/sample-customer-bookings.ts`.
- **Technician dashboard** (`components/technician/` and `app/(dashboard)/dashboard/technician/`): add-service form with local image field, editable service previews, availability toggle, status-specific request action dialogs, and completion-amount validation. Shared data lives in `data/sample-technician.ts` and `data/sample-platform.ts`.
- **Admin dashboard** (`components/admin/` and `app/(dashboard)/dashboard/admin/`): role-change dialog, service approval actions, user filtering, platform charts, and read-only record tables. Shared platform data lives in `data/sample-platform.ts`.
- **Shared profile** (`components/profile/` and `app/(dashboard)/dashboard/profile/`): one profile form, circular photo preview with local validation, read-only email/role, and identity/next-steps panels for all demo roles.
- **Payment surfaces** (`app/payment/`): standalone payment layout, success result states, and cancellation page. Success receipts are verified-response or labelled-preview data only.
- **RequestRepairDialog** (`components/bookings/RequestRepairDialog.tsx`): accessible trigger and modal containing the customer request form.
- **RepairRequestForm** (`components/bookings/RepairRequestForm.tsx`): the validated customer request form with an honest prototype-only submit state.
- **Field** (`components/forms/Field.tsx`): shared labels, controls, hints, and inline error styling for forms.
- **Avatar** (`components/ui/Avatar.tsx`): initials by default, optional image, shared `sm`/`md`/`lg` sizes.
- **Button** (`components/ui/Button.tsx`): `default`, `secondary`, `outline`, `ghost`, `accent`, `destructive`, `link`; sizes `sm`, `default`, `lg`, `icon`, `icon-sm`.
- **Badge** (`components/ui/Badge.tsx`): tinted, full-radius status label with optional dot. Tones must come from the shared map.
- **RoleBadge** (`components/ui/RoleBadge.tsx`): the shared Customer / Technician / Admin role indicator.
- **StatusBadge** (`components/ui/StatusBadge.tsx`): the only place booking, payment, and approval labels are resolved.
- **Card**, **Skeleton**, **EmptyState**, **ErrorState**, and **LoadingState** provide shared surfaces and feedback.
- **State primitives**: `StatGridSkeleton` and `ChartSkeleton` compose the dashboard skeletons; `ToolsIllustration` powers the 404 and error pages; `previewToast` provides the one-at-a-time preview notification channel.
- **Toaster** (`components/ui/Toaster.tsx`): Sonner, bottom-right, light theme, brand tokens. Only truthful preview notifications are fired; never announce a backend success that did not happen.

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

- Sticky public header: 64px tall below `lg`, 72px at `lg` and above. Interior pages use paper with a 1px line. The homepage header overlays the hero — transparent with the light logo at the top, then the paper header returns with a 200ms color/shadow transition once scrolled or while the mobile menu is open. The line is an inset shadow so it does not add a pixel to the header height. It shares `.container-page` with the content.
- Desktop navigation sits in a recessed sage tray; links are 40px pills and the active route is marked by a raised white pill that slides between links. The active link uses spruce text and `aria-current="page"`. The sage trays keep the controls legible over both the photo hero and paper headers.
- Guest state: quiet **Sign in** and a raised spruce **Sign up**, both inside a recessed tray. Signed-in state: a raised profile pill with a 32px avatar, truncated name, role badge, and chevron opening a 320px Base UI menu with account details, role dashboard, profile, and sign out.
- Below `lg`, the header shows an identity avatar and a 40px raised menu toggle inside a recessed well. The panel expands in the header flow with the same tray-and-pill links and an inline account card or guest CTA pair. Escape closes it and returns focus to the toggle.
- Role tones: Customer neutral, Technician fern, Admin accent.
- `isAuthLoading` renders size-matched skeletons in both the header and mobile panel. Session restoration is intentionally not implemented; this is the visual state reserved for it.
- The demo account lives in `constants/demo.ts` and is presentation data only. The public layout currently passes it so the booking surface can show the customer state; guest and staff states remain supported through the navbar and request-section props. Sign out closes the menu but does not alter authentication.
- The dashboard shell is separate from the public navbar and footer: it owns a sticky sidebar, workspace top bar, and its own mobile drawer. Its role-aware map and responsive behavior are documented under Dashboard foundation. The customer Overview/My bookings/Payments/Profile, technician Overview/Add service/My services/Requests/Profile, and admin Overview/Users/Services/Bookings/Transactions/Profile destinations are implemented. The shell selects `DEMO_USER`, `DEMO_TECHNICIAN`, or `DEMO_ADMIN` by route rather than by authentication; the technician and admin profile entries live at `/dashboard/profile/technician` and `/dashboard/profile/admin` so the identity survives a direct profile load.

## Motion and interaction

- One purposeful transition language: 200ms ease for controls, soft hover lifts, no bouncing or looping decoration.
- `SiteIntro` is the only full-screen opening. Its 700ms fade/rise handoff is the handoff to the public shell; route changes keep the existing skeletons and never replay the film intro.
- All non-essential motion is removed under `prefers-reduced-motion`.
- Focus is always visible: 2px fern outline with a 3px offset. Buttons additionally use a ring on keyboard focus.
- Hover states change background, border, or text color; they do not change layout dimensions.

## Content and prototype scope

Most of this repository is a **visual prototype**. Sample services, people, prices, bookings, and statistics may be used to make screens believable, but they must read as examples. Authentication, general API data, mock backends, CRUD operations, and simulated success workflows remain intentionally absent. A server-side Stripe verification page and checkout API scaffold are present; the scaffold still uses placeholder configuration and is not driven by Pay Now. The navbar's session loading and sign-out states are visual only. Interface controls are designed in place and may be presentational; never imply that a fake operation succeeded.

Homepage services live in `data/sample-services.ts` and are filtered and sorted synchronously; no API is called. Browse Services reuses the same dataset through the server query module. Service technicians use monogram avatars because no real profile photos were supplied. The repair request form validates locally and shows a prototype-only notice; it does not create a booking. The customer dashboard uses static sample bookings, receipts, and derived statistics. Its Cancel action is a confirmation preview only, and Pay now opens an honest backend/Stripe handoff preview instead of creating a session or redirecting; the client never trusts a calculated charge. The technician workspace reuses the same honesty boundary: service image selection and preview are local, ImgBB is not connected, add/edit submissions are not persisted, availability stays local, and request status actions only demonstrate validation and confirmation. The admin workspace filters static data and shows confirmation previews for role and approval actions; no account, service, booking, or payment is changed. The shared profile uses the same local-only boundary: the photo preview is local, ImgBB and profile persistence are absent, and session synchronization never changes the navbar or dashboard identity. `/payment/success` now verifies a supplied checkout session with Stripe on the server and renders success only for a complete verified session; invalid, failed, and incomplete sessions do not show a receipt. `/payment/cancel` explains that no payment was completed. Pay Now and the checkout API scaffold are not yet connected end-to-end, so no checkout session is initiated from the booking UI. The shell selects the demo identity from the route without session-aware routing, and the job timeline omits timestamps rather than inventing them. Toast notifications are limited to truthful preview-only feedback; no backend success is announced. Platform statistics and customer stories are illustrative and carry a visible disclosure. Hero and editorial photography is stored locally under `public/images/`; service photography is hosted on ImgBB. Both are credited in `public/images/CREDITS.md`.
