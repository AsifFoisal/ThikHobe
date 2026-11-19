import { apiRequest, toQueryString } from "@/lib/api/client"
import {
  mapPayment,
  type BackendList,
  type BackendPayment,
} from "@/lib/api/mappers"
import type { Payment } from "@/types"

export interface CheckoutSession {
  url: string
}

export interface PaymentVerification {
  status: "paid"
  bookingId?: string
  serviceTitle: string
  amount: number
  currency: string
  transactionId: string
  paidAt: string
}

export interface AdminTransactions {
  items: Payment[]
  totalRevenue: number
}

export const paymentsApi = {
  createCheckoutSession(bookingId: string) {
    return apiRequest<CheckoutSession>("/payments/create-checkout-session", {
      method: "POST",
      body: { bookingId },
    })
  },

  verify(sessionId: string) {
    return apiRequest<PaymentVerification>(
      `/payments/verify${toQueryString({ session_id: sessionId })}`
    )
  },

  async customerHistory() {
    const data = await apiRequest<BackendList<BackendPayment>>("/payments/my")
    return data.items.map(mapPayment)
  },

  async adminTransactions() {
    const data = await apiRequest<BackendList<BackendPayment>>("/admin/payments")
    return {
      items: data.items.map(mapPayment),
      totalRevenue: data.totalRevenue ?? 0,
    } satisfies AdminTransactions
  },
}
