# AlmaHotel – Cursor Prompt: Sostituzione immagini camere
> Data: 2026-05-14
> Scope: sostituire tutte le immagini URL esterne nelle 3 pagine camere + nelle relatedRooms con i file locali ottimizzati in public/images/Camere/

---

## CONTESTO

Le immagini ottimizzate sono già presenti in `public/images/Camere/`:
```
public/images/Camere/Matrimoniale/  → matrimoniale-01.jpg … matrimoniale-09.jpg
public/images/Camere/Superior/      → superior-01.jpg … superior-07.jpg
public/images/Camere/Suite/         → suite-01.jpg … suite-07.jpg, suite-bagno-01/02/03.jpg
```

In Next.js i file in `public/` si referenziano con path assoluto senza `public/`:
- `/images/Camere/Matrimoniale/matrimoniale-01.jpg` ✅
- `public/images/Camere/...` ❌

---

## MODIFICA 1 — `src/app/[locale]/camere/matrimoniale/page.tsx`

Sostituisci i valori delle prop passate a `<RoomDetail>` come segue.

**`heroImage`**:
```
/images/Camere/Matrimoniale/matrimoniale-01.jpg
```

**`galleryImages`**:
```tsx
galleryImages={[
  '/images/Camere/Matrimoniale/matrimoniale-04.jpg',
  '/images/Camere/Matrimoniale/matrimoniale-09.jpg',
]}
```

**`relatedRooms`** — aggiorna i campi `image`:
```tsx
// Superior related
image: '/images/Camere/Superior/superior-01.jpg'

// Suite related
image: '/images/Camere/Suite/suite-01.jpg'
```

---

## MODIFICA 2 — `src/app/[locale]/camere/matrimoniale-superior/page.tsx`

**`heroImage`**:
```
/images/Camere/Superior/superior-01.jpg
```

**`galleryImages`**:
```tsx
galleryImages={[
  '/images/Camere/Superior/superior-04.jpg',
  '/images/Camere/Superior/superior-06.jpg',
]}
```

**`relatedRooms`** — aggiorna i campi `image`:
```tsx
// Matrimoniale related
image: '/images/Camere/Matrimoniale/matrimoniale-01.jpg'

// Suite related
image: '/images/Camere/Suite/suite-01.jpg'
```

---

## MODIFICA 3 — `src/app/[locale]/camere/suite/page.tsx`

**`heroImage`**:
```
/images/Camere/Suite/suite-02.jpg
```

**`galleryImages`**:
```tsx
galleryImages={[
  '/images/Camere/Suite/suite-05.jpg',
  '/images/Camere/Suite/suite-bagno-01.jpg',
]}
```

**`relatedRooms`** — aggiorna i campi `image`:
```tsx
// Matrimoniale related
image: '/images/Camere/Matrimoniale/matrimoniale-01.jpg'

// Superior related
image: '/images/Camere/Superior/superior-01.jpg'
```

---

## MODIFICA 4 — Homepage `src/app/[locale]/page.tsx`

Cerca le RoomCard nella homepage (sezione camere) e aggiorna le immagini:
```tsx
// Matrimoniale card
image: '/images/Camere/Matrimoniale/matrimoniale-01.jpg'

// Superior card
image: '/images/Camere/Superior/superior-01.jpg'

// Suite card
image: '/images/Camere/Suite/suite-02.jpg'
```

---

## VERIFICA FINALE

```bash
npm run build
```
Zero errori TypeScript. Se il build passa:

```bash
git add .
git commit -m "feat: replace all room images with local optimized files"
git push origin main
```

---

## ERRORI DA EVITARE

- **ERR-016**: non inventare versioni pacchetti, non toccare package.json
- **ERR-017**: non aggiungere 'use client' nelle pagine che hanno generateMetadata
- I path delle immagini devono iniziare con `/images/...` NON con `public/images/...`
- NON toccare testi, traduzioni, struttura JSX, amenities, CIN/CIR — solo i `src` delle immagini
