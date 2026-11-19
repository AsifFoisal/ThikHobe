import { DEMO_ADMIN, DEMO_TECHNICIAN, DEMO_USER } from "@/constants/demo"
import {
  SAMPLE_CUSTOMER_BOOKINGS,
  SAMPLE_CUSTOMER_PAYMENTS,
} from "@/data/sample-customer-bookings"
import { SAMPLE_SERVICES } from "@/data/sample-services"
import {
  SAMPLE_PLATFORM_EXTRA_SERVICES,
  SAMPLE_TECHNICIAN_SERVICES,
} from "@/data/sample-technician"
import type {
  Booking,
  BookingParty,
  BookingStatus,
  Payment,
  PaymentStatus,
  User,
} from "@/types"

/**
 * Presentation-only platform records shared by the technician and admin
 * workspaces. No API, database, or payment provider is involved.
 */
const CUSTOMERS: User[] = [
  {
    id: DEMO_USER.id,
    name: DEMO_USER.name,
    email: DEMO_USER.email,
    role: "customer",
    createdAt: "2026-03-08T09:00:00.000Z",
  },
  {
    id: "cust-shamim",
    name: "Shamim Reza",
    email: "shamim.reza@example.com",
    role: "customer",
    createdAt: "2026-09-03T09:00:00.000Z",
  },
  {
    id: "cust-nadia",
    name: "Nadia Islam",
    email: "nadia.islam@example.com",
    role: "customer",
    createdAt: "2026-11-17T09:00:00.000Z",
  },
  {
    id: "cust-mim",
    name: "Mim Akter",
    email: "mim.akter@example.com",
    role: "customer",
    createdAt: "2026-08-21T09:00:00.000Z",
  },
  {
    id: "cust-sabbir",
    name: "Sabbir Khan",
    email: "sabbir.khan@example.com",
    role: "customer",
    createdAt: "2026-07-14T09:00:00.000Z",
  },
  {
    id: "cust-rumana",
    name: "Rumana Haque",
    email: "rumana.haque@example.com",
    role: "customer",
    createdAt: "2026-06-30T09:00:00.000Z",
  },
  {
    id: "cust-tanvir",
    name: "Tanvir Hossain",
    email: "tanvir.hossain@example.com",
    role: "customer",
    createdAt: "2026-05-20T09:00:00.000Z",
  },
  {
    id: "cust-jahid",
    name: "Jahid Karim",
    email: "jahid.karim@example.com",
    role: "customer",
    createdAt: "2026-04-11T09:00:00.000Z",
  },
  {
    id: "cust-farzana",
    name: "Farzana Akter",
    email: "farzana.akter@example.com",
    role: "customer",
    createdAt: "2026-02-20T09:00:00.000Z",
  },
  {
    id: "cust-rezaul",
    name: "Rezaul Karim",
    email: "rezaul.karim@example.com",
    role: "customer",
    createdAt: "2026-01-30T09:00:00.000Z",
  },
  {
    id: "cust-sadia-noor",
    name: "Sadia Noor",
    email: "sadia.noor@example.com",
    role: "customer",
    createdAt: "2026-03-15T09:00:00.000Z",
  },
  {
    id: "cust-mehedi",
    name: "Mehedi Hasan",
    email: "mehedi.hasan@example.com",
    role: "customer",
    createdAt: "2026-04-02T09:00:00.000Z",
  },
]

const TECHNICIANS: User[] = [
  {
    id: DEMO_TECHNICIAN.id,
    name: DEMO_TECHNICIAN.name,
    email: DEMO_TECHNICIAN.email,
    role: "technician",
    createdAt: "2026-02-14T09:00:00.000Z",
  },
  {
    id: "tech-nusrat",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    role: "technician",
    createdAt: "2026-03-02T09:00:00.000Z",
  },
  {
    id: "tech-tanvir",
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@example.com",
    role: "technician",
    createdAt: "2026-03-18T09:00:00.000Z",
  },
  {
    id: "tech-farhana",
    name: "Farhana Akter",
    email: "farhana.akter@example.com",
    role: "technician",
    createdAt: "2026-04-05T09:00:00.000Z",
  },
  {
    id: "tech-mahmud",
    name: "Mahmud Hasan",
    email: "mahmud.hasan@example.com",
    role: "technician",
    createdAt: "2026-04-22T09:00:00.000Z",
  },
  {
    id: "tech-sadia",
    name: "Sadia Islam",
    email: "sadia.islam@example.com",
    role: "technician",
    createdAt: "2026-05-10T09:00:00.000Z",
  },
  {
    id: "tech-imran",
    name: "Imran Hossain",
    email: "imran.hossain@example.com",
    role: "technician",
    createdAt: "2026-05-28T09:00:00.000Z",
  },
  {
    id: "tech-sabbir",
    name: "Sabbir Ahmed",
    email: "sabbir.ahmed@example.com",
    role: "technician",
    createdAt: "2026-06-11T09:00:00.000Z",
  },
  {
    id: "tech-jahid",
    name: "Jahid Hasan",
    email: "jahid.hasan@example.com",
    role: "technician",
    createdAt: "2026-07-01T09:00:00.000Z",
  },
  {
    id: "tech-rasel",
    name: "Rasel Mahmud",
    email: "rasel.mahmud@example.com",
    role: "technician",
    createdAt: "2026-07-19T09:00:00.000Z",
  },
  {
    id: "tech-tariqul",
    name: "Tariqul Islam",
    email: "tariqul.islam@example.com",
    role: "technician",
    createdAt: "2026-08-08T09:00:00.000Z",
  },
  {
    id: "tech-momena",
    name: "Momena Begum",
    email: "momena.begum@example.com",
    role: "technician",
    createdAt: "2026-11-12T09:00:00.000Z",
  },
]

export const SAMPLE_PLATFORM_USERS: User[] = [
  ...CUSTOMERS,
  ...TECHNICIANS,
  {
    id: DEMO_ADMIN.id,
    name: DEMO_ADMIN.name,
    email: DEMO_ADMIN.email,
    role: "admin",
    createdAt: "2026-01-12T09:00:00.000Z",
  },
]

export const SAMPLE_PLATFORM_SERVICES = [
  ...SAMPLE_SERVICES,
  ...SAMPLE_PLATFORM_EXTRA_SERVICES,
].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

const technicianParty: BookingParty = {
  id: DEMO_TECHNICIAN.id,
  name: DEMO_TECHNICIAN.name,
  email: DEMO_TECHNICIAN.email,
}

interface ExtraBookingSeed {
  id: string
  serviceId: string
  customer: BookingParty
  preferredDate: string
  createdAt: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  finalAmount?: number
  address: string
  problemDescription: string
}

function makeExtraBooking(seed: ExtraBookingSeed): Booking {
  const service = SAMPLE_TECHNICIAN_SERVICES.find(
    (item) => item.id === seed.serviceId
  )

  if (!service) {
    throw new Error(`Unknown technician service: ${seed.serviceId}`)
  }

  return {
    id: seed.id,
    service: {
      id: service.id,
      title: service.title,
      image: service.image,
      category: service.category,
      mode: service.mode,
      basePrice: service.basePrice,
    },
    customer: seed.customer,
    technician: technicianParty,
    preferredDate: seed.preferredDate,
    address: seed.address,
    problemDescription: seed.problemDescription,
    status: seed.status,
    paymentStatus: seed.paymentStatus,
    basePrice: service.basePrice,
    finalAmount: seed.finalAmount,
    createdAt: seed.createdAt,
  }
}

const extraTechnicianBookings: Booking[] = [
  makeExtraBooking({
    id: "FM-3001",
    serviceId: "fm-iphone-screen-battery",
    customer: {
      id: "cust-shamim",
      name: "Shamim Reza",
      email: "shamim.reza@example.com",
      phone: "+880 1712 440 921",
    },
    preferredDate: "2026-11-22",
    createdAt: "2026-11-19",
    status: "requested",
    paymentStatus: "unpaid",
    address: "House 24, Road 5, Dhanmondi, Dhaka",
    problemDescription:
      "The phone screen is cracked along the top edge and the touch sometimes stops responding.",
  }),
  makeExtraBooking({
    id: "FM-3002",
    serviceId: "fm-phone-charging-port",
    customer: {
      id: "cust-nadia",
      name: "Nadia Islam",
      email: "nadia.islam@example.com",
      phone: "+880 1813 772 014",
    },
    preferredDate: "2026-11-23",
    createdAt: "2026-11-18",
    status: "requested",
    paymentStatus: "unpaid",
    address: "Flat 6B, House 9, Road 12, Dhanmondi, Dhaka",
    problemDescription:
      "The charging cable only works at an angle, and the phone stops charging when moved.",
  }),
  makeExtraBooking({
    id: "FM-3003",
    serviceId: "fm-desktop-psu",
    customer: {
      id: "cust-tanvir",
      name: "Tanvir Hossain",
      email: "tanvir.hossain@example.com",
      phone: "+880 1914 305 886",
    },
    preferredDate: "2026-11-21",
    createdAt: "2026-11-17",
    status: "accepted",
    paymentStatus: "unpaid",
    address: "House 41, Road 8, Dhanmondi, Dhaka",
    problemDescription:
      "The desktop powers off after a few minutes and sometimes does not turn on at all.",
  }),
  makeExtraBooking({
    id: "FM-3005",
    serviceId: "fm-iphone-screen-battery",
    customer: {
      id: "cust-mim",
      name: "Mim Akter",
      email: "mim.akter@example.com",
      phone: "+880 1613 558 240",
    },
    preferredDate: "2026-11-15",
    createdAt: "2026-11-10",
    status: "completed",
    paymentStatus: "paid",
    finalAmount: 2900,
    address: "House 17, Road 3, Dhanmondi, Dhaka",
    problemDescription:
      "The battery drains within a few hours and the screen has a hairline crack near the notch.",
  }),
  makeExtraBooking({
    id: "FM-3006",
    serviceId: "fm-phone-charging-port",
    customer: {
      id: "cust-sabbir",
      name: "Sabbir Khan",
      email: "sabbir.khan@example.com",
      phone: "+880 1515 808 133",
    },
    preferredDate: "2026-11-11",
    createdAt: "2026-11-06",
    status: "completed",
    paymentStatus: "unpaid",
    finalAmount: 1500,
    address: "Flat 3A, House 22, Road 9, Dhanmondi, Dhaka",
    problemDescription:
      "The charging port is loose and only charges when the cable is held in place.",
  }),
  makeExtraBooking({
    id: "FM-3007",
    serviceId: "fm-iphone-screen-battery",
    customer: {
      id: "cust-rumana",
      name: "Rumana Haque",
      email: "rumana.haque@example.com",
      phone: "+880 1811 913 677",
    },
    preferredDate: "2026-11-09",
    createdAt: "2026-11-03",
    status: "rejected",
    paymentStatus: "unpaid",
    address: "House 5, Road 14, Dhanmondi, Dhaka",
    problemDescription:
      "The phone was dropped and the display no longer turns on. Requested a same-day repair.",
  }),
  makeExtraBooking({
    id: "FM-3008",
    serviceId: "fm-desktop-psu",
    customer: {
      id: "cust-jahid",
      name: "Jahid Karim",
      email: "jahid.karim@example.com",
      phone: "+880 1716 204 425",
    },
    preferredDate: "2026-11-07",
    createdAt: "2026-11-01",
    status: "cancelled",
    paymentStatus: "unpaid",
    address: "House 30, Road 4, Dhanmondi, Dhaka",
    problemDescription:
      "The desktop needs a new power supply and a full dust clean before handover.",
  }),
]

const rafiulCustomerBookings = SAMPLE_CUSTOMER_BOOKINGS.filter(
  (booking) => booking.technician.id === DEMO_TECHNICIAN.id
)

export const SAMPLE_TECHNICIAN_BOOKINGS: Booking[] = [
  ...rafiulCustomerBookings,
  ...extraTechnicianBookings,
].sort((a, b) => Date.parse(b.preferredDate) - Date.parse(a.preferredDate))

export const SAMPLE_PLATFORM_BOOKINGS: Booking[] = [
  ...SAMPLE_CUSTOMER_BOOKINGS,
  ...extraTechnicianBookings,
].sort((a, b) => Date.parse(b.preferredDate) - Date.parse(a.preferredDate))

const paymentForMim: Payment = {
  id: "payment-fm-3005",
  bookingId: "FM-3005",
  serviceTitle: "iPhone Screen & Battery Replacement",
  customerName: "Mim Akter",
  technicianName: DEMO_TECHNICIAN.name,
  amount: 2900,
  currency: "BDT",
  transactionId: "TXN-7Q2M9K",
  paidAt: "2026-11-16T14:20:00+06:00",
  status: "paid",
}

const historicalPayments: Payment[] = [
  {
    id: "payment-hist-oct",
    bookingId: "FM-2987",
    serviceTitle: "Laptop Diagnostics & Board Repair",
    customerName: "Farzana Akter",
    technicianName: "Nusrat Jahan",
    amount: 3200,
    currency: "BDT",
    transactionId: "TXN-3D8V1P",
    paidAt: "2026-10-22T11:45:00+06:00",
    status: "paid",
  },
  {
    id: "payment-hist-sep",
    bookingId: "FM-2891",
    serviceTitle: "AC Service & Gas Refill",
    customerName: "Rezaul Karim",
    technicianName: "Tanvir Ahmed",
    amount: 2600,
    currency: "BDT",
    transactionId: "TXN-9K4T2R",
    paidAt: "2026-09-18T16:10:00+06:00",
    status: "paid",
  },
  {
    id: "payment-hist-aug",
    bookingId: "FM-2762",
    serviceTitle: "TV Panel & Circuit Board Repair",
    customerName: "Sadia Noor",
    technicianName: "Mahmud Hasan",
    amount: 2400,
    currency: "BDT",
    transactionId: "TXN-5C7B6M",
    paidAt: "2026-08-24T13:05:00+06:00",
    status: "paid",
  },
  {
    id: "payment-hist-jul",
    bookingId: "FM-2644",
    serviceTitle: "Refrigerator Cooling Repair",
    customerName: "Mehedi Hasan",
    technicianName: "Farhana Akter",
    amount: 3100,
    currency: "BDT",
    transactionId: "TXN-1P9L3F",
    paidAt: "2026-07-29T10:30:00+06:00",
    status: "paid",
  },
]

export const SAMPLE_PLATFORM_PAYMENTS: Payment[] = [
  ...SAMPLE_CUSTOMER_PAYMENTS,
  paymentForMim,
  ...historicalPayments,
].sort((a, b) => Date.parse(b.paidAt) - Date.parse(a.paidAt))

const revenueMonths = [
  { key: "2026-07", label: "Jul" },
  { key: "2026-08", label: "Aug" },
  { key: "2026-09", label: "Sep" },
  { key: "2026-10", label: "Oct" },
  { key: "2026-11", label: "Nov" },
]

export const SAMPLE_MONTHLY_REVENUE = revenueMonths.map(({ key, label }) => ({
  label,
  value: SAMPLE_PLATFORM_PAYMENTS.filter((payment) =>
    payment.paidAt.startsWith(key)
  ).reduce((total, payment) => total + payment.amount, 0),
}))

export const SAMPLE_TECHNICIAN_WEEKLY_ACTIVITY = [
  { label: "Mon", value: 2 },
  { label: "Tue", value: 4 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 5 },
  { label: "Fri", value: 4 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 3 },
]

export interface PlatformActivity {
  id: string
  kind: "user" | "service" | "booking" | "payment"
  title: string
  detail: string
  date: string
  href: string
}

export const SAMPLE_PLATFORM_ACTIVITY: PlatformActivity[] = [
  {
    id: "activity-booking-request",
    kind: "booking",
    title: "New repair request",
    detail: "iPhone Screen & Battery Replacement for Shamim Reza",
    date: "2026-11-19",
    href: "/dashboard/admin/bookings?status=requested",
  },
  {
    id: "activity-service-review",
    kind: "service",
    title: "Service submitted for approval",
    detail: "Smartwatch Screen Replacement by Rafiul Islam",
    date: "2026-11-18",
    href: "/dashboard/admin/services?status=pending",
  },
  {
    id: "activity-payment",
    kind: "payment",
    title: "Payment received",
    detail: "৳2,100 for Laptop Diagnostics & Board Repair",
    date: "2026-11-18",
    href: "/dashboard/admin/transactions",
  },
  {
    id: "activity-customer",
    kind: "user",
    title: "New customer registered",
    detail: "Nadia Islam joined the platform",
    date: "2026-11-17",
    href: "/dashboard/admin/users?role=customer",
  },
  {
    id: "activity-technician",
    kind: "user",
    title: "New technician joined",
    detail: "Momena Begum completed onboarding",
    date: "2026-11-12",
    href: "/dashboard/admin/users?role=technician",
  },
]
