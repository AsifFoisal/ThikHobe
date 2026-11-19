import type { BookingStatus } from "@/types"

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Dhaka",
})

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Dhaka",
})

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

export function formatPrice(value: number) {
  return currencyFormatter.format(value)
}

export function formatNumber(value: number) {
  return numberFormatter.format(value)
}

export function formatDate(value: string | Date) {
  return dateFormatter.format(typeof value === "string" ? new Date(value) : value)
}

export function formatDateTime(value: string | Date) {
  return dateTimeFormatter.format(
    typeof value === "string" ? new Date(value) : value
  )
}

export function formatBookingFinalAmount(booking: {
  finalAmount?: number
  status: BookingStatus
}) {
  if (booking.finalAmount != null) {
    return formatPrice(booking.finalAmount)
  }

  return booking.status === "rejected" || booking.status === "cancelled"
    ? "No charge"
    : "Pending"
}
