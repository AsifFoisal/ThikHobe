# ThikHobe

ThikHobe is a full-stack smart device and home appliance repair platform. Customers request repairs, technicians manage services and jobs, admins moderate the marketplace, and customers pay with Stripe only after a job is completed.

## Stack

**Client**

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4, Base UI, Lucide, Sonner, Recharts
- React Hook Form + Zod
- Better Auth client with the JWT plugin
- Stripe for payment gateway

**Server**

- Node.js and Express 5
- MongoDB Node.js driver
- Better Auth JWT verification through JWKS using `jose`
- Stripe Checkout, verification, and signed webhooks
- ImgBB server-side uploads

**Key npm packages**

- Client: `next`, `react`, `react-dom`, `better-auth`, `@better-auth/mongo-adapter`, `mongodb`, `stripe`, `@stripe/stripe-js`, `react-hook-form`, `zod`, `@hookform/resolvers`, `recharts`, `sonner`, `lucide-react`, `@base-ui/react`, `tailwindcss`, `typescript`
- Server: `express`, `cors`, `dotenv`, `mongodb`, `jose`, `stripe`

## Project structure

```text
thikhobe/                  Next.js app and Better Auth server
server/                    Express API
  index.js                 Routes, Stripe, error handling
  db.js                    MongoDB connection and indexes
  middleware/auth.js       verifyToken / role middleware
  seed.js                  Idempotent demo data
  README.md                Backend setup and API reference
```

All dashboard and public service data is read from the Express API and MongoDB. There is no frontend mock-data layer.

## Setup

### 1. Frontend environment

Create `thikhobe/.env.local` from `.env.example` and set:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=<MongoDB connection string>
DB_NAME=<database name>
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<long random secret>
JWT_ISSUER=<issuer>
JWT_AUDIENCE=<audience>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<Stripe test publishable key>
```

### 2. Server environment

Create `server/.env` from `server/.env.example` and set the same MongoDB database plus:

```text
BETTER_AUTH_URL=http://localhost:3000
JWT_ISSUER=<same issuer as the frontend>
JWT_AUDIENCE=<same audience as the frontend>
STRIPE_SECRET_KEY=<Stripe test secret key>
STRIPE_WEBHOOK_SECRET=<Stripe webhook signing secret>
IMGBB_API_KEY=<ImgBB API key>
```

The Express server verifies Better Auth JWTs through JWKS. `BETTER_AUTH_SECRET` stays in the Next.js environment; it is not used by Express.

### 3. Install and run

```bash
# terminal 1
cd thikhobe
npm install
npm run dev

# terminal 2
cd server
npm install
npm run seed     # optional: create accounts and reset demo marketplace data
npm run dev
```

The seed requires the Next.js app to be running because accounts are created through Better Auth. It clears services, bookings, and payments, then seeds approved/pending/rejected services and paid/in-progress customer bookings. Service images are hosted on ImgBB.

## Deployment and test accounts

- Live site: https://thikhobe.vercel.app
- Live API: https://thikhobe-server.vercel.app
- Client repository: https://github.com/AsifFoisal/ThikHobe
- Server repository: https://github.com/AsifFoisal/ThikHobe-Server

Seed demo accounts (`npm run seed`):

| Role       | Email                     | Password        |
| ---------- | ------------------------- | --------------- |
| Admin      | `admin@thikhobe.com`      | `admin123`      |
| Technician | `technician@thikhobe.com` | `technician123` |
| Technician | `technician2@thikhobe.com` | `technician456` |
| Customer   | `customer@thikhobe.com`   | `customer123`   |

The seed resets services, bookings, and payments. It creates 19 services across two technicians (13 approved, 4 pending, 2 rejected) and 5 bookings for the customer (2 paid/completed, 2 in progress, 1 accepted). Service images are hosted on ImgBB, not in the repository. The two paid bookings create real Stripe test PaymentIntents; a valid test `STRIPE_SECRET_KEY` is required.

Change these passwords before any non-local deployment. Before deploying, set the production frontend origin in `CLIENT_URL`, `CORS_ORIGINS`, and Better Auth trusted origins, and register the deployed Stripe webhook endpoint.

## Authentication

Better Auth lives in the Next.js app at `/api/auth/*`. The client obtains a JWT from `/api/auth/token` and sends it to Express as a Bearer token. Express verifies the signature, issuer, and audience against the Better Auth JWKS endpoint, then loads the current user and role from MongoDB.

Private routes use `verifyToken`, `verifyCustomer`, `verifyTechnician`, and `verifyAdmin`. Dashboard route groups enforce the same roles server-side.

## Main features

- Customer/technician registration and sign-in, with admin self-registration blocked
- Public service browsing with server-side search, filters, sorting, and pagination
- Technician service CRUD, image upload, availability, and approval workflow
- Customer repair requests with duplicate-active protection
- Server-enforced job status pipeline and final amount
- Customer payment history and Stripe pay-after-completion
- Admin user role management, service approvals, bookings, and transactions
- Shared profile editing with Better Auth session refresh
- Role-aware dashboard navigation and route guards
- Branded film intro on every full homepage load/reload, never on other pages or client route changes

## Stripe test mode

```text
Test card: 4242 4242 4242 4242
Any future expiry date and any CVC
```

Webhook endpoint:

```text
POST /api/payments/webhook
```

Configure the `checkout.session.completed` event. For local development:

```bash
stripe listen --forward-to localhost:5000/api/payments/webhook
```

Set the printed `whsec_...` value as `STRIPE_WEBHOOK_SECRET` in `server/.env`.

## Image uploads

Service and profile images upload through the Express server to ImgBB. Set `IMGBB_API_KEY` in `server/.env`; the key is never exposed to the browser. Without the key, upload endpoints return 503.

## Scripts

Frontend:

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run lint
npm run format
```

Server:

```bash
npm run dev
npm run start
npm run seed
```

## Documentation

- `server/README.md` — backend setup, environment variables, API routes, database, and Stripe details
- `DESIGN.md` — visual system
- `PRODUCT.md` — product brief
- `public/images/CREDITS.md` — photography credits
