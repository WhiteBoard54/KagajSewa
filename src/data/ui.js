/* ============================================================
   UI STRINGS, HOMEPAGE COPY, FAQ AND LEGAL PAGES
   Every user-visible string that is not a service or a guide.
   ============================================================ */

const ui = {
  np: {
    lang: 'ne',
    langLabel: 'नेपाली',
    dir: 'ltr',
    skip: 'मुख्य सामग्रीमा जानुहोस्',

    nav: {
      services: 'सेवाहरू',
      how: 'कसरी काम गर्छ',
      why: 'किन हामी',
      guides: 'गाइड',
      faq: 'प्रश्नोत्तर',
      contact: 'सम्पर्क',
      cta: 'सेवा अनुरोध गर्नुहोस्',
      menu: 'मेनु',
      close: 'बन्द गर्नुहोस्'
    },

    cta: {
      primary: 'सेवा अनुरोध गर्नुहोस्',
      secondary: 'मूल्य सोध्नुहोस्',
      view: 'सेवा हेर्नुहोस्',
      viewAll: 'सबै सेवाहरू हेर्नुहोस्',
      prepare: 'कागजात तयार गराउनुहोस्',
      call: 'फोन गर्नुहोस्',
      whatsapp: 'WhatsApp',
      viber: 'Viber',
      email: 'इमेल पठाउनुहोस्',
      allGuides: 'सबै गाइड हेर्नुहोस्',
      backHome: 'गृहपृष्ठमा फर्कनुहोस्'
    },

    common: {
      home: 'गृहपृष्ठ',
      services: 'सेवाहरू',
      guides: 'गाइड',
      from: 'सुरुवाती मूल्य',
      startingAt: 'NPR {price} बाट सुरु',
      price: 'मूल्य',
      time: 'तयारी समय',
      popular: 'लोकप्रिय',
      single: 'एकल शेयरधनी',
      multiple: 'बहुल शेयरधनी',
      bothTypes: 'एकल र बहुल दुवै',
      shareholderType: 'शेयरधनी प्रकार',
      category: 'श्रेणी',
      office: 'सम्बन्धित कार्यालय',
      included: 'यसमा के-के समावेश छ',
      whoFor: 'यो सेवा कसका लागि',
      youProvide: 'तपाईंले दिनुपर्ने विवरण',
      youReceive: 'तपाईंले पाउनुहुने',
      importantNotes: 'महत्त्वपूर्ण जानकारी',
      relatedServices: 'सम्बन्धित सेवाहरू',
      relatedGuides: 'सम्बन्धित गाइड',
      variants: 'नामसारीका प्रकार',
      faqTitle: 'यस सेवाबारे प्रश्नोत्तर',
      updated: 'अन्तिम अद्यावधिक',
      sources: 'सम्बन्धित सरकारी स्रोत',
      inThisCategory: 'यस श्रेणीका सेवाहरू',
      servicesCount: 'सेवा',
      readGuide: 'गाइड पढ्नुहोस्',
      onThisPage: 'यस पृष्ठमा',
      breadcrumb: 'ब्रेडक्रम्ब'
    },

    search: {
      label: 'सेवा खोज्नुहोस्',
      placeholder: 'तपाईंलाई कुन सेवा वा कागजात चाहिन्छ?',
      hint: 'जस्तै: कम्पनी दर्ता, वार्षिक अद्यावधिक, शेयर नामसारी, PAN, कर चुक्ता',
      noResults: 'मिल्दो सेवा भेटिएन। सिधै सम्पर्क गर्नुहोस् — के चाहिएको हो भन्नुहोस्, हामी भन्छौं।',
      resultsLabel: 'खोजको नतिजा'
    },

    hero: {
      eyebrow: 'OCR / CAMIS · IRD · वडा कार्यालय',
      h1: 'नेपालमा कम्पनी दर्ता, अद्यावधिक र आवश्यक कागजात तयार गर्नुहोस्',
      lede: 'कम्पनी रजिष्ट्रारको कार्यालय (OCR/CAMIS), आन्तरिक राजस्व विभाग (IRD) तथा व्यवसायसँग सम्बन्धित आवश्यक माइन्युट, निवेदन र कागजातहरू सही ढाँचामा तयार गर्न कागज सेवाले सहयोग गर्छ।',
      sub: 'सही ढाँचामा तयार, पेस गर्न सजिलो।',
      benefits: [
        { t: 'Word + PDF', d: 'सम्पादन गर्न मिल्ने Word र छाप्न तयार PDF, दुवै' },
        { t: 'बिक्रम सम्बत् मिति', d: 'नेपाली अंक र अक्षरमा रकमसहित' },
        { t: 'नेपाली ढाँचा', d: 'कार्यालयले खोज्ने ढाँचा र भाषामा' },
        { t: 'सोही दिन', d: 'अधिकांश कागजात सोही दिन तयार' },
        { t: 'स्पष्ट मूल्य', d: 'सरकारी दस्तुर छुट्टै — कहिल्यै लुकाइँदैन' },
        { t: 'मानव सहायता', d: 'फारम होइन, कुरा गर्ने मान्छे' }
      ],
      noAccount: 'खाता चाहिँदैन। फारम भर्नु पर्दैन। के चाहिन्छ भन्नुहोस्, पुग्छ।'
    },

    home: {
      popularH: 'धेरै खोजिने सेवाहरू',
      popularSub: 'सबैभन्दा धेरै माग हुने कागजात सेवाहरू। तपाईंको कम्पनीमा एक जना शेयरधनी हुनुहुन्छ कि धेरै — त्यहीअनुसार छान्नुहोस्।',
      categoriesH: 'सेवा श्रेणीहरू',
      categoriesSub: 'कुन कार्यालयको काम हो भन्नेअनुसार सेवाहरू छुट्याइएका छन्।',
      shareholderH: 'तपाईंको कम्पनीमा कति जना शेयरधनी हुनुहुन्छ?',
      shareholderSub: 'धेरै सेवामा कागजातको ढाँचा शेयरधनी संख्याअनुसार फरक हुन्छ। सही विकल्प छान्नुभयो भने ठीक कागजात पाउनुहुन्छ।',
      singleCard: {
        t: 'एक जना मात्र',
        d: 'सम्पूर्ण शेयर एकै व्यक्तिको नाममा छ। नियमावली, माइन्युट र दफा ९२ विवरण सरल हुन्छन्।',
        cta: 'एकल शेयरधनी सेवाहरू'
      },
      multipleCard: {
        t: 'दुई वा बढी',
        d: 'शेयर धेरै जनाबीच बाँडिएको छ। विशेष साधारण सभा, गणपूरक संख्या र शेयर बाँडफाँडको विवरण थपिन्छ।',
        cta: 'बहुल शेयरधनी सेवाहरू'
      },
      whyH: 'किन कागज सेवा',
      whySub: 'कागजको मूल्य कार्यालयको काउन्टरले तय गर्छ। यहाँका सबै कुरा त्यही सोचेर बनाइएका हुन्।',
      howH: 'कसरी काम गर्छ',
      howSub: 'खाता खोल्नु पर्दैन। तीन चरणमा सकिन्छ र प्रायः सोही दिन।',
      guidesH: 'सरकारी प्रक्रिया गाइड',
      guidesSub: 'कागजात किन्नुअघि प्रक्रिया बुझ्न चाहनुहुन्छ भने — यी गाइड नि:शुल्क छन्।',
      faqH: 'बारम्बार सोधिने प्रश्न',
      faqSub: 'तपाईंको प्रश्न यहाँ छैन भने सोध्नुहोस् — जवाफ नि:शुल्क छ।',
      contactH: 'के चाहिन्छ भन्नुहोस्। आजै मूल्य भन्छौं।',
      contactSub: 'फोन, Viber, WhatsApp वा इमेल — जुन सजिलो छ। कम्पनीको नाम र के गर्नुपर्ने हो लेख्नुहोस्, मूल्य र समय तुरुन्तै पाउनुहुन्छ।'
    },

    why: [
      { t: 'अस्वीकृत भए सच्याउँछौं, रकम फिर्ता', d: 'हामीले तयार पारेको कागजात ढाँचा वा त्रुटिका कारण फिर्ता भएमा नि:शुल्क सच्याउँछौं र तपाईंले तिरेको सेवा शुल्क फिर्ता गर्छौं। यही वाचाले ढाँचा अद्यावधिक राख्न बाध्य पार्छ।', i: 'shield' },
      { t: 'बिक्रम सम्बत्, ठीकसँग', d: 'बिक्रम सम्बत् मिति, नेपाली अंक र लाख–करोडमा अक्षरले लेखिएको रकम। श्रावणबाट गणना हुने आर्थिक वर्ष। फाइल फिर्ता गराउने साना कुराहरू।', i: 'calendar' },
      { t: 'Word फाइल पनि पाउनुहुन्छ', d: 'बन्द PDF मात्र होइन। नाम फेर्नुहोस्, मिति मिलाउनुहोस्, बुँदा थप्नुहोस् — कागजात तपाईंको हो। काउन्टरका लागि छाप्न तयार PDF पनि सँगै।', i: 'doc' },
      { t: 'विवरण एकपटक मात्र', d: 'तपाईंको कम्पनीको विवरण — शेयरधनी, सञ्चालक, पूँजी, ठेगाना — हामीसँग रहन्छ। अर्को पटक एउटा सन्देश पुग्छ, फारम भर्नु पर्दैन।', i: 'layers' },
      { t: 'म्याद अगावै सम्झाउँछौं', d: 'वार्षिक अद्यावधिक र कर दाखिलाका मिति बिर्सन सजिलो, बिर्सँदा महँगो। म्याद आउनुअघि जानकारी गराउँछौं — तपाईंले हामीबाट अर्डर गर्नुभएको छ वा छैन।', i: 'clock' },
      { t: 'फारम होइन, मान्छे', d: 'सन्देश पठाउनुहोस्, तपाईंकै अवस्थाबारे वास्तविक जवाफ पाउनुहुन्छ — तपाईंले मागेको कागजात आवश्यक छैन भन्ने भए त्यो पनि भन्छौं।', i: 'chat' }
    ],

    steps: [
      { t: 'आवश्यकता बताउनुहोस्', d: 'फोन, Viber, WhatsApp वा इमेल मार्फत आफ्नो आवश्यकता पठाउनुहोस्। कम्पनीको दर्ता प्रमाणपत्र र गत वर्षको फाइलको फोटो भए प्रायः पुग्छ।' },
      { t: 'हामी कागजात तयार गर्छौं', d: 'आवश्यक विवरण र कागजातका आधारमा सम्बन्धित ढाँचामा तयार गर्छौं। बिक्रम सम्बत् मिति, नेपाली अंक र रकम अक्षरमा — सबै जाँचेर।' },
      { t: 'जाँच्नुहोस्, हस्ताक्षर गर्नुहोस्, पेस गर्नुहोस्', d: 'Word र PDF प्राप्त गर्नुहोस्, आवश्यक परिवर्तन गर्नुहोस्, हस्ताक्षर र छाप लगाई सम्बन्धित कार्यालयमा आफैं पेस गर्नुहोस्।' }
    ],

    pricing: {
      h: 'मूल्य कसरी तय हुन्छ',
      startNote: 'तल देखाइएका मूल्य सुरुवाती दर हुन्।',
      varyNote: 'अन्तिम मूल्य कम्पनीको संरचना, शेयरधनी संख्या र आवश्यक कागजातअनुसार फरक पर्न सक्छ। अर्डर गर्नुअघि हामी ठ्याक्कै मूल्य भन्छौं।',
      govFeeTitle: 'सरकारी दस्तुर छुट्टै',
      govFeeNote: 'कागज सेवाको शुल्क कागजात तयार गरेबापतको मात्र हो। कम्पनी रजिष्ट्रारको कार्यालय, आन्तरिक राजस्व कार्यालय, वडा कार्यालय वा अन्य निकायमा तिर्नुपर्ने सरकारी दस्तुर, जरिवाना र कर यसमा समावेश छैन। ती तपाईंले सिधै सम्बन्धित कार्यालयमा तिर्नुहुन्छ।',
      payTitle: 'भुक्तानी',
      payNote: 'कागजात हेरेर चित्त बुझेपछि eSewa, Khalti वा बैंक ट्रान्सफरबाट। यो वेबसाइटमा अहिले अनलाइन भुक्तानी छैन।'
    },

    contact: {
      h: 'सम्पर्क',
      phone: 'फोन · Viber · WhatsApp',
      email: 'इमेल',
      hours: 'कार्यालय समय',
      reply: 'जवाफ समय',
      payment: 'भुक्तानी माध्यम',
      what: 'सन्देशमा के लेख्ने',
      whatList: [
        'कम्पनीको नाम',
        'कुन सेवा चाहिएको हो',
        'एकल कि बहुल शेयरधनी कम्पनी',
        'कहिलेसम्म चाहिएको हो'
      ],
      stickyCta: 'सेवा अनुरोध गर्नुहोस्'
    },

    footer: {
      companyServices: 'कम्पनी सेवा',
      taxServices: 'कर तथा IRD',
      guides: 'गाइड',
      about: 'कागज सेवा',
      legal: 'कानुनी',
      blurb: 'नेपाली व्यवसायका लागि कम्पनी रजिष्ट्रार र आन्तरिक राजस्व कार्यालयका कागजात — सही ढाँचामा तयार, पेस गर्न सजिलो।',
      rights: 'सर्वाधिकार सुरक्षित',
      terms: 'सेवाका शर्तहरू',
      privacy: 'गोपनीयता नीति',
      refund: 'फिर्ता नीति',
      disclaimer: 'अस्वीकरण'
    },

    disclaimer: 'कागज सेवा कागजात तयारी सेवा हो। हामी कानुनी सल्लाह दिँदैनौं, कुनै सरकारी निकायको प्रतिनिधित्व गर्दैनौं र कुनै सरकारी निकायसँग सम्बद्ध छैनौं। कागजात सेवाग्राहीले उपलब्ध गराएको विवरणका आधारमा तयार गरिन्छ। अन्तिम जाँच, हस्ताक्षर तथा सम्बन्धित कार्यालयमा पेस गर्ने जिम्मेवारी सेवाग्राहीकै हुन्छ।',

    notFound: {
      h: 'यो पृष्ठ भेटिएन',
      p: 'खोज्नुभएको पृष्ठ सारिएको वा हटाइएको हुन सक्छ। तलबाट सेवा खोज्नुहोस् वा गृहपृष्ठमा फर्कनुहोस्।',
      metaTitle: 'पृष्ठ भेटिएन | कागज सेवा'
    }
  },

  en: {
    lang: 'en',
    langLabel: 'English',
    dir: 'ltr',
    skip: 'Skip to content',

    nav: {
      services: 'Delete Later',
      how: 'How it works',
      why: 'Why us',
      guides: 'Guides',
      faq: 'FAQ',
      contact: 'Contact',
      cta: 'Request a service',
      menu: 'Menu',
      close: 'Close'
    },

    cta: {
      primary: 'Request a service',
      secondary: 'Ask for a price',
      view: 'View service',
      viewAll: 'View all services',
      prepare: 'Get documents prepared',
      call: 'Call',
      whatsapp: 'WhatsApp',
      viber: 'Viber',
      email: 'Send an email',
      allGuides: 'View all guides',
      backHome: 'Back to home'
    },

    common: {
      home: 'Home',
      services: 'Services',
      guides: 'Guides',
      from: 'Starting price',
      startingAt: 'From NPR {price}',
      price: 'Price',
      time: 'Preparation time',
      popular: 'Popular',
      single: 'Single shareholder',
      multiple: 'Multiple shareholder',
      bothTypes: 'Single and multiple',
      shareholderType: 'Shareholder type',
      category: 'Category',
      office: 'Office',
      included: 'What is included',
      whoFor: 'Who this is for',
      youProvide: 'What you provide',
      youReceive: 'What you receive',
      importantNotes: 'Important notes',
      relatedServices: 'Related services',
      relatedGuides: 'Related guides',
      variants: 'Transfer types',
      faqTitle: 'Questions about this service',
      updated: 'Last updated',
      sources: 'Official sources',
      inThisCategory: 'Services in this category',
      servicesCount: 'services',
      readGuide: 'Read the guide',
      onThisPage: 'On this page',
      breadcrumb: 'Breadcrumb'
    },

    search: {
      label: 'Search services',
      placeholder: 'Which service or document do you need?',
      hint: 'Try: company registration, annual update, share transfer, PAN, tax clearance',
      noResults: 'Nothing matched. Just get in touch and tell us what you need — we will point you to the right thing.',
      resultsLabel: 'Search results'
    },

    hero: {
      eyebrow: 'OCR / CAMIS · IRD · Ward office',
      h1: 'Company registration Ayush, updates and document preparation in Nepal',
      lede: 'KagajSewa prepares the minutes, applications and forms your business needs for the Office of the Company Registrar (OCR/CAMIS), the Inland Revenue Department (IRD) and other offices — in the format each one expects.',
      sub: 'Prepared in the correct format. Ready to submit.',
      benefits: [
        { t: 'Word + PDF', d: 'An editable Word file and a print-ready PDF, every time' },
        { t: 'Bikram Sambat dates', d: 'With Nepali numerals and amounts written out' },
        { t: 'Nepali formats', d: 'The wording and layout the office actually expects' },
        { t: 'Same day', d: 'Most documents are ready the same day' },
        { t: 'Clear pricing', d: 'Government fees are separate and always stated' },
        { t: 'A real person', d: 'Not a form — someone you can talk to' }
      ],
      noAccount: 'No account. No forms to fill. Just tell us what you need.'
    },

    home: {
      popularH: 'Most requested services',
      popularSub: 'The documents people ask for most. Pick the version that matches your company — one shareholder, or several.',
      categoriesH: 'Service categories',
      categoriesSub: 'Grouped by which office the filing goes to.',
      shareholderH: 'How many shareholders does your company have?',
      shareholderSub: 'For many services the documents differ depending on the number of shareholders. Choosing correctly here means you get the right set.',
      singleCard: {
        t: 'Just one',
        d: 'All shares are held by one person. The articles, minutes and Section 92 disclosure are simpler.',
        cta: 'Single shareholder services'
      },
      multipleCard: {
        t: 'Two or more',
        d: 'Shares are divided between several people. Special general meetings, quorum and share allocation all come into it.',
        cta: 'Multiple shareholder services'
      },
      whyH: 'Why KagajSewa',
      whySub: 'A document is worth what the counter says about it. Everything here is built around that.',
      howH: 'How it works',
      howSub: 'No account needed. Three steps, usually finished the same day.',
      guidesH: 'Government process guides',
      guidesSub: 'If you would rather understand the process before buying anything — these are free.',
      faqH: 'Frequently asked questions',
      faqSub: 'If yours is not here, ask. The answer is free.',
      contactH: 'Tell us what you need. We will quote you today.',
      contactSub: 'Phone, Viber, WhatsApp or email — whichever is easiest. Send your company name and what you are filing, and you will get a price and a turnaround time straight back.'
    },

    why: [
      { t: 'Rejected? We fix it and refund', d: 'If a document we prepared comes back because of a formatting or drafting error, we correct it free and refund our fee. That promise is why the formats stay current.', i: 'shield' },
      { t: 'Bikram Sambat, done properly', d: 'BS dates, Nepali numerals and amounts written out in lakh and crore. Fiscal years counted from Shrawan. The small things that get a file handed back.', i: 'calendar' },
      { t: 'You get the Word file too', d: 'Not a locked PDF. Change a name, adjust a date, add a clause — it is your document. A print-ready PDF comes with it for the counter.', i: 'doc' },
      { t: 'Enter your details once', d: 'Your company profile — shareholders, directors, capital, address — stays on file. The next filing takes a message, not a form.', i: 'layers' },
      { t: 'We remind you before the deadline', d: 'Annual updates and tax filings have dates that are easy to miss and expensive to miss. We tell you they are coming, whether or not you order from us.', i: 'clock' },
      { t: 'A person, not a form', d: 'Message us and you get a real answer about your situation — including when the honest answer is that you do not need the document you asked for.', i: 'chat' }
    ],

    steps: [
      { t: 'Tell us what you need', d: 'Send your requirement by phone, Viber, WhatsApp or email. A photo of your registration certificate and last year’s filing usually covers it.' },
      { t: 'We prepare the documents', d: 'Drafted in the format the relevant office expects, with Bikram Sambat dates, Nepali numerals and amounts in words — all checked before it reaches you.' },
      { t: 'Review, sign and submit', d: 'You receive Word and PDF, make any changes you want, then sign, stamp and submit at the office yourself.' }
    ],

    pricing: {
      h: 'How pricing works',
      startNote: 'The prices shown are starting prices.',
      varyNote: 'The final price depends on your company structure, the number of shareholders and which documents you need. We quote exactly before you order.',
      govFeeTitle: 'Government fees are separate',
      govFeeNote: 'KagajSewa’s fee covers document preparation only. Fees, fines and taxes payable to the Office of the Company Registrar, the Inland Revenue Office, your ward office or any other authority are not included. You pay those directly to the office concerned.',
      payTitle: 'Payment',
      payNote: 'By eSewa, Khalti or bank transfer, after you have seen the documents and are happy with them. There is no online payment on this website yet.'
    },

    contact: {
      h: 'Contact',
      phone: 'Phone · Viber · WhatsApp',
      email: 'Email',
      hours: 'Office hours',
      reply: 'Typical reply',
      payment: 'Payment methods',
      what: 'What to include',
      whatList: [
        'Your company name',
        'Which service you need',
        'Single or multiple shareholder company',
        'When you need it by'
      ],
      stickyCta: 'Request a service'
    },

    footer: {
      companyServices: 'Company services',
      taxServices: 'Tax & IRD',
      guides: 'Guides',
      about: 'KagajSewa',
      legal: 'Legal',
      blurb: 'Company Registrar and Inland Revenue documents for Nepali businesses — prepared in the correct format, ready to submit.',
      rights: 'All rights reserved',
      terms: 'Terms of service',
      privacy: 'Privacy policy',
      refund: 'Refund policy',
      disclaimer: 'Disclaimer'
    },

    disclaimer: 'KagajSewa is a document preparation service. We do not provide legal advice, we do not represent you before any authority, and we are not affiliated with any government body. Documents are prepared from the information the customer supplies. Final review, signing and submission to the relevant office remain the customer’s responsibility.',

    notFound: {
      h: 'Page not found',
      p: 'The page you were looking for may have moved or been removed. Search for a service below, or go back to the home page.',
      metaTitle: 'Page not found | KagajSewa'
    }
  }
};

/* ---------------- SITE-WIDE FAQ ---------------- */

const faq = [
  {
    np: { q: 'कम्पनी दर्ता गर्न कति समय लाग्छ?', a: 'हामीबाट कागजात सामान्यतया १–२ कार्यदिनमा तयार हुन्छ। कार्यालयमा दर्ता हुन कति लाग्छ भन्ने कागजात पूरा भए-नभएको, नाम स्वीकृत भए-नभएको र कार्यालयको चापमा भर पर्छ।' },
    en: { q: 'How long does company registration take?', a: 'Our documents are usually ready in one to two working days. How long registration itself takes depends on whether the papers are complete, whether the name is approved, and the office’s workload.' }
  },
  {
    np: { q: 'एकल र बहुल शेयरधनी कम्पनीमा के फरक छ?', a: 'एकल शेयरधनी कम्पनीमा सम्पूर्ण शेयर एकै व्यक्तिको हुन्छ। बहुल शेयरधनी कम्पनीमा शेयर धेरै जनाबीच बाँडिएको हुन्छ। यसले नियमावली, साधारण सभाको माइन्युट, गणपूरक संख्या र दफा ५१–९२ का विवरणलाई फरक पार्छ। त्यसैले हामीले धेरै सेवामा यी दुई विकल्प छुट्टै राखेका छौं।' },
    en: { q: 'What is the difference between a single and multiple shareholder company?', a: 'In a single-shareholder company one person holds all the shares. In a multiple-shareholder company they are divided between several people. That changes the articles, the general meeting minutes, quorum and the Section 51 and 92 statements — which is why we list them as separate services.' }
  },
  {
    np: { q: 'कम्पनी दर्ताका लागि कुन कागजात चाहिन्छ?', a: 'हस्ताक्षरित प्रबन्धपत्र र नियमावली, सबै शेयरधनीको नागरिकता प्रतिलिपि र फोटो, दर्ता ठेगानाको प्रमाण, CAMIS दर्ता निवेदन र दस्तुर भुक्तानीको रसिद। तपाईंको व्यवसायको प्रकृतिअनुसार थप स्वीकृति चाहिन सक्छ।' },
    en: { q: 'What documents are needed to register a company?', a: 'A signed memorandum and articles, citizenship copies and photographs for every shareholder, proof of registered address, the CAMIS application and the fee receipt. Some business activities need an additional approval.' }
  },
  {
    np: { q: 'MOA र AOA के हुन्?', a: 'प्रबन्धपत्र (MOA) ले कम्पनीको नाम, उद्देश्य, पूँजी र शेयरधनी तोक्छ — कम्पनी बाहिरी संसारसामु के हो भन्ने बताउँछ। नियमावली (AOA) ले कम्पनी भित्री रूपमा कसरी चल्छ भन्ने नियम राख्छ — सभा, सञ्चालक, शेयर नामसारी र लेखापरीक्षक सम्बन्धी व्यवस्था।' },
    en: { q: 'What are the MOA and AOA?', a: 'The memorandum sets out the company’s name, objects, capital and shareholders — what the company is to the outside world. The articles set out how it runs internally — meetings, directors, share transfers and the auditor.' }
  },
  {
    np: { q: 'कम्पनी अद्यावधिक गर्न के चाहिन्छ?', a: 'सञ्चालक बैठक र साधारण सभाका माइन्युट, दफा ५१ बमोजिमको शेयर–ऋण लगत, दफा ९२ बमोजिमको सञ्चालक विवरण, लेखापरीक्षण प्रतिवेदन र कार्यालयमा पेस गर्ने निवेदन। लेखापरीक्षण प्रतिवेदन तपाईंको लेखापरीक्षकबाट आउँछ — बाँकी हामी तयार गर्छौं।' },
    en: { q: 'What is needed for a company annual update?', a: 'Board and general meeting minutes, the Section 51 share and loan inventory, the Section 92 director disclosure, the audit report, and the application to the office. The audit report comes from your auditor; we prepare the rest.' }
  },
  {
    np: { q: 'शेयर नामसारी गर्न के कागजात चाहिन्छ?', a: 'नामसारी लिखत, विशेष साधारण सभाको माइन्युट, लगानी प्रमाणपत्र, कार्यालयमा पेस गर्ने निवेदन र अद्यावधिक शेयर लगत। मृत्युपछिको नामसारी भए मृत्यु दर्ता प्रमाणपत्र र नाता प्रमाणित पनि चाहिन्छ।' },
    en: { q: 'What documents are needed for a share transfer?', a: 'The transfer deed, a special general meeting minute, the investment certificate, the application to the office and an updated share register. A transfer after death also needs the death registration certificate and proof of relationship.' }
  },
  {
    np: { q: 'कागजात Word फाइलमा पाइन्छ? PDF पनि?', a: 'दुवै पाइन्छ, सधैं। Word फाइल सम्पादन गर्न मिल्छ — नाम, मिति वा बुँदा आफैं मिलाउन सक्नुहुन्छ। PDF छाप्न तयार हुन्छ।' },
    en: { q: 'Do I get a Word file? And a PDF?', a: 'Both, always. The Word file is editable so you can adjust a name, a date or a clause yourself. The PDF is ready to print.' }
  },
  {
    np: { q: 'भुक्तानी कसरी गर्ने?', a: 'कागजात हेरेर चित्त बुझेपछि eSewa, Khalti वा बैंक ट्रान्सफरबाट। यो वेबसाइटमा अहिले अनलाइन भुक्तानी छैन — तपाईं सम्पर्क गर्नुहोस्, हामी काम पठाउँछौं, त्यसपछि भुक्तानी।' },
    en: { q: 'How do I pay?', a: 'By eSewa, Khalti or bank transfer, after you have seen the documents and are happy. There is no online payment on this site yet — you contact us, we send the work, then you pay.' }
  },
  {
    np: { q: 'सरकारी शुल्क मूल्यमा समावेश छ?', a: 'छैन। हाम्रो शुल्क कागजात तयार गरेबापतको मात्र हो। कम्पनी रजिष्ट्रारको कार्यालय, आन्तरिक राजस्व कार्यालय वा वडा कार्यालयमा तिर्नुपर्ने दस्तुर, जरिवाना र कर तपाईंले सिधै ती कार्यालयमा तिर्नुहुन्छ।' },
    en: { q: 'Are government fees included in the price?', a: 'No. Our fee covers document preparation only. Fees, fines and taxes payable to the Office of the Company Registrar, the Inland Revenue Office or your ward office are paid by you directly to those offices.' }
  },
  {
    np: { q: 'कागजात अस्वीकृत भए के हुन्छ?', a: 'ढाँचा वा लेखाइको त्रुटिका कारण फिर्ता भएमा नि:शुल्क सच्याउँछौं र हाम्रो सेवा शुल्क फिर्ता गर्छौं। तर कार्यालयले थप कागजात माग्दा, नाम अस्वीकृत गर्दा वा नीति फेरिँदा त्यो हाम्रो नियन्त्रणमा हुँदैन — त्यस्तो अवस्थामा पनि आवश्यक परिमार्जन नि:शुल्क गरिदिन्छौं।' },
    en: { q: 'What happens if a document is rejected?', a: 'If it comes back because of a formatting or drafting error on our side, we fix it free and refund our fee. If the office asks for something extra, rejects a name or changes its policy, that is outside our control — but we still make the revisions free of charge.' }
  },
  {
    np: { q: 'कागज सेवा कानुनी फर्म हो?', a: 'होइन। हामी अधिवक्ता होइनौं र कानुनी सल्लाह दिँदैनौं। हामी तपाईंले दिनुभएको विवरणका आधारमा प्रचलित ढाँचामा कागजात तयार पार्छौं। विवाद, अदालती विषय वा जटिल कानुनी प्रश्न भएमा इजाजतप्राप्त अधिवक्तासँग परामर्श गर्नुहोस् — त्यस्तो अवस्थामा हामी स्पष्ट भन्छौं।' },
    en: { q: 'Is KagajSewa a law firm?', a: 'No. We are not advocates and we do not give legal advice. We prepare documents in the standard formats from the information you give us. For a dispute, a court matter or a difficult legal question, consult a licensed advocate — and we will say so plainly when that is the situation.' }
  },
  {
    np: { q: 'कागज सेवाले सरकारी कार्यालयमा मेरो तर्फबाट कागजात पेस गर्छ?', a: 'गर्दैन। हामी कागजात तयार गर्छौं; हस्ताक्षर, छाप र पेस गर्ने काम तपाईं वा तपाईंले अख्तियार दिनुभएको व्यक्तिले गर्नुपर्छ। पेस गर्ने काम तपाईंकै हातमा राख्दा नै मूल्य यति कम राख्न सकिएको हो।' },
    en: { q: 'Does KagajSewa submit documents to the office on my behalf?', a: 'No. We prepare the documents; signing, stamping and submitting are done by you or someone you authorise. Keeping submission in your hands is what keeps the price this low.' }
  },
  {
    np: { q: 'म धेरै कम्पनीको काम हेर्छु। छुट दर छ?', a: 'छ। धेरै काम गर्ने परामर्शदाता, लेखापरीक्षक र कानुन व्यवसायीका लागि प्रति-कागजात दरको सट्टा एकमुष्ट मासिक दर, र सबै ग्राहक कम्पनीको म्याद क्यालेन्डर पनि। तपाईं कति कम्पनी हेर्नुहुन्छ भन्नुहोस्, मूल्य भन्छौं।' },
    en: { q: 'I handle filings for many companies. Is there a better rate?', a: 'Yes. Consultants, auditors and law offices filing in volume get a flat monthly rate instead of per-document pricing, plus a deadline calendar across all their client companies. Tell us roughly how many companies you handle and we will quote.' }
  }
];

/* ---------------- LEGAL PAGES ---------------- */

const legal = [
  {
    slug: 'terms',
    np: {
      title: 'सेवाका शर्तहरू',
      metaTitle: 'सेवाका शर्तहरू | कागज सेवा',
      metaDesc: 'कागज सेवाको सेवा शर्तहरू — सेवाको दायरा, सेवाग्राहीको जिम्मेवारी, भुक्तानी र सीमितता।',
      sections: [
        { h: 'सेवाको दायरा', p: ['कागज सेवाले सेवाग्राहीले उपलब्ध गराएको विवरणका आधारमा कागजात तयार गर्छ। हामी कानुनी सल्लाह दिँदैनौं, कुनै सरकारी निकायमा प्रतिनिधित्व गर्दैनौं र सेवाग्राहीको तर्फबाट कागजात पेस गर्दैनौं।'] },
        { h: 'सेवाग्राहीको जिम्मेवारी', list: ['उपलब्ध गराइएको विवरण सही र पूर्ण हुनुपर्छ', 'तयार भएको कागजात पेस गर्नुअघि जाँच्ने जिम्मेवारी सेवाग्राहीको हो', 'हस्ताक्षर, छाप र सम्बन्धित कार्यालयमा पेस गर्ने काम सेवाग्राहीले गर्नुपर्छ', 'सरकारी दस्तुर, जरिवाना र कर सेवाग्राहीले सिधै तिर्नुपर्छ'] },
        { h: 'भुक्तानी', p: ['कागजात उपलब्ध गराएपछि eSewa, Khalti वा बैंक ट्रान्सफरमार्फत भुक्तानी गरिन्छ। मूल्य कागजात तयारीबापतको मात्र हो।'] },
        { h: 'सीमितता', p: ['सरकारी कार्यालयले कागजात स्वीकृत गर्ने वा नगर्ने, नाम दर्ता गर्ने वा नगर्ने निर्णय पूर्णतः सम्बन्धित कार्यालयको अधिकार क्षेत्रभित्र पर्छ। कागज सेवाले कुनै सरकारी स्वीकृतिको ग्यारेन्टी दिँदैन। सेवाग्राहीले दिएको गलत वा अपूर्ण विवरणका कारण हुने परिणामको जिम्मेवारी कागज सेवाले लिँदैन।'] },
        { h: 'परिवर्तन', p: ['यी शर्तहरू समय-समयमा परिमार्जन हुन सक्छन्। परिमार्जित शर्त यसै पृष्ठमा प्रकाशित हुनेछ।'] }
      ]
    },
    en: {
      title: 'Terms of service',
      metaTitle: 'Terms of Service | KagajSewa',
      metaDesc: 'KagajSewa terms of service — scope of service, customer responsibilities, payment and limitations.',
      sections: [
        { h: 'Scope of service', p: ['KagajSewa prepares documents from the information the customer supplies. We do not provide legal advice, do not represent customers before any authority, and do not submit filings on a customer’s behalf.'] },
        { h: 'Customer responsibilities', list: ['The information you give us must be accurate and complete', 'Reviewing the finished documents before submission is your responsibility', 'Signing, stamping and submitting to the relevant office is done by you', 'Government fees, fines and taxes are paid by you directly'] },
        { h: 'Payment', p: ['Payment is made by eSewa, Khalti or bank transfer after the documents are delivered. The price covers document preparation only.'] },
        { h: 'Limitations', p: ['Whether a government office accepts a document or approves a name is entirely within that office’s authority. KagajSewa does not guarantee any government approval. We are not responsible for outcomes caused by incorrect or incomplete information supplied by the customer.'] },
        { h: 'Changes', p: ['These terms may be revised from time to time. Any revision will be published on this page.'] }
      ]
    }
  },
  {
    slug: 'privacy',
    np: {
      title: 'गोपनीयता नीति',
      metaTitle: 'गोपनीयता नीति | कागज सेवा',
      metaDesc: 'कागज सेवाले कुन विवरण सङ्कलन गर्छ, किन गर्छ र कसरी सुरक्षित राख्छ भन्ने जानकारी।',
      sections: [
        { h: 'हामी के सङ्कलन गर्छौं', p: ['कागजात तयार गर्न आवश्यक विवरण मात्र — कम्पनीको नाम, दर्ता नम्बर, स्थायी लेखा नम्बर, ठेगाना, शेयरधनी र सञ्चालकको नाम, नागरिकता विवरण र सम्पर्क जानकारी।'] },
        { h: 'किन सङ्कलन गर्छौं', p: ['तपाईंले अनुरोध गर्नुभएको कागजात तयार गर्न, तपाईंसँग सम्पर्क गर्न र आगामी म्यादबारे सम्झाउन।'] },
        { h: 'कसरी राख्छौं', list: ['विवरण कागजात तयारीका लागि मात्र प्रयोग हुन्छ', 'तपाईंको अनुमतिबिना तेस्रो पक्षलाई बेचिँदैन वा दिइँदैन', 'कानुनले बाध्य पारेको अवस्थामा मात्र सक्षम निकायलाई उपलब्ध गराइन्छ', 'तपाईंले अनुरोध गरेमा तपाईंको विवरण हटाइन्छ'] },
        { h: 'यो वेबसाइट', p: ['यो वेबसाइटले तपाईंको भाषा रोजाइ तपाईंकै ब्राउजरमा सुरक्षित राख्छ। कुनै विज्ञापन ट्र्याकर प्रयोग गरिँदैन।'] },
        { h: 'सम्पर्क', p: ['आफ्नो विवरणबारे कुनै प्रश्न वा हटाउने अनुरोध भए सम्पर्क पृष्ठमा दिइएको इमेल वा फोनमा सम्पर्क गर्नुहोस्।'] }
      ]
    },
    en: {
      title: 'Privacy policy',
      metaTitle: 'Privacy Policy | KagajSewa',
      metaDesc: 'What information KagajSewa collects, why, and how it is handled.',
      sections: [
        { h: 'What we collect', p: ['Only what is needed to prepare your documents — company name, registration number, PAN, address, shareholder and director names, citizenship details and contact information.'] },
        { h: 'Why we collect it', p: ['To prepare the documents you asked for, to contact you about them, and to remind you about upcoming deadlines.'] },
        { h: 'How we handle it', list: ['Used only for preparing your documents', 'Never sold or passed to a third party without your permission', 'Disclosed to an authority only where the law requires it', 'Deleted on request'] },
        { h: 'This website', p: ['This site stores your language preference in your own browser. No advertising trackers are used.'] },
        { h: 'Contact', p: ['For any question about your information, or to ask for it to be deleted, use the email or phone number on the contact page.'] }
      ]
    }
  },
  {
    slug: 'refund-policy',
    np: {
      title: 'फिर्ता नीति',
      metaTitle: 'फिर्ता नीति | कागज सेवा',
      metaDesc: 'कागज सेवाको फिर्ता नीति — कहिले रकम फिर्ता हुन्छ र कहिले हुँदैन।',
      sections: [
        { h: 'कहिले फिर्ता हुन्छ', list: ['हामीले तयार पारेको कागजात ढाँचा वा लेखाइको त्रुटिका कारण कार्यालयबाट फिर्ता भएमा — नि:शुल्क सच्याउँछौं र सेवा शुल्क पूरै फिर्ता गर्छौं', 'तपाईंले दिनुभएको विवरण सही हुँदाहुँदै हामीले गलत कागजात तयार पारेमा', 'काम सुरु हुनुअघि नै तपाईंले रद्द गर्नुभएमा'] },
        { h: 'कहिले फिर्ता हुँदैन', list: ['कार्यालयले नाम अस्वीकृत गरेमा वा थप कागजात मागेमा — यो हाम्रो नियन्त्रणबाहिरको विषय हो, तर आवश्यक परिमार्जन नि:शुल्क गरिदिन्छौं', 'तपाईंले दिनुभएको विवरण गलत वा अपूर्ण भएका कारण कागजात फिर्ता भएमा — सच्याउने काम भने गरिदिन्छौं', 'सरकारी दस्तुर, जरिवाना वा कर — ती हामीले लिएकै हुँदैनौं', 'कागजात बुझाइसकेपछि तपाईंले विचार बदल्नुभएमा'] },
        { h: 'कसरी माग्ने', p: ['जुन माध्यमबाट अर्डर गर्नुभएको थियो त्यही माध्यमबाट सम्पर्क गर्नुहोस्। के भयो भन्ने बताउनुहोस् र कार्यालयले फिर्ता गरेको भए त्यसको कारण देखिने प्रमाण भए पठाउनुहोस्। फिर्ता स्वीकृत भएमा उही माध्यमबाट रकम फिर्ता गरिन्छ।'] }
      ]
    },
    en: {
      title: 'Refund policy',
      metaTitle: 'Refund Policy | KagajSewa',
      metaDesc: 'When KagajSewa refunds its fee and when it does not.',
      sections: [
        { h: 'When we refund', list: ['A document we prepared is returned by the office because of a formatting or drafting error on our side — we correct it free and refund our fee in full', 'We prepared the wrong document despite being given correct information', 'You cancel before we have started work'] },
        { h: 'When we do not refund', list: ['The office rejects a name or asks for additional documents — outside our control, but we make the revisions free', 'A document is returned because the information you gave us was wrong or incomplete — we will still correct it', 'Government fees, fines or taxes — we never collected those', 'You change your mind after the documents have been delivered'] },
        { h: 'How to claim', p: ['Contact us the same way you ordered. Tell us what happened and, if the office returned the filing, send whatever shows the reason. Approved refunds are returned by the same method you paid.'] }
      ]
    }
  },
  {
    slug: 'about',
    np: {
      title: 'कागज सेवाको बारेमा',
      metaTitle: 'कागज सेवाको बारेमा | कम्पनी कागजात तयारी सेवा',
      metaDesc: 'कागज सेवा के हो, कसका लागि हो र कसरी काम गर्छ — साथै हामीले के गर्दैनौं भन्ने स्पष्ट जानकारी।',
      sections: [
        { h: 'हामी के गर्छौं', p: ['नेपालका दर्ता कम्पनीहरूलाई कम्पनी रजिष्ट्रारको कार्यालय, आन्तरिक राजस्व कार्यालय, बैंक र वडा कार्यालयमा पेस गर्नुपर्ने कागजात तयार गरिदिन्छौं — सही ढाँचामा, बिक्रम सम्बत् मिति र नेपाली अंकसहित, प्रायः सोही दिन।'] },
        { h: 'कसका लागि', list: ['आफ्नै कम्पनी चलाउने साना तथा मझौला व्यवसायी', 'धेरै कम्पनीको काम हेर्ने परामर्शदाता, लेखापरीक्षक र कानुन व्यवसायी', 'भर्खरै कम्पनी दर्ता गरेका वा गर्न लागेका उद्यमी'] },
        { h: 'हामी के गर्दैनौं', list: ['कानुनी सल्लाह दिँदैनौं — हामी अधिवक्ता होइनौं', 'तपाईंको तर्फबाट कार्यालयमा कागजात पेस गर्दैनौं', 'कर गणना वा लेखापरीक्षण गर्दैनौं', 'सरकारी स्वीकृतिको ग्यारेन्टी दिँदैनौं'] },
        { h: 'किन यसरी', p: ['पेस गर्ने काम तपाईंकै हातमा राख्दा मूल्य धेरै कम राख्न सकिन्छ। कागजात सही भएपछि पेस गर्नु गाह्रो काम होइन — गाह्रो त सही ढाँचा र सही भाषा पत्ता लगाउनु हो। त्यही काम हामी गर्छौं।'] }
      ]
    },
    en: {
      title: 'About KagajSewa',
      metaTitle: 'About KagajSewa | Company Document Preparation Nepal',
      metaDesc: 'What KagajSewa does, who it is for, how it works — and a clear statement of what it does not do.',
      sections: [
        { h: 'What we do', p: ['We prepare the documents Nepali registered companies need for the Office of the Company Registrar, the Inland Revenue Office, banks and ward offices — in the correct format, with Bikram Sambat dates and Nepali numerals, usually the same day.'] },
        { h: 'Who it is for', list: ['Small and medium business owners running their own company', 'Consultants, auditors and law offices handling filings for many companies', 'Entrepreneurs who have just registered, or are about to'] },
        { h: 'What we do not do', list: ['We do not give legal advice — we are not advocates', 'We do not submit filings on your behalf', 'We do not calculate tax or perform audits', 'We do not guarantee government approval'] },
        { h: 'Why it works this way', p: ['Keeping submission in your hands is what lets us charge so little. Submitting a correct document is not the hard part — finding the correct format and the correct wording is. That is the part we do.'] }
      ]
    }
  }
];

module.exports = { ui, faq, legal };
