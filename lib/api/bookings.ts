import { apiRequest, toQueryString } from "@/lib/api/client"
import type { Booking, BookingStatus, PaginatedData } from "@/types"

export interface CreateBookingInput {
  serviceId: string
  preferredDate: string
  address: string
  problemDescription: string
}

export interface BookingListInput {
  status?: BookingStatus | ""
  page?: number
  limit?: number
}

export interface UpdateBookingStatusInput {
  status: BookingStatus
  finalAmount?: number
}

export const bookingsApi = {
  create(input: CreateBookingInput) {
    return apiRequest<Booking>("/bookings", {
      method: "POST",
      body: input,
    })
  },

  customer(params: BookingListInput = {}) {
    return apiRequest<PaginatedData<Booking>>(
      `/bookings/customer${toQueryString({
        status: params.status,
        page: params.page,
        limit: params.limit,
      })}`
    )
  },

  technician(params: BookingListInput = {}) {
    return apiRequest<PaginatedData<Booking>>(
      `/bookings/technician${toQueryString({
        status: params.status,
        page: params.page,
        limit: params.limit,
      })}`
    )
  },

  admin(params: BookingListInput = {}) {
    return apiRequest<PaginatedData<Booking>>(
      `/bookings/admin${toQueryString({
        status: params.status,
        page: params.page,
        limit: params.limit,
      })}`
    )
  },

  cancel(id: string) {
    return apiRequest<Booking>(`/bookings/${encodeURIComponent(id)}/cancel`, {
      method: "PATCH",
    })
  },

  updateStatus(id: string, input: UpdateBookingStatusInput) {
    return apiRequest<Booking>(`/bookings/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: input,
    })
  },
}
