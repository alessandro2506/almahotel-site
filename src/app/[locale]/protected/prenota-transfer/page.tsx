import { useTranslations } from 'next-intl'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn } from '@/components/ui/FadeIn'
import { TransferForm } from '@/components/forms/TransferForm'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Prenota Transfer' }
}

function PrenotaTransferContent() {
  const t = useTranslations('protected.transfer')

  return (
    <div className="pt-[72px]">
      <SectionWrapper>
        <FadeIn className="text-center mb-12">
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

        <TransferForm />
      </SectionWrapper>
    </div>
  )
}

export default function PrenotaTransferPage() {
  return <PrenotaTransferContent />
}
