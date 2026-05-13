import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'

  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  const { password } = await req.json()

  if (password === process.env.GUEST_PASSWORD) {
    return NextResponse.json({ ok: true, token: process.env.GUEST_PASSWORD })
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
