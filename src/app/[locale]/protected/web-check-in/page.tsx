import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn } from '@/components/ui/FadeIn'
import { CheckInForm } from '@/components/forms/CheckInForm'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Web Check-In' }
}

function WebCheckInContent() {
  const t = useTranslations('protected.checkin')
  const tc = useTranslations('checkinPage')

  return (
    <>
      <div className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image
          src="/images/hotel-reception.jpg"
          alt="Alma Hotel Palermo – Reception"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 pb-14 w-full">
          <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-white/70 block mb-3">
            ALMA HOTEL PALERMO
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[48px] leading-tight italic text-white">
            {t('title')}
          </h1>
        </div>
      </div>
      <SectionWrapper>
        <FadeIn className="text-center mb-12">
          <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#E60023] block mb-4">
            {tc('pageLabel')}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[40px] leading-[48px] italic text-[#242424] mb-4">
            {t('title')}
          </h1>
          <p className="text-[16px] text-[#6B6B6B] max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </FadeIn>

        <CheckInForm />
      </SectionWrapper>
    </>
  )
}

export default function WebCheckInPage() {
  return <WebCheckInContent />
}
