/* ============================================================
   CANONICAL SERVICE CATALOG — single source of truth.

   Every service page, category page, homepage card, search index
   entry, sitemap URL and structured-data block is generated from
   this file. Add a service here and it appears everywhere.

   FIELDS
     id            unique key
     slug          URL path, no leading/trailing slash
     category      categories.js id
     shareholder   'single' | 'multiple' | null  (null = not applicable)
     popular       1..n to feature on the homepage, or null
     order         sort order within its category
     price         starting price in NPR (KagajSewa preparation fee only)
     time          preparation time, both languages
     np / en       name, short, who, includes[], provide[], receive[],
                   notes[], metaTitle, metaDesc
     faq           [{np:{q,a}, en:{q,a}}]
     related       service ids
     guides        guide slugs
     active        false hides it everywhere
   ============================================================ */

const services = [

  /* ---------------- 1. COMPANY REGISTRATION ---------------- */

  {
    id: 'registration-single',
    slug: 'services/company-registration/single-shareholder',
    category: 'company-registration',
    shareholder: 'single',
    popular: 1,
    order: 1,
    price: 1500,
    time: { np: '१–२ कार्यदिन', en: '1–2 working days' },
    np: {
      name: 'एकल शेयरधनी कम्पनी दर्ता',
      nameEn: 'Single Shareholder Company Registration',
      short: 'एक जना मात्र शेयरधनी भएको प्राइभेट लिमिटेड कम्पनी दर्ताका लागि आवश्यक सम्पूर्ण कागजात।',
      who: 'तपाईं आफैं एक्लै कम्पनी खोल्दै हुनुहुन्छ र कम्पनीको सम्पूर्ण शेयर तपाईंकै नाममा रहन्छ भने यो सेवा तपाईंका लागि हो।',
      includes: [
        'प्रबन्धपत्र (MOA) — तपाईंको व्यवसायको उद्देश्य अनुसार लेखिएको',
        'नियमावली (AOA) — एकल शेयरधनी संरचनाअनुसार',
        'CAMIS मा पेस गर्ने कम्पनी दर्ता निवेदन',
        'शेयर बाँडफाँडको विवरण',
        'दर्तापछिको पहिलो सञ्चालक निर्णय (माइन्युट)'
      ],
      provide: [
        'प्रस्तावित कम्पनीको नाम (३ वटा विकल्प भए राम्रो)',
        'व्यवसायको मुख्य उद्देश्य — के काम गर्ने हो',
        'शेयरधनीको नागरिकता प्रतिलिपि, ठेगाना र सम्पर्क नम्बर',
        'अधिकृत तथा जारी पूँजी कति राख्ने',
        'कम्पनीको दर्ता ठेगाना (प्रदेश, पालिका, वडा)'
      ],
      receive: [
        'सम्पादन गर्न मिल्ने Word फाइल',
        'छाप्न तयार PDF',
        'कुन कागजात कहाँ पेस गर्ने भन्ने छोटो सूची'
      ],
      notes: [
        'यो मूल्यमा कम्पनी रजिष्ट्रारको कार्यालयमा तिर्नुपर्ने सरकारी दस्तुर समावेश छैन। सरकारी दस्तुर अधिकृत पूँजीअनुसार फरक पर्छ र तपाईंले सिधै कार्यालयमा तिर्नुहुन्छ।',
        'नाम आरक्षण (name reservation) तपाईंले CAMIS मा आफैं गर्नुपर्छ। कुन नाम स्वीकृत हुन्छ भन्ने कार्यालयले तय गर्छ।',
        'केही व्यवसायलाई थप स्वीकृति वा इजाजतपत्र चाहिन सक्छ — त्यस्तो अवस्थामा हामी अगाडि नै जानकारी गराउँछौं।'
      ],
      metaTitle: 'एकल शेयरधनी कम्पनी दर्ता नेपाल | MOA, AOA र CAMIS निवेदन',
      metaDesc: 'नेपालमा एकल शेयरधनी प्राइभेट लिमिटेड कम्पनी दर्ताका लागि आवश्यक प्रबन्धपत्र (MOA), नियमावली (AOA) र CAMIS निवेदन तयार गर्ने सेवा। NPR १,५०० बाट सुरु।'
    },
    en: {
      name: 'Single Shareholder Company Registration',
      nameNp: 'एकल शेयरधनी कम्पनी दर्ता',
      short: 'The complete document set for registering a private limited company with one shareholder.',
      who: 'You are starting a company on your own and all shares will be held in your name.',
      includes: [
        'Memorandum of Association (MOA), written for your line of business',
        'Articles of Association (AOA) for a single-shareholder structure',
        'CAMIS company registration application',
        'Share allocation statement',
        'First board resolution after incorporation'
      ],
      provide: [
        'Proposed company name (three options is ideal)',
        'What the business will actually do',
        "Shareholder's citizenship copy, address and phone number",
        'Authorised and issued capital',
        'Registered office address (province, municipality, ward)'
      ],
      receive: [
        'An editable Word file',
        'A print-ready PDF',
        'A short list of what to submit where'
      ],
      notes: [
        'This price does not include the government fee payable to the Office of the Company Registrar. That fee scales with authorised capital and you pay it directly to the office.',
        'Name reservation is done by you in CAMIS. Whether a name is approved is the office’s decision, not ours.',
        'Some business activities need an additional licence or approval. We will tell you before we start if yours is one of them.'
      ],
      metaTitle: 'Single Shareholder Company Registration Nepal | MOA, AOA, CAMIS',
      metaDesc: 'Document preparation for single shareholder private limited company registration in Nepal — MOA, AOA and the CAMIS application. From NPR 1,500.'
    },
    faq: [
      {
        np: { q: 'एक जनाले मात्र कम्पनी दर्ता गर्न मिल्छ?', a: 'मिल्छ। नेपालमा एक जना शेयरधनी भएको प्राइभेट लिमिटेड कम्पनी दर्ता गर्न सकिन्छ। नियमावली र माइन्युटको ढाँचा भने बहुल शेयरधनी कम्पनीभन्दा फरक हुन्छ, त्यसैले यी दुई सेवा छुट्टाछुट्टै राखिएका छन्।' },
        en: { q: 'Can one person register a company alone?', a: 'Yes. A private limited company in Nepal can have a single shareholder. The articles and the minutes are worded differently from a multiple-shareholder company, which is why these are two separate services here.' }
      },
      {
        np: { q: 'पछि अर्को शेयरधनी थप्न मिल्छ?', a: 'मिल्छ। पछि शेयर नामसारी वा पूँजी संरचना परिवर्तन गरेर बहुल शेयरधनी कम्पनीमा जान सकिन्छ। त्यसका लागि छुट्टै कागजात चाहिन्छ र हामीले त्यो पनि तयार गरिदिन्छौं।' },
        en: { q: 'Can I add another shareholder later?', a: 'Yes. You can move to a multiple-shareholder structure later through a share transfer or a change in capital structure. That needs its own set of documents, which we also prepare.' }
      }
    ],
    related: ['registration-multiple', 'annual-update-single', 'pan-registration', 'bank-account'],
    guides: ['guides/company-registration-nepal', 'guides/single-shareholder-company-registration', 'guides/moa-aoa-explained']
  },

  {
    id: 'registration-multiple',
    slug: 'services/company-registration/multiple-shareholder',
    category: 'company-registration',
    shareholder: 'multiple',
    popular: 2,
    order: 2,
    price: 2000,
    time: { np: '१–२ कार्यदिन', en: '1–2 working days' },
    np: {
      name: 'बहुल शेयरधनी कम्पनी दर्ता',
      nameEn: 'Multiple Shareholder Company Registration',
      short: 'दुई वा सोभन्दा बढी शेयरधनी भएको प्राइभेट लिमिटेड कम्पनी दर्ताका लागि सम्पूर्ण कागजात।',
      who: 'दुई वा बढी व्यक्ति मिलेर कम्पनी खोल्दै हुनुहुन्छ र शेयर बाँडफाँड फरक-फरक हुन्छ भने यो सेवा तपाईंका लागि हो।',
      includes: [
        'प्रबन्धपत्र (MOA) — व्यवसायको उद्देश्य अनुसार',
        'नियमावली (AOA) — बहुल शेयरधनी संरचनाअनुसार',
        'CAMIS मा पेस गर्ने कम्पनी दर्ता निवेदन',
        'प्रत्येक शेयरधनीको शेयर बाँडफाँड विवरण',
        'सञ्चालक नियुक्ति सहितको प्रारम्भिक माइन्युट',
        'सर्वसम्मत सहमति पत्र (आवश्यक परे)'
      ],
      provide: [
        'प्रस्तावित कम्पनीको नाम (३ वटा विकल्प भए राम्रो)',
        'व्यवसायको मुख्य उद्देश्य',
        'प्रत्येक शेयरधनीको नाम, नागरिकता प्रतिलिपि, ठेगाना र सम्पर्क',
        'कसले कति प्रतिशत वा कति कित्ता शेयर लिने',
        'को-को सञ्चालक हुने',
        'अधिकृत तथा जारी पूँजी',
        'कम्पनीको दर्ता ठेगाना'
      ],
      receive: [
        'सम्पादन गर्न मिल्ने Word फाइल',
        'छाप्न तयार PDF',
        'कुन कागजातमा कसले हस्ताक्षर गर्ने भन्ने स्पष्ट सूची'
      ],
      notes: [
        'यो मूल्यमा सरकारी दस्तुर समावेश छैन। सरकारी दस्तुर अधिकृत पूँजीअनुसार फरक पर्छ।',
        'शेयरधनी संख्या धेरै भएमा वा शेयर संरचना जटिल भएमा मूल्य केही बढ्न सक्छ। अगाडि नै भन्छौं।',
        'नाम आरक्षण CAMIS मा तपाईंले आफैं गर्नुपर्छ।'
      ],
      metaTitle: 'बहुल शेयरधनी कम्पनी दर्ता नेपाल | MOA, AOA र CAMIS निवेदन',
      metaDesc: 'दुई वा सोभन्दा बढी शेयरधनी भएको प्राइभेट लिमिटेड कम्पनी दर्ताका लागि प्रबन्धपत्र, नियमावली, शेयर बाँडफाँड र CAMIS निवेदन। NPR २,००० बाट सुरु।'
    },
    en: {
      name: 'Multiple Shareholder Company Registration',
      nameNp: 'बहुल शेयरधनी कम्पनी दर्ता',
      short: 'The complete document set for registering a private limited company with two or more shareholders.',
      who: 'Two or more people are starting a company together with shares divided between them.',
      includes: [
        'Memorandum of Association (MOA), written for your line of business',
        'Articles of Association (AOA) for a multiple-shareholder structure',
        'CAMIS company registration application',
        'Share allocation for each shareholder',
        'Initial minute appointing directors',
        'Consent letter where required'
      ],
      provide: [
        'Proposed company name (three options is ideal)',
        'What the business will actually do',
        'Each shareholder’s name, citizenship copy, address and phone number',
        'How the shares are divided',
        'Who the directors will be',
        'Authorised and issued capital',
        'Registered office address'
      ],
      receive: [
        'An editable Word file',
        'A print-ready PDF',
        'A clear list of who signs what'
      ],
      notes: [
        'This price does not include the government fee, which scales with authorised capital.',
        'A large number of shareholders or an unusual share structure can raise the price. We will tell you before starting.',
        'Name reservation is done by you in CAMIS.'
      ],
      metaTitle: 'Multiple Shareholder Company Registration Nepal | MOA, AOA, CAMIS',
      metaDesc: 'Document preparation for multiple shareholder private limited company registration in Nepal — MOA, AOA, share allocation and the CAMIS application. From NPR 2,000.'
    },
    faq: [
      {
        np: { q: 'शेयर बाँडफाँड कसरी तय गर्ने?', a: 'शेयरधनीहरू आपसमा सहमत भएर तय गर्नुहुन्छ — प्रतिशतमा वा कित्तामा। तपाईंहरूले जे भन्नुहुन्छ त्यही अनुसार कागजात बन्छ। कसरी बाँड्ने भन्ने व्यावसायिक निर्णय हो र त्यसमा हामी सल्लाह दिँदैनौं।' },
        en: { q: 'How do we decide the share split?', a: 'The shareholders agree it between themselves, either as percentages or as a number of shares. We draft to whatever you tell us. How to split it is a business decision and not something we advise on.' }
      },
      {
        np: { q: 'सबै शेयरधनी काठमाडौंमा हुनुपर्छ?', a: 'हुनु पर्दैन। कागजात तयार गर्न हामीलाई विवरण मात्र चाहिन्छ। हस्ताक्षर र पेस गर्ने काम भने शेयरधनी वा निजको अख्तियारप्राप्त व्यक्तिले गर्नुपर्छ।' },
        en: { q: 'Do all shareholders need to be in Kathmandu?', a: 'No. We only need the details to prepare the documents. Signing and submission must be done by the shareholders or someone they authorise.' }
      }
    ],
    related: ['registration-single', 'annual-update-multiple', 'pan-registration', 'share-transfer'],
    guides: ['guides/company-registration-nepal', 'guides/multiple-shareholder-company-registration', 'guides/moa-aoa-explained']
  },

  /* ---------------- 2. COMPANY UPDATES ---------------- */

  {
    id: 'annual-update-single',
    slug: 'services/annual-company-update/single-shareholder',
    category: 'company-update',
    shareholder: 'single',
    popular: 3,
    order: 1,
    price: 400,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'वार्षिक अद्यावधिक — एकल शेयरधनी',
      nameEn: 'Annual Company Update — Single Shareholder',
      short: 'एकल शेयरधनी कम्पनीको वार्षिक अद्यावधिकका लागि आवश्यक सम्पूर्ण कागजात एउटै प्याकेजमा।',
      who: 'तपाईंको कम्पनीमा एक जना मात्र शेयरधनी हुनुहुन्छ र कम्पनी रजिष्ट्रारको कार्यालयमा वार्षिक विवरण पेस गर्नुपर्ने भएको छ।',
      includes: [
        'सञ्चालक समितिको बैठकको माइन्युट',
        'वार्षिक साधारण सभाको माइन्युट',
        'दफा ५१ बमोजिम शेयर, ऋणपत्र र ऋणको लगत',
        'दफा ९२ बमोजिम सञ्चालकको विवरण',
        'रजिष्ट्रारको कार्यालयमा पेस गर्ने निवेदन'
      ],
      provide: [
        'कम्पनीको नाम र दर्ता नम्बर',
        'स्थायी लेखा नम्बर (PAN)',
        'कुन आर्थिक वर्षको अद्यावधिक हो',
        'लेखापरीक्षकको नाम र दर्ता नम्बर',
        'गत वर्षको अद्यावधिक कागजात भए त्यसको फोटो'
      ],
      receive: [
        'पाँचवटै कागजात Word र PDF दुवैमा',
        'हस्ताक्षर र छाप कहाँ लगाउने भनी चिन्ह लगाइएको प्रति'
      ],
      notes: [
        'ढिलो भएमा लाग्ने जरिवाना कार्यालयले तय गर्छ र त्यो यो मूल्यमा समावेश छैन।',
        'लेखापरीक्षण प्रतिवेदन र वित्तीय विवरण तपाईंको लेखापरीक्षकले तयार गर्नुपर्छ — हामी त्यो बनाउँदैनौं।'
      ],
      metaTitle: 'एकल शेयरधनी कम्पनी वार्षिक अद्यावधिक | दफा ५१, दफा ९२',
      metaDesc: 'एकल शेयरधनी कम्पनीको वार्षिक अद्यावधिकका लागि सञ्चालक माइन्युट, साधारण सभा माइन्युट, दफा ५१ लगत, दफा ९२ विवरण र निवेदन। NPR ४०० बाट सुरु।'
    },
    en: {
      name: 'Annual Company Update — Single Shareholder',
      nameNp: 'वार्षिक अद्यावधिक — एकल शेयरधनी',
      short: 'The full annual update filing set for a single-shareholder company, in one bundle.',
      who: 'Your company has one shareholder and the annual return is due at the Office of the Company Registrar.',
      includes: [
        'Board of Directors minute',
        'Annual General Meeting minute',
        'Section 51 inventory of shares, debentures and loans',
        'Section 92 disclosure by directors',
        'Application to the Registrar'
      ],
      provide: [
        'Company name and registration number',
        'PAN',
        'Which fiscal year the update covers',
        'Auditor’s name and registration number',
        'A photo of last year’s filing if you have it'
      ],
      receive: [
        'All five documents in Word and PDF',
        'A copy marked to show where signatures and the company stamp go'
      ],
      notes: [
        'Late-filing fines are set by the office and are not included in this price.',
        'The audit report and financial statements come from your auditor. We do not prepare those.'
      ],
      metaTitle: 'Annual Company Update Nepal — Single Shareholder | Section 51, 92',
      metaDesc: 'Annual update documents for a single shareholder company in Nepal — board minute, AGM minute, Section 51 inventory, Section 92 disclosure and the application. From NPR 400.'
    },
    faq: [
      {
        np: { q: 'एकल शेयरधनी कम्पनीले पनि साधारण सभाको माइन्युट चाहिन्छ?', a: 'चाहिन्छ। शेयरधनी एक जना मात्र भए पनि वार्षिक साधारण सभाको निर्णय अभिलेखमा राख्नुपर्छ। ढाँचा भने बहुल शेयरधनी कम्पनीको भन्दा फरक हुन्छ।' },
        en: { q: 'Does a single-shareholder company still need an AGM minute?', a: 'Yes. Even with one shareholder the annual general meeting decision has to be recorded. The wording differs from a multiple-shareholder company’s minute.' }
      },
      {
        np: { q: 'हरेक वर्ष गर्नुपर्छ?', a: 'पर्छ। दर्ता भएको कम्पनीले प्रत्येक आर्थिक वर्षको अन्त्यपछि तोकिएको अवधिभित्र अद्यावधिक विवरण पेस गर्नुपर्छ। म्याद नाघे जरिवाना लाग्छ।' },
        en: { q: 'Is this needed every year?', a: 'Yes. A registered company must file its update within the prescribed period after each fiscal year end. Missing the deadline attracts a fine.' }
      }
    ],
    related: ['annual-update-multiple', 'initial-update-single', 'records-auditor', 'tax-clearance'],
    guides: ['guides/company-annual-update', 'guides/section-51-92-explained']
  },

  {
    id: 'annual-update-multiple',
    slug: 'services/annual-company-update/multiple-shareholder',
    category: 'company-update',
    shareholder: 'multiple',
    popular: 4,
    order: 2,
    price: 600,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'वार्षिक अद्यावधिक — बहुल शेयरधनी',
      nameEn: 'Annual Company Update — Multiple Shareholder',
      short: 'दुई वा बढी शेयरधनी भएको कम्पनीको वार्षिक अद्यावधिकका लागि सम्पूर्ण कागजात।',
      who: 'तपाईंको कम्पनीमा दुई वा बढी शेयरधनी हुनुहुन्छ र वार्षिक विवरण पेस गर्नुपर्ने भएको छ।',
      includes: [
        'सञ्चालक समितिको बैठकको माइन्युट',
        'वार्षिक साधारण सभाको माइन्युट (उपस्थिति सहित)',
        'दफा ५१ बमोजिम शेयर, ऋणपत्र र ऋणको लगत',
        'दफा ९२ बमोजिम सञ्चालकको विवरण',
        'रजिष्ट्रारको कार्यालयमा पेस गर्ने निवेदन'
      ],
      provide: [
        'कम्पनीको नाम र दर्ता नम्बर',
        'स्थायी लेखा नम्बर (PAN)',
        'कुन आर्थिक वर्षको अद्यावधिक हो',
        'सबै शेयरधनीको नाम र हालको शेयर संख्या',
        'सञ्चालकहरूको नाम',
        'लेखापरीक्षकको नाम र दर्ता नम्बर'
      ],
      receive: [
        'पाँचवटै कागजात Word र PDF दुवैमा',
        'कसले कहाँ हस्ताक्षर गर्ने भनी चिन्ह लगाइएको प्रति'
      ],
      notes: [
        'ढिलो भएमा लाग्ने जरिवाना यो मूल्यमा समावेश छैन।',
        'शेयरधनी संख्या धेरै भएमा मूल्य केही बढ्न सक्छ।',
        'लेखापरीक्षण प्रतिवेदन तपाईंको लेखापरीक्षकबाट आउनुपर्छ।'
      ],
      metaTitle: 'बहुल शेयरधनी कम्पनी वार्षिक अद्यावधिक | दफा ५१, दफा ९२',
      metaDesc: 'दुई वा बढी शेयरधनी भएको कम्पनीको वार्षिक अद्यावधिकका लागि माइन्युट, दफा ५१ लगत, दफा ९२ विवरण र निवेदन तयारी सेवा। NPR ६०० बाट सुरु।'
    },
    en: {
      name: 'Annual Company Update — Multiple Shareholder',
      nameNp: 'वार्षिक अद्यावधिक — बहुल शेयरधनी',
      short: 'The full annual update filing set for a company with two or more shareholders.',
      who: 'Your company has two or more shareholders and the annual return is due.',
      includes: [
        'Board of Directors minute',
        'Annual General Meeting minute, including attendance',
        'Section 51 inventory of shares, debentures and loans',
        'Section 92 disclosure by directors',
        'Application to the Registrar'
      ],
      provide: [
        'Company name and registration number',
        'PAN',
        'Which fiscal year the update covers',
        'All shareholders and their current holdings',
        'Names of the directors',
        'Auditor’s name and registration number'
      ],
      receive: [
        'All five documents in Word and PDF',
        'A copy marked to show who signs where'
      ],
      notes: [
        'Late-filing fines are not included in this price.',
        'A large number of shareholders can raise the price.',
        'The audit report comes from your auditor.'
      ],
      metaTitle: 'Annual Company Update Nepal — Multiple Shareholder | Section 51, 92',
      metaDesc: 'Annual update documents for a multiple shareholder company in Nepal — minutes, Section 51 inventory, Section 92 disclosure and the application. From NPR 600.'
    },
    faq: [
      {
        np: { q: 'सबै शेयरधनी साधारण सभामा उपस्थित हुनुपर्छ?', a: 'नियमावलीमा तोकिएको गणपूरक संख्या पुग्नुपर्छ। उपस्थित हुन नसक्नेले प्रतिनिधि (प्रोक्सी) पठाउन सक्छन्। माइन्युटमा को उपस्थित थिए भन्ने उल्लेख हुन्छ, त्यसैले हामीलाई सही विवरण दिनुहोस्।' },
        en: { q: 'Do all shareholders have to attend the AGM?', a: 'The quorum set in your articles has to be met. Those who cannot attend may send a proxy. The minute records who attended, so give us the accurate list.' }
      }
    ],
    related: ['annual-update-single', 'initial-update-multiple', 'records-auditor', 'share-transfer'],
    guides: ['guides/company-annual-update', 'guides/section-51-92-explained']
  },

  {
    id: 'initial-update-single',
    slug: 'services/initial-update/single-shareholder',
    category: 'company-update',
    shareholder: 'single',
    popular: 5,
    order: 3,
    price: 400,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'प्रारम्भिक (३ महिने) अद्यावधिक — एकल शेयरधनी',
      nameEn: 'Initial (3-Month) Update — Single Shareholder',
      short: 'दर्ता भएको तीन महिनाभित्र पेस गर्नुपर्ने प्रारम्भिक विवरण, एकल शेयरधनी कम्पनीका लागि।',
      who: 'तपाईंको एकल शेयरधनी कम्पनी भर्खरै दर्ता भएको छ र तीन महिनाभित्र पेस गर्नुपर्ने प्रारम्भिक विवरण तयार गर्नुपर्नेछ।',
      includes: [
        'प्रारम्भिक सञ्चालक बैठकको माइन्युट',
        'रजिष्ट्रारको कार्यालयमा पेस गर्ने निवेदन',
        'लेखापरीक्षक नियुक्तिको जानकारी',
        'दफा १८४ बमोजिम दर्ता ठेगानाको जानकारी',
        'दफा ९२ बमोजिम सञ्चालकको विवरण'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र दर्ता मिति',
        'स्थायी लेखा नम्बर (PAN)',
        'नियुक्त लेखापरीक्षकको नाम र दर्ता नम्बर',
        'कम्पनीको वास्तविक कार्यालय ठेगाना'
      ],
      receive: [
        'सबै कागजात Word र PDF मा',
        'पेस गर्ने क्रम देखाइएको छोटो सूची'
      ],
      notes: [
        'यो अद्यावधिक दर्ता भएको तीन महिनाभित्र पेस गर्नुपर्ने हुन्छ। म्याद नाघे जरिवाना लाग्न सक्छ।',
        'लेखापरीक्षक नियुक्त भइसकेको हुनुपर्छ। नियुक्त नभएको भए पहिले त्यो टुंग्याउनुहोस्।'
      ],
      metaTitle: 'प्रारम्भिक ३ महिने अद्यावधिक — एकल शेयरधनी | दफा १८४, दफा ९२',
      metaDesc: 'दर्ता भएको तीन महिनाभित्र पेस गर्नुपर्ने प्रारम्भिक विवरणका कागजात — सञ्चालक माइन्युट, लेखापरीक्षक नियुक्ति, दफा १८४ ठेगाना र दफा ९२ विवरण। NPR ४०० बाट।'
    },
    en: {
      name: 'Initial (3-Month) Update — Single Shareholder',
      nameNp: 'प्रारम्भिक (३ महिने) अद्यावधिक — एकल शेयरधनी',
      short: 'The initial return due within three months of incorporation, for a single-shareholder company.',
      who: 'Your single-shareholder company was recently incorporated and the initial three-month return is due.',
      includes: [
        'Initial board minute',
        'Application to the Registrar',
        'Auditor appointment information',
        'Section 184 registered address information',
        'Section 92 disclosure by directors'
      ],
      provide: [
        'Company name, registration number and date of incorporation',
        'PAN',
        'Appointed auditor’s name and registration number',
        'The company’s actual office address'
      ],
      receive: ['All documents in Word and PDF', 'A short list showing the submission order'],
      notes: [
        'This return is due within three months of incorporation. Missing the deadline can attract a fine.',
        'An auditor must already be appointed. If not, settle that first.'
      ],
      metaTitle: 'Initial 3-Month Company Update Nepal — Single Shareholder',
      metaDesc: 'Initial three-month return documents for a newly registered single shareholder company in Nepal — board minute, auditor appointment, Section 184 and Section 92. From NPR 400.'
    },
    faq: [
      {
        np: { q: 'प्रारम्भिक र वार्षिक अद्यावधिक फरक हो?', a: 'फरक हो। प्रारम्भिक अद्यावधिक दर्ता भएको तीन महिनाभित्र एक पटक गरिन्छ। वार्षिक अद्यावधिक हरेक आर्थिक वर्षपछि गरिन्छ। दुवैका कागजात फरक हुन्छन्।' },
        en: { q: 'Is the initial update different from the annual update?', a: 'Yes. The initial update is filed once, within three months of incorporation. The annual update is filed after every fiscal year. The document sets are different.' }
      }
    ],
    related: ['initial-update-multiple', 'annual-update-single', 'pan-registration', 'bank-account'],
    guides: ['guides/initial-three-month-update', 'guides/company-annual-update']
  },

  {
    id: 'initial-update-multiple',
    slug: 'services/initial-update/multiple-shareholder',
    category: 'company-update',
    shareholder: 'multiple',
    popular: null,
    order: 4,
    price: 600,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'प्रारम्भिक (३ महिने) अद्यावधिक — बहुल शेयरधनी',
      nameEn: 'Initial (3-Month) Update — Multiple Shareholder',
      short: 'दर्ता भएको तीन महिनाभित्र पेस गर्नुपर्ने प्रारम्भिक विवरण, बहुल शेयरधनी कम्पनीका लागि।',
      who: 'दुई वा बढी शेयरधनी भएको तपाईंको कम्पनी भर्खरै दर्ता भएको छ।',
      includes: [
        'प्रारम्भिक सञ्चालक बैठकको माइन्युट',
        'रजिष्ट्रारको कार्यालयमा पेस गर्ने निवेदन',
        'लेखापरीक्षक नियुक्तिको जानकारी',
        'दफा १८४ बमोजिम दर्ता ठेगानाको जानकारी',
        'दफा ९२ बमोजिम सञ्चालकको विवरण',
        'शेयरधनीको प्रारम्भिक लगत'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र दर्ता मिति',
        'स्थायी लेखा नम्बर (PAN)',
        'सबै शेयरधनी र निजहरूको शेयर संख्या',
        'सञ्चालकहरूको नाम',
        'नियुक्त लेखापरीक्षकको विवरण',
        'कम्पनीको वास्तविक कार्यालय ठेगाना'
      ],
      receive: ['सबै कागजात Word र PDF मा', 'कसले कहाँ हस्ताक्षर गर्ने भन्ने सूची'],
      notes: [
        'दर्ता भएको तीन महिनाभित्र पेस गर्नुपर्छ।',
        'शेयरधनी संख्या धेरै भएमा मूल्य केही बढ्न सक्छ।'
      ],
      metaTitle: 'प्रारम्भिक ३ महिने अद्यावधिक — बहुल शेयरधनी कम्पनी',
      metaDesc: 'बहुल शेयरधनी भएको नयाँ दर्ता कम्पनीको तीन महिने प्रारम्भिक विवरण — सञ्चालक माइन्युट, लेखापरीक्षक नियुक्ति, दफा १८४ र दफा ९२। NPR ६०० बाट।'
    },
    en: {
      name: 'Initial (3-Month) Update — Multiple Shareholder',
      nameNp: 'प्रारम्भिक (३ महिने) अद्यावधिक — बहुल शेयरधनी',
      short: 'The initial return due within three months of incorporation, for a multiple-shareholder company.',
      who: 'Your company has two or more shareholders and was recently incorporated.',
      includes: [
        'Initial board minute',
        'Application to the Registrar',
        'Auditor appointment information',
        'Section 184 registered address information',
        'Section 92 disclosure by directors',
        'Initial shareholder register'
      ],
      provide: [
        'Company name, registration number and date of incorporation',
        'PAN',
        'All shareholders and their holdings',
        'Names of the directors',
        'Appointed auditor’s details',
        'The company’s actual office address'
      ],
      receive: ['All documents in Word and PDF', 'A list of who signs what'],
      notes: ['Due within three months of incorporation.', 'A large number of shareholders can raise the price.'],
      metaTitle: 'Initial 3-Month Company Update Nepal — Multiple Shareholder',
      metaDesc: 'Initial three-month return documents for a newly registered multiple shareholder company in Nepal — board minute, auditor appointment, Section 184 and Section 92. From NPR 600.'
    },
    faq: [],
    related: ['initial-update-single', 'annual-update-multiple', 'pan-registration', 'bank-account'],
    guides: ['guides/initial-three-month-update', 'guides/company-annual-update']
  },

  /* ---------------- 3. SHARE SERVICES ---------------- */

  {
    id: 'share-transfer',
    slug: 'services/share-transfer',
    category: 'share-services',
    shareholder: null,
    popular: 6,
    order: 1,
    price: 500,
    time: { np: 'सोही दिन – १ कार्यदिन', en: 'Same day – 1 working day' },
    np: {
      name: 'शेयर नामसारी',
      nameEn: 'Share Transfer',
      short: 'एक व्यक्तिबाट अर्कोमा शेयर नामसारी गर्न आवश्यक लिखत, निवेदन र माइन्युट — सबै प्रकारका नामसारीका लागि।',
      who: 'कम्पनीको शेयर एक शेयरधनीबाट अर्कोमा सार्नुपर्ने भएको छ — किनबेच, बकसपत्र वा मृत्युपछिको हकवाला नामसारी जुनसुकै कारणले।',
      includes: [
        'शेयर नामसारीको लिखत',
        'रजिष्ट्रारको कार्यालयमा पेस गर्ने निवेदन',
        'विशेष साधारण सभाको माइन्युट',
        'लगानी प्रमाणपत्र',
        'सञ्चालकबाट हट्नुपर्ने भए राजीनामा पत्र',
        'अद्यावधिक शेयर लगत'
      ],
      provide: [
        'कम्पनीको नाम र दर्ता नम्बर',
        'शेयर दिने र लिने दुवैको नाम, नागरिकता र ठेगाना',
        'कति कित्ता शेयर सार्ने र कति मूल्यमा',
        'नामसारीको कारण (किनबेच, बकस, हकवाला)',
        'हालको शेयर लगत'
      ],
      receive: ['सबै कागजात Word र PDF मा', 'नामसारीपछिको अद्यावधिक शेयर संरचना'],
      notes: [
        'शेयर नामसारीमा लाग्ने कर वा दस्तुर सम्बन्धित कार्यालयले तय गर्छ र यो मूल्यमा समावेश छैन।',
        'मृत्युपछिको नामसारीका लागि मृत्यु दर्ता प्रमाणपत्र र नाता प्रमाणित आवश्यक पर्छ।',
        'शेयरधनी वा नामसारीका पक्ष धेरै भएमा मूल्य केही बढ्न सक्छ।'
      ],
      metaTitle: 'शेयर नामसारी सेवा नेपाल | लिखत, निवेदन र माइन्युट',
      metaDesc: 'कम्पनीको शेयर नामसारीका लागि आवश्यक लिखत, निवेदन, विशेष साधारण सभा माइन्युट र लगानी प्रमाणपत्र तयार गर्ने सेवा। NPR ५०० बाट सुरु।'
    },
    en: {
      name: 'Share Transfer',
      nameNp: 'शेयर नामसारी',
      short: 'Transfer deed, application and minutes for moving shares between holders — all transfer types.',
      who: 'Shares need to move from one holder to another, whether by sale, gift or inheritance.',
      includes: [
        'Share transfer deed',
        'Application to the Registrar',
        'Special general meeting minute',
        'Investment certificate',
        'Resignation letter where a director steps down',
        'Updated share register'
      ],
      provide: [
        'Company name and registration number',
        'Names, citizenship and addresses of both transferor and transferee',
        'How many shares move and at what value',
        'Reason for the transfer (sale, gift, inheritance)',
        'The current share register'
      ],
      receive: ['All documents in Word and PDF', 'The resulting share structure after transfer'],
      notes: [
        'Any tax or fee on the transfer is set by the relevant office and is not included in this price.',
        'A transfer after death needs the death registration certificate and proof of relationship.',
        'Many parties or many shareholders can raise the price.'
      ],
      metaTitle: 'Share Transfer Service Nepal | Transfer Deed and Minutes',
      metaDesc: 'Share transfer documents for Nepali companies — transfer deed, application, special general meeting minute and investment certificate. From NPR 500.'
    },
    variants: {
      np: [
        { k: 'एकबाट एक (1 → 1)', v: 'एक शेयरधनीले अर्को एक जनालाई शेयर सार्दा' },
        { k: 'एकबाट धेरै (1 → many)', v: 'एक शेयरधनीले आफ्नो शेयर धेरै जनालाई बाँड्दा' },
        { k: 'धेरैबाट एक (many → 1)', v: 'धेरै शेयरधनीले एक जनालाई शेयर सार्दा' },
        { k: 'धेरैबाट धेरै (many → many)', v: 'शेयर संरचना नै पुनर्गठन गर्दा' },
        { k: 'मृत्युपछिको नामसारी', v: 'हकवालाको नाममा शेयर सार्दा — थप प्रमाण चाहिन्छ' },
        { k: 'बकसनामा', v: 'नाताभित्र निःशुल्क शेयर हस्तान्तरण गर्दा' }
      ],
      en: [
        { k: 'One to one (1 → 1)', v: 'One shareholder transfers to one other person' },
        { k: 'One to many (1 → many)', v: 'One shareholder splits their holding among several people' },
        { k: 'Many to one (many → 1)', v: 'Several shareholders transfer to a single person' },
        { k: 'Many to many (many → many)', v: 'A full restructuring of the shareholding' },
        { k: 'Transfer after death', v: 'Shares pass to an heir — additional proof required' },
        { k: 'Bakasnama (gift)', v: 'Shares gifted within a family without payment' }
      ]
    },
    faq: [
      {
        np: { q: 'शेयर नामसारीका सबै प्रकारको मूल्य उस्तै हो?', a: 'सुरुवाती मूल्य उस्तै हो। तर धेरैबाट धेरैमा सार्ने वा मृत्युपछिको नामसारीमा कागजात बढी लाग्छ, त्यसैले अन्तिम मूल्य केही बढ्न सक्छ। तपाईंको अवस्था भन्नुहोस्, ठ्याक्कै मूल्य भन्छौं।' },
        en: { q: 'Is the price the same for every transfer type?', a: 'The starting price is. Many-to-many transfers and transfers after death need more documents, so the final price can be higher. Tell us your situation and we will quote exactly.' }
      },
      {
        np: { q: 'मृत्युपछिको नामसारीमा के थप चाहिन्छ?', a: 'मृत्यु दर्ता प्रमाणपत्र, नाता प्रमाणित र हकवालाको नागरिकता चाहिन्छ। अंश वा नाताको विवाद भएमा त्यो अदालतको विषय हुन्छ — त्यसमा हामी सहयोग गर्न सक्दैनौं र अधिवक्तासँग परामर्श गर्न सुझाव दिन्छौं।' },
        en: { q: 'What extra is needed for a transfer after death?', a: 'The death registration certificate, proof of relationship and the heir’s citizenship. If the inheritance is disputed that becomes a court matter, which we cannot help with — talk to an advocate.' }
      }
    ],
    related: ['records-auditor', 'annual-update-multiple', 'registration-multiple', 'capital-increase-multiple'],
    guides: ['guides/share-transfer-nepal']
  },

  {
    id: 'records-auditor',
    slug: 'services/share-register-director-registry',
    category: 'share-services',
    shareholder: null,
    popular: null,
    order: 2,
    price: 150,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'शेयर लगत, सञ्चालक लगत र लेखापरीक्षक परिवर्तन',
      nameEn: 'Share Register, Director Registry & Auditor Change',
      short: 'कम्पनीले अनिवार्य रूपमा राख्नुपर्ने अभिलेख र लेखापरीक्षक फेर्दा चाहिने माइन्युट।',
      who: 'कम्पनीको शेयर वा सञ्चालक लगत अद्यावधिक गर्नुपर्ने, वा लेखापरीक्षक परिवर्तन गर्नुपर्ने भएको छ।',
      includes: [
        'शेयर लगत (शेयरधनीको अभिलेख)',
        'सञ्चालक लगत',
        'लेखापरीक्षक परिवर्तनको विशेष साधारण सभा माइन्युट',
        'लेखापरीक्षक नियुक्ति सम्बन्धी जानकारी'
      ],
      provide: [
        'कम्पनीको नाम र दर्ता नम्बर',
        'सबै शेयरधनीको नाम, ठेगाना र शेयर संख्या',
        'सञ्चालकहरूको नाम र नियुक्ति मिति',
        'लेखापरीक्षक फेर्ने भए नयाँ लेखापरीक्षकको नाम र दर्ता नम्बर'
      ],
      receive: ['आवश्यक अभिलेख Word र PDF मा'],
      notes: [
        'यी तीनवटा सेवा सँगै वा छुट्टाछुट्टै लिन सकिन्छ। सँगै लिँदा मूल्य कम पर्छ।',
        'लेखापरीक्षक परिवर्तनमा पुरानो लेखापरीक्षकको सहमति वा राजीनामा आवश्यक पर्न सक्छ।'
      ],
      metaTitle: 'शेयर लगत, सञ्चालक लगत र लेखापरीक्षक परिवर्तन | नेपाल',
      metaDesc: 'कम्पनीको शेयर लगत, सञ्चालक लगत अद्यावधिक तथा लेखापरीक्षक परिवर्तनका लागि आवश्यक अभिलेख र माइन्युट तयारी सेवा। NPR १५० बाट सुरु।'
    },
    en: {
      name: 'Share Register, Director Registry & Auditor Change',
      nameNp: 'शेयर लगत, सञ्चालक लगत र लेखापरीक्षक परिवर्तन',
      short: 'The statutory registers a company must keep, plus the minute for changing auditors.',
      who: 'You need to bring the share or director register up to date, or change your auditor.',
      includes: [
        'Share register (Share Lagat)',
        'Director registry',
        'Special general meeting minute for the auditor change',
        'Auditor appointment information'
      ],
      provide: [
        'Company name and registration number',
        'All shareholders with addresses and holdings',
        'Directors and their appointment dates',
        'The new auditor’s name and registration number, if changing'
      ],
      receive: ['The registers you need, in Word and PDF'],
      notes: [
        'These three can be taken together or separately. Together costs less.',
        'Changing auditor may require the outgoing auditor’s consent or resignation.'
      ],
      metaTitle: 'Share Register, Director Registry and Auditor Change Nepal',
      metaDesc: 'Share register (Share Lagat), director registry and auditor change minutes prepared for Nepali companies. From NPR 150.'
    },
    faq: [],
    related: ['share-transfer', 'annual-update-single', 'annual-update-multiple'],
    guides: ['guides/company-annual-update', 'guides/section-51-92-explained']
  },

  /* ---------------- 4. COMPANY CHANGES ---------------- */

  {
    id: 'name-change-single',
    slug: 'services/company-name-change/single-shareholder',
    category: 'company-changes',
    shareholder: 'single',
    popular: null,
    order: 1,
    price: 500,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'कम्पनीको नाम परिवर्तन — एकल शेयरधनी',
      nameEn: 'Company Name Change — Single Shareholder',
      short: 'एकल शेयरधनी कम्पनीको नाम फेर्न आवश्यक निवेदन, माइन्युट र संशोधित प्रबन्धपत्र–नियमावली।',
      who: 'तपाईंको एकल शेयरधनी कम्पनीको नाम परिवर्तन गर्नुपर्ने भएको छ।',
      includes: [
        'नाम परिवर्तनको निवेदन',
        'नाम परिवर्तन सम्बन्धी माइन्युट',
        'संशोधित प्रबन्धपत्र (MOA)',
        'संशोधित नियमावली (AOA)',
        'बैंकलाई जानकारी दिने पत्र'
      ],
      provide: [
        'कम्पनीको हालको नाम र दर्ता नम्बर',
        'प्रस्तावित नयाँ नाम (विकल्पसहित भए राम्रो)',
        'नाम फेर्नुपर्ने कारण',
        'स्थायी लेखा नम्बर (PAN)'
      ],
      receive: ['सबै कागजात Word र PDF मा', 'नाम परिवर्तनपछि कहाँ-कहाँ जानकारी दिनुपर्छ भन्ने सूची'],
      notes: [
        'नयाँ नाम स्वीकृत हुने वा नहुने कम्पनी रजिष्ट्रारको कार्यालयले तय गर्छ। हामी नाम स्वीकृतिको ग्यारेन्टी दिँदैनौं।',
        'नाम परिवर्तनपछि PAN, बैंक खाता र इजाजतपत्रमा पनि अद्यावधिक गर्नुपर्छ।'
      ],
      metaTitle: 'कम्पनीको नाम परिवर्तन — एकल शेयरधनी | निवेदन र संशोधित MOA',
      metaDesc: 'एकल शेयरधनी कम्पनीको नाम परिवर्तनका लागि निवेदन, माइन्युट र संशोधित प्रबन्धपत्र–नियमावली तयार गर्ने सेवा। NPR ५०० बाट सुरु।'
    },
    en: {
      name: 'Company Name Change — Single Shareholder',
      nameNp: 'कम्पनीको नाम परिवर्तन — एकल शेयरधनी',
      short: 'Application, minute and amended MOA/AOA for changing the name of a single-shareholder company.',
      who: 'Your single-shareholder company needs a new name.',
      includes: [
        'Application for name change',
        'Name change minute',
        'Amended Memorandum of Association',
        'Amended Articles of Association',
        'Notification letter for your bank'
      ],
      provide: [
        'Current company name and registration number',
        'Proposed new name, with alternatives if possible',
        'Reason for the change',
        'PAN'
      ],
      receive: ['All documents in Word and PDF', 'A list of who else to notify after the change'],
      notes: [
        'Whether a new name is approved is decided by the Office of the Company Registrar. We cannot guarantee approval.',
        'After the change you also need to update your PAN, bank account and any licences.'
      ],
      metaTitle: 'Company Name Change Nepal — Single Shareholder | Amended MOA',
      metaDesc: 'Name change application, minute and amended MOA/AOA for a single shareholder company in Nepal. From NPR 500.'
    },
    faq: [],
    related: ['name-change-multiple', 'address-change-single', 'bank-account', 'annual-update-single'],
    guides: ['guides/company-name-change']
  },

  {
    id: 'name-change-multiple',
    slug: 'services/company-name-change/multiple-shareholder',
    category: 'company-changes',
    shareholder: 'multiple',
    popular: null,
    order: 2,
    price: 700,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'कम्पनीको नाम परिवर्तन — बहुल शेयरधनी',
      nameEn: 'Company Name Change — Multiple Shareholder',
      short: 'बहुल शेयरधनी कम्पनीको नाम फेर्न आवश्यक निवेदन, विशेष साधारण सभा माइन्युट र संशोधित कागजात।',
      who: 'दुई वा बढी शेयरधनी भएको तपाईंको कम्पनीको नाम परिवर्तन गर्नुपर्ने भएको छ।',
      includes: [
        'नाम परिवर्तनको निवेदन',
        'सञ्चालक बैठकको माइन्युट',
        'विशेष साधारण सभाको माइन्युट',
        'संशोधित प्रबन्धपत्र (MOA)',
        'संशोधित नियमावली (AOA)',
        'बैंकलाई जानकारी दिने पत्र'
      ],
      provide: [
        'कम्पनीको हालको नाम र दर्ता नम्बर',
        'प्रस्तावित नयाँ नाम',
        'सबै शेयरधनीको नाम',
        'नाम फेर्नुपर्ने कारण',
        'स्थायी लेखा नम्बर (PAN)'
      ],
      receive: ['सबै कागजात Word र PDF मा', 'कसले कहाँ हस्ताक्षर गर्ने भन्ने सूची'],
      notes: [
        'नयाँ नाम स्वीकृत गर्ने अधिकार कार्यालयको हो।',
        'विशेष साधारण सभामा नियमावलीले तोकेको गणपूरक संख्या पुग्नुपर्छ।'
      ],
      metaTitle: 'कम्पनीको नाम परिवर्तन — बहुल शेयरधनी | विशेष साधारण सभा माइन्युट',
      metaDesc: 'बहुल शेयरधनी कम्पनीको नाम परिवर्तनका लागि निवेदन, विशेष साधारण सभा माइन्युट र संशोधित प्रबन्धपत्र–नियमावली। NPR ७०० बाट सुरु।'
    },
    en: {
      name: 'Company Name Change — Multiple Shareholder',
      nameNp: 'कम्पनीको नाम परिवर्तन — बहुल शेयरधनी',
      short: 'Application, special general meeting minute and amended documents for a multiple-shareholder name change.',
      who: 'Your company has two or more shareholders and needs a new name.',
      includes: [
        'Application for name change',
        'Board minute',
        'Special general meeting minute',
        'Amended Memorandum of Association',
        'Amended Articles of Association',
        'Notification letter for your bank'
      ],
      provide: [
        'Current company name and registration number',
        'Proposed new name',
        'All shareholder names',
        'Reason for the change',
        'PAN'
      ],
      receive: ['All documents in Word and PDF', 'A list of who signs what'],
      notes: [
        'Name approval rests with the office.',
        'The special general meeting must meet the quorum set in your articles.'
      ],
      metaTitle: 'Company Name Change Nepal — Multiple Shareholder | SGM Minute',
      metaDesc: 'Name change application, special general meeting minute and amended MOA/AOA for a multiple shareholder company in Nepal. From NPR 700.'
    },
    faq: [],
    related: ['name-change-single', 'address-change-multiple', 'bank-account', 'annual-update-multiple'],
    guides: ['guides/company-name-change']
  },

  {
    id: 'address-change-single',
    slug: 'services/company-address-change/single-shareholder',
    category: 'company-changes',
    shareholder: 'single',
    popular: null,
    order: 3,
    price: 500,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'कम्पनीको ठेगाना परिवर्तन — एकल शेयरधनी',
      nameEn: 'Company Address Change — Single Shareholder',
      short: 'एकल शेयरधनी कम्पनीको दर्ता ठेगाना परिवर्तन गर्न आवश्यक कागजात।',
      who: 'तपाईंको एकल शेयरधनी कम्पनीको दर्ता ठेगाना सर्नुपर्ने भएको छ।',
      includes: [
        'ठेगाना परिवर्तनको निवेदन',
        'ठेगाना परिवर्तन सम्बन्धी माइन्युट',
        'संशोधित प्रबन्धपत्र–नियमावली (आवश्यक परे)',
        'दफा १८४ बमोजिम ठेगानाको जानकारी'
      ],
      provide: [
        'कम्पनीको नाम र दर्ता नम्बर',
        'हालको दर्ता ठेगाना',
        'नयाँ ठेगाना — प्रदेश, जिल्ला, पालिका, वडा र टोल',
        'नयाँ ठेगानाको बहाल सम्झौता वा स्वामित्व प्रमाण'
      ],
      receive: ['सबै कागजात Word र PDF मा'],
      notes: [
        'ठेगाना अर्को पालिका वा जिल्लामा सर्दा थप प्रक्रिया लाग्न सक्छ।',
        'नयाँ ठेगानाको बहाल सम्झौता चाहिएमा हामीले त्यो पनि तयार गरिदिन्छौं।'
      ],
      metaTitle: 'कम्पनीको ठेगाना परिवर्तन — एकल शेयरधनी | दफा १८४',
      metaDesc: 'एकल शेयरधनी कम्पनीको दर्ता ठेगाना परिवर्तनका लागि निवेदन, माइन्युट र दफा १८४ बमोजिमको जानकारी तयारी सेवा। NPR ५०० बाट सुरु।'
    },
    en: {
      name: 'Company Address Change — Single Shareholder',
      nameNp: 'कम्पनीको ठेगाना परिवर्तन — एकल शेयरधनी',
      short: 'Documents for changing the registered address of a single-shareholder company.',
      who: 'Your single-shareholder company is moving its registered address.',
      includes: [
        'Application for address change',
        'Address change minute',
        'Amended MOA/AOA where required',
        'Section 184 address information'
      ],
      provide: [
        'Company name and registration number',
        'Current registered address',
        'New address — province, district, municipality, ward and locality',
        'Rent agreement or ownership proof for the new address'
      ],
      receive: ['All documents in Word and PDF'],
      notes: [
        'Moving to a different municipality or district can involve extra steps.',
        'If you need a rent agreement for the new address, we prepare that too.'
      ],
      metaTitle: 'Company Address Change Nepal — Single Shareholder | Section 184',
      metaDesc: 'Registered address change documents for a single shareholder company in Nepal — application, minute and Section 184 information. From NPR 500.'
    },
    faq: [],
    related: ['address-change-multiple', 'name-change-single', 'ward-office', 'annual-update-single'],
    guides: ['guides/company-address-change']
  },

  {
    id: 'address-change-multiple',
    slug: 'services/company-address-change/multiple-shareholder',
    category: 'company-changes',
    shareholder: 'multiple',
    popular: null,
    order: 4,
    price: 700,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'कम्पनीको ठेगाना परिवर्तन — बहुल शेयरधनी',
      nameEn: 'Company Address Change — Multiple Shareholder',
      short: 'बहुल शेयरधनी कम्पनीको दर्ता ठेगाना परिवर्तनका लागि आवश्यक कागजात।',
      who: 'दुई वा बढी शेयरधनी भएको कम्पनीको दर्ता ठेगाना सर्नुपर्ने भएको छ।',
      includes: [
        'ठेगाना परिवर्तनको निवेदन',
        'सञ्चालक बैठकको माइन्युट',
        'विशेष साधारण सभाको माइन्युट',
        'संशोधित प्रबन्धपत्र–नियमावली (आवश्यक परे)',
        'दफा १८४ बमोजिम ठेगानाको जानकारी'
      ],
      provide: [
        'कम्पनीको नाम र दर्ता नम्बर',
        'हालको र नयाँ ठेगाना',
        'सबै शेयरधनीको नाम',
        'नयाँ ठेगानाको बहाल सम्झौता वा स्वामित्व प्रमाण'
      ],
      receive: ['सबै कागजात Word र PDF मा', 'कसले कहाँ हस्ताक्षर गर्ने भन्ने सूची'],
      notes: [
        'अर्को पालिका वा जिल्लामा सर्दा थप प्रक्रिया लाग्न सक्छ।',
        'विशेष साधारण सभामा गणपूरक संख्या पुग्नुपर्छ।'
      ],
      metaTitle: 'कम्पनीको ठेगाना परिवर्तन — बहुल शेयरधनी | दफा १८४',
      metaDesc: 'बहुल शेयरधनी कम्पनीको दर्ता ठेगाना परिवर्तनका लागि निवेदन, विशेष साधारण सभा माइन्युट र दफा १८४ जानकारी। NPR ७०० बाट सुरु।'
    },
    en: {
      name: 'Company Address Change — Multiple Shareholder',
      nameNp: 'कम्पनीको ठेगाना परिवर्तन — बहुल शेयरधनी',
      short: 'Documents for changing the registered address of a multiple-shareholder company.',
      who: 'Your company has two or more shareholders and is moving its registered address.',
      includes: [
        'Application for address change',
        'Board minute',
        'Special general meeting minute',
        'Amended MOA/AOA where required',
        'Section 184 address information'
      ],
      provide: [
        'Company name and registration number',
        'Current and new address',
        'All shareholder names',
        'Rent agreement or ownership proof for the new address'
      ],
      receive: ['All documents in Word and PDF', 'A list of who signs what'],
      notes: [
        'Moving to a different municipality or district can involve extra steps.',
        'The special general meeting must meet quorum.'
      ],
      metaTitle: 'Company Address Change Nepal — Multiple Shareholder | Section 184',
      metaDesc: 'Registered address change documents for a multiple shareholder company in Nepal — application, SGM minute and Section 184 information. From NPR 700.'
    },
    faq: [],
    related: ['address-change-single', 'name-change-multiple', 'ward-office', 'annual-update-multiple'],
    guides: ['guides/company-address-change']
  },

  {
    id: 'capital-increase-single',
    slug: 'services/capital-increase/single-shareholder',
    category: 'company-changes',
    shareholder: 'single',
    popular: null,
    order: 5,
    price: 500,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'पूँजी वृद्धि — एकल शेयरधनी',
      nameEn: 'Capital Increase — Single Shareholder',
      short: 'एकल शेयरधनी कम्पनीको अधिकृत वा जारी पूँजी बढाउन आवश्यक कागजात।',
      who: 'तपाईंको एकल शेयरधनी कम्पनीको पूँजी बढाउनुपर्ने भएको छ — ऋण लिन, ठेक्का लिन वा व्यवसाय विस्तार गर्न।',
      includes: [
        'पूँजी संरचना परिवर्तनको निवेदन',
        'पूँजी वृद्धि सम्बन्धी माइन्युट',
        'संशोधित प्रबन्धपत्र (MOA)',
        'संशोधित नियमावली (AOA)',
        'अद्यावधिक शेयर बाँडफाँड विवरण'
      ],
      provide: [
        'कम्पनीको नाम र दर्ता नम्बर',
        'हालको अधिकृत र जारी पूँजी',
        'नयाँ अधिकृत र जारी पूँजी कति बनाउने',
        'थप पूँजी कसरी हाल्ने (नगद, सम्पत्ति वा मुनाफा पूँजीकरण)'
      ],
      receive: ['सबै कागजात Word र PDF मा'],
      notes: [
        'पूँजी वृद्धिमा अधिकृत पूँजीअनुसार सरकारी दस्तुर लाग्छ र त्यो यो मूल्यमा समावेश छैन।',
        'पूँजी बढाउनुअघि आफ्नो लेखापरीक्षकसँग कर सम्बन्धी असर बारे परामर्श गर्नुहोस्।'
      ],
      metaTitle: 'कम्पनी पूँजी वृद्धि — एकल शेयरधनी | संशोधित MOA र AOA',
      metaDesc: 'एकल शेयरधनी कम्पनीको अधिकृत तथा जारी पूँजी वृद्धिका लागि निवेदन, माइन्युट र संशोधित प्रबन्धपत्र–नियमावली। NPR ५०० बाट सुरु।'
    },
    en: {
      name: 'Capital Increase — Single Shareholder',
      nameNp: 'पूँजी वृद्धि — एकल शेयरधनी',
      short: 'Documents for increasing the authorised or issued capital of a single-shareholder company.',
      who: 'Your single-shareholder company needs more capital — for a loan, a tender, or expansion.',
      includes: [
        'Application for change in capital structure',
        'Capital increase minute',
        'Amended Memorandum of Association',
        'Amended Articles of Association',
        'Updated share allocation'
      ],
      provide: [
        'Company name and registration number',
        'Current authorised and issued capital',
        'New authorised and issued capital',
        'How the additional capital is coming in (cash, assets, capitalised profit)'
      ],
      receive: ['All documents in Word and PDF'],
      notes: [
        'A government fee applies based on the new authorised capital and is not included here.',
        'Talk to your auditor about the tax implications before increasing capital.'
      ],
      metaTitle: 'Capital Increase Nepal — Single Shareholder | Amended MOA and AOA',
      metaDesc: 'Capital increase documents for a single shareholder company in Nepal — application, minute and amended MOA/AOA. From NPR 500.'
    },
    faq: [],
    related: ['capital-increase-multiple', 'annual-update-single', 'registration-single'],
    guides: ['guides/capital-increase-nepal']
  },

  {
    id: 'capital-increase-multiple',
    slug: 'services/capital-increase/multiple-shareholder',
    category: 'company-changes',
    shareholder: 'multiple',
    popular: null,
    order: 6,
    price: 700,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'पूँजी वृद्धि — बहुल शेयरधनी',
      nameEn: 'Capital Increase — Multiple Shareholder',
      short: 'बहुल शेयरधनी कम्पनीको पूँजी बढाउन आवश्यक निवेदन, माइन्युट र संशोधित कागजात।',
      who: 'दुई वा बढी शेयरधनी भएको कम्पनीको पूँजी बढाउनुपर्ने भएको छ।',
      includes: [
        'पूँजी संरचना परिवर्तनको निवेदन',
        'सञ्चालक बैठकको माइन्युट',
        'विशेष साधारण सभाको माइन्युट',
        'संशोधित प्रबन्धपत्र–नियमावली',
        'प्रत्येक शेयरधनीको अद्यावधिक शेयर बाँडफाँड'
      ],
      provide: [
        'कम्पनीको नाम र दर्ता नम्बर',
        'हालको अधिकृत र जारी पूँजी',
        'नयाँ पूँजी कति बनाउने',
        'थप शेयर कसले कति लिने',
        'सबै शेयरधनीको नाम'
      ],
      receive: ['सबै कागजात Word र PDF मा', 'पूँजी वृद्धिपछिको शेयर संरचना'],
      notes: [
        'सरकारी दस्तुर अधिकृत पूँजीअनुसार लाग्छ, यो मूल्यमा समावेश छैन।',
        'सबै शेयरधनीले समानुपातिक शेयर नलिने भए त्यसले स्वामित्व अनुपात बदल्छ — त्यो निर्णय शेयरधनीहरूकै हो।'
      ],
      metaTitle: 'कम्पनी पूँजी वृद्धि — बहुल शेयरधनी | विशेष साधारण सभा माइन्युट',
      metaDesc: 'बहुल शेयरधनी कम्पनीको पूँजी वृद्धिका लागि निवेदन, विशेष साधारण सभा माइन्युट, संशोधित MOA–AOA र शेयर बाँडफाँड। NPR ७०० बाट सुरु।'
    },
    en: {
      name: 'Capital Increase — Multiple Shareholder',
      nameNp: 'पूँजी वृद्धि — बहुल शेयरधनी',
      short: 'Application, minutes and amended documents for increasing capital in a multiple-shareholder company.',
      who: 'Your company has two or more shareholders and needs to increase its capital.',
      includes: [
        'Application for change in capital structure',
        'Board minute',
        'Special general meeting minute',
        'Amended MOA and AOA',
        'Updated share allocation for each shareholder'
      ],
      provide: [
        'Company name and registration number',
        'Current authorised and issued capital',
        'New capital figures',
        'Who is taking up the additional shares',
        'All shareholder names'
      ],
      receive: ['All documents in Word and PDF', 'The resulting share structure'],
      notes: [
        'The government fee is based on authorised capital and is not included here.',
        'If shareholders do not take up shares proportionally, ownership percentages change. That is the shareholders’ decision.'
      ],
      metaTitle: 'Capital Increase Nepal — Multiple Shareholder | SGM Minute',
      metaDesc: 'Capital increase documents for a multiple shareholder company in Nepal — application, SGM minute, amended MOA/AOA and share allocation. From NPR 700.'
    },
    faq: [],
    related: ['capital-increase-single', 'share-transfer', 'annual-update-multiple'],
    guides: ['guides/capital-increase-nepal']
  },

  /* ---------------- 5. IRD / TAX ---------------- */

  {
    id: 'pan-registration',
    slug: 'services/pan-registration',
    category: 'ird-tax',
    shareholder: null,
    popular: 7,
    order: 1,
    price: 150,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'PAN दर्ता माइन्युट',
      nameEn: 'PAN Registration Minute',
      short: 'आन्तरिक राजस्व विभागमा स्थायी लेखा नम्बर दर्ता गर्न आवश्यक सञ्चालक माइन्युट र निवेदन।',
      who: 'कम्पनी दर्ता भइसकेको छ र अब स्थायी लेखा नम्बर (PAN) लिनुपर्ने भएको छ।',
      includes: [
        'PAN दर्ताको अधिकार दिने सञ्चालक माइन्युट',
        'आन्तरिक राजस्व कार्यालयमा पेस गर्ने निवेदन',
        'अधिकार प्राप्त हस्ताक्षरकर्ता तोक्ने निर्णय',
        'एकल र बहुल शेयरधनी दुवैको ढाँचा'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र दर्ता मिति',
        'दर्ता ठेगाना',
        'सञ्चालक र शेयरधनीको विवरण',
        'PAN का लागि अधिकार दिने व्यक्तिको नाम र नागरिकता'
      ],
      receive: ['माइन्युट र निवेदन Word र PDF मा'],
      notes: [
        'एकल शेयरधनी कम्पनीका लागि NPR १५०, बहुल शेयरधनी कम्पनीका लागि NPR २५० बाट सुरु।',
        'VAT दर्ता चाहिने भए त्यो छुट्टै प्रक्रिया हो — भन्नुहोस्, त्यसको कागजात पनि तयार गर्छौं।',
        'PAN दर्ता तपाईं वा तपाईंको प्रतिनिधिले आन्तरिक राजस्व कार्यालयमा गएर गर्नुपर्छ।'
      ],
      metaTitle: 'PAN दर्ता माइन्युट नेपाल | स्थायी लेखा नम्बर | IRD',
      metaDesc: 'कम्पनीको स्थायी लेखा नम्बर (PAN) दर्ताका लागि आवश्यक सञ्चालक माइन्युट, निवेदन र हस्ताक्षरकर्ता निर्णय तयार गर्ने सेवा। NPR १५० बाट सुरु।'
    },
    en: {
      name: 'PAN Registration Minute',
      nameNp: 'PAN दर्ता माइन्युट',
      short: 'The board minute and application needed to register for a PAN at the Inland Revenue Department.',
      who: 'Your company is registered and now needs its Permanent Account Number.',
      includes: [
        'Board minute authorising PAN registration',
        'Application to the Inland Revenue Office',
        'Resolution designating the authorised signatory',
        'Both single and multiple shareholder wordings'
      ],
      provide: [
        'Company name, registration number and date of incorporation',
        'Registered address',
        'Director and shareholder details',
        'Name and citizenship of the person authorised to handle PAN'
      ],
      receive: ['The minute and application in Word and PDF'],
      notes: [
        'From NPR 150 for a single-shareholder company, from NPR 250 for a multiple-shareholder company.',
        'VAT registration is a separate process. Tell us if you need it and we will prepare those documents too.',
        'You or your representative must attend the Inland Revenue Office to complete PAN registration.'
      ],
      metaTitle: 'PAN Registration Minute Nepal | IRD Company Documents',
      metaDesc: 'Board minute, application and signatory resolution for company PAN registration at the Inland Revenue Department in Nepal. From NPR 150.'
    },
    faq: [
      {
        np: { q: 'PAN र VAT फरक हो?', a: 'फरक हो। PAN सबै दर्ता कम्पनीले लिनुपर्छ। VAT भने कारोबार तोकिएको सीमा नाघेमा वा तोकिएका व्यवसायमा अनिवार्य हुन्छ। तपाईंलाई VAT चाहिन्छ कि चाहिँदैन भन्ने लेखापरीक्षकले भन्न सक्नुहुन्छ।' },
        en: { q: 'Is PAN different from VAT?', a: 'Yes. Every registered company needs a PAN. VAT applies once turnover crosses the threshold or for certain listed businesses. Your auditor can tell you whether VAT applies to you.' }
      }
    ],
    related: ['tax-clearance', 'bank-account', 'registration-single', 'initial-update-single'],
    guides: ['guides/pan-registration-documents']
  },

  {
    id: 'tax-clearance',
    slug: 'services/tax-clearance',
    category: 'ird-tax',
    shareholder: null,
    popular: 8,
    order: 2,
    price: 150,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'कर चुक्ता प्रमाणपत्र निवेदन',
      nameEn: 'Tax Clearance Certificate Application',
      short: 'आन्तरिक राजस्व कार्यालयबाट कर चुक्ता प्रमाणपत्र लिन आवश्यक निवेदन र माइन्युट।',
      who: 'ठेक्का, कर्जा, नवीकरण वा अन्य प्रयोजनका लागि कर चुक्ता प्रमाणपत्र चाहिएको छ।',
      includes: [
        'कर चुक्ता प्रमाणपत्रको निवेदन',
        'सम्बन्धित सञ्चालक बैठकको माइन्युट',
        'बिक्रम सम्बत् अनुसार सही आर्थिक वर्ष उल्लेख'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र PAN',
        'कुन आर्थिक वर्षको प्रमाणपत्र चाहिएको हो',
        'कुन प्रयोजनका लागि चाहिएको हो',
        'कर विवरण दाखिला भइसकेको प्रमाण'
      ],
      receive: ['निवेदन र माइन्युट Word र PDF मा'],
      notes: [
        'कर चुक्ता प्रमाणपत्र पाउन कर विवरण दाखिला भइसकेको र बाँकी कर तिरिसकेको हुनुपर्छ। कागजात मात्रले प्रमाणपत्र दिलाउँदैन।',
        'तपाईंको कर हिसाब र विवरण लेखापरीक्षकले हेर्नुपर्छ — हामी कर गणना गर्दैनौं।'
      ],
      metaTitle: 'कर चुक्ता प्रमाणपत्र निवेदन नेपाल | IRD',
      metaDesc: 'आन्तरिक राजस्व कार्यालयबाट कर चुक्ता प्रमाणपत्र लिनका लागि आवश्यक निवेदन र सञ्चालक माइन्युट तयार गर्ने सेवा। NPR १५० बाट सुरु।'
    },
    en: {
      name: 'Tax Clearance Certificate Application',
      nameNp: 'कर चुक्ता प्रमाणपत्र निवेदन',
      short: 'The application and minute needed to obtain a tax clearance certificate from the Inland Revenue Office.',
      who: 'You need a tax clearance certificate for a tender, a loan, a renewal or another purpose.',
      includes: [
        'Application for a tax clearance certificate',
        'Supporting board minute',
        'Correct fiscal year stated in Bikram Sambat'
      ],
      provide: [
        'Company name, registration number and PAN',
        'Which fiscal year the certificate is for',
        'What the certificate is needed for',
        'Proof that tax returns have been filed'
      ],
      receive: ['The application and minute in Word and PDF'],
      notes: [
        'A clearance certificate is only issued once returns are filed and outstanding tax is paid. Documents alone will not produce one.',
        'Your tax position and returns are your auditor’s work. We do not calculate tax.'
      ],
      metaTitle: 'Tax Clearance Certificate Application Nepal | IRD',
      metaDesc: 'Application and board minute for obtaining a tax clearance certificate from the Inland Revenue Office in Nepal. From NPR 150.'
    },
    faq: [],
    related: ['pan-registration', 'annual-update-single', 'records-auditor'],
    guides: ['guides/tax-clearance-certificate']
  },

  /* ---------------- 6. BANK ---------------- */

  {
    id: 'bank-account',
    slug: 'services/bank-account-opening',
    category: 'bank',
    shareholder: null,
    popular: null,
    order: 1,
    price: 150,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'बैंक खाता खोल्ने कागजात',
      nameEn: 'Bank Account Opening Documents',
      short: 'कम्पनीको बैंक खाता खोल्न बैंकले माग्ने सञ्चालक माइन्युट र निवेदन पत्र।',
      who: 'कम्पनीको नाममा बैंक खाता खोल्नुपर्ने, वा हस्ताक्षरकर्ता फेर्नुपर्ने भएको छ।',
      includes: [
        'खाता खोल्ने अधिकार दिने सञ्चालक माइन्युट',
        'बैंकलाई सम्बोधन गरिएको निवेदन पत्र',
        'हस्ताक्षरकर्ता र खाता सञ्चालन निर्देशन',
        'नाम वा हस्ताक्षरकर्ता परिवर्तनको जानकारी पत्र'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र PAN',
        'कुन बैंक र कुन शाखामा खाता खोल्ने',
        'को-को हस्ताक्षरकर्ता हुने',
        'खाता कसरी सञ्चालन गर्ने — एकल वा संयुक्त हस्ताक्षर'
      ],
      receive: ['माइन्युट र निवेदन Word र PDF मा'],
      notes: [
        'हरेक बैंकको आफ्नै फारम र KYC आवश्यकता हुन्छ। हामी माइन्युट र निवेदन तयार गर्छौं; बैंकको फारम तपाईंले भर्नुपर्छ।',
        'खाता खोल्ने निर्णय बैंकको हो।'
      ],
      metaTitle: 'कम्पनी बैंक खाता खोल्ने माइन्युट र निवेदन | नेपाल',
      metaDesc: 'कम्पनीको बैंक खाता खोल्न आवश्यक सञ्चालक माइन्युट, निवेदन पत्र र हस्ताक्षरकर्ता निर्देशन तयार गर्ने सेवा। NPR १५० बाट सुरु।'
    },
    en: {
      name: 'Bank Account Opening Documents',
      nameNp: 'बैंक खाता खोल्ने कागजात',
      short: 'The board minute and application letter banks ask for when opening a company account.',
      who: 'You are opening a bank account in the company’s name, or changing signatories.',
      includes: [
        'Board minute authorising the account',
        'Application letter addressed to the bank',
        'Signatory and account operating instructions',
        'Notification letter for a name or signatory change'
      ],
      provide: [
        'Company name, registration number and PAN',
        'Which bank and branch',
        'Who the signatories will be',
        'How the account operates — single or joint signature'
      ],
      receive: ['The minute and application in Word and PDF'],
      notes: [
        'Every bank has its own forms and KYC requirements. We prepare the minute and letter; you fill the bank’s own forms.',
        'Whether to open the account is the bank’s decision.'
      ],
      metaTitle: 'Company Bank Account Opening Documents Nepal',
      metaDesc: 'Board minute, application letter and signatory instructions for opening a company bank account in Nepal. From NPR 150.'
    },
    faq: [],
    related: ['pan-registration', 'registration-single', 'name-change-single'],
    guides: ['guides/company-registration-nepal']
  },

  /* ---------------- 7. TRADEMARK ---------------- */

  {
    id: 'trademark',
    slug: 'services/trademark-registration',
    category: 'trademark',
    shareholder: null,
    popular: null,
    order: 1,
    price: 1500,
    time: { np: '१–२ कार्यदिन', en: '1–2 working days' },
    np: {
      name: 'ट्रेडमार्क दर्ता निवेदन',
      nameEn: 'Trademark Registration Application',
      short: 'उद्योग विभागमा ट्रेडमार्क (छाप) दर्ता गर्न आवश्यक निवेदन र सञ्चालक माइन्युट।',
      who: 'आफ्नो व्यवसायको नाम, लोगो वा छाप कानुनी रूपमा दर्ता गर्न चाहनुहुन्छ।',
      includes: [
        'ट्रेडमार्क दर्ताको निवेदन',
        'दर्ताको अधिकार दिने सञ्चालक माइन्युट',
        'वर्गीकरण (class) सहितको विवरण',
        'एकल र बहुल शेयरधनी दुवैको ढाँचा'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र PAN',
        'दर्ता गर्न चाहेको छाप वा लोगोको स्पष्ट फाइल',
        'कुन वस्तु वा सेवाका लागि दर्ता गर्ने',
        'छाप कहिलेदेखि प्रयोगमा छ'
      ],
      receive: ['निवेदन र माइन्युट Word र PDF मा', 'कुन वर्गमा दर्ता गर्ने भन्ने सुझाव'],
      notes: [
        'ट्रेडमार्क स्वीकृत हुने वा नहुने उद्योग विभागले तय गर्छ। मिल्दोजुल्दो छाप पहिले नै दर्ता भइसकेको भए अस्वीकृत हुन सक्छ।',
        'हामी ट्रेडमार्क खोज (search) गर्दैनौं र दर्ता हुने ग्यारेन्टी दिँदैनौं।',
        'सरकारी दस्तुर छुट्टै लाग्छ।'
      ],
      metaTitle: 'ट्रेडमार्क दर्ता निवेदन नेपाल | उद्योग विभाग',
      metaDesc: 'नेपालमा ट्रेडमार्क (छाप) दर्ताका लागि उद्योग विभागमा पेस गर्ने निवेदन र सञ्चालक माइन्युट तयार गर्ने सेवा। NPR १,५०० बाट सुरु।'
    },
    en: {
      name: 'Trademark Registration Application',
      nameNp: 'ट्रेडमार्क दर्ता निवेदन',
      short: 'The application and board minute for registering a trademark with the Department of Industry.',
      who: 'You want to register your business name, logo or mark.',
      includes: [
        'Trademark registration application',
        'Board minute authorising the filing',
        'Statement of goods or services with classification',
        'Both single and multiple shareholder wordings'
      ],
      provide: [
        'Company name, registration number and PAN',
        'A clear file of the mark or logo',
        'Which goods or services it covers',
        'How long the mark has been in use'
      ],
      receive: ['The application and minute in Word and PDF', 'A suggestion on which class to file under'],
      notes: [
        'Approval rests with the Department of Industry. A similar mark already on the register can block yours.',
        'We do not run trademark searches and cannot guarantee registration.',
        'Government fees are separate.'
      ],
      metaTitle: 'Trademark Registration Application Nepal | Department of Industry',
      metaDesc: 'Trademark registration applications and board minutes prepared for filing with the Department of Industry in Nepal. From NPR 1,500.'
    },
    faq: [],
    related: ['registration-single', 'business-documents'],
    guides: []
  },

  /* ---------------- 8. LABOUR ---------------- */

  {
    id: 'labour-audit',
    slug: 'services/labour-audit',
    category: 'labour',
    shareholder: null,
    popular: null,
    order: 1,
    price: 500,
    time: { np: '१ कार्यदिन', en: '1 working day' },
    np: {
      name: 'श्रम अडिट र रोजगार सम्झौता',
      nameEn: 'Labour Audit & Employment Agreement',
      short: 'श्रम अडिटका लागि आवश्यक विवरण र कर्मचारीसँगको रोजगार सम्झौता।',
      who: 'कर्मचारी राख्नुभएको छ र श्रम सम्बन्धी कागजात मिलाउनुपर्ने भएको छ।',
      includes: [
        'श्रम अडिटका लागि आवश्यक विवरण ढाँचा',
        'रोजगार सम्झौता (स्थायी, करार वा परीक्षणकाल)',
        'नियुक्ति पत्र',
        'कर्मचारी अभिलेख ढाँचा'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र PAN',
        'कर्मचारी संख्या र पद',
        'तलब र सुविधाको संरचना',
        'सामाजिक सुरक्षा कोषमा दर्ता भए नभएको'
      ],
      receive: ['सम्झौता र ढाँचा Word र PDF मा'],
      notes: [
        'श्रम ऐन र सामाजिक सुरक्षा कोषका आवश्यकता समय-समयमा फेरिन्छन्। जटिल विषयमा श्रम विशेषज्ञ वा अधिवक्तासँग परामर्श गर्नुहोस्।',
        'न्यूनतम पारिश्रमिक र सुविधा सरकारले तोक्छ — हामी त्यो तय गर्दैनौं।'
      ],
      metaTitle: 'श्रम अडिट र रोजगार सम्झौता तयारी | नेपाल',
      metaDesc: 'श्रम अडिटका लागि आवश्यक विवरण, रोजगार सम्झौता, नियुक्ति पत्र र कर्मचारी अभिलेख ढाँचा तयार गर्ने सेवा। NPR ५०० बाट सुरु।'
    },
    en: {
      name: 'Labour Audit & Employment Agreement',
      nameNp: 'श्रम अडिट र रोजगार सम्झौता',
      short: 'Labour audit documentation and employment agreements for your staff.',
      who: 'You have employees and need your labour paperwork in order.',
      includes: [
        'Labour audit information format',
        'Employment agreement (permanent, contract or probation)',
        'Appointment letter',
        'Employee record format'
      ],
      provide: [
        'Company name, registration number and PAN',
        'Number of employees and their positions',
        'Salary and benefit structure',
        'Whether you are registered with the Social Security Fund'
      ],
      receive: ['Agreements and formats in Word and PDF'],
      notes: [
        'Labour Act and Social Security Fund requirements change. For anything complicated, consult a labour specialist or advocate.',
        'Minimum wages and benefits are set by the government, not by us.'
      ],
      metaTitle: 'Labour Audit and Employment Agreement Nepal',
      metaDesc: 'Labour audit documentation, employment agreements, appointment letters and employee record formats for Nepali companies. From NPR 500.'
    },
    faq: [],
    related: ['business-documents', 'annual-update-single'],
    guides: []
  },

  /* ---------------- 9. WARD OFFICE ---------------- */

  {
    id: 'ward-office',
    slug: 'services/ward-office-documents',
    category: 'ward',
    shareholder: null,
    popular: null,
    order: 1,
    price: 200,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'वडा कार्यालयका कागजात',
      nameEn: 'Ward Office Documents',
      short: 'बहाल सम्झौता, चार किल्ला प्रमाणित, धितो मस्यौदा र सिफारिस निवेदन।',
      who: 'वडा कार्यालयमा पेस गर्ने कागजात चाहिएको छ — प्रायः कम्पनीको ठेगाना दर्ता वा नवीकरणका लागि।',
      includes: [
        'बहाल सम्झौता — घरधनी र कम्पनीबीच',
        'चार किल्ला प्रमाणित निवेदन',
        'धितो मस्यौदा',
        'स्थायी बसोबास सिफारिस निवेदन',
        'अदालती शुल्क दाखिला निवेदन'
      ],
      provide: [
        'कम्पनी वा व्यक्तिको नाम र ठेगाना',
        'घरधनीको नाम, नागरिकता र सम्पर्क',
        'जग्गा वा घरको कित्ता नम्बर र चार किल्ला',
        'बहाल रकम र अवधि (बहाल सम्झौता भए)'
      ],
      receive: ['आवश्यक कागजात Word र PDF मा'],
      notes: [
        'हरेक वडा कार्यालयको आफ्नै अतिरिक्त माग हुन सक्छ। सम्भव भए आफ्नो वडामा एकपटक सोधेर आउनुहोस्।',
        'जग्गा वा स्वामित्वको विवाद भएमा त्यो कानुनी विषय हो — अधिवक्तासँग परामर्श गर्नुहोस्।'
      ],
      metaTitle: 'वडा कार्यालयका कागजात | बहाल सम्झौता र चार किल्ला',
      metaDesc: 'वडा कार्यालयमा पेस गर्ने बहाल सम्झौता, चार किल्ला प्रमाणित निवेदन, धितो मस्यौदा र बसोबास सिफारिस तयार गर्ने सेवा। NPR २०० बाट सुरु।'
    },
    en: {
      name: 'Ward Office Documents',
      nameNp: 'वडा कार्यालयका कागजात',
      short: 'Rent agreements, four-boundary certification, mortgage drafts and recommendation applications.',
      who: 'You need documents for your ward office — usually for a company address registration or renewal.',
      includes: [
        'Rent agreement between landlord and company',
        'Four-boundary certification application',
        'Mortgage draft',
        'Permanent residence recommendation application',
        'Court fee submission application'
      ],
      provide: [
        'Company or individual name and address',
        "Landlord's name, citizenship and contact",
        'Plot number and the four boundaries',
        'Rent amount and term, for a rent agreement'
      ],
      receive: ['The documents you need, in Word and PDF'],
      notes: [
        'Each ward office may ask for extra things. If you can, check with yours first.',
        'Any dispute over land or ownership is a legal matter — consult an advocate.'
      ],
      metaTitle: 'Ward Office Documents Nepal | Rent Agreement, Four Boundaries',
      metaDesc: 'Rent agreements, four-boundary certification, mortgage drafts and residence recommendation applications for ward office submission in Nepal. From NPR 200.'
    },
    faq: [],
    related: ['address-change-single', 'registration-single'],
    guides: ['guides/company-address-change']
  },

  /* ---------------- 10. BUSINESS & STARTUP ---------------- */

  {
    id: 'business-documents',
    slug: 'services/business-agreements',
    category: 'business',
    shareholder: null,
    popular: null,
    order: 1,
    price: 300,
    time: { np: 'सोही दिन – १ कार्यदिन', en: 'Same day – 1 working day' },
    np: {
      name: 'व्यवसायिक सम्झौता र NDA',
      nameEn: 'Business Agreements & NDA',
      short: 'गोपनीयता सम्झौता, सेवा सम्झौता र संस्थापकबीचको सम्झौता।',
      who: 'ग्राहक, साझेदार वा सह-संस्थापकसँग लिखित सम्झौता गर्नुपर्ने भएको छ।',
      includes: [
        'गोपनीयता सम्झौता (NDA) — एकतर्फी वा दुईतर्फी',
        'सेवा वा ठेक्का सम्झौता',
        'संस्थापकबीचको सम्झौता (founders’ agreement)',
        'फ्रिल्यान्स वा परामर्श सम्झौता'
      ],
      provide: [
        'दुवै पक्षको पूरा नाम र ठेगाना',
        'सम्झौताको विषय — के काम, कति अवधि',
        'भुक्तानीको शर्त',
        'विशेष शर्त भए त्यसको विवरण'
      ],
      receive: ['सम्झौता Word र PDF मा, नेपाली वा अंग्रेजी जुन चाहिन्छ'],
      notes: [
        'यी सम्झौता सामान्य व्यावसायिक प्रयोजनका लागि तयार गरिन्छन्। ठूलो रकम वा जटिल शर्त भएको सम्झौतामा अधिवक्ताबाट जाँच गराउनुहोस्।',
        'हामी कानुनी सल्लाह दिँदैनौं — तपाईंले भन्नुभएका शर्त लिखित रूपमा उतार्छौं।'
      ],
      metaTitle: 'NDA र व्यवसायिक सम्झौता तयारी नेपाल',
      metaDesc: 'स्टार्टअप र साना व्यवसायका लागि गोपनीयता सम्झौता (NDA), सेवा सम्झौता र संस्थापक सम्झौता नेपाली वा अंग्रेजीमा तयार गर्ने सेवा। NPR ३०० बाट सुरु।'
    },
    en: {
      name: 'Business Agreements & NDA',
      nameNp: 'व्यवसायिक सम्झौता र NDA',
      short: 'Non-disclosure agreements, service contracts and founder agreements.',
      who: 'You need something in writing with a client, a partner or a co-founder.',
      includes: [
        'Non-disclosure agreement, one-way or mutual',
        'Service or contracting agreement',
        'Founders’ agreement',
        'Freelance or consulting agreement'
      ],
      provide: [
        'Full names and addresses of both parties',
        'What the agreement covers and for how long',
        'Payment terms',
        'Any special conditions'
      ],
      receive: ['The agreement in Word and PDF, in Nepali or English'],
      notes: [
        'These are drafted for ordinary commercial use. For high-value or complex agreements, have an advocate review them.',
        'We do not give legal advice — we put the terms you give us into writing.'
      ],
      metaTitle: 'NDA and Business Agreement Drafting Nepal',
      metaDesc: 'Non-disclosure agreements, service contracts and founder agreements drafted in Nepali or English for startups and small businesses. From NPR 300.'
    },
    faq: [],
    related: ['labour-audit', 'trademark', 'registration-multiple'],
    guides: []
  },

  /* ---------------- 11. OTHER ---------------- */

  {
    id: 'camis-recovery-single',
    slug: 'services/camis-password-recovery/single-shareholder',
    category: 'other',
    shareholder: 'single',
    popular: null,
    order: 1,
    price: 800,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'OCR / CAMIS पासवर्ड रिकभरी — एकल शेयरधनी',
      nameEn: 'OCR / CAMIS Password Recovery — Single Shareholder',
      short: 'CAMIS को लगइन वा पासवर्ड बिर्सिएमा पुनःप्राप्तिका लागि निवेदन र माइन्युट।',
      who: 'तपाईंको एकल शेयरधनी कम्पनीको CAMIS लगइन वा पासवर्ड हराएको छ।',
      includes: [
        'रजिष्ट्रारको कार्यालयमा पेस गर्ने रिकभरी निवेदन',
        'सम्बन्धित सञ्चालक माइन्युट',
        'अधिकार प्राप्त व्यक्ति तोक्ने निर्णय'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र PAN',
        'दर्ता प्रमाणपत्रको प्रतिलिपि',
        'सञ्चालकको नागरिकता प्रतिलिपि',
        'पहिले प्रयोग गरेको इमेल वा सम्पर्क नम्बर, थाहा भए'
      ],
      receive: ['निवेदन र माइन्युट Word र PDF मा'],
      notes: [
        'रिकभरी स्वीकृत गर्ने र नयाँ पासवर्ड दिने काम कम्पनी रजिष्ट्रारको कार्यालयले गर्छ। हामी कागजात मात्र तयार गर्छौं।',
        'कार्यालयले थप प्रमाण माग्न सक्छ।'
      ],
      metaTitle: 'OCR CAMIS पासवर्ड रिकभरी — एकल शेयरधनी | निवेदन र माइन्युट',
      metaDesc: 'CAMIS पासवर्ड वा लगइन हराएमा कम्पनी रजिष्ट्रारको कार्यालयमा पेस गर्ने रिकभरी निवेदन र सञ्चालक माइन्युट। NPR ८०० बाट सुरु।'
    },
    en: {
      name: 'OCR / CAMIS Password Recovery — Single Shareholder',
      nameNp: 'OCR / CAMIS पासवर्ड रिकभरी — एकल शेयरधनी',
      short: 'Application and minute for recovering a lost CAMIS login or password.',
      who: 'Your single-shareholder company has lost access to its CAMIS account.',
      includes: [
        'Recovery application to the Registrar',
        'Supporting board minute',
        'Resolution designating the authorised person'
      ],
      provide: [
        'Company name, registration number and PAN',
        'Copy of the registration certificate',
        'Director’s citizenship copy',
        'The email or phone previously used, if known'
      ],
      receive: ['The application and minute in Word and PDF'],
      notes: [
        'Approving recovery and issuing a new password is done by the Office of the Company Registrar. We only prepare the documents.',
        'The office may ask for additional proof.'
      ],
      metaTitle: 'OCR CAMIS Password Recovery Nepal — Single Shareholder',
      metaDesc: 'Recovery application and board minute for a lost CAMIS login or password, for single shareholder companies in Nepal. From NPR 800.'
    },
    faq: [],
    related: ['camis-recovery-multiple', 'annual-update-single', 'records-auditor'],
    guides: ['guides/camis-password-recovery']
  },

  {
    id: 'camis-recovery-multiple',
    slug: 'services/camis-password-recovery/multiple-shareholder',
    category: 'other',
    shareholder: 'multiple',
    popular: null,
    order: 2,
    price: 1000,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'OCR / CAMIS पासवर्ड रिकभरी — बहुल शेयरधनी',
      nameEn: 'OCR / CAMIS Password Recovery — Multiple Shareholder',
      short: 'बहुल शेयरधनी कम्पनीको CAMIS पहुँच पुनःप्राप्तिका लागि निवेदन र माइन्युट।',
      who: 'दुई वा बढी शेयरधनी भएको तपाईंको कम्पनीको CAMIS लगइन हराएको छ।',
      includes: [
        'रजिष्ट्रारको कार्यालयमा पेस गर्ने रिकभरी निवेदन',
        'सञ्चालक समितिको माइन्युट',
        'अधिकार प्राप्त व्यक्ति तोक्ने सर्वसम्मत निर्णय'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र PAN',
        'दर्ता प्रमाणपत्रको प्रतिलिपि',
        'सबै सञ्चालकको नागरिकता प्रतिलिपि',
        'पहिले प्रयोग गरेको इमेल वा सम्पर्क, थाहा भए'
      ],
      receive: ['निवेदन र माइन्युट Word र PDF मा', 'कसले हस्ताक्षर गर्ने भन्ने सूची'],
      notes: [
        'रिकभरी स्वीकृतिको अधिकार कार्यालयको हो।',
        'सबै सञ्चालकको सहमति चाहिन सक्छ।'
      ],
      metaTitle: 'OCR CAMIS पासवर्ड रिकभरी — बहुल शेयरधनी कम्पनी',
      metaDesc: 'बहुल शेयरधनी कम्पनीको CAMIS पासवर्ड रिकभरीका लागि निवेदन, सञ्चालक माइन्युट र अधिकार निर्णय। NPR १,००० बाट सुरु।'
    },
    en: {
      name: 'OCR / CAMIS Password Recovery — Multiple Shareholder',
      nameNp: 'OCR / CAMIS पासवर्ड रिकभरी — बहुल शेयरधनी',
      short: 'Application and minutes for recovering CAMIS access for a multiple-shareholder company.',
      who: 'Your company has two or more shareholders and has lost its CAMIS login.',
      includes: [
        'Recovery application to the Registrar',
        'Board of Directors minute',
        'Unanimous resolution designating the authorised person'
      ],
      provide: [
        'Company name, registration number and PAN',
        'Copy of the registration certificate',
        'Citizenship copies for all directors',
        'The email or phone previously used, if known'
      ],
      receive: ['The application and minute in Word and PDF', 'A list of who signs'],
      notes: ['Approval rests with the office.', 'Consent from all directors may be required.'],
      metaTitle: 'OCR CAMIS Password Recovery Nepal — Multiple Shareholder',
      metaDesc: 'Recovery application, board minute and authorisation resolution for a lost CAMIS login, for multiple shareholder companies. From NPR 1,000.'
    },
    faq: [],
    related: ['camis-recovery-single', 'annual-update-multiple', 'records-auditor'],
    guides: ['guides/camis-password-recovery']
  },

  {
    id: 'pratilipi',
    slug: 'services/certified-copies',
    category: 'other',
    shareholder: null,
    popular: null,
    order: 3,
    price: 150,
    time: { np: 'सोही दिन', en: 'Same day' },
    np: {
      name: 'प्रतिलिपि र खारेजी कागजात',
      nameEn: 'Certified Copies & De-registration',
      short: 'कागजातको प्रतिलिपि माग्ने निवेदन र कम्पनी खारेजीसम्बन्धी कागजात।',
      who: 'कम्पनीको दर्ता प्रमाणपत्र वा अन्य कागजातको प्रतिलिपि चाहिएको छ, वा कम्पनी खारेज गर्नुपर्ने भएको छ।',
      includes: [
        'प्रतिलिपि माग्ने निवेदन',
        'कम्पनी खारेजीको निवेदन',
        'खारेजी सम्बन्धी विशेष साधारण सभा माइन्युट'
      ],
      provide: [
        'कम्पनीको नाम, दर्ता नम्बर र PAN',
        'कुन कागजातको प्रतिलिपि चाहिएको हो',
        'खारेजी भए त्यसको कारण'
      ],
      receive: ['निवेदन र माइन्युट Word र PDF मा'],
      notes: [
        'कम्पनी खारेजी लामो प्रक्रिया हो र त्यसअघि कर तथा अन्य दायित्व चुक्ता भएको हुनुपर्छ।',
        'खारेजीको निर्णय गर्नुअघि लेखापरीक्षक र आवश्यक परे अधिवक्तासँग परामर्श गर्नुहोस्।'
      ],
      metaTitle: 'कागजात प्रतिलिपि र कम्पनी खारेजी निवेदन | नेपाल',
      metaDesc: 'कम्पनीको कागजात प्रतिलिपि माग्ने निवेदन तथा कम्पनी खारेजीसम्बन्धी निवेदन र माइन्युट तयार गर्ने सेवा। NPR १५० बाट सुरु।'
    },
    en: {
      name: 'Certified Copies & De-registration',
      nameNp: 'प्रतिलिपि र खारेजी कागजात',
      short: 'Applications for certified copies of company documents and for company de-registration.',
      who: 'You need a copy of your registration certificate or other documents, or you are closing the company.',
      includes: [
        'Application for certified copies',
        'Company de-registration application',
        'Special general meeting minute for de-registration'
      ],
      provide: [
        'Company name, registration number and PAN',
        'Which documents you need copies of',
        'The reason for de-registration, if applicable'
      ],
      receive: ['The application and minute in Word and PDF'],
      notes: [
        'De-registration is a long process and all tax and other obligations must be settled first.',
        'Talk to your auditor, and an advocate if needed, before deciding to close a company.'
      ],
      metaTitle: 'Certified Copies and Company De-registration Nepal',
      metaDesc: 'Applications for certified copies of company documents and for company de-registration in Nepal. From NPR 150.'
    },
    faq: [],
    related: ['camis-recovery-single', 'tax-clearance', 'annual-update-single'],
    guides: []
  }
];

module.exports = { services: services.filter(s => s.active !== false) };
