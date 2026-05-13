import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { RoomDetail } from '@/components/home/RoomDetail'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Camera Matrimoniale Superior – Alma Hotel Palermo',
    description:
      'Camera matrimoniale superior nel centro di Palermo. Spazi più ampi, finiture superiori, vista privilegiata. Colazione inclusa.',
    alternates: {
      canonical: `https://www.almahotel.it/${locale}/camere/matrimoniale-superior`,
    },
  }
}

export default async function MatrimonialeSuperiorePageForestis({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'matrimonialeSuperiore' })

  const relatedRooms = [
    {
      slug: 'matrimoniale',
      name: t('relatedMatrimoniale'),
      price: '€89',
      image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg',
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
      price="€109"
      heroImage="https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-2.jpg"
      galleryImages={[
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-7.jpg',
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg',
      ]}
      amenities={['wifi', 'breakfast', 'ac', 'bathroom', 'tv', 'bed', 'safe', 'transfer']}
      cin="CIN: IT082053C3RO37043S"
      cir="CIR: 082053-ALM-00002"
      relatedRooms={relatedRooms}
    />
  )
}
