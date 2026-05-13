import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResend, HOTEL_EMAIL, transferConfirmationHtml } from '@/lib/resend'
import { createServiceClient } from '@/lib/supabase'
import { rateLimit } from '@/lib/rate-limit'

const schema = z.object({
  serviceType: z.enum(['arrival', 'departure']),
  date: z.string().min(1),
  time: z.string().min(1),
  origin: z.string().min(2),
  customOrigin: z.string().optional(),
  destination: z.string().min(2),
  passengers: z.number().min(1).max(8),
  flightNumber: z.string().optional(),
  name: z.string().min(2),
  surname: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  roomNumber: z.string().optional(),
  notes: z.string().optional(),
  privacy: z.boolean(),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ ok: false, error: 'Invalid data' }, { status: 400 })
  }

  const data = result.data
  const datetime = `${data.date} alle ${data.time}`
  const origin = data.origin === 'Altro' && data.customOrigin ? data.customOrigin : data.origin

  try {
    // 1. Email conferma al cliente
    await getResend().emails.send({
      from: 'Alma Hotel <noreply@almahotel.it>',
      to: data.email,
      subject: 'Conferma Richiesta Transfer – Alma Hotel Palermo',
      html: transferConfirmationHtml({
        name: data.name,
        surname: data.surname,
        serviceType: data.serviceType,
        datetime,
        origin,
        destination: data.destination,
        passengers: data.passengers,
        flightNumber: data.flightNumber,
        notes: data.notes,
      }),
    })

    // 2. Email notifica hotel
    await getResend().emails.send({
      from: 'Alma Hotel <noreply@almahotel.it>',
      to: HOTEL_EMAIL,
      subject: `[Transfer] ${data.serviceType === 'arrival' ? 'Arrivo' : 'Partenza'} – ${data.name} ${data.surname} – ${data.date}`,
      html: `
        <h2>Nuova Richiesta Transfer</h2>
        <p><strong>Servizio:</strong> ${data.serviceType === 'arrival' ? "Arrivo all'hotel" : "Partenza dall'hotel"}</p>
        <p><strong>Data/Ora:</strong> ${datetime}</p>
        <p><strong>Da:</strong> ${origin}</p>
        <p><strong>A:</strong> ${data.destination}</p>
        <p><strong>Passeggeri:</strong> ${data.passengers}</p>
        ${data.flightNumber ? `<p><strong>N° Volo/Treno:</strong> ${data.flightNumber}</p>` : ''}
        <hr>
        <p><strong>Nome:</strong> ${data.name} ${data.surname}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.phone}</p>
        ${data.roomNumber ? `<p><strong>Camera:</strong> ${data.roomNumber}</p>` : ''}
        ${data.notes ? `<p><strong>Note:</strong> ${data.notes}</p>` : ''}
      `,
    })

    // 3. Supabase INSERT
    const supabase = createServiceClient()
    const { data: row, error } = await supabase
      .from('transfer_requests')
      .insert({
        service_type: data.serviceType,
        datetime: new Date(`${data.date}T${data.time}`).toISOString(),
        origin,
        destination: data.destination,
        passengers: data.passengers,
        flight_number: data.flightNumber ?? null,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        room_number: data.roomNumber ?? null,
        notes: data.notes ?? null,
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) console.error('Supabase error:', error)

    return NextResponse.json({ ok: true, id: row?.id ?? null })
  } catch (error) {
    console.error('Transfer request error:', error)
    return NextResponse.json({ ok: false, error: 'Request failed' }, { status: 500 })
  }
}
