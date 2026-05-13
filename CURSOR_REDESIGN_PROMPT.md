# AlmaHotel – Cursor Redesign Prompt v2
> REDESIGN VISIVO COMPLETO — Homepage + Pagine Camere
> Obiettivo: avvicinarsi concretamente a badruttspalace.com (struttura/layout) + forestis.it (tipografia/tono/pagine camere)
> Aggiornato: 2026-05-13

---

## CONTESTO

Il sito è già implementato con Next.js 15 + Tailwind 4 + Framer Motion + next-intl.
Questo prompt riguarda SOLO il redesign visivo — non toccare API routes, Supabase, Resend, i18n, PasswordGate, o la configurazione next.config.ts.

**File da modificare:**
- `src/app/[locale]/page.tsx` — Home page completa
- `src/components/home/HeroVideo.tsx`
- `src/components/home/RoomCard.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- Creare nuovi componenti home: `ExperienceSection.tsx`, `RestaurantSection.tsx`, `HighlightBanner.tsx`
- `src/app/[locale]/camere/matrimoniale/page.tsx`
- `src/app/[locale]/camere/matrimoniale-superior/page.tsx`
- `src/app/[locale]/camere/suite/page.tsx`

---

## 1. RIFERIMENTI VISIVI — IMPLEMENTAZIONE CONCRETA

### Struttura homepage → badruttspalace.com
Replicare ESATTAMENTE questo ordine di sezioni, adattato ad AlmaHotel:

```
1. HERO          — fullscreen video/immagine con overlay, copy centrato, CTA
2. INTRO         — testo elegante su sfondo bianco, centrato, max-width 680px
3. CAMERE        — 3 card in griglia asimmetrica (come Badrutt's "Rooms & Suites")
4. RISTORANTE    — sezione split: immagine sx grande + testo dx (come Badrutt's "Restaurants")
5. ESPERIENZE    — sezione alternata: testo sx + immagine dx (come Badrutt's "Experiences")
6. AWARDS        — carousel loghi su sfondo warm
7. BOOKING CTA   — banner scuro full-width con headline e bottone
8. MAPPA         — Google Maps + info contatti
9. FOOTER
```

### Tipografia → forestis.it
- Titoli H1/H2: `Cormorant Garamond` italic, peso 300-400, molto spazio tra le lettere (`tracking-wide`)
- Label sezioni: `Montserrat` uppercase `tracking-[0.2em]` text-[11px], colore `#9A9A9A`
- Body: `Open Sans` 16px line-height 1.8, colore `#6B6B6B`
- Il tono visivo di Forestis: **molta aria, testo che respira, nessun elemento superfluo**

### Palette aggiornata
```css
--color-red:     #E60023   /* solo CTA principali */
--color-charcoal:#242424   /* navbar, footer, overlay scuri */
--color-warm:    #F5F0E8   /* sfondo sezioni alternate — più caldo del precedente */
--color-white:   #FFFFFF
--color-text:    #1C1C1C
--color-muted:   #6B6B6B
--color-label:   #9A9A9A
```

---

## 2. HERO — NUOVO DESIGN

**Struttura** (ispirata a Badrutt's Palace hero):
```
- Fullscreen h-screen
- Sfondo: video Vimeo ID 382157995 (autoplay/muted/loop/background=1)
  → fallback: immagine hero da almahotel.it (URL sotto)
- Overlay: gradient lineare da rgba(0,0,0,0.55) a rgba(0,0,0,0.25)
- Contenuto centrato verticalmente:
    [label] PALERMO · BOUTIQUE HOTEL
    [H1 Cormorant Garamond italic 68px desktop / 44px mobile]
    "Il Tuo Rifugio<br/>nel Cuore di Palermo"
    [due CTA orizzontali]
    → "Prenota Ora" (button primary rosso)
    → "Scopri le Camere" (button ghost bianco — border bianco)
- In basso a sinistra: indirizzo "Via Mariano Stabile, 136 — Palermo"
- In basso a destra: scroll indicator (freccia animata down)
```

**Immagine fallback hero** (da almahotel.it):
```
https://www.almahotel.it/wp-content/uploads/2020/06/LOGO-TRASPARENTE-nero-300x194.png
```
Usare invece questa immagine dell'hotel dal sito:
```
https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg
```

---

## 3. NAVBAR — REVISIONE

Ispirata a Badrutt's Palace navbar:
- Logo a sinistra (già implementato con AlmaLogo — non toccare)
- Voci nav centrate (non a destra) con font `Montserrat` uppercase `text-[11px] tracking-[0.18em]`
- CTA "Prenota" a destra in `#E60023`
- Separatore sottile `border-b border-white/20` visibile solo quando navbar è trasparente
- Su scroll: `bg-white` puro (non `bg-white/95`) + `border-b border-[#E8E3DE]`
- Altezza: `h-[80px]`

---

## 4. SEZIONE INTRO (NUOVA — dopo hero)

Ispirata all'intro testuale di Forestis:
```tsx
// Sfondo bianco, padding 120px verticale
// Testo centrato, max-width 680px, mx-auto
// [label] DA 1896 · PALERMO CENTRO
// [H2 Cormorant italic 44px] "Benvenuti all'Alma Hotel"
// [body 17px line-height 1.9 color #6B6B6B]
// "Nel cuore di Palermo, a pochi passi dai monumenti 
//  più belli della città, l'Alma Hotel vi accoglie 
//  in un'atmosfera di eleganza discreta e calore autentico."
// [link ghost] "Scopri la nostra storia →"
// Nessuna immagine in questa sezione — solo testo
```

---

## 5. SEZIONE CAMERE — GRIGLIA ASIMMETRICA

Ispirata alla sezione "Rooms & Suites" di Badrutt's Palace:

**Layout desktop:**
```
[card grande 2/3 width — Matrimoniale]  [card piccola 1/3 — Matrimoniale Superior]
[card piccola 1/3 — Suite]              [testo + CTA "Vedi tutte le camere" 2/3]
```

**Ogni card:**
- Immagine con aspect-ratio specifico, overflow hidden
- Hover: immagine scale 1→1.04 (duration 0.6s ease)
- Overlay gradient bottom: `from-transparent to-black/65`
- Testo in overlay: label tipologia + nome camera + "da €XX/notte"
- Freccia `→` che appare su hover (FadeIn)
- Nessun bordo, nessun box-shadow — solo l'immagine

**Immagini camere reali** (da almahotel.it via saporiperduti.it):
```
Matrimoniale:          https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg
Matrimoniale Superior: https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-2.jpg
Suite:                 https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg
```

**Testo sezione:**
```
[label] LE NOSTRE CAMERE
[H2] "Spazi Pensati<br/>per il Vostro Comfort"
```

---

## 6. SEZIONE RISTORANTE (NUOVA — ispirata a Badrutt's "Restaurants")

Layout split 50/50 desktop — immagine sx, testo dx:
```
[immagine ristorante full-height]  |  [contenuto]
                                   |  [label] IL RISTORANTE
                                   |  [H2 Cormorant italic] "Sapori Perduti"
                                   |  [body] "A pochi passi dall'hotel, il 
                                   |   ristorante Sapori Perduti porta in 
                                   |   tavola il meglio della tradizione 
                                   |   siciliana, reinterpretata con maestria 
                                   |   dallo Chef Piero Oneto."
                                   |  [CTA ghost] "Scopri il Ristorante →"
                                   |  → link: https://www.saporiperduti.it
```

**Immagine ristorante** (da saporiperduti.it):
```
https://www.saporiperduti.it/wp-content/uploads/2021/12/DSC_0013_900x600.jpg
```
Sfondo sezione: `#F5F0E8` (warm)

---

## 7. SEZIONE ESPERIENZE / PALERMO (NUOVA — ispirata a Badrutt's "Experiences")

Layout split 50/50 desktop — testo sx, immagine dx. Sfondo bianco.
```
[contenuto]                        |  [immagine Palermo]
[label] PALERMO DA SCOPRIRE        |
[H2 Cormorant italic]              |
"La Città a Portata di Mano"       |
[body] "L'Alma Hotel si trova nel  |
 cuore pulsante di Palermo,        |
 a pochi minuti a piedi dai        |
 mercati storici, dalla Cattedrale |
 e dal Teatro Massimo."            |
[CTA ghost] "Prenota il Transfer →"|
 → link: /it/protected/prenota-transfer
```

**Immagine Palermo da Unsplash** (libera, nessun copyright):
```
https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80
```
(Panorama Palermo — foto di Andrea Leopardi)

---

## 8. SEZIONE COLAZIONE (NUOVA — ispirata a Badrutt's "Bars & Clubs")

Layout: immagine full-width con overlay scuro + testo centrato in bianco.
Altezza: `h-[500px]`
```
Overlay: rgba(0,0,0,0.5)
[label bianco] OGNI MATTINA
[H2 Cormorant italic bianco 48px] "La Colazione Inclusa"
[body bianco/70] "Inizia la giornata con una colazione 
 abbondante, preparata con prodotti freschi e locali."
[CTA] "Sfoglia il Menu →" → /it/protected/menu-colazione
```

**Immagine colazione** (da saporiperduti.it/almahotel):
```
https://www.saporiperduti.it/wp-content/uploads/2021/11/Sala-Colazione.jpg
```

---

## 9. SEZIONE AWARDS — REVISIONE

Sfondo `#F5F0E8`. Padding `py-[80px]`.
- Label centrata: `RICONOSCIMENTI & PREMI`
- H3 Cormorant italic: `"La Qualità Riconosciuta"`
- Carousel CSS auto-scroll (già implementato — mantenere)
- Loghi in grigio `#9A9A9A` — hover: `#242424`

---

## 10. BOOKING BANNER — REVISIONE

Sfondo `#1C1C1C` (più scuro e raffinato del precedente `#242424`).
```
[label rosso] PRENOTA DIRETTAMENTE
[H2 Cormorant italic bianco 48px] "La Miglior Tariffa<br/>è sul Nostro Sito"
[body #9A9A9A] "Prenota direttamente e garantirti il miglior 
 prezzo disponibile, senza commissioni."
[CTA primario rosso] "Prenota Ora"
```

---

## 11. PAGINE CAMERE — LAYOUT FORESTIS

Ispirate a forestis.it/en/luxury-boutique-hotel-dolomites-suite.

**Struttura nuova per ogni pagina camera:**

```
SEZIONE 1 — Hero immagine fullscreen
  - h-screen, immagine cover
  - overlay gradient bottom
  - in basso: nome camera + tipologia badge

SEZIONE 2 — Intro camera (sfondo bianco, centrato)
  - [label] es. "SUITE · ALMA HOTEL"
  - [H1 Cormorant italic 52px] nome camera
  - [body 18px line-height 1.9] descrizione evocativa (3-4 righe)
  - [specs inline] — es. "25 m² · King Size · 2° Piano · Vista Città"

SEZIONE 3 — Gallery a mosaico
  - Griglia asimmetrica: 1 immagine grande sx (2/3) + 2 immagini piccole dx (1/3 ciascuna)
  - Tutte le immagini senza bordo, gap 4px

SEZIONE 4 — Split content (come Forestis)
  - sx: lista dotazioni con icone Lucide (linee sottili)
  - dx: sticky card prenotazione
      → prezzo "da €XX/notte"
      → check-in/check-out date picker
      → CTA "Prenota Ora" → Octorate
      → "o contattaci: +39 091 2514962"

SEZIONE 5 — Altre camere (3 card piccole, grid 3 col)
  - Titolo: "Scopri anche..."
```

**Immagini per ogni camera:**

Camera Matrimoniale:
```
Hero:    https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg
Gallery: https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-3.jpg
         https://www.saporiperduti.it/wp-content/uploads/2021/11/balcone-5-1.jpg
```

Camera Matrimoniale Superior:
```
Hero:    https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-2.jpg
Gallery: https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-7.jpg
         https://www.saporiperduti.it/wp-content/uploads/2021/11/matrimoniale-7-1.jpg
```

Suite:
```
Hero:    https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-1.jpg
Gallery: https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-3.jpg
         https://www.saporiperduti.it/wp-content/uploads/2021/11/suite-7.jpg
```

Colazione (per sezione home e pagina menu):
```
https://www.saporiperduti.it/wp-content/uploads/2021/11/colazione-9-scaled.jpg
https://www.saporiperduti.it/wp-content/uploads/2021/11/colazione-scaled.jpg
https://www.saporiperduti.it/wp-content/uploads/2021/11/Sala-Colazione.jpg
```

---

## 12. FOOTER — REVISIONE STILE BADRUTT'S

Badrutt's Palace usa un footer minimale con due livelli:
- Top: logo centrato + 4 colonne link
- Bottom: copyright + legal links inline

```tsx
// Sfondo #0A0A0A
// Top section:
//   [AlmaLogo variant="light" — centrato — mb-12]
//   [4 colonne: Hotel | Camere | Servizi | Contatti]
//   [social icons — centrati — mt-8]
// Divider: border-t border-white/8
// Bottom section (py-6):
//   [CIN: ... | CIR: ...] a sinistra
//   [© 2026 Alma Hotel · Privacy Policy] a destra
//   font: Montserrat 10px uppercase tracking-widest color #555
```

---

## 13. ANIMAZIONI — REGOLE FINALI

Mantenere le animazioni esistenti FadeIn/FadeInGroup ma aggiungere:

```ts
// Stagger più lento per feel premium
staggerChildren: 0.18  // era 0.12

// Sezioni split: slide da direzione opposta
slideFromLeft:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }
slideFromRight: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }

// Immagini: scale-in
scaleIn: { hidden: { opacity: 0, scale: 1.04 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.0 } } }
```

Nessun altro effetto. NO parallax, NO video nelle sezioni, NO scroll trigger complessi.

---

## 14. ERRORI DA EVITARE (da ERRORI_TECNICI_RISOLTI.md)

- **ERR-001**: `generateMetadata` nelle route `[locale]` deve ricevere `{ params }` e fare `await params`
- **ERR-003**: Se usi `next/image` con URL esterni SVG → aggiungere `dangerouslyAllowSVG: true` in next.config.ts
- **ERR-004**: `lucide-react` NON ha icone brand (Facebook, Instagram) — usare SVG inline
- **ERR-016**: Non inventare versioni pacchetti — non toccare package.json

---

## 15. ORDINE DI IMPLEMENTAZIONE

1. Aggiorna `globals.css` con le nuove CSS variables (palette warm aggiornata)
2. Aggiungi varianti animazione `slideFromLeft`, `slideFromRight`, `scaleIn` in `FadeIn.tsx`
3. Aggiorna `Navbar.tsx` — solo cambio stile, non logica
4. Riscrivi `src/app/[locale]/page.tsx` — nuova struttura completa home
5. Crea `ExperienceSection.tsx`, `RestaurantSection.tsx`, `HighlightBanner.tsx`
6. Aggiorna `RoomCard.tsx` per griglia asimmetrica
7. Riscrivi le 3 pagine camere con layout Forestis
8. Aggiorna `Footer.tsx` stile Badrutt's
9. `npm run build` — zero errori TypeScript

---

## Changelog

| Data | Autore | Note |
|---|---|---|
| 2026-05-13 | Claude / Alvenco | Creazione CURSOR_REDESIGN_PROMPT.md. Redesign visivo completo: struttura Badrutt's Palace, tipografia Forestis, immagini reali da saporiperduti.it + Unsplash, nuove sezioni Ristorante/Esperienze/Colazione, layout camere Forestis-inspired. |
