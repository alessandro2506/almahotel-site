# AlmaHotel – Design & Development Guide
> Progetto: Redesign completo almahotel.it | Stack: Next.js 15 + TypeScript + Tailwind CSS 4
> Autore: Alvenco Ltd | Ultimo aggiornamento: 2026-05-13

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

| Componente | Note |
|---|---|
| `<Navbar>` | Transparent su hero → solid on scroll. Logo SVG. Language switcher. CTA "Prenota". |
| `<HeroVideo>` | Fullscreen. Vimeo autoplay/muted/loop. Overlay gradient. Copy centrato + 2 CTA. |
| `<BookingBar>` | Sticky post-hero. Check-in/out + ospiti + CTA → Octorate. |
| `<RoomCard>` | Immagine hover-zoom, badge tipologia, prezzo da, CTA. |
| `<ServiceIcons>` | Grid 3 colonne, icone Lucide React. |
| `<AwardsCarousel>` | CSS scroll auto-play. Loghi grigi su sfondo `#F7F3EE`. |
| `<MapSection>` | Google Maps JS API + marker `#E60023` + info card overlay. |
| `<PasswordGate>` | Form password centrato, verifica API, sessionStorage per la sessione. |
| `<TransferForm>` | Multistep 3 step. Zod + React Hook Form. |
| `<CheckInForm>` | Multistep 4 step. Ospiti aggiuntivi dinamici. PDF allegato via email. |
| `<LanguageSwitcher>` | Dropdown bandiere, routing next-intl. |
| `<Footer>` | Sfondo `#0A0A0A`. 3 colonne link + CIN/CIR + social + copyright. |

---

## 9. Integrazioni Esterne

| Servizio | Uso | Note |
|---|---|---|
| Octorate | Booking engine | `https://book.octorate.com/octobook/site/reservation/index.xhtml?codice=13720` |
| DeepL API | Traduzioni dinamiche | Header: `Authorization: DeepL-Auth-Key` |
| Resend | Email transazionali | Transfer + Check-in + Contatti |
| Vimeo | Hero video | ID `382157995`, embed background mode |
| Google Maps JS API | Mappa contatti | Marker custom `#E60023` |
| Supabase | DB form | Tabelle: `checkins`, `transfer_requests` |

---

## 10. Variabili d'Ambiente (Vercel)

```env
GUEST_PASSWORD=         # Password area protetta — cambiabile senza toccare codice
RESEND_API_KEY=         # Email transazionali
HOTEL_EMAIL=            # info@almahotel.it
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DEEPL_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_VIMEO_ID=382157995
```

---

## 11. Roadmap di Sviluppo

### Fase 1 — Setup & Core
- [ ] Init repo Next.js 15 + TypeScript + Tailwind 4 + next-intl
- [ ] Design token CSS, font self-hosting
- [ ] Componenti base: Navbar, Footer, Layout, FadeIn
- [ ] Home page completa
- [ ] Deploy Vercel preview + push GitHub

### Fase 2 — Pagine & Funzionalità
- [ ] Pagine camere (x3) con schema HotelRoom
- [ ] PasswordGate + area protetta
- [ ] Form Transfer + API route + Resend + Supabase
- [ ] Form Web Check-In + PDF + API route + Resend + Supabase
- [ ] Form Contatti
- [ ] i18n IT/EN/FR/ES + DeepL API

### Fase 3 — SEO & Performance
- [ ] Schema.org JSON-LD tutte le pagine
- [ ] next-sitemap + robots.txt
- [ ] Ottimizzazione immagini e font
- [ ] Lighthouse ≥ 90 su tutte le metriche
- [ ] Google Search Console setup

### Fase 4 — Launch
- [ ] UAT con cliente
- [ ] Migration DNS da WordPress a Vercel
- [ ] Redirect 301 da tutte le URL WordPress
- [ ] Monitoraggio GA4 + Vercel Analytics

---

## Changelog

| Data | Autore | Note |
|---|---|---|
| 2026-05-13 | Claude / Alvenco | Creazione file. Analisi sito live, verifica design system, architettura completa, SEO strategy, roadmap. |
| 2026-05-13 | Claude / Alvenco | Aggiornamento sezione 7: riferimenti visivi corretti. Forestis (primario) + Badrutt's Palace (secondario). Cheval Blanc scartato per eccesso di video e animazioni confusive. Rimossi riferimenti obsoleti a Il Falconiere, Hotel Particulier, Ultima Collection, R Collections. |
