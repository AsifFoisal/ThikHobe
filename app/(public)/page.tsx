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
        url: "/images/hero-parts.jpg",
        width: 2200,
        height: 1467,
        alt: "Repair tools, parts, and test equipment on an electronics workbench.",
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
