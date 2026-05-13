import type { Metadata } from 'next'
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

const relatedRooms = [
  {
    slug: 'matrimoniale',
    name: 'Camera Matrimoniale',
    price: '€89',
    image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg',
  },
  {
    slug: 'suite',
    name: 'Suite',
    price: '€149',
    image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg',
    badge: 'Suite',
  },
]

export default async function MatrimonialeSuperiorePageForestis({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <RoomDetail
      locale={locale}
      name="Matrimoniale Superior"
      badge="Superior"
      typeLabel="MATRIMONIALE SUPERIOR · ALMA HOTEL"
      tagline="Spazio e Raffinatezza"
      longDescription="La Camera Matrimoniale Superior unisce spazio generoso e finiture di alto livello per un soggiorno di vera qualità. Più ampia della standard, con arredi curati e dettagli premium, è la scelta ideale per chi cerca il massimo del comfort senza rinunciare all'autenticità palermitana."
      specs="28 m² · Letto King Size · 2° Piano · Vista Privilegiata"
      price="€109"
      heroImage="https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-2.jpg"
      galleryImages={[
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-7.jpg',
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg',
      ]}
      amenities={[
        'WiFi',
        'Colazione',
        'Aria Condizionata',
        'Bagno Privato',
        'TV',
        'Letto Matrimoniale',
        'Cassaforte',
        'Transfer',
      ]}
      cin="CIN: IT082053C3RO37043S"
      cir="CIR: 082053-ALM-00002"
      relatedRooms={relatedRooms}
    />
  )
}
