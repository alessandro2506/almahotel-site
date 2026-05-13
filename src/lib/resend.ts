import { Resend } from 'resend'

// Lazy init — avoids crash at build time when RESEND_API_KEY is not set.
let _resend: Resend | null = null
export function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('Missing RESEND_API_KEY environment variable')
    _resend = new Resend(key)
  }
  return _resend
}

export const HOTEL_EMAIL = process.env.HOTEL_EMAIL ?? 'info@almahotel.it'

export function transferConfirmationHtml(data: {
  name: string
  surname: string
  serviceType: string
  datetime: string
  origin: string
  destination: string
  passengers: number
  flightNumber?: string
  notes?: string
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Conferma Transfer – Alma Hotel</title></head>
<body style="font-family: 'Open Sans', Arial, sans-serif; background:#F7F3EE; margin:0; padding:40px 0;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:2px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#242424;padding:32px 40px;text-align:center;">
      <h1 style="color:#fff;font-family:Georgia,serif;font-size:28px;margin:0;letter-spacing:2px;">ALMA HOTEL</h1>
      <p style="color:#9A9A9A;font-size:12px;margin:8px 0 0;letter-spacing:3px;text-transform:uppercase;">Palermo</p>
    </div>
    <div style="padding:40px;">
      <h2 style="color:#242424;font-family:Georgia,serif;font-size:22px;margin:0 0 24px;">Conferma Richiesta Transfer</h2>
      <p style="color:#6B6B6B;font-size:15px;line-height:1.7;">Gentile ${data.name} ${data.surname},<br>
      la vostra richiesta di transfer è stata ricevuta. Vi contatteremo a breve per confermare i dettagli.</p>
      <div style="background:#F7F3EE;border-radius:2px;padding:24px;margin:24px 0;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Servizio</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.serviceType === 'arrival' ? 'Arrivo all\'hotel' : 'Partenza dall\'hotel'}</td></tr>
          <tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Data e Ora</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.datetime}</td></tr>
          <tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Da</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.origin}</td></tr>
          <tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">A</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.destination}</td></tr>
          <tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Passeggeri</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.passengers}</td></tr>
          ${data.flightNumber ? `<tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">N° Volo/Treno</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.flightNumber}</td></tr>` : ''}
          ${data.notes ? `<tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Note</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.notes}</td></tr>` : ''}
        </table>
      </div>
      <p style="color:#6B6B6B;font-size:14px;line-height:1.7;">Per qualsiasi necessità non esitate a contattarci:<br>
      <strong>+39 091 2514962</strong> – <a href="mailto:info@almahotel.it" style="color:#E60023;">info@almahotel.it</a></p>
    </div>
    <div style="background:#F7F3EE;padding:20px 40px;text-align:center;border-top:1px solid #E8E3DE;">
      <p style="color:#9A9A9A;font-size:12px;margin:0;">Alma Hotel Palermo · Via Mariano Stabile, 136 · 90139 Palermo<br>CIN: IT082053A1NPDY6DP</p>
    </div>
  </div>
</body>
</html>`
}

export function checkinConfirmationHtml(data: {
  name: string
  surname: string
  arrivalDate: string
  departureDate: string
  roomNumber?: string
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Conferma Web Check-In – Alma Hotel</title></head>
<body style="font-family: 'Open Sans', Arial, sans-serif; background:#F7F3EE; margin:0; padding:40px 0;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:2px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#242424;padding:32px 40px;text-align:center;">
      <h1 style="color:#fff;font-family:Georgia,serif;font-size:28px;margin:0;letter-spacing:2px;">ALMA HOTEL</h1>
      <p style="color:#9A9A9A;font-size:12px;margin:8px 0 0;letter-spacing:3px;text-transform:uppercase;">Palermo</p>
    </div>
    <div style="padding:40px;">
      <h2 style="color:#242424;font-family:Georgia,serif;font-size:22px;margin:0 0 24px;">Web Check-In Completato</h2>
      <p style="color:#6B6B6B;font-size:15px;line-height:1.7;">Gentile ${data.name} ${data.surname},<br>
      il vostro web check-in è stato completato con successo. In allegato trovate il riepilogo del soggiorno.</p>
      <div style="background:#F7F3EE;border-radius:2px;padding:24px;margin:24px 0;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Check-in</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.arrivalDate}</td></tr>
          <tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Check-out</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">${data.departureDate}</td></tr>
          ${data.roomNumber ? `<tr><td style="padding:8px 0;color:#9A9A9A;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Camera</td><td style="padding:8px 0;color:#1A1A1A;font-size:14px;">N° ${data.roomNumber}</td></tr>` : ''}
        </table>
      </div>
      <p style="color:#6B6B6B;font-size:14px;line-height:1.7;">Vi aspettiamo con piacere. Reception disponibile 24/7:<br>
      <strong>+39 091 2514962</strong> – <a href="mailto:info@almahotel.it" style="color:#E60023;">info@almahotel.it</a></p>
    </div>
    <div style="background:#F7F3EE;padding:20px 40px;text-align:center;border-top:1px solid #E8E3DE;">
      <p style="color:#9A9A9A;font-size:12px;margin:0;">Alma Hotel Palermo · Via Mariano Stabile, 136 · 90139 Palermo<br>CIN: IT082053A1NPDY6DP</p>
    </div>
  </div>
</body>
</html>`
}
