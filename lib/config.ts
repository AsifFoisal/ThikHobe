export const siteConfig = {
  name: "FixMate",
  tagline: "Repairs, handled.",
  description:
    "Book verified technicians for smartphone, laptop, and home appliance repairs. Follow the job in one place and pay only when it is done.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: "hello@fixmate.bd",
    phone: "+880 1700 000 000",
    phoneHref: "+8801700000000",
    address: "Level 3, House 42, Road 11, Banani, Dhaka 1213, Bangladesh",
  },
  social: {
    x: "https://x.com/fixmate",
    facebook: "https://facebook.com/fixmate",
    instagram: "https://instagram.com/fixmate",
    linkedin: "https://linkedin.com/company/fixmate",
  },
} as const
