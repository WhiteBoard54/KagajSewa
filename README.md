# KagajSewa — कागज सेवा

Nepali-first bilingual static site for a company document preparation service.
126 pages generated from one service catalog. No framework, no client-side routing,
no build tooling beyond Node. Every page is plain HTML that renders without JavaScript.

---

## ⚠️ Do this first

Open **`src/data/site.js`** and replace the placeholders:

```js
siteUrl: 'https://kagajsewa.com',   // your real domain, no trailing slash
contact: {
  phoneDisplay:   '+977 98XX-XXXXXX',    // shown to Nepali visitors
  phoneDisplayEn: '+977 98XX-XXXXXX',    // shown to English visitors
  phoneDial:      '+97798XXXXXXXX',      // tel: link — country code + digits, no spaces
  whatsapp:       '97798XXXXXXXX',       // wa.me number, digits only, no +
  viber:          '+97798XXXXXXXX',
  email:          '368shahpiyush@gmail.com'
}
```

Then run `npm run build`. The build warns you if the phone number is still a placeholder.

`siteUrl` matters for SEO — it is what goes into every canonical tag, hreflang
alternate, Open Graph URL and sitemap entry. Set it before you publish.

---

## Commands

```bash
npm run build        # DEPLOY build — clean URLs (/services/). Push this to GitHub.
npm run build:local  # LOCAL build  — links end in index.html so you can browse offline
npm run serve        # preview at http://localhost:4173
npm run dev          # build + serve
```

There are no dependencies. Node 18 or newer.

### Looking at the site on your own machine

All internal links are **relative**, so the stylesheet loads no matter how the site is
opened — from a domain root, from a project subpath, or straight off your disk.

- **To click around offline**, run `npm run build:local` and double-click `index.html`.
  Every link then points at an explicit `index.html`, which is what `file://` needs.
- **To preview exactly as it will be served**, run `npm run serve` and open
  <http://localhost:4173>.
- **Before pushing to GitHub, run `npm run build`.** The local build works on a web
  server too, but it produces `/services/index.html` style URLs instead of the clean
  `/services/` ones the canonical tags point at.

The build prints which mode it ran in, so you can always tell.

---

## How it is organised

```
src/
  data/
    site.js         ← contact details, domain, payment methods
    categories.js   ← the 11 service categories
    services.js     ← THE SERVICE CATALOG — single source of truth
    guides.js       ← 14 government process guides
    ui.js           ← all UI strings, homepage copy, FAQ, legal pages
  assets/
    styles.css      ← the whole design system
    app.js          ← mobile menu + service search (3 KB)
  build.js          ← the generator

(everything else in the repo root is generated — do not edit it by hand)
```

**Edit `src/`, run the build, commit everything.** Files in the root are overwritten
on every build.

---

## URL structure

Nepali is the default language and lives at the root. English lives under `/en/`.

```
/                                                        Nepali home
/en/                                                     English home
/services/                                               all services
/services/single-shareholder/                            filtered by shareholder type
/services/multiple-shareholder/
/services/company-registration/                          category
/services/company-registration/single-shareholder/       service
/services/company-registration/multiple-shareholder/
/services/annual-company-update/single-shareholder/
/services/share-transfer/
/guides/                                                 guide index
/guides/company-registration-nepal/                      guide
/faq/  /contact/  /about/  /how-it-works/  /why-kagajsewa/
/terms/  /privacy/  /refund-policy/
/404.html
/sitemap.xml  /robots.txt
```

Every page carries a unique `<title>`, meta description, canonical URL and one `<h1>`,
plus `hreflang` alternates for `ne`, `en` and `x-default` (which points at Nepali).

---

## The service catalog

`src/data/services.js` is the only place a service is defined. Add an entry there and
it appears automatically in: the homepage, the services index, its category page, the
shareholder-filtered listings, the search index, the sitemap, the footer where linked,
and as its own page with `Service` structured data.

Each service has:

| Field | What it does |
|---|---|
| `id` | unique key, used by `related` |
| `slug` | the URL path |
| `category` | must match a `categories.js` id |
| `shareholder` | `'single'`, `'multiple'` or `null` |
| `popular` | `1`–`n` puts it on the homepage in that order; `null` hides it |
| `order` | sort order within its category |
| `price` | starting price in NPR — **KagajSewa's fee only** |
| `time` | preparation time, both languages |
| `np` / `en` | name, short description, who it is for, included documents, what you provide, what you receive, notes, meta title, meta description |
| `faq` | per-service questions — these emit `FAQPage` schema |
| `related` / `guides` | internal linking |
| `active: false` | hides it everywhere without deleting it |

### Changing a price

One number, one place: the `price` field. It updates the card, the detail page, the
sidebar and the structured data together.

### Adding a service

Copy an existing entry, change the fields, run the build. If it should show on the
homepage, give it a `popular` number.

---

## Single vs multiple shareholder

This is the most important thing the site does, so it is worth stating how it is handled.

**Split into separate pages** — where the actual documents differ:
company registration · annual update · initial 3-month update · name change ·
address change · capital increase · CAMIS password recovery

Each has its own page, price, document list and metadata, plus a warning box linking
to its sibling so someone on the wrong one can correct themselves in a click.

**Stated inline, not split** — where the shareholder count does not change the documents:
share transfer · tax clearance · records and auditor change · bank documents ·
trademark · labour · ward office · business agreements

Splitting these would create near-identical pages, which reads as keyword doorways to
Google and confuses visitors. PAN registration states both prices on one page for the
same reason.

---

## Pricing honesty

The site never implies government fees are included. Three things are said everywhere
prices appear:

1. Prices are **starting** prices (`सुरुवाती मूल्य` / `Starting price`)
2. The final price varies by company structure and shareholder count
3. Government fees, fines and taxes are **separate** and paid by the customer directly

If you change this policy, change it in `src/data/ui.js` under `pricing` — it appears
on every service page sidebar, the homepage, `/how-it-works/` and `/contact/`.

---

## Government process guides

Fourteen guides under `/guides/`. Every one carries:

- an **`updated`** date, shown on the page as `अन्तिम अद्यावधिक`
- links to the **official source** (OCR, CAMIS, IRD, Department of Industry)
- a standing note saying procedures change and to confirm before acting

**When a procedure changes, edit the guide and bump its `updated` date.** Presenting an
outdated OCR process as current fact is the fastest way to lose the credibility this
whole site is built on.

---

## Structured data

Emitted only where the visible page carries the same content:

- `Organization` and `WebSite` — homepage and category pages
- `BreadcrumbList` — every page with breadcrumbs
- `Service` with an `Offer` — every service page, marked `valueAddedTaxIncluded: false`
  with a description saying government fees are excluded
- `FAQPage` — only where the questions are visible on that page
- `Article` — every guide, with `dateModified`

---

## Publishing to GitHub Pages

1. Push the whole repo to `main`.
2. Settings → Pages → Source: `Deploy from a branch`, Branch `main`, folder `/ (root)`.
3. Live within a minute or two.

### Custom domain

1. Add a `CNAME` file in the root containing just your domain.
2. DNS: `A` records for the apex to `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`; `CNAME` for `www` → `<username>.github.io`.
3. Settings → Pages → enter the domain, tick **Enforce HTTPS**.
4. Set `siteUrl` in `src/data/site.js` to match, then rebuild and push.

### Project subpath

If the site lives at `username.github.io/kagajsewa/` rather than a domain root, set
`basePath: '/kagajsewa'` in `src/data/site.js` and rebuild. Every internal link,
canonical and sitemap entry adjusts.

---

## Performance

- 2 font families (Noto Sans Devanagari, Public Sans), 4 weights each, `display=swap`,
  with `preconnect`
- 33 KB CSS, 3 KB JS, ~22 KB average page — no framework, no runtime dependency
- Devanagari renders in Noto Sans Devanagari with its own line-height and optical size,
  so the Nepali version does not read as an English site with Nepali pasted in
- Search runs against an index inlined only on the pages that have a search box

---

## Deliberate decisions worth knowing about

**Prices use Latin numerals** (`NPR 400`, not `NPR ४००`). Nepali commerce writes amounts
this way — eSewa, Khalti, bank statements and invoices all do. Devanagari numerals are
used where they genuinely belong, in legal references like `दफा ५१` and `३ महिने`.

**No "accepted the first time" claim.** The old site promised an outcome controlled by a
government officer. The refund promise replaced it because that one is actually within
KagajSewa's control.

**No online payment.** eSewa and Khalti merchant credentials need a registered Nepali
company, PAN and a bank account. Until that exists, contact-to-buy is the honest flow
and the site says so plainly.

**The site never claims to submit filings for you.** That is stated on `/how-it-works/`,
in the FAQ, on `/terms/` and in the footer disclaimer of every page.

---

## Before you go live

- [ ] Replace the phone number and confirm the email in `src/data/site.js`
- [ ] Set `siteUrl` to your real domain
- [ ] Have a **native Nepali speaker** read the copy — it is idiomatic, but legal
      terminology (दफा ५१, अद्यावधिक, प्रबन्धपत्र, नामसारी) deserves a second pair of eyes
- [ ] Set the prices to what you will actually charge
- [ ] Have a **Nepali advocate** review `/terms/`, `/privacy/`, `/refund-policy/` and the
      footer disclaimer before you take money
- [ ] Decide whether you can honour the refund promise on `/why-kagajsewa/` — keep it or
      remove it, but do not leave it up if you cannot
- [ ] Verify the guides against the current OCR/IRD process and update the dates
- [ ] Submit `sitemap.xml` in Google Search Console
