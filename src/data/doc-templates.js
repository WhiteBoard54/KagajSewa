/* ============================================================
   DOCUMENT TEMPLATES  —  the in-site document generator.

   Each entry describes ONE generatable document:
     • which form fields to ask for  (`groups` + `fields`)
     • how to turn those answers into a document  (`render`)

   The build turns each entry into a page at its `slug`. The form HTML is
   generated at build time; `render` is serialised into the page and runs in
   the visitor's browser. Nothing is uploaded — the whole thing works offline
   once the page has loaded.

   ---- ADDING A NEW DOCUMENT ----
   Copy an entry, change `id`, `slug`, the fields and `render`. That is all.
   It appears on /tools/, on its linked service page, and in the sitemap.

   ---- render(v, H) ----
   v = the visitor's answers, keyed by field `k`
   H = helpers available in the browser:
         H.np(n)        123        -> '१२३'   (Nepali digits)
         H.date(bs)     '2083/05/20' -> '२०८३/०५/२०'
         H.time(t)      '10:00'    -> '१०:०० बजे'
         H.money(n)     50000      -> '५०,०००'
         H.words(n)     50000      -> 'पचास हजार'   (Nepali, lakh/crore)
         H.lang         'np' | 'en'

   It returns a plain document object. The renderer draws it. Keeping the
   shape generic is what lets one engine serve minutes, applications and
   disclosures alike:

     { cornerRight, title, subtitle, connector, heading, intro,
       meta:  [{l, v}],
       table: { caption, cols:[], rows:[[]] },
       sections: [{ h, items:[] }],
       closing }
   ============================================================ */

const templates = [

  {
    id: 'bank-account-single',
    slug: 'tools/bank-account-opening/single-shareholder',
    serviceId: 'bank-account',      // the service page this belongs to
    shareholder: 'single',
    price: 0,                       // 0 = free
    order: 1,
    active: true,

    np: {
      name: 'कम्पनी बैंक खाता खोल्ने (एकल शेयरधनी)',
      short: 'एकल शेयरधनी कम्पनीको नाममा बैंक खाता खोल्न र अनलाइन सेवा लिन आवश्यक सञ्चालक बैठकको माइन्युट तयार गर्नुहोस्।',
      metaTitle: 'कम्पनी बैंक खाता खोल्ने माइन्युट (एकल शेयरधनी) — नि:शुल्क बनाउनुहोस्',
      metaDesc: 'एकल शेयरधनी कम्पनीको बैंक खाता खोल्ने बैठक माइन्युट अनलाइन तयार गर्नुहोस्। बैंक, शाखा र हस्ताक्षरकर्ता भर्नुहोस्, तुरुन्तै छाप्न तयार कागजात पाउनुहोस्। नि:शुल्क।'
    },
    en: {
      name: 'Company Bank Account Opening (Single Shareholder)',
      short: 'Generates the board minute authorising a single-shareholder company to open a bank account, naming the bank, branch and the account operator.',
      metaTitle: 'Bank Account Opening Minute Generator (Single Shareholder) — Free',
      metaDesc: 'Generate the board minute for opening a company bank account in Nepal. Fill in the bank, branch and signatory and get a print-ready Nepali document instantly. Free.'
    },

    groups: [
      { id: 'company', np: 'कम्पनीको विवरण',   en: 'Company details' },
      { id: 'holder',  np: 'शेयरधनीको विवरण',  en: 'Shareholder details' },
      { id: 'meeting', np: 'बैठकको विवरण',     en: 'Meeting details' },
      { id: 'bank',    np: 'बैंक खाताको विवरण', en: 'Bank account details' }
    ],

    fields: [
      { k: 'regNo', g: 'company', t: 'text', req: true, half: true,
        np: { l: 'दर्ता नम्बर', p: 'जस्तै: १२३४५' },
        en: { l: 'Registration number', p: 'e.g. 12345' } },

      { k: 'fiscalYear', g: 'company', t: 'fiscalYear', req: true, half: true,
        np: { l: 'दर्ता आर्थिक वर्ष' }, en: { l: 'Registration fiscal year' } },

      { k: 'companyNameNp', g: 'company', t: 'text', req: true, half: true, suffix: 'प्रा.लि.',
        np: { l: 'कम्पनीको नाम (नेपालीमा)', p: 'जस्तै: राम ट्रेडिङ' },
        en: { l: 'Company name (Nepali)', p: 'e.g. राम ट्रेडिङ' } },

      { k: 'companyNameEn', g: 'company', t: 'text', half: true, suffix: 'Private Limited',
        np: { l: 'कम्पनीको नाम (अंग्रेजीमा)', p: 'जस्तै: RAM TRADING' },
        en: { l: 'Company name (English)', p: 'e.g. RAM TRADING' } },

      { k: 'address', g: 'company', t: 'address', req: true,
        np: { l: 'कम्पनीको ठेगाना', help: 'तलबाट छान्नुहोस्। चाहेमा सिधै सम्पादन पनि गर्न सक्नुहुन्छ।' },
        en: { l: 'Company address', help: 'Pick below. The address is written in Nepali because it goes into a Nepali document — you can edit it directly.' } },

      { k: 'shareholder', g: 'holder', t: 'text', req: true, half: true,
        np: { l: 'शेयरधनीको नाम', p: 'जस्तै: राम बहादुर श्रेष्ठ' },
        en: { l: 'Shareholder name', p: 'e.g. राम बहादुर श्रेष्ठ' } },

      { k: 'operator', g: 'holder', t: 'text', req: true, half: true,
        np: { l: 'खाता सञ्चालक', help: 'खाता सञ्चालन गर्ने व्यक्तिको नाम' },
        en: { l: 'Account operator', help: 'The person who will operate the account' } },

      { k: 'minuteDate', g: 'meeting', t: 'bsdate', req: true, half: true,
        np: { l: 'बैठकको मिति (बि.सं.)' }, en: { l: 'Meeting date (B.S.)' } },

      { k: 'meetingTime', g: 'meeting', t: 'time', req: true, half: true, def: '10:00',
        np: { l: 'बैठकको समय' }, en: { l: 'Meeting time' } },

      { k: 'venue', g: 'meeting', t: 'text', def: 'कम्पनीको रजिष्टर्ड कार्यालय',
        np: { l: 'बैठक भएको स्थान' }, en: { l: 'Meeting venue' } },

      { k: 'bankName', g: 'bank', t: 'text', req: true, half: true,
        np: { l: 'बैंकको नाम', p: 'बैंकको नाम लेख्नुहोस्' },
        en: { l: 'Bank name', p: 'Name of the bank' } },

      { k: 'branch', g: 'bank', t: 'text', req: true, half: true,
        np: { l: 'शाखा', p: 'शाखाको नाम लेख्नुहोस्' },
        en: { l: 'Branch', p: 'Branch name' } },

      { k: 'accMobile', g: 'bank', t: 'tel', req: true, half: true,
        np: { l: 'खाताको मोबाइल नम्बर', p: '९८XXXXXXXX' },
        en: { l: 'Mobile number for the account', p: '98XXXXXXXX' } },

      { k: 'accEmail', g: 'bank', t: 'email', half: true,
        np: { l: 'खाताको इमेल', p: 'email@example.com', help: 'वैकल्पिक' },
        en: { l: 'Email for the account', p: 'email@example.com', help: 'Optional' } }
    ],

    render: function (v, H) {
      const coNp   = (v.companyNameNp || '').trim() + ' प्रा.लि.';
      const holder = (v.shareholder || '').trim();
      const oper   = (v.operator || holder).trim();

      /* Decision 1 — opening the account and naming the sole signatory. */
      let d1 = 'प्रस्ताव नं. १ उपर बैठकमा छलफल हुँदा यस कम्पनीको नाममा '
             + (v.bankName || '') + ' बैंक, ' + (v.branch || '') + ' शाखामा '
             + 'बैंक खाता खोल्ने निर्णय गरियो । उक्त खाताको सञ्चालन यस कम्पनीका संस्थापक अध्यक्ष '
             + 'श्री ' + oper + ' ज्यूको एकल हस्ताक्षरबाट हुने र कम्पनीसँग सम्बन्धित सम्पूर्ण '
             + 'बैंकिङ कारोबारमा निजको मात्र हस्ताक्षर चल्ने निर्णय गरियो ।';

      /* Online-banking clause. Email is optional, so the sentence adapts. */
      const contact = v.accEmail
        ? 'मोबाइल नम्बर ' + H.np(v.accMobile || '') + ' र इमेल ' + v.accEmail
        : 'मोबाइल नम्बर ' + H.np(v.accMobile || '');
      d1 += ' साथै उक्त खाताको अनलाइन सेवा (mobile banking, e-banking, QR code, connect IPS) '
          + 'लिनका लागि ' + contact + ' प्रयोग गर्ने गरी सेवा लिने निर्णय गरियो ।';

      return {
        cornerRight: 'प्रा.लि.नं. ' + H.np(v.regNo || '') + '/' + H.np(v.fiscalYear || ''),
        title: coNp,
        subtitle: v.address || '',
        connector: 'को',
        heading: 'एकल शेयरधनीको विशेष बैठक',

        intro: 'यस ' + coNp + ' को एकल शेयरधनीको विशेष बैठक श्री ' + holder
             + ' को अध्यक्षतामा बसी देहायका विषयमा छलफल गरी निर्णय लिइयो ।',

        meta: [
          { l: 'स्थान:', v: v.venue || 'कम्पनीको रजिष्टर्ड कार्यालय' },
          { l: 'मिति:',  v: H.date(v.minuteDate) },
          { l: 'समय:',   v: H.time(v.meetingTime) }
        ],

        table: {
          caption: 'उपस्थिति',
          cols: ['क्र.सं.', 'शेयरधनीको नाम', 'पद', 'हस्ताक्षर'],
          rows: [['१.', holder, 'एकल शेयरधनी', '']]
        },

        sections: [
          { h: 'छलफलका विषयहरू:', items: [
              '१) कम्पनीको नाममा बैंक खाता खोल्ने तथा उक्त खाताको अनलाइन सेवा लिने सम्बन्धमा ।',
              '२) विविध ।'
          ] },
          { h: 'छलफलबाट भएका निर्णयहरू:', items: [
              { label: 'निर्णय नं. १', text: d1 },
              { label: 'निर्णय नं. २', text: 'अन्त्यमा अन्य कुनै प्रस्ताव यस बैठकमा पेस नभएकोले आजको बैठक यहीँ समापन गर्ने निर्णय गरियो ।' }
          ] }
        ]
      };
    }
  }

];

module.exports = { templates: templates.filter(t => t.active !== false) };
