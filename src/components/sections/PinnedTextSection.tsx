'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const text = 'PREMIUM SPIRITS. AN INDIAN BUSINESS. A GLOBAL PARENT. GOOD TIMES FROM A GOOD PLACE.'

export default function PinnedTextSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const charsRef   = useRef<HTMLSpanElement[]>([])

  const chars = text.split('')

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    const isMobile = window.innerWidth < 768

    if (!isMobile) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: textRef.current,
        pinSpacing: false,
      })
    }

    gsap.fromTo(charsRef.current,
      { color: 'rgba(242,237,228,0.07)' },
      {
        color: 'rgba(242,237,228,0.95)',
        stagger: 0.015,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 80%' : 'top top',
          end: isMobile ? 'bottom 20%' : 'bottom bottom',
          scrub: isMobile ? 0.3 : 1,
        },
      }
    )
  }, [])

  const BG = 'https://reimagined-succotash-tau.vercel.app/images/brands/chivas/00-previewlarge-chivas-20socialassets-20-20.jpg'

  return (
    <section ref={sectionRef} style={{
      height: 'var(--pinned-height, 350vh)',
      position: 'relative',
    }}>
      {/* Background + overlay + text all in ONE pinned element so GSAP pins them together */}
      <div ref={textRef} style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(64px, 10vh, 120px) clamp(24px, 8vw, 120px)',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url('${BG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}>
        {/* dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,10,16,0.72)', pointerEvents: 'none' }} />
        {/* gold vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 110%, rgba(191,160,90,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <p style={{
          position: 'relative', zIndex: 1,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 4.5vw, 64px)',
          fontWeight: 300,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          maxWidth: '1100px',
        }}>
          {chars.map((ch, i) => (
            <span
              key={i}
              ref={el => { if (el) charsRef.current[i] = el }}
              style={{ color: 'rgba(242,237,228,0.07)' }}
            >
              {ch}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
