# Nepali Document Generation — working notes for KagajSewa

How the in-site document generator works, what is true about Nepali legal
paperwork that the code has to respect, and exactly what to do to add a new
document type.

Read this before touching `src/data/doc-templates.js`, `src/assets/docgen.js`
or `src/toolpages.js`.

Last updated: 2026-09-05

---

## 1. What the generator is

A visitor opens a tool page, fills a form, and a print-ready Nepali document is
drawn on the page. They print it (Ctrl/Cmd + P → Save as PDF), sign it, stamp it
and take it to the bank or the office.

Three properties are non-negotiable:

- **Nothing is uploaded.** The form runs in the browser. Company registration
  numbers, shareholder names and phone numbers never leave the visitor's device.
  Answers are kept in `localStorage` only, so a refresh does not lose work.
- **No dependencies.** Plain ES5-compatible JavaScript, no build step, no
  framework, no npm package at runtime. This matches the rest of the site.
- **The document is always in Nepali.** The *interface* is bilingual. The
  *document* is not — banks, ward offices and OCR/CAMIS accept Nepali. An
  English-language visitor still gets a Nepali document; the form just explains
  itself in English.

### Files

| File | What it holds |
|---|---|
| `src/data/doc-templates.js` | The catalogue. One object per document type: fields + `render()`. **This is the only file you edit to add a document.** |
| `src/toolpages.js` | Turns a template into an HTML page at build time (form markup, metadata, schema). |
| `src/assets/docgen.js` | The browser engine: state, validation, BS date pickers, address picker, drawing, print. |
| `src/assets/docgen.css` | Form styling, the A4 `.paper`, and the `@media print` rules. |
| `src/data/nepal-admin.json` | Provinces / districts / local bodies / wards. |

---

## 2. Why print-to-PDF and not a PDF library

Devanagari is a complex script. Rendering `निर्णय` correctly requires
reordering the vowel sign, forming the `र्` reph, joining conjuncts and drawing
a continuous shirorekha across the cluster. That is text shaping, and it needs
HarfBuzz or an equivalent.

Every browser has HarfBuzz. `jsPDF` and `pdfmake` do not — they lay out glyphs
left to right in codepoint order, which produces text that looks *almost* right
and is wrong in exactly the places a bank clerk will notice. Server-side
rendering would fix it but the site is static, and it would mean uploading the
visitor's data.

So: the browser draws the document, `@page { size: A4; margin: 18mm 16mm }`
sets the paper, and `window.print()` makes the PDF. Everything that is not the
document is hidden in the print stylesheet.

Practical consequences to keep in mind:

- Test in Chrome **and** Firefox. Devanagari line-height differs.
- Keep the document font at `Noto Serif Devanagari`, with
  `Noto Sans Devanagari` as fallback. Serif reads as official in Nepal.
- `break-inside: avoid` on every decision paragraph. A निर्णय split across two
  pages gets questioned.
- Never put document text inside a CSS `text-transform` — it breaks conjuncts.

---

## 3. Bikram Sambat dates

Nepal runs on Bikram Sambat. Every legal document is dated in BS. AD appears
only when a foreign party is involved.

**The site deliberately ships no BS↔AD converter and no month-length table.**

That is not laziness. BS month lengths are not algorithmic — they are published
year by year by the Nepal Panchanga Nirnayak Samiti, and Jestha can be 31 or 32
days depending on the year. A converter built from a remembered table will be
wrong for some years, and a wrong date on a board minute is a document the bank
rejects. The cost of being wrong is much higher than the cost of three
dropdowns.

So a `bsdate` field is three `<select>`s: year (2090 → 2070, newest first),
month (बैशाख … चैत), day (1 → 32). The visitor reads the date off their own
patro. `collect()` joins them as `YYYY/MM/DD`, and `H.date()` converts the
digits to Devanagari for the document.

If a converter is ever added, it must be table-driven from published data, cover
the exact year range the dropdowns offer, and be checked against a printed patro
for at least five spot years.

### Month names, in order

बैशाख · जेठ · असार · साउन · भदौ · असोज · कार्तिक · मंसिर · पुष · माघ · फागुन · चैत

### Fiscal years

Written `२०८०/८१` — full BS year, slash, last two digits of the next. The
dropdown offers 2070/71 through 2090/91. Company registration numbers are
almost always quoted as `प्रा.लि.नं. १२३४५/२०८०/८१`.

---

## 4. Numbers

| Need | Helper | Example |
|---|---|---|
| Digits | `H.np(n)` | `9705163163` → `९७०५१६३१६३` |
| Date | `H.date(bs)` | `2083/05/20` → `२०८३/०५/२०` |
| Time | `H.time(t)` | `10:00` → `१०:०० बजे` |
| Money | `H.money(n)` | `5000000` → `५०,००,०००` |

Money uses **lakh/crore grouping**, not thousands: the last three digits, then
pairs. `50,00,000` — never `5,000,000`. Getting this wrong is the single most
common giveaway that a document was generated by someone who does not work in
Nepal.

**There is no `H.words()`.** Amounts in words (`अक्षरेपी पचास लाख रुपैयाँ मात्र`)
appear on capital-increase and share-transfer documents, and the Nepali system
is genuinely irregular — the numbers 1–100 have distinct forms that cannot be
composed. Shipping a half-remembered table would put a wrong amount in words on
a legal document. If it is needed, build it from a verified 0–99 table plus
lakh/crore assembly, and unit-test every value from 1 to 100 plus a dozen large
amounts, before wiring it up.

Everything a visitor types goes through `esc()` before it reaches the page. No
`innerHTML` with raw input, ever.

---

## 5. Administrative divisions

Nepal's 2015 constitution replaced the old zone/district system with a federal
one. Since the 2017 local elections the structure is fixed:

```
7  प्रदेश          provinces
77 जिल्ला          districts
753 स्थानीय तह     local levels
6743 वडा           wards
```

The 753 local levels break down as:

| Type | Nepali | Count |
|---|---|---|
| Metropolitan City | महानगरपालिका | 6 |
| Sub-Metropolitan City | उपमहानगरपालिका | 11 |
| Municipality | नगरपालिका | 276 |
| Rural Municipality | गाउँपालिका | 460 |

Provinces, with their district counts:

| # | Nepali | English | Districts |
|---|---|---|---|
| 1 | कोशी प्रदेश | Koshi | 14 |
| 2 | मधेश प्रदेश | Madhesh | 8 |
| 3 | बागमती प्रदेश | Bagmati | 13 |
| 4 | गण्डकी प्रदेश | Gandaki | 11 |
| 5 | लुम्बिनी प्रदेश | Lumbini | 12 |
| 6 | कर्णाली प्रदेश | Karnali | 10 |
| 7 | सुदूरपश्चिम प्रदेश | Sudurpashchim | 9 |

Province 1 was named **कोशी** in 2023; Province 3 became **बागमती** and Province
5 **लुम्बिनी** in 2020. Older documents and older datasets say "Province No. 1"
etc. Do not reintroduce the numbered names.

Ward counts vary a lot: Kathmandu Metropolitan has 32, Pokhara 33, Lalitpur 29,
Bharatpur 29, Biratnagar 19, and a small गाउँपालिका may have 5. That is why the
ward dropdown is populated per local body from `w`, not hard-coded 1–35.

### The dataset

`src/data/nepal-admin.json` — 97 KB raw, ~17 KB gzipped, fetched lazily the
first time an address field is touched.

```jsonc
{
  "provinces": [ { "i": 1,     "ne": "कोशी प्रदेश", "en": "Koshi Province" } ],
  "districts": [ { "i": 101,   "p": 1,   "ne": "ताप्लेजुङ", "en": "Taplejung" } ],
  "locals":    [ { "i": 10101, "d": 101, "ne": "फक्ताङलुङ गाउँपालिका",
                   "en": "Phaktanlung Rural Municipality", "w": 7 } ]
}
```

`i` is a hierarchical id: province `1` → district `101` → local `10101`. `p` and
`d` are parent ids. `w` is the ward count. Names carry their own suffix
(`… गाउँपालिका`, `… महानगरपालिका`), so never append a type word in code.

Corrections already applied to the upstream data — do not regress them:

- `पोखरा लेखनाथ महानगरपालिका` → `पोखरा महानगरपालिका` (renamed in 2019)
- `धनगढी उप-महानगरपालिका` → `धनगढी उपमहानगरपालिका` (hyphen removed for consistency)
- `'सहिदभूमि गाउँपालिका'` → stray quote characters stripped

Integrity check to re-run after any data change:

```bash
node -e "
const a=require('./src/data/nepal-admin.json');
const P=new Set(a.provinces.map(x=>x.i)), D=new Set(a.districts.map(x=>x.i));
console.log(a.provinces.length===7, a.districts.length===77, a.locals.length===753);
console.log('orphans', a.districts.filter(d=>!P.has(d.p)).length + a.locals.filter(l=>!D.has(l.d)).length);
console.log('wards', a.locals.reduce((s,l)=>s+l.w,0));
console.log('missing ne', a.locals.filter(l=>!l.ne).length);
"
```

Expected: `true true true`, `orphans 0`, `wards 6743`, `missing ne 0`.

### Address composition

The picker cascades province → district → local body → ward and writes one
string into a **normal, editable text input**:

```
मधेश प्रदेश, पर्सा जिल्ला, बिरगञ्ज महानगरपालिका, वडा नं. २
```

Two rules, both deliberate:

1. **The composed string is always Nepali**, even when the interface is in
   English. The dropdown *labels* follow the interface language so an English
   reader can find their district; the *value* is Nepali because it goes into a
   Nepali document.
2. **The field stays editable.** Nepali place-name spelling is not settled —
   the dataset says `बिरगञ्ज`, a bank letterhead may say `वीरगंज`, and a company's
   own registration certificate may say something else again. Whatever is on
   the registration certificate wins. HamroDocument locks this field; that is a
   worse product, not a better one. The picker is a shortcut, not a constraint.

Some companies also have a tole or street on the certificate. Editing the field
covers that.

---

## 5a. Offices of the Company Registrar

There are three, and only three: the head office plus two branches. Verified
against [ocr.gov.np](https://ocr.gov.np/pages/branch-offices-12/) on 2026-09-05.

| Nepali | English |
|---|---|
| कम्पनी रजिष्ट्रारको कार्यालय, त्रिपुरेश्वर, काठमाडौं | Head office, Tripureshwor, Kathmandu |
| कम्पनी रजिष्ट्रारको कार्यालय, ईटहरी | Itahari branch |
| कम्पनी रजिष्ट्रारको कार्यालय, बुटवल | Butwal branch |

They live in `OCR_OFFICES` at the top of `doc-templates.js`. If OCR opens
another branch, that constant is the only place to change.

Use **one** office field per document and let it drive every mention — the
addressee, the "registered at" sentence and the office the shareholder appears
at. The reference documents in circulation hardcode Tripureshwor in the letter
while naming the branch in the minute, which contradicts itself for any company
registered at Itahari or Butwal.

---

## 6. Anatomy of a board minute (माइन्युट)

Nearly every company document a bank or office asks for is a minute of a
meeting that authorised something. The structure is fixed enough to be a
template, which is what makes the whole generator possible.

```
                                                  प्रा.लि.नं. १२३४५/२०८०/८१   ← registration, top right

                        अ बी सी प्रा.लि.                                      ← company name, centred, large
        मधेश प्रदेश, पर्सा जिल्ला, बिरगञ्ज महानगरपालिका, वडा नं. २              ← registered address
                              को                                             ← connector: "of"
                   एकल शेयरधनीको विशेष बैठक                                   ← which meeting this is

यस अ बी सी प्रा.लि. को एकल शेयरधनीको विशेष बैठक श्री … को अध्यक्षतामा बसी
देहायका विषयमा छलफल गरी निर्णय लिइयो ।                                        ← intro

स्थान: कम्पनीको रजिष्टर्ड कार्यालय      मिति: २०८३/०५/२०      समय: १०:०० बजे   ← where / when

उपस्थिति                                                                      ← attendance
क्र.सं.   शेयरधनीको नाम   पद               हस्ताक्षर
१.       …               एकल शेयरधनी      ………………

छलफलका विषयहरू:                                                              ← agenda
१) …
२) विविध ।

छलफलबाट भएका निर्णयहरू:                                                      ← decisions
निर्णय नं. १  …
निर्णय नं. २  अन्त्यमा अन्य कुनै प्रस्ताव यस बैठकमा पेस नभएकोले आजको बैठक
              यहीँ समापन गर्ने निर्णय गरियो ।
```

Conventions that matter:

- **`को` on its own line.** It is the genitive linking the company name and
  address above to the meeting title below. It looks odd in isolation; it is
  correct.
- **The last decision always closes the meeting.** Every minute ends with the
  "no other proposal was tabled, so the meeting is closed" sentence.
- **`विविध ।` is always the last agenda item.** "Miscellaneous."
- **Danda `।`, not a full stop.** Every sentence in the document body ends with
  `।` preceded by a space: `… निर्णय गरियो ।`
- **`श्री` before a person's name, `ज्यू` after** when addressing them
  respectfully in a decision clause.
- The signature cell is left empty — `drawDoc()` draws a dotted rule for the
  last empty cell in a table row.
- Nothing about a company seal is printed. The visitor stamps it by hand.

### Single vs multiple shareholder

This distinction runs through the whole site and it changes the document:

| | Single shareholder | Multiple shareholders |
|---|---|---|
| Meeting called | एकल शेयरधनीको विशेष बैठक | सञ्चालक समितिको बैठक |
| Attendance table | one row | one row per director, plus a quorum line |
| Chair | the sole shareholder | the elected अध्यक्ष |
| Signing authority | usually sole signature | often "any two jointly" — must be stated |

Never build one template that tries to cover both with an `if`. Two entries in
the catalogue, two pages, two sets of correct wording.

### Source-text hygiene

The reference documents circulating in Nepal (including HamroDocument's) carry
typos that get copied from company to company. These are already corrected in
`bank-account-single` and should be corrected in anything new:

| Wrong | Right |
|---|---|
| बिशेष | विशेष |
| वसी | बसी |
| बैक | बैंक |
| छलफलवाट | छलफलबाट |
| वैठक | बैठक |
| रजिष्ट्रार्ड कार्यालय | रजिष्ट्रारको कार्यालय |
| रद | रद्द |
| पुन | पुन: |
| आइडि | आईडी |
| गरि पाउँ | गरी पाउँ |
| कागजातहरुः | कागजातहरू: |
| स्वयम | स्वयम् |

Do not "improve" wording beyond fixing spelling. If a phrase is standard in
Nepali practice, keep it standard — a bank clerk is matching against documents
they have seen a hundred times.

---

## 7. Adding a new document type

Everything lives in one entry in `src/data/doc-templates.js`. Copy
`bank-account-single`, change five things, rebuild.

### 7.1 The entry

```js
{
  id: 'share-transfer-multiple',                       // unique, kebab-case
  slug: 'tools/share-transfer/multiple-shareholder',   // URL, no leading slash
  serviceId: 'share-transfer',                         // must exist in services.js
  shareholder: 'multiple',                             // 'single' | 'multiple' | null
  price: 0,
  order: 2,
  active: true,

  np: { name, short, metaTitle, metaDesc },
  en: { name, short, metaTitle, metaDesc },

  groups: [ { id: 'company', np: 'कम्पनीको विवरण', en: 'Company details' } ],
  fields: [ … ],
  render: function (v, H) { … }
}
```

`active: false` removes it from the build without deleting the work.

`metaTitle` and `metaDesc` must be unique across the whole site — the build
does not check, but duplicate titles were a real defect here before.

### 7.2 Field types

| `t` | Renders as | `collect()` gives you |
|---|---|---|
| `text` | text input | the string |
| `tel` | tel input | the string |
| `email` | email input | the string |
| `time` | time input | `'HH:MM'` |
| `select` | dropdown from `f.options` | the chosen option's `v` |
| `fiscalYear` | dropdown, 2090/91 → 2030/31 | `'2080/81'` |
| `bsdate` | three dropdowns | `'2083/05/20'` |
| `address` | text input + cascading picker | the composed Nepali string |

A `select` takes `options: [{ v, np, en }]`. `v` is what `render` receives, so
make it the exact phrase the document needs — then the template concatenates it
rather than mapping a code back to a string. `OCR_OFFICES` at the top of
`doc-templates.js` is the worked example.

Flags: `req` (required), `half` (pairs with the next `half` field on one row),
`suffix` (a fixed non-editable tail such as `प्रा.लि.`), `def` (default value).

Per-language: `l` (label), `p` (placeholder), `help` (hint under the field).

Ask for the fewest fields that produce a correct document. Every extra field is
a reason to abandon the form. Anything that is nearly always the same gets a
`def` rather than being asked cold.

### 7.3 `render(v, H)`

`v` holds the answers keyed by field `k`. `H` is the helper set from §4 plus
`H.lang`.

It returns a plain object, in one of two shapes.

**Shape A — blocks (use this for anything new).** A document is a list of
pages; a page is a list of blocks. One renderer draws every block type, so a
new document needs no engine changes:

```js
{ pages: [ [ block, block, … ],      // page 1
           [ block, block, … ] ] }   // page 2, starts a new sheet when printed
```

| Block | Draws as |
|---|---|
| `{type:'corner', text}` | small right-aligned line (registration number) |
| `{type:'title', text}` | centred, large, bold — the company name |
| `{type:'sub', text}` | centred — the address |
| `{type:'conn', text}` | centred — the standalone `को` |
| `{type:'heading', text}` | centred bold — which meeting |
| `{type:'right', text}` | right-aligned line — `मिति: …` on a letter |
| `{type:'lines', items:[]}` | stacked left-aligned lines — the addressee |
| `{type:'subject', text}` | centred, bold, underlined — `विषय:- …` |
| `{type:'salut', text}` | `महोदय,` |
| `{type:'para', text, indent}` | justified paragraph; `indent` for a letter's opening |
| `{type:'meta', items:[{l,v}]}` | inline label/value pairs — स्थान / मिति / समय |
| `{type:'table', caption, cols, rows}` | empty last cell → dotted signature rule |
| `{type:'secH', text}` | underlined section heading |
| `{type:'items', items:[]}` | strings, or `{label, text}` for निर्णय नं. |
| `{type:'sign', heading, items:[]}` | right-aligned signature block; `{l,v,rule,bold}` per line |
| `{type:'gap'}` / `{type:'rule'}` | vertical space / horizontal line |

**Shape B — flat, single page.** The original shape, kept because the earlier
templates use it. The engine converts it to blocks internally:

```js
{
  cornerRight, title, subtitle, connector, heading, intro,
  meta:     [ { l: 'स्थान:', v: '…' } ],
  table:    { caption, cols: [], rows: [[]] },
  sections: [ { h: '…', items: [ '…', { label: 'निर्णय नं. १', text: '…' } ] } ],
  closing
}
```

All block text is escaped, and the space before every danda is turned into a
non-breaking space so `।` can never be pushed onto a line by itself.

### Multi-page documents

Several filings need a covering letter plus the minute it encloses — the CAMIS
reset is the worked example. Put each on its own page in `pages`. On screen
they are separated by a dashed rule so the visitor sees where the break falls;
in print each starts a new sheet.

Anything you add to a tool page that must not appear in the printed document
gets `class="no-print"`. Do not add it to the list of hidden selectors in
`docgen.css` — that list is for the site chrome only.

Constraints on `render`:

- **It is serialised with `Function.prototype.toString()` and `eval`'d in the
  browser.** So it must be self-contained: no closures over module scope, no
  `require`, no arrow functions capturing outer `this`, no template literals
  referencing build-time variables. Only `v`, `H` and its own locals.
- It must not throw on empty input — the preview may run before every field is
  filled. Default with `|| ''`.
- Optional content adapts the sentence rather than leaving a dangling clause.
  See how the email in `bank-account-single` changes
  `मोबाइल नम्बर …` into `मोबाइल नम्बर … र इमेल …`.

### 7.4 Wiring

Nothing else to do. The build:

- emits the page at `slug` in both languages (`/tools/…` and `/ne/tools/…`)
- lists it on `/tools/`
- links it from the service page named by `serviceId`
- adds it to the sitemap with hreflang alternates
- attaches `WebApplication` JSON-LD

```bash
node src/build.js
```

The summary line reports `… · N generators`. If your number did not go up, the
entry is `active: false` or has a syntax error.

### 7.5 Test it before shipping

Not optional. A generated legal document that is subtly wrong is worse than no
generator.

1. Fill the form completely and read the whole output aloud in Nepali. Danda
   spacing, `श्री`/`ज्यू`, agreement.
2. Check every number is in Devanagari — registration, fiscal year, date, time,
   phone, amounts. A stray Latin digit is the usual bug.
3. Leave each required field blank in turn and confirm it is blocked and named.
4. Print preview (Ctrl/Cmd + P). Exactly as many sheets as the document has
   pages — no stray page of site chrome at the end; no decision paragraph
   split across a break.
5. Reload the page and confirm the answers come back from `localStorage`.
6. Do 1–5 again with the interface in English. The document must be identical.

---

## 8. Candidates for the next templates

In rough order of how often they are asked for. Each needs its exact Nepali
wording checked against a real document before it is written — do not
reconstruct legal text from memory.

Already built: bank account opening (single shareholder) and CAMIS ID/password
reset (single shareholder).

**Board minutes** — PAN/VAT registration · change of registered office ·
appointment or change of director · authorised signatory change · company name
change · capital increase · share transfer · branch office opening · closing a
bank account · authorising someone to file at OCR.

**Applications and letters** — ward recommendation (सिफारिस) request · business
closure application · tax clearance request · bank account operator change
letter.

**Two per document type** where the single/multiple distinction applies. That
is the pattern the site is built on.

---

## 9. Things not to do

- Do not add a JavaScript PDF library. §2.
- Do not add a BS↔AD converter from a remembered table. §3.
- Do not add number-to-words from a remembered table. §4.
- Do not send form data anywhere. There is no endpoint, and adding one changes
  what the privacy note on the page promises.
- Do not make the address read-only. §5.
- Do not merge single and multiple shareholder into one template. §6.
- Do not translate the document body into English. §1.
- Do not invent a government fee, a processing time or a form number. If it is
  not verified, it does not go on the page — the same rule as the rest of the
  site.
