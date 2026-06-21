'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface Props { onComplete: () => void }

export default function Preloader({ onComplete }: Props) {
  const [pct, setPct]  = useState(0)
  const overlayRef     = useRef<HTMLDivElement>(null)
  const pctRef         = useRef<HTMLSpanElement>(null)
  const titleRef       = useRef<HTMLDivElement>(null)
  const done           = useRef(false)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const dur   = 2200

    const count = (now: number) => {
      const p      = Math.min((now - start) / dur, 1)
      const eased  = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      const val    = Math.floor(eased * 100)
      setPct(val)
      if (p < 1) {
        frame = requestAnimationFrame(count)
      } else if (!done.current) {
        done.current = true
        finish()
      }
    }
    frame = requestAnimationFrame(count)
    return () => cancelAnimationFrame(frame)
  }, [])

  const finish = () => {
    const tl = gsap.timeline({ onComplete })
    tl.to(titleRef.current, {
      y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
    })
    .to(overlayRef.current, {
      yPercent: -100, duration: 1.1, ease: 'power4.inOut', delay: 0.25,
    })
  }

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: '#0A0C14',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '20px',
      overflow: 'hidden',
    }}>
      {/* Italic script word */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 'clamp(42px, 6vw, 80px)',
        fontWeight: 300,
        color: '#F2EDE4',
        letterSpacing: '-0.01em',
      }}>
        Loading
      </div>

      {/* Percentage */}
      <span ref={pctRef} style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        letterSpacing: '0.25em',
        color: 'rgba(242,237,228,0.45)',
      }}>
        {pct}%
      </span>

      {/* INDIA — in flow below the %, fades up from slight offset */}
      <div ref={titleRef} style={{
        opacity: 0,
        transform: 'translateY(24px)',
        marginTop: '8px',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(48px, 8vw, 120px)',
        fontWeight: 300,
        letterSpacing: '0.12em',
        color: '#F2EDE4',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}>
        INDIA
      </div>
    </div>
  )
}
