'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHANNELS = [
  {
    num: '01',
    cat: 'Media & Press',
    desc: 'Statements, interviews and corporate communications for business and financial media.',
    action: { label: 'media@pernod-ricard.com', href: 'mailto:media@pernod-ricard.com' },
  },
  {
    num: '02',
    cat: 'Investors & Analysts',
    desc: 'Disclosures, reports and financial communications for the group\'s stakeholders.',
    action: { label: 'Investor relations →', href: '/investors' },
  },
  {
    num: '03',
    cat: 'Talent & Careers',
    desc: 'Opportunities for mid- to senior professionals across functions and locations.',
    action: { label: 'View open roles →', href: '/careers' },
  },
  {
    num: '04',
    cat: 'Trade & Partners',
    desc: 'Distributors, suppliers and commercial partners who work with our brands.',
    action: { label: 'partnerships@pernod-ricard.com', href: 'mailto:partnerships@pernod-ricard.com' },
  },
  {
    num: '05',
    cat: 'Policy & Regulators',
    desc: 'Public-policy, governance and regulatory engagement for the alco-bev category.',
    action: { label: 'corporate.affairs@pernod-ricard.com', href: 'mailto:corporate.affairs@pernod-ricard.com' },
  },
  {
    num: '06',
    cat: 'General Enquiries',
    desc: 'Our corporate office, Building 8C, DLF Cyber City, Gurugram, is open to registered visitors Monday to Friday.',
    action: { label: 'See address below →', href: '#address' },
  },
]

const BRANDS = [
  'Chivas Regal', 'The Glenlivet', "Ballantine's", 'Jameson',
  'Absolut', 'Beefeater', 'Martell', 'Mumm',
  'Havana Club', 'Royal Salute', 'Perrier-Jouët', 'Redbreast',
  'Royal Stag', 'Monkey 47',
]

/* ── CHANNEL CARD — dark on cream ── */
const BORDER = '1px solid rgba(242,237,228,0.18)'

function ChannelCard({
  num, cat, desc, action, hasRightBorder, hasBottomBorder,
}: typeof CHANNELS[0] & { hasRightBorder?: boolean; hasBottomBorder?: boolean }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      data-card
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        background: hov ? '#BFA05A' : '#0E0E0E',
        borderRight:  hasRightBorder  ? BORDER : 'none',
        borderBottom: hasBottomBorder ? BORDER : 'none',
        padding: 'clamp(28px,4vh,44px) clamp(22px,2.8vw,36px)',
        display: 'flex', flexDirection: 'column', gap: '0',
        transition: 'background 0.35s ease',
        cursor: 'default',
      }}
    >
      {/* num + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.18em',
          color: hov ? 'rgba(14,14,14,0.5)' : 'rgba(191,160,90,0.5)',
          transition: 'color 0.3s',
        }}>
          {num}
        </span>
        <div style={{ width: '14px', height: '1px', background: hov ? 'rgba(14,14,14,0.3)' : 'rgba(191,160,90,0.3)' }} />
        <span style={{
          fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: hov ? 'rgba(14,14,14,0.6)' : 'rgba(191,160,90,0.7)',
          transition: 'color 0.3s',
        }}>
          {cat}
        </span>
      </div>

      {/* big category name */}
      <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px,2.4vw,36px)',
          fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.05,
          color: hov ? '#0E0E0E' : '#F2EDE4',
          transform: hov ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'color 0.35s, transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}>
          {cat}
        </div>
      </div>

      {/* description */}
      <p style={{
        fontSize: '11.5px', lineHeight: 1.78,
        color: hov ? 'rgba(14,14,14,0.6)' : 'rgba(242,237,228,0.45)',
        margin: '0 0 20px',
        transition: 'color 0.3s',
      }}>
        {desc}
      </p>

      {/* divider + action */}
      <div style={{
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: `1px solid ${hov ? 'rgba(14,14,14,0.2)' : 'rgba(242,237,228,0.18)'}`,
        transition: 'border-color 0.3s',
      }}>
        <a
          href={action.href}
          style={{
            fontSize: '8px', letterSpacing: '0.22em',
            textTransform: action.href.startsWith('mailto') ? 'none' : 'uppercase',
            color: hov ? '#0E0E0E' : '#BFA05A',
            textDecoration: 'none',
            display: 'block',
            transform: hov ? 'translateX(4px)' : 'translateX(0)',
            transition: 'color 0.3s, transform 0.35s',
            wordBreak: 'break-all',
          }}
        >
          {action.label}
        </a>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const heroRef    = useRef<HTMLElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)
  const addrRef    = useRef<HTMLElement>(null)
  const brandsRef  = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('[data-label]',  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo('[data-line]',   { y: '110%' },          { y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.07 }, '-=0.3')
      .fromTo('[data-sub]',    { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
  }, [])

  useEffect(() => {
    if (!cardsRef.current) return
    gsap.fromTo('[data-card]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 88%' } }
    )
  }, [])

  useEffect(() => {
    if (!addrRef.current) return
    gsap.fromTo(addrRef.current.querySelectorAll('[data-a]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: addrRef.current, start: 'top 84%' } }
    )
  }, [])

  useEffect(() => {
    if (!brandsRef.current) return
    gsap.fromTo(brandsRef.current.querySelectorAll('[data-b]'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out',
        stagger: { each: 0.03, from: 'start' },
        scrollTrigger: { trigger: brandsRef.current, start: 'top 88%' } }
    )
  }, [])

  return (
    <div ref={pageRef} style={{ background: '#F2EDE4', minHeight: '100vh', opacity: 0 }}>

      {/* ── NAV — inline on cream ── */}
      <div style={{ background: '#F2EDE4' }}>
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        background: '#F2EDE4',
        padding: '0 clamp(24px,6vw,80px) clamp(44px,6vh,64px)',
        overflow: 'hidden',
      }}>
        {/* top rule */}
        <div style={{ height: '1px', background: 'rgba(14,14,14,0.1)', marginBottom: 'clamp(28px,4vh,44px)' }} />

        <div data-label style={{ opacity: 0, marginBottom: '14px' }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A' }}>
            Pernod Ricard India · Contact
          </span>
        </div>

        {/* giant heading */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px,10vw,148px)',
          fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
          color: '#0E0E0E', margin: '0 0 clamp(24px,3.5vh,40px)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span data-line style={{ display: 'block' }}>Find the right</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-line style={{ display: 'block', color: 'rgba(14,14,14,0.18)', fontStyle: 'italic' }}>door into the</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-line style={{ display: 'block' }}>company.</span>
          </div>
        </h1>

        {/* subtext + stat row */}
        <div data-sub style={{
          opacity: 0,
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.8,
            color: 'rgba(14,14,14,0.45)', margin: 0, maxWidth: '440px',
          }}>
            Media, investors, talent, partners and policy stakeholders — every audience has a dedicated way to reach us.
          </p>
          <div style={{ display: 'flex', gap: 'clamp(28px,4vw,60px)', flexShrink: 0 }}>
            {[['06', 'Channels'], ['1993', 'In India since'], ['70+', 'Countries']].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#0E0E0E', lineHeight: 1 }}>
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

      {/* ── 3-COL DARK CHANNEL CARDS (3 top + 3 bottom) ── */}
      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems: 'start',
          background: '#0E0E0E',
          margin: '0',
          border: BORDER,
          borderTop: 'none',
        }}
      >
        {CHANNELS.map((ch, i) => (
          <ChannelCard
            key={ch.num}
            {...ch}
            hasRightBorder={i % 3 < 2}
            hasBottomBorder={i < 3}
          />
        ))}
      </div>

      {/* ── ADDRESS ── */}
      <section
        ref={addrRef}
        id="address"
        style={{
          background: '#F2EDE4',
          padding: 'clamp(48px,7vh,80px) clamp(24px,6vw,80px) 0',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        {/* heading row — full width */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(32px,5vh,56px)' }}>
          <div>
            <div data-a style={{ opacity: 0, marginBottom: '14px' }}>
              <span style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A' }}>
                Corporate Office
              </span>
            </div>
            <h2 data-a style={{
              opacity: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px,6vw,88px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.92,
              color: '#0E0E0E', margin: 0,
            }}>
              Visit us <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>in Gurugram.</em>
            </h2>
          </div>
          <p data-a style={{
            opacity: 0,
            fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8,
            color: 'rgba(14,14,14,0.4)', margin: 0, maxWidth: '300px', textAlign: 'right',
          }}>
            Our corporate office welcomes registered visitors. Please reach out via the relevant channel before visiting.
          </p>
        </div>

        {/* 4-col detail grid — full width, flush to bottom */}
        <div data-a style={{
          opacity: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}>
          {[
            { label: 'Address', value: 'Building 8C, DLF Cyber City\nGurugram, Haryana 122002\nIndia' },
            { label: 'Hours', value: 'Monday – Friday\n9:00 AM – 6:00 PM IST' },
            { label: 'General Enquiries', value: 'india@pernod-ricard.com', isEmail: true },
            { label: 'Region', value: 'South Asia\nPernod Ricard Group' },
          ].map((row, i) => (
            <div key={row.label} style={{
              padding: 'clamp(20px,3vh,32px) clamp(16px,2vw,28px)',
              borderRight: i < 3 ? '1px solid rgba(14,14,14,0.08)' : 'none',
            }}>
              <div style={{ fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#BFA05A', marginBottom: '12px' }}>
                {row.label}
              </div>
              {row.isEmail ? (
                <a
                  href={`mailto:${row.value}`}
                  style={{ fontSize: 'clamp(13px,1.2vw,16px)', color: 'rgba(14,14,14,0.6)', textDecoration: 'none', lineHeight: 1.6, transition: 'color 0.2s', display: 'block' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#BFA05A')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(14,14,14,0.6)')}
                >
                  {row.value}
                </a>
              ) : (
                <div style={{ fontSize: 'clamp(13px,1.2vw,16px)', color: 'rgba(14,14,14,0.6)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {row.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BRANDS STRIP ── */}
      <section ref={brandsRef} style={{
        background: '#F2EDE4',
        padding: 'clamp(40px,6vh,64px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(14,14,14,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(20px,3vh,32px)', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', marginBottom: '8px' }}>
              A house of brands
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.8vw,40px)', fontWeight: 300, letterSpacing: '-0.02em', color: '#0E0E0E', lineHeight: 1 }}>
              Made and shared in India.
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
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#BFA05A'; e.currentTarget.style.color = '#0E0E0E' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#BFA05A' }}
          >
            All 66 brands →
          </Link>
        </div>

        {/* 7 cols × 2 rows = 14 pills, zero orphans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0', border: '1px solid rgba(14,14,14,0.1)', borderRight: 'none', borderBottom: 'none' }}>
          {BRANDS.map(name => (
            <div
              key={name}
              data-b
              style={{
                opacity: 0,
                padding: 'clamp(12px,1.8vh,18px) clamp(10px,1vw,16px)',
                borderRight: '1px solid rgba(14,14,14,0.1)',
                borderBottom: '1px solid rgba(14,14,14,0.1)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(14px,1.3vw,19px)',
                fontWeight: 300, letterSpacing: '-0.01em',
                color: 'rgba(14,14,14,0.55)',
                textAlign: 'center',
                transition: 'background 0.22s, color 0.22s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = '#0E0E0E'; el.style.color = '#F2EDE4'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'transparent'; el.style.color = 'rgba(14,14,14,0.55)'
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
