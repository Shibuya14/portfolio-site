"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollAnimationProps {
  threshold?: number
  rootMargin?: string
}

export function useScrollAnimation({ threshold = 0.1, rootMargin = "0px" }: UseScrollAnimationProps = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // 一度表示されたら監視を解除
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
