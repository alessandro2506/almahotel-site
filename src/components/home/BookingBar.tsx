'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { OCTORATE_URL } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BookingBarProps {
  heroRef: React.RefObject<HTMLElement | null>
}

export function BookingBar({ heroRef }: BookingBarProps) {
  const t = useTranslations('booking')
  const [visible, setVisible] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const [guests, setGuests] = useState(2)
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')

  useEffect(() => {
    if (!heroRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [heroRef])

  function buildUrl() {
    let url = OCTORATE_URL
    if (checkin) url += `&checkin=${checkin}`
    if (checkout) url += `&checkout=${checkout}`
    url += `&persons=${guests}`
    return url
  }

  return (
    // TODO: sostituire con sistema prenotazione interno — fase 2
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 w-full bg-white border-t border-[#E8E3DE] shadow-lg z-40"
        >
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-center gap-0 max-w-[1200px] mx-auto px-6 lg:px-10 py-3">
            <div className="flex items-center gap-2 px-5 py-2 border-r border-[#E8E3DE]">
              <Calendar size={16} className="text-[#E60023]" />
              <div>
                <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#9A9A9A]">
                  {t('checkin')}
                </p>
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  className="text-[13px] text-[#242424] font-medium bg-transparent border-none outline-none cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 px-5 py-2 border-r border-[#E8E3DE]">
              <Calendar size={16} className="text-[#E60023]" />
              <div>
                <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#9A9A9A]">
                  {t('checkout')}
                </p>
                <input
                  type="date"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  className="text-[13px] text-[#242424] font-medium bg-transparent border-none outline-none cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 px-5 py-2 border-r border-[#E8E3DE]">
              <Users size={16} className="text-[#E60023]" />
              <div>
                <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#9A9A9A]">
                  {t('guests')}
                </p>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="text-[13px] text-[#242424] font-medium bg-transparent border-none outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t('guestsCount', { count: n }).replace('{count} ', '') : t('guestsCounts', { count: n }).replace('{count} ', '')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="pl-5">
              <a href={buildUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm">
                  {t('search')}
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <button
              className="w-full flex items-center justify-between px-6 py-4"
              onClick={() => setMobileExpanded((o) => !o)}
            >
              <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#242424]">
                {t('search')}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  'text-[#242424] transition-transform',
                  mobileExpanded && 'rotate-180'
                )}
              />
            </button>
            <AnimatePresence>
              {mobileExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden px-6 pb-4 space-y-4"
                >
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#9A9A9A] block mb-1">
                      {t('checkin')}
                    </label>
                    <input
                      type="date"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      className="w-full border border-[#E8E3DE] px-3 py-2 text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#9A9A9A] block mb-1">
                      {t('checkout')}
                    </label>
                    <input
                      type="date"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      className="w-full border border-[#E8E3DE] px-3 py-2 text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#9A9A9A] block mb-1">
                      {t('guests')}
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full border border-[#E8E3De] px-3 py-2 text-[13px]"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <a
                    href={buildUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="primary" className="w-full">
                      {t('search')}
                    </Button>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
