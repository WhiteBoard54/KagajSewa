/* ============================================================
   SERVICE CATEGORIES
   `order` controls display order everywhere.
   ============================================================ */

const categories = [
  {
    id: 'company-registration',
    slug: 'services/company-registration',
    order: 1,
    office: 'OCR / CAMIS',
    np: {
      name: 'कम्पनी दर्ता',
      short: 'नयाँ प्राइभेट लिमिटेड कम्पनी दर्ताका लागि प्रबन्धपत्र, नियमावली र CAMIS निवेदन।',
      metaTitle: 'कम्पनी दर्ता सेवा नेपाल | MOA, AOA र CAMIS निवेदन',
      metaDesc: 'नेपालमा एकल तथा बहुल शेयरधनी प्राइभेट लिमिटेड कम्पनी दर्ताका लागि आवश्यक प्रबन्धपत्र (MOA), नियमावली (AOA) र CAMIS निवेदन तयार गर्ने सेवा।'
    },
    en: {
      name: 'Company Registration',
      short: 'Memorandum, articles and the CAMIS application for a new private limited company.',
      metaTitle: 'Company Registration Services Nepal | MOA, AOA and CAMIS',
      metaDesc: 'Document preparation for single and multiple shareholder private limited company registration in Nepal — MOA, AOA and the CAMIS application.'
    }
  },
  {
    id: 'company-update',
    slug: 'services/company-update',
    order: 2,
    office: 'OCR / CAMIS',
    np: {
      name: 'कम्पनी अद्यावधिक',
      short: 'वार्षिक तथा प्रारम्भिक (३ महिने) अद्यावधिकका लागि माइन्युट, दफा ५१, दफा ९२ र निवेदन।',
      metaTitle: 'कम्पनी अद्यावधिक सेवा नेपाल | वार्षिक र ३ महिने विवरण',
      metaDesc: 'कम्पनी रजिष्ट्रारको कार्यालयमा पेस गर्ने वार्षिक तथा प्रारम्भिक अद्यावधिकका कागजात — सञ्चालक माइन्युट, साधारण सभा माइन्युट, दफा ५१ र दफा ९२ विवरण।'
    },
    en: {
      name: 'Company Updates',
      short: 'Annual and initial three-month updates — minutes, Section 51, Section 92 and the application.',
      metaTitle: 'Company Annual Update Nepal | OCR Filing Documents',
      metaDesc: 'Documents for annual and initial three-month company updates at the Office of the Company Registrar — board minute, AGM minute, Section 51 and Section 92 disclosures.'
    }
  },
  {
    id: 'share-services',
    slug: 'services/share-services',
    order: 3,
    office: 'OCR / CAMIS',
    np: {
      name: 'शेयर सम्बन्धी सेवा',
      short: 'शेयर नामसारी, शेयर लगत र सञ्चालक लगतसम्बन्धी कागजात।',
      metaTitle: 'शेयर नामसारी र शेयर लगत सेवा नेपाल',
      metaDesc: 'कम्पनीको शेयर नामसारी, शेयर लगत तथा सञ्चालक लगत तयारीका लागि आवश्यक लिखत, निवेदन र माइन्युट तयार गर्ने सेवा।'
    },
    en: {
      name: 'Share Services',
      short: 'Share transfer, share register and director registry documents.',
      metaTitle: 'Share Transfer and Share Register Services Nepal',
      metaDesc: 'Transfer deeds, applications and minutes for company share transfer, share register (Share Lagat) and director registry in Nepal.'
    }
  },
  {
    id: 'company-changes',
    slug: 'services/company-changes',
    order: 4,
    office: 'OCR / CAMIS',
    np: {
      name: 'कम्पनी परिवर्तन',
      short: 'नाम, ठेगाना, पूँजी र लेखापरीक्षक परिवर्तनका कागजात।',
      metaTitle: 'कम्पनीको नाम, ठेगाना र पूँजी परिवर्तन सेवा नेपाल',
      metaDesc: 'कम्पनीको नाम परिवर्तन, ठेगाना परिवर्तन, पूँजी वृद्धि तथा लेखापरीक्षक परिवर्तनका लागि आवश्यक निवेदन, माइन्युट र संशोधित प्रबन्धपत्र–नियमावली।'
    },
    en: {
      name: 'Company Changes',
      short: 'Name, address, capital and auditor change documents.',
      metaTitle: 'Company Name, Address and Capital Change Nepal',
      metaDesc: 'Applications, minutes and amended MOA/AOA for company name change, address change, capital increase and auditor change in Nepal.'
    }
  },
  {
    id: 'ird-tax',
    slug: 'services/ird-tax',
    order: 5,
    office: 'IRD',
    np: {
      name: 'IRD / कर सम्बन्धी सेवा',
      short: 'स्थायी लेखा नम्बर (PAN) दर्ता माइन्युट र कर चुक्ता प्रमाणपत्र निवेदन।',
      metaTitle: 'PAN दर्ता र कर चुक्ता प्रमाणपत्र सेवा नेपाल | IRD',
      metaDesc: 'आन्तरिक राजस्व विभागका लागि स्थायी लेखा नम्बर दर्ता माइन्युट तथा कर चुक्ता प्रमाणपत्रको निवेदन तयार गर्ने सेवा।'
    },
    en: {
      name: 'IRD / Tax Services',
      short: 'PAN registration minutes and tax clearance certificate applications.',
      metaTitle: 'PAN Registration and Tax Clearance Nepal | IRD Documents',
      metaDesc: 'PAN registration minutes and tax clearance certificate applications prepared for the Inland Revenue Department in Nepal.'
    }
  },
  {
    id: 'bank',
    slug: 'services/bank',
    order: 6,
    office: 'बैंक / Bank',
    np: {
      name: 'बैंक तथा वित्तीय संस्था',
      short: 'बैंक खाता खोल्ने र खाता विवरण अद्यावधिक गर्ने माइन्युट तथा निवेदन।',
      metaTitle: 'बैंक तथा वित्तीय संस्थाका सेवाहरू — श्रेणी',
      metaDesc: 'बैंकसँग सम्बन्धित कम्पनी कागजातहरूको श्रेणी — खाता खोल्ने माइन्युट, निवेदन र हस्ताक्षरकर्ता परिवर्तनको जानकारी। सबै सेवा र मूल्य एकै ठाउँमा।'
    },
    en: {
      name: 'Bank & Financial Institutions',
      short: 'Minutes and letters for opening and updating a company bank account.',
      metaTitle: 'Bank & Financial Institution Services — Category',
      metaDesc: 'The bank-related document services KagajSewa offers, with starting prices — account opening minutes, application letters and signatory change notifications.'
    }
  },
  {
    id: 'trademark',
    slug: 'services/trademark',
    order: 7,
    office: 'DoI',
    np: {
      name: 'ट्रेडमार्क',
      short: 'ट्रेडमार्क (छाप) दर्ता निवेदन र सम्बन्धित माइन्युट।',
      metaTitle: 'ट्रेडमार्क दर्ता निवेदन सेवा नेपाल',
      metaDesc: 'उद्योग विभागमा ट्रेडमार्क दर्ताका लागि आवश्यक निवेदन तथा सञ्चालक माइन्युट तयार गर्ने सेवा।'
    },
    en: {
      name: 'Trademark',
      short: 'Trademark registration applications and the supporting minute.',
      metaTitle: 'Trademark Registration Application Nepal',
      metaDesc: 'Trademark registration applications and board minutes prepared for filing with the Department of Industry in Nepal.'
    }
  },
  {
    id: 'labour',
    slug: 'services/labour',
    order: 8,
    office: 'श्रम / Labour',
    np: {
      name: 'श्रम तथा रोजगार',
      short: 'श्रम अडिट कागजात र रोजगार सम्झौता।',
      metaTitle: 'श्रम तथा रोजगार सम्बन्धी सेवाहरू — श्रेणी',
      metaDesc: 'कर्मचारी राखेका कम्पनीका लागि श्रम तथा रोजगार सम्बन्धी कागजात सेवाहरूको श्रेणी — श्रम अडिट, रोजगार सम्झौता र नियुक्ति पत्र।'
    },
    en: {
      name: 'Labour & Employment',
      short: 'Labour audit documentation and employment agreements.',
      metaTitle: 'Labour & Employment Services — Category',
      metaDesc: 'Labour and employment document services for companies with staff — labour audit documentation, employment agreements and appointment letters.'
    }
  },
  {
    id: 'ward',
    slug: 'services/ward-office',
    order: 9,
    office: 'वडा / Ward',
    np: {
      name: 'वडा कार्यालय',
      short: 'बहाल सम्झौता, चार किल्ला प्रमाणित र सिफारिस सम्बन्धी कागजात।',
      metaTitle: 'वडा कार्यालय सम्बन्धी सेवाहरू — श्रेणी',
      metaDesc: 'वडा कार्यालयमा पेस गर्ने कागजात सेवाहरूको श्रेणी — बहाल सम्झौता, चार किल्ला प्रमाणित, धितो मस्यौदा र सिफारिस निवेदन। मूल्यसहित।'
    },
    en: {
      name: 'Ward Office',
      short: 'Rent agreements, four-boundary certification and recommendation letters.',
      metaTitle: 'Ward Office Services — Category',
      metaDesc: 'Ward office document services with starting prices — rent agreements, four-boundary certification, mortgage drafts and recommendation applications.'
    }
  },
  {
    id: 'business',
    slug: 'services/business-startup',
    order: 10,
    office: 'व्यवसाय / Business',
    np: {
      name: 'व्यवसाय तथा स्टार्टअप',
      short: 'गोपनीयता सम्झौता (NDA), सेवा सम्झौता र संस्थापक सम्झौता।',
      metaTitle: 'व्यवसाय तथा स्टार्टअप सेवाहरू — श्रेणी',
      metaDesc: 'स्टार्टअप र साना व्यवसायका लागि सम्झौता तयारी सेवाहरूको श्रेणी — गोपनीयता सम्झौता (NDA), सेवा सम्झौता र संस्थापक सम्झौता।'
    },
    en: {
      name: 'Business & Startups',
      short: 'Non-disclosure agreements, service contracts and founder agreements.',
      metaTitle: 'Business & Startup Services — Category',
      metaDesc: 'Agreement drafting services for startups and small businesses — non-disclosure agreements, service contracts and founder agreements, with prices.'
    }
  },
  {
    id: 'other',
    slug: 'services/other',
    order: 11,
    office: 'OCR / अन्य',
    np: {
      name: 'अन्य कागजात सेवा',
      short: 'CAMIS पासवर्ड रिकभरी, प्रतिलिपि र खारेजी सम्बन्धी कागजात।',
      metaTitle: 'CAMIS पासवर्ड रिकभरी र अन्य कागजात सेवा',
      metaDesc: 'OCR/CAMIS पासवर्ड रिकभरी निवेदन, कागजात प्रतिलिपि माग तथा कम्पनी खारेजीसम्बन्धी कागजात तयार गर्ने सेवा।'
    },
    en: {
      name: 'Other Document Services',
      short: 'CAMIS password recovery, certified copies and de-registration documents.',
      metaTitle: 'CAMIS Password Recovery and Other Documents Nepal',
      metaDesc: 'OCR/CAMIS password recovery applications, certified copy requests and company de-registration documents.'
    }
  }
];

module.exports = { categories };
