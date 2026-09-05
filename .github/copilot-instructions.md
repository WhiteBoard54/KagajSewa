# KagajSewa — project instructions for Copilot

A Nepali-first bilingual static site for a company document preparation service.
126 pages are **generated** from a small set of source files. Read this before
changing anything.

---

## The golden rule

**Only edit files under `src/`.**

Everything else in the repo root — `index.html`, `services/`, `guides/`, `en/`,
`assets/`, `about/`, `contact/`, `faq/`, `sitemap.xml`, `robots.txt`, `CNAME`,
`.nojekyll` — is **generated output**. It is overwritten on every build.

Editing a generated file appears to work and is silently erased on the next build.
Never do it. If a change seems to require editing a generated file, the real change
belongs in `src/build.js` or `src/data/`.

## Always rebuild

After any change to `src/`, run:

```
npm run build
```

Then commit **both** the `src/` change and the regenerated files together.
The site deploys the committed HTML from the branch — `src/` changes alone do nothing.

The build prints `MODE: deploy` or `MODE: local`. **Only ever commit a `deploy` build.**
`npm run build:local` is for offline browsing and produces `/services/index.html`
URLs that do not match the canonical tags.

---

## Where things live

| File | Contains |
|---|---|
| `src/data/services.js` | **The canonical service catalog.** One entry per service. |
| `src/data/categories.js` | The 11 service categories |
| `src/data/guides.js` | 14 government process guides |
| `src/data/ui.js` | All UI strings, homepage copy, FAQ, legal pages |
| `src/data/site.js` | Domain, contact details, payment methods |
| `src/build.js` | The generator — page templates, routing, structured data |
| `src/assets/styles.css` | The whole design system |
| `src/assets/app.js` | Mobile menu + service search (~3 KB) |

Adding a service entry to `services.js` makes it appear automatically on the
homepage, its category page, the shareholder listings, the search index, the
sitemap, and its own page with `Service` structured data. Do not add it in
several places.

---

## Rules that are easy to break

### Single vs multiple shareholder

Services are split into separate pages **only where the actual documents differ**:
company registration, annual update, initial 3-month update, name change,
address change, capital increase, CAMIS password recovery.

Where shareholder count does **not** change the documents, it is stated inline on
one page: share transfer, tax clearance, records/auditor, bank, trademark, labour,
ward office, business agreements.

Do not split a service that does not need splitting. Near-identical pages read as
keyword doorways to search engines and confuse visitors.

### Pricing honesty

- Prices are **starting** prices. Never present one as final.
- **Government fees are never included.** Every service page, the homepage and
  `/contact/` say so. Do not remove or soften this.
- Prices use **Latin numerals** (`NPR 400`), including on the Nepali site — that
  is how Nepali commerce writes amounts. Devanagari numerals are used only for
  legal references like `दफा ५१`.

### Language

Nepali is the default and lives at `/`. English lives at `/en/`. Every string in
`ui.js`, `services.js`, `categories.js` and `guides.js` has both an `np` and an
`en` version. **Never add one without the other** — a missing translation renders
as an empty element.

Service names show Nepali first with English in brackets on the Nepali site, and
the reverse on the English site. The data supports this via `nameEn` / `nameNp`.

### Government process claims

Guides carry an `updated` date and links to official sources (OCR, CAMIS, IRD).
**Do not invent or update procedural facts.** If a procedure changed, the human
confirms it against the official source first, then the guide and its `updated`
date are changed together.

Never claim an outcome the government controls. The site says
"सही ढाँचामा तयार, पेस गर्न सजिलो" — not "guaranteed approval". Do not add
approval guarantees, "best in Nepal" claims, or anything implying KagajSewa is a
law firm, submits filings, or is affiliated with a government body.

---

## Style

- Plain HTML/CSS/JS. **No frameworks, no build tooling beyond Node.** Do not add
  dependencies — the project deliberately has zero.
- Mobile-first CSS. One primary colour (petrol `--brand`), one accent (brass
  `--accent`, reserved for prices and the "popular" badge only).
- Devanagari needs its own line-height; it is set on `html[lang="ne"]`.
- Every page must render without JavaScript. `app.js` only adds convenience.
- One `<h1>` per page. Unique `<title>` and meta description per page.

## Before finishing a change

- `npm run build` succeeds and prints `MODE: deploy`
- Page count is still 126 unless a page was deliberately added or removed
- No broken internal links
- Both `np` and `en` strings exist for anything added
