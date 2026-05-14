import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { RoomDetail } from '@/components/home/RoomDetail'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'matrimoniale' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.almahotel.it/${locale}/camere/matrimoniale`,
    },
  }
}

export default async function MatrimonialePageForestis({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'matrimoniale' })

  const relatedRooms = [
    {
      slug: 'matrimoniale-superior',
      name: t('relatedSuperior'),
      price: '€109',
      image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-2.jpg',
      badge: 'Superior',
    },
    {
      slug: 'suite',
      name: t('relatedSuite'),
      price: '€149',
      image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg',
      badge: 'Suite',
    },
  ]

  return (
    <RoomDetail
      locale={locale}
      name={t('name')}
      badge={t('badge')}
      typeLabel={t('typeLabel')}
      tagline={t('tagline')}
      longDescription={t('longDescription')}
      specs={t('specs')}
      price="€89"
      heroImage="https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg"
      galleryImages={[
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-3.jpg',
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/balcone-5-1.jpg',
      ]}
      amenities={['wifi', 'breakfast', 'ac', 'bathroom', 'tv', 'bed', 'safe', 'transfer']}
      cin="CIN: IT082053C3RO37043S"
      cir="CIR: 082053-ALM-00001"
      relatedRooms={relatedRooms}
    />
  )
}
