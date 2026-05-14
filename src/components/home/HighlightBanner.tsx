'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'

export function HighlightBanner() {
  const locale = useLocale()
  const t = useTranslations('highlight')

  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/breakfast-room.jpg"
        alt={t('imageAlt')}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 mb-5">
          {t('label')}
        </p>
        <h2
          className="font-[family-name:var(--font-display)] italic text-white mb-6"
          style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1.2 }}
        >
          {t('title')}
        </h2>
        <p className="text-[16px] leading-[1.8] text-white/70 mb-8 max-w-lg mx-auto">
          {t('text')}
        </p>
        <Link
          href={`/${locale}/protected/menu-colazione`}
          className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-[12px] font-semibold uppercase tracking-[0.15em] text-white hover:text-[#E60023] transition-colors group"
        >
          {t('cta')}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
