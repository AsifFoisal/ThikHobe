import type { Service } from "@/types"

/**
 * Illustrative presentation data for the frontend prototype.
 * No API, database, or transport layer is involved.
 */
export type SampleService = Service & {
  imagePosition?: string
}

export const SAMPLE_SERVICES: SampleService[] = [
  {
    id: "fm-iphone-screen-battery",
    title: "iPhone Screen & Battery Replacement",
    category: "Smartphone",
    description:
      "Cracked glass or a battery that no longer holds a charge? We replace the screen or battery with a tested part and confirm every function before handover.",
    basePrice: 2500,
    estimatedDuration: "45–60 min",
    mode: "Home Visit",
    area: "Dhanmondi",
    image: "/images/service-smartphone.jpg",
    approvalStatus: "approved",
    available: true,
    technician: {
      id: "tech-rafiul",
      name: "Rafiul Islam",
      area: "Dhanmondi",
      bio: "Board-level phone and laptop specialist with eight years of bench experience.",
      plan: "pro",
    },
    createdAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "fm-laptop-diagnostics",
    title: "Laptop Diagnostics & Board Repair",
    category: "Laptop & PC",
    description:
      "Starting with a full diagnostic, we trace power, charging, and board faults before quoting the repair. No guesswork and no parts thrown at the problem.",
    basePrice: 1800,
    estimatedDuration: "1–2 hrs",
    mode: "Shop Drop-off",
    area: "Mirpur",
    image: "/images/service-laptop.jpg",
    approvalStatus: "approved",
    available: true,
    technician: {
      id: "tech-nusrat",
      name: "Nusrat Jahan",
      area: "Mirpur",
      bio: "Certified laptop and desktop technician focused on same-day diagnostics.",
      plan: "pro",
    },
    createdAt: "2026-11-15T09:00:00.000Z",
  },
  {
    id: "fm-ac-service",
    title: "AC Service & Gas Refill",
    category: "AC",
    description:
      "A complete split or window AC service covering filter cleaning, coil checks, drainage, and refrigerant top-up when required.",
    basePrice: 2200,
    estimatedDuration: "60–90 min",
    mode: "Home Visit",
    area: "Uttara",
    image: "/images/service-ac.jpg",
    approvalStatus: "approved",
    available: true,
    technician: {
      id: "tech-tanvir",
      name: "Tanvir Ahmed",
      area: "Uttara",
      bio: "HVAC technician handling split and window air conditioning systems.",
    },
    createdAt: "2026-11-14T09:00:00.000Z",
  },
  {
    id: "fm-fridge-cooling",
    title: "Refrigerator Cooling Repair",
    category: "Refrigerator",
    description:
      "Diagnosis and repair for weak cooling, leaks, thermostat faults, and compressor issues in household refrigerators.",
    basePrice: 2800,
    estimatedDuration: "1–2 hrs",
    mode: "Home Visit",
    area: "Mohammadpur",
    image: "/images/service-refrigerator.jpg",
    imagePosition: "center 38%",
    approvalStatus: "approved",
    available: true,
    technician: {
      id: "tech-farhana",
      name: "Farhana Akter",
      area: "Mohammadpur",
      bio: "Appliance technician focused on refrigeration and laundry systems.",
    },
    createdAt: "2026-11-13T09:00:00.000Z",
  },
  {
    id: "fm-tv-panel",
    title: "TV Panel & Circuit Board Repair",
    category: "TV",
    description:
      "Screen, backlight, and board-level TV repair for modern LED and smart televisions, with a clear assessment before work begins.",
    basePrice: 2000,
    estimatedDuration: "1–3 hrs",
    mode: "Shop Drop-off",
    area: "Banani",
    image: "/images/service-tv.jpg",
    imagePosition: "center 34%",
    approvalStatus: "approved",
    available: true,
    technician: {
      id: "tech-mahmud",
      name: "Mahmud Hasan",
      area: "Banani",
      bio: "TV and home electronics specialist with a focus on panel-level repair.",
    },
    createdAt: "2026-11-12T09:00:00.000Z",
  },
  {
    id: "fm-washer-drum",
    title: "Washing Machine Drum & Motor Repair",
    category: "Washing Machine",
    description:
      "Repair for noisy drums, drainage faults, and failed motors in front-load and top-load washing machines.",
    basePrice: 1900,
    estimatedDuration: "60–90 min",
    mode: "Home Visit",
    area: "Gulshan",
    image: "/images/service-washer.jpg",
    approvalStatus: "approved",
    available: true,
    technician: {
      id: "tech-sadia",
      name: "Sadia Islam",
      area: "Gulshan",
      bio: "Laundry and kitchen appliance repair specialist.",
    },
    createdAt: "2026-11-11T09:00:00.000Z",
  },
  {
    id: "fm-laptop-keyboard",
    title: "Laptop Keyboard Replacement",
    category: "Laptop & PC",
    description:
      "Replace a failed or damaged laptop keyboard with a compatible part and test every key before return.",
    basePrice: 1200,
    estimatedDuration: "45–90 min",
    mode: "Shop Drop-off",
    area: "Mirpur",
    image: "/images/service-laptop.jpg",
    approvalStatus: "pending",
    available: true,
    technician: {
      id: "tech-nusrat",
      name: "Nusrat Jahan",
      area: "Mirpur",
      bio: "Certified laptop and desktop technician focused on same-day diagnostics.",
    },
    createdAt: "2026-11-10T09:00:00.000Z",
  },
  {
    id: "fm-home-wiring",
    title: "Home Wiring & Breaker Inspection",
    category: "Electrical",
    description:
      "A safety inspection for tripping breakers, damaged outlets, and overloaded circuits, with a written summary of any work needed.",
    basePrice: 2100,
    estimatedDuration: "1–2 hrs",
    mode: "Home Visit",
    area: "Dhanmondi",
    image: "/images/service-electric.jpg",
    approvalStatus: "approved",
    available: false,
    technician: {
      id: "tech-imran",
      name: "Imran Hossain",
      area: "Dhanmondi",
      bio: "Licensed electrician for home wiring and electrical safety checks.",
    },
    createdAt: "2026-11-09T09:00:00.000Z",
  },
]

export function getFeaturedServices(limit = 6): SampleService[] {
  return [...SAMPLE_SERVICES]
    .filter(
      (service) => service.approvalStatus === "approved" && service.available
    )
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, limit)
}
