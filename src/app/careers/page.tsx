'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── data ── */

const VALUES = [
  { num: '01', title: 'Entrepreneurial spirit', body: 'We trust our people to act like owners: to decide, to lead, and to build something that lasts.' },
  { num: '02', title: 'Mutual trust',            body: 'We give and expect candour, respect and freedom in equal measure, across every team and level.' },
  { num: '03', title: 'Sense of ethics',         body: 'We hold to a clear code of conduct, in a regulated category, without exception.' },
]

const REASONS = [
  { num: '01', title: 'Ownership from day one', body: 'A decentralised culture where you are trusted to lead, decide and shape the business early.' },
  { num: '02', title: 'Brands worth building',  body: 'Some of India\'s best-known spirits brands and global icons, to grow with real investment behind them.' },
  { num: '03', title: 'Grow without limits',    body: 'Mobility across functions, markets and the wider Pernod Ricard group, with development that travels with you.' },
  { num: '04', title: 'A workplace that cares', body: 'Inclusive, safe and fair by commitment, with wellbeing and belonging treated as seriously as performance.' },
]

const DEPARTMENTS = [
  { name: 'Marketing & Brand',   body: 'Build and steward premium Indian and international brands in one of the world\'s most dynamic markets.' },
  { name: 'Operations & Supply', body: 'Run distillation, blending, bottling and logistics across our national manufacturing network.' },
  { name: 'Sales & Commercial',  body: 'Bring our portfolio to market responsibly, partnering with trade across the country.' },
  { name: 'Technology & Data',   body: 'Engineer the platforms and insight behind a modern, premium spirits business.' },
  { name: 'Finance & Strategy',  body: 'Steward value and shape long-term direction in a regulated, fast-moving category.' },
  { name: 'People & Culture',    body: 'Attract, grow and care for the people who make the business what it is.' },
]

const LOCATIONS = [
  { num: '01', city: 'Gurugram',        desc: 'Our corporate head office at DLF Cyber City, Haryana.' },
  { num: '02', city: 'Mumbai',          desc: 'A commercial and marketing hub on the west coast.' },
  { num: '03', city: 'Nashik & Behror', desc: 'Our distilleries and winery, where the spirits are made.' },
  { num: '04', city: 'Nationwide',      desc: 'Sales and operations teams across India\'s states and union territories.' },
]

const PROCESS = [
  { num: '01', title: 'Apply',         body: 'Tell us where you would make an impact, and share your profile.' },
  { num: '02', title: 'Conversation',  body: 'A first conversation with our talent team to understand your ambitions.' },
  { num: '03', title: 'Meet the team', body: 'Meet the people and leaders you would work alongside.' },
  { num: '04', title: 'Welcome',       body: 'An offer, an onboarding, and ownership from day one.' },
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
    q: 'Why build a career at Pernod Ricard India?',
    a: 'A decentralised culture trusts you to lead early, you work on leading Indian and international brands, and you can grow across functions, markets and the wider Pernod Ricard group.',
  },
  {
    q: 'What kind of roles are available?',
    a: 'Opportunities span marketing and brand, operations and supply, sales and commercial, technology and data, finance and strategy, and people and culture.',
  },
  {
    q: 'Does the company support inclusion and wellbeing?',
    a: 'Yes. Inclusive, safe and fair workplaces are a stated commitment, with wellbeing and belonging treated as seriously as performance.',
  },
]

const AREAS = [
  'Marketing & Brand',
  'Operations & Supply',
  'Sales & Commercial',
  'Technology & Data',
  'Finance & Strategy',
  'People & Culture',
]

/* ── sub-components ── */

function DeptRow({ name, body }: { name: string; body: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-dept
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'grid',
        gridTemplateColumns: 'clamp(180px,28vw,340px) 1fr auto',
        gap: 'clamp(16px,2.5vw,40px)',
        alignItems: 'center',
        padding: 'clamp(20px,3vh,30px) clamp(16px,2vw,28px)',
        borderTop: '1px solid rgba(14,14,14,0.1)',
        background: hov ? '#0E0E0E' : 'transparent',
        transition: 'background 0.28s',
        cursor: 'default',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(20px,2.3vw,34px)',
        fontWeight: 300, letterSpacing: '-0.01em',
        color: hov ? '#F2EDE4' : '#0E0E0E',
        transition: 'color 0.28s',
      }}>
        {name}
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(11px,0.95vw,13px)', lineHeight: 1.75,
        color: hov ? 'rgba(242,237,228,0.42)' : 'rgba(14,14,14,0.38)',
        margin: 0, transition: 'color 0.28s',
      }}>
        {body}
      </p>
      <div style={{
        fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase',
        color: hov ? '#BFA05A' : 'transparent',
        transition: 'color 0.28s', whiteSpace: 'nowrap',
      }}>
        Express interest →
      </div>
    </div>
  )
}

function ReasonCard({ num, title, body, borderRight, borderBottom }: {
  num: string; title: string; body: string; borderRight: boolean; borderBottom: boolean
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      data-reason
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        padding: 'clamp(32px,5vh,52px) clamp(24px,3.5vw,48px)',
        borderRight:  borderRight  ? '1px solid rgba(242,237,228,0.07)' : 'none',
        borderBottom: borderBottom ? '1px solid rgba(242,237,228,0.07)' : 'none',
        background: hov ? 'rgba(191,160,90,0.06)' : 'transparent',
        transition: 'background 0.35s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: hov ? '#BFA05A' : 'rgba(191,160,90,0.4)', transition: 'color 0.3s' }}>
          {num}
        </span>
        <div style={{ flex: 1, height: '1px', background: hov ? 'rgba(191,160,90,0.3)' : 'rgba(191,160,90,0.1)', transition: 'background 0.3s' }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(24px,3vw,44px)',
        fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
        color: hov ? '#F2EDE4' : 'rgba(242,237,228,0.7)',
        marginBottom: 'clamp(14px,2vh,22px)',
        transition: 'color 0.3s',
      }}>
        {title}
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.8,
        color: hov ? 'rgba(242,237,228,0.48)' : 'rgba(242,237,228,0.28)',
        margin: 0, transition: 'color 0.3s',
      }}>
        {body}
      </p>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        borderTop: '1px solid rgba(242,237,228,0.08)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '24px',
          padding: 'clamp(20px,3vh,32px) 0',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(18px,2vw,30px)',
          fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.1,
          color: '#F2EDE4',
        }}>
          {q}
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20px,2vw,28px)',
          color: '#BFA05A', flexShrink: 0, lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s ease',
          display: 'block',
        }}>
          +
        </span>
      </button>
      <div style={{
        maxHeight: open ? '200px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.8,
          color: 'rgba(242,237,228,0.45)',
          margin: '0 0 clamp(20px,3vh,32px)',
          maxWidth: '680px',
          paddingRight: '48px',
        }}>
          {a}
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
        padding: 'clamp(18px,2.5vh,28px) clamp(14px,1.8vw,24px)',
        borderRight: '1px solid rgba(14,14,14,0.1)',
        borderBottom: '1px solid rgba(14,14,14,0.1)',
        background: hov ? '#0E0E0E' : 'transparent',
        transition: 'background 0.25s',
        cursor: 'default',
      }}
    >
      <div style={{
        fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase',
        color: hov ? 'rgba(191,160,90,0.7)' : 'rgba(14,14,14,0.3)',
        marginBottom: '8px', transition: 'color 0.25s',
      }}>
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

/* ── shared styles ── */
const INPUT: React.CSSProperties = {
  width: '100%',
  background: 'rgba(242,237,228,0.05)',
  border: '1px solid rgba(242,237,228,0.12)',
  padding: 'clamp(12px,1.6vh,16px) clamp(14px,1.5vw,18px)',
  color: '#F2EDE4',
  fontFamily: 'var(--font-body)',
  fontSize: 'clamp(12px,1vw,14px)',
  outline: 'none',
  borderRadius: 0,
  boxSizing: 'border-box',
}
const LABEL: React.CSSProperties = {
  display: 'block',
  fontSize: '7px',
  letterSpacing: '0.38em',
  textTransform: 'uppercase',
  color: '#BFA05A',
  marginBottom: '8px',
}

/* ── page ── */

export default function CareersPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const heroRef    = useRef<HTMLElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const valuesRef  = useRef<HTMLElement>(null)
  const reasonsRef = useRef<HTMLDivElement>(null)
  const deptRef    = useRef<HTMLElement>(null)
  const locsRef    = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)
  const brandsRef  = useRef<HTMLElement>(null)

  /* form state */
  const [form, setForm] = useState({
    name: '', email: '', phone: '', area: '', location: '', experience: '', portfolio: '', note: '',
  })
  const [consent, setConsent] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Career Interest — ${form.area || 'General'} — ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\nArea of Interest: ${form.area}\nPreferred Location: ${form.location || 'Not specified'}\nYears of Experience: ${form.experience || 'Not specified'}\nPortfolio / LinkedIn: ${form.portfolio || 'Not provided'}\n\nCover Note:\n${form.note || 'None'}`
    )
    window.location.href = `mailto:talent@pernod-ricard.com?subject=${subject}&body=${body}`
  }

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
    if (!statsRef.current) return
    gsap.fromTo(statsRef.current.querySelectorAll('[data-stat]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' } }
    )
  }, [])

  useEffect(() => {
    if (!valuesRef.current) return
    gsap.fromTo(valuesRef.current.querySelectorAll('[data-val]'),
      { opacity: 0, x: -32 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' } }
    )
  }, [])

  useEffect(() => {
    if (!reasonsRef.current) return
    gsap.fromTo('[data-reason]',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: reasonsRef.current, start: 'top 82%' } }
    )
  }, [])

  useEffect(() => {
    if (!deptRef.current) return
    gsap.fromTo(deptRef.current.querySelectorAll('[data-dept]'),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: deptRef.current, start: 'top 82%' } }
    )
  }, [])

  useEffect(() => {
    if (!locsRef.current) return
    gsap.fromTo(locsRef.current.querySelectorAll('[data-loc]'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: locsRef.current, start: 'top 82%' } }
    )
  }, [])

  useEffect(() => {
    if (!processRef.current) return
    gsap.fromTo(processRef.current.querySelectorAll('[data-step]'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: processRef.current, start: 'top 82%' } }
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

        <div data-hlbl style={{ opacity: 0, marginBottom: '14px' }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A' }}>
            Working at Pernod Ricard India
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px,10vw,148px)',
          fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
          color: '#0E0E0E', margin: '0 0 clamp(28px,4vh,44px)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block' }}>Build something</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block', color: 'rgba(14,14,14,0.18)', fontStyle: 'italic' }}>that lasts.</span>
          </div>
        </h1>

        <div data-hsub style={{
          opacity: 0,
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.8,
            color: 'rgba(14,14,14,0.45)', margin: 0, maxWidth: '460px',
          }}>
            Join one of India's leading premium spirits companies, a place where you are trusted to lead early, given brands worth building, and able to grow across the wider Pernod Ricard group.
          </p>
          <a
            href="#apply"
            style={{
              fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#0E0E0E', textDecoration: 'none',
              padding: 'clamp(12px,1.5vh,16px) clamp(20px,2.5vw,32px)',
              border: '1px solid rgba(14,14,14,0.3)',
              transition: 'background 0.25s, color 0.25s, border-color 0.25s',
              whiteSpace: 'nowrap', display: 'block', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0E0E0E'; e.currentTarget.style.color = '#F2EDE4' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0E0E0E' }}
          >
            Submit your interest →
          </a>
        </div>
      </section>

      {/* ── STATS STRIP — dark ── */}
      <div
        ref={statsRef}
        style={{
          background: '#0E0E0E',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px,22vw,260px), 1fr))',
          borderTop: '1px solid rgba(242,237,228,0.06)',
        }}
      >
        {[
          { val: 'Créateurs De convivialité', lbl: 'Our purpose' },
          { val: '23 hrs',                   lbl: 'Learning per employee, a year' },
          { val: 'Coursera',                 lbl: 'Unlimited learning access' },
          { val: '1,400+',                   lbl: 'Colleagues across India' },
        ].map((s, i) => (
          <div
            key={i}
            data-stat
            style={{
              opacity: 0,
              padding: 'clamp(28px,4vh,44px) clamp(20px,2.5vw,36px)',
              borderRight: i < 3 ? '1px solid rgba(242,237,228,0.06)' : 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: i === 0 ? 'clamp(16px,1.6vw,22px)' : 'clamp(28px,3.5vw,48px)',
              fontWeight: 300, letterSpacing: i === 0 ? '0.01em' : '-0.03em',
              color: '#F2EDE4', lineHeight: 1,
              marginBottom: '10px',
              fontStyle: i === 0 ? 'italic' : 'normal',
            }}>
              {s.val}
            </div>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,237,228,0.28)' }}>
              {s.lbl}
            </div>
          </div>
        ))}
      </div>

      {/* ── WHAT WE VALUE ── */}
      <section
        ref={valuesRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(44px,7vh,80px)' }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0 }}>
            What we value
          </p>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px,4vw,60px)',
            fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
            color: '#0E0E0E', textAlign: 'right',
          }}>
            Three values,<br />
            <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>lived every day.</em>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {VALUES.map((v, i) => (
            <div
              key={i}
              data-val
              style={{
                opacity: 0,
                display: 'grid',
                gridTemplateColumns: 'clamp(28px,3.5vw,52px) 1fr',
                gap: 'clamp(16px,2.5vw,40px)',
                alignItems: 'start',
                padding: 'clamp(24px,3.5vh,40px) 0',
                borderTop: '1px solid rgba(14,14,14,0.1)',
              }}
            >
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#BFA05A', paddingTop: '6px' }}>
                {v.num}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(10px,1.5vh,16px) clamp(24px,4vw,64px)', alignItems: 'baseline' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px,3.2vw,48px)',
                  fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1,
                  color: '#0E0E0E', flexShrink: 0,
                  minWidth: 'clamp(160px,28vw,360px)',
                }}>
                  {v.title}
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.78,
                  color: 'rgba(14,14,14,0.42)', margin: 0, maxWidth: '380px',
                }}>
                  {v.body}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(14,14,14,0.1)' }} />
        </div>
      </section>

      {/* ── WHY BUILD HERE — dark 2×2 ── */}
      <div style={{ background: '#0E0E0E', borderTop: '1px solid rgba(242,237,228,0.06)' }}>
        <div style={{ padding: 'clamp(40px,5vh,56px) clamp(24px,6vw,80px) 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0 }}>
              Why build here
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px,3.5vw,52px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#F2EDE4', textAlign: 'right',
            }}>
              An employer<br />
              <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>worth choosing.</em>
            </div>
          </div>
        </div>
        <div
          ref={reasonsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            marginTop: 'clamp(32px,4.5vh,52px)',
          }}
        >
          {REASONS.map((r, i) => (
            <ReasonCard
              key={i}
              {...r}
              borderRight={i % 2 === 0}
              borderBottom={i < 2}
            />
          ))}
        </div>
      </div>

      {/* ── WHERE YOU COULD GROW — dept rows ── */}
      <section
        ref={deptRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '20px', marginBottom: 'clamp(44px,6vh,64px)',
        }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0 }}>
            Where you could grow
          </p>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px,3.5vw,52px)',
            fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
            color: '#0E0E0E', textAlign: 'right',
          }}>
            Find your place<br />
            <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>in the business.</em>
          </div>
        </div>

        <div>
          {DEPARTMENTS.map((d, i) => (
            <DeptRow key={i} name={d.name} body={d.body} />
          ))}
          <div style={{ borderTop: '1px solid rgba(14,14,14,0.1)' }} />
        </div>
      </section>

      {/* ── LIFE HERE — dark centred quote ── */}
      <section style={{
        background: '#080A10',
        padding: 'clamp(72px,12vh,140px) clamp(24px,6vw,80px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(242,237,228,0.06)',
      }}>
        <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 clamp(20px,3vh,32px)' }}>
          Life here
        </p>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px,5vw,80px)',
          fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.92,
          color: '#F2EDE4',
          marginBottom: 'clamp(20px,3vh,32px)',
        }}>
          A place to grow,<br />
          <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>with brands worth building.</em>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px,1.3vw,17px)', lineHeight: 1.82,
          color: 'rgba(242,237,228,0.35)',
          maxWidth: '520px', margin: '0 auto clamp(28px,4vh,44px)',
        }}>
          Great brands are built by people who are trusted to lead.
        </p>
        <a
          href="#apply"
          style={{
            display: 'inline-block',
            fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#BFA05A', textDecoration: 'none',
            padding: 'clamp(12px,1.5vh,16px) clamp(20px,2.5vw,32px)',
            border: '1px solid rgba(191,160,90,0.4)',
            transition: 'background 0.25s, color 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#BFA05A'; e.currentTarget.style.color = '#0E0E0E' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#BFA05A' }}
        >
          Talk to our talent team →
        </a>
      </section>

      {/* ── WHERE YOU WOULD WORK ── */}
      <section
        ref={locsRef}
        style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(44px,6vh,64px)' }}>
          <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0 }}>
            Where you would work
          </p>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px,3vw,44px)',
            fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
            color: '#0E0E0E', textAlign: 'right',
          }}>
            Hubs and houses<br />
            <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>across India.</em>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px,22vw,280px), 1fr))',
          gap: '0',
          border: '1px solid rgba(14,14,14,0.1)',
          borderRight: 'none',
        }}>
          {LOCATIONS.map((loc, i) => (
            <div
              key={i}
              data-loc
              style={{
                opacity: 0,
                padding: 'clamp(28px,4vh,44px) clamp(20px,2.5vw,32px)',
                borderRight: '1px solid rgba(14,14,14,0.1)',
              }}
            >
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#BFA05A', display: 'block', marginBottom: '20px' }}>
                {loc.num}
              </span>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px,3vw,44px)',
                fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
                color: '#0E0E0E', marginBottom: 'clamp(12px,1.8vh,20px)',
              }}>
                {loc.city}
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.75,
                color: 'rgba(14,14,14,0.4)', margin: 0,
              }}>
                {loc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPRESS YOUR INTEREST — process + form ── */}
      <section
        id="apply"
        style={{
          background: '#0E0E0E',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(242,237,228,0.06)',
        }}
      >
        <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 clamp(12px,1.5vh,20px)' }}>
          Express your interest
        </p>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px,4.5vw,68px)',
          fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
          color: '#F2EDE4', marginBottom: 'clamp(44px,7vh,80px)',
        }}>
          Tell us where you would<br />
          <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>make an impact.</em>
        </div>

        {/* 4-step process */}
        <section ref={processRef} style={{ marginBottom: 'clamp(56px,8vh,96px)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px,20vw,240px), 1fr))',
            gap: '0',
            border: '1px solid rgba(242,237,228,0.07)',
            borderRight: 'none',
          }}>
            {PROCESS.map((p, i) => (
              <div
                key={i}
                data-step
                style={{
                  opacity: 0,
                  padding: 'clamp(24px,3.5vh,40px) clamp(18px,2.2vw,32px)',
                  borderRight: '1px solid rgba(242,237,228,0.07)',
                }}
              >
                <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#BFA05A', display: 'block', marginBottom: '18px' }}>
                  {p.num}
                </span>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px,2.2vw,34px)',
                  fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.95,
                  color: '#F2EDE4', marginBottom: 'clamp(10px,1.5vh,16px)',
                }}>
                  {p.title}
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(11px,0.95vw,13px)', lineHeight: 1.75,
                  color: 'rgba(242,237,228,0.35)', margin: 0,
                }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* application form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px,40vw,420px), 1fr))',
            gap: 'clamp(20px,3vh,28px) clamp(20px,3vw,40px)',
          }}>

            <div>
              <label style={LABEL}>Full name *</label>
              <input
                required
                value={form.name}
                onChange={set('name')}
                placeholder="Your full name"
                style={INPUT}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(191,160,90,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)')}
              />
            </div>

            <div>
              <label style={LABEL}>Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="your@email.com"
                style={INPUT}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(191,160,90,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)')}
              />
            </div>

            <div>
              <label style={LABEL}>Phone (optional)</label>
              <input
                value={form.phone}
                onChange={set('phone')}
                placeholder="+91"
                style={INPUT}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(191,160,90,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)')}
              />
            </div>

            <div>
              <label style={LABEL}>Area of interest *</label>
              <select
                required
                value={form.area}
                onChange={set('area')}
                style={{ ...INPUT, color: form.area ? '#F2EDE4' : 'rgba(242,237,228,0.3)' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(191,160,90,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)')}
              >
                <option value="" disabled style={{ background: '#0E0E0E' }}>Select an area</option>
                {AREAS.map(a => <option key={a} value={a} style={{ background: '#0E0E0E' }}>{a}</option>)}
              </select>
            </div>

            <div>
              <label style={LABEL}>Preferred location (optional)</label>
              <input
                value={form.location}
                onChange={set('location')}
                placeholder="Gurugram, Mumbai, etc."
                style={INPUT}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(191,160,90,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)')}
              />
            </div>

            <div>
              <label style={LABEL}>Years of experience (optional)</label>
              <input
                value={form.experience}
                onChange={set('experience')}
                placeholder="e.g. 5"
                style={INPUT}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(191,160,90,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)')}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={LABEL}>Portfolio or LinkedIn (optional)</label>
              <input
                value={form.portfolio}
                onChange={set('portfolio')}
                placeholder="https://"
                style={INPUT}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(191,160,90,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)')}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={LABEL}>Cover note (optional)</label>
              <textarea
                value={form.note}
                onChange={set('note')}
                rows={5}
                placeholder="Tell us what draws you here and where you would make an impact."
                style={{ ...INPUT, resize: 'vertical' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(191,160,90,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)')}
              />
            </div>

          </div>

          {/* consent */}
          <label style={{
            display: 'flex', alignItems: 'flex-start', gap: '14px',
            marginTop: 'clamp(24px,3.5vh,36px)',
            cursor: 'pointer',
          }}>
            <div
              onClick={() => setConsent(c => !c)}
              style={{
                width: '16px', height: '16px', flexShrink: 0,
                border: `1px solid ${consent ? '#BFA05A' : 'rgba(242,237,228,0.2)'}`,
                background: consent ? '#BFA05A' : 'transparent',
                marginTop: '2px', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {consent && <span style={{ color: '#0E0E0E', fontSize: '10px', lineHeight: 1 }}>✓</span>}
            </div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(11px,0.95vw,13px)', lineHeight: 1.7,
              color: 'rgba(242,237,228,0.38)',
            }}>
              I consent to Pernod Ricard India processing my details for recruitment, in line with its privacy notice and the DPDP Act.
            </span>
          </label>

          <div style={{ marginTop: 'clamp(28px,4vh,40px)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <button
              type="submit"
              disabled={!consent}
              style={{
                background: consent ? '#BFA05A' : 'rgba(191,160,90,0.2)',
                border: 'none', cursor: consent ? 'pointer' : 'not-allowed',
                padding: 'clamp(12px,1.6vh,18px) clamp(24px,3vw,44px)',
                fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
                color: consent ? '#0E0E0E' : 'rgba(191,160,90,0.4)',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.25s',
              }}
            >
              Submit your interest →
            </button>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(10px,0.9vw,12px)', lineHeight: 1.6,
              color: 'rgba(242,237,228,0.25)', margin: 0, maxWidth: '360px',
            }}>
              This opens a pre-filled email to our talent team. We will never ask for payment to apply.
            </p>
          </div>
        </form>
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
            <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 12px' }}>
              Brands in focus
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,4vw,60px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#0E0E0E',
            }}>
              The brands you could<br />
              <em style={{ color: 'rgba(14,14,14,0.2)', fontStyle: 'italic' }}>help build.</em>
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
            View all brands →
          </Link>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(120px,16vw,200px), 1fr))',
          border: '1px solid rgba(14,14,14,0.1)',
          borderRight: 'none',
          borderBottom: 'none',
        }}>
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
          <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: 0 }}>
            Answers
          </p>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px,3.5vw,52px)',
            fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
            color: '#F2EDE4', textAlign: 'right',
          }}>
            Working here,<br />
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
