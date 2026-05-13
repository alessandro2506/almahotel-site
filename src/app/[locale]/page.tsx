import { useLocale } from 'next-intl'
import { HeroVideo } from '@/components/home/HeroVideo'
import { RoomCard } from '@/components/home/RoomCard'
import { ServiceIcons } from '@/components/home/ServiceIcons'
import { AwardsCarousel } from '@/components/home/AwardsCarousel'
import { MapSection } from '@/components/home/MapSection'
import { BookingBarWrapper } from '@/components/home/BookingBarWrapper'
import { RestaurantSection } from '@/components/home/RestaurantSection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { HighlightBanner } from '@/components/home/HighlightBanner'
import { FadeIn, FadeInGroup, FadeInItem } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { OCTORATE_URL } from '@/lib/utils'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Alma Hotel Palermo – Boutique Hotel nel Centro di Palermo',
    description:
      'Boutique hotel 3 stelle nel centro di Palermo. Colazione inclusa, WiFi fibra, transfer aeroporto. Prenota direttamente sul sito ufficiale.',
    alternates: {
      canonical: `https://www.almahotel.it/${locale}`,
      languages: {
        it: 'https://www.almahotel.it/it',
        en: 'https://www.almahotel.it/en',
        fr: 'https://www.almahotel.it/fr',
        es: 'https://www.almahotel.it/es',
      },
    },
  }
}

const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Alma Hotel Palermo',
  url: 'https://www.almahotel.it',
  telephone: '+390912514962',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Mariano Stabile, 136',
    addressLocality: 'Palermo',
    postalCode: '90139',
    addressCountry: 'IT',
  },
  starRating: { '@type': 'Rating', ratingValue: '3' },
  priceRange: '€€',
  checkinTime: '14:00',
  checkoutTime: '11:00',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'WiFi gratuito', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Colazione inclusa', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Transfer aeroporto', value: true },
  ],
  sameAs: [
    'https://www.facebook.com/almahotelpalermo',
    'https://www.instagram.com/almahotelpalermo',
  ],
}

function HomeContent() {
  const locale = useLocale()

  const rooms = [
    {
      slug: 'suite',
      name: 'Suite',
      price: '€149',
      image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg',
      badge: 'Suite',
      size: 'tall' as const,
    },
    {
      slug: 'matrimoniale',
      name: 'Camera Matrimoniale',
      price: '€89',
      image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg',
    },
    {
      slug: 'matrimoniale-superior',
      name: 'Matrimoniale Superior',
      price: '€109',
      image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-2.jpg',
      badge: 'Superior',
    },
  ]

  return (
    <>
      {/* Booking bar */}
      <BookingBarWrapper />

      {/* 1. HERO */}
      <HeroVideo />

      {/* 2. INTRO — testo Forestis, sfondo bianco, centrato */}
      <section className="bg-white py-[120px] max-md:py-[80px]">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <FadeIn>
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] block mb-6">
              DAL 1896 · PALERMO CENTRO
            </span>
            <h2
              className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] mb-7"
              style={{ fontSize: 'clamp(36px, 5vw, 48px)', lineHeight: 1.2 }}
            >
              Benvenuti all&apos;Alma Hotel
            </h2>
            <p className="text-[17px] leading-[1.9] text-[#6B6B6B] mb-8">
              Nel cuore di Palermo, a pochi passi dai monumenti più belli della città, 
              l&apos;Alma Hotel vi accoglie in un&apos;atmosfera di eleganza discreta e calore autentico.
            </p>
            <Link
              href={`/${locale}/chi-siamo`}
              className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1C1C1C] hover:text-[#E60023] transition-colors group"
            >
              Scopri la nostra storia
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 3. CAMERE — griglia asimmetrica Badrutt's */}
      <section id="camere" className="bg-white py-[96px] max-md:py-[64px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <FadeIn className="mb-14">
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] block mb-4">
              LE NOSTRE CAMERE
            </span>
            <h2
              className="font-[family-name:var(--font-display)] italic text-[#1C1C1C]"
              style={{ fontSize: 'clamp(36px, 5vw, 48px)', lineHeight: 1.15 }}
            >
              Spazi Pensati<br />per il Vostro Comfort
            </h2>
          </FadeIn>

          {/* Griglia asimmetrica */}
          <FadeInGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card grande — 2/3 */}
            <FadeInItem className="md:col-span-2">
              <RoomCard {...rooms[0]} size="tall" />
            </FadeInItem>

            {/* Colonna destra: 2 card piccole */}
            <div className="flex flex-col gap-4">
              <FadeInItem>
                <RoomCard {...rooms[1]} size="standard" />
              </FadeInItem>
              <FadeInItem>
                <RoomCard {...rooms[2]} size="standard" />
              </FadeInItem>
            </div>
          </FadeInGroup>

          {/* CTA sotto la griglia */}
          <FadeIn className="mt-10 flex justify-end">
            <Link href={`/${locale}/camere`}>
              <Button variant="outline" size="md">
                Vedi tutte le camere
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 4. RISTORANTE — split 50/50 */}
      <RestaurantSection />

      {/* 5. ESPERIENZE / PALERMO — split 50/50 */}
      <ExperienceSection />

      {/* SERVIZI — su sfondo warm */}
      <section id="servizi" className="bg-[#F5F0E8] py-[96px] max-md:py-[64px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeIn className="text-center mb-14">
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] block mb-4">
              I NOSTRI SERVIZI
            </span>
            <h2
              className="font-[family-name:var(--font-display)] italic text-[#1C1C1C]"
              style={{ fontSize: 'clamp(34px, 4vw, 44px)', lineHeight: 1.2 }}
            >
              Tutto Incluso nel Vostro Soggiorno
            </h2>
          </FadeIn>
          <ServiceIcons />
        </div>
      </section>

      {/* COLAZIONE — highlight banner */}
      <HighlightBanner />

      {/* 6. AWARDS */}
      <section className="bg-[#F5F0E8] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeIn className="text-center mb-10">
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] block mb-3">
              RICONOSCIMENTI &amp; PREMI
            </span>
            <h3
              className="font-[family-name:var(--font-display)] italic text-[#1C1C1C]"
              style={{ fontSize: 'clamp(28px, 3vw, 38px)' }}
            >
              La Qualità Riconosciuta
            </h3>
          </FadeIn>
        </div>
        <AwardsCarousel />
      </section>

      {/* 7. BOOKING CTA — banner scuro */}
      <section className="bg-[#1C1C1C] py-[120px] max-md:py-[80px]">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <FadeIn>
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E60023] block mb-5">
              PRENOTA DIRETTAMENTE
            </span>
            <h2
              className="font-[family-name:var(--font-display)] italic text-white mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1.2 }}
            >
              La Miglior Tariffa<br />è sul Nostro Sito
            </h2>
            <p className="text-[16px] leading-[1.8] text-[#9A9A9A] mb-10">
              Prenota direttamente e garantirti il miglior prezzo disponibile, senza commissioni.
            </p>
            <a href={OCTORATE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">Prenota Ora</Button>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* 8. MAPPA */}
      <section id="mappa">
        <MapSection />
      </section>
    </>
  )
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
      <HomeContent />
    </>
  )
}
