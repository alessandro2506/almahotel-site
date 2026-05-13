/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.almahotel.it',
  generateRobotsTxt: true,
  i18n: {
    locales: ['it', 'en', 'fr', 'es'],
    defaultLocale: 'it',
  },
  exclude: ['/*/protected/*', '/*/privacy'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/*/protected/', '/api/'],
      },
    ],
  },
}
