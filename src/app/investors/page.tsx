'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── data ── */

const PILLARS = [
  { num: '01', title: 'Premiumisation strategy',      body: 'Long-term value creation built on premium brands, disciplined investment and a mix that trades up over time.' },
  { num: '02', title: 'Local manufacturing scale',    body: 'A national production and sourcing footprint that supports resilience and cost discipline.' },
  { num: '03', title: 'Governance & transparency',    body: 'Clear oversight and regular disclosure, so performance and risk can be assessed with confidence.' },
]

const DOCS = [
  { type: 'Annual Report',  title: 'FY25 Universal Registration Document',        desc: 'The integrated annual report: strategy, performance, governance and sustainability, gathered in one volume.',            size: '12.8 MB' },
  { type: 'Annual Report',  title: 'FY25 Annual Report',                           desc: 'The integrated annual report: strategy, performance, governance and sustainability, gathered in one volume.',            size: '16.1 MB' },
  { type: 'Filing',         title: 'Download file',                                desc: 'A document from the Pernod Ricard library.',                                                                              size: '538 KB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '6.0 MB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '7.8 MB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '4.1 MB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '2.0 MB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '13.6 MB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '11.8 MB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '3.3 MB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '5.5 MB' },
  { type: 'Press Release',  title: 'Press release',                                desc: 'An official press release from the house.',                                                                              size: '1.6 MB' },
  { type: 'Press Release',  title: 'Press release',                                desc: 'An official press release from the house.',                                                                              size: '697 KB' },
  { type: 'Press Release',  title: 'Press release',                                desc: 'An official press release from the house.',                                                                              size: '394 KB' },
  { type: 'Transcript',     title: 'Transcript',                                   desc: 'The full results-call transcript, with management commentary and analyst questions.',                                   size: '102 KB' },
  { type: 'Transcript',     title: 'Transcript',                                   desc: 'The full results-call transcript, with management commentary and analyst questions.',                                   size: '2.5 MB' },
  { type: 'Transcript',     title: 'Transcript',                                   desc: 'The full results-call transcript, with management commentary and analyst questions.',                                   size: '275 KB' },
  { type: 'Presentation',   title: 'Presentation',                                 desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '5.6 MB' },
  { type: 'Presentation',   title: 'View the presentation',                        desc: 'The results presentation: financial detail and category performance, slide by slide.',                                  size: '9.0 MB' },
  { type: 'Sustainability', title: 'Auditors\' report — Review of sustainability FY25', desc: 'Sustainability reporting and the independent review of our non-financial performance.',                           size: '107 KB' },
]

const DOC_TYPES = ['All', 'Annual Report', 'Presentation', 'Press Release', 'Transcript', 'Sustainability', 'Filing']

const ESSENTIALS = [
  { num: '01', title: 'Full-year & half-year results' },
  { num: '02', title: 'Annual General Meeting' },
  { num: '03', title: 'Financial calendar' },
  { num: '04', title: 'Share price & dividend' },
  { num: '05', title: 'Strategy & outlook' },
  { num: '06', title: 'Governance' },
]

const FAQS = [
  {
    q: 'What is the company\'s value-creation strategy?',
    a: 'Long-term value built on premiumisation: investing behind premium brands and a mix that trades up over time, supported by the scale of local manufacturing.',
  },
  {
    q: 'Where can I find reports and disclosures?',
    a: 'Reports, results and financial communications are published in the Investors and Documents sections of this site.',
  },
  {
    q: 'How is the business governed?',
    a: 'Within a clear governance framework with defined accountability, a code of conduct, responsible-marketing standards and regular, transparent disclosure.',
  },
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

/* ── sub-components ── */

function DocRow({ type, title, desc, size }: typeof DOCS[0]) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-doc
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'grid',
        gridTemplateColumns: 'clamp(100px,14vw,160px) 1fr auto',
        gap: 'clamp(14px,2vw,36px)',
        alignItems: 'center',
        padding: 'clamp(18px,2.5vh,28px) clamp(16px,2vw,28px)',
        borderTop: '1px solid rgba(14,14,14,0.09)',
        background: hov ? 'rgba(14,14,14,0.03)' : 'transparent',
        transition: 'background 0.25s',
        cursor: 'default',
      }}
    >
      {/* type tag */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}>
        <span style={{
          fontSize: '7px', letterSpacing: '0.32em', textTransform: 'uppercase',
          color: hov ? '#BFA05A' : 'rgba(191,160,90,0.65)',
          transition: 'color 0.25s',
        }}>
          {type}
        </span>
        <span style={{
          fontSize: '7px', letterSpacing: '0.15em',
          color: 'rgba(14,14,14,0.28)',
        }}>
          PDF · {size}
        </span>
      </div>

      {/* title + desc */}
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(15px,1.4vw,20px)',
          fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.1,
          color: hov ? '#0E0E0E' : 'rgba(14,14,14,0.72)',
          marginBottom: '6px',
          transition: 'color 0.25s',
        }}>
          {title}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(10px,0.85vw,12px)', lineHeight: 1.65,
          color: 'rgba(14,14,14,0.35)', margin: 0,
        }}>
          {desc}
        </p>
      </div>

      {/* download CTA */}
      <a
        href="#"
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase',
          color: hov ? '#0E0E0E' : 'rgba(14,14,14,0.35)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'color 0.25s',
        }}
        onClick={e => e.preventDefault()}
      >
        <span>Download</span>
        <span style={{ fontSize: '10px' }}>↓</span>
      </a>
    </div>
  )
}

function EssentialRow({ num, title }: typeof ESSENTIALS[0]) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-ess
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'grid',
        gridTemplateColumns: 'clamp(28px,3.5vw,52px) 1fr auto',
        gap: 'clamp(16px,2.5vw,40px)',
        alignItems: 'center',
        padding: 'clamp(20px,3vh,32px) 0',
        borderTop: '1px solid rgba(14,14,14,0.1)',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#BFA05A' }}>{num}</span>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px,2.8vw,42px)',
        fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1,
        color: hov ? '#0E0E0E' : 'rgba(14,14,14,0.72)',
        transition: 'color 0.25s',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase',
        color: hov ? '#BFA05A' : 'transparent',
        transition: 'color 0.25s', whiteSpace: 'nowrap',
      }}>
        View →
      </div>
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
        transition: 'background 0.25s',
        cursor: 'pointer',
        textDecoration: 'none', display: 'block',
      }}
    >
      <div style={{ fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase', color: hov ? 'rgba(191,160,90,0.7)' : 'rgba(14,14,14,0.3)', marginBottom: '8px', transition: 'color 0.25s' }}>
        {cat}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(14px,1.4vw,20px)',
        fontWeight: 300, letterSpacing: '-0.01em',
        color: hov ? '#F2EDE4' : 'rgba(14,14,14,0.65)',
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
    <div style={{ borderTop: '1px solid rgba(242,237,228,0.08)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '24px', padding: 'clamp(20px,3vh,32px) 0', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,30px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.1, color: '#F2EDE4' }}>
          {q}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2vw,28px)', color: '#BFA05A', flexShrink: 0, lineHeight: 1, transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease', display: 'block' }}>
          +
        </span>
      </button>
      <div style={{ maxHeight: open ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.8, color: 'rgba(242,237,228,0.45)', margin: '0 0 clamp(20px,3vh,32px)', maxWidth: '680px', paddingRight: '48px' }}>
          {a}
        </p>
      </div>
    </div>
  )
}

/* ── page ── */

export default function InvestorsPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const heroRef    = useRef<HTMLElement>(null)
  const pillarsRef = useRef<HTMLElement>(null)
  const stmtRef    = useRef<HTMLElement>(null)
  const docsRef    = useRef<HTMLElement>(null)
  const essRef     = useRef<HTMLElement>(null)
  const brandsRef  = useRef<HTMLElement>(null)

  const [docFilter, setDocFilter] = useState('All')

  const filteredDocs = docFilter === 'All' ? DOCS : DOCS.filter(d => d.type === docFilter)

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('[data-hlbl]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo('[data-hln]',  { y: '110%' },          { y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.07 }, '-=0.3')
      .fromTo('[data-hsub]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
  }, [])

  useEffect(() => {
    if (!pillarsRef.current) return
    gsap.fromTo(pillarsRef.current.querySelectorAll('[data-pillar]'),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: pillarsRef.current, start: 'top 82%' } }
    )
  }, [])

  useEffect(() => {
    if (!stmtRef.current) return
    const chars = stmtRef.current.querySelectorAll('[data-sc]')
    gsap.fromTo(chars,
      { color: 'rgba(242,237,228,0.07)' },
      { color: 'rgba(242,237,228,0.9)', stagger: 0.014, ease: 'none',
        scrollTrigger: { trigger: stmtRef.current, start: 'top 68%', end: 'bottom 32%', scrub: 0.8 } }
    )
  }, [])

  useEffect(() => {
    if (!docsRef.current) return
    gsap.fromTo(docsRef.current.querySelectorAll('[data-doc]'),
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.04,
        scrollTrigger: { trigger: docsRef.current, start: 'top 82%' } }
    )
  }, [docFilter])

  useEffect(() => {
    if (!essRef.current) return
    gsap.fromTo(essRef.current.querySelectorAll('[data-ess]'),
      { opacity: 0, x: -32 },
      { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: essRef.current, start: 'top 80%' } }
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
    <div ref={pageRef} style={{ background: '#F2EDE4', minHeight: '100vh', opacity: 0 }}>

      {/* ── NAV ── */}
      <div style={{ background: '#F2EDE4' }}><Nav /></div>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        background: '#F2EDE4',
        padding: '0 clamp(24px,6vw,80px) clamp(44px,6vh,64px)',
        overflow: 'hidden',
      }}>
        <div style={{ height: '1px', background: 'rgba(14,14,14,0.1)', marginBottom: 'clamp(28px,4vh,44px)' }} />

        <div data-hlbl style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(10px,1vw,14px)', color: 'rgba(14,14,14,0.25)', letterSpacing: '0.05em' }}>04</span>
          <div style={{ width: '20px', height: '1px', background: 'rgba(14,14,14,0.2)' }} />
          <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A' }}>Investors</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px,10vw,148px)',
          fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
          color: '#0E0E0E', margin: '0 0 clamp(28px,4vh,44px)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block' }}>Value, created</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block', color: 'rgba(14,14,14,0.18)', fontStyle: 'italic' }}>with patience.</span>
          </div>
        </h1>

        <div data-hsub style={{
          opacity: 0,
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.8,
            color: 'rgba(14,14,14,0.45)', margin: 0, maxWidth: '480px',
          }}>
            How we create value for the long term: a premium-led strategy, the scale of local manufacturing, and the transparency to be read with confidence.
          </p>
          <a
            href="#reports"
            style={{
              fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#0E0E0E', textDecoration: 'none',
              padding: 'clamp(12px,1.5vh,16px) clamp(20px,2.5vw,32px)',
              border: '1px solid rgba(14,14,14,0.3)',
              transition: 'background 0.25s, color 0.25s',
              whiteSpace: 'nowrap', display: 'block', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0E0E0E'; e.currentTarget.style.color = '#F2EDE4' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0E0E0E' }}
          >
            The equity story →
          </a>
        </div>
      </section>

      {/* ── THREE PILLARS — dark ── */}
      <section ref={pillarsRef} style={{
        background: '#0E0E0E',
        borderTop: '1px solid rgba(242,237,228,0.06)',
      }}>
        {/* pillars grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {PILLARS.map((p, i) => (
            <div
              key={i}
              data-pillar
              style={{
                opacity: 0,
                padding: 'clamp(36px,5vh,56px) clamp(24px,3.5vw,48px)',
                borderRight: i < 2 ? '1px solid rgba(242,237,228,0.07)' : 'none',
                borderBottom: '1px solid rgba(242,237,228,0.07)',
              }}
            >
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#BFA05A', display: 'block', marginBottom: '20px' }}>{p.num}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.2vw,34px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#F2EDE4', marginBottom: 'clamp(14px,2vh,22px)' }}>
                {p.title}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.78, color: 'rgba(242,237,228,0.35)', margin: 0 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px,22vw,280px), 1fr))',
        }}>
          {[
            { val: 'Premium-led',  sub: 'Long-term value strategy', large: false },
            { val: '20+',          sub: 'Manufacturing & bottling sites', large: true },
            { val: '70+',          sub: 'Countries in the group', large: true },
            { val: '1993',         sub: 'In India since', large: true },
          ].map((s, i) => (
            <div key={i} data-pillar style={{
              opacity: 0,
              padding: 'clamp(28px,4vh,44px) clamp(20px,2.5vw,36px)',
              borderRight: i < 3 ? '1px solid rgba(242,237,228,0.07)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: s.large ? 'clamp(36px,5vw,72px)' : 'clamp(18px,1.8vw,28px)',
                fontWeight: 300,
                letterSpacing: s.large ? '-0.03em' : '0.01em',
                fontStyle: s.large ? 'normal' : 'italic',
                color: s.large ? '#F2EDE4' : 'rgba(242,237,228,0.5)',
                lineHeight: 1, marginBottom: '12px',
              }}>
                {s.val}
              </div>
              <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,237,228,0.28)' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LONG-TERM VALUE STATEMENT — dark character reveal ── */}
      <section ref={stmtRef} style={{
        background: '#080A10',
        padding: 'clamp(80px,13vh,160px) clamp(24px,8vw,120px)',
        borderTop: '1px solid rgba(242,237,228,0.04)',
      }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 clamp(24px,3.5vh,40px)' }}>
          Long-term value
        </p>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px,5.5vw,80px)',
          fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em',
          maxWidth: '980px',
        }}>
          {'Premiumisation, built for the decades ahead.'.split('').map((ch, i) => (
            <span key={i} data-sc style={{ color: 'rgba(242,237,228,0.07)' }}>{ch}</span>
          ))}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px,1.3vw,17px)', lineHeight: 1.82,
          color: 'rgba(242,237,228,0.32)',
          maxWidth: '560px', marginTop: 'clamp(24px,3.5vh,40px)', marginBottom: 0,
        }}>
          We invest behind premium brands and a mix that trades up over time, creating value patiently, and disclosing it transparently.
        </p>
      </section>

      {/* ── REPORTS & RESULTS ── */}
      <section
        id="reports"
        style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        {/* heading */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(32px,5vh,56px)' }}>
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 14px' }}>
              Reports & Results
            </p>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,64px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9, color: '#0E0E0E' }}>
              The house,<br />
              <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>on the record.</em>
            </div>
          </div>
          <div style={{ fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(14,14,14,0.35)', fontFamily: 'var(--font-body)', alignSelf: 'flex-end' }}>
            {DOCS.length} documents
          </div>
        </div>

        {/* doc type filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px,0.8vw,8px)', flexWrap: 'wrap', marginBottom: 'clamp(24px,3.5vh,40px)' }}>
          {DOC_TYPES.map(t => {
            const isActive = docFilter === t
            return (
              <button
                key={t}
                onClick={() => setDocFilter(t)}
                style={{
                  background: isActive ? '#0E0E0E' : 'transparent',
                  border: `1px solid ${isActive ? '#0E0E0E' : 'rgba(14,14,14,0.2)'}`,
                  padding: 'clamp(6px,0.9vh,9px) clamp(10px,1.2vw,18px)',
                  fontSize: '7px', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: isActive ? '#F2EDE4' : 'rgba(14,14,14,0.45)',
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                  transition: 'all 0.22s',
                }}
              >
                {t}
              </button>
            )
          })}
        </div>

        {/* doc rows */}
        <section ref={docsRef}>
          <div>
            {filteredDocs.map((d, i) => <DocRow key={i} {...d} />)}
            <div style={{ borderTop: '1px solid rgba(14,14,14,0.09)' }} />
          </div>
        </section>

        {/* all docs CTA */}
        <div style={{ marginTop: 'clamp(28px,4vh,44px)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '28px', height: '1px', background: '#BFA05A' }} />
          <Link
            href="/documents"
            style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BFA05A', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            All documents →
          </Link>
        </div>
      </section>

      {/* ── MID QUOTE — dark ── */}
      <section style={{
        background: '#0E0E0E',
        padding: 'clamp(72px,12vh,140px) clamp(24px,8vw,120px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(242,237,228,0.06)',
        overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px,4.5vw,68px)',
          fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.95,
          color: '#F2EDE4', maxWidth: '900px', margin: '0 auto',
        }}>
          We make the spirits that mark<br />
          <em style={{ color: 'rgba(242,237,228,0.22)', fontStyle: 'italic' }}>the moments that matter.</em>
        </div>
      </section>

      {/* ── INVESTOR ESSENTIALS ── */}
      <section
        ref={essRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(44px,6vh,64px)' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: 0 }}>
            Investor essentials
          </p>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,44px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9, color: '#0E0E0E', textAlign: 'right' }}>
            Investor relations<br />
            <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>at a glance.</em>
          </div>
        </div>

        <div>
          {ESSENTIALS.map((e, i) => <EssentialRow key={i} {...e} />)}
          <div style={{ borderTop: '1px solid rgba(14,14,14,0.1)' }} />
        </div>

        {/* contact strip */}
        <div style={{
          marginTop: 'clamp(44px,6vh,64px)',
          padding: 'clamp(28px,4vh,44px) clamp(24px,3vw,48px)',
          background: '#0E0E0E',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
        }}>
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 10px' }}>
              Investor relations
            </p>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,1.8vw,26px)', fontWeight: 300, letterSpacing: '-0.01em', color: '#F2EDE4' }}>
              Direct line to our IR team.
            </div>
          </div>
          <a
            href="mailto:investors@pernod-ricard.com"
            style={{
              fontSize: '9px', letterSpacing: '0.2em',
              color: '#BFA05A', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            investors@pernod-ricard.com ↗
          </a>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section
        ref={brandsRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: 'clamp(40px,6vh,60px)' }}>
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 14px' }}>Brands in focus</p>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,60px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9, color: '#0E0E0E' }}>
              The brands behind<br />
              <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>the equity story.</em>
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
        borderTop: '1px solid rgba(242,237,228,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(40px,6vh,64px)' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: 0 }}>Answers</p>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9, color: '#F2EDE4', textAlign: 'right' }}>
            For investors,<br /><em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>answered.</em>
          </div>
        </div>
        <div>
          {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          <div style={{ borderTop: '1px solid rgba(242,237,228,0.08)' }} />
        </div>
      </section>

    </div>
  )
}
