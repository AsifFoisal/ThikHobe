# FixMate Design Foundation

## Direction

**Workshop calm.** A repair service should feel precise, transparent, and easy to deal with. Deep spruce carries trust and structure, fern supports it, and ember supplies the one live-wire moment. Public pages use generous editorial typography and real repair imagery; dashboards tighten the same system into dense, scannable surfaces. No gradients, decorative glass, or ornamental chrome.

The current `/` route is a temporary foundation preview. It is replaced by the real public homepage in a later phase.

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

## Spacing and layout

- Base unit: 4px, using the Tailwind spacing scale. Do not invent arbitrary margins.
- Section rhythm: `.section` (64–112px block padding) and `.section-tight` (40–64px).
- Public container: `.container-page`, max 80rem with fluid 20–40px gutters.
- Dashboard container: `.container-dashboard`, max 96rem with fluid 16–32px gutters.
- Breakpoints: Tailwind defaults — `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem.
- Public grids: 1 column on mobile, 2 on tablet, 3–4 on desktop. Dashboard tables switch to stacked cards below `md`.

## Shape and elevation

- Control radius: 10px. Card radius: `rounded-xl` (about 17px). Large panels: `rounded-2xl` (about 22px). Pills only for badges and small segmented controls.
- Cards use a **border only** at rest. Do not combine a 1px border with a wide soft shadow.
- `shadow-float` is reserved for floating layers such as menus, dialogs, and toasts.
- Control heights: 36px (`sm`), 40px (default), 48px (`lg`). Icon controls match their row height.

## Components

- **Logo** (`components/layout/logo.tsx`): spruce tile with a tilted wrench, ink wordmark with fern/ember second syllable. Use `tone="light"` on dark surfaces.
- **Button** (`components/ui/button.tsx`): `default`, `secondary`, `outline`, `ghost`, `accent`, `destructive`, `link`; sizes `sm`, `default`, `lg`, `icon`, `icon-sm`.
- **Badge** (`components/ui/badge.tsx`): tinted, full-radius status label with optional dot. Tones must come from the shared map.
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

## Motion and interaction

- One purposeful transition language: 200ms ease for controls, soft hover lifts, no bouncing or looping decoration.
- All non-essential motion is removed under `prefers-reduced-motion`.
- Focus is always visible: 2px fern outline with a 3px offset. Buttons additionally use a ring on keyboard focus.
- Hover states change background, border, or text color; they do not change layout dimensions.

## Content and prototype scope

This is a **visual prototype**. Sample services, people, prices, bookings, and statistics may be used to make screens believable, but they must read as examples. Authentication, payments, API calls, mock backends, CRUD operations, and simulated loading-to-success workflows are intentionally not implemented. Interface controls are designed in place and may be presentational; never imply that a fake operation succeeded.
