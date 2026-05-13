'use client'

import { useTranslations } from 'next-intl'
import {
  Wifi,
  Coffee,
  Car,
  Shield,
  Leaf,
  Bell,
  CircleParking,
  Wind,
} from 'lucide-react'
import { FadeInGroup, FadeInItem } from '@/components/ui/FadeIn'

const services = [
  { key: 'wifi' as const, icon: Wifi },
  { key: 'breakfast' as const, icon: Coffee },
  { key: 'transfer' as const, icon: Car },
  { key: 'safe' as const, icon: Shield },
  { key: 'glutenFree' as const, icon: Leaf },
  { key: 'reception' as const, icon: Bell },
  { key: 'parking' as const, icon: CircleParking },
  { key: 'airConditioning' as const, icon: Wind },
]

export function ServiceIcons() {
  const t = useTranslations('services')

  return (
    <FadeInGroup className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {services.map(({ key, icon: Icon }) => (
        <FadeInItem key={key}>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center border border-[#E8E3DE] bg-white rounded-none">
              <Icon size={22} className="text-[#E60023]" strokeWidth={1.5} />
            </div>
            <p className="font-[family-name:var(--font-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#242424]">
              {t(key)}
            </p>
          </div>
        </FadeInItem>
      ))}
    </FadeInGroup>
  )
}
