'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  { num: '01', word: 'Craft',            body: 'We make things properly. From sourcing to bottling, quality is the only standard we recognise — across Indian-made and international brands alike.' },
  { num: '02', word: 'Conviviality',     body: 'We exist for the moments people share. We market our brands responsibly and ask only that they are enjoyed in good company and good measure.' },
  { num: '03', word: 'Responsibility',   body: 'We hold ourselves to the same standard as our craft: careful with water and soil, fair with people, and honest in how we communicate.' },
  { num: '04', word: 'Entrepreneurship', body: 'We give our teams the freedom to act like owners. Decentralised by design, accountable by culture.' },
]

const OPERATIONS = [
  { num: '01', title: 'Made in India, for India',  body: 'Our largest brands are distilled, blended, and bottled locally — rooted in the country we serve.' },
  { num: '02', title: 'Part of a global house',    body: 'We bring Pernod Ricard group standards, scale, and learning to the Indian market while remaining locally accountable.' },
  { num: '03', title: 'Premium by conviction',     body: 'We invest in quality and long-term brand-building over short-term volume — a discipline that compounds over decades.' },
  { num: '04', title: 'Governed for scrutiny',     body: 'A clear governance framework, code of conduct, and transparent disclosure — built to withstand examination.' },
]

const STATS = [
  { v: 30,     s: '+', l: 'Bottling plants across India' },
  { v: 1400,   s: '+', l: 'Employees in India' },
  { v: 500000, s: '+', l: 'People reached by community programmes' },
  { v: 16,     s: '',  l: 'States and union territories reached' },
]

const CATEGORIES = [
  { name: 'Scotch Whisky',   brands: 'Chivas Regal · The Glenlivet · Ballantine\'s · Royal Salute' },
  { name: 'Irish Whiskey',   brands: 'Jameson · Redbreast' },
  { name: 'Vodka',           brands: 'Absolut' },
  { name: 'Gin',             brands: 'Beefeater · Monkey 47' },
  { name: 'Cognac & Brandy', brands: 'Martell' },
  { name: 'Champagne',       brands: 'Mumm · Perrier-Jouët' },
  { name: 'Rum',             brands: 'Havana Club' },
  { name: 'Indian Whisky',   brands: 'Royal Stag' },
]

/* ── helpers ── */

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
  return <>{n.toLocaleString('en-IN')}</>
}

function PillarCard({ num, word, body, borderRight, borderBottom }: {
  num: string; word: string; body: string; borderRight: boolean; borderBottom: boolean
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-pillar
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        padding: 'clamp(36px,5vh,60px) clamp(24px,3.5vw,52px)',
        borderRight:  borderRight  ? '1px solid rgba(242,237,228,0.07)' : 'none',
        borderBottom: borderBottom ? '1px solid rgba(242,237,228,0.07)' : 'none',
        background: hov ? 'rgba(191,160,90,0.06)' : 'transparent',
        transition: 'background 0.35s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: hov ? '#BFA05A' : 'rgba(191,160,90,0.45)', transition: 'color 0.3s' }}>
          {num}
        </span>
        <div style={{ flex: 1, height: '1px', background: hov ? 'rgba(191,160,90,0.35)' : 'rgba(191,160,90,0.12)', transition: 'background 0.3s' }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(36px,4.5vw,68px)',
        fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.92,
        color: hov ? '#F2EDE4' : 'rgba(242,237,228,0.75)',
        marginBottom: 'clamp(18px,2.5vh,28px)',
        transition: 'color 0.3s',
      }}>
        {word}
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(12px,1.1vw,14px)', lineHeight: 1.8,
        color: hov ? 'rgba(242,237,228,0.5)' : 'rgba(242,237,228,0.3)',
        margin: 0, maxWidth: '340px',
        transition: 'color 0.3s',
      }}>
        {body}
      </p>
    </div>
  )
}

function CategoryRow({ name, brands }: { name: string; brands: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-cat
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'grid',
        gridTemplateColumns: 'clamp(180px,30vw,360px) 1fr auto',
        gap: 'clamp(16px,2.5vw,40px)',
        alignItems: 'center',
        padding: 'clamp(18px,2.5vh,28px) clamp(16px,2vw,32px)',
        borderTop: '1px solid rgba(14,14,14,0.1)',
        background: hov ? '#0E0E0E' : 'transparent',
        transition: 'background 0.28s',
        cursor: 'default',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(20px,2.2vw,32px)',
        fontWeight: 300, letterSpacing: '-0.01em',
        color: hov ? '#F2EDE4' : '#0E0E0E',
        transition: 'color 0.28s',
      }}>
        {name}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(11px,0.95vw,13px)',
        lineHeight: 1.6,
        color: hov ? 'rgba(242,237,228,0.4)' : 'rgba(14,14,14,0.35)',
        transition: 'color 0.28s',
        letterSpacing: '0.01em',
      }}>
        {brands}
      </div>
      <div style={{
        fontSize: '8px', letterSpacing: '0.25em',
        color: hov ? '#BFA05A' : 'transparent',
        transition: 'color 0.28s',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        Explore →
      </div>
    </div>
  )
}

/* ── page ── */

export default function GroupPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const heroRef    = useRef<HTMLElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const opsRef     = useRef<HTMLElement>(null)
  const statsRef   = useRef<HTMLElement>(null)
  const catsRef    = useRef<HTMLElement>(null)
  const [statsGo, setStatsGo] = useState(false)

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('[data-hlabel]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo('[data-hline]',  { y: '110%' },          { y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.07 }, '-=0.3')
      .fromTo('[data-hsub]',   { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
  }, [])

  useEffect(() => {
    if (!pillarsRef.current) return
    gsap.fromTo('[data-pillar]',
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: pillarsRef.current, start: 'top 82%' } }
    )
  }, [])

  useEffect(() => {
    if (!opsRef.current) return
    gsap.fromTo(opsRef.current.querySelectorAll('[data-op]'),
      { opacity: 0, x: -36 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: opsRef.current, start: 'top 78%' } }
    )
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    ScrollTrigger.create({ trigger: statsRef.current, start: 'top 65%', onEnter: () => setStatsGo(true) })
  }, [])

  useEffect(() => {
    if (!catsRef.current) return
    gsap.fromTo(catsRef.current.querySelectorAll('[data-cat]'),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.06,
        scrollTrigger: { trigger: catsRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <div ref={pageRef} style={{ background: '#F2EDE4', minHeight: '100vh', opacity: 0 }}>

      {/* ── NAV ── */}
      <div style={{ background: '#F2EDE4' }}>
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        background: '#F2EDE4',
        padding: '0 clamp(24px,6vw,80px) clamp(44px,6vh,64px)',
        overflow: 'hidden',
      }}>
        <div style={{ height: '1px', background: 'rgba(14,14,14,0.1)', marginBottom: 'clamp(28px,4vh,44px)' }} />

        <div data-hlabel style={{ opacity: 0, marginBottom: '14px' }}>
          <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A' }}>
            Pernod Ricard India · Our Group
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px,9.5vw,140px)',
          fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
          color: '#0E0E0E', margin: '0 0 clamp(28px,4vh,44px)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span data-hline style={{ display: 'block' }}>A premium</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hline style={{ display: 'block', color: 'rgba(14,14,14,0.18)', fontStyle: 'italic' }}>spirits company,</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hline style={{ display: 'block' }}>built in India.</span>
          </div>
        </h1>

        <div data-hsub style={{
          opacity: 0,
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.8,
            color: 'rgba(14,14,14,0.45)', margin: 0, maxWidth: '440px',
          }}>
            We are a maker of premium spirits, an Indian business with a global parent, and a long-term builder of brands, livelihoods and trust.
          </p>
          <div style={{ display: 'flex', gap: 'clamp(28px,4vw,60px)', flexShrink: 0 }}>
            {[['1993', 'In India since'], ['70+', 'Countries globally'], ['30+', 'Bottling plants']].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(26px,3.2vw,46px)',
                  fontWeight: 300, letterSpacing: '-0.03em',
                  color: '#0E0E0E', lineHeight: 1,
                }}>
                  {val}
                </div>
                <div style={{ fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(14,14,14,0.35)', marginTop: '5px' }}>
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE — dark split ── */}
      <section style={{
        background: '#0E0E0E',
        padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(44px,7vw,110px)',
          alignItems: 'start',
        }}>
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 28px' }}>
              Who we are
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px,5.5vw,84px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#F2EDE4',
            }}>
              One house.<br />
              <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>Seventy</em><br />
              countries.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,3.5vh,40px)', paddingTop: 'clamp(0px,5vh,56px)' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px,1.3vw,17px)', lineHeight: 1.8,
              color: 'rgba(242,237,228,0.6)', margin: 0,
            }}>
              One of India's largest premium spirits companies, and part of a global house present in more than seventy countries.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px,1.2vw,16px)', lineHeight: 1.8,
              color: 'rgba(242,237,228,0.3)', margin: 0,
            }}>
              Our portfolio spans leading Indian and international brands across whisky, wine, and other categories — manufactured to international standards, with deep Indian manufacturing roots.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingTop: '8px' }}>
              <div style={{ width: '28px', height: '1px', background: '#BFA05A' }} />
              <span style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(191,160,90,0.55)' }}>
                Est. 1993 · Gurugram, India
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES — 2×2 dark card grid ── */}
      <div style={{ background: '#0E0E0E', borderTop: '1px solid rgba(242,237,228,0.06)' }}>
        <div style={{ padding: 'clamp(40px,5vh,56px) clamp(24px,6vw,80px) 0' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: 0 }}>
            What we stand for
          </p>
        </div>

        <div
          ref={pillarsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            marginTop: 'clamp(32px,4.5vh,52px)',
          }}
        >
          {PILLARS.map((p, i) => (
            <PillarCard
              key={i}
              {...p}
              borderRight={i % 2 === 0}
              borderBottom={i < 2}
            />
          ))}
        </div>
      </div>

      {/* ── HOW WE OPERATE — cream numbered list ── */}
      <section
        ref={opsRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '24px', marginBottom: 'clamp(44px,7vh,80px)',
        }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: 0 }}>
            How we operate
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(12px,1.1vw,14px)', lineHeight: 1.7,
            color: 'rgba(14,14,14,0.38)', margin: 0, maxWidth: '320px', textAlign: 'right',
          }}>
            Four principles that define how this business runs — and why it holds itself to a higher standard.
          </p>
        </div>

        <div>
          {OPERATIONS.map((op, i) => (
            <div
              key={i}
              data-op
              style={{
                opacity: 0,
                display: 'grid',
                gridTemplateColumns: 'clamp(28px,3.5vw,56px) 1fr',
                gap: 'clamp(18px,2.5vw,40px)',
                padding: 'clamp(24px,3.5vh,40px) 0',
                borderTop: '1px solid rgba(14,14,14,0.1)',
              }}
            >
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#BFA05A', paddingTop: '6px' }}>
                {op.num}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2vh,20px) clamp(24px,4vw,60px)', alignItems: 'baseline' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px,3vw,44px)',
                  fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1,
                  color: '#0E0E0E', flexShrink: 0,
                  minWidth: 'clamp(180px,32vw,400px)',
                }}>
                  {op.title}
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.78,
                  color: 'rgba(14,14,14,0.42)', margin: 0,
                  maxWidth: '380px',
                }}>
                  {op.body}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(14,14,14,0.1)' }} />
        </div>
      </section>

      {/* ── STATS — dark counting ── */}
      <section
        ref={statsRef}
        style={{
          background: '#080A10',
          padding: 'clamp(80px,12vh,140px) clamp(24px,6vw,80px)',
        }}
      >
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 clamp(44px,7vh,80px)' }}>
          By the numbers
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px,35vw,220px), 1fr))',
          gap: 'clamp(44px,6vh,64px) clamp(24px,4vw,48px)',
        }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(52px,8vw,114px)',
                fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
                color: '#F2EDE4',
              }}>
                <Count to={s.v} go={statsGo} />{s.s}
              </div>
              <div style={{
                marginTop: '16px', fontSize: '10px', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(242,237,228,0.28)',
              }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BRAND CATEGORIES — cream hover list ── */}
      <section
        ref={catsRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '24px', marginBottom: 'clamp(44px,6vh,64px)',
        }}>
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 14px' }}>
              A house of brands
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px,5vw,72px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#0E0E0E',
            }}>
              Fifteen brands.<br />
              <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>Eight categories.</em>
            </div>
          </div>
          <Link
            href="/brands"
            style={{
              fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#BFA05A', textDecoration: 'none',
              padding: '10px 20px',
              border: '1px solid rgba(191,160,90,0.5)',
              transition: 'background 0.25s, color 0.25s',
              whiteSpace: 'nowrap', alignSelf: 'flex-end', display: 'block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#BFA05A'; e.currentTarget.style.color = '#0E0E0E' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#BFA05A' }}
          >
            Explore all brands →
          </Link>
        </div>

        <div>
          {CATEGORIES.map((cat, i) => (
            <CategoryRow key={i} name={cat.name} brands={cat.brands} />
          ))}
          <div style={{ borderTop: '1px solid rgba(14,14,14,0.1)' }} />
        </div>
      </section>

      {/* ── GLOBAL BANNER — centred dark statement ── */}
      <section style={{
        background: '#0E0E0E',
        padding: 'clamp(72px,12vh,140px) clamp(24px,6vw,80px)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: '#BFA05A', margin: '0 0 clamp(20px,3vh,32px)' }}>
          The Pernod Ricard group
        </p>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px,16vw,220px)',
          fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.88,
          color: '#F2EDE4',
          marginBottom: 'clamp(24px,4vh,44px)',
        }}>
          GLOBAL
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.85,
          color: 'rgba(242,237,228,0.38)',
          maxWidth: '640px', margin: '0 auto',
          letterSpacing: '0.02em',
        }}>
          Present in 70+ countries. 19,000 employees worldwide. 17 of the Top 100 spirits brands. One shared conviction: good times from a good place.
        </p>
      </section>

    </div>
  )
}
