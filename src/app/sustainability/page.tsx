'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── data ── */

const PILLARS = [
  {
    num: '01',
    title: 'Nurturing Terroir',
    body: 'Protecting water, soil and biodiversity through regenerative agriculture and water stewardship with the farming communities we source from.',
  },
  {
    num: '02',
    title: 'Valuing People',
    body: 'Inclusive, safe and fair workplaces, and thriving communities, through education, livelihoods and women\'s empowerment programmes across India.',
  },
  {
    num: '03',
    title: 'Circular Making',
    body: 'Eco-designed, reusable and recyclable packaging, and a clear path to lower-carbon, more efficient manufacturing.',
  },
  {
    num: '04',
    title: 'Responsible Hosting',
    body: 'Programmes that address the misuse of alcohol and make moderation part of conviviality, in line with Indian advertising and surrogate guidelines.',
  },
]

const INDIA_ACTIONS = [
  {
    num: '01',
    title: 'Water stewardship',
    body: 'Community farm ponds and watershed projects near our plants help secure year-round water for agriculture, working towards being water-balanced in India\'s high-risk watersheds by 2030.',
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

const STATS = [
  { val: 500000, display: '5 lakh+', label: 'People reached by community programmes' },
  { val: 13,     display: '13',      label: 'States and 3 union territories' },
  { val: 2030,   display: '2030',    label: 'Water-balanced in high-risk watersheds' },
  { val: 100,    display: '100%',    label: 'Reusable, recyclable or compostable packaging goal' },
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

const FAQS = [
  {
    q: 'Is this a website where I can buy alcohol?',
    a: 'No. This is a corporate website. It does not sell, promote or encourage the consumption of alcohol, and it complies with Indian advertising and surrogate guidelines for the category.',
  },
  {
    q: 'How does Pernod Ricard India approach sustainability and responsibility?',
    a: 'The business follows the group\'s 2030 sustainability roadmap, covering terroir and water, people and communities, circular packaging, and responsible hosting, and runs programmes that address the misuse of alcohol.',
  },
]

/* ── sub-components ── */

function CountStat({ display, label, go }: { display: string; label: string; go: boolean }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (go) {
      const t = setTimeout(() => setShown(true), 100)
      return () => clearTimeout(t)
    }
  }, [go])
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(52px,8vw,112px)',
        fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
        color: '#0E0E0E',
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        {display}
      </div>
      <div style={{
        marginTop: '14px', fontSize: '10px', letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'rgba(14,14,14,0.38)',
        maxWidth: '200px', lineHeight: 1.5,
      }}>
        {label}
      </div>
    </div>
  )
}

function PillarRow({ num, title, body, index }: typeof PILLARS[0] & { index: number }) {
  return (
    <div
      data-pillar
      style={{
        opacity: 0,
        display: 'grid',
        gridTemplateColumns: 'clamp(28px,3.5vw,52px) 1fr',
        gap: 'clamp(16px,2.5vw,40px)',
        alignItems: 'start',
        padding: 'clamp(28px,4vh,48px) 0',
        borderTop: '1px solid rgba(14,14,14,0.1)',
      }}
    >
      <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#BFA05A', paddingTop: '7px' }}>
        {num}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(10px,1.5vh,16px) clamp(24px,4vw,64px)', alignItems: 'baseline' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px,3.5vw,52px)',
          fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1,
          color: '#0E0E0E', flexShrink: 0,
          minWidth: 'clamp(180px,30vw,380px)',
        }}>
          {title}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.8,
          color: 'rgba(14,14,14,0.45)', margin: 0, maxWidth: '420px',
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

function ActionCard({ num, title, body }: typeof INDIA_ACTIONS[0]) {
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
        background: hov ? 'rgba(191,160,90,0.06)' : 'transparent',
        transition: 'background 0.32s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: hov ? '#BFA05A' : 'rgba(191,160,90,0.45)', transition: 'color 0.3s' }}>
          {num}
        </span>
        <div style={{ flex: 1, height: '1px', background: hov ? 'rgba(191,160,90,0.3)' : 'rgba(191,160,90,0.1)', transition: 'background 0.3s' }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px,2.5vw,38px)',
        fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
        color: hov ? '#F2EDE4' : 'rgba(242,237,228,0.72)',
        marginBottom: 'clamp(16px,2.2vh,26px)',
        transition: 'color 0.3s',
      }}>
        {title}
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.82,
        color: hov ? 'rgba(242,237,228,0.5)' : 'rgba(242,237,228,0.3)',
        margin: 0, transition: 'color 0.3s',
      }}>
        {body}
      </p>
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
        padding: 'clamp(18px,2.5vh,28px) clamp(14px,1.8vw,24px)',
        borderRight: '1px solid rgba(14,14,14,0.1)',
        borderBottom: '1px solid rgba(14,14,14,0.1)',
        background: hov ? '#0E0E0E' : 'transparent',
        transition: 'background 0.25s', cursor: 'default',
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
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid rgba(242,237,228,0.08)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', padding: 'clamp(20px,3vh,32px) 0', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px,1.9vw,28px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.15, color: '#F2EDE4' }}>
          {q}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2vw,28px)', color: '#BFA05A', flexShrink: 0, lineHeight: 1, transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease', display: 'block' }}>
          +
        </span>
      </button>
      <div style={{ maxHeight: open ? '220px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.8, color: 'rgba(242,237,228,0.45)', margin: '0 0 clamp(20px,3vh,32px)', maxWidth: '700px', paddingRight: '48px' }}>
          {a}
        </p>
      </div>
    </div>
  )
}

/* ── page ── */

export default function SustainabilityPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const heroRef    = useRef<HTMLElement>(null)
  const statsRef   = useRef<HTMLElement>(null)
  const pillarsRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<HTMLElement>(null)
  const stmtRef    = useRef<HTMLElement>(null)
  const brandsRef  = useRef<HTMLElement>(null)
  const [statsGo, setStatsGo] = useState(false)

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const tl = gsap.timeline({ delay: 0.12 })
    tl.fromTo('[data-hlbl]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo('[data-hln]',  { y: '110%' },          { y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.08 }, '-=0.3')
      .fromTo('[data-hsub]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    ScrollTrigger.create({ trigger: statsRef.current, start: 'top 68%', onEnter: () => setStatsGo(true) })
  }, [])

  useEffect(() => {
    if (!pillarsRef.current) return
    gsap.fromTo(pillarsRef.current.querySelectorAll('[data-pillar]'),
      { opacity: 0, x: -36 },
      { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%' } }
    )
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
    const chars = stmtRef.current.querySelectorAll('[data-sc]')
    gsap.fromTo(chars,
      { color: 'rgba(14,14,14,0.07)' },
      { color: 'rgba(14,14,14,0.9)', stagger: 0.013, ease: 'none',
        scrollTrigger: { trigger: stmtRef.current, start: 'top 70%', end: 'bottom 30%', scrub: 0.9 } }
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
    <div ref={pageRef} style={{ background: '#080A10', minHeight: '100vh', opacity: 0 }}>

      {/* ── NAV — dark ── */}
      <div style={{ background: '#080A10' }}><Nav /></div>

      {/* ── HERO — dark ── */}
      <section ref={heroRef} style={{
        background: '#080A10',
        padding: '0 clamp(24px,6vw,80px) clamp(56px,8vh,100px)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* large watermark */}
        <div style={{
          position: 'absolute', top: '-20px', right: '-20px',
          fontFamily: 'var(--font-display)', fontSize: 'clamp(140px,22vw,340px)',
          fontWeight: 300, color: 'rgba(191,160,90,0.40)', lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.03em',
        }}>
          2030
        </div>

        <div style={{ height: '1px', background: 'rgba(242,237,228,0.08)', marginBottom: 'clamp(28px,4vh,44px)' }} />

        <div data-hlbl style={{ opacity: 0, marginBottom: '14px' }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A' }}>
            Sustainability &amp; Responsibility
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px,10vw,148px)',
          fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
          color: '#F2EDE4', margin: '0 0 clamp(28px,4vh,48px)',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block' }}>Good Times</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block', color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>from a Good</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block' }}>Place.</span>
          </div>
        </h1>

        <div data-hsub style={{
          opacity: 0,
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px',
          position: 'relative', zIndex: 1,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.8,
            color: 'rgba(242,237,228,0.4)', margin: 0, maxWidth: '480px',
          }}>
            Our 2030 roadmap reshapes how spirits are made in India, from water in the watershed to the served glass, across four commitments.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div style={{ width: '32px', height: '1px', background: '#BFA05A' }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(191,160,90,0.55)' }}>
              The 2030 roadmap
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS — cream ── */}
      <section ref={statsRef} style={{
        background: '#F2EDE4',
        padding: 'clamp(72px,11vh,140px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(14,14,14,0.08)',
      }}>
        <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 clamp(44px,6vh,72px)' }}>
          By the numbers
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px,22vw,240px), 1fr))',
          gap: 'clamp(44px,6vh,64px) clamp(24px,4vw,48px)',
        }}>
          {STATS.map((s, i) => (
            <CountStat key={i} display={s.display} label={s.label} go={statsGo} />
          ))}
        </div>
      </section>

      {/* ── 2030 ROADMAP INTRO — dark centred ── */}
      <section style={{
        background: '#0E0E0E',
        padding: 'clamp(72px,12vh,140px) clamp(24px,8vw,120px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(242,237,228,0.06)',
        overflow: 'hidden',
      }}>
        <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 clamp(20px,3vh,32px)' }}>
          The 2030 roadmap
        </p>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px,6.5vw,96px)',
          fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
          color: '#F2EDE4',
        }}>
          Four commitments,<br />
          <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>one promise.</em>
        </div>
      </section>

      {/* ── FOUR PILLARS — cream ── */}
      <section ref={pillarsRef} style={{
        background: '#F2EDE4',
        padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(14,14,14,0.08)',
      }}>
        <div>
          {PILLARS.map((p, i) => (
            <PillarRow key={i} {...p} index={i} />
          ))}
          <div style={{ borderTop: '1px solid rgba(14,14,14,0.1)' }} />
        </div>
      </section>

      {/* ── IN INDIA — dark 3-col ── */}
      <section ref={actionsRef} style={{
        background: '#0E0E0E',
        borderTop: '1px solid rgba(242,237,228,0.06)',
      }}>
        {/* section label */}
        <div style={{ padding: 'clamp(40px,5.5vh,60px) clamp(24px,6vw,80px) 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0 }}>
              In India
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px,3vw,44px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#F2EDE4', textAlign: 'right',
            }}>
              Action where it<br />
              <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>is needed most.</em>
            </div>
          </div>
        </div>

        {/* 3 action cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginTop: 'clamp(36px,5vh,56px)',
          borderTop: '1px solid rgba(242,237,228,0.06)',
        }}>
          {INDIA_ACTIONS.map((a, i) => (
            <ActionCard key={i} {...a} />
          ))}
        </div>
      </section>

      {/* ── FOUNDATION IMPACT — cream character reveal ── */}
      <section ref={stmtRef} style={{
        background: '#F2EDE4',
        padding: 'clamp(72px,12vh,160px) clamp(24px,8vw,120px)',
        borderTop: '1px solid rgba(14,14,14,0.08)',
      }}>
        <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 clamp(24px,3.5vh,44px)' }}>
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

      {/* ── NURTURING TERROIR QUOTE — dark ── */}
      <section style={{
        background: '#0A0C14',
        padding: 'clamp(72px,12vh,140px) clamp(24px,6vw,80px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(242,237,228,0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', bottom: '-60px', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-display)', fontSize: 'clamp(120px,20vw,300px)',
          fontWeight: 300, color: 'rgba(191,160,90,0.03)', lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
          letterSpacing: '-0.03em',
        }}>
          TERROIR
        </div>

        <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 clamp(20px,3vh,36px)' }}>
          Nurturing Terroir
        </p>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px,4.5vw,68px)',
          fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.95,
          color: '#F2EDE4', marginBottom: 'clamp(20px,3vh,36px)',
          position: 'relative', zIndex: 1,
        }}>
          From the soil to the served glass,<br />
          <em style={{ color: 'rgba(242,237,228,0.22)', fontStyle: 'italic' }}>made responsibly.</em>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px,1.2vw,16px)', lineHeight: 1.82,
          color: 'rgba(242,237,228,0.35)',
          maxWidth: '520px', margin: '0 auto clamp(28px,4vh,48px)',
          position: 'relative', zIndex: 1,
        }}>
          We hold ourselves to the same standard as our craft: patient, precise, and made to last.
        </p>
        <a
          href="#"
          style={{
            display: 'inline-block',
            fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#BFA05A', textDecoration: 'none',
            padding: 'clamp(12px,1.5vh,16px) clamp(20px,2.5vw,32px)',
            border: '1px solid rgba(191,160,90,0.4)',
            transition: 'background 0.25s, color 0.25s',
            position: 'relative', zIndex: 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#BFA05A'; e.currentTarget.style.color = '#0E0E0E' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#BFA05A' }}
        >
          Our role in society →
        </a>
      </section>

      {/* ── BRANDS — cream ── */}
      <section ref={brandsRef} style={{
        background: '#F2EDE4',
        padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(14,14,14,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: 'clamp(40px,6vh,60px)' }}>
          <div>
            <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 14px' }}>
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

      {/* ── FAQ — dark ── */}
      <section style={{
        background: '#0E0E0E',
        padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(242,237,228,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(40px,6vh,64px)' }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0 }}>
            Answers
          </p>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9, color: '#F2EDE4', textAlign: 'right' }}>
            Sustainability &amp; responsibility,<br />
            <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>answered.</em>
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
