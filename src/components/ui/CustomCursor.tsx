'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const lerp    = (a: number, b: number, n: number) => a + (b - a) * n

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px,${e.clientY - 3}px)`
      }
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px,${ring.current.y - 20}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const expand = () => ringRef.current?.setAttribute('data-hover', 'true')
    const shrink = () => ringRef.current?.removeAttribute('data-hover')
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <style>{`
        .c-dot {
          position:fixed;top:0;left:0;z-index:9999;
          width:6px;height:6px;border-radius:50%;
          background:#fff;
          mix-blend-mode:difference;
          pointer-events:none;will-change:transform;
        }
        .c-ring {
          position:fixed;top:0;left:0;z-index:9998;
          width:40px;height:40px;border-radius:50%;
          border:1px solid rgba(255,255,255,0.45);
          mix-blend-mode:difference;
          pointer-events:none;will-change:transform;
          transition:width .3s,height .3s,border-color .3s,margin .3s;
        }
        .c-ring[data-hover] {
          width:64px;height:64px;margin:-12px;
          border-color:#fff;
        }
      `}</style>
      <div ref={dotRef}  className="c-dot" />
      <div ref={ringRef} className="c-ring" />
    </>
  )
}
