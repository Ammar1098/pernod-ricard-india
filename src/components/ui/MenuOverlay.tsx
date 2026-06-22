'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80'

const items = [
  { num: '001', label: 'Home',           href: '/',              sub: 'Welcome',        img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80' },
  { num: '002', label: 'Our Group',      href: '/group',         sub: 'Who we are',     img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80' },
  { num: '003', label: 'Brands',         href: '/brands',        sub: '66+ brands',     img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80' },
  { num: '004', label: 'Sustainability', href: '/sustainability', sub: '2030 Roadmap',   img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80' },
  { num: '005', label: 'Newsroom',       href: '/news',          sub: 'Latest updates', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80' },
]

interface Props { open: boolean; onClose: () => void }

export default function MenuOverlay({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef   = useRef<(HTMLLIElement | null)[]>([])
  const [hoveredImg, setHoveredImg] = useState<string | null>(null)

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
      setHoveredImg(null)
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
              onMouseEnter={() => setHoveredImg(item.img)}
              onMouseLeave={() => setHoveredImg(null)}
              style={{
                borderBottom: '1px solid rgba(242,237,228,0.08)',
                padding: 'clamp(20px, 3vh, 28px) 0',
                display: 'grid',
                gridTemplateColumns: 'clamp(48px, 6vw, 72px) 1fr auto',
                alignItems: 'center',
                gap: '16px',
                opacity: 0,
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

        {/* Footer — main logo */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '40px',
          borderTop: '1px solid rgba(242,237,228,0.08)',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-white.png"
            alt="Pernod Ricard India"
            style={{ width: '200px', height: 'auto', opacity: 0.85 }}
          />
        </div>
      </div>

      {/* Right — editorial image panel with crossfade */}
      <div style={{
        width: '38%',
        position: 'relative',
        overflow: 'hidden',
        display: 'var(--menu-panel-display, flex)',
        flexDirection: 'column',
      }}>
        {/* Layer 1: default image — always present underneath */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${DEFAULT_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />

        {/* Layer 2: hovered image — crossfades over layer 1 */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: hoveredImg ? `url(${hoveredImg})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: hoveredImg ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }} />

        {/* Dark overlay — always on top of both image layers */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Text — above everything */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '80px 48px',
          zIndex: 2,
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
