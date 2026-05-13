import type { ComponentType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FadeIn, SlideFade, ScaleIn } from '@/components/ui/FadeIn'
import { RoomBookingCard } from './RoomBookingCard'
import { RoomCard } from './RoomCard'
import { Wifi, Coffee, Car, Shield, Wind, Tv, Bath, BedDouble } from 'lucide-react'

const AMENITY_ICONS: Record<string, ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  'wifi': Wifi,
  'breakfast': Coffee,
  'transfer': Car,
  'safe': Shield,
  'ac': Wind,
  'tv': Tv,
  'bathroom': Bath,
  'bed': BedDouble,
}

interface RelatedRoom {
  slug: string
  name: string
  price: string
  image: string
  badge?: string
}

interface RoomDetailProps {
  name: string
  badge?: string
  typeLabel: string
  tagline: string
  longDescription: string
  specs: string
  price: string
  heroImage: string
  galleryImages: [string, string]
  amenities: string[]
  cin?: string
  cir?: string
  relatedRooms: RelatedRoom[]
  locale: string
}

export function RoomDetail({
  name,
  badge,
  typeLabel,
  tagline,
  longDescription,
  specs,
  price,
  heroImage,
  galleryImages,
  amenities,
  cin,
  cir,
  relatedRooms,
  locale,
}: RoomDetailProps) {
  const t = useTranslations('roomDetail')
  const tAmenities = useTranslations('amenities')

  return (
    <>
      {/* SEZIONE 1 — Hero fullscreen */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <Image
          src={heroImage}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[1280px] mx-auto px-6 lg:px-10 pb-14">
          {badge && (
            <span className="inline-block font-[family-name:var(--font-sans)] text-[10px] font-semibold uppercase tracking-[0.18em] text-white bg-[#E60023] px-3 py-1.5 mb-4">
              {badge}
            </span>
          )}
          <h1
            className="font-[family-name:var(--font-display)] italic text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 68px)', lineHeight: 1.1 }}
          >
            {name}
          </h1>
        </div>
      </section>

      {/* SEZIONE 2 — Intro camera */}
      <section className="bg-white py-[100px] max-md:py-[72px]">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <FadeIn>
            <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] block mb-6">
              {typeLabel}
            </span>
            <h2
              className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] mb-7"
              style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.15 }}
            >
              {tagline}
            </h2>
            <p className="text-[18px] leading-[1.9] text-[#6B6B6B] mb-8">
              {longDescription}
            </p>
            <p className="font-[family-name:var(--font-sans)] text-[12px] uppercase tracking-[0.2em] text-[#9A9A9A]">
              {specs}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SEZIONE 3 — Gallery mosaico */}
      <section className="bg-[#F5F0E8]">
        <div className="grid grid-cols-3 gap-1" style={{ height: '520px' }}>
          <ScaleIn className="col-span-2 relative overflow-hidden h-full">
            <Image
              src={heroImage}
              alt={`${name} principale`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </ScaleIn>
          <div className="flex flex-col gap-1 h-full">
            {galleryImages.map((img, i) => (
              <ScaleIn key={i} className="relative overflow-hidden flex-1" delay={0.1 * (i + 1)}>
                <Image
                  src={img}
                  alt={`${name} dettaglio ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE 4 — Split: dotazioni + booking card */}
      <section className="bg-white py-[96px] max-md:py-[64px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <SlideFade direction="left">
                <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] block mb-8">
                  {t('amenitiesLabel')}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {amenities.map((amenityKey) => {
                    const Icon = AMENITY_ICONS[amenityKey]
                    const label = tAmenities(amenityKey as Parameters<typeof tAmenities>[0])
                    return (
                      <li key={amenityKey} className="flex items-center gap-4 py-4 border-b border-[#E8E3DE]">
                        {Icon && <Icon size={18} className="text-[#E60023] flex-shrink-0" strokeWidth={1.5} />}
                        <span className="font-[family-name:var(--font-sans)] text-[13px] text-[#1C1C1C] tracking-wide">
                          {label}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                {(cin || cir) && (
                  <div className="mt-12 pt-8 border-t border-[#E8E3DE]">
                    <p className="font-[family-name:var(--font-sans)] text-[11px] text-[#9A9A9A] leading-6">
                      {cin && <span className="block">{cin}</span>}
                      {cir && <span className="block">{cir}</span>}
                    </p>
                  </div>
                )}
              </SlideFade>
            </div>

            <div className="lg:col-span-1">
              <SlideFade direction="right">
                <RoomBookingCard price={price} />
              </SlideFade>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 5 — Altre camere */}
      {relatedRooms.length > 0 && (
        <section className="bg-[#F5F0E8] py-[96px] max-md:py-[64px]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <FadeIn className="mb-12">
              <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9A9A] block mb-3">
                {t('relatedLabel')}
              </span>
              <h3
                className="font-[family-name:var(--font-display)] italic text-[#1C1C1C]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
              >
                {t('relatedTitle')}
              </h3>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedRooms.map((room) => (
                <RoomCard key={room.slug} {...room} size="standard" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
