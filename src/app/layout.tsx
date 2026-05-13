import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, Open_Sans } from 'next/font/google'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.almahotel.it'),
  title: {
    template: '%s | Alma Hotel Palermo',
    default: 'Alma Hotel Palermo – Boutique Hotel nel Centro di Palermo',
  },
  description:
    'Boutique hotel 3 stelle nel centro di Palermo. Colazione inclusa, WiFi fibra, transfer aeroporto. Prenota direttamente sul sito ufficiale.',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Alma Hotel Palermo',
    url: 'https://www.almahotel.it',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${montserrat.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
