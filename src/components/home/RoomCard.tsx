'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RoomCardProps {
  slug: string
  name: string
  description?: string
  price: string
  image: string
  badge?: string
  /** 'tall' per la card grande 2/3, 'standard' per quelle 1/3 */
  size?: 'tall' | 'standard'
  className?: string
}

export function RoomCard({
  slug,
  name,
  price,
  image,
  badge,
  size = 'standard',
  className,
}: RoomCardProps) {
  const locale = useLocale()
  const t = useTranslations('rooms')

  return (
    <Link href={`/${locale}/camere/${slug}`} className={cn('group block relative overflow-hidden', className)}>
      {/* Immagine con hover scale */}
      <div className={cn('relative overflow-hidden', size === 'tall' ? 'h-[576px] md:h-[656px]' : 'h-[280px] md:h-[320px]')}>
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Badge */}
        {badge && (
          <span className="absolute top-5 left-5 font-[family-name:var(--font-sans)] text-[10px] font-semibold uppercase tracking-[0.18em] text-white bg-[#E60023] px-3 py-1.5">
            {badge}
          </span>
        )}

        {/* Testo overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-[family-name:var(--font-sans)] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 mb-1.5">
            {t('from')} {price}{t('perNight')}
          </p>
          <div className="flex items-end justify-between">
            <h3 className="font-[family-name:var(--font-display)] italic text-white"
                style={{ fontSize: size === 'tall' ? '26px' : '20px' }}>
              {name}
            </h3>
            {/* Freccia su hover */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowRight size={18} className="text-white" />
            </motion.div>
          </div>
          {/* Underline animato */}
          <div className="mt-3 h-px bg-white/30 w-0 group-hover:w-full transition-all duration-500" />
        </div>
      </div>
    </Link>
  )
}
