'use client'
import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import gsap from 'gsap'

function Orb() {
  return (
    <>
      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={1.2}>
        <Sphere args={[2.4, 128, 128]}>
          <MeshDistortMaterial
            color="#1A1430"
            distort={0.5}
            speed={1.0}
            roughness={0.05}
            metalness={0.2}
            transparent
            opacity={0.75}
          />
        </Sphere>
      </Float>
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.6} position={[3.5, -1.5, -3]}>
        <Sphere args={[0.7, 64, 64]}>
          <MeshDistortMaterial
            color="#BFA05A"
            distort={0.35}
            speed={1.8}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.45}
          />
        </Sphere>
      </Float>
    </>
  )
}

export default function HeroSection() {
  const line1 = useRef<HTMLDivElement>(null)
  const line2 = useRef<HTMLDivElement>(null)
  const meta  = useRef<HTMLDivElement>(null)
  const cue   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(line1.current,  { yPercent: 105 }, { yPercent: 0, duration: 1.3, ease: 'power4.out' })
      .fromTo(line2.current,  { yPercent: 105 }, { yPercent: 0, duration: 1.3, ease: 'power4.out' }, '-=1.0')
      .fromTo(meta.current,   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .fromTo(cue.current,    { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
  }, [])

  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0A0C14' }}>
      {/* 3D */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 4, 4]} intensity={2.5} color="#BFA05A" />
          <pointLight position={[-6, -3, -4]} intensity={0.5} color="#2030A0" />
          <Orb />
          <Environment preset="night" />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.95} intensity={1.8} blendFunction={BlendFunction.ADD} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Gradient bottom fade → cream */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(10,12,20,0.2) 0%, rgba(10,12,20,0) 40%, rgba(10,12,20,0.6) 85%, #F2EDE4 100%)',
      }} />

      {/* Typography */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', padding: '0 24px',
      }}>
        <div ref={meta} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(10px, 2vw, 40px)', marginBottom: 'clamp(12px, 2vh, 20px)', opacity: 0 }}>
          <span style={{ fontSize: 'clamp(13px, 1.4vw, 18px)', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#BFA05A', fontFamily: 'var(--font-body)' }}>
            Créateurs de convivialité
          </span>
          <span style={{ fontSize: 'clamp(13px, 1.4vw, 18px)', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#BFA05A', fontFamily: 'var(--font-body)' }}>
            India · Est. 1993
          </span>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div ref={line1} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 12vw, 230px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
            color: '#F2EDE4',
          }}>CRAFT.</div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div ref={line2} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 12vw, 230px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
            color: '#BFA05A',
          }}>CONVIVIALITY.</div>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={cue} style={{
        position: 'absolute',
        bottom: 'clamp(24px, 4vh, 40px)',
        left: 'clamp(20px, 4vw, 48px)',
        zIndex: 10, opacity: 0,
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <div style={{
          width: '24px', height: '1px', background: '#BFA05A',
          animation: 'grow 2s ease-in-out infinite',
        }} />
        <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
          Scroll to discover
        </span>
      </div>

      {/* Year — hidden on very small screens via CSS var */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(24px, 4vh, 40px)',
        right: 'clamp(20px, 4vw, 48px)',
        zIndex: 10,
        fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)',
        textTransform: 'uppercase',
        display: 'var(--year-display, block)',
      }}>Since 1993</div>

      <style>{`@keyframes grow{0%,100%{width:32px;opacity:.5}50%{width:52px;opacity:1}}`}</style>
    </section>
  )
}
