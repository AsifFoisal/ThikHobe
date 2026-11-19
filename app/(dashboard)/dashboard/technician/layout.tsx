import { requireRole } from "@/lib/server-api"

export default async function TechnicianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole("technician")
  return children
}
