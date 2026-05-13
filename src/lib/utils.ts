import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const OCTORATE_URL =
  'https://book.octorate.com/octobook/site/reservation/index.xhtml?codice=13720'

export const HOTEL_ADDRESS = 'Via Mariano Stabile, 136 – 90139 Palermo'
export const HOTEL_PHONE = '+39 091 2514962'
export const HOTEL_EMAIL = 'info@almahotel.it'
export const HOTEL_LAT = 38.1207
export const HOTEL_LNG = 13.3607
