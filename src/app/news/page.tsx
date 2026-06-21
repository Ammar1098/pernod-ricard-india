'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── data ── */

const ARTICLES = [
  {
    cat: 'Results',
    date: '28 May 2026',
    title: 'Pernod Ricard India reports its full-year performance',
    desc: 'A summary of the business\'s annual performance, with continued momentum in the premium portfolio.',
    slug: '/news/full-year-performance-update',
  },
  {
    cat: 'Sustainability',
    date: '15 April 2026',
    title: 'A new water-stewardship milestone across Indian operations',
    desc: 'Progress on the 2030 roadmap, with improved water efficiency at manufacturing and sourcing sites.',
    slug: '/news/distillery-water-stewardship-milestone',
  },
  {
    cat: 'People',
    date: '2 March 2026',
    title: 'Strengthening our employer brand and talent commitment',
    desc: 'New initiatives to attract and develop senior talent across the India business.',
    slug: '/news/employer-brand-talent-commitment',
  },
  {
    cat: 'Brands',
    date: '18 February 2026',
    title: 'Premiumisation continues to drive portfolio growth',
    desc: 'Demand for prestige Indian whiskies and international brands underlines the company\'s premium-led strategy.',
    slug: '/news/premiumisation-drives-portfolio-growth',
  },
  {
    cat: 'Corporate',
    date: '20 January 2026',
    title: 'Expanding responsible-hosting programmes nationwide',
    desc: 'Programmes that address the misuse of alcohol reach more communities across India.',
    slug: '/news/responsible-hosting-programme-expansion',
  },
  {
    cat: 'Corporate',
    date: '5 December 2025',
    title: 'Continued investment in local manufacturing',
    desc: 'Investment across the company\'s national network of distilleries and bottling plants strengthens resilience and quality.',
    slug: '/news/local-manufacturing-investment',
  },
]

const CATEGORIES = ['All', 'Results', 'Sustainability', 'People', 'Brands', 'Corporate']

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

type Article = typeof ARTICLES[0]

function FeaturedArticle({ a }: { a: Article }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={a.slug}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        background: hov ? '#141414' : '#0E0E0E',
        padding: 'clamp(44px,7vh,80px) clamp(24px,6vw,80px)',
        textDecoration: 'none',
        transition: 'background 0.3s',
        borderTop: '1px solid rgba(242,237,228,0.07)',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(120px,18vw,240px) 1fr',
        gap: 'clamp(24px,4vw,80px)',
        alignItems: 'start',
      }}>
        {/* left col — meta */}
        <div>
          <div style={{
            display: 'inline-block',
            fontSize: '7px', letterSpacing: '0.38em', textTransform: 'uppercase',
            color: '#BFA05A',
            border: '1px solid rgba(191,160,90,0.35)',
            padding: '5px 10px',
            marginBottom: 'clamp(16px,2.5vh,28px)',
          }}>
            {a.cat}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(10px,0.9vw,12px)',
            letterSpacing: '0.15em',
            color: 'rgba(242,237,228,0.28)',
            textTransform: 'uppercase',
          }}>
            {a.date}
          </div>
        </div>

        {/* right col — content */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px,4.5vw,72px)',
            fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.92,
            color: hov ? '#F2EDE4' : 'rgba(242,237,228,0.85)',
            marginBottom: 'clamp(18px,2.5vh,32px)',
            transition: 'color 0.3s',
          }}>
            {a.title}
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px,1.1vw,16px)', lineHeight: 1.8,
            color: 'rgba(242,237,228,0.38)',
            margin: '0 0 clamp(20px,3vh,36px)',
            maxWidth: '560px',
          }}>
            {a.desc}
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: hov ? '48px' : '28px',
              height: '1px',
              background: '#BFA05A',
              transition: 'width 0.35s ease',
            }} />
            <span style={{
              fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#BFA05A',
            }}>
              Read more
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ArticleCard({ a, index }: { a: Article; index: number }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={a.slug}
      data-card
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(24px,3.5vh,40px) clamp(20px,2.5vw,32px)',
        background: hov ? '#0E0E0E' : '#F2EDE4',
        borderRight: '1px solid rgba(14,14,14,0.1)',
        borderBottom: '1px solid rgba(14,14,14,0.1)',
        textDecoration: 'none',
        transition: 'background 0.3s',
        minHeight: 'clamp(220px,28vh,320px)',
      }}
    >
      {/* top meta row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(18px,2.5vh,28px)' }}>
        <span style={{
          fontSize: '7px', letterSpacing: '0.38em', textTransform: 'uppercase',
          color: hov ? '#BFA05A' : 'rgba(191,160,90,0.8)',
          transition: 'color 0.3s',
        }}>
          {a.cat}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(9px,0.8vw,11px)', letterSpacing: '0.1em',
          color: hov ? 'rgba(242,237,228,0.28)' : 'rgba(14,14,14,0.28)',
          transition: 'color 0.3s',
        }}>
          {a.date}
        </span>
      </div>

      {/* title */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(20px,2vw,32px)',
        fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.05,
        color: hov ? '#F2EDE4' : '#0E0E0E',
        marginBottom: 'clamp(12px,1.8vh,20px)',
        transition: 'color 0.3s',
        flex: 1,
      }}>
        {a.title}
      </div>

      {/* desc */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(11px,0.95vw,13px)', lineHeight: 1.75,
        color: hov ? 'rgba(242,237,228,0.4)' : 'rgba(14,14,14,0.38)',
        margin: '0 0 clamp(16px,2.5vh,28px)',
        transition: 'color 0.3s',
      }}>
        {a.desc}
      </p>

      {/* read link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto' }}>
        <div style={{
          width: hov ? '36px' : '20px',
          height: '1px',
          background: '#BFA05A',
          transition: 'width 0.3s ease',
        }} />
        <span style={{
          fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase',
          color: '#BFA05A',
        }}>
          Read
        </span>
      </div>
    </Link>
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
        borderRight: '1px solid rgba(242,237,228,0.07)',
        borderBottom: '1px solid rgba(242,237,228,0.07)',
        background: hov ? 'rgba(191,160,90,0.07)' : 'transparent',
        transition: 'background 0.25s',
        cursor: 'default',
      }}
    >
      <div style={{
        fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase',
        color: hov ? '#BFA05A' : 'rgba(191,160,90,0.4)',
        marginBottom: '8px', transition: 'color 0.25s',
      }}>
        {cat}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(14px,1.4vw,20px)',
        fontWeight: 300, letterSpacing: '-0.01em',
        color: hov ? '#F2EDE4' : 'rgba(242,237,228,0.55)',
        transition: 'color 0.25s',
      }}>
        {name}
      </div>
    </div>
  )
}

/* ── page ── */

export default function NewsPage() {
  const pageRef   = useRef<HTMLDivElement>(null)
  const heroRef   = useRef<HTMLElement>(null)
  const gridRef   = useRef<HTMLDivElement>(null)
  const brandsRef = useRef<HTMLElement>(null)

  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? ARTICLES : ARTICLES.filter(a => a.cat === active)
  const featured = filtered[0] ?? null
  const rest     = filtered.slice(1)

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

  /* re-animate cards whenever filter changes */
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-card]')
    gsap.fromTo(cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.07 }
    )
  }, [active])

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

        <div data-hlbl style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(10px,1vw,14px)', color: 'rgba(14,14,14,0.25)', letterSpacing: '0.05em' }}>06</span>
          <div style={{ width: '20px', height: '1px', background: 'rgba(14,14,14,0.2)' }} />
          <span style={{ fontSize: '8px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A' }}>
            Newsroom
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px,10vw,148px)',
          fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
          color: '#0E0E0E', margin: '0 0 clamp(28px,4vh,44px)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block' }}>The company,</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span data-hln style={{ display: 'block', color: 'rgba(14,14,14,0.18)', fontStyle: 'italic' }}>in its own words.</span>
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
            Results, sustainability progress, people and corporate communications — the record media, partners and stakeholders can rely on.
          </p>
          <div style={{ display: 'flex', gap: 'clamp(24px,4vw,56px)', flexShrink: 0 }}>
            {[['6', 'Releases'], ['5', 'Categories'], ['2026', 'Latest year']].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#0E0E0E', lineHeight: 1 }}>
                  {val}
                </div>
                <div style={{ fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(14,14,14,0.32)', marginTop: '5px' }}>
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <div style={{
        background: '#F2EDE4',
        padding: '0 clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(14,14,14,0.08)',
        display: 'flex', alignItems: 'center',
        gap: 'clamp(4px,1vw,8px)', flexWrap: 'wrap',
        paddingTop: 'clamp(18px,2.5vh,28px)',
        paddingBottom: 'clamp(18px,2.5vh,28px)',
      }}>
        {CATEGORIES.map(cat => {
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                background: isActive ? '#0E0E0E' : 'transparent',
                border: `1px solid ${isActive ? '#0E0E0E' : 'rgba(14,14,14,0.2)'}`,
                padding: 'clamp(7px,1vh,10px) clamp(12px,1.5vw,20px)',
                fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase',
                color: isActive ? '#F2EDE4' : 'rgba(14,14,14,0.5)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.22s',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(14,14,14,0.5)'
                  e.currentTarget.style.color = '#0E0E0E'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(14,14,14,0.2)'
                  e.currentTarget.style.color = 'rgba(14,14,14,0.5)'
                }
              }}
            >
              {cat}
            </button>
          )
        })}
        {active !== 'All' && (
          <span style={{ fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(14,14,14,0.3)', marginLeft: 'auto', fontFamily: 'var(--font-body)' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* ── FEATURED ARTICLE — dark ── */}
      {featured && <FeaturedArticle a={featured} />}

      {/* ── ARTICLE GRID — cream ── */}
      {rest.length > 0 && (
        <section style={{
          background: '#F2EDE4',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}>
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,28vw,380px), 1fr))',
              borderLeft: '1px solid rgba(14,14,14,0.1)',
              borderTop: '1px solid rgba(14,14,14,0.1)',
            }}
          >
            {rest.map((a, i) => (
              <ArticleCard key={a.slug} a={a} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* empty state */}
      {filtered.length === 0 && (
        <div style={{
          background: '#F2EDE4',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          textAlign: 'center',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,44px)', fontWeight: 300, color: 'rgba(14,14,14,0.2)', marginBottom: '16px' }}>
            No releases yet
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(14,14,14,0.35)', margin: 0 }}>
            No articles in this category at the moment.
          </p>
        </div>
      )}

      {/* ── BRANDS ── */}
      <section
        ref={brandsRef}
        style={{
          background: '#0E0E0E',
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(242,237,228,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: 'clamp(40px,6vh,60px)' }}>
          <div>
            <p style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', margin: '0 0 14px' }}>
              Brands in focus
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,4vw,60px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#F2EDE4',
            }}>
              The brands<br />
              <em style={{ color: 'rgba(242,237,228,0.2)', fontStyle: 'italic' }}>in the headlines.</em>
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
            View all brands →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(120px,16vw,200px), 1fr))',
          border: '1px solid rgba(242,237,228,0.07)',
          borderRight: 'none',
          borderBottom: 'none',
        }}>
          {BRANDS.map((b, i) => <BrandTile key={i} {...b} />)}
        </div>
      </section>

    </div>
  )
}
