'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

const items = [
  { num: '001', label: 'Home',           href: '/',              sub: 'Welcome' },
  { num: '002', label: 'Our Group',      href: '/group',         sub: 'Who we are' },
  { num: '003', label: 'Brands',         href: '/brands',        sub: '66+ brands' },
  { num: '004', label: 'Sustainability', href: '/sustainability', sub: '2030 Roadmap' },
  { num: '005', label: 'Newsroom',       href: '/news',          sub: 'Latest updates' },
]

interface Props { open: boolean; onClose: () => void }

export default function MenuOverlay({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef   = useRef<(HTMLLIElement | null)[]>([])
  const activeImg  = useRef<HTMLDivElement>(null)

  const gradients = [
    'linear-gradient(135deg,#1C2040,#0A0C14)',
    'linear-gradient(135deg,#2A1A10,#0A0C14)',
    'linear-gradient(135deg,#0A1A20,#0A0C14)',
    'linear-gradient(135deg,#1A200A,#0A0C14)',
    'linear-gradient(135deg,#200A1A,#0A0C14)',
  ]

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (open) {
      gsap.set(overlay, { display: 'flex' })
      const tl = gsap.timeline()
      tl.fromTo(overlay,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power4.inOut' }
      )
      .fromTo(itemsRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
    } else {
      const tl = gsap.timeline({ onComplete: () => gsap.set(overlay, { display: 'none' }) })
      tl.to(itemsRef.current, { opacity: 0, y: -16, stagger: 0.04, duration: 0.3, ease: 'power2.in' })
      tl.to(overlay,
        { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65, ease: 'power4.inOut' },
        '-=0.1'
      )
    }
  }, [open])

  return (
    <div ref={overlayRef} style={{
      display: 'none',
      position: 'fixed', inset: 0, zIndex: 3000,
      background: '#0A0C14',
      clipPath: 'inset(100% 0% 0% 0%)',
      flexDirection: 'row',
      overflowY: 'auto',
      pointerEvents: 'auto',
    }}>
      {/* Left — numbered nav items */}
      <div style={{
        flex: 1,
        padding: 'clamp(80px, 12vh, 120px) clamp(24px, 6vw, 80px) clamp(40px, 5vh, 56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
        isolation: 'isolate',
      }}>
        {/* Close */}
        <div style={{ position: 'absolute', top: '36px', left: 'clamp(24px, 4vw, 48px)' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: '#F2EDE4',
              fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              minWidth: '44px', minHeight: '44px',
              display: 'flex', alignItems: 'center',
            }}
          >
            Close
          </button>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {items.map((item, i) => (
            <li
              key={item.href}
              ref={el => { itemsRef.current[i] = el }}
              style={{
                borderBottom: '1px solid rgba(242,237,228,0.08)',
                padding: 'clamp(20px, 3vh, 28px) 0',
                display: 'grid',
                gridTemplateColumns: 'clamp(48px, 6vw, 72px) 1fr auto',
                alignItems: 'center',
                gap: '16px',
                opacity: 0,
              }}
              onMouseEnter={() => {
                if (activeImg.current) {
                  activeImg.current.style.background = gradients[i]
                }
              }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'rgba(242,237,228,0.3)',
              }}>{item.num}</span>

              <Link
                href={item.href}
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: '#F2EDE4',
                  textDecoration: 'none',
                  lineHeight: 1,
                  transition: 'color 0.25s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#BFA05A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#F2EDE4')}
              >
                {item.label}
              </Link>

              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'rgba(242,237,228,0.3)',
                textTransform: 'uppercase',
                display: 'var(--sub-label-display, block)',
              }}>{item.sub}</span>
            </li>
          ))}
        </ul>

        {/* Footer — brand logos + tagline */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '40px',
          borderTop: '1px solid rgba(242,237,228,0.08)',
        }}>
          {/* Key brand logo strip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)',
            flexWrap: 'wrap', marginBottom: '20px',
          }}>
            {['royal-stag', 'chivas-regal', 'jameson', 'absolut', 'martell', 'beefeater'].map(slug => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={slug}
                src={`/logos/${slug}.png`}
                alt={slug}
                style={{
                  height: 'clamp(16px, 2vw, 22px)',
                  width: 'auto',
                  maxWidth: '80px',
                  objectFit: 'contain',
                  opacity: 0.55,
                  filter: 'brightness(10)',
                  display: 'block',
                }}
              />
            ))}
          </div>

          {/* Main logo + tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="/images/logo-white.png"
              alt="Pernod Ricard India"
              style={{ height: '28px', width: 'auto', opacity: 0.75 }}
            />
            <span style={{
              fontSize: '9px',
              letterSpacing: '0.28em',
              color: 'rgba(242,237,228,0.3)',
              textTransform: 'uppercase',
            }}>
              Créateurs de convivialité
            </span>
          </div>
        </div>
      </div>

      {/* Right — editorial color panel (hidden ≤1024px via CSS var) */}
      <div ref={activeImg} style={{
        width: '38%',
        background: 'linear-gradient(135deg,#1C2040,#0A0C14)',
        transition: 'background 0.5s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'var(--menu-panel-display, flex)',
        flexDirection: 'column',
      }}>
        <div style={{
          position: 'absolute', bottom: '-40px', right: '-20px',
          fontFamily: 'var(--font-display)',
          fontSize: '320px',
          fontWeight: 300,
          color: 'rgba(242,237,228,0.04)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}>PR</div>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '80px 48px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '18px',
            color: 'rgba(242,237,228,0.4)',
            marginBottom: '16px',
          }}>Since 1993 in India</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 300,
            color: '#F2EDE4',
            lineHeight: 1.15,
          }}>
            One of India&apos;s largest<br />premium spirits companies.
          </div>
        </div>
      </div>
    </div>
  )
}
