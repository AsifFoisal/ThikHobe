import { DEMO_USER } from "@/constants/demo"
import { SAMPLE_SERVICES } from "@/data/sample-services"
import type {
  Booking,
  BookingParty,
  BookingStatus,
  Payment,
  PaymentStatus,
} from "@/types"

/**
 * Presentation-only booking records for the demo customer.
 * No API, database, or payment provider is involved.
 */
const CUSTOMER: BookingParty = {
  id: DEMO_USER.id,
  name: DEMO_USER.name,
  email: DEMO_USER.email,
  phone: "+880 1711 000 000",
}

const CUSTOMER_ADDRESS = "House 12, Road 8, Dhanmondi, Dhaka 1209"

const servicesById = new Map(
  SAMPLE_SERVICES.map((service) => [service.id, service])
)

interface BookingSeed {
  id: string
  serviceId: string
  preferredDate: string
  createdAt: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  finalAmount?: number
  problemDescription: string
}

function makeBooking(seed: BookingSeed): Booking {
  const service = servicesById.get(seed.serviceId)

  if (!service) {
    throw new Error(`Unknown sample service: ${seed.serviceId}`)
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
    customer: CUSTOMER,
    technician: {
      id: service.technician.id,
      name: service.technician.name,
    },
    preferredDate: seed.preferredDate,
    address: CUSTOMER_ADDRESS,
    problemDescription: seed.problemDescription,
    status: seed.status,
    paymentStatus: seed.paymentStatus,
    basePrice: service.basePrice,
    finalAmount: seed.finalAmount,
    createdAt: seed.createdAt,
  }
}

export const SAMPLE_CUSTOMER_BOOKINGS: Booking[] = [
  makeBooking({
    id: "FM-1052",
    serviceId: "fm-washer-drum",
    preferredDate: "2026-11-24",
    createdAt: "2026-11-18",
    status: "requested",
    paymentStatus: "unpaid",
    problemDescription:
      "The drum has started knocking loudly during the spin cycle and the machine sometimes stops mid-cycle.",
  }),
  makeBooking({
    id: "FM-1051",
    serviceId: "fm-fridge-cooling",
    preferredDate: "2026-11-23",
    createdAt: "2026-11-17",
    status: "requested",
    paymentStatus: "unpaid",
    problemDescription:
      "The refrigerator is cooling unevenly, and the lower compartment stays warmer than the top shelf.",
  }),
  makeBooking({
    id: "FM-1050",
    serviceId: "fm-ac-service",
    preferredDate: "2026-11-21",
    createdAt: "2026-11-16",
    status: "accepted",
    paymentStatus: "unpaid",
    problemDescription:
      "The AC is running but not cooling the room properly; it may need a gas refill and coil clean.",
  }),
  makeBooking({
    id: "FM-1049",
    serviceId: "fm-iphone-screen-battery",
    preferredDate: "2026-11-20",
    createdAt: "2026-11-15",
    status: "in_progress",
    paymentStatus: "unpaid",
    problemDescription:
      "The screen has a cracked corner and the battery drains quickly, even with light use.",
  }),
  makeBooking({
    id: "FM-1048",
    serviceId: "fm-laptop-diagnostics",
    preferredDate: "2026-11-18",
    createdAt: "2026-11-12",
    status: "completed",
    paymentStatus: "paid",
    finalAmount: 2100,
    problemDescription:
      "The laptop shuts down under load and the charging port feels loose.",
  }),
  makeBooking({
    id: "FM-1047",
    serviceId: "fm-freezer-thermostat",
    preferredDate: "2026-11-16",
    createdAt: "2026-11-10",
    status: "completed",
    paymentStatus: "unpaid",
    finalAmount: 2650,
    problemDescription:
      "The freezer thermostat is not holding temperature, causing frost buildup.",
  }),
  makeBooking({
    id: "FM-1046",
    serviceId: "fm-tv-panel",
    preferredDate: "2026-11-12",
    createdAt: "2026-11-06",
    status: "completed",
    paymentStatus: "paid",
    finalAmount: 2200,
    problemDescription:
      "The TV panel flickers on the left side and sometimes loses the picture entirely.",
  }),
  makeBooking({
    id: "FM-1045",
    serviceId: "fm-washer-door-seal",
    preferredDate: "2026-11-08",
    createdAt: "2026-11-02",
    status: "completed",
    paymentStatus: "paid",
    finalAmount: 2100,
    problemDescription:
      "The front-load washer is leaking from the door during the wash cycle.",
  }),
  makeBooking({
    id: "FM-1044",
    serviceId: "fm-smart-tv-board",
    preferredDate: "2026-11-02",
    createdAt: "2026-10-27",
    status: "completed",
    paymentStatus: "paid",
    finalAmount: 2750,
    problemDescription:
      "The smart TV restarts randomly and the home screen freezes after a few minutes.",
  }),
  makeBooking({
    id: "FM-1043",
    serviceId: "fm-ac-installation",
    preferredDate: "2026-10-30",
    createdAt: "2026-10-23",
    status: "rejected",
    paymentStatus: "unpaid",
    problemDescription:
      "Installation of a new split AC in the living room, including the outdoor bracket.",
  }),
  makeBooking({
    id: "FM-1042",
    serviceId: "fm-ceiling-fan-light",
    preferredDate: "2026-10-27",
    createdAt: "2026-10-20",
    status: "cancelled",
    paymentStatus: "unpaid",
    problemDescription:
      "Replace an old ceiling fan and install a new light fixture in the dining room.",
  }),
]

export function getCustomerBookingById(id: string) {
  return SAMPLE_CUSTOMER_BOOKINGS.find(
    (booking) => booking.id.toLowerCase() === id.toLowerCase()
  )
}

const paymentSeeds = [
  {
    bookingId: "FM-1048",
    transactionId: "TXN-8F2K7Q",
    paidAt: "2026-11-18T16:40:00+06:00",
  },
  {
    bookingId: "FM-1046",
    transactionId: "TXN-4M9P1D",
    paidAt: "2026-11-13T12:15:00+06:00",
  },
  {
    bookingId: "FM-1045",
    transactionId: "TXN-6H3R8C",
    paidAt: "2026-11-09T18:05:00+06:00",
  },
  {
    bookingId: "FM-1044",
    transactionId: "TXN-2L5N4B",
    paidAt: "2026-11-03T11:30:00+06:00",
  },
]

export const SAMPLE_CUSTOMER_PAYMENTS: Payment[] = paymentSeeds.map((seed) => {
  const booking = getCustomerBookingById(seed.bookingId)

  if (!booking) {
    throw new Error(`Payment references an unknown booking: ${seed.bookingId}`)
  }

  return {
    id: `payment-${booking.id}`,
    bookingId: booking.id,
    serviceTitle: booking.service.title,
    customerName: CUSTOMER.name,
    technicianName: booking.technician.name,
    amount: booking.finalAmount ?? booking.basePrice,
    currency: "BDT",
    transactionId: seed.transactionId,
    paidAt: seed.paidAt,
    status: "paid",
  }
})

export type CustomerActivityStatus = BookingStatus | "paid"

export interface CustomerActivity {
  id: string
  bookingId: string
  title: string
  detail: string
  status: CustomerActivityStatus
}

/**
 * Status-only sample milestones. Live event timestamps are intentionally
 * absent until the backend supplies a real history.
 */
export const SAMPLE_CUSTOMER_ACTIVITY: CustomerActivity[] = [
  {
    id: "activity-payment",
    bookingId: "FM-1048",
    title: "Payment received",
    detail: "Laptop Diagnostics & Board Repair",
    status: "paid",
  },
  {
    id: "activity-repair-started",
    bookingId: "FM-1049",
    title: "Repair started",
    detail: "iPhone Screen & Battery Replacement",
    status: "in_progress",
  },
  {
    id: "activity-accepted",
    bookingId: "FM-1050",
    title: "Booking accepted",
    detail: "AC Service & Gas Refill",
    status: "accepted",
  },
  {
    id: "activity-requested",
    bookingId: "FM-1052",
    title: "Request submitted",
    detail: "Washing Machine Drum & Motor Repair",
    status: "requested",
  },
]
