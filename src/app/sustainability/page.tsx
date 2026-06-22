'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── tokens ── */
const G  = '#0D0D0D'
const G2 = '#1a1a1a'
const G0 = '#111111'
const AU = '#C9A96E'
const CR = '#F5F0E8'
const BK = '#111111'

/* ── data ── */
const STATS = [
  { display: '5L+',  label: 'People reached by community programmes' },
  { display: '13',   label: 'States and 3 union territories' },
  { display: '2030', label: 'Target year for water-balanced operations' },
  { display: '100%', label: 'Reusable, recyclable or compostable packaging goal' },
]

const PILLARS = [
  {
    num: '01', label: 'NURTURING TERROIR',
    title: 'Nurturing Terroir',
    body: 'Protecting water, soil and biodiversity through regenerative agriculture and water stewardship with the farming communities we source from.',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
  },
  {
    num: '02', label: 'VALUING PEOPLE',
    title: 'Valuing People',
    body: "Inclusive, safe and fair workplaces, and thriving communities, through education, livelihoods and women's empowerment programmes across India.",
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  },
  {
    num: '03', label: 'CIRCULAR MAKING',
    title: 'Circular Making',
    body: 'Eco-designed, reusable and recyclable packaging, and a clear path to lower-carbon, more efficient manufacturing.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
  },
  {
    num: '04', label: 'RESPONSIBLE HOSTING',
    title: 'Responsible Hosting',
    body: 'Programmes that address the misuse of alcohol and make moderation part of conviviality, in line with Indian advertising and surrogate guidelines.',
    img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80',
  },
]

const GOALS = [
  { label: 'Water-balanced in high-risk watersheds by 2030', pct: 68 },
  { label: '100% packaging reusable, recyclable or compostable', pct: 72 },
  { label: 'Carbon reduction across full value chain', pct: 45 },
  { label: 'Women in leadership positions', pct: 81 },
  { label: 'Community programme reach across India', pct: 89 },
]

const INDIA_ACTIONS = [
  {
    num: '01',
    title: 'Water stewardship',
    body: "Community farm ponds and watershed projects near our plants help secure year-round water for agriculture, working towards being water-balanced in India's high-risk watersheds by 2030.",
  },
  {
    num: '02',
    title: 'Agriculture & livelihoods',
    body: 'Programmes with farming communities improve incomes and resilience while supporting responsible soil and water practices in our supply chain.',
  },
  {
    num: '03',
    title: 'Responsible drinking',
    body: 'Awareness and prevention programmes, delivered responsibly and in full compliance with Indian advertising and surrogate guidelines for the category.',
  },
]

const TIMELINE_STEPS = [
  { year: '2019', text: 'Good Times from a Good Place strategy launched globally' },
  { year: '2021', text: '2030 roadmap targets published across all markets' },
  { year: '2023', text: '5 lakh+ people reached through India Foundation' },
  { year: '2025', text: 'Interim packaging & water milestone targets' },
  { year: '2030', text: 'Full roadmap: water-balanced, circular packaging, carbon neutral' },
]

const BRANDS = [
  { name: 'Chivas Regal',   cat: 'Scotch Whisky',   slug: 'chivas' },
  { name: 'The Glenlivet',  cat: 'Scotch Whisky',   slug: 'the-glenlivet' },
  { name: "Ballantine's",   cat: 'Scotch Whisky',   slug: 'ballantines' },
  { name: 'Jameson',        cat: 'Irish Whiskey',   slug: 'jameson' },
  { name: 'Absolut',        cat: 'Vodka',           slug: 'absolut' },
  { name: 'Beefeater',      cat: 'Gin',             slug: 'beefeater' },
  { name: 'Martell',        cat: 'Cognac & Brandy', slug: 'martell' },
  { name: 'Mumm',           cat: 'Champagne',       slug: 'mumm' },
  { name: 'Havana Club',    cat: 'Rum',             slug: 'havana-club' },
  { name: 'Royal Salute',   cat: 'Scotch Whisky',   slug: 'royal-salute' },
  { name: 'Perrier-Jouët',  cat: 'Champagne',       slug: 'perrier-jouet' },
  { name: 'Redbreast',      cat: 'Irish Whiskey',   slug: 'redbreast' },
  { name: 'Royal Stag',     cat: 'World Whiskies',  slug: 'royal-stag' },
  { name: 'Monkey 47',      cat: 'Gin',             slug: 'monkey-47' },
]

const FAQS = [
  {
    q: 'Is this a website where I can buy alcohol?',
    a: 'No. This is a corporate website. It does not sell, promote or encourage the consumption of alcohol, and it complies with Indian advertising and surrogate guidelines for the category.',
  },
  {
    q: 'How does Pernod Ricard India approach sustainability and responsibility?',
    a: "The business follows the group's 2030 sustainability roadmap, covering terroir and water, people and communities, circular packaging, and responsible hosting, and runs programmes that address the misuse of alcohol.",
  },
]

/* ── sub-components ── */

function ProgressBar({ label, pct, go, index }: { label: string; pct: number; go: boolean; index: number }) {
  return (
    <div style={{ padding: '22px 0', borderBottom: '1px solid rgba(201,169,110,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px', gap: '16px' }}>
        <span style={{ fontSize: 'clamp(11px,1vw,13px)', letterSpacing: '0.02em', color: 'rgba(245,240,232,0.55)', lineHeight: 1.4 }}>
          {label}
        </span>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '16px',
          color: AU, flexShrink: 0,
          opacity: go ? 1 : 0,
          transition: `opacity 0.5s ease ${index * 0.12}s`,
        }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: '1px', background: 'rgba(201,169,110,0.1)', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '-1px', left: 0,
          height: '3px', borderRadius: '2px',
          background: `linear-gradient(to right, ${AU}, rgba(201,169,110,0.45))`,
          width: go ? `${pct}%` : '0%',
          transition: go ? `width 1.4s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 0.12}s` : 'none',
        }} />
      </div>
    </div>
  )
}

function ActionCard({ num, title, body }: { num: string; title: string; body: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-action
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        padding: 'clamp(32px,5vh,52px) clamp(24px,3vw,44px)',
        borderRight: '1px solid rgba(242,237,228,0.07)',
        background: hov ? 'rgba(201,169,110,0.05)' : 'transparent',
        transition: 'background 0.32s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: hov ? AU : 'rgba(201,169,110,0.4)', transition: 'color 0.3s' }}>
          {num}
        </span>
        <div style={{ flex: 1, height: '1px', background: hov ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.1)', transition: 'background 0.3s' }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px,2.5vw,38px)',
        fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
        color: hov ? CR : 'rgba(245,240,232,0.72)',
        marginBottom: 'clamp(16px,2.2vh,26px)', transition: 'color 0.3s',
      }}>
        {title}
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.82,
        color: hov ? 'rgba(245,240,232,0.5)' : 'rgba(245,240,232,0.28)',
        margin: 0, transition: 'color 0.3s',
      }}>
        {body}
      </p>
    </div>
  )
}

function BrandTile({ name, cat, slug }: { name: string; cat: string; slug: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={`/brands/${slug}`}
      data-btile
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        padding: 'clamp(18px,2.5vh,28px) clamp(14px,1.8vw,24px)',
        borderRight: '1px solid rgba(14,14,14,0.1)',
        borderBottom: '1px solid rgba(14,14,14,0.1)',
        background: hov ? '#0E0E0E' : 'transparent',
        transition: 'background 0.25s', cursor: 'pointer',
        textDecoration: 'none', display: 'block',
      }}
    >
      <div style={{ fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase', color: hov ? 'rgba(201,169,110,0.7)' : 'rgba(14,14,14,0.3)', marginBottom: '8px', transition: 'color 0.25s' }}>
        {cat}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(14px,1.4vw,20px)',
        fontWeight: 300, letterSpacing: '-0.01em',
        color: hov ? CR : 'rgba(14,14,14,0.65)',
        transition: 'color 0.25s',
      }}>
        {name}
      </div>
    </a>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid rgba(245,240,232,0.08)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', padding: 'clamp(20px,3vh,32px) 0', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px,1.9vw,28px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.15, color: CR }}>
          {q}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2vw,28px)', color: AU, flexShrink: 0, lineHeight: 1, transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease', display: 'block' }}>
          +
        </span>
      </button>
      <div style={{ maxHeight: open ? '240px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.8, color: 'rgba(245,240,232,0.4)', margin: '0 0 clamp(20px,3vh,32px)', maxWidth: '700px', paddingRight: '48px' }}>
          {a}
        </p>
      </div>
    </div>
  )
}

/* ── page ── */

export default function SustainabilityPage() {
  const pageRef     = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLElement>(null)
  const pillarsRef  = useRef<HTMLDivElement>(null)
  const goalsRef    = useRef<HTMLElement>(null)
  const actionsRef  = useRef<HTMLElement>(null)
  const stmtRef     = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLElement>(null)
  const brandsRef   = useRef<HTMLElement>(null)

  const [statsGo, setStatsGo] = useState(false)
  const [goalsGo, setGoalsGo] = useState(false)

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo('[data-hlbl]',   { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .fromTo('[data-htitle]', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1,  ease: 'power4.out' }, '-=0.25')
      .fromTo('[data-hsub]',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.65')
      .fromTo('[data-hscroll]',{ opacity: 0 },         { opacity: 1, duration: 0.5 }, '-=0.3')
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    ScrollTrigger.create({ trigger: statsRef.current, start: 'top 72%', onEnter: () => setStatsGo(true) })
  }, [])

  useEffect(() => {
    if (!pillarsRef.current) return
    const sections = pillarsRef.current.querySelectorAll('[data-pillar-section]')
    sections.forEach((el, i) => {
      const text = el.querySelector('[data-pillar-text]')
      const img  = el.querySelector('[data-pillar-img]')
      const fromLeft = i % 2 === 0
      if (text) gsap.fromTo(text, { opacity: 0, x: fromLeft ? -48 : 48 }, {
        opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })
      if (img) gsap.fromTo(img, { opacity: 0, scale: 1.06 }, {
        opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' },
      })
    })
  }, [])

  useEffect(() => {
    if (!goalsRef.current) return
    ScrollTrigger.create({ trigger: goalsRef.current, start: 'top 72%', onEnter: () => setGoalsGo(true) })
  }, [])

  useEffect(() => {
    if (!actionsRef.current) return
    gsap.fromTo(actionsRef.current.querySelectorAll('[data-action]'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: actionsRef.current, start: 'top 82%' } }
    )
  }, [])

  useEffect(() => {
    if (!stmtRef.current) return
    gsap.fromTo(stmtRef.current.querySelectorAll('[data-sc]'),
      { color: 'rgba(14,14,14,0.07)' },
      { color: 'rgba(14,14,14,0.9)', stagger: 0.013, ease: 'none',
        scrollTrigger: { trigger: stmtRef.current, start: 'top 70%', end: 'bottom 30%', scrub: 0.9 } }
    )
  }, [])

  useEffect(() => {
    if (!timelineRef.current) return
    gsap.fromTo(timelineRef.current.querySelectorAll('[data-tdot]'),
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.14, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 78%' } }
    )
    gsap.fromTo(timelineRef.current.querySelectorAll('[data-tlabel]'),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 78%' } }
    )
  }, [])

  useEffect(() => {
    if (!brandsRef.current) return
    gsap.fromTo(brandsRef.current.querySelectorAll('[data-btile]'),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
        stagger: { each: 0.035, from: 'start' },
        scrollTrigger: { trigger: brandsRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <div ref={pageRef} style={{ background: BK, minHeight: '100vh', opacity: 0 }}>

      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity: 0.4; transform: scaleY(1); }
          50%      { opacity: 0.9; transform: scaleY(0.7); }
        }
        @media (max-width: 768px) {
          .pillar-section { flex-direction: column !important; }
          .pillar-img     { min-height: 240px !important; flex: none !important; width: 100% !important; }
          .stats-grid     { grid-template-columns: repeat(2,1fr) !important; }
          .actions-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div style={{
        height: '100vh', minHeight: '600px',
        display: 'flex', flexDirection: 'column',
        background: `linear-gradient(135deg, ${G} 0%, ${G2} 50%, ${G0} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* grain texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          opacity: 0.04,
        }} />
        {/* radial glow center */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '60vw', height: '60vw',
          background: `radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ background: 'transparent' }}><Nav /></div>

        {/* centred content */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 clamp(24px,6vw,80px)',
          position: 'relative', zIndex: 1,
        }}>
          <div data-hlbl style={{ opacity: 0, marginBottom: '28px' }}>
            <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(201,169,110,0.8)' }}>
              Sustainability &amp; Responsibility
            </span>
          </div>

          <h1 data-htitle style={{
            opacity: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem,8vw,7rem)',
            fontWeight: 300, letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: AU, lineHeight: 1, margin: '0 0 28px',
          }}>
            2030 Roadmap
          </h1>

          <div data-hsub style={{ opacity: 0 }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem,2vw,1.5rem)',
              fontStyle: 'italic', color: CR,
              letterSpacing: '0.01em', margin: '0 0 24px',
            }}>
              Our commitment to a better world
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.82,
              color: 'rgba(245,240,232,0.42)',
              maxWidth: '480px', margin: '0 auto',
            }}>
              Our 2030 roadmap reshapes how spirits are made in India — from water in the watershed to the served glass, across four commitments.
            </p>
          </div>
        </div>

        {/* scroll indicator */}
        <div data-hscroll style={{
          opacity: 0,
          position: 'absolute', bottom: '36px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          zIndex: 1,
        }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.4)' }}>
            Scroll
          </span>
          <div style={{
            width: '1px', height: '48px',
            background: `linear-gradient(to bottom, ${AU}, transparent)`,
            animation: 'scrollPulse 2.2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <section ref={statsRef} style={{
        background: BK,
        borderTop: `1px solid rgba(201,169,110,0.12)`,
        borderBottom: `1px solid rgba(201,169,110,0.08)`,
      }}>
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: 'clamp(48px,7vh,80px) clamp(20px,3.5vw,52px)',
              borderRight: i < 3 ? '1px solid rgba(201,169,110,0.1)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px,5vw,68px)',
                fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1,
                color: statsGo ? AU : 'rgba(201,169,110,0.15)',
                transition: 'color 1s ease',
              }}>
                {s.display}
              </div>
              <div style={{
                fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.3)',
                marginTop: '16px', lineHeight: 1.65,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <div ref={pillarsRef}>
        {PILLARS.map((p, i) => {
          const flip = i % 2 !== 0
          const bg   = i % 2 === 0 ? G : '#141414'
          return (
            <section
              key={i}
              data-pillar-section
              className="pillar-section"
              style={{
                display: 'flex',
                flexDirection: flip ? 'row-reverse' : 'row',
                minHeight: 'clamp(460px,58vh,640px)',
                borderTop: '1px solid rgba(201,169,110,0.07)',
              }}
            >
              {/* text side */}
              <div
                data-pillar-text
                style={{
                  flex: 1,
                  background: bg,
                  padding: 'clamp(56px,8vh,100px) clamp(40px,6vw,80px)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}
              >
                <div style={{
                  fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontWeight: 500, color: 'rgba(201,169,110,0.8)', marginBottom: '28px',
                }}>
                  {p.num} — {p.label}
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px,4vw,60px)',
                  fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.05,
                  color: CR, margin: '0 0 24px',
                }}>
                  {p.title}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.85,
                  color: 'rgba(245,240,232,0.48)', margin: '0 0 40px',
                  maxWidth: '380px',
                }}>
                  {p.body}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '1px', background: AU, opacity: 0.4 }} />
                  <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase' }}>
                    Our commitment
                  </span>
                </div>
              </div>

              {/* image side */}
              <div
                data-pillar-img
                className="pillar-img"
                style={{
                  flex: 1,
                  backgroundImage: `url(${p.img})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.55))',
                }} />
              </div>
            </section>
          )
        })}
      </div>

      {/* ── PROGRESS GOALS ── */}
      <section ref={goalsRef} style={{
        background: '#0d0d0d',
        padding: 'clamp(72px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(201,169,110,0.08)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px,1fr) minmax(300px,1.4fr)',
          gap: 'clamp(48px,7vw,100px)',
          alignItems: 'start',
        }}>
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: AU, margin: '0 0 20px' }}>
              Progress to 2030
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,4vw,56px)',
              fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
              color: CR, marginBottom: '28px',
            }}>
              Measured.<br />
              <em style={{ color: 'rgba(245,240,232,0.2)', fontStyle: 'italic' }}>Accountable.</em>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.8,
              color: 'rgba(245,240,232,0.3)', maxWidth: '300px',
            }}>
              Each year we measure and report our progress openly, holding ourselves to targets that matter.
            </p>
          </div>
          <div>
            {GOALS.map((g, i) => (
              <ProgressBar key={i} label={g.label} pct={g.pct} go={goalsGo} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── IN INDIA ── */}
      <section ref={actionsRef} style={{
        background: '#0E0E0E',
        borderTop: '1px solid rgba(245,240,232,0.05)',
      }}>
        <div style={{ padding: 'clamp(40px,5.5vh,60px) clamp(24px,6vw,80px) 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: AU, margin: 0 }}>
              In India
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px,3vw,44px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: CR, textAlign: 'right',
            }}>
              Action where it<br />
              <em style={{ color: 'rgba(245,240,232,0.2)', fontStyle: 'italic' }}>is needed most.</em>
            </div>
          </div>
        </div>
        <div className="actions-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          marginTop: 'clamp(36px,5vh,56px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
        }}>
          {INDIA_ACTIONS.map((a, i) => <ActionCard key={i} {...a} />)}
        </div>
      </section>

      {/* ── FOUNDATION IMPACT — character reveal ── */}
      <section ref={stmtRef} style={{
        background: CR,
        padding: 'clamp(72px,12vh,160px) clamp(24px,8vw,120px)',
        borderTop: '1px solid rgba(14,14,14,0.08)',
      }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 clamp(24px,3.5vh,44px)' }}>
          Foundation Impact
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px,3.8vw,56px)',
          fontWeight: 300, lineHeight: 1.25, letterSpacing: '-0.01em',
          maxWidth: '1000px', margin: 0,
        }}>
          {'Through the Pernod Ricard India Foundation, our community programmes in water stewardship, agriculture and livelihoods have reached more than five lakh people across thirteen states and three union territories.'.split('').map((ch, i) => (
            <span key={i} data-sc style={{ color: 'rgba(14,14,14,0.07)' }}>{ch}</span>
          ))}
        </p>
      </section>

      {/* ── 2030 TIMELINE ── */}
      <section ref={timelineRef} style={{
        background: BK,
        padding: 'clamp(72px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(201,169,110,0.08)',
        overflow: 'hidden',
      }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: AU, margin: '0 0 clamp(48px,7vh,80px)' }}>
          The journey to 2030
        </p>
        <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
          <div style={{ position: 'relative', minWidth: '640px' }}>
            {/* connecting line */}
            <div style={{
              position: 'absolute', top: '7px',
              left: '10%', right: '10%',
              height: '1px',
              background: `linear-gradient(to right, transparent, ${AU}55, ${AU}55, transparent)`,
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {TIMELINE_STEPS.map((step, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  flex: 1, textAlign: 'center', padding: '0 8px',
                }}>
                  <div data-tdot style={{
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: BK, border: `2px solid ${AU}`,
                    boxShadow: `0 0 14px ${AU}60`,
                    position: 'relative', zIndex: 1,
                    flexShrink: 0,
                  }} />
                  <div data-tlabel>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(16px,2vw,26px)',
                      fontWeight: 300, color: AU,
                      marginTop: '20px', letterSpacing: '-0.01em',
                    }}>
                      {step.year}
                    </div>
                    <p style={{
                      fontSize: '11px', letterSpacing: '0.02em',
                      color: 'rgba(245,240,232,0.35)', lineHeight: 1.65,
                      marginTop: '8px', maxWidth: '130px',
                    }}>
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section ref={brandsRef} style={{
        background: CR,
        padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(14,14,14,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: 'clamp(40px,6vh,60px)' }}>
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 14px' }}>
              Brands in focus
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,4vw,60px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#0E0E0E',
            }}>
              Made with the same care<br />
              <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>we ask of ourselves.</em>
            </div>
          </div>
          <Link
            href="/brands"
            style={{ fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#BFA05A', textDecoration: 'none', padding: '10px 20px', border: '1px solid rgba(191,160,90,0.5)', transition: 'background 0.25s, color 0.25s', whiteSpace: 'nowrap', alignSelf: 'flex-end', display: 'block' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#BFA05A'; e.currentTarget.style.color = '#0E0E0E' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#BFA05A' }}
          >
            View all brands →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(120px,16vw,200px), 1fr))', border: '1px solid rgba(14,14,14,0.1)', borderRight: 'none', borderBottom: 'none' }}>
          {BRANDS.map((b, i) => <BrandTile key={i} {...b} />)}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{
        background: '#0E0E0E',
        padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(245,240,232,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(40px,6vh,64px)' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: AU, margin: 0 }}>
            Answers
          </p>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9, color: CR, textAlign: 'right' }}>
            Sustainability &amp; responsibility,<br />
            <em style={{ color: 'rgba(245,240,232,0.2)', fontStyle: 'italic' }}>answered.</em>
          </div>
        </div>
        <div>
          {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          <div style={{ borderTop: '1px solid rgba(245,240,232,0.08)' }} />
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        background: `linear-gradient(135deg, ${G} 0%, ${G2} 60%, ${G0} 100%)`,
        padding: 'clamp(80px,12vh,140px) clamp(24px,6vw,80px)',
        textAlign: 'center',
        borderTop: `1px solid rgba(201,169,110,0.1)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '70vw', height: '70vw',
          background: `radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(201,169,110,0.7)', margin: '0 0 24px', position: 'relative' }}>
          Learn more
        </p>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px,4vw,56px)',
          fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.0,
          color: CR, marginBottom: '44px', position: 'relative',
        }}>
          Learn more about<br />
          <em style={{ color: 'rgba(245,240,232,0.3)', fontStyle: 'italic' }}>our commitments.</em>
        </div>
        <a
          href="#"
          style={{
            display: 'inline-block', position: 'relative',
            fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: AU, textDecoration: 'none',
            padding: 'clamp(14px,1.8vh,18px) clamp(28px,3.5vw,44px)',
            border: `1px solid rgba(201,169,110,0.45)`,
            transition: 'background 0.3s, color 0.3s, border-color 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = AU
            e.currentTarget.style.color = G
            e.currentTarget.style.borderColor = AU
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = AU
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.45)'
          }}
        >
          Download the 2030 roadmap →
        </a>
      </section>

    </div>
  )
}
