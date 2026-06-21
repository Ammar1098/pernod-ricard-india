'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SLUG_BY_NAME } from '@/data/brands'

gsap.registerPlugin(ScrollTrigger)

const BASE = 'https://reimagined-succotash-tau.vercel.app'

/* ── FEATURED 6 ── */
const FEATURED = [
  { name: 'Aberlour',     cat: 'Scotch Whisky',    year: '1879', img: `${BASE}/images/brands/aberlour/00-brand-aberlour-casg-annamh-lifestyle.jpg`,  gridCol: '1',     gridRow: '1 / 3' },
  { name: 'Absolut',      cat: 'Vodka',            year: '1879', img: `${BASE}/images/brands/absolut/00-originalsizejpeg-absolut_atlas_lifestyle.jpg`, gridCol: '2',     gridRow: '1'     },
  { name: 'Altos',        cat: 'Tequila & Mezcal', year: '2009', img: `${BASE}/images/brands/altos/00-brand-altos-reposado-lifestyle-original_.jpg`,   gridCol: '3',     gridRow: '1'     },
  { name: 'Ararat',       cat: 'Cognac & Brandy',  year: '1887', img: `${BASE}/images/brands/ararat/00-ararat_eng.jpg`,                                gridCol: '2 / 4', gridRow: '2'     },
  { name: "Ballantine's", cat: 'Scotch Whisky',    year: '1827', img: `${BASE}/images/brands/ballantines/00-fy25_ballantines_finest.jpg`,               gridCol: '1 / 3', gridRow: '3'     },
  { name: 'Beefeater',    cat: 'Gin',              year: '1876', img: `${BASE}/images/brands/beefeater/00-beafeater-bottle.png`,                        gridCol: '3',     gridRow: '3'     },
]

/* ── BRANDS AT A GLANCE ── */
const AT_GLANCE = [
  { name: 'Royal Stag',     cat: 'Indian Whisky',  india: true,  desc: 'Flagship Indian whisky and a cornerstone of the local portfolio.' },
  { name: 'Chivas Regal',   cat: 'Scotch Whisky',  india: false, desc: 'Blended Scotch from the international house, distributed in India.' },
  { name: 'Blenders Pride', cat: 'Indian Whisky',  india: true,  desc: 'Premium Indian whisky at the heart of the prestige segment.' },
  { name: 'The Glenlivet',  cat: 'Scotch Whisky',  india: false, desc: 'Single malt Scotch, part of the international premium range.' },
  { name: '100 Pipers',     cat: 'Scotch Whisky',  india: true,  desc: 'Scotch whisky with significant presence and bottling in India.' },
  { name: 'Jameson',        cat: 'Irish Whiskey',  india: false, desc: 'One of the group\'s fastest-growing international brands.' },
  { name: "Seagram's",      cat: 'Indian Whisky',  india: true,  desc: 'A heritage label within the locally manufactured portfolio.' },
  { name: "Jacob's Creek",  cat: 'Wine',           india: false, desc: 'Australian wine with a long-standing Indian market presence.' },
]

/* ── WIDER PORTFOLIO ── */
const WIDER = [
  { name: 'Augier',                    cat: 'Cognac & Brandy'   },
  { name: 'Avion',                     cat: 'Tequila & Mezcal'  },
  { name: 'Bumbu',                     cat: 'Rum'               },
  { name: 'Château Sainte Marguerite', cat: 'Wine'              },
  { name: 'Codigo 1530',               cat: 'Tequila & Mezcal'  },
  { name: 'Del Maguey',                cat: 'Tequila & Mezcal'  },
  { name: 'Elyx Vodka',                cat: 'Vodka'             },
  { name: 'Havana Club',               cat: 'Rum'               },
  { name: 'Imperial',                  cat: 'World Whiskies'    },
  { name: 'Italicus',                  cat: 'Liqueur & Bitters' },
  { name: "J.P. Wiser's",              cat: 'World Whiskies'    },
  { name: "Jefferson's",               cat: 'World Whiskies'    },
  { name: 'Kahlúa',                    cat: 'Liqueur & Bitters' },
  { name: 'Kenwood',                   cat: 'Wine'              },
  { name: 'KI NO BI',                  cat: 'Gin'               },
  { name: "L'Orbe",                    cat: 'Vodka'             },
  { name: 'La Hechicera',              cat: 'Rum'               },
  { name: 'Lillet',                    cat: 'Aperitif'          },
  { name: 'Long John',                 cat: 'Scotch Whisky'     },
  { name: 'Longitude 77',              cat: 'World Whiskies'    },
  { name: 'Lot No. 40',                cat: 'World Whiskies'    },
  { name: 'Luc Belaire',               cat: 'Champagne'         },
  { name: 'Malfy',                     cat: 'Gin'               },
  { name: 'Malibu',                    cat: 'Liqueur & Bitters' },
  { name: 'Martell',                   cat: 'Cognac & Brandy'   },
  { name: 'Method & Madness',          cat: 'Irish Whiskey'     },
  { name: 'Midleton Very Rare',        cat: 'Irish Whiskey'     },
  { name: 'Monkey 47',                 cat: 'Gin'               },
  { name: 'Mumm',                      cat: 'Champagne'         },
  { name: 'Ojo de Tigre',              cat: 'Tequila & Mezcal'  },
  { name: 'Olmeca',                    cat: 'Tequila & Mezcal'  },
  { name: 'Ostoya',                    cat: 'Vodka'             },
  { name: 'Passport Scotch',           cat: 'Scotch Whisky'     },
  { name: 'Pastis 51',                 cat: 'Aperitif'          },
  { name: 'Pernod',                    cat: 'Aperitif'          },
  { name: 'Perrier-Jouët',             cat: 'Champagne'         },
  { name: 'Plymouth Gin',              cat: 'Gin'               },
  { name: 'Powers',                    cat: 'Irish Whiskey'     },
  { name: 'Rabbit Hole',               cat: 'World Whiskies'    },
  { name: 'Ramazzotti',                cat: 'Liqueur & Bitters' },
  { name: 'Redbreast',                 cat: 'Irish Whiskey'     },
  { name: 'Ricard',                    cat: 'Aperitif'          },
  { name: 'Royal Salute',              cat: 'Scotch Whisky'     },
  { name: 'Scapa',                     cat: 'Scotch Whisky'     },
  { name: "Seagram's Gin",             cat: 'Gin'               },
  { name: 'Secret Speyside',           cat: 'Scotch Whisky'     },
  { name: 'Smooth Ambler',             cat: 'World Whiskies'    },
  { name: 'Something Special',         cat: 'Scotch Whisky'     },
  { name: 'Spot Whiskeys',             cat: 'Irish Whiskey'     },
  { name: 'Suze',                      cat: 'Aperitif'          },
  { name: 'The Deacon',                cat: 'Scotch Whisky'     },
  { name: 'TX',                        cat: 'World Whiskies'    },
  { name: 'Ungava',                    cat: 'Gin'               },
  { name: 'Wyborowa',                  cat: 'Vodka'             },
]

const CAT_ORDER = ['Scotch Whisky','Irish Whiskey','World Whiskies','Cognac & Brandy','Gin','Vodka','Rum','Tequila & Mezcal','Champagne','Aperitif','Liqueur & Bitters','Wine']
const BY_CAT = CAT_ORDER.map(cat => ({ cat, brands: WIDER.filter(b => b.cat === cat) })).filter(g => g.brands.length > 0)

/* ── GRID TILE ── */
function GridTile({ name, cat, year, img, gridCol, gridRow, priority }: typeof FEATURED[0] & { priority?: boolean }) {
  const [hov, setHov] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgEl   = useRef<HTMLImageElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const slug    = SLUG_BY_NAME[name]

  useEffect(() => {
    if (!imgEl.current) return
    gsap.to(imgEl.current, { scale: hov ? 1.07 : 1, duration: 0.9, ease: 'power3.out' })
  }, [hov])

  const inner = (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: slug ? 'pointer' : 'default',
        background: '#111010',
        width: '100%', height: '100%',
        transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* image */}
      <img
        ref={imgEl}
        src={img}
        alt={name}
        decoding="async"
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        {...(priority ? { fetchPriority: 'high' } : { loading: 'lazy' }) as any}
        onLoad={() => setImgLoaded(true)}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transformOrigin: 'center center',
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* skeleton shimmer while loading */}
      {!imgLoaded && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #1a1a1a 0%, #242424 50%, #1a1a1a 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.6s infinite',
        }} />
      )}

      {/* gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to top,
          rgba(6,8,12,0.92) 0%,
          rgba(6,8,12,0.45) 35%,
          rgba(6,8,12,${hov ? '0.05' : '0.25'}) 100%)`,
        transition: 'background 0.5s',
      }} />

      {/* est year */}
      <div style={{
        position: 'absolute', top: '20px', right: '20px',
        fontSize: '9px', letterSpacing: '0.2em',
        color: 'rgba(242,237,228,0.2)',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translateY(0)' : 'translateY(-6px)',
        transition: 'opacity 0.35s, transform 0.35s',
      }}>
        Est. {year}
      </div>

      {/* bottom info */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(16px,2.5vh,28px)',
        left: 'clamp(16px,2vw,24px)',
        right: 'clamp(16px,2vw,24px)',
      }}>
        <div style={{
          fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: '#BFA05A', marginBottom: '8px',
          opacity: hov ? 1 : 0.6,
          transform: hov ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.3s, transform 0.3s',
        }}>
          {cat}
        </div>
        {/* name reveal: overflow hidden + y-slide */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px,2.2vw,36px)',
            fontWeight: 300, letterSpacing: '-0.02em',
            color: '#F2EDE4', lineHeight: 1,
            transform: hov ? 'translateY(0)' : 'translateY(4px)',
            transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}>
            {name}
          </div>
        </div>
        {/* arrow only on hover */}
        {slug && (
          <div style={{
            marginTop: '10px',
            fontSize: '8px', letterSpacing: '0.25em',
            color: 'rgba(191,160,90,0.7)',
            opacity: hov ? 1 : 0,
            transform: hov ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'opacity 0.3s 0.05s, transform 0.3s 0.05s',
          }}>
            Explore →
          </div>
        )}
      </div>

      {/* gold line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '2px',
        width: hov ? '100%' : '0%',
        background: '#BFA05A',
        transition: 'width 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
      }} />
    </div>
  )

  return slug ? (
    <Link href={`/brands/${slug}`} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
      {inner}
    </Link>
  ) : inner
}

/* ── PAGE ── */
export default function BrandsPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const heroRef    = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const glanceRef  = useRef<HTMLElement>(null)
  const widerRef   = useRef<HTMLElement>(null)

  /* ── page fade-in ── */
  useEffect(() => {
    if (!pageRef.current) return
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.55, ease: 'power2.out' }
    )
  }, [])

  /* ── hero entrance ── */
  useEffect(() => {
    if (!heroRef.current) return
    const label = heroRef.current.querySelector('[data-label]')
    const lines = heroRef.current.querySelectorAll('[data-line]')
    const meta  = heroRef.current.querySelector('[data-meta]')

    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo(label,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(lines,  { y: '105%' },         { y: '0%',   duration: 1.0, ease: 'power4.out', stagger: 0.08 }, '-=0.3')
      .fromTo(meta,   { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
  }, [])

  /* ── featured grid tiles ── */
  useEffect(() => {
    const tiles = document.querySelectorAll('[data-grid-tile]')
    gsap.fromTo(tiles,
      { opacity: 0, y: 44, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: '[data-grid]', start: 'top 82%' },
      }
    )
  }, [])

  /* ── glance rows ── */
  useEffect(() => {
    if (!glanceRef.current) return
    gsap.fromTo(glanceRef.current.querySelectorAll('[data-row]'),
      { opacity: 0, y: 22, x: -10 },
      {
        opacity: 1, y: 0, x: 0,
        duration: 0.7, ease: 'power3.out', stagger: 0.06,
        scrollTrigger: { trigger: glanceRef.current, start: 'top 80%' },
      }
    )
  }, [])

  /* ── wider: category rows + individual cells ── */
  useEffect(() => {
    if (!widerRef.current) return

    gsap.fromTo(widerRef.current.querySelectorAll('[data-cat-row]'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: widerRef.current, start: 'top 85%' },
      }
    )

    gsap.fromTo(widerRef.current.querySelectorAll('[data-brand-cell]'),
      { opacity: 0, y: 10 },
      {
        opacity: 1, y: 0,
        duration: 0.45, ease: 'power2.out',
        stagger: { each: 0.025, from: 'start' },
        scrollTrigger: { trigger: widerRef.current, start: 'top 80%' },
      }
    )
  }, [])

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div ref={pageRef} style={{ background: '#080A10', minHeight: '100vh', color: '#F2EDE4', opacity: 0 }}>
        <Nav />

        {/* ── HERO ── */}
        <section ref={heroRef} style={{
          padding: 'clamp(48px,7vh,80px) clamp(24px,6vw,80px) clamp(48px,7vh,80px)',
          background: '#F2EDE4',
          borderBottom: '1px solid rgba(14,14,14,0.08)',
          overflow: 'hidden',
        }}>
          <div data-label style={{ opacity: 0, marginBottom: '18px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BFA05A', opacity: 0.8 }}>
              Pernod Ricard India · Portfolio
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px,9vw,130px)',
            fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.9,
            color: '#0E0E0E', margin: '0 0 clamp(28px,4vh,44px)',
          }}>
            {/* each line clipped so the reveal sweeps up from below */}
            <div style={{ overflow: 'hidden', display: 'block' }}>
              <span data-line style={{ display: 'block' }}>A House</span>
            </div>
            <div style={{ overflow: 'hidden', display: 'block' }}>
              <span data-line style={{ display: 'block', color: 'rgba(14,14,14,0.22)', fontStyle: 'italic' }}>of Brands.</span>
            </div>
          </h1>

          <div data-meta style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '1px', background: '#BFA05A' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(14,14,14,0.4)' }}>
                66 brands worldwide
              </span>
            </div>
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(14,14,14,0.18)' }}>·</span>
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(14,14,14,0.4)' }}>
              Est. India 1993
            </span>
          </div>
        </section>

        {/* ── FEATURED GRID ── */}
        <div
          ref={gridRef}
          data-grid
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: '42vh 36vh 44vh',
            gap: '3px',
            background: '#080A10',
          }}
        >
          {FEATURED.map((b, i) => (
            <div
              key={b.name}
              data-grid-tile
              style={{ opacity: 0, gridColumn: b.gridCol, gridRow: b.gridRow, overflow: 'hidden' }}
            >
              {/* first 3 tiles are above-fold — priority-load them */}
              <GridTile {...b} priority={i < 3} />
            </div>
          ))}
        </div>

        {/* ── BRANDS AT A GLANCE ── */}
        <section ref={glanceRef} style={{
          padding: 'clamp(64px,10vh,100px) clamp(24px,6vw,80px)',
          background: '#F2EDE4',
          borderTop: '1px solid rgba(14,14,14,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 'clamp(40px,6vh,64px)' }}>
            <span style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', opacity: 0.8 }}>
              Portfolio
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(14,14,14,0.08)' }} />
            <span style={{ fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(14,14,14,0.3)' }}>
              {AT_GLANCE.length} brands
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0 clamp(32px,6vw,80px)',
          }}>
            {AT_GLANCE.map((b, i) => {
              const slug = SLUG_BY_NAME[b.name]

              const rowStyle: React.CSSProperties = {
                opacity: 0,
                padding: 'clamp(20px,3vh,28px) 0',
                borderBottom: '1px solid rgba(14,14,14,0.08)',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                gap: '16px',
                textDecoration: 'none',
                color: 'inherit',
                cursor: slug ? 'pointer' : 'default',
              }

              const content = (hov: boolean) => (
                <>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(191,160,90,0.5)', fontFamily: 'var(--font-display)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '7px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(14,14,14,0.35)' }}>
                        {b.cat}
                      </span>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(20px,2vw,28px)',
                        fontWeight: 300, letterSpacing: '-0.02em',
                        color: '#0E0E0E', lineHeight: 1,
                        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
                        transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                      }}>
                        {b.name}
                      </div>
                    </div>
                    <p style={{
                      fontSize: '11px', lineHeight: 1.7,
                      color: 'rgba(14,14,14,0.45)',
                      margin: '8px 0 0', maxWidth: '320px',
                    }}>
                      {b.desc}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', alignSelf: 'flex-start' }}>
                    {b.india && (
                      <div style={{
                        padding: '5px 10px',
                        border: '1px solid rgba(191,160,90,0.4)',
                        fontSize: '7px', letterSpacing: '0.25em',
                        textTransform: 'uppercase', color: '#BFA05A',
                        whiteSpace: 'nowrap',
                      }}>
                        India
                      </div>
                    )}
                    {slug && (
                      <span style={{
                        fontSize: '8px', letterSpacing: '0.2em', color: '#BFA05A',
                        opacity: hov ? 1 : 0.4,
                        transform: hov ? 'translateX(0)' : 'translateX(-6px)',
                        transition: 'opacity 0.3s, transform 0.3s',
                        whiteSpace: 'nowrap',
                      }}>
                        View →
                      </span>
                    )}
                  </div>
                </>
              )

              return slug ? (
                <HoverRow key={b.name} href={`/brands/${slug}`} style={rowStyle}>
                  {content}
                </HoverRow>
              ) : (
                <StaticRow key={b.name} style={rowStyle}>
                  {content(false)}
                </StaticRow>
              )
            })}
          </div>
        </section>

        {/* ── FULL PORTFOLIO ── */}
        <section ref={widerRef} style={{ background: '#F2EDE4', borderTop: '1px solid rgba(14,14,14,0.08)' }}>
          {/* intro */}
          <div style={{ padding: 'clamp(64px,10vh,100px) clamp(24px,6vw,80px) clamp(40px,6vh,64px)' }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#BFA05A', opacity: 0.8, marginBottom: '18px' }}>
              The wider group
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px,6vw,80px)',
                fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9,
                color: '#0E0E0E', margin: 0,
              }}>
                {WIDER.length} brands<br />
                <em style={{ color: 'rgba(14,14,14,0.22)', fontStyle: 'italic' }}>across the world</em>
              </h2>
              <p style={{ fontSize: '11px', lineHeight: 1.8, color: 'rgba(14,14,14,0.4)', maxWidth: '280px', margin: 0 }}>
                Beyond our flagship labels, the Pernod Ricard group stewards an extraordinary portfolio spanning every major spirits and wine category.
              </p>
            </div>
          </div>

          {/* category blocks */}
          {BY_CAT.map((group, gi) => (
            <div
              key={group.cat}
              data-cat-row
              style={{ opacity: 0, borderTop: '1px solid rgba(14,14,14,0.08)' }}
            >
              <div style={{
                padding: 'clamp(20px,3vh,28px) clamp(24px,6vw,80px)',
                display: 'flex', alignItems: 'center', gap: '20px',
                background: gi % 2 === 0 ? '#F2EDE4' : 'rgba(14,14,14,0.02)',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(191,160,90,0.45)' }}>
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <div style={{ width: '20px', height: '1px', background: '#BFA05A', opacity: 0.3 }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px,2vw,26px)',
                  fontWeight: 300, letterSpacing: '-0.01em',
                  color: '#0E0E0E', margin: 0, flex: 1,
                }}>
                  {group.cat}
                </h3>
                <span style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(14,14,14,0.3)', textTransform: 'uppercase' }}>
                  {group.brands.length} brand{group.brands.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px,20vw,210px), 1fr))',
                gap: '1px',
                background: 'rgba(14,14,14,0.07)',
                margin: '0 clamp(24px,6vw,80px)',
                marginBottom: 'clamp(24px,4vh,36px)',
              }}>
                {group.brands.map(b => (
                  <BrandCell key={b.name} name={b.name} cat={group.cat} />
                ))}
              </div>
            </div>
          ))}

          <div style={{ height: 'clamp(48px,7vh,80px)' }} />
        </section>

        {/* ── FOOTER BAR ── */}
        <div style={{
          padding: 'clamp(24px,4vh,36px) clamp(24px,6vw,80px)',
          background: '#F2EDE4',
          borderTop: '1px solid rgba(14,14,14,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'rgba(14,14,14,0.25)', letterSpacing: '0.08em' }}>
            Pernod Ricard India
          </span>
          <a
            href="/"
            style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BFA05A', textDecoration: 'none', opacity: 0.65, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
          >
            ← Home
          </a>
        </div>
      </div>
    </>
  )
}

/* ── HOVER ROW (AT_GLANCE with hover state) ── */
function HoverRow({ href, style, children }: { href: string; style: React.CSSProperties; children: (hov: boolean) => React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={href}
      data-row
      style={{
        ...style,
        background: hov ? 'rgba(14,14,14,0.03)' : 'transparent',
        transition: 'background 0.25s',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children(hov)}
    </Link>
  )
}

function StaticRow({ style, children }: { style: React.CSSProperties; children: React.ReactNode }) {
  return <div data-row style={style}>{children}</div>
}

/* ── BRAND CELL ── */
function BrandCell({ name, cat }: { name: string; cat: string }) {
  const [hov, setHov] = useState(false)
  const slug = SLUG_BY_NAME[name]

  const inner = (
    <div
      data-brand-cell
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 'clamp(18px,2.5vh,24px) clamp(16px,2vw,22px)',
        background: hov ? '#0E0E0E' : '#F2EDE4',
        transition: 'background 0.28s ease',
        cursor: slug ? 'pointer' : 'default',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        height: '100%',
        opacity: 0,
      }}
    >
      <div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(15px,1.5vw,20px)',
            fontWeight: 300, letterSpacing: '-0.01em',
            color: hov ? '#F2EDE4' : '#0E0E0E',
            transition: 'color 0.28s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
            lineHeight: 1.2,
            transform: hov ? 'translateY(-2px)' : 'translateY(0)',
          }}>
            {name}
          </div>
        </div>
        <div style={{
          marginTop: '5px',
          fontSize: '7px', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: hov ? '#BFA05A' : 'rgba(14,14,14,0.28)',
          transition: 'color 0.28s',
        }}>
          {cat}
        </div>
      </div>
      {slug && (
        <div style={{
          marginTop: '8px',
          fontSize: '7px', letterSpacing: '0.2em',
          color: 'rgba(191,160,90,0.7)',
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'opacity 0.25s, transform 0.25s',
        }}>
          View →
        </div>
      )}
    </div>
  )

  return slug ? (
    <Link href={`/brands/${slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      {inner}
    </Link>
  ) : inner
}
