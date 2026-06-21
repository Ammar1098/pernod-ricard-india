'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import gsap from 'gsap'
import Nav from '@/components/ui/Nav'
import { BRAND_BY_SLUG } from '@/data/brands'

export default function BrandPDP() {
  const { slug } = useParams<{ slug: string }>()
  const brand = BRAND_BY_SLUG[slug]

  const heroRef    = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    if (!heroRef.current) return
    gsap.fromTo(heroRef.current.querySelectorAll('[data-hero]'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14, delay: 0.2 }
    )
  }, [brand])

  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(contentRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1, delay: 0.1 }
    )
  }, [brand])

  if (!brand) {
    return (
      <div style={{ minHeight: '100vh', background: '#080A10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
        <Nav />
        <p style={{ color: 'rgba(242,237,228,0.4)', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300 }}>Brand not found.</p>
        <Link href="/brands" style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BFA05A', textDecoration: 'none' }}>
          ← Back to Brands
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#080A10', minHeight: '100vh' }}>
      <Nav />

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          height: 'clamp(520px, 90vh, 900px)',
          overflow: 'hidden',
          background: '#0A0C14',
        }}
      >
        {/* hero image */}
        <img
          src={brand.heroImg}
          alt={brand.name}
          decoding="async"
          fetchPriority="high"
          onLoad={() => setImgLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />

        {/* dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(
            135deg,
            rgba(6,8,14,0.85) 0%,
            rgba(6,8,14,0.35) 50%,
            rgba(6,8,14,0.65) 100%
          )`,
        }} />

        {/* bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '50%',
          background: 'linear-gradient(to bottom, transparent, #080A10)',
        }} />

        {/* hero content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'clamp(80px,12vh,140px) clamp(24px,6vw,80px) clamp(48px,8vh,80px)',
        }}>
          {/* back + category */}
          <div data-hero style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            <Link
              href="/brands"
              style={{
                fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'rgba(242,237,228,0.5)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#BFA05A')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.5)')}
            >
              ← All Brands
            </Link>
            <div style={{ width: '1px', height: '12px', background: 'rgba(242,237,228,0.2)' }} />
            <span style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BFA05A', opacity: 0.75 }}>
              {brand.cat}
            </span>
          </div>

          {/* name */}
          <h1
            data-hero
            style={{
              opacity: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px,10vw,148px)',
              fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
              color: '#F2EDE4', margin: '0 0 clamp(16px,2.5vh,28px)',
            }}
          >
            {brand.name}
          </h1>

          {/* tagline */}
          <p
            data-hero
            style={{
              opacity: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(15px,1.6vw,22px)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(242,237,228,0.45)',
              margin: 0, maxWidth: '580px', lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            {brand.tagline}
          </p>

          {/* origin pill */}
          <div data-hero style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '12px', marginTop: '28px' }}>
            <div style={{ width: '28px', height: '1px', background: '#BFA05A' }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(242,237,228,0.35)' }}>
              {brand.origin}
            </span>
          </div>
        </div>
      </div>

      {/* ── CONTENT BODY ── */}
      <div
        ref={contentRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(56px,9vh,100px) clamp(24px,6vw,80px)',
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.35fr) minmax(0,1fr)',
          gap: 'clamp(40px,6vw,100px)',
          alignItems: 'start',
        }}>

          {/* LEFT — description + facts */}
          <div>
            {/* section label */}
            <div data-reveal style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
              <span style={{ fontSize: '7px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A', opacity: 0.8 }}>
                About
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(14,14,14,0.1)' }} />
            </div>

            {/* description */}
            <p
              data-reveal
              style={{
                opacity: 0,
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(18px,1.8vw,26px)',
                fontWeight: 300, lineHeight: 1.6,
                color: '#0E0E0E', margin: '0 0 clamp(48px,7vh,72px)',
                letterSpacing: '-0.01em',
              }}
            >
              {brand.description}
            </p>

            {/* facts */}
            <div data-reveal style={{ opacity: 0 }}>
              <div style={{ fontSize: '7px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A', opacity: 0.8, marginBottom: '20px' }}>
                Key Facts
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0',
              }}>
                {brand.facts.map((fact, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 'clamp(14px,2vh,20px) 0',
                      borderBottom: '1px solid rgba(14,14,14,0.08)',
                      borderRight: i % 2 === 0 ? '1px solid rgba(14,14,14,0.08)' : 'none',
                      paddingRight: i % 2 === 0 ? 'clamp(16px,2vw,28px)' : '0',
                      paddingLeft: i % 2 === 1 ? 'clamp(16px,2vw,28px)' : '0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#BFA05A', flexShrink: 0, marginTop: '5px' }} />
                    <span style={{ fontSize: '11px', lineHeight: 1.6, color: 'rgba(14,14,14,0.6)' }}>
                      {fact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — bottle packshot */}
          <div
            data-reveal
            style={{
              opacity: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(24px,4vw,48px)',
              background: 'rgba(14,14,14,0.03)',
              minHeight: 'clamp(300px,50vh,520px)',
            }}
          >
            <img
              src={brand.bottleImg}
              alt={`${brand.name} bottle`}
              decoding="async"
              loading="lazy"
              style={{
                maxWidth: '100%',
                maxHeight: 'clamp(280px,48vh,500px)',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 20px 50px rgba(14,14,14,0.15))',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── GALLERY ── */}
      {brand.galleryImgs.length > 0 && (
        <div style={{ background: '#080A10', padding: 'clamp(48px,8vh,80px) clamp(24px,6vw,80px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'clamp(28px,4vh,44px)' }}>
            <span style={{ fontSize: '7px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A', opacity: 0.7 }}>Gallery</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(242,237,228,0.06)' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: brand.galleryImgs.length >= 3
              ? 'repeat(3, 1fr)'
              : `repeat(${brand.galleryImgs.length}, 1fr)`,
            gap: '3px',
          }}>
            {brand.galleryImgs.map((src, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  background: '#0A0C14',
                }}
              >
                <img
                  src={src}
                  alt={`${brand.name} ${i + 1}`}
                  decoding="async"
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FOOTER BAR ── */}
      <div style={{
        padding: 'clamp(24px,4vh,36px) clamp(24px,6vw,80px)',
        background: '#080A10',
        borderTop: '1px solid rgba(242,237,228,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'rgba(242,237,228,0.15)', letterSpacing: '0.08em' }}>
          Pernod Ricard India · {brand.cat}
        </span>
        <Link
          href="/brands"
          style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BFA05A', textDecoration: 'none', opacity: 0.65, transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
        >
          ← All Brands
        </Link>
      </div>
    </div>
  )
}
