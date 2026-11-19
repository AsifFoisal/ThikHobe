import { DEMO_TECHNICIAN } from "@/constants/demo"
import { SAMPLE_SERVICES } from "@/data/sample-services"
import type { Service, TechnicianSummary } from "@/types"

const technician = SAMPLE_SERVICES.find(
  (service) => service.technician.id === DEMO_TECHNICIAN.id
)?.technician

if (!technician) {
  throw new Error("The demo technician has no sample service profile")
}

export const DEMO_TECHNICIAN_PROFILE: TechnicianSummary = technician

const extraServices: Service[] = [
  {
    id: "tech-smartwatch-screen",
    title: "Smartwatch Screen Replacement",
    category: "Smartphone",
    description:
      "Replace a cracked smartwatch display with a compatible part and test touch, sensors, and charging before handover.",
    basePrice: 1800,
    estimatedDuration: "45–60 min",
    mode: "Shop Drop-off",
    area: "Dhanmondi",
    image: "/images/service-phone-alt.jpg",
    approvalStatus: "pending",
    available: true,
    technician,
    createdAt: "2026-11-18T09:00:00.000Z",
  },
  {
    id: "tech-home-theatre",
    title: "Home Theatre Wiring & Setup",
    category: "Electrical",
    description:
      "Concealed speaker wiring, receiver setup, and a full sound check for a home theatre installation.",
    basePrice: 4200,
    estimatedDuration: "3–4 hrs",
    mode: "Home Visit",
    area: "Dhanmondi",
    image: "/images/service-electric-alt.jpg",
    approvalStatus: "pending",
    available: true,
    technician,
    createdAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "tech-macbook-board",
    title: "MacBook Board-Level Repair",
    category: "Laptop & PC",
    description:
      "Micro-soldering and component-level diagnosis for MacBooks that no longer power on or charge.",
    basePrice: 5500,
    estimatedDuration: "2–4 hrs",
    mode: "Shop Drop-off",
    area: "Dhanmondi",
    image: "/images/service-laptop-alt.jpg",
    approvalStatus: "approved",
    available: false,
    technician,
    createdAt: "2026-10-30T09:00:00.000Z",
  },
  {
    id: "tech-tablet-battery",
    title: "Tablet Battery Replacement",
    category: "Smartphone",
    description:
      "Battery replacement for tablets with declining runtime, including a charging test and seal check.",
    basePrice: 2200,
    estimatedDuration: "60–90 min",
    mode: "Shop Drop-off",
    area: "Dhanmondi",
    image: "/images/service-phone-alt.jpg",
    approvalStatus: "rejected",
    available: false,
    technician,
    createdAt: "2026-11-05T09:00:00.000Z",
  },
]

const existingServices = SAMPLE_SERVICES.filter(
  (service) => service.technician.id === DEMO_TECHNICIAN.id
)

export const SAMPLE_TECHNICIAN_SERVICES: Service[] = [
  ...extraServices,
  ...existingServices,
].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

export const SAMPLE_PLATFORM_EXTRA_SERVICES = extraServices
