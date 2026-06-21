'use client'

export default function FooterSection() {
  return (
    <footer data-footer style={{
      background: '#0A0C14',
      padding: 'clamp(64px, 10vh, 100px) clamp(32px, 8vw, 120px) clamp(40px, 6vh, 64px)',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 'clamp(48px, 8vh, 80px)' }}>
        <img
          src="/images/logo-white.png"
          alt="Pernod Ricard India"
          style={{ height: 'clamp(48px, 7vw, 80px)', width: 'auto', display: 'block', opacity: 0.9 }}
        />
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(40px, 6vh, 80px)', alignItems: 'start', marginBottom: 'clamp(48px, 8vh, 80px)',
      }}>
        <p style={{ fontSize: '13px', color: 'rgba(242,237,228,0.3)', maxWidth: '300px', lineHeight: 1.7 }}>
          Part of the Pernod Ricard group, present in 73 countries.
          Drink responsibly. Not for sale to persons under 25 years.
        </p>

        <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 'clamp(10px, 2vh, 14px) clamp(24px, 4vw, 56px)' }}>
          {[
            ['Our Group',      '/group'],
            ['History',        '/group/our-history'],
            ['Brands',         '/brands'],
            ['Sustainability', '/sustainability'],
            ['Newsroom',       '/news'],
            ['Investors',      '/investors'],
            ['Careers',        '/careers'],
            ['Contact',        '/contact'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(242,237,228,0.3)', textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.3)')}
            >{label}</a>
          ))}
        </nav>
      </div>

      <div style={{
        paddingTop: '32px', borderTop: '1px solid rgba(242,237,228,0.08)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
      }}>
        <span style={{ fontSize: '11px', color: 'rgba(242,237,228,0.2)' }}>
          © {new Date().getFullYear()} Pernod Ricard India Private Limited
        </span>
        <span style={{ fontSize: '11px', color: 'rgba(242,237,228,0.2)' }}>
          Créateurs de convivialité · Since 1805
        </span>
      </div>
    </footer>
  )
}
