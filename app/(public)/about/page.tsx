import type { Metadata } from "next"

import { AboutBenefits } from "@/components/about/about-benefits"
import { AboutCategories } from "@/components/about/about-categories"
import { AboutCta } from "@/components/about/about-cta"
import { AboutIntro } from "@/components/about/about-intro"
import { AboutPayment } from "@/components/about/about-payment"
import { AboutProblem } from "@/components/about/about-problem"
import { AboutProcess } from "@/components/about/about-process"

export const metadata: Metadata = {
  title: "How ThikHobe works",
  description:
    "How ThikHobe connects customers with verified repair technicians, makes every repair status visible, and lets customers pay only after the work is completed.",
}

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <AboutProblem />
      <AboutProcess />
      <AboutBenefits />
      <AboutPayment />
      <AboutCategories />
      <AboutCta />
    </>
  )
}
