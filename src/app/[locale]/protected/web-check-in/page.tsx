'use client'

import { useTranslations } from 'next-intl'
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
    <div className="pt-[72px]">
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
    </div>
  )
}

export default function WebCheckInPage() {
  return <WebCheckInContent />
}
