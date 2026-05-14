# AlmaHotel – Cursor Prompt: Image Replacements #1 + #2 + Git Push
> Data: 2026-05-14
> Scope: solo sostituzioni immagini — non toccare testi, traduzioni, overlay, animazioni, struttura

---

## PRE-REQUISITO

Sposta i file dalle seguenti path alla cartella `public/images/`:
- `img/breakfast-room.jpg` → `public/images/breakfast-room.jpg`
- `img/hotel-reception.jpg` → `public/images/hotel-reception.jpg`
- `img/hotel-owners.jpg` → `public/images/hotel-owners.jpg`

Se la cartella `public/images/` non esiste, creala.
Dopo aver copiato i file in `public/images/`, elimina la cartella `img/` dalla root.

> NOTA: i file in `public/images/` sono già stati caricati manualmente. Verifica che esistano prima di procedere.

---

## MODIFICA 1 — HighlightBanner (sezione Colazione)

**File**: `src/components/home/HighlightBanner.tsx`

Individua l'`<Image>` o il CSS background-image che usa l'URL della sala colazione (attualmente punta a `saporiperduti.it/wp-content/uploads/2021/11/Sala-Colazione.jpg` o simile).

Sostituisci **solo** il `src` con:
```
/images/breakfast-room.jpg
```

NON toccare: overlay, testi, animazioni, struttura JSX, classi CSS. Solo il `src` dell'immagine.

---

## MODIFICA 2 — Chi Siamo (sezione Storia)

**File**: `src/app/[locale]/chi-siamo/page.tsx`

Individua il primo blocco `<FadeIn direction="left">` nella sezione Storia (quello che contiene l'immagine `matrimoniale-7-1.jpg` da saporiperduti.it).

Sostituisci l'intero contenuto di quel `<FadeIn direction="left">` con questo nuovo layout a due immagini sovrapposte in stile "cartolina":

```tsx
<FadeIn direction="left">
  {/* Contenitore relativo — altezza fissa per contenere l'effetto stacking */}
  <div className="relative w-full" style={{ height: '480px' }}>

    {/* Immagine SOTTO — titolari — ruotata +4deg, leggermente spostata */}
    <div
      className="absolute inset-0 overflow-hidden shadow-xl"
      style={{
        transform: 'rotate(4deg) translate(16px, 12px)',
        transformOrigin: 'bottom left',
        borderRadius: '2px',
        zIndex: 1,
      }}
    >
      <Image
        src="/images/hotel-owners.jpg"
        alt={t('teamImageAlt')}
        fill
        className="object-cover object-top"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>

    {/* Immagine SOPRA — reception — dritta, leggermente più piccola per mostrare quella sotto */}
    <div
      className="absolute overflow-hidden shadow-2xl"
      style={{
        inset: '0 24px 16px 0',
        borderRadius: '2px',
        zIndex: 2,
      }}
    >
      <Image
        src="/images/hotel-reception.jpg"
        alt={t('historyImageAlt')}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>

  </div>
</FadeIn>
```

**Note implementative**:
- Il contenitore ha `position: relative` e altezza fissa `480px` — non modificare
- `zIndex: 1` per l'immagine dei titolari (sotto), `zIndex: 2` per la reception (sopra)
- `transform: rotate(4deg)` dà l'effetto cartolina alla foto dei titolari
- `object-top` sulla foto titolari per mostrare i visi — `object-center` sulla reception
- NON toccare il testo a sinistra (`FadeIn direction="right"`)
- NON toccare le altre sezioni della pagina

---

## MODIFICA 2b — Aggiungere `historyImageAlt` e `teamImageAlt` se mancanti

Se nei file `src/messages/*.json` le chiavi `about.historyImageAlt` e `about.teamImageAlt` non esistono, aggiungile con questi valori:

```json
// it.json
"historyImageAlt": "Reception dell'Alma Hotel Palermo",
"teamImageAlt": "I titolari dell'Alma Hotel"

// en.json
"historyImageAlt": "Alma Hotel Palermo reception",
"teamImageAlt": "Alma Hotel owners"

// fr.json
"historyImageAlt": "Réception de l'Alma Hotel Palermo",
"teamImageAlt": "Les propriétaires de l'Alma Hotel"

// es.json
"historyImageAlt": "Recepción del Alma Hotel Palermo",
"teamImageAlt": "Los propietarios del Alma Hotel"
```

Se le chiavi esistono già, non toccarle.

---

## VERIFICA FINALE

Prima del commit, esegui:
```bash
npm run build
```

Se il build passa senza errori TypeScript, procedi con il commit e push.
Se ci sono errori, risolvili prima di procedere.

---

## GIT COMMIT E PUSH

Dopo che il build è andato a buon fine:

```bash
git add .
git commit -m "feat: replace images + update historyText with owners names (Antonella & Paolo) in all 4 locales"
git push origin main
```

---

## ERRORI DA EVITARE

- **ERR-004**: `lucide-react` non ha icone brand — non importarle
- **ERR-017**: MAI `'use client'` e `generateMetadata` nello stesso file
- **ERR-018**: In `eslint.config.mjs` usare `eslint-config-next/core-web-vitals.js` con `.js`
- Non modificare testi, traduzioni, overlay, animazioni — SOLO i `src` delle immagini e il layout della colonna destra in chi-siamo
