export type UserRole = "customer" | "technician" | "admin"

export type TechnicianPlan = "free" | "pro"

export type ServiceCategory =
  | "Smartphone"
  | "Laptop & PC"
  | "AC"
  | "Refrigerator"
  | "TV"
  | "Washing Machine"
  | "Electrical"

export type ServiceMode = "Home Visit" | "Shop Drop-off"

export type ServiceApprovalStatus = "pending" | "approved" | "rejected"

export type BookingStatus =
  | "requested"
  | "accepted"
  | "in_progress"
  | "completed"
  | "rejected"
  | "cancelled"

export type PaymentStatus = "unpaid" | "paid"

export type BadgeTone =
  | "neutral"
  | "brand"
  | "fern"
  | "accent"
  | "blue"
  | "indigo"
  | "amber"
  | "green"
  | "red"
  | "gray"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  image?: string
  phone?: string
  area?: string
  bio?: string
  plan?: TechnicianPlan
  /** ISO 8601 date string */
  createdAt: string
}

export interface TechnicianSummary {
  id: string
  name: string
  image?: string
  area?: string
  bio?: string
  plan?: TechnicianPlan
  rating?: number
}

export interface Service {
  id: string
  title: string
  category: ServiceCategory
  description: string
  basePrice: number
  estimatedDuration: string
  mode: ServiceMode
  area: string
  image: string
  approvalStatus: ServiceApprovalStatus
  available: boolean
  technician: TechnicianSummary
  rating?: number
  reviewCount?: number
  /** ISO 8601 date string */
  createdAt: string
}

export interface BookingParty {
  id: string
  name: string
  email?: string
  phone?: string
  image?: string
}

export interface BookingTimelineEntry {
  status: BookingStatus | "paid"
  /** ISO 8601 date string */
  at?: string
}

export interface Booking {
  id: string
  service: Pick<
    Service,
    "id" | "title" | "image" | "category" | "mode" | "basePrice"
  >
  customer: BookingParty
  technician: BookingParty
  /** ISO 8601 date string */
  preferredDate: string
  address: string
  problemDescription: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  basePrice: number
  finalAmount?: number
  /** ISO 8601 date string */
  createdAt: string
  timeline?: BookingTimelineEntry[]
}

export interface Payment {
  id: string
  bookingId: string
  serviceTitle: string
  customerName: string
  technicianName: string
  amount: number
  currency: string
  transactionId: string
  /** ISO 8601 date string */
  paidAt: string
  status: PaymentStatus
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  message: string
  code?: string
  fieldErrors?: Record<string, string[]>
}

export interface PaginatedData<T> {
  items: T[]
  pagination: PaginationMeta
}

export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>
