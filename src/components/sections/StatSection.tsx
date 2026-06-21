'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { v: 1993, s: '',  l: 'In India since' },
  { v: 30,   s: '+', l: 'Bottling plants nationwide' },
  { v: 1400, s: '+', l: 'Employees in India' },
  { v: 70,   s: '+', l: 'Countries — global group' },
]

function Count({ to, go }: { to: number; go: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    let start: number | null = null
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1800, 1)
      setN(Math.round(ease(p) * to))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [go, to])
  return <>{n}</>
}

export default function StatSection() {
  const ref = useRef<HTMLElement>(null)
  const [go, setGo] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({ trigger: ref.current, start: 'top 65%', onEnter: () => setGo(true) })
  }, [])

  return (
    <section ref={ref} style={{
      background: '#F2EDE4',
      padding: 'clamp(80px, 12vh, 160px) clamp(32px, 8vw, 120px)',
      borderTop: '1px solid rgba(14,14,14,0.08)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BFA05A', marginBottom: 'clamp(32px, 5vh, 80px)' }}>
        By the numbers
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'clamp(40px, 6vh, 64px) clamp(24px, 4vw, 48px)',
        justifyItems: 'center',
        textAlign: 'center',
      }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 10vw, 130px)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#0E0E0E',
            }}>
              <Count to={s.v} go={go} />{s.s}
            </div>
            <div style={{
              marginTop: '16px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(14,14,14,0.45)',
            }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
