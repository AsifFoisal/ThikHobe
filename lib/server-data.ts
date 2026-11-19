import "server-only"

import {
  mapBooking,
  mapPayment,
  mapService,
  mapUser,
  type BackendBooking,
  type BackendList,
  type BackendPayment,
  type BackendService,
  type BackendUser,
} from "@/lib/api/mappers"
import { serverApi } from "@/lib/server-api"
import type {
  Booking,
  PaginatedData,
  Payment,
  Service,
  ServiceCategory,
  ServiceMode,
  ServiceSort,
  User,
} from "@/types"

interface BackendServicePage {
  items: BackendService[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ServicesQuery {
  search?: string
  category?: ServiceCategory | ""
  mode?: ServiceMode | ""
  sort?: ServiceSort
  page?: number
  limit?: number
}

const queryString = (params: Record<string, string | number | undefined>) => {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue
    query.set(key, String(value))
  }
  const text = query.toString()
  return text ? `?${text}` : ""
}

export async function getPublicServices(
  params: ServicesQuery
): Promise<PaginatedData<Service>> {
  const data = await serverApi<BackendServicePage>(
    `/api/services${queryString({
      search: params.search,
      category: params.category,
      mode: params.mode,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    })}`
  )

  return {
    items: data.items.map(mapService),
    pagination: data.pagination,
  }
}

export async function getFeaturedServices(limit = 6): Promise<Service[]> {
  const data = await serverApi<{ items: BackendService[] }>(
    `/api/services${queryString({ sort: "newest", limit })}`
  )
  return data.items.map(mapService)
}

export async function getServiceById(id: string): Promise<Service> {
  const data = await serverApi<BackendService>(
    `/api/services/${encodeURIComponent(id)}`
  )
  return mapService(data)
}

export async function getMyBookings(): Promise<Booking[]> {
  const data = await serverApi<BackendList<BackendBooking>>("/api/bookings/my", {
    auth: true,
  })
  return data.items.map(mapBooking)
}

export async function getBookingById(id: string): Promise<Booking> {
  const data = await serverApi<BackendBooking>(
    `/api/bookings/${encodeURIComponent(id)}`,
    { auth: true }
  )
  return mapBooking(data)
}

export async function getMyPayments(): Promise<Payment[]> {
  const data = await serverApi<BackendList<BackendPayment>>("/api/payments/my", {
    auth: true,
  })
  return data.items.map(mapPayment)
}

export async function getTechnicianServices(): Promise<Service[]> {
  const data = await serverApi<BackendList<BackendService>>(
    "/api/services/mine",
    { auth: true }
  )
  return data.items.map(mapService)
}

export async function getTechnicianBookings(): Promise<Booking[]> {
  const data = await serverApi<BackendList<BackendBooking>>(
    "/api/bookings/technician",
    { auth: true }
  )
  return data.items.map(mapBooking)
}

export async function getAdminUsers(): Promise<User[]> {
  const data = await serverApi<BackendList<BackendUser>>("/api/admin/users", {
    auth: true,
  })
  return data.items.map(mapUser)
}

export async function getAdminServices(): Promise<Service[]> {
  const data = await serverApi<BackendList<BackendService>>(
    "/api/admin/services",
    { auth: true }
  )
  return data.items.map(mapService)
}

export async function getAdminBookings(): Promise<Booking[]> {
  const data = await serverApi<BackendList<BackendBooking>>(
    "/api/admin/bookings",
    { auth: true }
  )
  return data.items.map(mapBooking)
}

export async function getAdminPayments(): Promise<{
  items: Payment[]
  totalRevenue: number
}> {
  const data = await serverApi<BackendList<BackendPayment>>(
    "/api/admin/payments",
    { auth: true }
  )
  return {
    items: data.items.map(mapPayment),
    totalRevenue: data.totalRevenue ?? 0,
  }
}
