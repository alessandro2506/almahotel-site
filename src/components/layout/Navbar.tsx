'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AlmaLogo } from './AlmaLogo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Button } from '@/components/ui/Button'
import { OCTORATE_URL } from '@/lib/utils'

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/camere`, label: t('rooms') },
    { href: `/${locale}#servizi`, label: t('services') },
    { href: `/${locale}/chi-siamo`, label: t('about') },
    { href: `/${locale}/contatti`, label: t('contacts') },
    { href: `/${locale}/ristorante`, label: t('restaurant') },
  ]

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled
            ? 'bg-white border-b border-[#E8E3DE] shadow-none'
            : 'bg-transparent border-b border-white/20'
        )}
        style={{ height: '80px' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center h-full">
          {/* Logo — left */}
          <div className="flex-shrink-0 w-[160px]">
            <Link href={`/${locale}`} aria-label="Alma Hotel Home">
              <AlmaLogo variant={scrolled ? 'dark' : 'light'} />
            </Link>
          </div>

          {/* Nav — centrato */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase transition-colors',
                  'tracking-[0.18em]',
                  scrolled
                    ? 'text-[#242424] hover:text-[#E60023]'
                    : 'text-white/85 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-5 w-[160px] justify-end">
            <LanguageSwitcher dark={scrolled} />
            <a href={OCTORATE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm">
                {t('book')}
              </Button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center ml-auto">
            <button
              className="p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Apri menu"
            >
              <Menu size={24} className={scrolled ? 'text-[#242424]' : 'text-white'} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[100] flex flex-col bg-[#0A0A0A] transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 h-[80px] border-b border-white/10">
          <AlmaLogo variant="light" />
          <button onClick={() => setMobileOpen(false)} aria-label="Chiudi menu">
            <X size={24} className="text-white" />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-sans)] text-[13px] font-semibold uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex items-center gap-6">
            <LanguageSwitcher dark={false} />
          </div>
          <a href={OCTORATE_URL} target="_blank" rel="noopener noreferrer" className="mt-2">
            <Button variant="primary">{t('book')}</Button>
          </a>
        </nav>
      </div>
    </>
  )
}
