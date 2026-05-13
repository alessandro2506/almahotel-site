import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['it', 'en', 'fr', 'es'],
  defaultLocale: 'it',
})
