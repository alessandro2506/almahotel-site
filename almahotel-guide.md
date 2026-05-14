# AlmaHotel – Design & Development Guide
> Progetto: Redesign completo almahotel.it | Stack: Next.js 15 + TypeScript + Tailwind CSS 4
> Autore: Alvenco Ltd | Ultimo aggiornamento: 2026-05-14 (v1.4 — i18n audit round 2, metadata camere, aria-labels)

---

## 1. Analisi sito attuale (almahotel.it)

### Struttura pagine esistente
- Home
- Benvenuto
- Chi Siamo
- Menù Colazione
- Camere: Matrimoniale / Matrimoniale Superior / Suite
- Servizi
  - Prenota Transfer (form taxi/transfer)
- Contattaci
- Web Check-In
- Ristorante → link esterno saporiperduti.it

### Lingua attuale
IT / EN / FR / ES (via plugin WordPress WPML — da sostituire con DeepL API)

### Criticità attuali identificate
1. WordPress 5.8 con Elementor — performance scadenti, Lighthouse < 60
2. Design datato, non coerente, componenti eterogenei
3. Nessuna ottimizzazione SEO strutturata (no schema.org, no sitemap dinamica)
4. Form transfer e web check-in statici senza automazione backend
5. Nessuna gestione OTA/booking engine proprietario (usa link esterno Octorate)
6. Mobile UX insufficiente

---

## 2. Verifica Design System vs Sito Reale

### Colori — CONFERMATI ✅
| Token | Hex | Match |
|---|---|---|
| Brand Red (CTA) | #E60023 | ✅ Confermato (pulsanti "Prenota Ora", nav active) |
| Deep Charcoal | #242424 | ✅ Navbar e footer background |
| Off White | #FFFFFF | ✅ Background sezioni contenuto |
| Neutral Gray | #929292 | ✅ Testi secondari nav |

### Tipografia — PARZIALMENTE CONFERMATA ⚠️
- Montserrat: ✅ usato per heading e CTA
- Open Sans: ✅ body copy
- Roboto: ⚠️ non rilevato esplicitamente sul sito live, probabile fallback

### Discrepanze rilevate
- Il sito live ha coerenza cromatica ma layout non ottimizzato rispetto al design system formale
- Spacing non rispetta la scala definita (sezioni troppo compresse su mobile)
- Border-radius misto: alcuni elementi a 0px, altri inconsistenti
- Il logo viene servito come `.png` (non SVG) — da correggere nel redesign

**Conclusione**: il design system fornito è sostanzialmente fedele al sito ma rappresenta la versione ideale, non quella implementata. Il redesign dovrà implementare fedelmente il design system, non il sito attuale.

---

## 3. Stack Tecnologico — Redesign

```
Framework:     Next.js 15 (App Router)
Language:      TypeScript 5
Styling:       Tailwind CSS 4 + CSS Variables
Animations:    Framer Motion
i18n:          next-intl + DeepL API (traduzione automatica contenuti dinamici)
Forms:         React Hook Form + Zod + Resend (email notifiche)
Booking:       Widget Octorate (esistente) + sistema interno in fase 2
Hosting:       Vercel
SEO:           next-sitemap + schema.org JSON-LD
Analytics:     Vercel Analytics + GA4
```

---

## 4. Architettura Pagine

```
/                               → Home
/camere                         → Listing camere
/camere/matrimoniale            → Camera Matrimoniale
/camere/matrimoniale-superior   → Camera Matrimoniale Superior
/camere/suite                   → Suite
/chi-siamo                      → Storia hotel, certificazioni
/contatti                       → Form contatti + mappa
/ristorante                     → Redirect saporiperduti.it
/protected/menu-colazione       → ⛔ Area protetta da password
/protected/prenota-transfer     → ⛔ Area protetta da password
/protected/web-check-in         → ⛔ Area protetta da password
```

### Internazionalizzazione
Route pattern: `/[locale]/...`
Lingue: `it` (default) | `en` | `fr` | `es`
Strategia: contenuti statici via JSON locale; contenuti dinamici via DeepL API con cache.

---

## 5. Funzionalità Automatizzate

### 5a. Area protetta da password
Le pagine `/protected/*` (Menu Colazione, Prenota Transfer, Web Check-In) sono accessibili solo inserendo una password fornita dall'hotel agli ospiti. La password è gestita tramite variabile d'ambiente Vercel (`GUEST_PASSWORD`) e può essere cambiata senza toccare il codice. Meccanismo: `PasswordGate` client-side + verifica su API route server-side + `sessionStorage` per la sessione corrente.

### 5b. Form Prenota Transfer (Taxi)
**Campi**: Nome, Cognome, Email, Telefono, Data, Ora, Provenienza, Destinazione, N° passeggeri, N° volo/treno, Note
**Flow**:
1. Validazione client-side (Zod)
2. POST `/api/transfer-request`
3. Email conferma al cliente (Resend)
4. Email notifica hotel a info@almahotel.it
5. Log su Supabase (tabella `transfer_requests`)

### 5c. Web Check-In
**Campi**: dati soggiorno + dati documento per ogni ospite
**Flow**:
1. Validazione + sanitizzazione
2. POST `/api/web-checkin`
3. Generazione PDF riepilogo (`@react-pdf/renderer`)
4. Email conferma al cliente con PDF allegato
5. Email all'hotel con PDF allegato
6. Log su Supabase (tabella `checkins`)

### 5d. Form Contatti
Standard — Resend con rate limiting (max 10 req/min per IP).

---

## 6. SEO Strategy

### On-Page
- `<title>` e `<meta description>` unici per pagina, localizzati
- Open Graph + Twitter Card per ogni pagina
- Canonical URL gestito da Next.js

### Schema.org JSON-LD
- `Hotel` sulla home con indirizzo, telefoni, amenities, starRating
- `HotelRoom` su ogni pagina camera
- `BreadcrumbList` su tutte le pagine interne
- `FAQPage` nella home (boost snippet Google)

### Keyword cluster primario
| Intento | Keyword |
|---|---|
| Navigazionale | alma hotel palermo, almahotel palermo centro |
| Transazionale | hotel palermo centro prenota, boutique hotel palermo |
| Informazionale | hotel palermo vicino stazione centrale, hotel con colazione palermo |
| Long-tail | hotel palermo transfer aeroporto, web check-in hotel palermo |

### Tecnico
- Sitemap XML dinamica (`next-sitemap`) per tutte le rotte x lingua — esclude `/protected/*`
- `robots.txt` ottimizzato
- Core Web Vitals target: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Immagini: Next.js `<Image>` con WebP/AVIF, lazy loading, `sizes` responsive
- Font: self-hosted via `next/font/google`

---

## 7. Design Direction

### Riferimenti visivi definitivi

| Priorità | Sito | URL | Cosa si prende |
|---|---|---|---|
| **Primario** | Forestis Dolomites | [forestis.it/en](https://www.forestis.it/en) | DNA visivo: minimalismo organico, serif raffinato, whitespace generoso, palette warm-neutral, fotografia ambientale editoriale |
| **Secondario** | Badrutt's Palace | [badruttspalace.com](https://badruttspalace.com/en/winter/) | Struttura e autorità: sezioni ricche ma ordinate, awards section, heritage storytelling, navigazione multi-livello |
| **Escluso** | Cheval Blanc | — | Scartato: troppi video in background, eccesso di elementi animati che creano confusione |

### Principi del redesign
- **Quiet luxury**: whitespace abbondante, ogni elemento guadagna la propria presenza
- **Un solo video**: hero fullscreen con embed Vimeo (ID 382157995) — nessun altro video nel sito
- **Tipografia display serif**: Cormorant Garamond (italic) per H1/H2 — raffinatezza che Montserrat da solo non raggiunge
- **Palette calda**: bianco puro + beige `#F7F3EE` come superficie alternativa + `#E60023` usato con parsimonia solo per CTA
- **Animazioni sobrie**: solo `fadeInUp` + `stagger` su IntersectionObserver (Framer Motion) — niente parallax pesanti
- **Floating booking bar**: sticky dopo scroll hero, con date picker e CTA Octorate

---

## 8. Componenti Chiave

| Componente | File | Note |
|---|---|---|
| `<Navbar>` | `src/components/layout/Navbar.tsx` | Transparent su hero → solid on scroll. h-[80px]. Voci centrate. CTA rosso a destra. Voci "Transfer" e "Web Check-In" incluse. |
| `<HeroVideo>` | `src/components/home/HeroVideo.tsx` | Fullscreen h-screen. Vimeo autoplay/muted/loop (ID 382157995). 2 CTA + indirizzo + scroll indicator. Testo da `useTranslations('hero')`. |
| `<BookingBar>` | `src/components/home/BookingBar.tsx` | Sticky post-hero. Check-in/out + CTA → Octorate. |
| `<RoomCard>` | `src/components/home/RoomCard.tsx` | Size `tall` (`h-[576px]/md:h-[656px]`) o `standard` (`h-[280px]/md:h-[320px]`). Hover scale, overlay gradient, badge, arrow animata. Prezzo da `useTranslations('rooms')`. |
| `<RestaurantSection>` | `src/components/home/RestaurantSection.tsx` | Split 50/50: immagine sx, testo dx. Sfondo `#F5F0E8`. Testi da `useTranslations('restaurant')`. |
| `<ExperienceSection>` | `src/components/home/ExperienceSection.tsx` | Split 50/50: testo sx, immagine dx (Mondello/Palermo). Testi da `useTranslations('experience')`. |
| `<HighlightBanner>` | `src/components/home/HighlightBanner.tsx` | Full-width immagine con overlay + testo centrato. Testi da `useTranslations('highlight')`. |
| `<MapSection>` | `src/components/home/MapSection.tsx` | Embed Google Maps **senza API key** (keyless). Info card scura a destra. Testi da `useTranslations('map')`. |
| `<ServiceIcons>` | `src/components/home/ServiceIcons.tsx` | Grid 3 colonne, icone Lucide React. Testi da `useTranslations('services')`. |
| `<AwardsCarousel>` | `src/components/home/AwardsCarousel.tsx` | CSS scroll auto-play 30s. Loghi grigi su sfondo `#F5F0E8`. |
| `<ReviewsCarousel>` | `src/components/home/ReviewsCarousel.tsx` | **Desktop**: infinite CSS scroll 35s. **Mobile**: snap-scroll con dot indicators e swipe. Recensioni reali da Booking.com/TripAdvisor. |
| `<RoomDetail>` | `src/components/home/RoomDetail.tsx` | Layout Forestis. Amenities da ID neutrali (`'wifi'`, `'breakfast'`…) → `useTranslations('amenities')`. Etichette da `useTranslations('roomDetail')`. |
| `<RoomBookingCard>` | `src/components/home/RoomBookingCard.tsx` | Sticky card prenotazione. "Prenota Ora" da `useTranslations('roomDetail')`. |
| `<PasswordGate>` | `src/components/forms/PasswordGate.tsx` | Form password centrato. Verifica server-side. `sessionStorage` per sessione — una sola password per tutte le pagine `/protected/*`. |
| `<TransferForm>` | `src/components/forms/TransferForm.tsx` | Multistep 3 step. TUTTI i label da `useTranslations('transferForm')`. LOCATIONS array dinamico per lingua. |
| `<CheckInForm>` | `src/components/forms/CheckInForm.tsx` | Multistep 4 step. GuestFields con label da `useTranslations('checkinForm')`. Tipi documento tradotti. |
| `<LanguageSwitcher>` | `src/components/layout/LanguageSwitcher.tsx` | Dropdown bandiere, routing next-intl. |
| `<Footer>` | `src/components/layout/Footer.tsx` | Sfondo `#0A0A0A`. 4 colonne link da `useTranslations('footer')`. Social SVG inline. Testi link `#999`. |

---

## 9. Integrazioni Esterne

| Servizio | Uso | Note |
|---|---|---|
| Octorate | Booking engine | `https://book.octorate.com/octobook/site/reservation/index.xhtml?codice=13720` |
| DeepL API | Traduzioni dinamiche | Client: `src/lib/deepl.ts` — lazy init via `getDeepL()`. Package: `deepl-node`. |
| Resend | Email transazionali | Transfer + Check-in + Contatti. Client: `src/lib/resend.ts` — lazy init via `getResend()`. |
| Vimeo | Hero video | ID `382157995`, embed background mode |
| Google Maps | Mappa contatti | **Embed keyless** (`maps.google.com/maps?q=Alma+Hotel&output=embed`) — stesso metodo del sito attuale almahotel.it. Se disponibile una Maps Embed API key, viene usato l'endpoint `/embed/v1/place`. |
| Supabase | DB form | Tabelle: `checkins`, `transfer_requests`. Client: `src/lib/supabase.ts` — lazy init via `getSupabase()` (public) e `createServiceClient()` (service role). |

### Pattern lazy initialization API clients
Tutti i client di terze parti sono inizializzati **lazily** (prima chiamata, non a livello di modulo) per evitare crash al build-time di Vercel quando le env vars non sono ancora disponibili:

```ts
// Esempio pattern — replicato per Resend, Supabase, DeepL
let _client: Client | null = null
export function getClient(): Client {
  if (!_client) {
    const key = process.env.API_KEY
    if (!key) throw new Error('Missing API_KEY')
    _client = new Client(key)
  }
  return _client
}
```

---

## 10. Variabili d'Ambiente (Vercel)

```env
GUEST_PASSWORD=                    # Password area protetta — cambiabile senza toccare codice
RESEND_API_KEY=                    # Email transazionali (lazy init)
HOTEL_EMAIL=info@almahotel.it      # Destinatario notifiche hotel
NEXT_PUBLIC_SUPABASE_URL=          # Endpoint Supabase (lazy init)
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Chiave pubblica Supabase (lazy init)
SUPABASE_SERVICE_ROLE_KEY=         # Chiave service role Supabase (lazy init, solo server-side)
DEEPL_API_KEY=                     # Chiave API DeepL (lazy init, formato: xxxxx:fx per free tier)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=   # OPZIONALE — se assente o "xxxx", usa embed keyless gratuito
NEXT_PUBLIC_VIMEO_ID=382157995     # ID video hero Vimeo
```

> **Nota Google Maps**: il sito almahotel.it usa un embed senza API key. La variabile `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` è opzionale: se non configurata (o impostata a `xxxx`), la mappa funziona comunque tramite embed gratuito `maps.google.com/maps?output=embed`.

> **Nota lazy init**: i client `Resend`, `Supabase` e `DeepL` vengono istanziati solo alla prima chiamata runtime, NON al momento del `import`. Questo evita crash al build-time di Vercel.

---

## 11. Roadmap di Sviluppo

### Fase 1 — Setup & Core ✅ COMPLETATA
- [x] Init repo Next.js 15 + TypeScript + Tailwind 4 + next-intl
- [x] Design token CSS, font self-hosting (Cormorant Garamond, Montserrat, Open Sans)
- [x] Componenti base: Navbar, Footer, Layout, FadeIn, BookingBar
- [x] Home page completa (struttura Badrutt's Palace, 9 sezioni)
- [x] Redesign visivo completo (tipografia Forestis, palette warm, animazioni premium)
- [x] Deploy Vercel + repo GitHub (`https://github.com/alessandro2506/almahotel-site`)

### Fase 2 — Pagine & Funzionalità ✅ COMPLETATA
- [x] Pagine camere (x3) con layout Forestis (hero + gallery + dotazioni + booking card)
- [x] PasswordGate + area protetta (`/protected/*`)
- [x] Form Transfer + API route + Resend + Supabase
- [x] Form Web Check-In + PDF (`@react-pdf/renderer`) + API route + Resend + Supabase
- [x] Form Contatti con rate limiting
- [x] i18n IT/EN/FR/ES (struttura next-intl)
- [x] Client DeepL lazy-init pronto per uso (`src/lib/deepl.ts`)

### Fase 2b — Fix Deployment ✅ COMPLETATA
- [x] Risolti tutti gli errori di build Vercel (ESLint, TypeScript, SSR, env vars)
- [x] Lazy initialization per Resend, Supabase, DeepL
- [x] Google Maps con embed keyless (fallback funzionante senza API key)
- [x] Immagini reali per tutte le sezioni (saporiperduti.it + Unsplash Palermo)
- [x] Correzioni UI: Suite come card grande, foto Palermo corretta, footer testi `#999`

### Fase 2c — i18n Completa ✅ COMPLETATA
- [x] Audit approfondito di tutti i testi hardcoded italiani su tutto il sito
- [x] Menu colazione: tutti gli item (30+ voci) tradotti in IT/EN/FR/ES via namespace `breakfastMenu`
- [x] Form Transfer: tutti i label, LOCATIONS array dinamico, riepilogo step 3, privacy consent
- [x] Form Web Check-In: GuestFields completo, tipi documento, riepilogo step 4, consenso GDPR
- [x] Sezione tariffe transfer (TariffeSection) completamente tradotta via namespace `transferRates`
- [x] Pagine camere (suite, matrimoniale, matrimoniale-superior): tutti i testi via `getTranslations`
- [x] `RoomDetail.tsx`: amenities convertite da stringhe IT a ID neutrali (es. `'wifi'`, `'breakfast'`) → tradotte a runtime
- [x] `RoomCard.tsx`, `RoomBookingCard.tsx`: label prezzo e CTA tradotti
- [x] `Footer.tsx`: titoli colonne e label link tradotti in tutte le lingue
- [x] `chi-siamo/page.tsx`: sezione "LA NOSTRA MISSIONE" tradotta
- [x] `contatti/page.tsx`: label "Indirizzo", "Telefono", "Email" tradotti
- [x] Carosello recensioni: velocità 60s→35s; mobile con snap-scroll, swipe e dot indicators
- [x] Commit: `2f7d642`

### Fase 3 — SEO & Performance 🔄 IN CORSO
- [x] Schema.org JSON-LD sulle pagine principali
- [x] next-sitemap + robots.txt
- [x] Ottimizzazione immagini con `next/image` (WebP, lazy, sizes)
- [ ] Lighthouse audit e ottimizzazioni (target ≥ 90)
- [ ] Google Search Console setup e verifica
- [ ] Core Web Vitals tuning (LCP, CLS, INP)

### Fase 4 — Launch 📋 PIANIFICATA
- [ ] UAT completo con cliente (test form, email, mappa, booking)
- [ ] Configurazione env vars reali su Vercel (Resend key, Supabase, DeepL)
- [ ] Migration DNS da WordPress a Vercel (`almahotel.it`)
- [ ] Redirect 301 da tutte le URL WordPress legacy
- [ ] Monitoraggio GA4 + Vercel Analytics
- [ ] Backup sito WordPress prima della migrazione

---

## 12. Note i18n — Guida Pratica (v1.3)

### Aggiungere un nuovo testo tradotto

1. Aggiungere la chiave in `src/messages/it.json`, `en.json`, `fr.json`, `es.json`
2. Nel componente usare `useTranslations('namespace')` (client) o `getTranslations({ locale, namespace })` (server async)
3. Richiamare con `t('chiave')`

### Namespace di riferimento rapido

| Pagina/Componente | Namespace da usare |
|---|---|
| Homepage | `hero`, `welcome`, `rooms`, `services`, `restaurant`, `experience`, `highlight`, `awards`, `booking`, `map` |
| Chi Siamo | `about` |
| Contatti | `contacts` |
| Camere (listing) | `rooms` |
| Camera Matrimoniale | `matrimoniale` |
| Camera Matrimoniale Superior | `matrimonialeSuperiore` |
| Suite | `suite` |
| Dotazioni camera | `amenities` (chiavi: `wifi`, `breakfast`, `ac`, `bathroom`, `tv`, `bed`, `safe`, `transfer`) |
| RoomDetail etichette | `roomDetail` |
| Menu Colazione | `protected.breakfast` + `breakfastMenu` |
| Prenota Transfer | `protected.transfer` + `transferRates` + `transferForm` |
| Web Check-In | `protected.checkin` + `checkinPage` + `checkinForm` |
| PasswordGate | `protected.password` |
| Navbar | `nav` |
| Footer | `footer` |

### Aggiungere una nuova lingua

1. Creare `src/messages/xx.json` copiando `en.json` e traducendo tutti i valori
2. Aggiungere `'xx'` all'array `locales` in `src/i18n/routing.ts`
3. Aggiungere la bandiera a `LanguageSwitcher.tsx`

---

## Changelog

| Data | Autore | Note |
|---|---|---|
| 2026-05-13 | Claude / Alvenco | Creazione file. Analisi sito live, verifica design system, architettura completa, SEO strategy, roadmap. |
| 2026-05-13 | Claude / Alvenco | Aggiornamento sezione 7: riferimenti visivi corretti. Forestis (primario) + Badrutt's Palace (secondario). Cheval Blanc scartato per eccesso di video e animazioni confusive. |
| 2026-05-13 | Claude / Alvenco | v1.2 — Post-implementazione completa. Aggiornate: §8 Componenti (tabella dettagliata con file paths e note implementative), §9 Integrazioni (lazy init pattern documentato, Google Maps keyless embed), §10 Env vars (note su opzionalità Maps key e lazy init), §11 Roadmap (fasi 1 e 2 completate, fase 2b fix deployment aggiunta, fase 3 in corso, fase 4 pianificata). |
| 2026-05-14 | Claude / Alvenco | v1.3 — i18n completa (fase 2c). Aggiornate: §8 Componenti (tutti i componenti ora documentati con namespace i18n usato), §11 Roadmap (fase 2c completata con 15 punti dettagliati), §12 nuova sezione guida pratica i18n (namespace di riferimento rapido, istruzioni per nuova lingua). Commit: 2f7d642. |
| 2026-05-14 | Claude / Alvenco | v1.4 — i18n audit approfondito round 2. Fix `web-check-in/page.tsx`: rimossa direttiva `'use client'` incompatibile con `generateMetadata`. Fix metadata camere: `suite`, `matrimoniale`, `matrimoniale-superior` ora usano `t('metaTitle')` e `t('metaDescription')` dalla rispettiva namespace. Fix `Navbar.tsx`: aria-label menu open/close tradotti via `nav.openMenu`/`nav.closeMenu`. Fix `camere/page.tsx` e `RoomDetail.tsx`: alt text immagini in italiano sostituiti con valori internazionalizzati. Chiavi aggiunte ai 4 JSON: `nav.openMenu`, `nav.closeMenu`, `*.metaTitle`, `*.metaDescription` per tutte le pagine camere. |
