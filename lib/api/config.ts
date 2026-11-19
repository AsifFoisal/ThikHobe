export const apiConfig = {
  baseUrl: (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, ""),
} as const
