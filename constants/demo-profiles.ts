import type { UserRole } from "@/types"

export interface DemoProfileDetails {
  phone: string
  area: string
  bio: string
}

export const DEMO_PROFILE_DETAILS: Record<UserRole, DemoProfileDetails> = {
  customer: {
    phone: "+880 1711 000 000",
    area: "Dhanmondi, Dhaka",
    bio: "I use FixMate to keep the appliances at home running without the guesswork.",
  },
  technician: {
    phone: "+880 1811 222 333",
    area: "Dhanmondi, Dhaka",
    bio: "Board-level phone and laptop specialist with eight years of bench experience. I focus on clear diagnosis and careful handover.",
  },
  admin: {
    phone: "+880 1911 444 555",
    area: "Gulshan, Dhaka",
    bio: "Platform operations lead. I review service quality, approvals, and the health of the FixMate marketplace.",
  },
}
