import type { Metadata, Viewport } from "next"
import { Hanken_Grotesk } from "next/font/google"

import { Toaster } from "@/components/ui/Toaster"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

import "./globals.css"

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  fallback: ["Noto Sans Bengali", "ui-sans-serif", "system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#FAFBF8",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(hanken.variable, hanken.className)}>
      <body className="min-h-svh bg-paper text-ink antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
