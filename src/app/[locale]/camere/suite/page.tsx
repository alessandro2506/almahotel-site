import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { RoomDetail } from '@/components/home/RoomDetail'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'suite' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.almahotel.it/${locale}/camere/suite`,
    },
  }
}

export default async function SuitePageForestis({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'suite' })

  const relatedRooms = [
    {
      slug: 'matrimoniale',
      name: t('relatedMatrimoniale'),
      price: '€89',
      image: '/images/Camere/Matrimoniale/matrimoniale-01.jpg',
    },
    {
      slug: 'matrimoniale-superior',
      name: t('relatedSuperior'),
      price: '€109',
      image: '/images/Camere/Superior/superior-01.jpg',
      badge: 'Superior',
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
      price="€149"
      heroImage="/images/Camere/Suite/suite-04.jpg"
      galleryImages={[
        '/images/Camere/Suite/suite-05.jpg',
        '/images/Camere/Suite/suite-02.jpg',
        '/images/Camere/Suite/suite-bagno-01.jpg',
      ]}
      amenities={['wifi', 'breakfast', 'ac', 'bathroom', 'tv', 'bed', 'safe', 'transfer']}
      cin="CIN: IT082053C3RO37043S"
      cir="CIR: 082053-ALM-00003"
      relatedRooms={relatedRooms}
    />
  )
}
