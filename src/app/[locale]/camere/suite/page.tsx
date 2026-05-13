import type { Metadata } from 'next'
import { RoomDetail } from '@/components/home/RoomDetail'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Suite – Alma Hotel Palermo',
    description:
      'La nostra Suite esclusiva nel centro di Palermo. Spazi ampi, arredi raffinati, vista città. Il massimo del comfort per un soggiorno indimenticabile.',
    alternates: {
      canonical: `https://www.almahotel.it/${locale}/camere/suite`,
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
    slug: 'matrimoniale-superior',
    name: 'Matrimoniale Superior',
    price: '€109',
    image: 'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-2.jpg',
    badge: 'Superior',
  },
]

export default async function SuitePageForestis({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <RoomDetail
      locale={locale}
      name="Suite"
      badge="Suite Esclusiva"
      typeLabel="SUITE · ALMA HOTEL"
      tagline="Il Massimo del Comfort"
      longDescription="La Suite è il nostro alloggio più esclusivo, pensato per chi non vuole scendere a compromessi. Ambienti spaziosi, arredi ricercati, finiture di pregio e una vista mozzafiato sulla città di Palermo. Un'esperienza di soggiorno fuori dall'ordinario, nel cuore della Sicilia."
      specs="38 m² · Letto King Size · 3° Piano · Vista Panoramica"
      price="€149"
      heroImage="https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg"
      galleryImages={[
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-3.jpg',
        'https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-7.jpg',
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
      cir="CIR: 082053-ALM-00003"
      relatedRooms={relatedRooms}
    />
  )
}
