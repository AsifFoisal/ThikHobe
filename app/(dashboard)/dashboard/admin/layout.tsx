import { requireRole } from "@/lib/server-api"

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole("admin")
  return children
}
