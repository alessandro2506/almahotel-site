'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { SlideFade } from '@/components/ui/FadeIn'
import { ArrowRight } from 'lucide-react'

export function ExperienceSection() {
  const locale = useLocale()
  const t = useTranslations('experience')

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">
        {/* Testo sinistra */}
        <SlideFade direction="left" className="flex items-center px-10 py-16 lg:px-16 xl:px-20 order-2 lg:order-1">
          <div className="max-w-md">
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] block mb-5">
              {t('label')}
            </span>
            <h2
              className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 48px)', lineHeight: 1.15 }}
            >
              {t('title')}
            </h2>
            <p className="text-[16px] leading-[1.85] text-[#6B6B6B] mb-8">
              {t('text')}
            </p>
            <Link
              href={`/${locale}/protected/prenota-transfer`}
              className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1C1C1C] hover:text-[#E60023] transition-colors group"
            >
              {t('cta')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SlideFade>

        {/* Immagine destra */}
        <SlideFade direction="right" className="relative min-h-[400px] lg:min-h-full overflow-hidden order-1 lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1618225687595-75be91fc01d1?w=1200&q=80"
            alt={t('imageAlt')}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </SlideFade>
      </div>
    </section>
  )
}
