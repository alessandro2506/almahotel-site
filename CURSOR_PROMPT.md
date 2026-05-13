# AlmaHotel – Cursor Implementation Prompt
> Stack: Next.js 15 · TypeScript · Tailwind CSS 4 · Framer Motion · next-intl · Resend · Supabase
> Deploy: Vercel | Repo: da inizializzare su GitHub
> Autore: Alvenco Ltd | Aggiornato: 2026-05-13

---

## OBIETTIVO

Crea da zero il sito ufficiale di **Alma Hotel Palermo** (almahotel.it).
Redesign completo da WordPress a Next.js 15. Il sito deve essere elegante, raffinato, performante (Lighthouse ≥ 90), multilingua, e funzionale con automazioni backend reali.

---

## 1. SETUP PROGETTO

Il progetto Next.js 15 è già inizializzato. Non eseguire `create-next-app`. Installa solo le dipendenze mancanti:

```bash
npm install framer-motion next-intl @hookform/resolvers react-hook-form zod \
  resend @supabase/supabase-js @react-pdf/renderer \
  next-sitemap lucide-react clsx tailwind-merge
```

### Struttura cartelle da creare

```
src/
  app/
    [locale]/
      page.tsx                  ← Home
      camere/
        page.tsx                ← Listing camere
        matrimoniale/page.tsx
        matrimoniale-superior/page.tsx
        suite/page.tsx
      chi-siamo/page.tsx
      contatti/page.tsx
      ristorante/page.tsx       ← redirect a saporiperduti.it
      protected/
        layout.tsx              ← PasswordGate wrapper
        menu-colazione/page.tsx
        prenota-transfer/page.tsx
        web-check-in/page.tsx
    api/
      transfer-request/route.ts
      web-checkin/route.ts
      contact/route.ts
      auth-protected/route.ts
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      LanguageSwitcher.tsx
      BookingBar.tsx
    ui/
      Button.tsx
      SectionWrapper.tsx
      FadeIn.tsx
    home/
      HeroVideo.tsx
      RoomCard.tsx
      ServiceIcons.tsx
      AwardsCarousel.tsx
      MapSection.tsx
    forms/
      TransferForm.tsx
      CheckInForm.tsx
      ContactForm.tsx
      PasswordGate.tsx
  lib/
    supabase.ts
    resend.ts
    deepl.ts
    utils.ts
  i18n/
    routing.ts
    request.ts
  messages/
    it.json
    en.json
    fr.json
    es.json
```

---

## 2. VARIABILI D'AMBIENTE

Il file `.env.local` è già presente nella root. Verifica che contenga:

```env
# Autenticazione area protetta
GUEST_PASSWORD=almahotel2026

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
HOTEL_EMAIL=info@almahotel.it

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx

# DeepL
DEEPL_API_KEY=xxxx:fx

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxxx

# Vimeo video ID hero
NEXT_PUBLIC_VIMEO_ID=382157995
```

> ⚠️ Su Vercel tutte queste variabili vanno in Settings → Environment Variables.
> `GUEST_PASSWORD` cambiabile in qualsiasi momento senza toccare il codice.

---

## 3. SISTEMA DI PROTEZIONE AREA RISERVATA

Le pagine `/protected/*` sono accessibili solo dopo inserimento della password fornita dall'hotel agli ospiti.

### `src/app/[locale]/protected/layout.tsx`
Renderizza `<PasswordGate>`. Se il token in `sessionStorage` è valido, mostra i children. Altrimenti mostra il form password.

### `src/app/api/auth-protected/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password === process.env.GUEST_PASSWORD) {
    return NextResponse.json({ ok: true, token: process.env.GUEST_PASSWORD })
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}
```

### `src/components/forms/PasswordGate.tsx`
- `'use client'`
- Mount: controlla `sessionStorage.getItem('alma_guest_token')` — se valido mostra children
- Form: campo password + CTA "Accedi"
- Submit: POST `/api/auth-protected` → se ok: `sessionStorage.setItem('alma_guest_token', token)` → `router.refresh()`
- Design: sfondo `#242424`, logo `logo-light.svg` centrato in alto, card bianca con il form

---

## 4. DESIGN SYSTEM

### Riferimenti visivi
- **Primario**: Forestis Dolomites (forestis.it) — minimalismo organico, serif raffinato, whitespace generoso
- **Secondario**: Badrutt's Palace (badruttspalace.com) — heritage con autorità, sezioni strutturate
- **Regola assoluta**: un solo video in tutto il sito (hero). Nessun video in background su altre sezioni.

### Palette CSS

```css
:root {
  --color-red:            #E60023;
  --color-red-dark:       #C60015;
  --color-black:          #0A0A0A;
  --color-charcoal:       #242424;
  --color-warm:           #F7F3EE;
  --color-white:          #FFFFFF;
  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #6B6B6B;
  --color-text-muted:     #9A9A9A;
  --color-border:         #E8E3DE;
}
```

### Tipografia

```
--font-display: 'Cormorant Garamond', Georgia, serif   → H1, H2 (eleganza)
--font-sans:    'Montserrat', system-ui, sans-serif    → nav, label, CTA
--font-body:    'Open Sans', system-ui, sans-serif     → body, paragrafi
```

Scala:
```
Display H1:  56px / 64px  — Cormorant Garamond 400 italic
H2:          40px / 48px  — Cormorant Garamond 400
H3:          22px / 32px  — Montserrat 600
Body:        16px / 28px  — Open Sans 400
Small:       13px / 20px  — Montserrat 500
Label/Nav:   11px / 16px  — Montserrat 600 uppercase tracking-widest
CTA:         13px / 13px  — Montserrat 700 uppercase tracking-wider
```

### Animazioni (Framer Motion)

```ts
export const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}
export const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
}
```

Hover card camere: `scale: 1.03` sull'immagine, `duration: 0.4`.
Nessun parallax, nessuna animazione pesante.

### `<Button>` variants

```
primary: bg-[#E60023] text-white uppercase tracking-wider text-[13px] font-bold px-8 py-3.5 — NO border-radius
outline: border border-[#242424] text-[#242424] — hover: bg-[#242424] text-white
ghost:   text-[#6B6B6B] underline — hover: text-[#1A1A1A]
```

---

## 5. LOGO

I file reali sono già presenti in `public/logo/`:

```
public/logo/
  logo-dark.svg    ← logo NERO  → su sfondi CHIARI (navbar scrolled, sezioni bianche)
  logo-dark.png    ← fallback PNG del logo nero
  logo-light.svg   ← logo BIANCO → su sfondi SCURI (navbar su hero, footer, PasswordGate)
  logo-light.png   ← fallback PNG del logo bianco
```

**Usa sempre SVG come prima scelta. PNG solo come fallback.**

Regola `<Navbar>`:
```tsx
<Image
  src={isScrolled ? '/logo/logo-dark.svg' : '/logo/logo-light.svg'}
  alt="Alma Hotel Palermo"
  width={160}
  height={60}
  priority
/>
```

Footer (sfondo `#0A0A0A`): `logo-light.svg`
PasswordGate (sfondo `#242424`): `logo-light.svg`
Pagine interne con sfondo bianco: `logo-dark.svg`

---

## 6. COMPONENTI CHIAVE

### `<Navbar>`
- `fixed top-0 w-full z-50`
- Default: `bg-transparent` + logo light + testo bianco
- Scrolled (> 80px): `bg-white/95 backdrop-blur-sm shadow-sm` + logo dark + testo charcoal
- Transizione `duration-300`
- Menu: Home · Camere · Servizi · Chi Siamo · Contatti · Ristorante
- CTA destra: `<Button variant="primary">Prenota</Button>` → Octorate `target="_blank"`
- Mobile: hamburger → drawer fullscreen `bg-[#242424]`
- LanguageSwitcher: dropdown bandiere

### `<HeroVideo>`
- `h-screen min-h-[600px]`
- Vimeo embed `autoplay muted loop playsinline background=1` — `pointer-events-none`
- Overlay: `bg-gradient-to-b from-black/50 via-black/30 to-black/60`
- Copy centrato:
  ```
  label:  BOUTIQUE HOTEL · PALERMO CENTRO  (uppercase, tracking-widest, text-white/70, 11px)
  H1:     Il Tuo Soggiorno a Palermo       (Cormorant Garamond italic, 56-72px, text-white)
  btn:    [Prenota Ora]  [Scopri le Camere]
  ```
- Mobile fallback: se Vimeo non carica → `hero-bg.jpg`

### `<BookingBar>`
- Appare dopo scroll hero (IntersectionObserver)
- `fixed bottom-0 w-full bg-white border-t border-[#E8E3DE] shadow-lg z-40`
- Desktop: Check-in · Check-out · Ospiti · [Prenota Ora]
- Mobile: solo btn → tap apre drawer
- CTA: `https://book.octorate.com/octobook/site/reservation/index.xhtml?codice=13720`

### `<RoomCard>`
- aspect-ratio 4/3, overflow hidden
- img: scale 1→1.06 on hover (transition 0.5s)
- badge tipologia, titolo, prezzo da, CTA "Scopri"

### `<ServiceIcons>`
Grid 3/2/1 col. Icone Lucide. Voci: WiFi Fibra · Colazione · Transfer · Cassaforte · Gluten Free · 24h Reception · Parcheggio · A/C

### `<AwardsCarousel>`
CSS auto-scroll orizzontale (`animation: scroll 30s linear infinite`). Loghi grigi su `#F7F3EE`. No librerie esterne.

### `<MapSection>`
Google Maps JS API, marker `#E60023`, Via Mariano Stabile 136 Palermo. Card overlay con contatti.

---

## 7. PAGINE

### Home — sezioni in ordine
1. `<HeroVideo>`
2. Benvenuto — 2 col: testo + immagine
3. Camere — 3x `<RoomCard>`
4. Servizi — `<ServiceIcons>` su sfondo `#F7F3EE`
5. Prenotazione diretta — banner `#242424` + CTA Octorate
6. Premi — `<AwardsCarousel>`
7. Dove siamo — `<MapSection>`
8. `<Footer>`

### `/camere/[slug]`
Hero immagine + gallery + descrizione + sticky card prezzo + CTA + `HotelRoom` JSON-LD

### `/chi-siamo`
Hero esterno hotel + storia + certificazioni Federalberghi

### `/contatti`
`<ContactForm>` + `<MapSection>` + telefoni + email + social

### `/ristorante`
`redirect('https://www.saporiperduti.it')`

### Area protetta `/protected/*`

**`/menu-colazione`**: visualizzazione menu statico (Dolce · Salato · Bevande · Gluten Free). Solo lettura, nessun form.

**`/prenota-transfer`** — Multistep 3 step:
- Step 1: tipo servizio (arrivo/partenza), data/ora, origine/destinazione, n° passeggeri, n° volo
- Step 2: nome, cognome, email, telefono, n° camera, note
- Step 3: riepilogo + privacy + submit

**`/web-check-in`** — Multistep 4 step:
- Step 1: date soggiorno, n° camera, codice prenotazione
- Step 2: dati documento ospite principale
- Step 3: ospiti aggiuntivi (add/remove dinamico)
- Step 4: riepilogo + consenso + submit

---

## 8. API ROUTES

### `POST /api/transfer-request`
1. Zod validation
2. Resend → email conferma cliente (template brandizzato)
3. Resend → notifica `info@almahotel.it`
4. Supabase INSERT `transfer_requests`
5. Return `{ ok: true, id: uuid }`

### `POST /api/web-checkin`
1. Zod validation
2. Genera PDF con `@react-pdf/renderer` (logo, dati ospiti, soggiorno)
3. Resend → email cliente con PDF allegato
4. Resend → email hotel con PDF allegato
5. Supabase INSERT `checkins`
6. Return `{ ok: true, id: uuid }`

### Supabase — Tabelle

```sql
create table checkins (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  arrival_date date,
  departure_date date,
  room_number text,
  booking_code text,
  guests jsonb,
  pdf_url text,
  status text default 'pending'
);

create table transfer_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  service_type text,
  datetime timestamptz,
  origin text,
  destination text,
  passengers int,
  flight_number text,
  name text,
  surname text,
  email text,
  phone text,
  room_number text,
  notes text,
  status text default 'pending'
);
```

---

## 9. INTERNAZIONALIZZAZIONE

```ts
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing'
export const routing = defineRouting({
  locales: ['it', 'en', 'fr', 'es'],
  defaultLocale: 'it'
})
```

Contenuti statici: `messages/[locale].json`
Contenuti dinamici futuri: DeepL API — `Authorization: DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`

---

## 10. SEO

### Metadata root
```tsx
title: { template: '%s | Alma Hotel Palermo', default: 'Alma Hotel Palermo – Boutique Hotel nel Centro di Palermo' }
description: 'Boutique hotel 3 stelle nel centro di Palermo. Colazione inclusa, WiFi fibra, transfer aeroporto.'
```

### Schema.org Hotel (home)
```json
{
  "@type": "Hotel",
  "name": "Alma Hotel Palermo",
  "telephone": "+390912514962",
  "address": { "streetAddress": "Via Mariano Stabile, 136", "addressLocality": "Palermo", "postalCode": "90139", "addressCountry": "IT" },
  "starRating": { "@type": "Rating", "ratingValue": "3" },
  "priceRange": "€€",
  "checkinTime": "14:00",
  "checkoutTime": "11:00"
}
```

### `next-sitemap.config.js`
```js
module.exports = {
  siteUrl: 'https://www.almahotel.it',
  generateRobotsTxt: true,
  i18n: { locales: ['it', 'en', 'fr', 'es'], defaultLocale: 'it' },
  exclude: ['/*/protected/*'],
}
```

---

## 11. FOOTER

Sfondo `#0A0A0A` | Testo `#9A9A9A` | Link hover `#FFFFFF`

```
[logo-light.svg]

Hotel              Camere                    Contatti
Chi Siamo          Matrimoniale              Via Mariano Stabile, 136
Servizi            Matrimoniale Superior     90139 – Palermo
Ristorante         Suite                     +39 091 2514962
Prenota                                      info@almahotel.it

[Facebook] [Instagram] [TripAdvisor]

CIN: IT082053A1NPDY6DP | CIR: 19082053A301094
© 2026 Alma Hotel – All rights reserved | Privacy Policy
```

---

## 12. NOTE FINALI PER CURSOR

1. **Immagini placeholder**: `https://placehold.co/1200x800/242424/F7F3EE?text=Alma+Hotel`. Nomi attesi in `public/images/`: `hero-bg.jpg`, `room-matrimoniale.jpg`, `room-matrimoniale-superior.jpg`, `room-suite.jpg`, `hotel-exterior.jpg`.

2. **Logo — file reali già presenti** in `public/logo/`:
   ```
   logo-dark.svg   → su sfondi CHIARI  (navbar scrolled, sezioni bianche)
   logo-dark.png   → fallback PNG
   logo-light.svg  → su sfondi SCURI   (navbar su hero, footer, PasswordGate)
   logo-light.png  → fallback PNG
   ```
   Usa sempre SVG. PNG solo fallback.

3. **Prezzi camere**: placeholder "da €89/notte".

4. **Vimeo**: ID `382157995`, parametri `?autoplay=1&muted=1&loop=1&background=1&playsinline=1`. Fallback mobile: `hero-bg.jpg`.

5. **Responsive**: mobile-first. Breakpoints Tailwind standard.

6. **Accessibilità**: `alt` su tutti gli img. Focus visible. WCAG AA minimo.

7. **Font**: `next/font/google`, `subsets: ['latin']`, `display: 'swap'`. Pre-load Cormorant Garamond 400+italic e Montserrat 600+700.

8. **Errori da evitare**:
   - Mai `<img>` nativo — sempre `next/image` con `sizes` corretti
   - Framer Motion: import dinamico per animazioni heavy
   - `<BookingBar>` e `<PasswordGate>`: obbligatoriamente `'use client'`
   - `sessionStorage` solo in `useEffect` (no SSR)
   - API routes: rate limiting max 10 req/min per IP

9. **Root `src/app/page.tsx`**: `redirect('/it')`.

10. **Build finale**: `npm run build` — zero errori TypeScript.

---

## Changelog

| Data | Autore | Note |
|---|---|---|
| 2026-05-13 | Claude / Alvenco | Creazione file completo. Design system (Forestis + Badrutt's), area protetta GUEST_PASSWORD, Octorate, automazioni transfer/check-in, i18n, SEO, Supabase schema. |
| 2026-05-13 | Claude / Alvenco | Logo reali inseriti in `public/logo/` con naming `logo-dark/logo-light` (.svg + .png). Regole d'uso per Navbar, Footer, PasswordGate documentate nella sezione 5 e nelle note finali. |
