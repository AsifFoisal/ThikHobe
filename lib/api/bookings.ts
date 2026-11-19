import { apiRequest, toQueryString } from "@/lib/api/client"
import {
  mapBooking,
  toBackendBookingStatus,
  type BackendBooking,
  type BackendList,
} from "@/lib/api/mappers"
import type { Booking, BookingStatus, PaginatedData } from "@/types"

export interface CreateBookingInput {
  serviceId: string
  customerPhone: string
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

const toPage = (items: Booking[]): PaginatedData<Booking> => ({
  items,
  pagination: {
    page: 1,
    limit: Math.max(items.length, 1),
    total: items.length,
    totalPages: 1,
  },
})

export const bookingsApi = {
  async create(input: CreateBookingInput) {
    const data = await apiRequest<BackendBooking>("/api/bookings", {
      method: "POST",
      body: input,
    })
    return mapBooking(data)
  },

  async customer(params: BookingListInput = {}) {
    const data = await apiRequest<BackendList<BackendBooking>>(
      `/api/bookings/my${toQueryString({
        status: params.status
          ? toBackendBookingStatus(params.status)
          : undefined,
      })}`
    )
    return toPage(data.items.map(mapBooking))
  },

  async technician(params: BookingListInput = {}) {
    const data = await apiRequest<BackendList<BackendBooking>>(
      `/api/bookings/technician${toQueryString({
        status: params.status
          ? toBackendBookingStatus(params.status)
          : undefined,
      })}`
    )
    return toPage(data.items.map(mapBooking))
  },

  async admin(params: BookingListInput = {}) {
    const data = await apiRequest<BackendList<BackendBooking>>("/api/admin/bookings")
    const items = data.items.map(mapBooking)
    return toPage(
      params.status
        ? items.filter((booking) => booking.status === params.status)
        : items
    )
  },

  async getById(id: string) {
    const data = await apiRequest<BackendBooking>(
      `/api/bookings/${encodeURIComponent(id)}`
    )
    return mapBooking(data)
  },

  async cancel(id: string) {
    const data = await apiRequest<BackendBooking>(
      `/api/bookings/${encodeURIComponent(id)}/cancel`,
      { method: "PATCH" }
    )
    return mapBooking(data)
  },

  async updateStatus(id: string, input: UpdateBookingStatusInput) {
    const data = await apiRequest<BackendBooking>(
      `/api/bookings/${encodeURIComponent(id)}/status`,
      {
        method: "PATCH",
        body: {
          status: toBackendBookingStatus(input.status),
          ...(input.finalAmount !== undefined
            ? { finalAmount: input.finalAmount }
            : {}),
        },
      }
    )
    return mapBooking(data)
  },
}
