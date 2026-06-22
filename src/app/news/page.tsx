'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── tokens ── */
const HERO_IMG = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80'
const CREAM = '#F5F0E8'
const DARK  = '#111111'
const DARK2 = '#1a1a1a'
const GOLD  = '#C9A96E'
const INK   = '#1C1C1C'

/* ── data ── */

const ARTICLES = [
  {
    cat: 'Results',
    date: '28 May 2026',
    title: 'Pernod Ricard India reports its full-year performance',
    desc: "A summary of the business's annual performance, with continued momentum in the premium portfolio.",
    slug: '/news/full-year-performance-update',
    img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=75',
  },
  {
    cat: 'Sustainability',
    date: '15 April 2026',
    title: 'A new water-stewardship milestone across Indian operations',
    desc: 'Progress on the 2030 roadmap, with improved water efficiency at manufacturing and sourcing sites.',
    slug: '/news/distillery-water-stewardship-milestone',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=75',
  },
  {
    cat: 'People',
    date: '2 March 2026',
    title: 'Strengthening our employer brand and talent commitment',
    desc: 'New initiatives to attract and develop senior talent across the India business.',
    slug: '/news/employer-brand-talent-commitment',
    img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=75',
  },
  {
    cat: 'Brands',
    date: '18 February 2026',
    title: 'Premiumisation continues to drive portfolio growth',
    desc: "Demand for prestige Indian whiskies and international brands underlines the company's premium-led strategy.",
    slug: '/news/premiumisation-drives-portfolio-growth',
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=75',
  },
  {
    cat: 'Corporate',
    date: '20 January 2026',
    title: 'Expanding responsible-hosting programmes nationwide',
    desc: 'Programmes that address the misuse of alcohol reach more communities across India.',
    slug: '/news/responsible-hosting-programme-expansion',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=75',
  },
  {
    cat: 'Corporate',
    date: '5 December 2025',
    title: 'Continued investment in local manufacturing',
    desc: "Investment across the company's national network of distilleries and bottling plants strengthens resilience and quality.",
    slug: '/news/local-manufacturing-investment',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=75',
  },
]

const CATEGORIES = ['All', 'Results', 'Sustainability', 'People', 'Brands', 'Corporate']

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

type Article = typeof ARTICLES[0]

/* ── sub-components ── */

function FeaturedArticle({ a }: { a: Article }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={a.slug}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <div style={{
        display: 'flex',
        height: 'clamp(300px,38vh,440px)',
        overflow: 'hidden',
        background: CREAM,
      }}>
        {/* image left 55% */}
        <div style={{
          width: '55%', flexShrink: 0,
          overflow: 'hidden', position: 'relative',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.img}
            alt={a.title}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          />
          {/* category badge on image */}
          <div style={{
            position: 'absolute', top: '20px', left: '20px',
            background: 'rgba(17,17,17,0.75)',
            backdropFilter: 'blur(6px)',
            padding: '6px 14px',
          }}>
            <span style={{ fontSize: '7px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD }}>
              {a.cat}
            </span>
          </div>
        </div>

        {/* content right */}
        <div style={{
          flex: 1,
          background: CREAM,
          padding: 'clamp(28px,4vh,52px) clamp(28px,4vw,56px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          borderBottom: `1px solid rgba(28,28,28,0.08)`,
        }}>
          <div style={{
            fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
            fontWeight: 500, color: GOLD, marginBottom: '14px',
          }}>
            Featured
          </div>
          <div style={{
            fontSize: '10px', letterSpacing: '0.12em',
            color: 'rgba(28,28,28,0.4)', marginBottom: '16px',
          }}>
            {a.date}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px,2.4vw,36px)',
            fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1,
            color: INK,
            marginBottom: '18px',
            transition: 'color 0.25s',
          }}>
            {a.title}
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(12px,1vw,14px)', lineHeight: 1.8,
            color: 'rgba(28,28,28,0.5)', margin: '0 0 28px',
          }}>
            {a.desc}
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            color: GOLD, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase',
          }}>
            <div style={{
              width: hov ? '40px' : '22px', height: '1px',
              background: GOLD, transition: 'width 0.35s ease',
            }} />
            <span>Read more</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ArticleCard({ a }: { a: Article }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={a.slug}
      data-card
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'block', textDecoration: 'none',
        background: '#fff',
        borderRadius: '2px',
        overflow: 'hidden',
        boxShadow: hov
          ? '0 16px 48px rgba(0,0,0,0.11)'
          : '0 2px 10px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.35s ease',
      }}
    >
      {/* image — 16:9 */}
      <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden', background: '#e8e4dc' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.img}
          alt={a.title}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        {/* gold category tag */}
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          background: 'rgba(17,17,17,0.7)',
          backdropFilter: 'blur(4px)',
          padding: '4px 10px',
          borderRadius: '1px',
        }}>
          <span style={{ fontSize: '7px', letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD }}>
            {a.cat}
          </span>
        </div>
      </div>

      {/* content */}
      <div style={{ padding: '20px 22px 26px' }}>
        <div style={{
          fontSize: '10px', letterSpacing: '0.1em',
          color: 'rgba(28,28,28,0.38)', marginBottom: '10px',
        }}>
          {a.date}
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(15px,1.3vw,19px)',
          fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.25,
          color: INK,
          marginBottom: '10px',
          overflow: 'hidden',
          maxHeight: '3em',
        }}>
          {a.title}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px', lineHeight: 1.72,
          color: 'rgba(28,28,28,0.48)', margin: '0 0 18px',
          overflow: 'hidden', maxHeight: '3.5em',
        }}>
          {a.desc}
        </p>
        <div style={{
          fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: GOLD,
          opacity: hov ? 1 : 0.55,
          transition: 'opacity 0.25s',
        }}>
          Read more →
        </div>
      </div>
    </Link>
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
        borderRight: '1px solid rgba(245,240,232,0.07)',
        borderBottom: '1px solid rgba(245,240,232,0.07)',
        background: hov ? 'rgba(201,169,110,0.07)' : 'transparent',
        transition: 'background 0.25s',
        cursor: 'pointer', textDecoration: 'none', display: 'block',
      }}
    >
      <div style={{
        fontSize: '7px', letterSpacing: '0.35em', textTransform: 'uppercase',
        color: hov ? GOLD : 'rgba(201,169,110,0.4)',
        marginBottom: '8px', transition: 'color 0.25s',
      }}>
        {cat}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(14px,1.4vw,20px)',
        fontWeight: 300, letterSpacing: '-0.01em',
        color: hov ? CREAM : 'rgba(245,240,232,0.55)',
        transition: 'color 0.25s',
      }}>
        {name}
      </div>
    </a>
  )
}

/* ── page ── */

export default function NewsPage() {
  const pageRef   = useRef<HTMLDivElement>(null)
  const heroRef   = useRef<HTMLElement>(null)
  const gridRef   = useRef<HTMLDivElement>(null)
  const brandsRef = useRef<HTMLElement>(null)

  const [active,  setActive]     = useState('All')
  const [visible, setVisible]    = useState(6)
  const [email,   setEmail]      = useState('')
  const [subbed,  setSubbed]     = useState(false)

  const filtered = active === 'All' ? ARTICLES : ARTICLES.filter(a => a.cat === active)
  const featured = filtered[0] ?? null
  const rest     = filtered.slice(1)
  const shown    = rest.slice(0, visible)
  const hasMore  = rest.length > visible

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const tl = gsap.timeline({ delay: 0.12 })
    tl.fromTo('[data-hlbl]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo('[data-hln]',  { y: '110%' },          { y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.07 }, '-=0.3')
      .fromTo('[data-hsub]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-card]')
    gsap.fromTo(cards,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
    )
  }, [active, visible])

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
    <div ref={pageRef} style={{ background: CREAM, minHeight: '100vh', opacity: 0 }}>

      {/* ── HERO — dark split ── */}
      <section ref={heroRef} style={{
        background: DARK,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ background: 'transparent' }}><Nav /></div>

        <div style={{
          display: 'flex',
          minHeight: 'clamp(380px,52vh,560px)',
        }}>
          {/* left — text */}
          <div style={{
            flex: '0 0 55%',
            padding: 'clamp(40px,6vh,72px) clamp(24px,6vw,80px) clamp(48px,6vh,80px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            position: 'relative', zIndex: 1,
          }}>
            <div data-hlbl style={{ opacity: 0, marginBottom: '20px' }}>
              <span style={{
                fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
                fontWeight: 500, color: GOLD,
              }}>
                Latest Updates
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem,10vw,9rem)',
              fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
              color: CREAM, margin: '0 0 clamp(20px,3vh,32px)',
            }}>
              <div style={{ overflow: 'hidden' }}>
                <span data-hln style={{ display: 'block' }}>Newsroom</span>
              </div>
            </h1>

            <div data-hsub style={{ opacity: 0 }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem,1.4vw,1.2rem)',
                fontStyle: 'italic',
                color: 'rgba(245,240,232,0.55)',
                margin: 0, maxWidth: '400px',
              }}>
                Stories, updates and perspectives from Pernod Ricard India
              </p>
            </div>
          </div>

          {/* right — hero image with gradient */}
          <div style={{
            flex: '0 0 45%',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMG}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* left-to-right dark overlay so text on left is readable */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to right, ${DARK} 0%, rgba(17,17,17,0.4) 45%, rgba(17,17,17,0.05) 100%)`,
            }} />
          </div>
        </div>
      </section>

      {/* ── FILTER BAR — sticky ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#fff',
        borderBottom: '1px solid rgba(28,28,28,0.1)',
        padding: '0 clamp(24px,6vw,80px)',
        display: 'flex', alignItems: 'center',
        gap: '8px', flexWrap: 'wrap',
        paddingTop: '24px', paddingBottom: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        {CATEGORIES.map(cat => {
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => { setActive(cat); setVisible(6) }}
              style={{
                background: isActive ? GOLD : 'transparent',
                border: `1px solid ${isActive ? GOLD : 'rgba(28,28,28,0.18)'}`,
                borderRadius: '100px',
                padding: '7px 18px',
                fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: isActive ? '#fff' : 'rgba(28,28,28,0.55)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.22s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = GOLD
                  e.currentTarget.style.color = GOLD
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(28,28,28,0.18)'
                  e.currentTarget.style.color = 'rgba(28,28,28,0.55)'
                }
              }}
            >
              {cat}
            </button>
          )
        })}
        {active !== 'All' && (
          <span style={{
            fontSize: '9px', letterSpacing: '0.1em',
            color: 'rgba(28,28,28,0.3)',
            marginLeft: 'auto', fontFamily: 'var(--font-body)',
          }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* ── FEATURED ARTICLE ── */}
      {featured && (
        <div style={{ borderBottom: '1px solid rgba(28,28,28,0.08)', marginTop: '40px' }}>
          <FeaturedArticle a={featured} />
        </div>
      )}

      {/* ── NEWS GRID ── */}
      {shown.length > 0 && (
        <section style={{
          background: CREAM,
          padding: 'clamp(40px,6vh,72px) clamp(24px,6vw,80px)',
        }}>
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
          >
            {shown.map(a => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '56px' }}>
              <button
                onClick={() => setVisible(v => v + 6)}
                style={{
                  background: 'transparent',
                  border: `1px solid rgba(201,169,110,0.5)`,
                  padding: '14px 48px',
                  fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: GOLD, cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'background 0.25s, color 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD }}
              >
                Load more
              </button>
            </div>
          )}
        </section>
      )}

      {/* empty state */}
      {filtered.length === 0 && (
        <div style={{
          background: CREAM,
          padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,44px)', fontWeight: 300, color: 'rgba(28,28,28,0.2)', marginBottom: '14px' }}>
            No releases yet
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(28,28,28,0.35)', margin: 0 }}>
            No articles in this category at the moment.
          </p>
        </div>
      )}

      {/* ── NEWSLETTER STRIP ── */}
      <section style={{
        background: DARK2,
        padding: 'clamp(44px,6vh,72px) clamp(24px,6vw,80px)',
        borderTop: `1px solid rgba(245,240,232,0.06)`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '28px',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px,2.2vw,30px)',
              fontWeight: 300, letterSpacing: '-0.01em',
              color: CREAM, marginBottom: '6px',
            }}>
              Stay informed.
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px,1vw,14px)',
              color: 'rgba(245,240,232,0.38)', margin: 0,
            }}>
              Get our latest news and updates delivered to your inbox.
            </p>
          </div>

          {subbed ? (
            <div style={{
              fontSize: '11px', letterSpacing: '0.15em', color: GOLD,
              textTransform: 'uppercase', fontFamily: 'var(--font-body)',
            }}>
              ✓ &nbsp;You&apos;re subscribed
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); if (email) setSubbed(true) }}
              style={{ display: 'flex', gap: '0', flexShrink: 0 }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  background: 'rgba(245,240,232,0.07)',
                  border: '1px solid rgba(245,240,232,0.15)',
                  borderRight: 'none',
                  padding: '12px 20px',
                  fontSize: '12px', letterSpacing: '0.04em',
                  color: CREAM,
                  fontFamily: 'var(--font-body)',
                  outline: 'none', minWidth: '240px',
                }}
              />
              <button
                type="submit"
                style={{
                  background: GOLD,
                  border: `1px solid ${GOLD}`,
                  padding: '12px 28px',
                  fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: DARK,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section ref={brandsRef} style={{
        background: DARK,
        padding: 'clamp(64px,10vh,120px) clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(245,240,232,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: 'clamp(40px,6vh,60px)' }}>
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: GOLD, margin: '0 0 14px' }}>
              Brands in focus
            </p>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,4vw,60px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
              color: CREAM,
            }}>
              The brands<br />
              <em style={{ color: 'rgba(245,240,232,0.2)', fontStyle: 'italic' }}>in the headlines.</em>
            </div>
          </div>
          <Link
            href="/brands"
            style={{ fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', padding: '10px 20px', border: '1px solid rgba(201,169,110,0.4)', transition: 'background 0.25s, color 0.25s', whiteSpace: 'nowrap', alignSelf: 'flex-end', display: 'block' }}
            onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = DARK }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD }}
          >
            View all brands →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(120px,16vw,200px), 1fr))', border: '1px solid rgba(245,240,232,0.07)', borderRight: 'none', borderBottom: 'none' }}>
          {BRANDS.map((b, i) => <BrandTile key={i} {...b} />)}
        </div>
      </section>

    </div>
  )
}
