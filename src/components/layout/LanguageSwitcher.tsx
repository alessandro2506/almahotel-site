'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const LOCALES = [
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
]

interface LanguageSwitcherProps {
  dark?: boolean
}

export function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  function switchLocale(newLocale: string) {
    setOpen(false)
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1.5 font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest transition-colors',
          dark ? 'text-[#242424] hover:text-[#E60023]' : 'text-white hover:text-white/70'
        )}
        aria-label="Change language"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-20 bg-white border border-[#E8E3DE] shadow-lg min-w-[100px] py-1">
            {LOCALES.filter((l) => l.code !== locale).map((l) => (
              <button
                key={l.code}
                onClick={() => switchLocale(l.code)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#242424] hover:bg-[#F7F3EE] hover:text-[#E60023] transition-colors"
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
