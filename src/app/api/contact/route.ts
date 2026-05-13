import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, HOTEL_EMAIL } from '@/lib/resend'
import { rateLimit } from '@/lib/rate-limit'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
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

  const { name, email, phone, subject, message } = result.data

  try {
    await resend.emails.send({
      from: 'Alma Hotel <noreply@almahotel.it>',
      to: HOTEL_EMAIL,
      replyTo: email,
      subject: `[Contatto] ${subject} – ${name}`,
      html: `
        <h2>Nuovo messaggio di contatto</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
        <p><strong>Oggetto:</strong> ${subject}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    await resend.emails.send({
      from: 'Alma Hotel <noreply@almahotel.it>',
      to: email,
      subject: 'Abbiamo ricevuto il tuo messaggio – Alma Hotel Palermo',
      html: `
        <p>Gentile ${name},</p>
        <p>grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.</p>
        <p>Il team di Alma Hotel Palermo</p>
        <p>+39 091 2514962 | info@almahotel.it</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ ok: false, error: 'Email failed' }, { status: 500 })
  }
}
