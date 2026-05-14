'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn } from '@/components/ui/FadeIn'
import { TransferForm } from '@/components/forms/TransferForm'
import { Car, Moon, Users } from 'lucide-react'

function TariffeSection() {
  const tr = useTranslations('transferRates')

  return (
    <div className="bg-[#F5F0E8] rounded-none py-10 px-8 mb-14">
      <h2 className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] mb-6 text-center">
        {tr('label')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="bg-white border border-[#E8E3DE] p-6 text-center">
          <Users size={22} className="text-[#E60023] mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-2">
            {tr('persons13')}
          </p>
          <p className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] text-[32px] leading-none">
            €55
          </p>
        </div>

        <div className="bg-white border border-[#E8E3DE] p-6 text-center">
          <Car size={22} className="text-[#E60023] mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-2">
            {tr('persons47')}
          </p>
          <p className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] text-[32px] leading-none">
            €80
          </p>
        </div>

        <div className="bg-[#242424] border border-[#242424] p-6 text-center">
          <Moon size={22} className="text-[#E60023] mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#999] mb-2">
            {tr('nightSurcharge')}
          </p>
          <p className="font-[family-name:var(--font-display)] italic text-white text-[32px] leading-none">
            +€15
          </p>
          <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#999] mt-2">
            {tr('nightHours')}
          </p>
        </div>
      </div>

      <p className="text-center font-[family-name:var(--font-sans)] text-[12px] text-[#9A9A9A] mt-5">
        {tr('note')}
      </p>
    </div>
  )
}

function PrenotaTransferContent() {
  const t = useTranslations('protected.transfer')
  const tr = useTranslations('transferRates')

  return (
    <>
      <div className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden" style={{ minHeight: '360px' }}>
        <Image
          src="/images/mondello.jpg"
          alt="Palermo – Mondello"
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
        <FadeIn className="text-center mb-10">
          <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#E60023] block mb-4">
            {tr('pageLabel')}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[40px] leading-[48px] italic text-[#242424] mb-4">
            {t('title')}
          </h1>
          <p className="text-[16px] text-[#6B6B6B] max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </FadeIn>

        <TariffeSection />

        <TransferForm />
      </SectionWrapper>
    </>
  )
}

export default function PrenotaTransferPage() {
  return <PrenotaTransferContent />
}
