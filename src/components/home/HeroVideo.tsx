'use client'

import { useLocale } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { OCTORATE_URL } from '@/lib/utils'
import Link from 'next/link'

export function HeroVideo() {
  const locale = useLocale()
  const vimeoId = process.env.NEXT_PUBLIC_VIMEO_ID ?? '382157995'

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
      {/* Video Vimeo — bg-[#1C1C1C] funge da sfondo durante il caricamento */}
      <div className="absolute inset-0 z-0">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&playsinline=1`}
          className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          allow="autoplay; fullscreen"
          title="Alma Hotel Palermo"
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Contenuto centrato */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65 mb-7">
          PALERMO · BOUTIQUE HOTEL
        </p>
        <h1
          className="font-[family-name:var(--font-display)] italic text-white mb-10 leading-tight"
          style={{ fontSize: 'clamp(44px, 7vw, 72px)' }}
        >
          Il Tuo Rifugio<br />nel Cuore di Palermo
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={OCTORATE_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">Prenota Ora</Button>
          </a>
          <Link href={`/${locale}/camere`}>
            <Button variant="outline-white" size="lg">Scopri le Camere</Button>
          </Link>
        </div>
      </div>

      {/* Indirizzo bottom-left */}
      <div className="absolute bottom-10 left-6 lg:left-10 z-20">
        <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.2em] text-white/50">
          Via Mariano Stabile, 136 — Palermo
        </p>
      </div>

      {/* Scroll indicator bottom-right */}
      <div className="absolute bottom-10 right-6 lg:right-10 z-20 flex flex-col items-center gap-2">
        <span className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-white/40 [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
        <ChevronDown size={16} className="scroll-bounce text-white/40" />
      </div>
    </section>
  )
}
