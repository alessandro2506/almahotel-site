import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn } from '@/components/ui/FadeIn'
import { MapSection } from '@/components/home/MapSection'
import { ContactForm } from '@/components/forms/ContactForm'
import { Star } from 'lucide-react'

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contacts' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

function ContattiContent() {
  const t = useTranslations('contacts')

  return (
    <>
      <div className="pt-[72px]">
        <SectionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn direction="right">
              <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#E60023] block mb-4">
                ALMA HOTEL PALERMO
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-[40px] leading-[48px] text-[#242424] mb-3">
                {t('title')}
              </h1>
              <p className="text-[16px] text-[#6B6B6B] mb-10">
                {t('subtitle')}
              </p>

              <div className="space-y-4 mb-10">
                <div>
                  <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-1">{t('addressLabel')}</p>
                  <p className="text-[14px] text-[#242424]">Via Mariano Stabile, 136<br />90139 – Palermo</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-1">{t('phoneLabel')}</p>
                  <a href="tel:+390912514962" className="text-[14px] text-[#242424] hover:text-[#E60023] transition-colors">
                    +39 091 2514962
                  </a>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-1">{t('emailLabel')}</p>
                  <a href="mailto:info@almahotel.it" className="text-[14px] text-[#242424] hover:text-[#E60023] transition-colors">
                    info@almahotel.it
                  </a>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-1">CIN / CIR</p>
                  <p className="text-[13px] text-[#6B6B6B]">CIN: IT082053A1NPDY6DP</p>
                  <p className="text-[13px] text-[#6B6B6B]">CIR: 19082053A301094</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <a href="https://www.facebook.com/almahotelpalermo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-[#6B6B6B] hover:text-[#E60023] transition-colors">
                  <IconFacebook /> Facebook
                </a>
                <a href="https://www.instagram.com/almahotelpalermo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-[#6B6B6B] hover:text-[#E60023] transition-colors">
                  <IconInstagram /> Instagram
                </a>
                <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-[#6B6B6B] hover:text-[#E60023] transition-colors">
                  <Star size={16} /> TripAdvisor
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <ContactForm />
            </FadeIn>
          </div>
        </SectionWrapper>

        <MapSection />
      </div>
    </>
  )
}

export default function ContattiPage() {
  return <ContattiContent />
}
