# CyberWnuczek

Statyczna strona [www.cyber-wnuczek.pl](https://www.cyber-wnuczek.pl): poradniki o bezpieczeństwie w internecie, pisane prostym językiem.

Kanoniczny adres to `https://www.cyber-wnuczek.pl`. Apex `cyber-wnuczek.pl` ma przekierowanie 301 na www (DNS zostaje w Aftermarket, bez transferu do Cloudflare). `cyberwnuczek.pl` bez myślnika to inna, niekupiona domena.

## Workflow

`Cursor → GitHub → Cloudflare Pages → www.cyber-wnuczek.pl`

1. Nowy artykuł: plik Markdown w `src/content/articles/`.
2. `git push` na `main`.
3. Cloudflare Pages buduje `npm run build` i publikuje katalog `dist`.

## Lokalnie

Potrzebujesz Node 22+.

```bash
npm install
npm run dev
```

Build produkcyjny: `npm run build`.

## Cloudflare Pages

- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node: plik `NODE_VERSION` (22)

Zmienne opcjonalne (Settings → Environment variables):

- `PUBLIC_GSC_VERIFICATION` — token z Google Search Console (weryfikacja właściciela, nie analityka użytkowników)

Po pierwszym deploju: GSC → weryfikacja domeny lub meta tag + sitemap `https://www.cyber-wnuczek.pl/sitemap-index.xml`.

## Nowy artykuł

W frontmatter:

```yaml
title: Tytuł
description: 1–2 zdania do snippetu (do 170 znaków)
pubDate: 2026-09-18
updatedDate: 2026-09-18   # opcjonalnie
topic: oszustwa-internetowe  # hasla-i-konta | bankowosc-online | smartfon
faq:                         # tylko gdy FAQ naprawdę jest w treści
  - question: ...
    answer: ...
```

Slug bierze się z nazwy pliku. Schema Article, BreadcrumbList i FAQPage liczą się same.
