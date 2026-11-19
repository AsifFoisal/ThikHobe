# FixMate API architecture

## Layers

- `lib/api/` — production transport and domain functions. It knows only about
  `NEXT_PUBLIC_API_URL`, cookies, and typed response contracts.
- `data/` — the dedicated mock presentation layer. UI pages currently read from
  this directory because the general backend is unavailable. `data/README.md`
  records the boundary.
- `app/api/checkout_sessions/` — the server-only Stripe Checkout scaffold. It
  is intentionally separate from `data/` and is never called from the mock UI.
- `lib/stripe.ts` — server-only Stripe client. Secrets never enter client code.

The production API modules never import from `data/`, and the mock layer never
imports transport code.

## Transport

`lib/api/client.ts` exports one `apiRequest<T>()` entry point and one
`ApiError` type.

- All calls use `credentials: "include"`. Session authentication is therefore
  cookie-based; no token is written to local storage and no secret is exposed.
- Responses accept either raw JSON or the shared `{ success, data }` envelope.
- `success: false`, non-2xx statuses, malformed JSON, and network failures all
  become `ApiError`. The error carries HTTP status, optional API code, and
  field errors; `isUnauthorized`, `isForbidden`, `isNotFound`, and
  `isNetworkError` getters support UI branching.
- The request defaults to `cache: "no-store"` to avoid stale user data.
- If `NEXT_PUBLIC_API_URL` is missing, calls fail fast with a configuration
  error instead of silently using mock data.
- `toQueryString()` omits undefined and empty values.

## Domain functions

All functions are grouped and exported from `lib/api/index.ts` and
`lib/api.ts`.

### Authentication — `authApi`

- `getSession`
- `signIn`
- `signUp`
- `signOut`
- `syncSession` (refreshes session-backed profile data)

### Services — `servicesApi`

- `getFeatured`
- `list` with search, category, mode, sort, page, limit
- `getById`
- `create`
- `update`
- `delete`
- `setAvailability`

### Bookings — `bookingsApi`

- `create`
- `customer` with status/page filters
- `technician` with status/page filters
- `admin` with status/page filters
- `cancel`
- `updateStatus` with optional final amount

### Users — `usersApi`

- `list` with search, role, page, limit
- `updateRole`
- `updateProfile`

### Payments — `paymentsApi`

- `createCheckoutSession(bookingId)`
- `verify(sessionId)`
- `customerHistory`
- `adminTransactions`

All inputs and outputs reuse `types/index.ts` or module-local request types.
No amount is accepted by the checkout function; the server owns pricing.

## Assumed REST contract

| Method | Path | Purpose |
|---|---|---|
| GET | `/auth/session` | current session |
| POST | `/auth/sign-in` | sign in |
| POST | `/auth/sign-up` | register customer/technician |
| POST | `/auth/sign-out` | clear session |
| POST | `/auth/session/sync` | refresh session profile |
| GET | `/services/featured` | featured services |
| GET | `/services` | filtered, sorted, paginated listings |
| GET | `/services/:id` | service details |
| POST | `/services` | create service |
| PATCH | `/services/:id` | update service |
| DELETE | `/services/:id` | delete service |
| PATCH | `/services/:id/availability` | toggle availability |
| POST | `/bookings` | create booking |
| GET | `/bookings/customer` | customer bookings |
| GET | `/bookings/technician` | technician bookings |
| GET | `/bookings/admin` | all bookings |
| PATCH | `/bookings/:id/cancel` | cancel |
| PATCH | `/bookings/:id/status` | update status/final amount |
| GET | `/users` | filtered users |
| PATCH | `/users/:id/role` | update role |
| PATCH | `/users/me/profile` | update own profile |
| POST | `/payments/checkout` | create Stripe Checkout Session |
| GET | `/payments/verify` | verify session |
| GET | `/payments/customer` | customer payments |
| GET | `/payments/admin` | admin transactions |

## Current integration status

- The UI still renders from `data/` because the general backend is not
  available. It does not mix transport calls with mock records.
- The Stripe success route verifies a real Checkout Session server-side. The
  checkout scaffold redirects back to `/payment/success` and includes
  `/payment/cancel`, but Pay Now is not yet calling the checkout endpoint.
- The checkout scaffold uses a single demo price and does not validate the
  booking, customer, or amount; it must not be treated as production billing.
- Authentication/session persistence and role-based route protection are not
  wired into the UI. The API functions and cookie transport are ready, but
  there is no BetterAuth/server session implementation in this repository.
- The mock layer is intentionally isolated; replace page data imports with
  `lib/api` functions when the backend ships.
