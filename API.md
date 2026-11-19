# ThikHobe API architecture

## Layers

- `lib/auth-client.ts` — Better Auth browser client with the JWT plugin.
- `lib/api/` — client-side transport and domain functions for the Express API.
- `lib/api/mappers.ts` — maps backend documents to frontend UI types and booking status values.
- `lib/server-api.ts` — server-component transport. Reads the Better Auth session, obtains a JWT, and calls Express.
- `lib/server-data.ts` — server-side data functions used by pages.
- `server/` — Express API, MongoDB access, JWT middleware, Stripe, and ImgBB.

There is no mock-data layer. Pages read from the Express API, which reads from MongoDB.

## Transport

`apiRequest<T>()` in `lib/api/client.ts`:

- Uses `NEXT_PUBLIC_API_URL`.
- Sends the Better Auth JWT as `Authorization: Bearer <token>`.
- Accepts raw JSON or `{ success, data }` responses.
- Converts non-2xx responses, malformed JSON, and network failures into `ApiError`.

`serverApi<T>()` in `lib/server-api.ts`:

- Reads the Better Auth session from request headers.
- Obtains a short-lived JWT through the JWT plugin.
- Calls the Express API with `cache: "no-store"`.
- Throws `ServerApiError` with the HTTP status and API message.

`requireSessionUser()` and `requireRole()` redirect unauthenticated or wrong-role dashboard access.

## Domain functions

### Authentication

The auth forms use `authClient` directly:

- `signUp.email`
- `signIn.email`
- `signOut`
- `getSession`
- `token`

### Services

- `servicesApi.getFeatured`
- `servicesApi.list`
- `servicesApi.getById`
- `servicesApi.mine`
- `servicesApi.create`
- `servicesApi.update`
- `servicesApi.approve`
- `servicesApi.adminList`
- `servicesApi.setAvailability`
- `servicesApi.delete`

### Bookings

- `bookingsApi.create`
- `bookingsApi.customer`
- `bookingsApi.technician`
- `bookingsApi.admin`
- `bookingsApi.getById`
- `bookingsApi.cancel`
- `bookingsApi.updateStatus`

### Users and payments

- `usersApi.list`
- `usersApi.updateRole`
- `usersApi.updateProfile`
- `paymentsApi.createCheckoutSession`
- `paymentsApi.verify`
- `paymentsApi.customerHistory`
- `paymentsApi.adminTransactions`

## Express contract

| Method | Path | Access |
| --- | --- | --- |
| GET | `/api/health` | Public |
| GET | `/api/services` | Public |
| GET | `/api/services/:id` | Public |
| GET | `/api/services/mine` | Technician |
| POST | `/api/services` | Technician |
| PATCH | `/api/services/:id` | Technician owner |
| PATCH | `/api/services/:id/availability` | Technician owner |
| DELETE | `/api/services/:id` | Technician owner |
| POST | `/api/bookings` | Customer |
| GET | `/api/bookings/my` | Customer |
| GET | `/api/bookings/:id` | Involved customer, technician, or admin |
| PATCH | `/api/bookings/:id/cancel` | Customer owner |
| GET | `/api/bookings/technician` | Technician |
| PATCH | `/api/bookings/:id/status` | Technician owner |
| GET | `/api/admin/users` | Admin |
| PATCH | `/api/admin/users/:id/role` | Admin |
| GET | `/api/admin/services` | Admin |
| PATCH | `/api/admin/services/:id/approval` | Admin |
| GET | `/api/admin/bookings` | Admin |
| GET | `/api/admin/payments` | Admin |
| PATCH | `/api/users/profile` | Authenticated |
| POST | `/api/uploads` | Authenticated |
| POST | `/api/payments/create-checkout-session` | Customer |
| GET | `/api/payments/verify` | Customer |
| GET | `/api/payments/my` | Customer |
| POST | `/api/payments/webhook` | Stripe signature |

## Integration status

- Authentication, sessions, and JWT transport are connected.
- Dashboard and public service data are fetched from MongoDB through Express.
- Service, booking, profile, role, approval, availability, and payment actions persist.
- Stripe runs in test mode with an idempotent verify/webhook payment writer.
- ImgBB uploads require `IMGBB_API_KEY` in `server/.env`.
- The backend must be running on the URL in `NEXT_PUBLIC_API_URL`.
