export const siteConfig = {
  name: "ThikHobe",
  tagline: "Repairs, handled.",
  description:
    "Book verified technicians for smartphone, laptop, and home appliance repairs. Follow the job in one place and pay only when it is done.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: "hello@thikhobe.bd",
    phone: "+880 1700 000 000",
    phoneHref: "+8801700000000",
    address: "Level 3, House 42, Road 11, Banani, Dhaka 1213, Bangladesh",
  },
  social: {
    x: "https://x.com/thikhobe",
    facebook: "https://facebook.com/thikhobe",
    instagram: "https://instagram.com/thikhobe",
    linkedin: "https://linkedin.com/company/thikhobe",
  },
} as const
