"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function AnimatedSection({ children, className = "", delay = 0, direction = "up" }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(30px)"
      case "down":
        return "translateY(-30px)"
      case "left":
        return "translateX(30px)"
      case "right":
        return "translateX(-30px)"
      default:
        return "none"
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
