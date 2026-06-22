'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    num: '01', word: 'Craft',
    body: 'We make things properly. From sourcing to bottling, quality is the only standard we recognise — across Indian-made and international brands alike.',
    img: 'https://images.unsplash.com/photo-1528717384022-f8d665c86909?w=1200&q=80',
  },
  {
    num: '02', word: 'Conviviality',
    body: 'We exist for the moments people share. We market our brands responsibly and ask only that they are enjoyed in good company and good measure.',
    img: 'https://images.unsplash.com/photo-1542338332-76971ae8c292?w=1200&q=80',
  },
  {
    num: '03', word: 'Responsibility',
    body: 'We hold ourselves to the same standard as our craft: careful with water and soil, fair with people, and honest in how we communicate.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
  },
  {
    num: '04', word: 'Entrepreneurship',
    body: 'We give our teams the freedom to act like owners. Decentralised by design, accountable by culture.',
    img: 'https://images.unsplash.com/photo-1504346466600-714572c4b726?w=1200&q=80',
  },
]

export default function PhilosophySection() {
  const rows = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    rows.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
          delay: i * 0.08,
        }
      )
    })
  }, [])

  return (
    <section style={{
      background: '#F2EDE4',
      padding: 'clamp(64px, 12vh, 160px) clamp(24px, 8vw, 120px)',
      borderTop: '1px solid rgba(14,14,14,0.08)',
    }}>
      <p style={{
        fontSize: '13px', letterSpacing: '0.2em',
        textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A',
        marginBottom: 'clamp(48px, 8vh, 80px)',
      }}>
        What we stand for
      </p>

      <div>
        {pillars.map((p, i) => (
          <div
            key={i}
            ref={el => { rows.current[i] = el }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(32px, 5vw, 72px)',
              alignItems: 'center',
              padding: 'clamp(32px, 5vh, 56px) 0',
              borderTop: '1px solid rgba(14,14,14,0.1)',
              opacity: 0,
            }}
          >
            {/* LEFT — number + title + body */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(14px, 2.5vw, 36px)', marginBottom: 'clamp(12px, 2vh, 20px)' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#BFA05A', flexShrink: 0 }}>
                  {p.num}
                </span>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.5vw, 72px)',
                  fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
                  color: '#0E0E0E',
                }}>
                  {p.word}
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                lineHeight: 1.8,
                color: 'rgba(14,14,14,0.55)',
                paddingLeft: 'clamp(26px, 4vw, 96px)',
                margin: 0,
              }}>
                {p.body}
              </p>
            </div>

            {/* RIGHT — image */}
            <div style={{
              height: 'clamp(200px, 30vh, 380px)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.word}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(14,14,14,0.1)' }} />
      </div>
    </section>
  )
}
