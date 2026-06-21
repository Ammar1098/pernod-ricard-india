'use client'
import { useRef, useState, useCallback, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrandOrbit, { BRANDS } from '@/components/three/BrandOrbit'

gsap.registerPlugin(ScrollTrigger)

export default function BrandsSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const nameRef       = useRef<HTMLDivElement>(null)
  const catRef        = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  const [activeBrand, setActiveBrand] = useState(BRANDS[0])
  const [activeIdx,   setActiveIdx]   = useState(0)
  const [isDragging,  setIsDragging]  = useState(false)
  const [dragDelta,   setDragDelta]   = useState(0)
  const dragStart = useRef(0)
  const dragBase  = useRef(0)

  const handleBrandChange = useCallback((idx: number) => {
    if (idx === activeIdx) return
    setActiveIdx(idx)
    if (nameRef.current && catRef.current) {
      gsap.to([nameRef.current, catRef.current], {
        opacity: 0, y: -8, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          setActiveBrand(BRANDS[idx])
          gsap.fromTo(
            [nameRef.current, catRef.current],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.06 }
          )
        }
      })
    } else {
      setActiveBrand(BRANDS[idx])
    }
  }, [activeIdx])

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStart.current = e.clientX
    dragBase.current  = dragDelta
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    setDragDelta(dragBase.current + (e.clientX - dragStart.current))
  }
  const onPointerUp = () => setIsDragging(false)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.fromTo(canvasWrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
    )
    gsap.fromTo(nameRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'clamp(480px, 80vh, 700px)',
        background: '#F2EDE4',
        overflow: 'hidden',
      }}
    >
      {/* ── 3D CANVAS ── */}
      <div
        ref={canvasWrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ position: 'absolute', inset: 0, cursor: isDragging ? 'grabbing' : 'grab', opacity: 0 }}
      >
        <Canvas camera={{ position: [0, 1.2, 7], fov: 42 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 4, 6]} intensity={0.3} color="#BFA05A" />
            <BrandOrbit onBrandChange={handleBrandChange} dragDelta={dragDelta} isDragging={isDragging} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── TOP LABEL ── */}
      <div style={{
        position: 'absolute', top: 'clamp(24px, 4vh, 40px)', left: 'clamp(24px, 5vw, 56px)',
        zIndex: 10, fontSize: '9px', letterSpacing: '0.35em',
        textTransform: 'uppercase', color: '#BFA05A', pointerEvents: 'none',
      }}>
        A house of brands
      </div>

      {/* ── COUNTER TOP RIGHT ── */}
      <div style={{
        position: 'absolute', top: 'clamp(24px, 4vh, 40px)', right: 'clamp(24px, 5vw, 56px)',
        zIndex: 10, pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(14,14,14,0.3)', textTransform: 'uppercase' }}>
          <span style={{ color: '#BFA05A' }}>{String(activeIdx + 1).padStart(2, '0')}</span>
          {' '}/ {String(BRANDS.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── BRAND NAME — bottom left ── */}
      <div style={{
        position: 'absolute', bottom: 'clamp(32px, 5vh, 56px)', left: 'clamp(24px, 5vw, 56px)',
        zIndex: 10, pointerEvents: 'none',
      }}>
        <div ref={nameRef} style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 60px)',
          fontWeight: 300, letterSpacing: '-0.02em', color: '#0E0E0E', lineHeight: 1, marginBottom: '10px',
        }}>
          {activeBrand.name}
        </div>
        <div ref={catRef} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(14,14,14,0.45)' }}>
            {activeBrand.cat}
          </span>
          {activeBrand.india && (
            <span style={{ fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#BFA05A', opacity: 0.85 }}>
              · India
            </span>
          )}
        </div>
      </div>

      {/* ── DRAG HINT + VIEW ALL — bottom right ── */}
      <div style={{
        position: 'absolute', bottom: 'clamp(32px, 5vh, 56px)', right: 'clamp(24px, 5vw, 56px)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px',
      }}>
        <span style={{ fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(14,14,14,0.3)' }}>
          drag to explore
        </span>
        <a
          href="/brands"
          style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BFA05A', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
        >
          All 66 brands →
        </a>
      </div>

      {/* ── DOT NAV — bottom center ── */}
      <div style={{
        position: 'absolute', bottom: 'clamp(32px, 5vh, 56px)', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', gap: '6px', alignItems: 'center',
      }}>
        {BRANDS.map((_, i) => (
          <div
            key={i}
            onClick={() => handleBrandChange(i)}
            style={{
              width: i === activeIdx ? '16px' : '3px', height: '3px', borderRadius: '2px',
              background: i === activeIdx ? '#BFA05A' : 'rgba(14,14,14,0.2)',
              cursor: 'pointer', transition: 'width 0.3s, background 0.2s',
            }}
          />
        ))}
      </div>
    </section>
  )
}
