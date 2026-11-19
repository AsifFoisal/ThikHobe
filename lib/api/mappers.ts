import type {
  Booking,
  BookingStatus,
  Payment,
  PaymentStatus,
  Service,
  ServiceApprovalStatus,
  ServiceCategory,
  ServiceMode,
  User,
  UserRole,
} from "@/types"

export interface BackendUser {
  _id: string
  id?: string
  name: string
  email: string
  image?: string | null
  role?: string
  phone?: string
  area?: string
  bio?: string
  createdAt?: string
}

export interface BackendService {
  _id: string
  title: string
  category: string
  description: string
  image: string
  basePrice: number
  estimatedDuration: string
  serviceMode: string
  serviceArea: string
  technicianName: string
  technicianEmail: string
  technician?: {
    name?: string
    image?: string | null
    area?: string
    bio?: string
  }
  approvalStatus: string
  isAvailable: boolean
  createdAt: string
}

export interface BackendBooking {
  _id: string
  serviceId: string
  serviceTitle: string
  serviceImage: string
  category: string
  serviceMode?: string
  serviceArea?: string
  basePrice: number
  technicianName: string
  technicianEmail: string
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  preferredDate: string
  problemDescription: string
  status: string
  finalAmount?: number
  paymentStatus: string
  statusHistory?: { status: string; at: string }[]
  createdAt: string
}

export interface BackendPayment {
  _id: string
  bookingId: string
  serviceTitle: string
  customerName: string
  customerEmail: string
  technicianName: string
  technicianEmail: string
  amount: number
  currency: string
  transactionId: string
  stripeSessionId: string
  paymentStatus?: string
  status?: string
  paidAt: string
}

export interface BackendList<T> {
  items: T[]
  totalRevenue?: number
}

export const toClientBookingStatus = (status: string): BookingStatus =>
  status === "in-progress" ? "in_progress" : (status as BookingStatus)

export const toBackendBookingStatus = (status: BookingStatus): string =>
  status === "in_progress" ? "in-progress" : status

export function mapUser(user: BackendUser): User {
  return {
    id: user.id ?? user._id,
    name: user.name,
    email: user.email,
    role: (user.role ?? "customer") as UserRole,
    image: user.image ?? undefined,
    phone: user.phone ?? "",
    area: user.area ?? "",
    bio: user.bio ?? "",
    createdAt: user.createdAt ?? new Date().toISOString(),
  }
}

export function mapService(service: BackendService): Service {
  return {
    id: service._id,
    title: service.title,
    category: service.category as ServiceCategory,
    description: service.description,
    basePrice: service.basePrice,
    estimatedDuration: service.estimatedDuration,
    mode: service.serviceMode as ServiceMode,
    area: service.serviceArea,
    image: service.image,
    approvalStatus: service.approvalStatus as ServiceApprovalStatus,
    available: service.isAvailable,
    technician: {
      id: service.technicianEmail,
      name: service.technician?.name ?? service.technicianName,
      image: service.technician?.image ?? undefined,
      area: service.technician?.area ?? service.serviceArea,
      bio: service.technician?.bio ?? "",
    },
    createdAt: service.createdAt,
  }
}

export function mapBooking(booking: BackendBooking): Booking {
  const status = toClientBookingStatus(booking.status)
  const timeline = (booking.statusHistory ?? []).map((entry) => ({
    status:
      entry.status === "paid"
        ? ("paid" as const)
        : toClientBookingStatus(entry.status),
    at: entry.at,
  }))

  return {
    id: booking._id,
    service: {
      id: booking.serviceId,
      title: booking.serviceTitle,
      image: booking.serviceImage,
      category: booking.category as ServiceCategory,
      mode: (booking.serviceMode ?? "Home Visit") as ServiceMode,
      basePrice: booking.basePrice,
    },
    customer: {
      id: booking.customerEmail,
      name: booking.customerName,
      email: booking.customerEmail,
      phone: booking.customerPhone,
    },
    technician: {
      id: booking.technicianEmail,
      name: booking.technicianName,
      email: booking.technicianEmail,
    },
    preferredDate: booking.preferredDate,
    address: booking.address,
    problemDescription: booking.problemDescription,
    status,
    paymentStatus: booking.paymentStatus as PaymentStatus,
    basePrice: booking.basePrice,
    finalAmount: booking.finalAmount,
    createdAt: booking.createdAt,
    timeline: timeline.length
      ? timeline
      : [{ status: "requested" as const, at: booking.createdAt }],
  }
}

export function mapPayment(payment: BackendPayment): Payment {
  return {
    id: payment._id,
    bookingId: payment.bookingId,
    serviceTitle: payment.serviceTitle,
    customerName: payment.customerName,
    technicianName: payment.technicianName,
    amount: payment.amount,
    currency: payment.currency,
    transactionId: payment.transactionId,
    paidAt: payment.paidAt,
    status: (payment.paymentStatus ?? payment.status ?? "paid") as PaymentStatus,
  }
}
