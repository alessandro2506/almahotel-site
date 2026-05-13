import { useTranslations } from 'next-intl'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn } from '@/components/ui/FadeIn'
import { TransferForm } from '@/components/forms/TransferForm'
import { Car, Moon, Users } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Prenota Transfer — Alma Hotel Palermo' }
}

function TariffeSection() {
  return (
    <div className="bg-[#F5F0E8] rounded-none py-10 px-8 mb-14">
      <h2 className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] mb-6 text-center">
        TARIFFE — TRATTA AEROPORTO ↔ HOTEL
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {/* 1-3 persone */}
        <div className="bg-white border border-[#E8E3DE] p-6 text-center">
          <Users size={22} className="text-[#E60023] mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-2">
            1 – 3 persone
          </p>
          <p className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] text-[32px] leading-none">
            €55
          </p>
        </div>

        {/* 4-7 persone */}
        <div className="bg-white border border-[#E8E3DE] p-6 text-center">
          <Car size={22} className="text-[#E60023] mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-2">
            4 – 7 persone
          </p>
          <p className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] text-[32px] leading-none">
            €80
          </p>
        </div>

        {/* Supplemento notturno */}
        <div className="bg-[#242424] border border-[#242424] p-6 text-center">
          <Moon size={22} className="text-[#E60023] mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#999] mb-2">
            Suppl. notturno
          </p>
          <p className="font-[family-name:var(--font-display)] italic text-white text-[32px] leading-none">
            +€15
          </p>
          <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#999] mt-2">
            dalle 00:00 alle 04:59
          </p>
        </div>
      </div>

      <p className="text-center font-[family-name:var(--font-sans)] text-[12px] text-[#9A9A9A] mt-5">
        Prezzi fissi per corsa · Nessun supplemento bagagli · Pagamento in loco
      </p>
    </div>
  )
}

function PrenotaTransferContent() {
  const t = useTranslations('protected.transfer')

  return (
    <div className="pt-[80px]">
      <SectionWrapper>
        <FadeIn className="text-center mb-10">
          <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#E60023] block mb-4">
            SERVIZIO TRANSFER
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
    </div>
  )
}

export default function PrenotaTransferPage() {
  return <PrenotaTransferContent />
}
