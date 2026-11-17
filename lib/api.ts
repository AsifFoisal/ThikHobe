/**
 * Central API configuration.
 * This presentation build deliberately contains no request, mock, or storage layer.
 */
export const apiConfig = {
  baseUrl: (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, ""),
} as const
