import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import { ToolsIllustration } from "@/components/ui/tools-illustration"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col bg-paper">
      <header className="border-b border-line">
        <div className="container-page flex h-16 items-center">
          <Link aria-label="ThikHobe home" className="rounded-lg" href="/">
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
          <h1 className="type-h1 mt-8">This page needs a repair.</h1>
          <p className="type-lead mt-3">
            The link may be broken or the page may have moved. Let&apos;s get you
            back to something that works.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Link className={buttonVariants()} href="/">
              Back to Home
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/services"
            >
              Browse services
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
