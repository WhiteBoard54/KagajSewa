#!/usr/bin/env node
/* ==========================================================================
   KagajSewa static site generator

   Reads src/data/*, writes plain HTML into the repo root.
   English is the default language and lives at /.
   Nepali lives at /ne/.

   Run:  npm run build
   ========================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const { site } = require('./data/site');
const { categories } = require('./data/categories');
const { services } = require('./data/services');
const { guides } = require('./data/guides');
const { ui, faq, legal } = require('./data/ui');

const ROOT = path.resolve(__dirname, '..');
const SRC = __dirname;
const LANGS = ['en', 'np'];
const HTML_LANG = { np: 'ne', en: 'en' };

/* ------------------------------------------------------------------ utils */

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const attr = s => esc(s);

/** Public URL path for a slug in a language. '' = home. */
function href(lang, slug) {
  const base = site.basePath || '';
  const s = String(slug || '').replace(/^\/|\/$/g, '');
  if (lang === 'en') return s ? `${base}/${s}/` : `${base}/`;
  return s ? `${base}/ne/${s}/` : `${base}/ne/`;
}

/** Absolute URL, for canonical / og / sitemap. */
const abs = (lang, slug) => site.siteUrl + href(lang, slug);

/** Where the file lands on disk. */
function outPath(lang, slug) {
  const s = String(slug || '').replace(/^\/|\/$/g, '');
  const parts = lang === 'en' ? [] : ['ne'];
  if (s) parts.push(...s.split('/'));
  return path.join(ROOT, ...parts, 'index.html');
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

const asset = f => `${site.basePath || ''}/assets/${f}`;

/* ---- relative URLs ------------------------------------------------------
   Pages are generated with root-relative links, then rewritten to relative
   ones for the page's own depth. This means the site works unchanged from a
   domain root, from a project subpath, and from a local file:// path — the
   stylesheet always resolves.

   `LOCAL` mode additionally appends index.html to directory links so the
   whole site is browsable by double-clicking a file, with no server.
-------------------------------------------------------------------------- */

const LOCAL = process.argv.includes('--local') || process.env.KS_LOCAL === '1';

/** Depth of a page's own directory below the site root. */
function depthOf(lang, slug) {
  const s = String(slug || '').replace(/^\/|\/$/g, '');
  return (lang === 'en' ? 0 : 1) + (s ? s.split('/').length : 0);
}

/** Turn one root-relative URL into a relative one for a page at `depth`. */
function relUrl(url, depth) {
  let u = url;
  if (site.basePath && u.startsWith(site.basePath)) u = u.slice(site.basePath.length);
  u = u.replace(/^\//, '');
  let out = (depth === 0 ? '' : '../'.repeat(depth)) + u;
  if (LOCAL && (out === '' || out.endsWith('/'))) return out + 'index.html';
  return out === '' ? './' : out;
}

/** Rewrite every root-relative href/src in a finished page. */
function relativise(html, depth) {
  return html.replace(/(href|src)="(\/[^"]*)"/g, (m, a, u) => `${a}="${relUrl(u, depth)}"`);
}

const money = n => 'NPR ' + Number(n).toLocaleString('en-US');

function priceLine(lang, n) {
  return lang === 'en' ? `From ${money(n)}` : `${money(n)} बाट सुरु`;
}

const byId = id => services.find(s => s.id === id);
const catById = id => categories.find(c => c.id === id);
const guideBySlug = slug => guides.find(g => g.slug === slug);

const sortedCats = [...categories].sort((a, b) => a.order - b.order);
const popularServices = services
  .filter(s => s.popular)
  .sort((a, b) => a.popular - b.popular);

function catServices(catId) {
  return services.filter(s => s.category === catId).sort((a, b) => a.order - b.order);
}

/* ------------------------------------------------------------------ icons */

const ICONS = {
  shield: '<path d="M12 3 4 6.2v5.3c0 4.5 3.2 8.4 8 9.3 4.8-.9 8-4.8 8-9.3V6.2L12 3z"/><path d="m9 12 2 2 4-4"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M8 2.5v4M16 2.5v4M3 10h18M7.5 14h3"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5M3 16.5 12 21l9-4.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
  chat: '<path d="M21 14.5a2 2 0 0 1-2 2H7.5L3 21V5.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4.5" width="20" height="15" rx="2"/><path d="m2 7.5 10 6 10-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="3.6"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16.5 4.6a3.6 3.6 0 0 1 0 6.9M18 21h4a6 6 0 0 0-3.5-5.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4.5M12 8h.01"/>',
  wa: '<path d="M20.5 11.5A8.4 8.4 0 0 1 7.9 19L3.5 20.5l1.6-4.3A8.4 8.4 0 1 1 20.5 11.5z"/>'
};

function icon(name, size = 20, sw = 1.8) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* ------------------------------------------------------------------ order links */

function orderHref(lang, serviceName) {
  const subject = `KagajSewa — ${serviceName}`;
  const body = lang === 'np'
    ? 'कम्पनीको नाम:\nदर्ता नम्बर:\nPAN:\nएकल वा बहुल शेयरधनी:\nकहिलेसम्म चाहिएको:\n\n'
    : 'Company name:\nRegistration number:\nPAN:\nSingle or multiple shareholder:\nNeeded by:\n\n';
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const waHref = () => `https://wa.me/${site.contact.whatsapp}`;
const telHref = () => `tel:${site.contact.phoneDial}`;
const phoneText = lang => (lang === 'np' ? site.contact.phoneDisplay : site.contact.phoneDisplayEn);

/* ------------------------------------------------------------------ search index */

function searchIndex(lang) {
  const t = ui[lang];
  const rows = services.map(s => {
    const d = s[lang];
    const c = catById(s.category)[lang].name;
    const alt = lang === 'np' ? (d.nameEn || '') : (d.nameNp || '');
    const shTag = s.shareholder === 'single' ? t.common.single
      : s.shareholder === 'multiple' ? t.common.multiple : '';
    const hay = [d.name, alt, c, shTag, d.short, s.slug.replace(/[-/]/g, ' ')]
      .join(' ').toLowerCase();
    return { n: d.name, a: alt, c, u: href(lang, s.slug), h: hay };
  });
  const gRows = guides.map(g => {
    const d = g[lang];
    return { n: d.title, a: '', c: t.common.guides, u: href(lang, g.slug), h: (d.title + ' ' + d.metaDesc).toLowerCase() };
  });
  return JSON.stringify(rows.concat(gRows));
}

/* ------------------------------------------------------------------ layout */

const FAVICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230d5561'/><path d='M9 7.5h9l5 5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 9 24.5v-15A1.5 1.5 0 0 1 9 7.5z' fill='%23fff'/><path d='M12 15h7M12 18h7M12 21h4' stroke='%230d5561' stroke-width='1.4' stroke-linecap='round'/></svg>";

function brandMark() {
  // width/height are explicit on purpose: if the stylesheet ever fails to load,
  // an SVG with only a viewBox expands to its container and blows up the layout.
  return `<svg class="brand-mark" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
  <rect width="36" height="36" rx="8" fill="var(--brand)"/>
  <path d="M10 8.5h9.5l6.5 6.5v12.5a1.6 1.6 0 0 1-1.6 1.6H10a1.6 1.6 0 0 1-1.6-1.6V10.1A1.6 1.6 0 0 1 10 8.5z" fill="#fff"/>
  <path d="M19.5 8.5v5a1.6 1.6 0 0 0 1.6 1.6H26" stroke="var(--brand)" stroke-width="1.3" fill="none"/>
  <path d="M12 18.5h9M12 21.5h9M12 24.5h5.5" stroke="var(--brand)" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;
}

function header(lang, slug, opts = {}) {
  const t = ui[lang];
  const base = site.basePath || '';
  const npHref = opts.is404 ? `${base}/404.html` : href('np', slug);
  const enHref = opts.is404 ? `${base}/en/404.html` : href('en', slug);
  const nav = [
    [href(lang, 'services'), t.nav.services],
    [href(lang, 'guides'), t.nav.guides],
    [href(lang, 'how-it-works'), t.nav.how],
    [href(lang, 'why-kagajsewa'), t.nav.why],
    [href(lang, 'faq'), t.nav.faq],
    [href(lang, 'contact'), t.nav.contact]
  ];
  const links = nav.map(([u, l]) => `<a class="nl" href="${attr(u)}">${esc(l)}</a>`).join('');

  return `<header class="hdr">
  <div class="wrap hdr-in">
    <a class="brand" href="${attr(href(lang, ''))}">
      ${brandMark()}
      <span class="brand-txt">
        <span class="brand-en">Kagaj<b>Sewa</b></span>
        <span class="brand-np">कागज सेवा</span>
      </span>
    </a>
    <nav class="nav-desk" aria-label="${attr(t.nav.menu)}">${links}</nav>
    <div class="hdr-right">
      <div class="lang">
        <a href="${attr(npHref)}" hreflang="ne" lang="ne" class="np"${lang === 'np' ? ' aria-current="true"' : ''}>नेपाली</a>
        <a href="${attr(enHref)}" hreflang="en" lang="en"${lang === 'en' ? ' aria-current="true"' : ''}>EN</a>
      </div>
      <a class="btn btn-primary btn-sm nav-cta" href="${attr(href(lang, 'contact'))}">${esc(t.nav.cta)}</a>
      <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="navMob" aria-label="${attr(t.nav.menu)}">${icon('menu', 20, 2)}</button>
    </div>
  </div>
</header>
<nav class="nav-mob" id="navMob" hidden aria-label="${attr(t.nav.menu)}">
  <div>${links}</div>
  <a class="btn btn-primary btn-block" href="${attr(href(lang, 'contact'))}">${esc(t.nav.cta)}</a>
</nav>`;
}

function footer(lang) {
  const t = ui[lang];
  const l = (slug, label) => `<li><a href="${attr(href(lang, slug))}">${esc(label)}</a></li>`;
  const s = id => { const x = byId(id); return l(x.slug, x[lang].name); };
  const g = slug => { const x = guideBySlug(slug); return l(x.slug, x[lang].title); };

  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div>
        <a class="brand" href="${attr(href(lang, ''))}">
          ${brandMark()}
          <span class="brand-txt"><span class="brand-en">Kagaj<b>Sewa</b></span><span class="brand-np">कागज सेवा</span></span>
        </a>
        <p class="ftr-blurb">${esc(t.footer.blurb)}</p>
      </div>
      <div>
        <h4>${esc(t.footer.companyServices)}</h4>
        <ul>
          ${s('registration-single')}${s('registration-multiple')}${s('annual-update-single')}
          ${s('share-transfer')}${s('name-change-single')}${s('capital-increase-single')}
        </ul>
      </div>
      <div>
        <h4>${esc(t.footer.taxServices)}</h4>
        <ul>
          ${s('pan-registration')}${s('tax-clearance')}${s('bank-account')}
          ${l('services/ird-tax', catById('ird-tax')[lang].name)}
        </ul>
      </div>
      <div>
        <h4>${esc(t.footer.guides)}</h4>
        <ul>
          ${g('guides/company-registration-nepal')}${g('guides/company-annual-update')}
          ${g('guides/share-transfer-nepal')}${l('guides', t.cta.allGuides)}
        </ul>
      </div>
      <div>
        <h4>${esc(t.footer.about)}</h4>
        <ul>
          ${l('about', lang === 'np' ? 'हाम्रो बारेमा' : 'About us')}
          ${l('how-it-works', t.nav.how)}${l('faq', t.nav.faq)}${l('contact', t.nav.contact)}
        </ul>
      </div>
    </div>

    <div class="ftr-legal">
      <p>${esc(t.disclaimer)}</p>
      <div class="ftr-bot">
        <span>© <span class="tabnum">${new Date().getFullYear()}</span> KagajSewa · कागज सेवा · ${esc(t.footer.rights)}</span>
        <nav aria-label="${attr(t.footer.legal)}">
          <a href="${attr(href(lang, 'terms'))}">${esc(t.footer.terms)}</a>
          <a href="${attr(href(lang, 'privacy'))}">${esc(t.footer.privacy)}</a>
          <a href="${attr(href(lang, 'refund-policy'))}">${esc(t.footer.refund)}</a>
        </nav>
      </div>
    </div>
  </div>
</footer>`;
}

function stickyCta(lang, orderName) {
  const t = ui[lang];
  return `<div class="sticky-cta">
  <a class="btn btn-primary" href="${attr(orderName ? orderHref(lang, orderName) : href(lang, 'contact'))}">${esc(t.contact.stickyCta)}</a>
  <a class="btn btn-outline btn-icon" href="${attr(telHref())}" aria-label="${attr(t.cta.call)}">${icon('phone', 19)}</a>
  <a class="btn btn-outline btn-icon" href="${attr(waHref())}" aria-label="WhatsApp" rel="noopener">${icon('wa', 19)}</a>
</div>`;
}

function crumbs(lang, trail) {
  const t = ui[lang];
  if (!trail || !trail.length) return '';
  const items = [{ label: t.common.home, slug: '' }, ...trail];
  const li = items.map((c, i) => {
    const last = i === items.length - 1;
    return last
      ? `<li><span aria-current="page">${esc(c.label)}</span></li>`
      : `<li><a href="${attr(href(lang, c.slug))}">${esc(c.label)}</a></li>`;
  }).join('');
  return `<nav class="wrap crumbs" aria-label="${attr(t.common.breadcrumb)}"><ol>${li}</ol></nav>`;
}

function breadcrumbSchema(lang, trail) {
  if (!trail || !trail.length) return null;
  const t = ui[lang];
  const items = [{ label: t.common.home, slug: '' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.label, item: abs(lang, c.slug)
    }))
  };
}

function organizationSchema(lang) {
  return {
    '@type': 'Organization',
    '@id': site.siteUrl + '/#org',
    name: 'KagajSewa',
    alternateName: 'कागज सेवा',
    url: site.siteUrl + '/',
    description: lang === 'np' ? site.brand.taglineNp : site.brand.taglineEn,
    email: site.contact.email,
    telephone: site.contact.phoneDial,
    areaServed: { '@type': 'Country', name: 'Nepal' },
    knowsLanguage: ['ne', 'en']
  };
}

/**
 * page() — the single HTML shell every page goes through.
 */
function page(o) {
  const lang = o.lang;
  const t = ui[lang];
  const htmlLang = HTML_LANG[lang];
  const canonical = abs(lang, o.slug);
  const schemas = (o.schema || []).filter(Boolean);
  const bc = breadcrumbSchema(lang, o.trail);
  if (bc) schemas.push(bc);

  const jsonld = schemas.length
    ? `<script type="application/ld+json">${JSON.stringify(
        schemas.length === 1
          ? Object.assign({ '@context': 'https://schema.org' }, schemas[0])
          : { '@context': 'https://schema.org', '@graph': schemas }
      ).replace(/</g, '\\u003c')}</script>`
    : '';

  const depth = o.depth != null ? o.depth : depthOf(lang, o.slug);

  const indexScript = o.withSearch
    ? `<script>window.KS_INDEX=${searchIndex(lang)
        .replace(/"u":"([^"]*)"/g, (m, u) => `"u":"${relUrl(u, depth)}"`)
        .replace(/</g, '\\u003c')}</script>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${attr(o.desc)}">
${o.noindex ? '<meta name="robots" content="noindex, follow">' : ''}
${o.is404 ? '' : `<link rel="canonical" href="${attr(canonical)}">
<link rel="alternate" hreflang="ne" href="${attr(abs('np', o.slug))}">
<link rel="alternate" hreflang="en" href="${attr(abs('en', o.slug))}">
<link rel="alternate" hreflang="x-default" href="${attr(abs('en', o.slug))}">`}
<meta name="theme-color" content="#0d5561">
<meta property="og:type" content="${attr(o.ogType || 'website')}">
<meta property="og:site_name" content="KagajSewa">
<meta property="og:locale" content="${htmlLang === 'ne' ? 'ne_NP' : 'en_NP'}">
<meta property="og:title" content="${attr(o.title)}">
<meta property="og:description" content="${attr(o.desc)}">
<meta property="og:url" content="${attr(canonical)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${attr(o.title)}">
<meta name="twitter:description" content="${attr(o.desc)}">
<link rel="icon" href="${attr(FAVICON)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Public+Sans:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${attr(asset('styles.css'))}">
${jsonld}
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(lang, o.slug, { is404: o.is404 })}
${crumbs(lang, o.trail)}
<main id="main">
${o.body}
</main>
${footer(lang)}
${stickyCta(lang, o.orderName)}
${indexScript}
<script src="${attr(asset('app.js'))}" defer></script>
</body>
</html>`;

  return relativise(html, depth);
}

/* ------------------------------------------------------------------ components */

function shPill(lang, s) {
  const t = ui[lang];
  if (s.shareholder === 'single') return `<span class="pill pill-single">${icon('user', 12, 2.2)}${esc(t.common.single)}</span>`;
  if (s.shareholder === 'multiple') return `<span class="pill pill-multi">${icon('users', 12, 2.2)}${esc(t.common.multiple)}</span>`;
  return `<span class="pill pill-both">${esc(t.common.bothTypes)}</span>`;
}

/** The reusable service card. */
function serviceCard(lang, s, opts = {}) {
  const t = ui[lang];
  const d = s[lang];
  const c = catById(s.category);
  const alt = lang === 'np' ? d.nameEn : d.nameNp;
  const docs = d.includes.slice(0, 3);
  const extra = d.includes.length - docs.length;

  return `<a class="card" href="${attr(href(lang, s.slug))}">
  <div class="pill-row">
    ${opts.showCat === false ? '' : `<span class="pill pill-cat">${esc(c[lang].name)}</span>`}
    ${s.popular ? `<span class="pill pill-pop">${esc(t.common.popular)}</span>` : ''}
    ${shPill(lang, s)}
  </div>
  <h3 class="svc-name">${esc(d.name)}</h3>
  ${alt ? `<p class="svc-alt">${esc(alt)}</p>` : ''}
  <p class="svc-desc">${esc(d.short)}</p>
  <ul class="svc-docs">
    ${docs.map(x => `<li>${esc(x)}</li>`).join('')}
    ${extra > 0 ? `<li class="svc-more">${lang === 'np' ? `+ थप ${extra} कागजात` : `+ ${extra} more`}</li>` : ''}
  </ul>
  <div class="svc-foot">
    <span class="price">
      <span class="from">${esc(t.common.from)}</span>
      <span class="amt">${esc(money(s.price))}</span>
    </span>
    <span class="lnk">${esc(t.cta.view)} ${icon('arrow', 15, 2)}</span>
  </div>
</a>`;
}

function categoryCard(lang, c) {
  const t = ui[lang];
  const n = catServices(c.id).length;
  return `<a class="card cat-card" href="${attr(href(lang, c.slug))}">
  <span class="cat-office">${esc(c.office)}</span>
  <span class="cat-name">${esc(c[lang].name)}</span>
  <span class="cat-desc">${esc(c[lang].short)}</span>
  <span class="cat-count">${n} ${esc(t.common.servicesCount)}</span>
</a>`;
}

function searchBlock(lang, opts = {}) {
  const t = ui[lang];
  return `<div class="search">
  <label class="sr" for="svcSearch">${esc(t.search.label)}</label>
  <div class="search-box">
    <span class="mag">${icon('search', 19, 2)}</span>
    <input type="search" id="svcSearch" autocomplete="off" placeholder="${attr(t.search.placeholder)}" aria-describedby="searchHint">
  </div>
  <div class="search-results" id="svcResults" hidden data-empty="${attr(t.search.noResults)}" role="region" aria-live="polite" aria-label="${attr(t.search.resultsLabel)}"></div>
  ${opts.hint === false ? '' : `<p class="search-hint" id="searchHint">${esc(t.search.hint)}</p>`}
</div>`;
}

function faqBlock(lang, items) {
  return `<div class="faq">
${items.map((f, i) => `  <details${i === 0 ? ' open' : ''}>
    <summary>${esc(f[lang].q)}</summary>
    <p class="ans">${esc(f[lang].a)}</p>
  </details>`).join('\n')}
</div>`;
}

function faqSchema(lang, items) {
  if (!items || !items.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(f => ({
      '@type': 'Question',
      name: f[lang].q,
      acceptedAnswer: { '@type': 'Answer', text: f[lang].a }
    }))
  };
}

function contactBand(lang) {
  const t = ui[lang];
  return `<section class="sec contact-band" id="contact">
  <div class="wrap">
    <div class="contact-grid">
      <div>
        <p class="eyebrow">${esc(t.contact.h)}</p>
        <div class="sec-head"><h2>${esc(t.home.contactH)}</h2><p>${esc(t.home.contactSub)}</p></div>
        <div class="contact-what">
          <h3>${esc(t.contact.what)}</h3>
          <ul>${t.contact.whatList.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
      </div>
      <div>
        <a class="ccard" href="${attr(telHref())}">
          <span class="ccard-ico">${icon('phone', 19)}</span>
          <span><span class="ccard-lbl">${esc(t.contact.phone)}</span><br><span class="ccard-val">${esc(phoneText(lang))}</span></span>
        </a>
        <a class="ccard" href="mailto:${attr(site.contact.email)}">
          <span class="ccard-ico">${icon('mail', 19)}</span>
          <span><span class="ccard-lbl">${esc(t.contact.email)}</span><br><span class="ccard-val">${esc(site.contact.email)}</span></span>
        </a>
        <dl class="contact-facts">
          <div><dt>${esc(t.contact.hours)}</dt><dd>${esc(lang === 'np' ? site.contact.hoursNp : site.contact.hoursEn)}</dd></div>
          <div><dt>${esc(t.contact.reply)}</dt><dd>${esc(lang === 'np' ? site.contact.replyNp : site.contact.replyEn)}</dd></div>
          <div><dt>${esc(t.contact.payment)}</dt><dd>${esc(site.payment.join(' · '))}</dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>`;
}

function pricingBlock(lang) {
  const t = ui[lang];
  return `<div class="pricing-grid">
  <div class="pricing-item">
    <h3>${esc(t.pricing.startNote)}</h3>
    <p>${esc(t.pricing.varyNote)}</p>
  </div>
  <div class="pricing-item">
    <h3>${esc(t.pricing.govFeeTitle)}</h3>
    <p>${esc(t.pricing.govFeeNote)}</p>
  </div>
  <div class="pricing-item">
    <h3>${esc(t.pricing.payTitle)}</h3>
    <p>${esc(t.pricing.payNote)}</p>
  </div>
</div>`;
}

/* ------------------------------------------------------------------ pages */

function homePage(lang) {
  const t = ui[lang];
  const singles = services.filter(s => s.shareholder === 'single').sort((a, b) => (a.popular || 99) - (b.popular || 99));
  const multiples = services.filter(s => s.shareholder === 'multiple').sort((a, b) => (a.popular || 99) - (b.popular || 99));
  const topGuides = [...guides].sort((a, b) => a.order - b.order).slice(0, 6);
  const homeFaq = faq.slice(0, 6);

  const body = `
<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <span class="hero-tag">${esc(t.hero.eyebrow)}</span>
        <h1>${esc(t.hero.h1)}</h1>
        <p class="lede">${esc(t.hero.lede)}</p>
        <p class="sub">${esc(t.hero.sub)}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="${attr(href(lang, 'contact'))}">${esc(t.cta.primary)}</a>
          <a class="btn btn-outline" href="${attr(href(lang, 'services'))}">${esc(t.cta.viewAll)}</a>
        </div>
        <div class="no-account">${icon('check', 17, 2.4)}<span>${esc(t.hero.noAccount)}</span></div>
      </div>
      <div>
        ${searchBlock(lang)}
        <ul class="benefits">
          ${t.hero.benefits.map(b => `<li><b>${esc(b.t)}</b><span>${esc(b.d)}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-soft">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.common.popular)}</p>
      <h2>${esc(t.home.popularH)}</h2>
      <p>${esc(t.home.popularSub)}</p>
    </div>
    <div class="grid grid-3">${popularServices.map(s => serviceCard(lang, s)).join('')}</div>
    <p class="mt-24"><a class="lnk" href="${attr(href(lang, 'services'))}">${esc(t.cta.viewAll)} ${icon('arrow', 15, 2)}</a></p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.common.shareholderType)}</p>
      <h2>${esc(t.home.shareholderH)}</h2>
      <p>${esc(t.home.shareholderSub)}</p>
    </div>
    <div class="sh-grid">
      <div class="sh-card">
        <span class="num">${icon('user', 20)}</span>
        <h3>${esc(t.home.singleCard.t)}</h3>
        <p>${esc(t.home.singleCard.d)}</p>
        <ul class="sh-links">
          ${singles.slice(0, 5).map(s => `<li><a href="${attr(href(lang, s.slug))}">${esc(s[lang].name)}</a></li>`).join('')}
        </ul>
        <a class="btn btn-quiet" href="${attr(href(lang, 'services/single-shareholder'))}">${esc(t.home.singleCard.cta)}</a>
      </div>
      <div class="sh-card is-multi">
        <span class="num">${icon('users', 20)}</span>
        <h3>${esc(t.home.multipleCard.t)}</h3>
        <p>${esc(t.home.multipleCard.d)}</p>
        <ul class="sh-links">
          ${multiples.slice(0, 5).map(s => `<li><a href="${attr(href(lang, s.slug))}">${esc(s[lang].name)}</a></li>`).join('')}
        </ul>
        <a class="btn btn-quiet" href="${attr(href(lang, 'services/multiple-shareholder'))}">${esc(t.home.multipleCard.cta)}</a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-soft">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.common.services)}</p>
      <h2>${esc(t.home.categoriesH)}</h2>
      <p>${esc(t.home.categoriesSub)}</p>
    </div>
    <div class="grid grid-4">${sortedCats.map(c => categoryCard(lang, c)).join('')}</div>
  </div>
</section>

<section class="sec" id="why">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.nav.why)}</p>
      <h2>${esc(t.home.whyH)}</h2>
      <p>${esc(t.home.whySub)}</p>
    </div>
    <div class="why-grid">
      ${t.why.map(w => `<div class="why-item"><div class="why-ico">${icon(w.i, 19)}</div><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="sec sec-soft" id="how">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.nav.how)}</p>
      <h2>${esc(t.home.howH)}</h2>
      <p>${esc(t.home.howSub)}</p>
    </div>
    <ol class="steps">
      ${t.steps.map((s, i) => `<li><span class="step-n">${i + 1}</span><div class="step-b"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div></li>`).join('')}
    </ol>
    <div class="mt-32">
      <div class="sec-head"><h2>${esc(t.pricing.h)}</h2></div>
      ${pricingBlock(lang)}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head sec-head-row">
      <div>
        <p class="eyebrow">${esc(t.nav.guides)}</p>
        <h2>${esc(t.home.guidesH)}</h2>
        <p>${esc(t.home.guidesSub)}</p>
      </div>
      <a class="lnk" href="${attr(href(lang, 'guides'))}">${esc(t.cta.allGuides)} ${icon('arrow', 15, 2)}</a>
    </div>
    <div class="grid grid-3">
      ${topGuides.map(g => `<a class="card" href="${attr(href(lang, g.slug))}">
        <h3 class="svc-name">${esc(g[lang].title)}</h3>
        <p class="svc-desc">${esc(g[lang].metaDesc)}</p>
        <span class="lnk">${esc(t.common.readGuide)} ${icon('arrow', 15, 2)}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="sec sec-soft" id="faq">
  <div class="wrap">
    <div class="sec-head sec-head-row">
      <div>
        <p class="eyebrow">${esc(t.nav.faq)}</p>
        <h2>${esc(t.home.faqH)}</h2>
        <p>${esc(t.home.faqSub)}</p>
      </div>
      <a class="lnk" href="${attr(href(lang, 'faq'))}">${esc(t.nav.faq)} ${icon('arrow', 15, 2)}</a>
    </div>
    ${faqBlock(lang, homeFaq)}
  </div>
</section>

${contactBand(lang)}`;

  return page({
    lang, slug: '', withSearch: true,
    title: lang === 'np'
      ? 'कागज सेवा | नेपालमा कम्पनी दर्ता, अद्यावधिक र कागजात तयारी'
      : 'KagajSewa | Company Registration, Updates and Documents in Nepal',
    desc: lang === 'np'
      ? 'कम्पनी दर्ता, वार्षिक अद्यावधिक, शेयर नामसारी, PAN र कर चुक्ता लगायतका कागजात सही ढाँचामा तयार गर्ने सेवा। एकल र बहुल शेयरधनी कम्पनीका लागि छुट्टाछुट्टै। NPR १५० बाट सुरु।'
      : 'Company registration, annual updates, share transfer, PAN and tax clearance documents prepared in the correct Nepali format. Separate sets for single and multiple shareholder companies. From NPR 150.',
    body,
    schema: [
      organizationSchema(lang),
      {
        '@type': 'WebSite',
        '@id': site.siteUrl + '/#website',
        url: site.siteUrl + '/',
        name: 'KagajSewa',
        inLanguage: HTML_LANG[lang],
        publisher: { '@id': site.siteUrl + '/#org' }
      },
      faqSchema(lang, homeFaq)
    ]
  });
}

function servicesIndexPage(lang) {
  const t = ui[lang];
  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <h1>${esc(lang === 'np' ? 'सबै सेवाहरू' : 'All services')}</h1>
      <p>${esc(lang === 'np'
        ? 'कागज सेवाले तयार गर्ने सम्पूर्ण कागजात, सम्बन्धित कार्यालयअनुसार छुट्याइएको। धेरै सेवामा एकल र बहुल शेयरधनी कम्पनीका लागि छुट्टाछुट्टै विकल्प छन्।'
        : 'Everything KagajSewa prepares, grouped by the office the filing goes to. Many services have separate options for single and multiple shareholder companies.')}</p>
    </div>
    <div style="max-width:600px">${searchBlock(lang)}</div>
    <div class="grid grid-4 mt-32">${sortedCats.map(c => categoryCard(lang, c)).join('')}</div>
  </div>
</section>

${sortedCats.map(c => {
  const list = catServices(c.id);
  if (!list.length) return '';
  return `<section class="sec sec-line" id="${attr(c.id)}">
  <div class="wrap">
    <div class="sec-head sec-head-row">
      <div>
        <p class="eyebrow">${esc(c.office)}</p>
        <h2>${esc(c[lang].name)}</h2>
        <p>${esc(c[lang].short)}</p>
      </div>
      <a class="lnk" href="${attr(href(lang, c.slug))}">${esc(lang === 'np' ? 'श्रेणी हेर्नुहोस्' : 'View category')} ${icon('arrow', 15, 2)}</a>
    </div>
    <div class="grid grid-3">${list.map(s => serviceCard(lang, s, { showCat: false })).join('')}</div>
  </div>
</section>`;
}).join('')}

<section class="sec sec-soft">
  <div class="wrap">
    <div class="sec-head"><h2>${esc(t.pricing.h)}</h2></div>
    ${pricingBlock(lang)}
  </div>
</section>

${contactBand(lang)}`;

  return page({
    lang, slug: 'services', withSearch: true,
    trail: [{ label: t.common.services, slug: 'services' }],
    title: lang === 'np'
      ? 'सबै सेवाहरू | कम्पनी, IRD, बैंक र वडा कार्यालयका कागजात | कागज सेवा'
      : 'All Services | Company, IRD, Bank and Ward Office Documents | KagajSewa',
    desc: lang === 'np'
      ? 'कम्पनी दर्ता, अद्यावधिक, शेयर नामसारी, कम्पनी परिवर्तन, IRD, बैंक, ट्रेडमार्क, श्रम र वडा कार्यालयका कागजात — सबै सेवाको पूरा सूची र मूल्य।'
      : 'The full list of documents KagajSewa prepares — company registration, updates, share transfer, company changes, IRD, bank, trademark, labour and ward office — with starting prices.',
    body,
    schema: [organizationSchema(lang)]
  });
}

function shareholderIndexPage(lang, type) {
  const t = ui[lang];
  const list = services.filter(s => s.shareholder === type)
    .sort((a, b) => (a.popular || 99) - (b.popular || 99));
  const other = type === 'single' ? 'multiple' : 'single';
  const isSingle = type === 'single';

  const h1 = isSingle
    ? (lang === 'np' ? 'एकल शेयरधनी कम्पनीका लागि सेवाहरू' : 'Services for single shareholder companies')
    : (lang === 'np' ? 'बहुल शेयरधनी कम्पनीका लागि सेवाहरू' : 'Services for multiple shareholder companies');

  const lede = isSingle
    ? (lang === 'np'
      ? 'तपाईंको कम्पनीको सम्पूर्ण शेयर एकै व्यक्तिको नाममा छ भने यी सेवाहरू तपाईंका लागि हुन्। नियमावली, साधारण सभाको माइन्युट र दफा ९२ को विवरण एकल शेयरधनी ढाँचामा तयार हुन्छन्।'
      : 'These are the services for a company where one person holds all the shares. The articles, the general meeting minute and the Section 92 disclosure are all drafted in single-shareholder form.')
    : (lang === 'np'
      ? 'तपाईंको कम्पनीमा दुई वा बढी शेयरधनी हुनुहुन्छ भने यी सेवाहरू तपाईंका लागि हुन्। विशेष साधारण सभा, गणपूरक संख्या र प्रत्येक शेयरधनीको शेयर बाँडफाँड कागजातमै समेटिन्छ।'
      : 'These are the services for a company with two or more shareholders. Special general meetings, quorum and each shareholder’s allocation are all reflected in the documents.');

  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div class="pill-row">${isSingle
        ? `<span class="pill pill-single">${icon('user', 12, 2.2)}${esc(t.common.single)}</span>`
        : `<span class="pill pill-multi">${icon('users', 12, 2.2)}${esc(t.common.multiple)}</span>`}</div>
      <h1>${esc(h1)}</h1>
      <p>${esc(lede)}</p>
    </div>
    <div class="note">
      <p class="note-h">${esc(lang === 'np' ? 'ठीक विकल्प छान्नुभयो?' : 'Picked the right one?')}</p>
      <p>${esc(lang === 'np'
        ? 'शेयरधनी संख्याअनुसार कागजातको ढाँचा फरक हुन्छ। गलत ढाँचाको कागजात कार्यालयबाट फिर्ता हुन सक्छ।'
        : 'The documents differ by the number of shareholders. The wrong set can be handed back at the counter.')} <a href="${attr(href(lang, 'services/' + other + '-shareholder'))}">${esc(isSingle
          ? (lang === 'np' ? 'बहुल शेयरधनी सेवाहरू हेर्नुहोस्' : 'See multiple shareholder services')
          : (lang === 'np' ? 'एकल शेयरधनी सेवाहरू हेर्नुहोस्' : 'See single shareholder services'))}</a></p>
    </div>
    <div class="grid grid-3 mt-24">${list.map(s => serviceCard(lang, s)).join('')}</div>
  </div>
</section>

<section class="sec sec-soft">
  <div class="wrap">
    <div class="sec-head"><h2>${esc(lang === 'np' ? 'एकल र बहुल शेयरधनीमा के फरक?' : 'What is the difference?')}</h2></div>
    ${faqBlock(lang, [faq[1]])}
    <p class="mt-24"><a class="lnk" href="${attr(href(lang, 'guides/' + (isSingle ? 'single' : 'multiple') + '-shareholder-company-registration'))}">${esc(t.common.readGuide)} ${icon('arrow', 15, 2)}</a></p>
  </div>
</section>

${contactBand(lang)}`;

  return page({
    lang, slug: `services/${type}-shareholder`,
    trail: [{ label: t.common.services, slug: 'services' }, { label: isSingle ? t.common.single : t.common.multiple }],
    title: isSingle
      ? (lang === 'np' ? 'एकल शेयरधनी कम्पनीका सेवाहरू | दर्ता, अद्यावधिक र कागजात' : 'Single Shareholder Company Services Nepal | Registration and Updates')
      : (lang === 'np' ? 'बहुल शेयरधनी कम्पनीका सेवाहरू | दर्ता, अद्यावधिक र कागजात' : 'Multiple Shareholder Company Services Nepal | Registration and Updates'),
    desc: lede.slice(0, 300),
    body,
    schema: [faqSchema(lang, [faq[1]])]
  });
}

function categoryPage(lang, c) {
  const t = ui[lang];
  const list = catServices(c.id);
  const relatedGuides = [...new Set(list.flatMap(s => s.guides || []))].map(guideBySlug).filter(Boolean);

  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(c.office)}</p>
      <h1>${esc(c[lang].name)}</h1>
      <p>${esc(c[lang].short)}</p>
    </div>
    <div class="grid grid-3">${list.map(s => serviceCard(lang, s, { showCat: false })).join('')}</div>
  </div>
</section>

${relatedGuides.length ? `<section class="sec sec-soft">
  <div class="wrap">
    <div class="sec-head"><h2>${esc(t.common.relatedGuides)}</h2></div>
    <div class="grid grid-3">
      ${relatedGuides.map(g => `<a class="card" href="${attr(href(lang, g.slug))}">
        <h3 class="svc-name">${esc(g[lang].title)}</h3>
        <p class="svc-desc">${esc(g[lang].metaDesc)}</p>
        <span class="lnk">${esc(t.common.readGuide)} ${icon('arrow', 15, 2)}</span>
      </a>`).join('')}
    </div>
  </div>
</section>` : ''}

<section class="sec sec-line">
  <div class="wrap">
    <div class="sec-head"><h2>${esc(lang === 'np' ? 'अन्य श्रेणीहरू' : 'Other categories')}</h2></div>
    <div class="chip-links">
      ${sortedCats.filter(x => x.id !== c.id).map(x => `<a href="${attr(href(lang, x.slug))}">${esc(x[lang].name)}</a>`).join('')}
    </div>
  </div>
</section>

${contactBand(lang)}`;

  return page({
    lang, slug: c.slug,
    trail: [{ label: t.common.services, slug: 'services' }, { label: c[lang].name }],
    title: c[lang].metaTitle + ' | KagajSewa',
    desc: c[lang].metaDesc,
    body,
    schema: [organizationSchema(lang)]
  });
}

function servicePage(lang, s) {
  const t = ui[lang];
  const d = s[lang];
  const c = catById(s.category);
  const alt = lang === 'np' ? d.nameEn : d.nameNp;
  const rel = (s.related || []).map(byId).filter(Boolean);
  const relGuides = (s.guides || []).map(guideBySlug).filter(Boolean);
  const sibling = services.find(x =>
    x.id !== s.id && x.category === s.category && s.shareholder && x.shareholder &&
    x.shareholder !== s.shareholder &&
    x.slug.split('/').slice(0, -1).join('/') === s.slug.split('/').slice(0, -1).join('/')
  );

  const body = `
<section class="detail">
  <div class="wrap">
    <div class="detail-grid">
      <div>
        <div class="detail-head">
          <div class="pill-row">
            <span class="pill pill-cat">${esc(c[lang].name)}</span>
            ${s.popular ? `<span class="pill pill-pop">${esc(t.common.popular)}</span>` : ''}
            ${shPill(lang, s)}
          </div>
          <h1>${esc(d.name)}</h1>
          ${alt ? `<p class="alt">${esc(alt)}</p>` : ''}
          <p class="lede">${esc(d.short)}</p>
        </div>

        ${sibling ? `<div class="note is-warn">
          <p class="note-h">${esc(t.common.shareholderType)}</p>
          <p>${esc(lang === 'np'
            ? (s.shareholder === 'single'
              ? 'तपाईंको कम्पनीमा दुई वा बढी शेयरधनी हुनुहुन्छ भने यो होइन —'
              : 'तपाईंको कम्पनीमा एक जना मात्र शेयरधनी हुनुहुन्छ भने यो होइन —')
            : (s.shareholder === 'single'
              ? 'If your company has two or more shareholders, this is not the right one —'
              : 'If your company has only one shareholder, this is not the right one —'))}
            <a href="${attr(href(lang, sibling.slug))}">${esc(sibling[lang].name)}</a></p>
        </div>` : ''}

        <div class="block">
          <h2>${esc(t.common.whoFor)}</h2>
          <p class="prose">${esc(d.who)}</p>
        </div>

        <div class="block">
          <h2>${esc(t.common.included)}</h2>
          <ul class="checks">${d.includes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>

        ${s.variants ? `<div class="block">
          <h2>${esc(t.common.variants)}</h2>
          <div class="variants">${s.variants[lang].map(v => `<div><b>${esc(v.k)}</b><span>${esc(v.v)}</span></div>`).join('')}</div>
        </div>` : ''}

        <div class="block">
          <h2>${esc(t.common.youProvide)}</h2>
          <ul>${d.provide.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>

        <div class="block">
          <h2>${esc(t.common.youReceive)}</h2>
          <ul class="checks">${d.receive.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>

        ${d.notes && d.notes.length ? `<div class="block">
          <h2>${esc(t.common.importantNotes)}</h2>
          <div class="note is-warn"><ul>${d.notes.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
        </div>` : ''}

        ${s.faq && s.faq.length ? `<div class="block">
          <h2>${esc(t.common.faqTitle)}</h2>
          ${faqBlock(lang, s.faq)}
        </div>` : ''}

        ${rel.length ? `<div class="block">
          <h2>${esc(t.common.relatedServices)}</h2>
          <div class="chip-links">${rel.map(r => `<a href="${attr(href(lang, r.slug))}">${esc(r[lang].name)}</a>`).join('')}</div>
        </div>` : ''}

        ${relGuides.length ? `<div class="block">
          <h2>${esc(t.common.relatedGuides)}</h2>
          <div class="chip-links">${relGuides.map(g => `<a href="${attr(href(lang, g.slug))}">${esc(g[lang].title)}</a>`).join('')}</div>
        </div>` : ''}
      </div>

      <aside class="detail-side">
        <div class="buy">
          <p class="price-lbl">${esc(t.common.from)}</p>
          <p class="price-big">${esc(money(s.price))}</p>
          <p class="price-note">${esc(t.pricing.varyNote)}</p>
          <a class="btn btn-primary btn-block" href="${attr(orderHref(lang, d.name))}">${esc(t.cta.primary)}</a>
          <a class="btn btn-outline btn-block" href="${attr(href(lang, 'contact'))}">${esc(t.cta.secondary)}</a>
          <dl class="kv mt-24">
            <div><dt>${esc(t.common.time)}</dt><dd>${esc(s.time[lang])}</dd></div>
            <div><dt>${esc(t.common.office)}</dt><dd>${esc(c.office)}</dd></div>
            <div><dt>${esc(t.common.shareholderType)}</dt><dd>${esc(s.shareholder === 'single' ? t.common.single : s.shareholder === 'multiple' ? t.common.multiple : t.common.bothTypes)}</dd></div>
          </dl>
          <div class="contact-mini">
            <span>${esc(t.contact.phone)}</span>
            <a href="${attr(telHref())}">${esc(phoneText(lang))}</a>
            <a href="mailto:${attr(site.contact.email)}">${esc(site.contact.email)}</a>
          </div>
        </div>
        <div class="note is-ok" style="margin-top:16px">
          <p class="note-h">${esc(t.pricing.govFeeTitle)}</p>
          <p>${esc(t.pricing.govFeeNote)}</p>
        </div>
      </aside>
    </div>
  </div>
</section>

${contactBand(lang)}`;

  return page({
    lang, slug: s.slug, orderName: d.name,
    trail: [
      { label: t.common.services, slug: 'services' },
      { label: c[lang].name, slug: c.slug },
      { label: d.name }
    ],
    title: d.metaTitle + ' | KagajSewa',
    desc: d.metaDesc,
    body,
    ogType: 'website',
    schema: [
      {
        '@type': 'Service',
        name: d.name,
        alternateName: alt || undefined,
        serviceType: c[lang].name,
        description: d.short,
        provider: { '@id': site.siteUrl + '/#org' },
        areaServed: { '@type': 'Country', name: 'Nepal' },
        url: abs(lang, s.slug),
        offers: {
          '@type': 'Offer',
          price: String(s.price),
          priceCurrency: 'NPR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: String(s.price),
            priceCurrency: 'NPR',
            valueAddedTaxIncluded: false,
            description: lang === 'np' ? 'सुरुवाती मूल्य — सरकारी दस्तुर समावेश छैन' : 'Starting price — government fees not included'
          }
        }
      },
      faqSchema(lang, s.faq)
    ]
  });
}

function guidesIndexPage(lang) {
  const t = ui[lang];
  const list = [...guides].sort((a, b) => a.order - b.order);
  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.nav.guides)}</p>
      <h1>${esc(lang === 'np' ? 'सरकारी प्रक्रिया गाइड' : 'Government process guides')}</h1>
      <p>${esc(lang === 'np'
        ? 'कम्पनी दर्ता, अद्यावधिक, शेयर नामसारी र कर सम्बन्धी प्रक्रिया सरल भाषामा। सबै नि:शुल्क। प्रत्येक गाइडमा अन्तिम अद्यावधिक मिति र सम्बन्धित सरकारी स्रोत उल्लेख गरिएको छ।'
        : 'The company registration, update, share transfer and tax processes in plain language. All free. Every guide carries the date it was last updated and a link to the official source.')}</p>
    </div>
    <div class="grid grid-3">
      ${list.map(g => `<a class="card" href="${attr(href(lang, g.slug))}">
        <h3 class="svc-name">${esc(g[lang].title)}</h3>
        <p class="svc-desc">${esc(g[lang].metaDesc)}</p>
        <span class="lnk">${esc(t.common.readGuide)} ${icon('arrow', 15, 2)}</span>
      </a>`).join('')}
    </div>
  </div>
</section>
${contactBand(lang)}`;

  return page({
    lang, slug: 'guides',
    trail: [{ label: t.common.guides, slug: 'guides' }],
    title: lang === 'np'
      ? 'सरकारी प्रक्रिया गाइड | कम्पनी दर्ता, अद्यावधिक र कर | कागज सेवा'
      : 'Government Process Guides | Company Registration, Updates and Tax | KagajSewa',
    desc: lang === 'np'
      ? 'नेपालमा कम्पनी दर्ता, वार्षिक अद्यावधिक, शेयर नामसारी, नाम–ठेगाना परिवर्तन, PAN र कर चुक्ता प्रक्रियाबारे नि:शुल्क गाइड।'
      : 'Free guides to company registration, annual updates, share transfer, name and address change, PAN and tax clearance processes in Nepal.',
    body,
    schema: [organizationSchema(lang)]
  });
}

function guidePage(lang, g) {
  const t = ui[lang];
  const d = g[lang];
  const relS = (g.relatedServices || []).map(byId).filter(Boolean);
  const relG = (g.relatedGuides || []).map(guideBySlug).filter(Boolean);

  const sectionHtml = sec => {
    let h = `<div class="block"><h2>${esc(sec.h)}</h2>`;
    if (sec.p) h += sec.p.map(p => `<p class="prose">${esc(p)}</p>`).join('');
    if (sec.steps) h += `<ol class="steps-num">${sec.steps.map(s => `<li><b>${esc(s.k)}</b>${esc(s.v)}</li>`).join('')}</ol>`;
    if (sec.list) h += `<ul>${sec.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    if (sec.note) h += `<div class="note"><p>${esc(sec.note)}</p></div>`;
    h += '</div>';
    return h;
  };

  const srcLabel = src => (lang === 'np' ? src.label : src.labelEn);

  const body = `
<article class="detail">
  <div class="wrap">
    <div class="detail-grid">
      <div>
        <div class="detail-head">
          <p class="eyebrow">${esc(t.nav.guides)}</p>
          <h1>${esc(d.title)}</h1>
        </div>
        <div class="guide-meta">
          <span>${esc(t.common.updated)}: <span class="tabnum">${esc(g.updated)}</span></span>
          ${g.sources && g.sources.length ? `<span>${esc(t.common.sources)}: ${g.sources.map(s => `<a href="${attr(s.url)}" rel="noopener nofollow" target="_blank">${esc(srcLabel(s))}</a>`).join(', ')}</span>` : ''}
        </div>
        <p class="prose" style="font-size:1.03rem">${esc(d.intro)}</p>
        ${d.sections.map(sectionHtml).join('')}

        <div class="note is-warn mt-32">
          <p class="note-h">${esc(lang === 'np' ? 'ध्यान दिनुहोस्' : 'Please note')}</p>
          <p>${esc(lang === 'np'
            ? 'सरकारी प्रक्रिया, दस्तुर र म्याद समय-समयमा परिवर्तन हुन्छन्। यो गाइड माथि उल्लेखित मितिमा अद्यावधिक गरिएको हो। निर्णय गर्नुअघि सम्बन्धित कार्यालय वा आफ्नो लेखापरीक्षकसँग हालको अवस्था पक्का गर्नुहोस्। यो कानुनी सल्लाह होइन।'
            : 'Government procedures, fees and deadlines change. This guide was updated on the date shown above. Confirm the current position with the relevant office or your auditor before acting on it. This is not legal advice.')}</p>
        </div>

        ${relG.length ? `<div class="block">
          <h2>${esc(t.common.relatedGuides)}</h2>
          <div class="chip-links">${relG.map(x => `<a href="${attr(href(lang, x.slug))}">${esc(x[lang].title)}</a>`).join('')}</div>
        </div>` : ''}
      </div>

      <aside class="detail-side">
        ${relS.length ? `<div class="buy">
          <p class="price-lbl">${esc(t.common.relatedServices)}</p>
          <ul class="list-plain mt-24" style="margin-top:10px">
            ${relS.map(r => `<li><a href="${attr(href(lang, r.slug))}"><b>${esc(r[lang].name)}</b></a><br><span class="muted" style="font-size:.82rem">${esc(priceLine(lang, r.price))}</span></li>`).join('')}
          </ul>
          <a class="btn btn-primary btn-block" href="${attr(href(lang, 'contact'))}">${esc(t.cta.primary)}</a>
          <div class="contact-mini">
            <span>${esc(t.contact.phone)}</span>
            <a href="${attr(telHref())}">${esc(phoneText(lang))}</a>
          </div>
        </div>` : ''}
      </aside>
    </div>
  </div>
</article>

${contactBand(lang)}`;

  return page({
    lang, slug: g.slug, ogType: 'article',
    trail: [{ label: t.common.guides, slug: 'guides' }, { label: d.title }],
    title: d.metaTitle + ' | KagajSewa',
    desc: d.metaDesc,
    body,
    schema: [{
      '@type': 'Article',
      headline: d.title,
      description: d.metaDesc,
      inLanguage: HTML_LANG[lang],
      dateModified: g.updated,
      datePublished: g.updated,
      author: { '@id': site.siteUrl + '/#org' },
      publisher: { '@id': site.siteUrl + '/#org' },
      mainEntityOfPage: abs(lang, g.slug)
    }]
  });
}

function faqPage(lang) {
  const t = ui[lang];
  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.nav.faq)}</p>
      <h1>${esc(t.home.faqH)}</h1>
      <p>${esc(t.home.faqSub)}</p>
    </div>
    ${faqBlock(lang, faq)}
  </div>
</section>
${contactBand(lang)}`;

  return page({
    lang, slug: 'faq',
    trail: [{ label: t.nav.faq }],
    title: lang === 'np'
      ? 'बारम्बार सोधिने प्रश्न | कम्पनी दर्ता, अद्यावधिक र भुक्तानी | कागज सेवा'
      : 'Frequently Asked Questions | Registration, Updates and Payment | KagajSewa',
    desc: lang === 'np'
      ? 'कम्पनी दर्ता कति समय लाग्छ, एकल र बहुल शेयरधनीमा के फरक छ, सरकारी शुल्क समावेश छ कि छैन — कागज सेवाबारे बारम्बार सोधिने प्रश्नका जवाफ।'
      : 'How long registration takes, the difference between single and multiple shareholder companies, whether government fees are included, and other common questions about KagajSewa.',
    body,
    schema: [faqSchema(lang, faq)]
  });
}

function howPage(lang) {
  const t = ui[lang];
  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.nav.how)}</p>
      <h1>${esc(t.home.howH)}</h1>
      <p>${esc(t.home.howSub)}</p>
    </div>
    <ol class="steps">
      ${t.steps.map((s, i) => `<li><span class="step-n">${i + 1}</span><div class="step-b"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div></li>`).join('')}
    </ol>
    <div class="note is-warn mt-32">
      <p class="note-h">${esc(lang === 'np' ? 'पेस गर्ने काम तपाईंकै' : 'You do the submitting')}</p>
      <p>${esc(lang === 'np'
        ? 'कागज सेवाले कागजात तयार गर्छ। हस्ताक्षर, छाप र सम्बन्धित कार्यालयमा पेस गर्ने काम तपाईं वा तपाईंले अख्तियार दिनुभएको व्यक्तिले गर्नुपर्छ। भविष्यमा कुनै सेवामा यसभन्दा फरक व्यवस्था भएमा त्यो सेवामै स्पष्ट लेखिनेछ।'
        : 'KagajSewa prepares the documents. Signing, stamping and submitting at the office are done by you or someone you authorise. If any future service works differently, that service page will say so explicitly.')}</p>
    </div>
  </div>
</section>

<section class="sec sec-soft">
  <div class="wrap">
    <div class="sec-head"><h2>${esc(t.pricing.h)}</h2></div>
    ${pricingBlock(lang)}
  </div>
</section>
${contactBand(lang)}`;

  return page({
    lang, slug: 'how-it-works',
    trail: [{ label: t.nav.how }],
    title: lang === 'np' ? 'कसरी काम गर्छ | कागज सेवा' : 'How It Works | KagajSewa',
    desc: lang === 'np'
      ? 'कागज सेवाबाट कागजात तयार गराउने तीन चरण, मूल्य कसरी तय हुन्छ र सरकारी दस्तुर किन छुट्टै हो भन्ने जानकारी।'
      : 'The three steps to getting documents prepared by KagajSewa, how pricing works, and why government fees are separate.',
    body
  });
}

function whyPage(lang) {
  const t = ui[lang];
  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.nav.why)}</p>
      <h1>${esc(t.home.whyH)}</h1>
      <p>${esc(t.home.whySub)}</p>
    </div>
    <div class="why-grid">
      ${t.why.map(w => `<div class="why-item"><div class="why-ico">${icon(w.i, 19)}</div><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div>`).join('')}
    </div>
    <div class="note mt-32">
      <p class="note-h">${esc(lang === 'np' ? 'हामी के गर्दैनौं' : 'What we do not do')}</p>
      <p>${esc(t.disclaimer)}</p>
    </div>
  </div>
</section>
${contactBand(lang)}`;

  return page({
    lang, slug: 'why-kagajsewa',
    trail: [{ label: t.nav.why }],
    title: lang === 'np' ? 'किन कागज सेवा | Word फाइल, बिक्रम सम्बत् र स्पष्ट मूल्य' : 'Why KagajSewa | Word Files, Bikram Sambat and Clear Pricing',
    desc: lang === 'np'
      ? 'बिक्रम सम्बत् मिति, सम्पादन योग्य Word फाइल, म्याद सम्झना र स्पष्ट मूल्य — कागज सेवाले के फरक गर्छ र के गर्दैन।'
      : 'Bikram Sambat dates, editable Word files, deadline reminders and clear pricing — what KagajSewa does differently, and what it does not do.',
    body
  });
}

function contactPage(lang) {
  const t = ui[lang];
  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(t.contact.h)}</p>
      <h1>${esc(t.home.contactH)}</h1>
      <p>${esc(t.home.contactSub)}</p>
    </div>
    <div class="contact-grid">
      <div>
        <div class="note is-ok">
          <p class="note-h">${esc(lang === 'np' ? 'सजिलो' : 'Simple')}</p>
          <p>${esc(t.hero.noAccount)}</p>
        </div>
        <div class="block">
          <h2>${esc(t.contact.what)}</h2>
          <ul class="checks">${t.contact.whatList.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          <p class="prose">${esc(lang === 'np'
            ? 'दर्ता प्रमाणपत्र वा गत वर्षको फाइलको फोटो पठाउन सक्नुहुन्छ भने अझ छिटो हुन्छ।'
            : 'If you can send a photo of your registration certificate or last year’s filing, it goes faster.')}</p>
        </div>
        <div class="block">
          <h2>${esc(t.pricing.h)}</h2>
          <div class="note is-warn">
            <p class="note-h">${esc(t.pricing.govFeeTitle)}</p>
            <p>${esc(t.pricing.govFeeNote)}</p>
          </div>
          <p class="prose">${esc(t.pricing.payNote)}</p>
        </div>
      </div>
      <div>
        <a class="ccard" style="background:var(--brand);border-color:var(--brand)" href="${attr(telHref())}">
          <span class="ccard-ico">${icon('phone', 19)}</span>
          <span><span class="ccard-lbl">${esc(t.contact.phone)}</span><br><span class="ccard-val">${esc(phoneText(lang))}</span></span>
        </a>
        <a class="ccard" style="background:var(--brand);border-color:var(--brand)" href="${attr(waHref())}" rel="noopener">
          <span class="ccard-ico">${icon('wa', 19)}</span>
          <span><span class="ccard-lbl">WhatsApp</span><br><span class="ccard-val">${esc(phoneText(lang))}</span></span>
        </a>
        <a class="ccard" style="background:var(--brand);border-color:var(--brand)" href="mailto:${attr(site.contact.email)}">
          <span class="ccard-ico">${icon('mail', 19)}</span>
          <span><span class="ccard-lbl">${esc(t.contact.email)}</span><br><span class="ccard-val">${esc(site.contact.email)}</span></span>
        </a>
        <dl class="kv mt-24">
          <div><dt>${esc(t.contact.hours)}</dt><dd>${esc(lang === 'np' ? site.contact.hoursNp : site.contact.hoursEn)}</dd></div>
          <div><dt>${esc(t.contact.reply)}</dt><dd>${esc(lang === 'np' ? site.contact.replyNp : site.contact.replyEn)}</dd></div>
          <div><dt>${esc(t.contact.payment)}</dt><dd>${esc(site.payment.join(' · '))}</dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>`;

  return page({
    lang, slug: 'contact',
    trail: [{ label: t.nav.contact }],
    title: lang === 'np' ? 'सम्पर्क | कागज सेवा | फोन, WhatsApp र इमेल' : 'Contact KagajSewa | Phone, WhatsApp and Email',
    desc: lang === 'np'
      ? 'कागज सेवासँग फोन, Viber, WhatsApp वा इमेलमार्फत सम्पर्क गर्नुहोस्। खाता चाहिँदैन, फारम भर्नु पर्दैन — के चाहिन्छ भन्नुहोस्, मूल्य र समय तुरुन्तै।'
      : 'Contact KagajSewa by phone, Viber, WhatsApp or email. No account, no forms — tell us what you need and get a price and turnaround time straight back.',
    body
  });
}

function legalPage(lang, item) {
  const t = ui[lang];
  const d = item[lang];
  const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head"><h1>${esc(d.title)}</h1></div>
    <div class="prose">
      ${d.sections.map(s => `<div class="block"><h2>${esc(s.h)}</h2>
        ${s.p ? s.p.map(p => `<p>${esc(p)}</p>`).join('') : ''}
        ${s.list ? `<ul>${s.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>
${contactBand(lang)}`;

  return page({
    lang, slug: item.slug,
    trail: [{ label: d.title }],
    title: d.metaTitle,
    desc: d.metaDesc,
    body,
    schema: item.slug === 'about' ? [organizationSchema(lang)] : []
  });
}

function notFoundPage(lang) {
  const t = ui[lang];
  const body = `
<section class="nf">
  <div class="wrap">
    <p class="code tabnum">404</p>
    <h1>${esc(t.notFound.h)}</h1>
    <p>${esc(t.notFound.p)}</p>
    ${searchBlock(lang, { hint: false })}
    <div class="btn-row" style="justify-content:center;margin-top:22px">
      <a class="btn btn-primary" href="${attr(href(lang, ''))}">${esc(t.cta.backHome)}</a>
      <a class="btn btn-outline" href="${attr(href(lang, 'services'))}">${esc(t.cta.viewAll)}</a>
    </div>
  </div>
</section>`;

  return page({
    // 404.html sits at the root of its language, not in a /404/ directory.
    lang, slug: '404', noindex: true, withSearch: true, is404: true,
    depth: lang === 'en' ? 0 : 1,
    title: t.notFound.metaTitle,
    desc: t.notFound.p,
    body
  });
}

/* ------------------------------------------------------------------ run */

function build() {
  const urls = [];
  let count = 0;

  const emit = (lang, slug, html, priority, changefreq) => {
    write(outPath(lang, slug), html);
    urls.push({ lang, slug, priority, changefreq });
    count++;
  };

  for (const lang of LANGS) {
    emit(lang, '', homePage(lang), '1.0', 'weekly');
    emit(lang, 'services', servicesIndexPage(lang), '0.9', 'weekly');
    emit(lang, 'services/single-shareholder', shareholderIndexPage(lang, 'single'), '0.9', 'monthly');
    emit(lang, 'services/multiple-shareholder', shareholderIndexPage(lang, 'multiple'), '0.9', 'monthly');

    for (const c of sortedCats) emit(lang, c.slug, categoryPage(lang, c), '0.8', 'monthly');
    for (const s of services) emit(lang, s.slug, servicePage(lang, s), '0.9', 'monthly');

    emit(lang, 'guides', guidesIndexPage(lang), '0.8', 'monthly');
    for (const g of guides) emit(lang, g.slug, guidePage(lang, g), '0.7', 'monthly');

    emit(lang, 'faq', faqPage(lang), '0.7', 'monthly');
    emit(lang, 'how-it-works', howPage(lang), '0.6', 'yearly');
    emit(lang, 'why-kagajsewa', whyPage(lang), '0.6', 'yearly');
    emit(lang, 'contact', contactPage(lang), '0.8', 'yearly');
    for (const item of legal) emit(lang, item.slug, legalPage(lang, item), '0.3', 'yearly');
  }

  /* 404 — GitHub Pages serves /404.html for any missing path. English default. */
  write(path.join(ROOT, '404.html'), notFoundPage('en'));
  write(path.join(ROOT, 'ne', '404.html'), notFoundPage('np'));
  count += 2;

  /* assets */
  const assetDir = path.join(ROOT, 'assets');
  fs.mkdirSync(assetDir, { recursive: true });
  for (const f of fs.readdirSync(path.join(SRC, 'assets'))) {
    fs.copyFileSync(path.join(SRC, 'assets', f), path.join(assetDir, f));
  }

  /* sitemap with hreflang alternates */
  const seen = new Set();
  const entries = urls.filter(u => {
    const k = u.lang + '|' + u.slug;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const today = new Date().toISOString().slice(0, 10);
  const sm = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
  ];
  for (const u of entries) {
    sm.push('  <url>');
    sm.push(`    <loc>${esc(abs(u.lang, u.slug))}</loc>`);
    sm.push(`    <xhtml:link rel="alternate" hreflang="ne" href="${esc(abs('np', u.slug))}"/>`);
    sm.push(`    <xhtml:link rel="alternate" hreflang="en" href="${esc(abs('en', u.slug))}"/>`);
    sm.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs('en', u.slug))}"/>`);
    sm.push(`    <lastmod>${today}</lastmod>`);
    sm.push(`    <changefreq>${u.changefreq}</changefreq>`);
    sm.push(`    <priority>${u.priority}</priority>`);
    sm.push('  </url>');
  }
  sm.push('</urlset>');
  write(path.join(ROOT, 'sitemap.xml'), sm.join('\n'));

  write(path.join(ROOT, 'robots.txt'),
`User-agent: *
Allow: /

Sitemap: ${site.siteUrl}/sitemap.xml
`);

  write(path.join(ROOT, '.nojekyll'), '');

  /* CNAME — GitHub Pages drops the custom domain if this file disappears,
     so it is regenerated on every build rather than left to chance. */
  if (site.customDomain) write(path.join(ROOT, 'CNAME'), site.customDomain + '\n');

  console.log(`KagajSewa build complete`);
  console.log(LOCAL
    ? '  MODE: local  — links end in index.html so you can browse by double-clicking.\n         Run "npm run build" before pushing to GitHub.'
    : '  MODE: deploy — clean URLs like /services/. This is what you push to GitHub.\n         Run "npm run build:local" if you want to click around offline.');
  console.log(`  ${count} pages  ·  ${services.length} services  ·  ${guides.length} guides  ·  ${categories.length} categories`);
  console.log(`  sitemap: ${entries.length} URLs`);
  console.log(`  site URL: ${site.siteUrl}${site.basePath || ''}/`);
  if (site.contact.phoneDial.indexOf('X') > -1) {
    console.log('\n  ⚠  Phone number is still a placeholder — edit src/data/site.js');
  }
}

build();
