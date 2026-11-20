"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

// A loader that opens like a film title. Two words sit in the middle of the screen, then they
// spread apart and a small tilted card pops up between them. The card straightens, grows to fill
// the whole box and shows the picture, and the title rises word by word on top of it.
//
// Colours come from CSS variables so the host page can theme it (see className):
//   --film-bg  the loader background        --film-fg  the loader words
//   --film-on  text and header on the image

export type FilmSplitLoaderProps = {
  /** The two loader words: one goes left of the card, one goes right. */
  words?: [string, string]
  /** The picture the card grows into. */
  src: string
  /** Alt text for the picture. Leave empty if it is only decoration. */
  alt?: string
  /** How much the card is tilted while it pops up, in degrees. It straightens as it grows. */
  rotate?: number
  /** How long the whole opening takes, in seconds (from the first word to the full-screen picture). */
  duration?: number
  /** How far apart the two words spread, as a percentage of the box width. On narrow boxes it grows so the card always fits. */
  gap?: number
  /** The big line that rises over the picture once it is full screen. */
  title?: string
  /** The smaller line under the title. */
  subtitle?: string
  /** Your own header or navigation, shown over the picture. It fades in while the card grows. */
  children?: ReactNode
  /** Called when the title has finished rising. */
  onComplete?: () => void
  /** Extra classes for the outer box. Give it a size (it fills it). */
  className?: string
}

// How big the card is at the start, as a share of the box width, for a few box widths
function cardSize(boxWidth: number) {
  if (boxWidth <= 480) return { w: 0.35, h: 0.5 }
  if (boxWidth <= 768) return { w: 0.3, h: 0.4 }
  if (boxWidth <= 1024) return { w: 0.18, h: 0.25 }
  return { w: 0.1, h: 0.15 }
}

// Each word sits in its own clipped box so it can slide up from below the line
function RiseWords({ text, className }: { text: string; className: string }) {
  return (
    <p className={`overflow-hidden ${className}`}>
      {text.split(" ").map((word, index, all) => (
        <span key={`${index}-${word}`} data-rise className="inline-block">
          {word}
          {index < all.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  )
}

export function FilmSplitLoader({
  words = ["Di", "Maac"],
  src,
  alt = "",
  rotate = -8,
  duration = 2.4,
  gap = 20,
  title,
  subtitle,
  children,
  onComplete,
  className = "",
}: FilmSplitLoaderProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // Read when the timeline finishes, so a new callback doesn't replay the opening
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useGSAP(
    () => {
      const box = boxRef.current
      const loader = loaderRef.current
      const heading = wordsRef.current
      const card = cardRef.current
      const image = imageRef.current
      const content = contentRef.current
      if (!box || !loader || !heading || !card || !image || !content) return
      const riseWords = gsap.utils.toArray<HTMLElement>("[data-rise]", box)

      const mm = gsap.matchMedia()

      // Reduced motion: no opening. The picture is already full screen and the text is in place.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(loader, { autoAlpha: 0 })
        gsap.set(card, { autoAlpha: 1, width: "100%", height: "100%" })
        gsap.set(content, { opacity: 1 })
        onCompleteRef.current?.()
      })

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const boxWidth = box.clientWidth
        const size = cardSize(boxWidth)
        const cardWidth = boxWidth * size.w
        // The words must spread wide enough for the card to fit between them
        const spread = Math.max((boxWidth * gap) / 100, cardWidth * 1.6)

        gsap.set(loader, { autoAlpha: 1 })
        gsap.set(heading, { opacity: 0, columnGap: 8 })
        gsap.set(card, {
          autoAlpha: 1,
          width: cardWidth,
          height: boxWidth * size.h,
          rotation: rotate,
          scale: 0,
        })
        gsap.set(image, { scale: 1.5 })
        gsap.set(content, { opacity: 0 })
        // Start from a clean transform, so a replay never stacks on where the last run ended
        gsap.set(riseWords, { clearProps: "transform" })
        gsap.set(riseWords, { yPercent: 120 })

        // Part one: words appear, spread apart, the card pops up, grows and straightens.
        // It is built in "natural" seconds and then stretched to the duration you asked for.
        const opening = gsap.timeline({ defaults: { ease: "power2.inOut" } })
        opening
          .to(heading, { opacity: 1, duration: 0.5, ease: "power2.out" })
          .to(heading, { columnGap: spread, duration: 0.8 }, 0.4)
          .to(card, { scale: 1, duration: 0.8 }, 0.4)
          .to(
            card,
            { rotation: 0, width: "100%", height: "100%", duration: 1.5 },
            1.2
          )
          .to(image, { scale: 1, duration: 1.5 }, 1.5)
          .to(content, { opacity: 1, duration: 0.6, ease: "power2.out" }, 2.1)
          .set(loader, { autoAlpha: 0 })
        opening.duration(Math.max(0.2, duration))

        // Part two: the title rises word by word
        const tl = gsap.timeline({
          paused: true,
          onComplete: () => onCompleteRef.current?.(),
        })
        tl.add(opening).to(
          riseWords,
          { yPercent: 0, duration: 0.5, stagger: 0.03, ease: "power3.out" },
          "-=0.2"
        )

        // Wait for the picture so the card never grows empty (but never wait longer than 1.5 s)
        let cancelled = false
        const ready = Promise.race([
          image.decode().catch(() => undefined),
          new Promise((resolve) => window.setTimeout(resolve, 1500)),
        ])
        void ready.then(() => {
          if (!cancelled) tl.play()
        })

        return () => {
          cancelled = true
        }
      })

      return () => mm.revert()
    },
    {
      scope: boxRef,
      dependencies: [
        rotate,
        duration,
        gap,
        words[0],
        words[1],
        title,
        subtitle,
      ],
      revertOnUpdate: true,
    }
  )

  return (
    <div
      ref={boxRef}
      className={`relative h-full w-full overflow-hidden bg-[var(--film-bg,#faf0ed)] text-[var(--film-fg,#2a1f1c)] ${className}`}
    >
      {/* The loader: the two words, centred, with the background */}
      <div
        ref={loaderRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-[var(--film-bg,#faf0ed)]"
      >
        <div
          ref={wordsRef}
          className="flex items-center justify-center gap-2 text-[clamp(1.2rem,3vw,1.6rem)] font-light tracking-wide uppercase opacity-0"
        >
          <span data-film-word="primary">{words[0]}</span>
          <span data-film-word="accent">{words[1]}</span>
        </div>
      </div>

      {/* The card that grows into the picture */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          ref={cardRef}
          className="invisible relative shrink-0 overflow-hidden bg-spruce"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className="absolute inset-0 block h-full w-full object-cover"
            draggable={false}
            decoding="async"
          />
          <div className="absolute inset-0 bg-spruce/45" />
        </div>
      </div>

      {/* What sits on the picture: your header, then the title */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-between text-[var(--film-on,#faf0ed)] opacity-0"
      >
        <div>{children}</div>
        {title || subtitle ? (
          <div className="mb-[12vh] flex flex-col items-center gap-1.5 px-4 text-center font-extralight">
            {title ? (
              <RiseWords
                text={title}
                className="text-[clamp(1.5rem,6vw,3rem)] leading-tight"
              />
            ) : null}
            {subtitle ? (
              <RiseWords
                text={subtitle}
                className="text-[clamp(0.9rem,2.5vw,1.5rem)]"
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
