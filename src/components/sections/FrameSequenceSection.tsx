'use client'
import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/ui/Nav'
import gsap from 'gsap'

/* ── CONFIG ── */
const TOTAL_FRAMES       = 240
const FRAME_PREFIX       = 'ezgif-frame-'
const FRAME_SUFFIX       = '.png'
const FRAME_PAD          = 3
const SCROLL_SENSITIVITY = 12  // deltaY units per frame — lower = faster

const pad      = (n: number, d: number) => String(n).padStart(d, '0')
const frameUrl = (n: number) =>
  `/frames/seq-01/${FRAME_PREFIX}${pad(n, FRAME_PAD)}${FRAME_SUFFIX}`

/*
  ── 4-STEP SCROLL TEXT ANIMATION ──

  Progress bands (p = frame / 239):

  Step 1  [0.00 – 0.28]   CRAFT at bottom-left, static
  Step 2  [0.28 – 0.52]   CRAFT moves upward (~60-70% of viewport)
  Xfade   [0.52 – 0.68]   CRAFT continues up + fades out;
                           SINCE 1993 fades in at original bottom-left
  Step 4  [0.68 – 0.87]   SINCE 1993 moves upward (~60-70% of viewport)
  Step 5  [0.87 – 1.00]   SINCE 1993 reaches vertical center, holds

  The hint ("Scroll to discover") fades out as soon as scrolling begins.
*/

const GSAP_OPTS = { duration: 0.85, ease: 'power2.out', overwrite: 'auto' as const }

function calcText(p: number): { op: number; ty: number } {
  if (p <= 0.28) {
    return { op: 1, ty: 0 }
  } else if (p <= 0.52) {
    const t = (p - 0.28) / 0.24
    return { op: 1, ty: -30 * t }                   // 0 → -30vh
  } else if (p <= 0.68) {
    const t = (p - 0.52) / 0.16
    return { op: 1 - t, ty: -30 - 10 * t }          // -30 → -40vh, fades out
  } else {
    return { op: 0, ty: -40 }
  }
}

function calcSub(p: number): { op: number; ty: number } {
  if (p < 0.52) {
    return { op: 0, ty: 8 }                          // hidden, slightly below origin
  } else if (p <= 0.68) {
    const t = (p - 0.52) / 0.16
    return { op: t, ty: 8 * (1 - t) }               // fades in, rises from +8 → 0
  } else if (p <= 0.87) {
    const t = (p - 0.68) / 0.19
    return { op: 1, ty: -30 * t }                    // 0 → -30vh
  } else {
    const t = (p - 0.87) / 0.13
    return { op: 1, ty: -30 - 10 * t }              // -30 → -40vh (toward center)
  }
}

export default function FrameSequenceSection() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const subTextRef  = useRef<HTMLDivElement>(null)
  const hintRef     = useRef<HTMLDivElement>(null)
  const framesRef   = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null))
  const frameIdxRef  = useRef(0)
  const releasedRef  = useRef(false)

  const [ready,   setReady]   = useState(false)
  const [loadPct, setLoadPct] = useState(0)

  /* ── CANVAS SIZE + DRAW ── */
  const sizeCanvas = () => {
    const c = canvasRef.current
    if (!c) return
    c.width  = window.innerWidth
    c.height = window.innerHeight
  }

  const drawFrame = (idx: number) => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d', { alpha: false })
    if (!ctx) return
    let img = framesRef.current[idx]
    if (!img?.complete || !img.naturalWidth) {
      for (let d = 1; d < 30; d++) {
        const prev = framesRef.current[Math.max(0, idx - d)]
        if (prev?.complete && prev.naturalWidth) { img = prev; break }
      }
    }
    if (!img?.complete || !img.naturalWidth) return
    const cw = c.width, ch = c.height
    const iw = img.naturalWidth, ih = img.naturalHeight
    const sc = Math.max(cw / iw, ch / ih)
    const dw = iw * sc, dh = ih * sc
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }

  /* ── 4-STEP SCROLL ANIMATION ── */
  const updateOverlays = (idx: number) => {
    const p = idx / (TOTAL_FRAMES - 1)

    // Scroll hint: fades out in the first 12% of progress
    if (hintRef.current) {
      const hOp = p < 0.06 ? 1 : Math.max(0, 1 - (p - 0.06) / 0.12)
      gsap.to(hintRef.current, { opacity: hOp, duration: 0.5, ease: 'power1.out', overwrite: 'auto' })
    }

    // CRAFT. CONVIVIALITY.
    if (textRef.current) {
      const { op, ty } = calcText(p)
      gsap.to(textRef.current, { opacity: Math.max(0, op), y: `${ty}vh`, ...GSAP_OPTS })
    }

    // Since 1993, we have chosen India's finest.
    if (subTextRef.current) {
      const { op, ty } = calcSub(p)
      gsap.to(subTextRef.current, { opacity: Math.max(0, op), y: `${ty}vh`, ...GSAP_OPTS })
    }
  }

  /* ── RESIZE ── */
  useEffect(() => {
    const onResize = () => {
      sizeCanvas()
      drawFrame(frameIdxRef.current)
    }
    sizeCanvas()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── PRELOAD — show first frame immediately ── */
  useEffect(() => {
    let loaded = 0
    const onProg = () => {
      loaded++
      setLoadPct(Math.round((loaded / TOTAL_FRAMES) * 100))
    }
    const first = new Image()
    first.onload = () => {
      framesRef.current[0] = first
      onProg()
      sizeCanvas()
      drawFrame(0)
      setReady(true)
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const img = new Image()
        const idx = i - 1
        img.onload = img.onerror = () => {
          if (img.naturalWidth) framesRef.current[idx] = img
          onProg()
        }
        img.src = frameUrl(i)
      }
    }
    first.onerror = () => setReady(true)
    first.src = frameUrl(1)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── SET INITIAL GSAP STATE when ready ── */
  useEffect(() => {
    if (!ready) return
    gsap.set(textRef.current,    { y: 0, opacity: 1 })
    gsap.set(subTextRef.current, { y: '8vh', opacity: 0 })
    gsap.set(hintRef.current,    { opacity: 1 })
  }, [ready])

  /* ── WHEEL: device-normalized frame advance, rAF-batched draw ── */
  useEffect(() => {
    if (!ready) return

    let rafId = 0

    const render = () => {
      rafId = 0
      drawFrame(frameIdxRef.current)
      updateOverlays(frameIdxRef.current)
    }

    const onWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 1 : -1
      const idx = frameIdxRef.current

      if (window.scrollY > 10) {
        releasedRef.current = false
        return
      }

      if (idx === 0 && dir < 0) return

      if (idx === TOTAL_FRAMES - 1 && dir > 0) {
        if (!releasedRef.current) {
          releasedRef.current = true
          return
        }
        e.preventDefault()
        e.stopImmediatePropagation()
        return
      }

      e.preventDefault()
      e.stopImmediatePropagation()

      const steps = Math.max(1, Math.round(Math.abs(e.deltaY) / SCROLL_SENSITIVITY))
      frameIdxRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx + dir * steps))

      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ready]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Fixed canvas — sits BEHIND all page content */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#111010',
      }}>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
        />

        {/* GRADIENT */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(
            to bottom,
            rgba(10,12,20,0.55) 0%,
            rgba(10,12,20,0.10) 25%,
            rgba(10,12,20,0.00) 45%,
            rgba(10,12,20,0.00) 55%,
            rgba(10,12,20,0.50) 75%,
            rgba(10,12,20,0.85) 100%
          )`,
        }} />
        {/* BOTTOM-LEFT VIGNETTE */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 0% 100%, rgba(10,12,20,0.62) 0%, rgba(10,12,20,0.18) 55%, transparent 100%)',
        }} />

        {/* LOADING BAR */}
        {loadPct < 100 && ready && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px' }}>
            <div style={{ height: '100%', width: `${loadPct}%`, background: '#BFA05A', transition: 'width 0.3s' }} />
          </div>
        )}
      </div>

      {/* Loading screen */}
      {!ready && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: '#0A0C14',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '20px',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300, color: '#F2EDE4', letterSpacing: '-0.01em' }}>
            Loading
          </div>
          <div style={{ width: '140px', height: '1px', background: 'rgba(242,237,228,0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${loadPct}%`, background: '#BFA05A', transition: 'width 0.15s' }} />
          </div>
        </div>
      )}

      {/* Hero overlay — fixed, sits above canvas */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        {/* NAV */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30, pointerEvents: 'auto' }}>
          <Nav />
        </div>

        {/*
          STEP 1-3 TEXT: CRAFT. CONVIVIALITY.
          GSAP controls y (translateY) and opacity via updateOverlays().
          Initial state: bottom-left, fully visible.
        */}
        <div ref={textRef} style={{
          position: 'absolute',
          bottom: 'clamp(60px,10vh,120px)',
          left: 'clamp(32px,6vw,80px)',
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(64px,13vw,180px)',
            fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.88,
            color: '#FFFFFF', margin: 0, textShadow: '0 2px 40px rgba(0,0,0,0.3)',
          }}>
            CRAFT.<br />
            <span style={{ color: '#D4AA5A', textShadow: '0 2px 40px rgba(0,0,0,0.2)' }}>
              CONVIVIALITY.
            </span>
          </h1>

          {/* Scroll hint — fades out when scrolling begins */}
          <div ref={hintRef} style={{
            marginTop: '36px',
            display: 'flex', alignItems: 'center', gap: '12px',
            willChange: 'opacity',
          }}>
            <div style={{ width: '32px', height: '1px', background: '#BFA05A', animation: 'grow 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
              Scroll to discover
            </span>
          </div>
        </div>

        {/*
          STEP 3-5 TEXT: Since 1993…
          Starts hidden at y=+8vh (slightly below natural bottom-left position).
          GSAP fades it in and moves it upward.
        */}
        <div ref={subTextRef} style={{
          position: 'absolute',
          bottom: 'clamp(60px,10vh,120px)',
          left: 'clamp(32px,6vw,80px)',
          opacity: 0,
          pointerEvents: 'none',
          maxWidth: '560px',
          willChange: 'transform, opacity',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px,4.2vw,58px)',
            fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.05,
            color: '#F2EDE4', margin: 0, textShadow: '0 2px 30px rgba(0,0,0,0.5)',
          }}>
            Since 1993, we have<br />
            chosen <em style={{ fontStyle: 'italic', color: '#BFA05A' }}>India&apos;s finest.</em>
          </p>
        </div>

        {/* YEAR — bottom right */}
        <div style={{
          position: 'absolute', bottom: 'clamp(24px,4vh,40px)', right: 'clamp(24px,5vw,48px)',
          fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,237,228,0.25)', fontWeight: 700,
        }}>
          Since 1993
        </div>
      </div>

      {/* Spacer — gives the hero a viewport of space before page content */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 20 }} />

      <style>{`
        @keyframes grow {
          0%, 100% { width: 32px; opacity: 0.5; }
          50%       { width: 52px; opacity: 1; }
        }
      `}</style>
    </>
  )
}
