'use client'
import { useState } from 'react'
import MenuOverlay from './MenuOverlay'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />

      <header style={{
        position: 'relative',
        width: '100%',
        zIndex: 200,
        padding: 'clamp(20px, 3vh, 32px) clamp(20px, 4vw, 48px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mixBlendMode: 'difference',
      } as React.CSSProperties}>

        {/* Left — MENU button */}
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'none', border: 'none',
            fontSize: '10px', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#FFFFFF',
            fontFamily: 'var(--font-body)',
            padding: '8px 0',
            minWidth: '44px', minHeight: '44px',
            display: 'flex', alignItems: 'center',
          }}
        >
          Menu
        </button>

        {/* Center — real logo (white version; blend-mode auto-inverts on cream) */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/images/logo-white.png"
            alt="Pernod Ricard India"
            style={{
              height: 'clamp(64px, 9vw, 108px)',
              width: 'auto',
            }}
          />
        </a>

        {/* Right — Contacts */}
        <a href="/contact" style={{
          fontSize: '10px', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: '#FFFFFF',
          textDecoration: 'none', fontFamily: 'var(--font-body)',
          padding: '8px 0',
          minWidth: '44px', minHeight: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        }}>
          Contacts
        </a>
      </header>
    </>
  )
}
