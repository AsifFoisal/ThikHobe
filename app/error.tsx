"use client"

import { RotateCcw } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { ToolsIllustration } from "@/components/ui/tools-illustration"

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-svh flex-col bg-paper">
      <header className="border-b border-line">
        <div className="container-page flex h-16 items-center">
          <Link aria-label="FixMate home" className="rounded-lg" href="/">
            <Logo />
          </Link>
        </div>
      </header>

      <main
        className="flex flex-1 items-center justify-center px-4 py-14 sm:px-6"
        id="main"
      >
        <div className="max-w-xl text-center">
          <ToolsIllustration className="mx-auto" />
          <h1 className="type-h1 mt-8">Something slipped out of place.</h1>
          <p className="type-lead mt-3">
            This page hit an unexpected error. Try again, or return home while we
            get things back in order.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Button onClick={reset}>
              <RotateCcw aria-hidden className="size-4" />
              Try again
            </Button>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
