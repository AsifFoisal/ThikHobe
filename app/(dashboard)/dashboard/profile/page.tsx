import type { Metadata } from "next"

import { ProfileView } from "@/components/profile/profile-view"

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Shared FixMate profile surface with local validation and image preview for customer, technician, and admin demo identities.",
}

export default function ProfilePage() {
  return <ProfileView />
}
