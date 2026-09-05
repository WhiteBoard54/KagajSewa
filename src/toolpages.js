/* ============================================================================
   Page builders for the in-site document generator.

   Kept in its own file so build.js stays readable. Exports two functions that
   build.js calls with its own helpers passed in — that keeps all the URL,
   escaping and layout logic in one place rather than duplicated here.
   ========================================================================== */

'use strict';

const { templates } = require('./data/doc-templates');

/** Fiscal years offered in the दर्ता आर्थिक वर्ष dropdown, newest first. */
function fiscalYears(from, to) {
  const out = [];
  for (let y = to; y >= from; y--) out.push(y + '/' + String((y + 1) % 100).padStart(2, '0'));
  return out;
}

const BS_MONTHS_NP = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
                      'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'];
const BS_MONTHS_EN = ['Baishakh', 'Jestha', 'Ashar', 'Shrawan', 'Bhadra', 'Ashoj',
                      'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];

const DEV = ['०','१','२','३','४','५','६','७','८','९'];
const npNum = s => String(s).replace(/[0-9]/g, d => DEV[+d]);

/**
 * Build everything the tool pages need.
 * @param {object} api helpers handed over from build.js
 */
function makeToolPages(api) {
  const { esc, attr, href, abs, icon, page, ui, site, asset, contactBand,
          byId, serviceCard, HTML_LANG } = api;

  /* ------------------------------------------------------------ form parts */

  function fieldHtml(lang, f) {
    const L = f[lang] || {};
    const id = 'f_' + f.k;
    const req = f.req ? '<span class="req" aria-hidden="true">*</span>' : '';
    const help = L.help ? `<span class="help">${esc(L.help)}</span>` : '';
    const ph = L.p ? ` placeholder="${attr(L.p)}"` : '';
    const rq = f.req ? ' required' : '';
    let control = '';

    if (f.t === 'fiscalYear') {
      const opts = fiscalYears(2070, 2090)
        .map(y => `<option value="${attr(y)}">${esc(lang === 'np' ? npNum(y) : y)}</option>`).join('');
      control = `<select id="${id}"${rq}><option value="">${esc(lang === 'np' ? 'आर्थिक वर्ष छान्नुहोस्' : 'Select fiscal year')}</option>${opts}</select>`;

    } else if (f.t === 'bsdate') {
      const months = (lang === 'np' ? BS_MONTHS_NP : BS_MONTHS_EN)
        .map((m, i) => `<option value="${String(i + 1).padStart(2, '0')}">${esc(m)}</option>`).join('');
      const years = [];
      for (let y = 2090; y >= 2070; y--) years.push(`<option value="${y}">${esc(lang === 'np' ? npNum(y) : y)}</option>`);
      control =
        `<div class="bsdate">
           <select id="${id}_y"${rq}><option value="">${esc(lang === 'np' ? 'वर्ष' : 'Year')}</option>${years.join('')}</select>
           <select id="${id}_m"${rq}><option value="">${esc(lang === 'np' ? 'महिना' : 'Month')}</option>${months}</select>
           <select id="${id}_d"${rq}><option value="">${esc(lang === 'np' ? 'गते' : 'Day')}</option></select>
         </div>`;

    } else if (f.t === 'address') {
      control =
        `<input type="text" id="${id}"${rq}${ph} autocomplete="off">
         <div class="addr-picker">
           <select id="addr_p"><option value="">${esc(lang === 'np' ? 'प्रदेश' : 'Province')}</option></select>
           <select id="addr_d" disabled><option value="">${esc(lang === 'np' ? 'जिल्ला' : 'District')}</option></select>
           <select id="addr_l" disabled><option value="">${esc(lang === 'np' ? 'स्थानीय तह' : 'Local body')}</option></select>
           <select id="addr_w" disabled><option value="">${esc(lang === 'np' ? 'वडा' : 'Ward')}</option></select>
         </div>
         <p class="addr-warn" id="addrWarn" hidden></p>`;

    } else if (f.suffix) {
      control =
        `<div class="with-suffix">
           <input type="text" id="${id}"${rq}${ph} autocomplete="off">
           <span class="sfx">${esc(f.suffix)}</span>
         </div>`;

    } else {
      const type = f.t === 'time' ? 'time' : f.t === 'email' ? 'email' : f.t === 'tel' ? 'tel' : 'text';
      const def = f.def ? ` value="${attr(f.def)}"` : '';
      control = `<input type="${type}" id="${id}"${rq}${ph}${def} autocomplete="off">`;
    }

    return `<div class="fld"><label for="${id}">${esc(L.l || f.k)}${req}</label>${control}${help}</div>`;
  }

  /** Pair consecutive half-width fields into two-column rows. */
  function groupRows(lang, fields) {
    const out = [];
    let buf = [];
    const flush = () => {
      if (!buf.length) return;
      out.push(`<div class="frow two">${buf.join('')}</div>`);
      buf = [];
    };
    fields.forEach(f => {
      if (f.half) {
        buf.push(fieldHtml(lang, f));
        if (buf.length === 2) flush();
      } else {
        flush();
        out.push(`<div class="frow">${fieldHtml(lang, f)}</div>`);
      }
    });
    flush();
    return out.join('');
  }

  /* ------------------------------------------------------------- tool page */

  function toolPage(lang, tpl) {
    const t = ui[lang];
    const d = tpl[lang];
    const svc = tpl.serviceId ? byId(tpl.serviceId) : null;

    const groups = tpl.groups.map(g => {
      const fields = tpl.fields.filter(f => f.g === g.id);
      if (!fields.length) return '';
      return `<section class="fgroup">
        <h2>${esc(g[lang])}</h2>
        ${groupRows(lang, fields)}
      </section>`;
    }).join('');

    /* Only what the browser needs — labels resolved, render serialised. */
    const clientDoc = {
      id: tpl.id,
      lang,
      adminUrl: asset('nepal-admin.json'),
      fields: tpl.fields.map(f => ({
        k: f.k, t: f.t, req: !!f.req, label: (f[lang] || {}).l || f.k
      }))
    };

    const body = `
<section class="wrap tool-head">
  <h1>${esc(d.name)}</h1>${tpl.price === 0 ? `<span class="badge-free">${esc(lang === 'np' ? 'नि:शुल्क' : 'FREE')}</span>` : ''}
  <p class="lede">${esc(d.short)}</p>
</section>

<div class="wrap stage" id="stage" data-view="form">

  <div class="view-form">
    <form class="form-card" id="docForm" novalidate>
      ${groups}
      <p class="form-err" id="formErr" hidden></p>
      <div class="form-foot">
        <div class="left">
          <button type="button" class="btn btn-outline btn-sm" id="btnClear">${esc(lang === 'np' ? 'सबै मेटाउनुहोस्' : 'Clear all')}</button>
          <span id="savedNote"></span>
        </div>
        <button type="submit" class="btn btn-primary">${esc(lang === 'np' ? 'कागजात बनाउनुहोस्' : 'Generate document')}</button>
      </div>
    </form>

    <p class="privacy-note">${icon('shield', 17)}<span>${esc(lang === 'np'
      ? 'तपाईंले भर्नुभएको विवरण तपाईंकै ब्राउजरमा मात्र रहन्छ। कुनै पनि विवरण हामीकहाँ पठाइँदैन।'
      : 'Everything you type stays in your own browser. None of it is sent to us.')}</span></p>
  </div>

  <div class="view-doc">
    <div class="doc-bar">
      <button type="button" class="btn btn-outline btn-sm" id="btnBack">${esc(lang === 'np' ? '← फेरि सम्पादन गर्नुहोस्' : '← Edit again')}</button>
      <span class="ref">${esc(lang === 'np' ? 'सन्दर्भ नं.' : 'Reference')} <b id="docRef"></b></span>
      <button type="button" class="btn btn-primary btn-sm" id="btnPrint">${esc(lang === 'np' ? 'छाप्नुहोस् / PDF सुरक्षित गर्नुहोस्' : 'Print / Save as PDF')}</button>
    </div>
    <article class="paper" id="docBody"></article>
    <div class="note is-warn" style="max-width:820px;margin:18px auto 0">
      <p class="note-h">${esc(lang === 'np' ? 'पेस गर्नुअघि' : 'Before you submit')}</p>
      <p>${esc(lang === 'np'
        ? 'कागजात राम्ररी पढ्नुहोस्, नाम–मिति जाँच्नुहोस्, छापेर हस्ताक्षर र कम्पनीको छाप लगाई सम्बन्धित कार्यालय वा बैंकमा आफैं पेस गर्नुहोस्। यो कानुनी सल्लाह होइन।'
        : 'Read the document through, check the names and dates, then print it, sign it, add the company stamp and submit it yourself. This is not legal advice.')}</p>
    </div>
  </div>
</div>

${svc ? `<section class="sec sec-soft">
  <div class="wrap">
    <div class="sec-head"><h2>${esc(lang === 'np' ? 'यो आफैं गर्न मन छैन?' : 'Rather not do it yourself?')}</h2>
    <p>${esc(lang === 'np'
      ? 'तपाईंको अवस्थाअनुसार जाँचेर, अन्य आवश्यक कागजातसहित हामी तयार गरिदिन्छौं।'
      : 'We will prepare it for your exact situation, checked and bundled with whatever else the filing needs.')}</p></div>
    <div class="grid grid-3">${serviceCard(lang, svc)}</div>
  </div>
</section>` : ''}

${contactBand(lang)}`;

    return page({
      lang, slug: tpl.slug,
      trail: [{ label: t.nav.tools, slug: 'tools' }, { label: d.name }],
      title: d.metaTitle + ' | KagajSewa',
      desc: d.metaDesc,
      body,
      head: `<link rel="stylesheet" href="${attr(asset('docgen.css'))}">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;600;700&display=swap">`,
      foot: `<script>window.KS_DOC=${JSON.stringify(clientDoc).replace(/</g, '\\u003c')};
window.KS_DOC.render=${JSON.stringify(tpl.render.toString())};</script>
<script src="${attr(asset('docgen.js'))}" defer></script>`,
      schema: [{
        '@type': 'WebApplication',
        name: d.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        url: abs(lang, tpl.slug),
        description: d.short,
        inLanguage: HTML_LANG[lang],
        offers: { '@type': 'Offer', price: String(tpl.price), priceCurrency: 'NPR' },
        provider: { '@id': site.siteUrl + '/#org' }
      }]
    });
  }

  /* ------------------------------------------------------------ tool index */

  function toolsIndexPage(lang) {
    const t = ui[lang];
    const list = [...templates].sort((a, b) => a.order - b.order);

    const cards = list.map(tpl => {
      const d = tpl[lang];
      return `<a class="card" href="${attr(href(lang, tpl.slug))}">
        <div class="pill-row">
          ${tpl.price === 0 ? `<span class="pill pill-multi">${esc(lang === 'np' ? 'नि:शुल्क' : 'FREE')}</span>` : ''}
          ${tpl.shareholder === 'single' ? `<span class="pill pill-single">${esc(t.common.single)}</span>` : ''}
          ${tpl.shareholder === 'multiple' ? `<span class="pill pill-multi">${esc(t.common.multiple)}</span>` : ''}
        </div>
        <h3 class="svc-name">${esc(d.name)}</h3>
        <p class="svc-desc">${esc(d.short)}</p>
        <span class="lnk">${esc(lang === 'np' ? 'बनाउनुहोस्' : 'Generate')} ${icon('arrow', 15, 2)}</span>
      </a>`;
    }).join('');

    const body = `
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(lang === 'np' ? 'नि:शुल्क' : 'Free')}</p>
      <h1>${esc(lang === 'np' ? 'आफैं कागजात बनाउनुहोस्' : 'Generate documents yourself')}</h1>
      <p>${esc(lang === 'np'
        ? 'विवरण भर्नुहोस्, कागजात तुरुन्तै तयार हुन्छ — छाप्नुहोस्, हस्ताक्षर गर्नुहोस्, पेस गर्नुहोस्। खाता चाहिँदैन र तपाईंको विवरण तपाईंकै ब्राउजरबाट बाहिर जाँदैन।'
        : 'Fill in the details and the document is ready immediately — print it, sign it, submit it. No account needed, and nothing you type leaves your browser.')}</p>
    </div>
    <div class="grid grid-3">${cards}</div>

    <div class="note mt-32" style="max-width:70ch">
      <p class="note-h">${esc(lang === 'np' ? 'यहाँ नभएको कागजात चाहियो?' : 'Need something not here yet?')}</p>
      <p>${esc(lang === 'np'
        ? 'अहिलेलाई केही कागजात मात्र आफैं बनाउन मिल्छ। बाँकी सबै सेवा हामीबाट लिन सक्नुहुन्छ — सम्पर्क गर्नुहोस्।'
        : 'Only a few documents can be self-generated so far. Everything else we prepare for you — just get in touch.')} <a href="${attr(href(lang, 'services'))}">${esc(t.cta.viewAll)}</a></p>
    </div>
  </div>
</section>
${contactBand(lang)}`;

    return page({
      lang, slug: 'tools',
      trail: [{ label: t.nav.tools }],
      title: lang === 'np'
        ? 'नि:शुल्क कागजात जेनेरेटर | माइन्युट र निवेदन आफैं बनाउनुहोस् | कागज सेवा'
        : 'Free Nepali Document Generator | Make Minutes and Applications | KagajSewa',
      desc: lang === 'np'
        ? 'कम्पनीका माइन्युट र निवेदन आफैं अनलाइन बनाउनुहोस् — नि:शुल्क, खाता नचाहिने, विवरण तपाईंकै ब्राउजरमा सुरक्षित।'
        : 'Generate Nepali company minutes and applications online for free. No account, and your details never leave your browser.',
      body,
      head: `<link rel="stylesheet" href="${attr(asset('docgen.css'))}">`
    });
  }

  return { toolPage, toolsIndexPage, templates };
}

module.exports = { makeToolPages, templates };
