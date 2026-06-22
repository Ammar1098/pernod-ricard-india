'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SustainabilitySection() {
  const headRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current,
      { y: 70, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.4, ease: 'power4.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 72%' },
      }
    )
  }, [])

  return (
    <section style={{
      background: '#0A0C14',
      padding: 'clamp(80px, 12vh, 200px) clamp(24px, 8vw, 120px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-60px', right: '-40px',
        fontFamily: 'var(--font-display)', fontSize: '380px', fontWeight: 300,
        color: 'rgba(191,160,90,0.04)', lineHeight: 1,
        pointerEvents: 'none', userSelect: 'none',
      }}>2030</div>

      <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', marginBottom: 'clamp(24px, 4vh, 48px)' }}>
        Sustainability &amp; Responsibility · 2030 Roadmap
      </p>

      <h2 ref={headRef} style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(52px, 8.5vw, 120px)',
        fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.0,
        color: '#F2EDE4', maxWidth: '800px', marginBottom: 'clamp(32px, 5vh, 64px)', opacity: 0,
      }}>
        Good times<br />from a{' '}
        <span style={{ color: '#BFA05A' }}>good place.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(140px, 40vw, 200px),1fr))', gap: 'clamp(24px, 4vh, 40px)', maxWidth: '700px', marginBottom: 'clamp(48px, 8vh, 80px)' }}>
        {['Nurturing terroir', 'Valuing people', 'Circular making', 'Responsible hosting'].map((item, i) => (
          <div key={i} style={{ borderTop: '1px solid rgba(191,160,90,0.25)', paddingTop: '24px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#BFA05A', marginBottom: '12px', textTransform: 'uppercase' }}>
              0{i + 1}
            </div>
            <div style={{ fontSize: '15px', color: 'rgba(242,237,228,0.5)', lineHeight: 1.6 }}>{item}</div>
          </div>
        ))}
      </div>

      <a href="/sustainability" style={{
        display: 'inline-flex', alignItems: 'center', gap: '16px', textDecoration: 'none',
        fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#BFA05A', borderBottom: '1px solid rgba(191,160,90,0.4)', paddingBottom: '4px',
      }}>
        Read the 2030 roadmap <span style={{ fontSize: '16px' }}>→</span>
      </a>
    </section>
  )
}
