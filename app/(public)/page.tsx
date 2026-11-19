import type { Metadata } from "next"

import { FeaturedServices } from "@/components/home/FeaturedServices"
import { FinalCTA } from "@/components/home/FinalCTA"
import { Hero } from "@/components/home/Hero"
import { HowItWorks } from "@/components/home/HowItWorks"
import { PopularCategories } from "@/components/home/PopularCategories"
import { TrustSection } from "@/components/home/TrustSection"
import { WhyThikHobe } from "@/components/home/WhyThikHobe"

export const metadata: Metadata = {
  title: "Verified device & appliance repair",
  description:
    "Book verified technicians for phone, laptop, and home appliance repairs in Bangladesh. Track every step and pay only when the job is complete.",
  openGraph: {
    title: "ThikHobe — Repairs, handled.",
    description:
      "Verified technicians for phones, laptops, and home appliances. Follow the repair and pay only when it is complete.",
    images: [
      {
        url: "/images/hero-technician.jpg",
        width: 1600,
        height: 1067,
        alt: "A technician repairing a laptop at a workbench.",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <HowItWorks />
      <PopularCategories />
      <WhyThikHobe />
      <TrustSection />
      <FinalCTA />
    </>
  )
}
