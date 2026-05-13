'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { OCTORATE_URL } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface RoomBookingCardProps {
  price: string
}

export function RoomBookingCard({ price }: RoomBookingCardProps) {
  const t = useTranslations('roomDetail')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')

  function buildUrl() {
    let url = OCTORATE_URL
    if (checkin) url += `&checkin=${checkin}`
    if (checkout) url += `&checkout=${checkout}`
    return url
  }

  return (
    <div className="sticky top-24 border border-[#E8E3DE] p-8">
      <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-1">
        {t('from')}
      </p>
      <p className="font-[family-name:var(--font-display)] text-[40px] text-[#242424] mb-1">
        {price}
      </p>
      <p className="text-[13px] text-[#6B6B6B] mb-8">{t('perNight')}</p>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#9A9A9A] mb-2">
            Check-in
          </label>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full border border-[#E8E3DE] px-3 py-2 text-[13px] focus:outline-none focus:border-[#242424]"
          />
        </div>
        <div>
          <label className="block font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#9A9A9A] mb-2">
            Check-out
          </label>
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full border border-[#E8E3DE] px-3 py-2 text-[13px] focus:outline-none focus:border-[#242424]"
          />
        </div>
      </div>

      <a href={buildUrl()} target="_blank" rel="noopener noreferrer" className="block">
        <Button variant="primary" className="w-full">
          {t('bookNow')}
        </Button>
      </a>
    </div>
  )
}
