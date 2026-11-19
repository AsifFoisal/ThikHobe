import { redirect } from "next/navigation"

import { ROLE_DASHBOARD } from "@/constants"
import { requireSessionUser } from "@/lib/server-api"

export default async function DashboardPage() {
  const user = await requireSessionUser()
  redirect(ROLE_DASHBOARD[user.role])
}
