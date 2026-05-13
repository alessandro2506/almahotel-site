'use client'

import { useTranslations } from 'next-intl'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

export function MapSection() {
  const t = useTranslations('map')
  // Uses keyless embed (same approach as the existing almahotel.it site).
  // If a Maps Embed API key is provided, the more precise /embed/v1/place endpoint is used.
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const hasKey = apiKey && apiKey !== 'xxxx'
  const mapsUrl = hasKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Via+Mariano+Stabile+136+Palermo+Italy`
    : 'https://maps.google.com/maps?q=Alma+Hotel+Palermo&t=m&z=16&output=embed&iwloc=near'
  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Via+Mariano+Stabile+136+Palermo+Italy'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[480px]">
      {/* Map */}
      <div className="relative min-h-[320px] lg:min-h-[480px] bg-[#E8E3DE]">
        <iframe
          src={mapsUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Alma Hotel Palermo location"
        />
      </div>

      {/* Info card */}
      <div className="bg-[#242424] p-12 flex flex-col justify-center">
        <h2 className="font-[family-name:var(--font-display)] text-[36px] text-white mb-8">
          {t('title')}
        </h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin size={18} className="text-[#E60023] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white text-[14px] leading-6">{t('address')}</p>
              <p className="text-[#9A9A9A] text-[14px]">{t('city')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone size={18} className="text-[#E60023] flex-shrink-0" />
            <a
              href="tel:+390912514962"
              className="text-white text-[14px] hover:text-[#E60023] transition-colors"
            >
              {t('phone1')}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Mail size={18} className="text-[#E60023] flex-shrink-0" />
            <a
              href="mailto:info@almahotel.it"
              className="text-white text-[14px] hover:text-[#E60023] transition-colors"
            >
              {t('email')}
            </a>
          </div>

          <div className="flex items-start gap-4">
            <Clock size={18} className="text-[#E60023] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white text-[14px]">{t('reception')}</p>
              <p className="text-[#9A9A9A] text-[13px]">{t('receptionHours')}</p>
            </div>
          </div>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#E60023] hover:text-white transition-colors border border-[#E60023] hover:bg-[#E60023] px-6 py-3 w-fit"
        >
          <ExternalLink size={12} />
          {t('directions')}
        </a>
      </div>
    </div>
  )
}
