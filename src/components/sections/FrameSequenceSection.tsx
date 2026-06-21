'use client'
import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/ui/Nav'

/* ── CONFIG ── */
const TOTAL_FRAMES       = 240
const FRAME_PREFIX       = 'ezgif-frame-'
const FRAME_SUFFIX       = '.png'
const FRAME_PAD          = 3
const SCROLL_SENSITIVITY = 12  // deltaY units per frame — lower = faster

const pad      = (n: number, d: number) => String(n).padStart(d, '0')
const frameUrl = (n: number) =>
  `/frames/seq-01/${FRAME_PREFIX}${pad(n, FRAME_PAD)}${FRAME_SUFFIX}`

export default function FrameSequenceSection() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const subTextRef  = useRef<HTMLDivElement>(null)
  const framesRef   = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null))
  const frameIdxRef  = useRef(0)
  // Prevents Lenis accumulation: once we release at frame 239, block all
  // subsequent wheel events until scrollY actually moves past 10px.
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

  const updateOverlays = (idx: number) => {
    const p = idx / (TOTAL_FRAMES - 1)
    if (textRef.current) {
      let op = 1
      if      (p >= 0.10 && p < 0.16) op = 1 - (p - 0.10) / 0.06
      else if (p >= 0.16)              op = 0
      textRef.current.style.opacity = String(Math.max(0, op))
    }
    if (subTextRef.current) {
      let op = 0
      if      (p >= 0.14 && p <= 0.18) op = (p - 0.14) / 0.04
      else if (p > 0.18  && p <= 0.22) op = 1
      else if (p > 0.22  && p <= 0.26) op = 1 - (p - 0.22) / 0.04
      subTextRef.current.style.opacity = String(Math.max(0, op))
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

      // Page has physically moved — we're in content zone.
      // Reset the release-lock so a scroll back to top re-enables frame control.
      if (window.scrollY > 10) {
        releasedRef.current = false
        return
      }

      // At start scrolling up: release to Lenis/browser
      if (idx === 0 && dir < 0) return

      // At last frame scrolling down: release exactly ONE event to Lenis so it
      // starts the scroll animation. Block all subsequent events until scrollY > 10
      // to prevent Lenis from accumulating hundreds of wheel deltas while it's still
      // animating the first one (lerp: 0.075 takes ~800 ms to settle).
      if (idx === TOTAL_FRAMES - 1 && dir > 0) {
        if (!releasedRef.current) {
          releasedRef.current = true
          return  // let this single event reach Lenis
        }
        // Already released — block everything until Lenis moves the page
        e.preventDefault()
        e.stopImmediatePropagation()
        return
      }

      // Registered in capture phase so this fires before Lenis's bubble-phase listener.
      // stopImmediatePropagation prevents Lenis from also moving the page.
      e.preventDefault()
      e.stopImmediatePropagation()

      // Advance proportionally to deltaY so the speed feels natural on every device:
      // Windows wheel (deltaY≈120) → ~10 frames per click
      // Mac trackpad  (deltaY≈3–15) → 1 frame per event (many events per gesture = smooth)
      const steps = Math.max(1, Math.round(Math.abs(e.deltaY) / SCROLL_SENSITIVITY))
      frameIdxRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx + dir * steps))

      // Batch canvas draws: cancel any pending rAF and schedule a fresh one.
      // No matter how many wheel events fire between frames, we draw exactly once per frame.
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(render)
    }

    // capture: true — fires before Lenis which listens in the bubble phase
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ready]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/*
        Fixed canvas — sits BEHIND all page content (zIndex: 0).
        Sections with opaque backgrounds naturally cover it.
      */}
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
        {/* BOTTOM-LEFT VIGNETTE — softens the area behind the hero text */}
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

      {/* Loading screen — shown while first frame is fetching */}
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

      {/*
        Hero content — fixed, only visible at page top.
        Text opacity is driven directly from frame index in updateOverlays().
      */}
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

        {/* HERO HEADLINE */}
        <div ref={textRef} style={{
          position: 'absolute',
          bottom: 'clamp(60px,10vh,120px)',
          left: 'clamp(32px,6vw,80px)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 'clamp(11px, 1.2vw, 15px)', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#D4AA5A', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
            Créateurs de convivialité · India · Est. 1993
          </div>
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
          <div style={{ marginTop: '36px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '1px', background: '#BFA05A', animation: 'grow 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
              Scroll to discover
            </span>
          </div>
        </div>

        {/* MID TEXT */}
        <div ref={subTextRef} style={{
          position: 'absolute',
          bottom: 'clamp(60px,10vh,120px)',
          left: 'clamp(32px,6vw,80px)',
          opacity: 0,
          pointerEvents: 'none',
          maxWidth: '560px',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px,4.2vw,58px)',
            fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.05,
            color: '#F2EDE4', margin: 0, textShadow: '0 2px 30px rgba(0,0,0,0.5)',
          }}>
            Since 1993, we have<br />
            chosen <em style={{ fontStyle: 'italic', color: '#BFA05A' }}>India's finest.</em>
          </p>
        </div>

        {/* YEAR */}
        <div style={{
          position: 'absolute', bottom: 'clamp(24px,4vh,40px)', right: 'clamp(24px,5vw,48px)',
          fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,237,228,0.25)',
        }}>
          Since 1993
        </div>
      </div>

      {/*
        Spacer — gives the hero a full viewport of breathing room at the top.
        Content sections start below this, scrollable once frame 239 is reached.
      */}
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
