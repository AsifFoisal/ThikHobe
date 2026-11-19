import { requireRole } from "@/lib/server-api"

export default async function CustomerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole("customer")
  return children
}
