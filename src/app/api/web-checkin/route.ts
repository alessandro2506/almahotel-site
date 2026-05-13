import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, HOTEL_EMAIL, checkinConfirmationHtml } from '@/lib/resend'
import { createServiceClient } from '@/lib/supabase'
import { rateLimit } from '@/lib/rate-limit'
import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { CheckInPdf } from '@/lib/checkin-pdf'

const guestSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  birthDate: z.string(),
  birthPlace: z.string(),
  nationality: z.string(),
  documentType: z.enum(['carta_identita', 'passaporto', 'patente']),
  documentNumber: z.string(),
  documentIssueDate: z.string(),
  documentExpiry: z.string(),
  documentAuthority: z.string(),
})

const schema = z.object({
  arrivalDate: z.string().min(1),
  departureDate: z.string().min(1),
  roomNumber: z.string().optional(),
  bookingCode: z.string().optional(),
  guestEmail: z.string().email().optional(),
  mainGuest: guestSchema,
  additionalGuests: z.array(guestSchema).optional(),
  dataConsent: z.boolean(),
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

  try {
    // 1. Genera PDF con @react-pdf/renderer
    const pdfBuffer = await renderToBuffer(
      createElement(CheckInPdf, {
        arrivalDate: data.arrivalDate,
        departureDate: data.departureDate,
        roomNumber: data.roomNumber,
        bookingCode: data.bookingCode,
        mainGuest: data.mainGuest,
        additionalGuests: data.additionalGuests ?? [],
      })
    )

    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')

    // 2. Email conferma al cliente (con PDF)
    await resend.emails.send({
      from: 'Alma Hotel <noreply@almahotel.it>',
      to: data.guestEmail ?? HOTEL_EMAIL,
      subject: 'Web Check-In Completato – Alma Hotel Palermo',
      html: checkinConfirmationHtml({
        name: data.mainGuest.name,
        surname: data.mainGuest.surname,
        arrivalDate: data.arrivalDate,
        departureDate: data.departureDate,
        roomNumber: data.roomNumber,
      }),
      attachments: [
        {
          filename: `checkin-${data.mainGuest.surname}-${data.arrivalDate}.pdf`,
          content: pdfBase64,
        },
      ],
    })

    // 3. Email hotel (con PDF)
    await resend.emails.send({
      from: 'Alma Hotel <noreply@almahotel.it>',
      to: HOTEL_EMAIL,
      subject: `[Check-In] ${data.mainGuest.name} ${data.mainGuest.surname} – Arrivo ${data.arrivalDate}`,
      html: `
        <h2>Nuovo Web Check-In</h2>
        <p><strong>Ospite:</strong> ${data.mainGuest.name} ${data.mainGuest.surname}</p>
        <p><strong>Arrivo:</strong> ${data.arrivalDate}</p>
        <p><strong>Partenza:</strong> ${data.departureDate}</p>
        ${data.roomNumber ? `<p><strong>Camera:</strong> ${data.roomNumber}</p>` : ''}
        <p><strong>N° Ospiti totali:</strong> ${1 + (data.additionalGuests?.length ?? 0)}</p>
        <p>Il riepilogo completo è allegato in PDF.</p>
      `,
      attachments: [
        {
          filename: `checkin-${data.mainGuest.surname}-${data.arrivalDate}.pdf`,
          content: pdfBase64,
        },
      ],
    })

    // 4. Supabase INSERT
    const supabase = createServiceClient()
    const { data: row, error } = await supabase
      .from('checkins')
      .insert({
        arrival_date: data.arrivalDate,
        departure_date: data.departureDate,
        room_number: data.roomNumber ?? null,
        booking_code: data.bookingCode ?? null,
        guests: [data.mainGuest, ...(data.additionalGuests ?? [])],
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) console.error('Supabase error:', error)

    return NextResponse.json({ ok: true, id: row?.id ?? null })
  } catch (error) {
    console.error('Check-in error:', error)
    return NextResponse.json({ ok: false, error: 'Request failed' }, { status: 500 })
  }
}
