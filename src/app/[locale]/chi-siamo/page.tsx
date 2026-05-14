import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn } from '@/components/ui/FadeIn'
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel'
import Image from 'next/image'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

function ChiSiamoContent() {
  const t = useTranslations('about')

  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg"
          alt={t('heroAlt')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 pb-16 w-full">
          <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-white/70 block mb-3">
            ALMA HOTEL PALERMO
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[56px] leading-tight italic text-white">
            {t('title')}
          </h1>
        </div>
      </div>

      {/* Storia */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#E60023] block mb-4">
              {t('history')}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[40px] leading-[48px] text-[#242424] mb-6">
              {t('subtitle')}
            </h2>
            <p className="text-[16px] leading-[28px] text-[#6B6B6B] mb-4">
              {t('historyText')}
            </p>
            <p className="text-[16px] leading-[28px] text-[#6B6B6B]">
              {t('historyText2')}
            </p>
          </FadeIn>
          <FadeIn direction="left">
            <div className="relative w-full" style={{ height: '560px' }}>

              {/* SOTTO — reception — ruotata -6deg, sporgente a sinistra e in basso */}
              <div
                className="absolute overflow-hidden shadow-lg"
                style={{
                  top: '40px',
                  left: '-6%',
                  right: '14%',
                  bottom: '-24px',
                  transform: 'rotate(-6deg)',
                  transformOrigin: 'bottom left',
                  borderRadius: '2px',
                  zIndex: 2,
                }}
              >
                <Image
                  src="/images/hotel-reception.jpg"
                  alt={t('historyImageAlt')}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* SOPRA — titolari — dritta, occupa l'area centrale lasciando visibile la reception sotto */}
              <div
                className="absolute overflow-hidden shadow-2xl"
                style={{
                  top: 0,
                  left: '18%',
                  right: 0,
                  bottom: '40px',
                  borderRadius: '2px',
                  zIndex: 1,
                }}
              >
                <Image
                  src="/images/hotel-owners.jpg"
                  alt={t('teamImageAlt')}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

            </div>
          </FadeIn>
        </div>
      </SectionWrapper>

      {/* Seconda sezione */}
      <SectionWrapper background="warm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-3.jpg"
                alt={t('missionTitle')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#E60023] block mb-4">
              {t('missionLabel')}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[36px] leading-[44px] text-[#242424] mb-6">
              {t('missionTitle')}
            </h2>
            <p className="text-[16px] leading-[28px] text-[#6B6B6B] mb-4">
              {t('missionText1')}
            </p>
            <p className="text-[16px] leading-[28px] text-[#6B6B6B]">
              {t('missionText2')}
            </p>
          </FadeIn>
        </div>
      </SectionWrapper>

      {/* Certificazioni */}
      <SectionWrapper>
        <FadeIn className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-[40px] leading-[48px] text-[#242424]">
            {t('certifications')}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              name: 'Federalberghi',
              src: 'https://www.almahotel.it/wp-content/uploads/elementor/thumbs/FEDER-rbgvvoukylvfp1ldjwda8kalwiyp7km4ppmy6dzkig.jpg',
            },
            {
              name: 'Accoglienza Sicura',
              src: 'https://www.almahotel.it/wp-content/uploads/elementor/thumbs/accoglienza-sicura-il-nostro-staff-e-vaccinato-firma-web-rbgvvxbe66nseeuhlkpans4x15yi17r81ybnb27ixs.jpg',
            },
            {
              name: 'TripAdvisor Excellence',
              src: 'https://www.almahotel.it/wp-content/uploads/2023/05/TRIPADVISOR-2023.png',
            },
            {
              name: 'Booking Award',
              src: 'https://www.almahotel.it/wp-content/uploads/2021/06/0001.jpg',
            },
          ].map((cert) => (
            <div key={cert.name} className="flex flex-col items-center text-center gap-3 p-6 border border-[#E8E3DE]">
              <div className="w-20 h-20 relative flex items-center justify-center">
                <Image
                  src={cert.src}
                  alt={cert.name}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
              <p className="font-[family-name:var(--font-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#242424]">
                {cert.name}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Recensioni */}
      <section className="bg-[#F5F0E8] py-[96px] max-md:py-[64px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeIn className="text-center mb-12">
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] block mb-4">
              {t('reviewsLabel')}
            </span>
            <h2 className="font-[family-name:var(--font-display)] italic text-[#242424]"
                style={{ fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.2 }}>
              {t('reviewsTitle')}
            </h2>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="text-center">
                <p className="font-[family-name:var(--font-display)] italic text-[32px] text-[#1C1C1C] leading-none">8.9</p>
                <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-wider text-[#9A9A9A] mt-1">Booking.com</p>
              </div>
              <div className="w-px h-10 bg-[#E8E3DE]" />
              <div className="text-center">
                <p className="font-[family-name:var(--font-display)] italic text-[32px] text-[#1C1C1C] leading-none">4.8</p>
                <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-wider text-[#9A9A9A] mt-1">TripAdvisor</p>
              </div>
              <div className="w-px h-10 bg-[#E8E3DE]" />
              <div className="text-center">
                <p className="font-[family-name:var(--font-display)] italic text-[32px] text-[#1C1C1C] leading-none">9.5</p>
                <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-wider text-[#9A9A9A] mt-1">Trivago</p>
              </div>
            </div>
          </FadeIn>
        </div>
        <ReviewsCarousel />
      </section>
    </>
  )
}

export default function ChiSiamoPage() {
  return <ChiSiamoContent />
}
