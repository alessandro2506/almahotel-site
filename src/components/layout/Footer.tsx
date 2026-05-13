import Link from 'next/link'
import { useLocale } from 'next-intl'
import { AlmaLogo } from './AlmaLogo'
import { OCTORATE_URL } from '@/lib/utils'

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IconTripAdvisor() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 7.5c.83 0 1.5.67 1.5 1.5S17.33 12.5 16.5 12.5 15 11.83 15 11s.67-1.5 1.5-1.5zm-9 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S6 11.83 6 11s.67-1.5 1.5-1.5zm4.5 9c-3.5 0-6-2.5-6-5.5h12c0 3-2.5 5.5-6 5.5z" />
    </svg>
  )
}

export function Footer() {
  const locale = useLocale()

  const socialLinks = [
    { href: 'https://www.facebook.com/almahotelpalermo', Icon: IconFacebook, label: 'Facebook' },
    { href: 'https://www.instagram.com/almahotelpalermo', Icon: IconInstagram, label: 'Instagram' },
    {
      href: 'https://www.tripadvisor.it/Hotel_Review-g187890-d6756154-Reviews-Alma_Hotel-Palermo_Province_of_Palermo_Sicily.html',
      Icon: IconTripAdvisor,
      label: 'TripAdvisor',
    },
  ]

  const columns = [
    {
      title: 'HOTEL',
      links: [
        { href: `/${locale}/chi-siamo`, label: 'Chi Siamo' },
        { href: `/${locale}#servizi`, label: 'Servizi' },
        { href: `/${locale}/ristorante`, label: 'Ristorante' },
        { href: OCTORATE_URL, label: 'Prenota', external: true },
      ],
    },
    {
      title: 'CAMERE',
      links: [
        { href: `/${locale}/camere/matrimoniale`, label: 'Matrimoniale' },
        { href: `/${locale}/camere/matrimoniale-superior`, label: 'Matrimoniale Superior' },
        { href: `/${locale}/camere/suite`, label: 'Suite' },
        { href: `/${locale}/camere`, label: 'Tutte le Camere' },
      ],
    },
    {
      title: 'SERVIZI',
      links: [
        { href: `/${locale}/protected/web-check-in`, label: 'Web Check-In' },
        { href: `/${locale}/protected/prenota-transfer`, label: 'Transfer' },
        { href: `/${locale}/protected/menu-colazione`, label: 'Menu Colazione' },
      ],
    },
    {
      title: 'CONTATTI',
      links: [
        { href: 'tel:+390912514962', label: '+39 091 2514962', external: true },
        { href: 'mailto:info@almahotel.it', label: 'info@almahotel.it', external: true },
        { href: `/${locale}/contatti`, label: 'Modulo Contatti' },
      ],
    },
  ]

  return (
    <footer className="bg-[#0A0A0A] text-[#555]">
      {/* Top section */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 pb-14">
        {/* Logo centrato */}
        <div className="flex justify-center mb-14">
          <AlmaLogo variant="light" />
        </div>

        {/* 4 colonne link */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-[family-name:var(--font-sans)] text-[10px] font-semibold uppercase tracking-widest text-white mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--font-sans)] text-[12px] text-[#555] hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-[family-name:var(--font-sans)] text-[12px] text-[#555] hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social icons centrati */}
        <div className="flex justify-center gap-6 mt-8">
          {socialLinks.map(({ href, Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#555] hover:text-white transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.08]" />

      {/* Bottom section */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#555] flex flex-wrap gap-x-3 gap-y-1 justify-center md:justify-start">
          <span>CIN: IT082053C3RO37043S</span>
          <span>·</span>
          <span>CIR: 082053-ALM-00001</span>
        </div>
        <div className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest text-[#555] flex items-center gap-3">
          <span>© 2026 Alma Hotel</span>
          <span>·</span>
          <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
