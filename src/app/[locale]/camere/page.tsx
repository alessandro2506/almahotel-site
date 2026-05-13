import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { RoomCard } from '@/components/home/RoomCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn, FadeInGroup, FadeInItem } from '@/components/ui/FadeIn'
import Image from 'next/image'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'rooms' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

function CamereContent() {
  const t = useTranslations('rooms')

  const rooms = [
    {
      slug: 'matrimoniale',
      name: t('matrimoniale.name'),
      description: t('matrimoniale.description'),
      price: '€89',
      image: 'https://placehold.co/1200x800/242424/F7F3EE?text=Camera+Matrimoniale',
    },
    {
      slug: 'matrimoniale-superior',
      name: t('matrimonialeSuperiore.name'),
      description: t('matrimonialeSuperiore.description'),
      price: '€109',
      image: 'https://placehold.co/1200x800/3a3a3a/F7F3EE?text=Matrimoniale+Superior',
      badge: 'Superior',
    },
    {
      slug: 'suite',
      name: t('suite.name'),
      description: t('suite.description'),
      price: '€149',
      image: 'https://placehold.co/1200x800/1a1a1a/F7F3EE?text=Suite',
      badge: 'Suite',
    },
  ]

  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="https://placehold.co/1920x1080/242424/F7F3EE?text=Le+Nostre+Camere"
          alt="Le Nostre Camere"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 pb-16 w-full">
          <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-white/70 block mb-3">
            ALMA HOTEL PALERMO
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[56px] leading-tight italic text-white">
            {t('title')}
          </h1>
        </div>
      </div>

      <SectionWrapper>
        <FadeIn className="text-center mb-12">
          <p className="text-[16px] leading-[28px] text-[#6B6B6B] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </FadeIn>
        <FadeInGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <FadeInItem key={room.slug}>
              <RoomCard {...room} />
            </FadeInItem>
          ))}
        </FadeInGroup>
      </SectionWrapper>
    </>
  )
}

export default function CamerePage() {
  return <CamereContent />
}
