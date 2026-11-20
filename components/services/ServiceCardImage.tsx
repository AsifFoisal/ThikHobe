"use client"

import Image from "next/image"
import { useState } from "react"

interface ServiceCardImageProps {
  alt: string
  fallbackSrc: string
  priority: boolean
  sizes: string
  src: string
}

export function ServiceCardImage({
  alt,
  fallbackSrc,
  priority,
  sizes,
  src,
}: ServiceCardImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <Image
      alt={alt}
      className="object-cover"
      fill
      loading={priority ? "eager" : "lazy"}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc)
        }
      }}
      sizes={sizes}
      src={currentSrc}
    />
  )
}
