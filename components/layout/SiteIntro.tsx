"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { FilmSplitLoader } from "@/components/dimaac/film-split-loader"
import { cn } from "@/lib/utils"

export function SiteIntro() {
  const pathname = usePathname()
  const [show, setShow] = useState(() => {
    if (typeof document === "undefined") return pathname === "/"

    return (
      pathname === "/" &&
      document.documentElement.dataset.entryPath === "/" &&
      document.documentElement.dataset.introShown !== "true"
    )
  })
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!show) return

    document.documentElement.dataset.introActive = "true"
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
      delete document.documentElement.dataset.introActive
    }
  }, [show])

  useEffect(() => {
    if (!exiting) return

    const timeout = window.setTimeout(() => {
      document.documentElement.dataset.introShown = "true"
      setShow(false)
    }, 700)

    return () => window.clearTimeout(timeout)
  }, [exiting])

  if (!show) return null

  return (
    <>
      <noscript>
        <style>{`[data-site-intro]{display:none!important}`}</style>
      </noscript>
      <div
        aria-label="Loading ThikHobe"
        className={cn(
          "film-intro fixed inset-0 z-[200] h-svh overflow-hidden bg-[var(--film-bg)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          exiting
            ? "pointer-events-none scale-[1.015] opacity-0"
            : "scale-100 opacity-100"
        )}
        data-site-intro
        role="status"
      >
        <FilmSplitLoader
          alt="A technician repairing a laptop at a workbench"
          className="h-full w-full"
          duration={2.4}
          onComplete={() => {
            const reducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches

            delete document.documentElement.dataset.introActive

            if (reducedMotion) {
              document.documentElement.dataset.introShown = "true"
              setShow(false)
              return
            }

            setExiting(true)
          }}
          src="/images/hero-technician.jpg"
          words={["Thik", "Hobe"]}
        />
      </div>
    </>
  )
}
