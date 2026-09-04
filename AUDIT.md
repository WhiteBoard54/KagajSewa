# KagajSewa — Audit of the v1 site

Audited: 4 September 2026. Subject: the single-file `index.html` marketing page.

---

## 1. What was already good and is being kept

These are real assets. None of them were thrown away.

| Kept | Why |
|---|---|
| **Brand voice — human, practical, plain-spoken** | "फारम होइन, मान्छे" and "खाता चाहिँदैन, फारम चाहिँदैन" are the strongest differentiators on the page. Both competitors sound like software; this sounds like a person. Kept and made more prominent. |
| **The four trust points** | Bikram Sambat done properly, editable Word file, enter details once, a person not a form. All four survive into the new trust section. |
| **The honest FAQ answers** | "We do not submit filings for you" and "we are not lawyers" build more trust than they cost in conversions. Expanded, not softened. |
| **The legal disclaimer** | Correctly scoped and legally important. Rewritten to the user's stricter wording and given its own page. |
| **Petrol-teal + brass palette** | Distinct from HamroDocument's corporate blue and from generic SaaS. Kept as the brand, refined rather than replaced. |
| **Per-service pre-filled email CTA** | Low-friction conversion that suits contact-to-buy. Kept and extended with service context. |
| **Bikram Sambat / Devanagari / Nepali-numeral emphasis** | Genuine domain expertise that competitors do not advertise. Promoted. |

---

## 2. What hurt SEO

| Problem | Consequence | Fix |
|---|---|---|
| **One page, one URL** | A single page can rank for roughly one query cluster. "एकल शेयरधनी कम्पनी दर्ता" and "कर चुक्ता प्रमाणपत्र" were competing for the same URL and neither could win. | 60 pages per language, each with one focused intent. |
| **English-first with JS-toggled Nepali** | Google indexed only the English DOM. Every Nepali search term on the site was invisible to crawlers, in a market that searches in Nepali. | Nepali at the root (`/`), English at `/en/`, each server-rendered as static HTML with `hreflang` alternates. |
| **One `<title>` and one meta description for the whole site** | No page-level relevance signal for any service. | Unique title, meta description, canonical and H1 per page. |
| **No headings hierarchy tied to search intent** | H1 was a marketing slogan ("Company paperwork that gets accepted the first time") carrying zero query intent. | H1s now carry the service name in Nepali with the English equivalent, e.g. `एकल शेयरधनी कम्पनी दर्ता (Single Shareholder Company Registration)`. |
| **No sitemap, robots.txt, canonical or structured data** | Nothing to help discovery or rich results. | `sitemap.xml`, `robots.txt`, canonicals, and Organization / WebSite / BreadcrumbList / Service / FAQPage / Article schema. |
| **No informational content** | Zero surface for top-of-funnel search ("कम्पनी दर्ता कसरी गर्ने?"), which is where this category's traffic actually lives. | 13 process guides, internally linked to the services they lead into. |
| **No internal linking** | Anchor links only. No crawl paths, no topical clustering. | Category → service → guide → related service network. |

---

## 3. What hurt UX

- **Twelve service cards in one flat grid.** No categories, no hierarchy, no way to tell that "Annual Update" is the thing most visitors want and "CAMIS Password Recovery" is an edge case. A visitor had to read all twelve.
- **Single vs multiple shareholder was invisible.** The single most consequential distinction in this entire product was buried in one bullet inside the registration card. A visitor with a two-shareholder company could not tell whether the NPR 400 annual-update price applied to them.
- **No search.** With a catalogue this size, "मलाई के चाहिन्छ?" had no answer except scrolling.
- **English-first for a Nepali audience.** The toggle existed but defaulted wrong.
- **No service detail pages.** A card with four bullets cannot answer "what do I need to give you", "how long", "what do I get", "what if the office asks for changes".
- **Mobile CTA required scrolling to the bottom.** No persistent way to contact.

## 4. What hurt conversion

- **Price ambiguity.** "From NPR 400" did not say what varies, and did not distinguish KagajSewa's preparation fee from government fees. A visitor could reasonably have assumed NPR 400 covered their OCR filing fee — which would have produced an angry phone call, not a sale.
- **One generic "Request" button on every card.** Same label for a NPR 150 minute and a NPR 1,500 registration set.
- **An overpromise in the H1.** "Accepted the first time" / "पहिलो पटकमै स्वीकृत" claims an outcome controlled by a government officer, not by KagajSewa. Removed — replaced with "सही ढाँचामा तयार, पेस गर्न सजिलो" and a refund commitment that is actually within KagajSewa's control.
- **No proof of process.** Nothing told a hesitant visitor what happens between "I call" and "I have a document".

## 5. Duplicate-content risks found

- **CAMIS password recovery** appeared under both a general OCR grouping and its own card in the source research. One canonical page now, linked from two categories.
- **Share Lagat / Director Registry / Auditor Change** were bundled into one card but are three distinct searches. Split into one page with three clearly labelled sections rather than three thin near-identical pages — deliberately avoiding the keyword-doorway pattern.
- **Share transfer variants** (1-to-1, 1-to-many, many-to-1, many-to-many, after death) are genuinely one service with five configurations, not five services. One page with a variant table, plus one guide. Splitting these into five pages would have produced five nearly identical documents.

## 6. Services that were missing

Trademark, labour audit, ward office documents (rent agreement, four-boundary certification, mortgage draft, residence recommendation), employment agreements and NDAs were mentioned in a footnote but had no cards, no prices and no pages. All now have catalogue entries and pages.

## 7. Services that needed shareholder separation

Where document requirements genuinely differ, these are now separate pages with separate prices, separate included-document lists and separate metadata:

Company registration · Annual company update · Initial (3-month) update · Company name change · Company address change · Capital increase · OCR/CAMIS password recovery · PAN registration minute

Where shareholder count does **not** change the documents, it is stated inline rather than split — avoiding thin duplicate pages. This applies to: share transfer, tax clearance, records and auditor change, bank account documents, trademark, labour audit, ward office, business and startup documents.

---

## 8. What moved off the homepage

The homepage was carrying the entire catalogue. It now carries: hero, service search, six popular services, two featured categories (registration and annual update, each split single/multiple), the category grid, why-us, how-it-works, three guides, a short FAQ, and the contact block. Everything else lives on `/services/`, category pages and detail pages.

## 9. Technical work done

Semantic HTML with one H1 per page and correct heading order · descriptive `alt` on every image · crawlable `<a href>` navigation, no JS-only links · `sitemap.xml` and `robots.txt` · canonical and `hreflang` on every page · Open Graph and Twitter metadata per page · JSON-LD Organization, WebSite, BreadcrumbList, Service, FAQPage and Article · a real 404 page · fonts limited to three families with `preconnect` and `display=swap` · one stylesheet, one small script, no framework, no build-time JS shipped to the client beyond ~4 KB for search and menu · every page is static HTML that renders without JavaScript.

---

## 10. Deliberate non-changes

- **No online payment.** Merchant credentials need a registered Nepali company, PAN and a bank account. The contact-to-buy flow stays until that exists.
- **No claim of government affiliation, and no "best in Nepal" language.** Both were absent and stay absent.
- **No FAQ schema on pages where the answer is not visible.** Schema is only emitted where the visible page carries the same text.
- **Guides carry an "अन्तिम अद्यावधिक" date and a link to the official source.** OCR and IRD procedures change; presenting them as timeless facts would be the single most damaging thing this site could do to its own credibility.
