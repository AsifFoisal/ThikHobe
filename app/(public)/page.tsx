import type { Metadata } from "next"

import { FeaturedServices } from "@/components/home/featured-services"
import { FinalCTA } from "@/components/home/final-cta"
import { Hero } from "@/components/home/hero"
import { HowItWorks } from "@/components/home/how-it-works"
import { PopularCategories } from "@/components/home/popular-categories"
import { TrustSection } from "@/components/home/trust-section"
import { WhyThikHobe } from "@/components/home/why-thikhobe"

export const metadata: Metadata = {
  title: "Verified device & appliance repair",
  description:
    "Book verified technicians for phone, laptop, and home appliance repairs in Dhaka. Track every step and pay only when the job is complete.",
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
