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

/* ------------------------------------------------------------------------
   Offices of the Company Registrar.

   There are exactly three: the head office at Tripureshwor and two branch
   offices, Itahari and Butwal. Verified against ocr.gov.np/pages/branch-offices-12/
   on 2026-09-05. If OCR opens another branch this list is the only place to
   change.

   `v` is what render() receives, so it is the place phrase exactly as it has
   to read inside the document — "कम्पनी रजिष्ट्रारको कार्यालय, " is prefixed
   where needed.
   ------------------------------------------------------------------------ */
const OCR_OFFICES = [
  { v: 'त्रिपुरेश्वर, काठमाडौं',
    np: 'कम्पनी रजिष्ट्रारको कार्यालय, त्रिपुरेश्वर, काठमाडौं (प्रधान कार्यालय)',
    en: 'Office of Company Registrar, Tripureshwor, Kathmandu (head office)' },
  { v: 'ईटहरी',
    np: 'कम्पनी रजिष्ट्रारको कार्यालय, ईटहरी (शाखा)',
    en: 'Office of Company Registrar, Itahari (branch)' },
  { v: 'बुटवल',
    np: 'कम्पनी रजिष्ट्रारको कार्यालय, बुटवल (शाखा)',
    en: 'Office of Company Registrar, Butwal (branch)' }
];

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
  },

  /* ======================================================================
     CAMIS / OCR user id and password reset — single shareholder.

     Two pages, because the Registrar wants both:
       page 1  the application letter (निवेदन) addressed to the Registrar
       page 2  the special meeting minute the letter encloses

     One office dropdown drives the addressee, the registration sentence and
     the office the shareholder appears at. The reference documents in
     circulation hardcode Tripureshwor in the letter while the minute names
     the branch, which contradicts itself for any company registered at
     Itahari or Butwal.
     ====================================================================== */
  {
    id: 'camis-reset-single',
    slug: 'tools/camis-password-recovery/single-shareholder',
    serviceId: 'camis-recovery-single',
    shareholder: 'single',
    price: 0,
    order: 2,
    active: true,

    np: {
      name: 'CAMIS आईडी / पासवर्ड रिसेट (एकल शेयरधनी)',
      short: 'एकल शेयरधनी कम्पनीको CAMIS (ई-सेवा) युजर आईडी र पासवर्ड रिसेट गर्न कम्पनी रजिष्ट्रारको कार्यालयमा पेस गर्ने निवेदन र विशेष बैठकको माइन्युट — दुवै एकैपटक।',
      metaTitle: 'CAMIS आईडी / पासवर्ड रिसेट निवेदन (एकल शेयरधनी) — नि:शुल्क बनाउनुहोस्',
      metaDesc: 'CAMIS / OCR ई-सेवाको युजर आईडी र पासवर्ड रिसेट गर्ने निवेदन र विशेष बैठक माइन्युट अनलाइन तयार गर्नुहोस्। कार्यालय छान्नुहोस्, विवरण भर्नुहोस्, छाप्न तयार दुई पाना पाउनुहोस्। नि:शुल्क।'
    },
    en: {
      name: 'CAMIS ID / Password Reset (Single Shareholder)',
      short: 'Generates both pages the Registrar asks for: the application letter to reset a single-shareholder company’s CAMIS e-service login, and the special meeting minute it encloses.',
      metaTitle: 'CAMIS ID and Password Reset Application (Single Shareholder) — Free',
      metaDesc: 'Generate the OCR / CAMIS user ID and password reset application and its supporting meeting minute for a Nepali company. Pick your Registrar office, fill in the details, print two ready pages. Free.'
    },

    groups: [
      { id: 'company', np: 'कम्पनीको विवरण',        en: 'Company details' },
      { id: 'holder',  np: 'शेयरधनीको विवरण',       en: 'Shareholder details' },
      { id: 'meeting', np: 'मिति र बैठकको विवरण',   en: 'Dates and meeting' },
      { id: 'office',  np: 'कार्यालय र सम्पर्क',     en: 'Office and contact' }
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
        np: { l: 'शेयरधनीको नाम', p: 'जस्तै: राम बहादुर श्रेष्ठ', help: 'निवेदनमा अध्यक्षको रूपमा हस्ताक्षर गर्ने व्यक्ति' },
        en: { l: 'Shareholder name', p: 'e.g. राम बहादुर श्रेष्ठ', help: 'Signs the application as chairperson' } },

      { k: 'attendee', g: 'holder', t: 'text', half: true,
        np: { l: 'कार्यालयमा उपस्थित हुने व्यक्ति', help: 'खाली छोडे शेयरधनीकै नाम जान्छ' },
        en: { l: 'Person attending the office', help: 'Leave blank to use the shareholder' } },

      { k: 'applicationDate', g: 'meeting', t: 'bsdate', req: true, half: true,
        np: { l: 'निवेदनको मिति (बि.सं.)' }, en: { l: 'Application date (B.S.)' } },

      { k: 'minuteDate', g: 'meeting', t: 'bsdate', req: true, half: true,
        np: { l: 'बैठकको मिति (बि.सं.)', help: 'निवेदनको मिति भन्दा अघि वा सोही दिन' },
        en: { l: 'Meeting date (B.S.)', help: 'On or before the application date' } },

      { k: 'meetingTime', g: 'meeting', t: 'time', req: true, half: true, def: '10:00',
        np: { l: 'बैठकको समय' }, en: { l: 'Meeting time' } },

      { k: 'venue', g: 'meeting', t: 'text', half: true, def: 'कम्पनीको रजिष्टर्ड कार्यालय',
        np: { l: 'बैठक भएको स्थान' }, en: { l: 'Meeting venue' } },

      { k: 'office', g: 'office', t: 'select', req: true, options: OCR_OFFICES,
        np: { l: 'कम्पनी रजिष्ट्रारको कार्यालय', p: 'कार्यालय छान्नुहोस्',
              help: 'कम्पनी दर्ता भएको र आईडी लिन जाने कार्यालय' },
        en: { l: 'Office of Company Registrar', p: 'Select an office',
              help: 'The office the company is registered with, and where you will collect the login' } },

      { k: 'email', g: 'office', t: 'email', req: true, half: true,
        np: { l: 'कम्पनीको इमेल', p: 'email@example.com', help: 'नयाँ आईडी यही इमेलमा आउँछ' },
        en: { l: 'Company email', p: 'email@example.com', help: 'The new login is sent here' } },

      { k: 'mobile', g: 'office', t: 'tel', req: true, half: true,
        np: { l: 'कम्पनीको मोबाइल नम्बर', p: '९८XXXXXXXX' },
        en: { l: 'Company mobile number', p: '98XXXXXXXX' } }
    ],

    render: function (v, H) {
      var coNp    = (v.companyNameNp || '').trim() + ' प्रा.लि.';
      var holder  = (v.shareholder || '').trim();
      var person  = (v.attendee || '').trim() || holder;
      var office  = (v.office || '').trim();
      var officeFull = 'कम्पनी रजिष्ट्रारको कार्यालय, ' + office;
      var corner  = { type: 'corner',
                      text: 'प्रा.लि.नं. ' + H.np(v.regNo || '') + '/' + H.np(v.fiscalYear || '') };
      /* The email stays in Latin script — an address with Devanagari digits
         in it is not a working address. Only the phone number is converted. */
      var contact = (v.email || '').trim() + ' र ' + H.np(v.mobile || '');

      /* ---------------------------------------------- page 1: the letter */
      var letter = [
        corner,
        { type: 'title', text: coNp },
        { type: 'sub',   text: v.address || '' },
        { type: 'right', text: 'मिति: ' + H.date(v.applicationDate) },

        { type: 'lines', items: [
            'श्रीमान् रजिष्ट्रार ज्यू,',
            'कम्पनी रजिष्ट्रारको कार्यालय,',
            office + ' ।'
        ] },

        { type: 'subject', text: 'विषय:- युजर आईडी पासवर्ड रिसेट गरी पाउँ ।' },
        { type: 'salut',   text: 'महोदय,' },

        { type: 'para', indent: true, text:
            'उपरोक्त सम्बन्धमा यस कम्पनीको दर्ता श्री ' + officeFull + 'बाट भएको हुँदा '
          + 'यस कम्पनीको ई-सेवा (e-service) लिनको लागि पहिले लिएका user id र password '
          + 'हराएको हुँदा उक्त user id र password रद्द गरी पुन: ई-सेवा लिनको लागि नयाँ '
          + contact + ' मा आईडी र पासवर्ड रिसेट गरी पाउँ ।' },

        { type: 'secH',  text: 'संलग्न कागजातहरू:' },
        { type: 'items', items: ['१. विशेष बैठकको प्रतिलिपि — १ थान'] },

        { type: 'sign', heading: 'निवेदक', items: [
            { l: 'दस्तखत:', rule: true },
            { l: 'नाम:', v: holder },
            { l: 'पद:',  v: 'अध्यक्ष' },
            { l: coNp, bold: true }
        ] }
      ];

      /* ------------------------------------------- page 2: the minute */
      var d1 = 'प्रस्ताव नं. १ उपर छलफल गर्दा यस कम्पनीको दर्ता श्री ' + officeFull
             + 'बाट भएको हुँदा यस कम्पनीको ई-सेवा (e-service) लिने निर्णय गरियो । '
             + 'साथै पहिले लिएका user id र password रद्द गरी पुन: ई-सेवा लिनको लागि नयाँ '
             + contact + ' मा आईडी र पासवर्ड रिसेट गर्न ' + officeFull
             + ' मा यस कम्पनीका अध्यक्ष श्री ' + person
             + ' स्वयम् उपस्थित भई युजर आईडी र पासवर्ड लिने निर्णय गरियो ।';

      var minute = [
        corner,
        { type: 'title',   text: coNp },
        { type: 'sub',     text: v.address || '' },
        { type: 'conn',    text: 'को' },
        { type: 'heading', text: 'एकल शेयरधनीको विशेष बैठक' },

        { type: 'para', text:
            'यस ' + coNp + ' को एकल शेयरधनीको विशेष बैठक श्री ' + holder
          + ' को अध्यक्षतामा बसी देहायका विषयमा छलफल गरी निर्णय लिइयो ।' },

        { type: 'meta', items: [
            { l: 'स्थान:', v: v.venue || 'कम्पनीको रजिष्टर्ड कार्यालय' },
            { l: 'मिति:',  v: H.date(v.minuteDate) },
            { l: 'समय:',   v: H.time(v.meetingTime) }
        ] },

        { type: 'table', caption: 'उपस्थिति',
          cols: ['क्र.सं.', 'शेयरधनीको नाम', 'पद', 'हस्ताक्षर'],
          rows: [['१.', holder, 'एकल शेयरधनी', '']] },

        { type: 'secH', text: 'छलफलका विषयहरू:' },
        { type: 'items', items: [
            '१) कम्पनीको अनलाइन सेवा लिनको लागि ' + officeFull
              + 'बाट ई-सेवा (e-service) लिने सम्बन्धमा ।',
            '२) विविध ।'
        ] },

        { type: 'secH', text: 'छलफलबाट भएका निर्णयहरू:' },
        { type: 'items', items: [
            { label: 'निर्णय नं. १', text: d1 },
            { label: 'निर्णय नं. २', text: 'अन्त्यमा अन्य कुनै प्रस्ताव यस बैठकमा पेस नभएकोले आजको बैठक यहीँ समापन गर्ने निर्णय गरियो ।' }
        ] }
      ];

      return { pages: [letter, minute] };
    }
  }

];

module.exports = { templates: templates.filter(t => t.active !== false) };
