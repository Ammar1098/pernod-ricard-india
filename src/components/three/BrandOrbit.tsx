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

// Continuous speed: one full orbit in ~33 seconds at 60fps (matches prior avg speed)
const AUTO_SPEED = 0.003

// ── Center hub — Pernod Ricard India logo always at orbit origin ──
function CenterHub() {
  const texture = useTexture('/images/logo-white.png')
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  // "Pernod Ricard India" logo with sunburst icon — roughly 2 : 1 (w : h)
  const HUB_W = 1.60
  const HUB_H = HUB_W / 2.0

  return (
    <Billboard position={[0, 0.2, 0]}>
      {/* logo-white.png has white pixels; multiply by dark color to render
          on the cream background without a visible circle behind it */}
      <mesh>
        <planeGeometry args={[HUB_W, HUB_H]} />
        <meshBasicMaterial
          map={texture} transparent opacity={0.70}
          color="#1A1612" depthWrite={false} alphaTest={0.01}
        />
      </mesh>
    </Billboard>
  )
}

function SafeCenterHub() {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <CenterHub />
      </Suspense>
    </ErrorBoundary>
  )
}

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
  slug, india, ar, i, angleRef, isActive,
}: {
  slug: string; india: boolean; ar: number; i: number
  angleRef: React.MutableRefObject<number>; isActive: boolean
}) {
  const groupRef  = useRef<THREE.Group>(null)
  const meshRef   = useRef<THREE.Mesh>(null)
  const circleRef = useRef<THREE.Mesh>(null)
  const texture   = useTexture(`/logos/${slug}.png`)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  const { w: planeW, h: planeH } = fitLogo(ar, isActive)
  const circleR = Math.sqrt(planeW * planeW + planeH * planeH) / 2 + 0.08

  useFrame(() => {
    const a     = angleRef.current + (i / N) * Math.PI * 2
    const depth = Math.cos(a)

    // Update position every frame — smooth continuous movement
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.sin(a) * ORBIT_R,
        Math.cos(a) * ORBIT_R * ORBIT_TY * -0.6,
        Math.cos(a) * ORBIT_R * ORBIT_TZ,
      )
    }

    const targetOpacity       = THREE.MathUtils.lerp(0.12, 1.0, (depth + 1) / 2)
    const targetCircleOpacity = THREE.MathUtils.lerp(0.0, isActive ? 0.55 : 0.22, (depth + 1) / 2)

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
    <group ref={groupRef}>
      <Billboard>
        <mesh ref={circleRef} position={[0, 0, -0.02]}>
          <ringGeometry args={[circleR - 0.015, circleR, 64]} />
          <meshBasicMaterial color="#1A1612" transparent opacity={0} depthWrite={false} />
        </mesh>
        <mesh ref={meshRef}>
          <planeGeometry args={[planeW, planeH]} />
          <meshBasicMaterial
            map={texture} transparent opacity={0.12}
            color={india ? '#6B5016' : '#141210'} depthWrite={false} alphaTest={0.01}
          />
        </mesh>
      </Billboard>
    </group>
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
  const angleRef      = useRef(0)
  const prevDrag      = useRef(0)
  const isDraggingRef = useRef(false)
  const activeIdxRef  = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)

  // Sync isDragging bool into a ref accessible from useFrame
  useEffect(() => {
    isDraggingRef.current = isDragging
  }, [isDragging])

  // Apply drag delta directly to angle (no target / snap needed)
  useEffect(() => {
    const delta = dragDelta - prevDrag.current
    prevDrag.current = dragDelta
    if (delta !== 0) {
      angleRef.current -= delta * 0.012
    }
  }, [dragDelta])

  useFrame(() => {
    // Continuous auto-spin — no easing, no pausing, constant velocity
    if (!isDraggingRef.current) {
      angleRef.current -= AUTO_SPEED
    }

    // Detect which brand is visually closest to the front (cos max)
    let bestIdx = 0
    let bestCos = -Infinity
    for (let i = 0; i < N; i++) {
      const a = angleRef.current + (i / N) * Math.PI * 2
      const c = Math.cos(a)
      if (c > bestCos) { bestCos = c; bestIdx = i }
    }

    if (bestIdx !== activeIdxRef.current) {
      activeIdxRef.current = bestIdx
      setActiveIdx(bestIdx)
      onBrandChange(bestIdx)
    }
  })

  return (
    <>
      <OrbitRing />
      <SafeCenterHub />
      {BRANDS.map((brand, i) => (
        <SafeLogoPlane
          key={brand.slug}
          slug={brand.slug}
          india={brand.india}
          ar={brand.ar}
          i={i}
          angleRef={angleRef}
          isActive={i === activeIdx}
        />
      ))}
    </>
  )
}
