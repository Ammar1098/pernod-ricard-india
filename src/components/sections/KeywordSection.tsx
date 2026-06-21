'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  label: string
  word: string
  body: string
  bg?: string
  fg?: string
  bgImg?: string
}

export default function KeywordSection({
  label, word, body,
  bg = '#F2EDE4',
  fg = '#0E0E0E',
  bgImg,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const wordRef    = useRef<HTMLDivElement>(null)
  const bodyRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* parallax background */
    if (bgImg && parallaxRef.current && sectionRef.current) {
      gsap.fromTo(parallaxRef.current,
        { y: '-12%' },
        {
          y: '12%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }

    /* word entrance */
    gsap.fromTo(wordRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: wordRef.current, start: 'top 75%' },
      }
    )

    /* body entrance */
    gsap.fromTo(bodyRef.current,
      { y: 24, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 80%' },
        delay: 0.2,
      }
    )
  }, [bgImg])

  return (
    <section ref={sectionRef} style={{
      background: bg,
      padding: 'clamp(64px, 10vh, 140px) clamp(24px, 6vw, 120px)',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* parallax background image */}
      {bgImg && (
        <>
          <div ref={parallaxRef} style={{
            position: 'absolute',
            inset: '-20%',
            backgroundImage: `url('${bgImg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
          }} />
          {/* dark overlay for text readability */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(8,10,16,0.65)',
          }} />
        </>
      )}

      {/* content above the parallax layers */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#BFA05A',
          marginBottom: 'clamp(16px, 3vh, 32px)',
        }}>
          {label}
        </p>

        <div ref={wordRef} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(96px, 18vw, 240px)',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 0.9,
          color: bgImg ? '#F2EDE4' : fg,
          marginBottom: 'clamp(24px, 4vh, 48px)',
          opacity: 0,
          textShadow: bgImg ? '0 2px 40px rgba(0,0,0,0.4)' : 'none',
        }}>
          {word}
        </div>

        <p ref={bodyRef} style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 1.4vw, 17px)',
          lineHeight: 1.85,
          letterSpacing: '0.03em',
          color: bgImg ? 'rgba(242,237,228,0.75)' : (fg === '#0E0E0E' ? 'rgba(14,14,14,0.55)' : 'rgba(242,237,228,0.55)'),
          maxWidth: '680px',
          margin: '0 auto',
          opacity: 0,
          textTransform: 'uppercase',
        }}>
          {body}
        </p>
      </div>
    </section>
  )
}
