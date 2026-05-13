import type { Metadata } from 'next'
import { RoomDetail } from '@/components/home/RoomDetail'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Camera Matrimoniale – Alma Hotel Palermo',
    description:
      'Camera matrimoniale elegante nel centro di Palermo. Letto king size, bagno privato, aria condizionata, colazione inclusa.',
    alternates: {
      canonical: `https://www.almahotel.it/${locale}/camere/matrimoniale`,
    },
  }
}

const relatedRooms = [
  {
    slug: 'matrimoniale-superior',
    name: 'Matrimoniale Superior',
    price: '€109',
    image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-2.jpg',
    badge: 'Superior',
  },
  {
    slug: 'suite',
    name: 'Suite',
    price: '€149',
    image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg',
    badge: 'Suite',
  },
]

export default async function MatrimonialePageForestis({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <RoomDetail
      locale={locale}
      name="Camera Matrimoniale"
      badge="Camera Doppia"
      typeLabel="CAMERA MATRIMONIALE · ALMA HOTEL"
      tagline="Eleganza nel Cuore di Palermo"
      longDescription="La nostra Camera Matrimoniale è un rifugio di eleganza e comfort nel cuore di Palermo. Arredata con cura e attenzione ai dettagli, offre tutto il necessario per un soggiorno indimenticabile. Luce naturale, atmosfera calda e silenziosa — la vostra casa lontano da casa."
      specs="22 m² · Letto King Size · Bagno Privato · Vista Città"
      price="€89"
      heroImage="https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg"
      galleryImages={[
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-3.jpg',
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/balcone-5-1.jpg',
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
      cir="CIR: 082053-ALM-00001"
      relatedRooms={relatedRooms}
    />
  )
}
