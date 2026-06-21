'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './CustomCursor'

gsap.registerPlugin(ScrollTrigger)

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, wheelMultiplier: 1.0 })

    /* Connect Lenis scroll events to GSAP ScrollTrigger */
    lenis.on('scroll', ScrollTrigger.update)

    /* Drive Lenis from GSAP's ticker so timing is perfectly in sync */
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) })
    }
  }, [])

  return (
    <>
      <CustomCursor />
      {children}
    </>
  )
}
