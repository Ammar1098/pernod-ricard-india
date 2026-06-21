import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Providers from '@/components/ui/Providers'
import FooterSection from '@/components/sections/FooterSection'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pernod Ricard India',
  description: 'Créateurs de convivialité',
}

export const viewport: Viewport = {
  themeColor: '#F2EDE4',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        {/* Speed up first byte from the external image CDN */}
        <link rel="preconnect" href="https://reimagined-succotash-tau.vercel.app" />
        <link rel="dns-prefetch" href="https://reimagined-succotash-tau.vercel.app" />
      </head>
      <body suppressHydrationWarning style={{ overflowX: 'hidden', overflowY: 'auto', background: '#080A10' }}>
        <Providers>
          {children}
          <div style={{ position: 'relative', zIndex: 2001 }}>
            <FooterSection />
          </div>
        </Providers>
      </body>
    </html>
  )
}
