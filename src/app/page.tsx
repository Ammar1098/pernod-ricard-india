'use client'
import { useEffect, useState } from 'react'
import Preloader             from '@/components/ui/Preloader'
import MarqueeSection        from '@/components/sections/MarqueeSection'
import FrameSequenceSection  from '@/components/sections/FrameSequenceSection'
import PinnedTextSection     from '@/components/sections/PinnedTextSection'
import StatSection           from '@/components/sections/StatSection'
import KeywordSection        from '@/components/sections/KeywordSection'
import PhilosophySection     from '@/components/sections/PhilosophySection'
import BrandsSection         from '@/components/sections/BrandsSection'
import SustainabilitySection from '@/components/sections/SustainabilitySection'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Stop Chrome from restoring the previous scroll position on reload
    history.scrollRestoration = 'manual'
    // Lock scroll while preloader is visible so Lenis/browser can't drift the page
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
  }, [])

  const handleLoaded = () => {
    document.body.style.overflow = ''
    window.scrollTo(0, 0)
    setLoaded(true)
  }

  return (
    <>
      {!loaded && <Preloader onComplete={handleLoaded} />}
      {/* pointerEvents:none on the outer shell so it doesn't swallow clicks
          destined for the fixed Nav (zIndex:10). Each interactive child
          re-enables pointer events with pointerEvents:'auto'. */}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s', overflow: 'visible', position: 'relative', zIndex: 20, pointerEvents: 'none' }}>
        <FrameSequenceSection />
        {/* All sections below are position:relative zIndex:20 — sit above the fixed canvas */}
        <div style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
          <MarqueeSection />
          <PinnedTextSection />
          {/*
            zIndex: 2000 — GSAP's pin sets z-index: 1000 on the pinned element.
            Everything that scrolls over it must be higher, otherwise the pinned
            text bleeds through the sections above it in z-order.
          */}
          <div style={{ position: 'relative', zIndex: 2000 }}>
            <StatSection />
            <KeywordSection
              label="Our commitment to excellence"
              word="CRAFT"
              body="We make things properly. From sourcing to bottling, quality is the only standard we recognise — across Indian-made and international brands alike. We let that standard be the measure of our long-term value."
              bgImg="https://reimagined-succotash-tau.vercel.app/images/brands/jameson/00-jameson_sa_website.jpg"
            />
            <PhilosophySection />
            <KeywordSection
              label="The Pernod Ricard group"
              word="GLOBAL"
              body="Present in 70+ countries. 19,000 employees worldwide. 17 of the Top 100 spirits brands. One shared conviction: good times from a good place."
              bg="#0E0E0E"
              fg="#F2EDE4"
            />
            <BrandsSection />
            <SustainabilitySection />
          </div>
        </div>
      </div>
    </>
  )
}
