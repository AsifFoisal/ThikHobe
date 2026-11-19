import type { Metadata } from "next"

import { ProfileView } from "@/components/profile/profile-view"

export const metadata: Metadata = {
  title: "Technician profile",
  description:
    "Shared FixMate technician profile surface with local validation and image preview.",
}

export default function TechnicianProfilePage() {
  return <ProfileView />
}
