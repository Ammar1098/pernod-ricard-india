'use client'
import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Billboard } from '@react-three/drei'
import { ErrorBoundary } from 'react-error-boundary'
import * as THREE from 'three'

export const BRANDS = [
  { name: 'Royal Stag',     cat: 'Indian Whisky',  india: true,  slug: 'royal-stag',     ar: 3.58 },
  { name: 'Blenders Pride', cat: 'Indian Whisky',  india: true,  slug: 'blenders-pride', ar: 1.28 },
  { name: "Seagram's",      cat: 'Indian Whisky',  india: true,  slug: 'seagrams',        ar: 1.97 },
  { name: '100 Pipers',     cat: 'Scotch Whisky',  india: true,  slug: '100-pipers',      ar: 3.69 },
  { name: 'Imperial Blue',  cat: 'Indian Whisky',  india: true,  slug: 'imperial-blue',   ar: 4.90 },
  { name: 'Chivas Regal',   cat: 'Scotch Whisky',  india: false, slug: 'chivas-regal',    ar: 1.28 },
  { name: 'Jameson',        cat: 'Irish Whiskey',  india: false, slug: 'jameson',         ar: 3.81 },
  { name: 'Absolut',        cat: 'Vodka',          india: false, slug: 'absolut',         ar: 4.90 },
  { name: 'Martell',        cat: 'Cognac',         india: false, slug: 'martell',         ar: 1.45 },
  { name: 'Beefeater',      cat: 'Gin',            india: false, slug: 'beefeater',       ar: 3.12 },
  { name: 'The Glenlivet',  cat: 'Scotch Whisky',  india: false, slug: 'the-glenlivet',   ar: 3.29 },
]

export const N = BRANDS.length
const STEP = (Math.PI * 2) / N

const ORBIT_R  = 5.0
const ORBIT_TY = 0.28
const ORBIT_TZ = 0.18

const BOX_W_IDLE   = 1.0
const BOX_H_IDLE   = 0.48
const BOX_W_ACTIVE = 1.5
const BOX_H_ACTIVE = 0.72

function fitLogo(ar: number, active: boolean) {
  const bw = active ? BOX_W_ACTIVE : BOX_W_IDLE
  const bh = active ? BOX_H_ACTIVE : BOX_H_IDLE
  const h = Math.min(bw / ar, bh)
  return { w: h * ar, h }
}

function OrbitRing() {
  const line = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(
        Math.sin(a) * ORBIT_R,
        Math.cos(a) * ORBIT_R * ORBIT_TY * -0.6,
        Math.cos(a) * ORBIT_R * ORBIT_TZ,
      ))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    const mat = new THREE.LineBasicMaterial({ color: '#BFA05A', transparent: true, opacity: 0.18 })
    return new THREE.Line(geo, mat)
  }, [])
  return <primitive object={line} />
}

function LogoPlane({
  slug, india, ar, position, depth, isActive,
}: {
  slug: string; india: boolean; ar: number
  position: [number, number, number]; depth: number; isActive: boolean
}) {
  const meshRef   = useRef<THREE.Mesh>(null)
  const circleRef = useRef<THREE.Mesh>(null)
  const texture   = useTexture(`/logos/${slug}.png`)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  const targetOpacity       = THREE.MathUtils.lerp(0.12, 1.0, (depth + 1) / 2)
  const targetCircleOpacity = THREE.MathUtils.lerp(0.0, isActive ? 0.55 : 0.22, (depth + 1) / 2)
  const { w: planeW, h: planeH } = fitLogo(ar, isActive)
  const circleR = Math.sqrt(planeW * planeW + planeH * planeH) / 2 + 0.08

  useFrame(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.12)
    }
    if (circleRef.current) {
      const mat = circleRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetCircleOpacity, 0.12)
    }
  })

  return (
    <Billboard position={position}>
      <mesh ref={circleRef} position={[0, 0, -0.02]}>
        <ringGeometry args={[circleR - 0.015, circleR, 64]} />
        <meshBasicMaterial color="#1A1612" transparent opacity={targetCircleOpacity} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef}>
        <planeGeometry args={[planeW, planeH]} />
        <meshBasicMaterial
          map={texture} transparent opacity={targetOpacity}
          color={india ? '#6B5016' : '#141210'} depthWrite={false} alphaTest={0.01}
        />
      </mesh>
    </Billboard>
  )
}

function SafeLogoPlane(props: Parameters<typeof LogoPlane>[0]) {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <LogoPlane {...props} />
      </Suspense>
    </ErrorBoundary>
  )
}

interface Props {
  onBrandChange: (idx: number) => void
  dragDelta:     number
  isDragging:    boolean
}

export default function BrandOrbit({ onBrandChange, dragDelta, isDragging }: Props) {
  const angleRef     = useRef(0)
  const targetRef    = useRef(0)
  const prevDrag     = useRef(0)
  /* Tracks which brand is visually at the centre — updated every frame */
  const activeIdxRef = useRef(0)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const timeoutRef   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [activeIdx, setActiveIdx] = useState(0)

  /* Auto-spin: only advances targetRef — active brand is derived from angleRef in useFrame */
  const startAutoSpin = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      targetRef.current -= STEP
    }, 3000)
  }, [])

  useEffect(() => {
    startAutoSpin()
    return () => {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>)
      clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>)
    }
  }, [startAutoSpin])

  /* Drag: shift target, pause auto-spin */
  useEffect(() => {
    const delta = dragDelta - prevDrag.current
    prevDrag.current = dragDelta
    targetRef.current -= delta * 0.012
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
  }, [dragDelta])

  /* Drag release: snap to nearest brand, restart auto-spin */
  useEffect(() => {
    if (!isDragging) {
      const snapped = Math.round(targetRef.current / STEP) * STEP
      targetRef.current = snapped
      timeoutRef.current = setTimeout(startAutoSpin, 1500)
    }
  }, [isDragging, startAutoSpin])

  useFrame(() => {
    /* Ease orbit toward target */
    angleRef.current += (targetRef.current - angleRef.current) * 0.07

    /* Detect which brand is visually closest to the front (cos(a) maximum) */
    let bestIdx = 0
    let bestCos = -Infinity
    for (let i = 0; i < N; i++) {
      const a = angleRef.current + (i / N) * Math.PI * 2
      const c = Math.cos(a)
      if (c > bestCos) { bestCos = c; bestIdx = i }
    }

    /* Only fire React state update when the centred brand actually changes */
    if (bestIdx !== activeIdxRef.current) {
      activeIdxRef.current = bestIdx
      setActiveIdx(bestIdx)
      onBrandChange(bestIdx)
    }
  })

  return (
    <>
      <OrbitRing />
      {BRANDS.map((brand, i) => {
        const a     = angleRef.current + (i / N) * Math.PI * 2
        const x     = Math.sin(a) * ORBIT_R
        const z     = Math.cos(a) * ORBIT_R * ORBIT_TZ
        const y     = Math.cos(a) * ORBIT_R * ORBIT_TY * -0.6
        const depth = Math.cos(a)
        return (
          <SafeLogoPlane
            key={brand.slug}
            slug={brand.slug}
            india={brand.india}
            ar={brand.ar}
            position={[x, y, z]}
            depth={depth}
            isActive={i === activeIdx}
          />
        )
      })}
    </>
  )
}
