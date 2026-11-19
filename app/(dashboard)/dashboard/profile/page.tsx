import type { Metadata } from "next"

import { ProfileView } from "@/components/profile/profile-view"
import { requireSessionUser } from "@/lib/server-api"

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Update your FixMate name, contact details, bio, and profile photo.",
}

export default async function ProfilePage() {
  const user = await requireSessionUser()
  return <ProfileView user={user} />
}
