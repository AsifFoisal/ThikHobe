import type { Metadata } from "next"

import { AboutBenefits } from "@/components/about/AboutBenefits"
import { AboutCategories } from "@/components/about/AboutCategories"
import { AboutCta } from "@/components/about/AboutCTA"
import { AboutIntro } from "@/components/about/AboutIntro"
import { AboutPayment } from "@/components/about/AboutPayment"
import { AboutProblem } from "@/components/about/AboutProblem"
import { AboutProcess } from "@/components/about/AboutProcess"

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
