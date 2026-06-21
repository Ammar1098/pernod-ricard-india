const BASE = 'https://reimagined-succotash-tau.vercel.app'

const BRANDS = [
  { name: 'Royal Stag',    logo: '/logos/royal-stag.png' },
  { name: 'Blenders Pride',logo: '/logos/blenders-pride.png' },
  { name: '100 Pipers',    logo: '/logos/100-pipers.png' },
  { name: "Seagram's",     logo: '/logos/seagrams.png' },
  { name: 'Chivas Regal',  logo: '/logos/chivas-regal.png' },
  { name: 'The Glenlivet', logo: '/logos/the-glenlivet.png' },
  { name: "Ballantine's",  logo: `${BASE}/images/brands/ballantines/23-ballantines_logo_600.png` },
  { name: 'Jameson',       logo: '/logos/jameson.png' },
  { name: 'Absolut',       logo: '/logos/absolut.png' },
  { name: 'Beefeater',     logo: '/logos/beefeater.png' },
  { name: 'Martell',       logo: '/logos/martell.png' },
  { name: 'Havana Club',   logo: `${BASE}/images/brands/havana-club/23-havana_club_logo.png` },
  { name: 'Malibu',        logo: `${BASE}/images/brands/malibu/23-malibu_logo_600_0.png` },
  { name: 'Imperial Blue', logo: '/logos/imperial-blue.png' },
]

const doubled = [...BRANDS, ...BRANDS]

export default function MarqueeSection() {
  return (
    <section style={{
      background: '#F2EDE4',
      padding: '28px 0',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(14,14,14,0.08)',
    }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'mrq 42s linear infinite', alignItems: 'center' }}>
        {doubled.map((b, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center',
            paddingRight: '56px',
            flexShrink: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.logo}
              alt={b.name}
              style={{
                height: 'clamp(28px, 3.2vw, 44px)',
                width: 'auto',
                maxWidth: '140px',
                objectFit: 'contain',
                filter: 'brightness(0)',
                opacity: 0.5,
                display: 'block',
              }}
            />
            <span style={{ marginLeft: '56px', color: 'rgba(14,14,14,0.18)', fontSize: '10px', flexShrink: 0 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes mrq{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  )
}
