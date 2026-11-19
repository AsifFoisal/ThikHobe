import type { Metadata } from "next"

import { ProfileView } from "@/components/profile/profile-view"

export const metadata: Metadata = {
  title: "Admin profile",
  description:
    "Shared FixMate admin profile surface with local validation and image preview.",
}

export default function AdminProfilePage() {
  return <ProfileView />
}
