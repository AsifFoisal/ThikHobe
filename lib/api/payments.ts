import { apiRequest, toQueryString } from "@/lib/api/client"
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

export const paymentsApi = {
  createCheckoutSession(bookingId: string) {
    return apiRequest<CheckoutSession>("/payments/checkout", {
      method: "POST",
      body: { bookingId },
    })
  },

  verify(sessionId: string) {
    return apiRequest<PaymentVerification>(
      `/payments/verify${toQueryString({ session_id: sessionId })}`
    )
  },

  customerHistory() {
    return apiRequest<Payment[]>("/payments/customer")
  },

  adminTransactions() {
    return apiRequest<Payment[]>("/payments/admin")
  },
}
