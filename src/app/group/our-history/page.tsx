'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GLOBAL_EVENTS = [
  { year: '1715',  title: 'Martell is founded',       body: 'Jean Martell establishes his cognac house in the town of Cognac — the oldest lineage in the group still in the bottle today.' },
  { year: '1780',  title: 'Jameson, in Dublin',        body: 'John Jameson founds the Bow Street distillery, beginning a tradition of triple-distilled Irish whiskey.' },
  { year: '1805',  title: 'The lineage continues',     body: 'Maison Pernod opens in France. The craft and the name that will anchor the house enter the world.' },
  { year: '1824',  title: 'The Glenlivet is licensed', body: 'George Smith takes the first licence in the Livet valley, defining the Speyside single malt for two centuries to come.' },
  { year: '1827',  title: 'Champagne Mumm',            body: 'G.H. Mumm is founded in Reims, in time becoming one of the most celebrated champagne houses in the world.' },
  { year: '1909',  title: 'Chivas Regal',              body: 'The Chivas brothers of Aberdeen craft a 25-year-old blend, founding a name now synonymous with luxury Scotch.' },
  { year: '1934',  title: 'Havana Club',               body: 'Havana Club is established in Cuba, carrying the island\'s rum-making heritage onto the world stage.' },
  { year: '1975',  title: 'Two families, one vision',  body: 'Pernod and Ricard merge to form Pernod Ricard, a French house with global ambition.' },
  { year: '1979',  title: 'Absolut, reinvented',       body: 'Absolut Vodka launches from Åhus, Sweden, becoming a global icon of design and craft.' },
]

const INDIA_EVENTS = [
  { year: '1993',  title: 'India begins',               body: 'Pernod Ricard India is incorporated — an early bet on the country\'s appetite for premium spirits.' },
  { year: '1995',  title: 'Made for India',             body: 'Royal Stag and Blenders Pride are created for the Indian market, the foundations of a locally made portfolio.' },
  { year: '2001',  title: 'An Indian portfolio',        body: 'The group\'s acquisition of Seagram brings Royal Stag, Blenders Pride and 100 Pipers into the house.' },
  { year: '2010s', title: 'Trading up',                 body: 'Premiumisation accelerates; the network grows to more than thirty bottling plants and distilleries at Nashik and Behror.' },
  { year: '2021',  title: 'A good place',               body: 'The "Good Times from a Good Place" 2030 roadmap drives water stewardship and community action across India.' },
  { year: '2023',  title: 'A new chapter',              body: 'Jean Touboul is appointed Managing Director & CEO, continuing the transformation of the India business.' },
  { year: 'Today', title: 'Among India\'s largest',     body: 'The second-largest spirits company in India by revenue, manufacturing nationwide and building for the decades ahead.' },
]

const BRANDS = [
  { name: 'Chivas Regal',   cat: 'Scotch Whisky' },
  { name: 'The Glenlivet',  cat: 'Scotch Whisky' },
  { name: "Ballantine's",   cat: 'Scotch Whisky' },
  { name: 'Jameson',        cat: 'Irish Whiskey' },
  { name: 'Absolut',        cat: 'Vodka' },
  { name: 'Beefeater',      cat: 'Gin' },
  { name: 'Martell',        cat: 'Cognac & Brandy' },
  { name: 'Mumm',           cat: 'Champagne' },
  { name: 'Havana Club',    cat: 'Rum' },
  { name: 'Royal Salute',   cat: 'Scotch Whisky' },
  { name: 'Perrier-Jouët',  cat: 'Champagne' },
  { name: 'Redbreast',      cat: 'Irish Whiskey' },
  { name: 'Royal Stag',     cat: 'World Whiskies' },
  { name: 'Monkey 47',      cat: 'Gin' },
]

/* ── sub-components ── */

function GlobalRow({ year, title, body }: { year: string; title: string; body: string }) {
  return (
    <div
      data-grow
      style={{
        opacity: 0,
        display: 'grid',
        gridTemplateColumns: 'clamp(52px,7vw,96px) 1fr',
        gap: '0 clamp(20px,3vw,52px)',
        alignItems: 'start',
        padding: 'clamp(22px,3vh,36px) 0',
        borderTop: '1px solid rgba(14,14,14,0.09)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(11px,0.95vw,14px)',
        letterSpacing: '0.04em',
        color: 'rgba(14,14,14,0.3)',
        paddingTop: '7px',
        lineHeight: 1,
      }}>
        {year}
      </span>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px,3.2vw,48px)',
          fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
          color: 'rgba(14,14,14,0.62)',
          marginBottom: 'clamp(10px,1.5vh,18px)',
        }}>
          {title}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.82,
          color: 'rgba(14,14,14,0.38)', margin: 0,
          maxWidth: '540px',
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

function IndiaRow({ year, title, body }: { year: string; title: string; body: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-irow
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'grid',
        gridTemplateColumns: 'clamp(52px,7vw,96px) 1fr',
        gap: '0 clamp(20px,3vw,52px)',
        alignItems: 'start',
        padding: 'clamp(22px,3vh,36px) clamp(16px,2vw,28px)',
        borderTop: '1px solid rgba(191,160,90,0.2)',
        background: hov ? 'rgba(191,160,90,0.05)' : 'transparent',
        transition: 'background 0.3s',
        cursor: 'default',
      }}
    >
      <div style={{ paddingTop: '7px' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(11px,0.95vw,14px)',
          letterSpacing: '0.04em',
          color: '#BFA05A',
          lineHeight: 1,
          display: 'block',
        }}>
          {year}
        </span>
        <div style={{
          width: '4px', height: '4px', borderRadius: '50%',
          background: '#BFA05A', marginTop: '10px',
          opacity: hov ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }} />
      </div>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px,3.4vw,52px)',
          fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
          color: hov ? '#0E0E0E' : 'rgba(14,14,14,0.82)',
          marginBottom: 'clamp(10px,1.5vh,18px)',
          transition: 'color 0.3s',
        }}>
          {title}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.82,
          color: hov ? 'rgba(14,14,14,0.55)' : 'rgba(14,14,14,0.4)',
          margin: 0, maxWidth: '540px',
          transition: 'color 0.3s',
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

function BrandTile({ name, cat }: { name: string; cat: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-btile
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        padding: 'clamp(20px,3vh,32px) clamp(16px,2vw,28px)',
        borderRight: '1px solid rgba(242,237,228,0.07)',
        borderBottom: '1px solid rgba(242,237,228,0.07)',
        background: hov ? 'rgba(191,160,90,0.08)' : 'transparent',
        transition: 'background 0.3s',
        cursor: 'default',
      }}
    >
      <div style={{
        fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase',
        color: hov ? '#BFA05A' : 'rgba(191,160,90,0.4)',
        marginBottom: '10px',
        transition: 'color 0.3s',
      }}>
        {cat}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(16px,1.6vw,24px)',
        fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.1,
        color: hov ? '#F2EDE4' : 'rgba(242,237,228,0.6)',
        transition: 'color 0.3s',
      }}>
        {name}
      </div>
    </div>
  )
}

/* ── page ── */

export default function HistoryPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const heroRef    = useRef<HTMLElement>(null)
  const stmtRef    = useRef<HTMLElement>(null)
  const globalRef  = useRef<HTMLElement>(null)
  const indiaRef   = useRef<HTMLElement>(null)
  const brandsRef  = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
  }, [])

  /* hero animation */
  useEffect(() => {
    if (!heroRef.current) return
    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo('[data-hlbl]',  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo('[data-hln]',   { y: '108%' },          { y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.08 }, '-=0.3')
      .fromTo('[data-hsb]',   { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
      .fromTo('[data-hspan]', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'left' }, '-=0.4')
  }, [])

  /* statement reveal */
  useEffect(() => {
    if (!stmtRef.current) return
    const chars = stmtRef.current.querySelectorAll('[data-sc]')
    gsap.fromTo(chars,
      { color: 'rgba(14,14,14,0.07)' },
      {
        color: 'rgba(14,14,14,0.9)',
        stagger: 0.012,
        ease: 'none',
        scrollTrigger: {
          trigger: stmtRef.current,
          start: 'top 70%',
          end: 'bottom 35%',
          scrub: 0.8,
        },
      }
    )
  }, [])

  /* global events stagger */
  useEffect(() => {
    if (!globalRef.current) return
    gsap.fromTo(globalRef.current.querySelectorAll('[data-grow]'),
      { opacity: 0, x: -32 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: globalRef.current, start: 'top 80%' } }
    )
  }, [])

  /* india events stagger */
  useEffect(() => {
    if (!indiaRef.current) return
    gsap.fromTo(indiaRef.current.querySelectorAll('[data-irow]'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: indiaRef.current, start: 'top 82%' } }
    )
  }, [])

  /* brands stagger */
  useEffect(() => {
    if (!brandsRef.current) return
    gsap.fromTo(brandsRef.current.querySelectorAll('[data-btile]'),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        stagger: { each: 0.04, from: 'start' },
        scrollTrigger: { trigger: brandsRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <div ref={pageRef} style={{ background: '#080A10', minHeight: '100vh', opacity: 0 }}>

      {/* ── NAV — dark ── */}
      <div style={{ background: '#080A10' }}>
        <Nav />
      </div>

      {/* ── HERO — dark ── */}
      <section ref={heroRef} style={{
        background: '#080A10',
        padding: '0 clamp(24px,6vw,80px) clamp(56px,8vh,100px)',
        overflow: 'hidden',
      }}>
        <div style={{ height: '1px', background: 'rgba(242,237,228,0.08)', marginBottom: 'clamp(28px,4vh,44px)' }} />

        <div data-hlbl style={{ opacity: 0, marginBottom: '14px' }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A' }}>
            Pernod Ricard India · Our History
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(44px,8.5vw,128px)',
          fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
          color: '#F2EDE4', margin: '0 0 clamp(28px,4vh,48px)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block' }}>A lineage from 1805.</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block', color: 'rgba(242,237,228,0.22)', fontStyle: 'italic' }}>A business built in</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block' }}>India since 1993.</span>
          </div>
        </h1>

        <div data-hsb style={{
          opacity: 0,
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.8,
            color: 'rgba(242,237,228,0.4)', margin: 0, maxWidth: '420px',
          }}>
            The story of Pernod Ricard in India joins two centuries of French craft to three decades of patient, premium brand-building in one of the world's most dynamic markets.
          </p>

          {/* timeline span indicator */}
          <div data-hspan style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, alignSelf: 'flex-end' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,34px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'rgba(242,237,228,0.3)', lineHeight: 1 }}>1715</span>
            <div style={{ width: 'clamp(40px,6vw,100px)', height: '1px', background: 'rgba(191,160,90,0.4)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,34px)', fontWeight: 300, letterSpacing: '-0.02em', color: '#BFA05A', lineHeight: 1 }}>Today</span>
          </div>
        </div>
      </section>

      {/* ── STATEMENT — character reveal ── */}
      <section
        ref={stmtRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(72px,12vh,140px) clamp(24px,8vw,120px)',
          borderTop: '1px solid rgba(242,237,228,0.06)',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px,3.8vw,56px)',
          fontWeight: 300, lineHeight: 1.25, letterSpacing: '-0.01em',
          maxWidth: '1000px', margin: 0,
        }}>
          {'The story of Pernod Ricard in India joins two centuries of French craft to three decades of patient, premium brand-building in one of the world\'s most dynamic markets.'.split('').map((ch, i) => (
            <span key={i} data-sc style={{ color: 'rgba(14,14,14,0.07)' }}>{ch}</span>
          ))}
        </p>
      </section>

      {/* ── GLOBAL HERITAGE ── */}
      <section
        ref={globalRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(56px,8vh,96px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        {/* section header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(16px,2.5vw,40px)',
          marginBottom: 'clamp(40px,6vh,64px)',
        }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0, flexShrink: 0 }}>
            Global heritage
          </p>
          <div style={{ flex: 1, height: '1px', background: 'rgba(14,14,14,0.1)' }} />
          <span style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(14,14,14,0.28)', flexShrink: 0 }}>1715 – 1979</span>
        </div>

        {/* rows */}
        <div>
          {GLOBAL_EVENTS.map((e, i) => (
            <GlobalRow key={i} {...e} />
          ))}
          <div style={{ borderTop: '1px solid rgba(14,14,14,0.09)' }} />
        </div>
      </section>

      {/* ── CHAPTER BREAK ── */}
      <div style={{
        background: '#0E0E0E',
        padding: 'clamp(48px,7vh,80px) clamp(24px,6vw,80px)',
        display: 'flex', alignItems: 'center', gap: 'clamp(20px,4vw,64px)',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: '0 0 auto' }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 16px' }}>
            India chapter
          </p>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px,8vw,120px)',
            fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.88,
            color: '#F2EDE4',
          }}>
            1993.
          </div>
        </div>
        <div style={{ flex: '1 1 clamp(200px,35vw,460px)' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px,1.3vw,17px)', lineHeight: 1.82,
            color: 'rgba(242,237,228,0.38)', margin: 0,
          }}>
            Pernod Ricard India is incorporated — an early bet on the country's appetite for premium spirits. What follows is three decades of patient, disciplined brand-building.
          </p>
        </div>
      </div>

      {/* ── INDIA EVENTS ── */}
      <section
        ref={indiaRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(56px,8vh,96px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        {/* section header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(16px,2.5vw,40px)',
          marginBottom: 'clamp(40px,6vh,64px)',
        }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0, flexShrink: 0 }}>
            In India
          </p>
          <div style={{ flex: 1, height: '1px', background: 'rgba(191,160,90,0.25)' }} />
          <span style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#BFA05A', flexShrink: 0, opacity: 0.55 }}>1993 – Today</span>
        </div>

        {/* rows */}
        <div>
          {INDIA_EVENTS.map((e, i) => (
            <IndiaRow key={i} {...e} />
          ))}
          <div style={{ borderTop: '1px solid rgba(191,160,90,0.2)' }} />
        </div>
      </section>

      {/* ── BRANDS — dark grid ── */}
      <section
        ref={brandsRef}
        style={{
          background: '#0E0E0E',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(242,237,228,0.06)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '24px', marginBottom: 'clamp(44px,6vh,64px)',
        }}>
          <div>
            <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 14px' }}>
              A house of brands
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px,4.5vw,68px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#F2EDE4',
            }}>
              Two centuries of houses,<br />
              <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>one company.</em>
            </div>
          </div>
          <Link
            href="/brands"
            style={{
              fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#BFA05A', textDecoration: 'none',
              padding: '10px 20px',
              border: '1px solid rgba(191,160,90,0.4)',
              transition: 'background 0.25s, color 0.25s',
              whiteSpace: 'nowrap', alignSelf: 'flex-end', display: 'block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#BFA05A'; e.currentTarget.style.color = '#0E0E0E' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#BFA05A' }}
          >
            Explore all brands →
          </Link>
        </div>

        {/* 4-col brand tiles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px,20vw,220px), 1fr))',
          border: '1px solid rgba(242,237,228,0.07)',
          borderRight: 'none',
          borderBottom: 'none',
        }}>
          {BRANDS.map((b, i) => (
            <BrandTile key={i} {...b} />
          ))}
        </div>
      </section>

    </div>
  )
}
