import Image from 'next/image'
import { SlideFade } from '@/components/ui/FadeIn'
import { ArrowRight } from 'lucide-react'

export function RestaurantSection() {
  return (
    <section className="bg-[#F5F0E8]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">
        {/* Immagine sinistra */}
        <SlideFade direction="left" className="relative min-h-[400px] lg:min-h-full overflow-hidden">
          <Image
            src="https://www.saporiperduti.it/wp-content/uploads/2021/12/DSC_0013_900x600.jpg"
            alt="Ristorante Sapori Perduti"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </SlideFade>

        {/* Testo destra */}
        <SlideFade direction="right" className="flex items-center px-10 py-16 lg:px-16 xl:px-20">
          <div className="max-w-md">
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A9A9A] block mb-5">
              IL RISTORANTE
            </span>
            <h2 className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] mb-6"
                style={{ fontSize: 'clamp(36px, 4vw, 48px)', lineHeight: 1.15 }}>
              Sapori Perduti
            </h2>
            <p className="text-[16px] leading-[1.85] text-[#6B6B6B] mb-8">
              A pochi passi dall&apos;hotel, il ristorante Sapori Perduti porta in tavola il meglio 
              della tradizione siciliana, reinterpretata con maestria dallo Chef Piero Oneto. 
              Un&apos;esperienza culinaria autentica nel cuore di Palermo.
            </p>
            <a
              href="https://www.saporiperduti.it"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1C1C1C] hover:text-[#E60023] transition-colors group"
            >
              Scopri il Ristorante
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </SlideFade>
      </div>
    </section>
  )
}
