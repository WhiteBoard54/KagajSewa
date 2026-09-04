/* ============================================================
   GOVERNMENT PROCESS GUIDES

   Every guide carries an `updated` date and `sources`. Government
   procedures change — a guide that presents an outdated process as
   current fact does more damage than no guide at all.

   When a procedure changes: edit the guide, bump `updated`.
   ============================================================ */

const OCR = { label: 'कम्पनी रजिष्ट्रारको कार्यालय (OCR)', labelEn: 'Office of the Company Registrar', url: 'https://ocr.gov.np/' };
const CAMIS = { label: 'CAMIS पोर्टल', labelEn: 'CAMIS portal', url: 'https://camis.ocr.gov.np/' };
const IRD = { label: 'आन्तरिक राजस्व विभाग (IRD)', labelEn: 'Inland Revenue Department', url: 'https://ird.gov.np/' };
const DOI = { label: 'उद्योग विभाग', labelEn: 'Department of Industry', url: 'https://doind.gov.np/' };

const guides = [
  {
    slug: 'guides/company-registration-nepal',
    order: 1,
    updated: '2026-09-04',
    sources: [OCR, CAMIS],
    relatedServices: ['registration-single', 'registration-multiple', 'pan-registration'],
    relatedGuides: ['guides/moa-aoa-explained', 'guides/single-shareholder-company-registration'],
    np: {
      title: 'नेपालमा कम्पनी दर्ता कसरी गर्ने?',
      metaTitle: 'नेपालमा कम्पनी दर्ता कसरी गर्ने? | प्रक्रिया र आवश्यक कागजात',
      metaDesc: 'प्राइभेट लिमिटेड कम्पनी दर्ताको प्रक्रिया, आवश्यक कागजात, अनुमानित समय र सरकारी दस्तुरबारे सरल भाषामा जानकारी।',
      intro: 'नेपालमा प्राइभेट लिमिटेड कम्पनी दर्ता कम्पनी रजिष्ट्रारको कार्यालयको CAMIS प्रणालीमार्फत गरिन्छ। तल सामान्य क्रम दिइएको छ। तपाईंको व्यवसायको प्रकृतिअनुसार थप स्वीकृति चाहिन सक्छ।',
      sections: [
        {
          h: 'चरणहरू',
          steps: [
            { k: 'नाम आरक्षण', v: 'CAMIS मा खाता खोलेर प्रस्तावित नाम पेस गर्नुहोस्। मिल्दोजुल्दो नाम पहिले दर्ता भइसकेको भए अस्वीकृत हुन्छ, त्यसैले २–३ विकल्प तयार राख्नुहोस्।' },
            { k: 'प्रबन्धपत्र र नियमावली तयार', v: 'MOA मा कम्पनीको उद्देश्य र पूँजी, AOA मा सञ्चालन विधि लेखिन्छ। शेयरधनी एक जना कि धेरै भन्नेअनुसार ढाँचा फरक हुन्छ।' },
            { k: 'कागजात अपलोड', v: 'MOA, AOA, शेयरधनीको नागरिकता, फोटो र ठेगाना प्रमाण CAMIS मा अपलोड गर्नुहोस्।' },
            { k: 'सरकारी दस्तुर भुक्तानी', v: 'दस्तुर अधिकृत पूँजीअनुसार फरक पर्छ। रकम CAMIS मै देखिन्छ।' },
            { k: 'जाँच र दर्ता प्रमाणपत्र', v: 'कार्यालयले कागजात जाँच्छ। मिलेमा दर्ता प्रमाणपत्र जारी हुन्छ।' },
            { k: 'PAN दर्ता', v: 'दर्तापछि आन्तरिक राजस्व कार्यालयमा गएर स्थायी लेखा नम्बर लिनुपर्छ।' },
            { k: 'पालिकामा व्यवसाय दर्ता', v: 'स्थानीय तह वा वडा कार्यालयमा व्यवसाय दर्ता र त्यसपछि वार्षिक नवीकरण गर्नुपर्छ।' }
          ]
        },
        {
          h: 'आवश्यक कागजात',
          list: [
            'हस्ताक्षरित प्रबन्धपत्र (MOA)',
            'हस्ताक्षरित नियमावली (AOA)',
            'सबै शेयरधनीको नागरिकता प्रतिलिपि',
            'पासपोर्ट साइजको फोटो',
            'दर्ता ठेगानाको प्रमाण — बहाल सम्झौता वा स्वामित्व प्रमाण',
            'CAMIS दर्ता निवेदन',
            'दस्तुर भुक्तानीको रसिद'
          ]
        },
        {
          h: 'कति समय लाग्छ?',
          p: ['कागजात पूरा र सही भएमा सामान्यतया केही कार्यदिनमा दर्ता हुन्छ। तर नाम अस्वीकृत भएमा, कागजात फर्काइएमा वा थप स्वीकृति चाहिएमा समय लम्बिन्छ। कार्यालयको कामको चापले पनि फरक पार्छ।']
        },
        {
          h: 'बारम्बार हुने गल्ती',
          list: [
            'एउटै मात्र नाम पेस गर्ने — अस्वीकृत भए फेरि सुरुबाट गर्नुपर्छ',
            'MOA मा उद्देश्य साँघुरो लेख्ने — पछि व्यवसाय विस्तार गर्दा संशोधन गर्नुपर्ने हुन्छ',
            'अधिकृत पूँजी अनावश्यक धेरै राख्ने — सरकारी दस्तुर बढी लाग्छ',
            'दर्तापछिको तीन महिने प्रारम्भिक विवरण बिर्सने — जरिवाना लाग्छ'
          ]
        }
      ]
    },
    en: {
      title: 'How to register a company in Nepal',
      metaTitle: 'How to Register a Company in Nepal | Process and Documents',
      metaDesc: 'The private limited company registration process in Nepal — steps, required documents, expected timeline and how government fees work.',
      intro: 'Private limited company registration in Nepal runs through the Office of the Company Registrar’s CAMIS system. The usual sequence is below. Depending on what your business does, additional approvals may apply.',
      sections: [
        {
          h: 'The steps',
          steps: [
            { k: 'Reserve a name', v: 'Create a CAMIS account and submit your proposed name. A similar name already on the register will be rejected, so have two or three options ready.' },
            { k: 'Draft the MOA and AOA', v: 'The memorandum sets out objects and capital; the articles set out how the company is run. The wording differs for a single shareholder versus several.' },
            { k: 'Upload documents', v: 'Upload the MOA, AOA, citizenship copies, photographs and address proof to CAMIS.' },
            { k: 'Pay the government fee', v: 'The fee scales with authorised capital and is shown in CAMIS.' },
            { k: 'Examination and certificate', v: 'The office reviews the filing and issues a certificate of incorporation if everything is in order.' },
            { k: 'Register for PAN', v: 'After incorporation, obtain a Permanent Account Number from the Inland Revenue Office.' },
            { k: 'Register with your municipality', v: 'Register the business with your local level, then renew annually.' }
          ]
        },
        {
          h: 'Documents required',
          list: [
            'Signed Memorandum of Association',
            'Signed Articles of Association',
            'Citizenship copies for every shareholder',
            'Passport-size photographs',
            'Proof of registered address — rent agreement or ownership document',
            'CAMIS registration application',
            'Fee payment receipt'
          ]
        },
        {
          h: 'How long it takes',
          p: ['With complete and correct documents, registration usually completes within a few working days. A rejected name, returned documents or an additional approval will extend that. The office’s workload also matters.']
        },
        {
          h: 'Common mistakes',
          list: [
            'Submitting only one name option — a rejection sends you back to the start',
            'Writing the objects clause too narrowly, forcing an amendment when the business grows',
            'Setting authorised capital higher than needed, which raises the government fee',
            'Forgetting the three-month initial return after incorporation, which attracts a fine'
          ]
        }
      ]
    }
  },

  {
    slug: 'guides/single-shareholder-company-registration',
    order: 2,
    updated: '2026-09-04',
    sources: [OCR, CAMIS],
    relatedServices: ['registration-single', 'annual-update-single'],
    relatedGuides: ['guides/company-registration-nepal', 'guides/multiple-shareholder-company-registration'],
    np: {
      title: 'एकल शेयरधनी कम्पनी कसरी दर्ता गर्ने?',
      metaTitle: 'एकल शेयरधनी कम्पनी दर्ता कसरी गर्ने? | नेपाल',
      metaDesc: 'एक जना शेयरधनी भएको प्राइभेट लिमिटेड कम्पनी दर्ताको प्रक्रिया, बहुल शेयरधनी कम्पनीसँगको फरक र आवश्यक कागजात।',
      intro: 'नेपालमा एक जना शेयरधनी भएको प्राइभेट लिमिटेड कम्पनी दर्ता गर्न सकिन्छ। प्रक्रिया धेरै हदसम्म उस्तै हो, तर कागजातको ढाँचा फरक हुन्छ।',
      sections: [
        {
          h: 'बहुल शेयरधनी कम्पनीसँग के फरक?',
          list: [
            'सम्पूर्ण शेयर एकै व्यक्तिको नाममा रहन्छ, त्यसैले शेयर बाँडफाँडको विवरण सरल हुन्छ',
            'नियमावलीमा साधारण सभा र गणपूरक संख्यासम्बन्धी व्यवस्था फरक तरिकाले लेखिन्छ',
            'साधारण सभाको माइन्युट एक जनाको निर्णयका रूपमा लेखिन्छ',
            'दफा ९२ को सञ्चालक विवरणमा नाम एउटै वा थोरै हुन्छ'
          ]
        },
        {
          h: 'चाहिने कागजात',
          list: [
            'प्रबन्धपत्र (MOA) — एकल शेयरधनी ढाँचामा',
            'नियमावली (AOA) — एकल शेयरधनी ढाँचामा',
            'शेयरधनीको नागरिकता प्रतिलिपि र फोटो',
            'दर्ता ठेगानाको प्रमाण',
            'CAMIS दर्ता निवेदन'
          ]
        },
        {
          h: 'ध्यान दिनुपर्ने कुरा',
          p: [
            'एकल शेयरधनी कम्पनीमा पनि सञ्चालक तोक्नुपर्छ र वार्षिक अद्यावधिक अनिवार्य हुन्छ। "म एक्लै हो, औपचारिकता चाहिँदैन" भन्ने सोच्दा जरिवाना लाग्छ।',
            'पछि अर्को शेयरधनी थप्न शेयर नामसारी वा पूँजी संरचना परिवर्तनको प्रक्रिया अपनाउनुपर्छ।'
          ]
        }
      ]
    },
    en: {
      title: 'How to register a single shareholder company in Nepal',
      metaTitle: 'How to Register a Single Shareholder Company in Nepal',
      metaDesc: 'The process for registering a one-shareholder private limited company in Nepal, how it differs from a multiple-shareholder company, and what documents you need.',
      intro: 'Nepal allows a private limited company with a single shareholder. The process is largely the same as for several shareholders, but the documents are worded differently.',
      sections: [
        {
          h: 'How it differs from a multiple-shareholder company',
          list: [
            'All shares sit with one person, so the share allocation is simple',
            'The articles handle general meetings and quorum differently',
            'The general meeting minute is written as a single person’s decision',
            'The Section 92 director disclosure lists one or very few names'
          ]
        },
        {
          h: 'Documents needed',
          list: [
            'Memorandum of Association in single-shareholder form',
            'Articles of Association in single-shareholder form',
            'Shareholder’s citizenship copy and photograph',
            'Proof of registered address',
            'CAMIS registration application'
          ]
        },
        {
          h: 'Worth knowing',
          p: [
            'A single-shareholder company still appoints directors and still owes an annual update. Treating it as informal because there is only one owner is how fines happen.',
            'Adding a shareholder later means a share transfer or a change in capital structure, each with its own documents.'
          ]
        }
      ]
    }
  },

  {
    slug: 'guides/multiple-shareholder-company-registration',
    order: 3,
    updated: '2026-09-04',
    sources: [OCR, CAMIS],
    relatedServices: ['registration-multiple', 'annual-update-multiple', 'share-transfer'],
    relatedGuides: ['guides/company-registration-nepal', 'guides/single-shareholder-company-registration'],
    np: {
      title: 'बहुल शेयरधनी कम्पनी कसरी दर्ता गर्ने?',
      metaTitle: 'बहुल शेयरधनी कम्पनी दर्ता कसरी गर्ने? | नेपाल',
      metaDesc: 'दुई वा बढी शेयरधनी भएको प्राइभेट लिमिटेड कम्पनी दर्ताको प्रक्रिया, शेयर बाँडफाँड र आवश्यक कागजात।',
      intro: 'दुई वा बढी व्यक्ति मिलेर कम्पनी दर्ता गर्दा शेयर बाँडफाँड, सञ्चालक नियुक्ति र निर्णय प्रक्रिया कागजातमै स्पष्ट लेख्नुपर्छ।',
      sections: [
        {
          h: 'सुरुमै टुंग्याउनुपर्ने कुरा',
          list: [
            'कसले कति प्रतिशत शेयर लिने',
            'को-को सञ्चालक हुने र कति अवधिका लागि',
            'दैनिक निर्णय कसले गर्ने र ठूलो निर्णयमा कति जनाको सहमति चाहिने',
            'कोही बाहिरिन चाहेमा शेयर कसलाई र कुन मूल्यमा बेच्ने',
            'अधिकृत र जारी पूँजी कति राख्ने'
          ]
        },
        {
          h: 'चाहिने कागजात',
          list: [
            'प्रबन्धपत्र (MOA)',
            'नियमावली (AOA) — बहुल शेयरधनी ढाँचामा',
            'प्रत्येक शेयरधनीको नागरिकता प्रतिलिपि र फोटो',
            'शेयर बाँडफाँडको विवरण',
            'दर्ता ठेगानाको प्रमाण',
            'CAMIS दर्ता निवेदन'
          ]
        },
        {
          h: 'सुझाव',
          p: [
            'शेयर बाँडफाँड र बाहिरिने व्यवस्था सुरुमै लिखित गर्नु सबैभन्दा राम्रो हुन्छ। धेरै विवाद यही नलेखिएका कारण उत्पन्न हुन्छन्।',
            'नियमावलीले नसमेट्ने विस्तृत सहमति भए संस्थापकबीचको छुट्टै सम्झौता बनाउन सकिन्छ।'
          ]
        }
      ]
    },
    en: {
      title: 'How to register a multiple shareholder company in Nepal',
      metaTitle: 'How to Register a Multiple Shareholder Company in Nepal',
      metaDesc: 'Registering a private limited company with two or more shareholders in Nepal — share allocation, directors and the documents required.',
      intro: 'When several people register a company together, the share split, the directors and the decision process all have to be written into the documents from the start.',
      sections: [
        {
          h: 'Settle these before you file',
          list: [
            'Who holds what percentage',
            'Who the directors are and for how long',
            'Who makes day-to-day decisions, and what needs everyone’s agreement',
            'What happens if someone wants out — who buys, at what price',
            'Authorised and issued capital'
          ]
        },
        {
          h: 'Documents needed',
          list: [
            'Memorandum of Association',
            'Articles of Association in multiple-shareholder form',
            'Citizenship copy and photograph for every shareholder',
            'Share allocation statement',
            'Proof of registered address',
            'CAMIS registration application'
          ]
        },
        {
          h: 'Advice',
          p: [
            'Writing down the share split and the exit terms at the start is the single most useful thing you can do. Most disputes come from these never being agreed in writing.',
            'For anything the articles do not cover, a separate founders’ agreement is worth having.'
          ]
        }
      ]
    }
  },

  {
    slug: 'guides/moa-aoa-explained',
    order: 4,
    updated: '2026-09-04',
    sources: [OCR],
    relatedServices: ['registration-single', 'registration-multiple', 'name-change-single'],
    relatedGuides: ['guides/company-registration-nepal'],
    np: {
      title: 'प्रबन्धपत्र (MOA) र नियमावली (AOA) के हुन्?',
      metaTitle: 'MOA र AOA के हो? | प्रबन्धपत्र र नियमावली — नेपाल',
      metaDesc: 'कम्पनीको प्रबन्धपत्र (MOA) र नियमावली (AOA) मा के-के लेखिन्छ, दुवैको फरक र कहिले संशोधन गर्नुपर्छ भन्ने जानकारी।',
      intro: 'कम्पनी दर्ताका दुई मुख्य कागजात प्रबन्धपत्र र नियमावली हुन्। दुवै फरक काम गर्छन् र दुवै दर्ता प्रमाणपत्रजत्तिकै महत्त्वपूर्ण छन्।',
      sections: [
        {
          h: 'प्रबन्धपत्र (Memorandum of Association)',
          p: ['कम्पनी बाहिरी संसारसामु के हो भन्ने बताउने कागजात। यसमा लेखिन्छ:'],
          list: [
            'कम्पनीको नाम र दर्ता ठेगाना',
            'कम्पनीको उद्देश्य — के-के काम गर्न पाउने',
            'अधिकृत पूँजी र शेयरको अंकित मूल्य',
            'शेयरधनीको नाम र निजले लिएको शेयर संख्या',
            'शेयरधनीको दायित्व सीमित हुने व्यवस्था'
          ]
        },
        {
          h: 'नियमावली (Articles of Association)',
          p: ['कम्पनी भित्री रूपमा कसरी चल्छ भन्ने नियम। यसमा लेखिन्छ:'],
          list: [
            'साधारण सभा कसरी बोलाउने र गणपूरक संख्या कति',
            'सञ्चालक कसरी नियुक्त र हट्ने',
            'शेयर नामसारीको प्रक्रिया',
            'लेखापरीक्षक नियुक्ति',
            'लाभांश वितरणको व्यवस्था'
          ]
        },
        {
          h: 'कहिले संशोधन गर्नुपर्छ?',
          list: [
            'कम्पनीको नाम फेर्दा',
            'दर्ता ठेगाना फेर्दा (केही अवस्थामा)',
            'अधिकृत पूँजी बढाउँदा',
            'नयाँ प्रकारको व्यवसाय थप्दा',
            'सञ्चालन विधि बदल्दा'
          ],
          note: 'संशोधनका लागि विशेष साधारण सभाको निर्णय र रजिष्ट्रारको कार्यालयमा निवेदन चाहिन्छ।'
        }
      ]
    },
    en: {
      title: 'What are the MOA and AOA?',
      metaTitle: 'What is MOA and AOA? | Memorandum and Articles — Nepal',
      metaDesc: 'What goes into a company’s Memorandum of Association and Articles of Association in Nepal, how they differ, and when each must be amended.',
      intro: 'The two core registration documents are the memorandum and the articles. They do different jobs and both matter as much as the certificate of incorporation.',
      sections: [
        {
          h: 'Memorandum of Association',
          p: ['What the company is, to the outside world. It sets out:'],
          list: [
            'Company name and registered address',
            'Objects — what the company is permitted to do',
            'Authorised capital and the face value of shares',
            'Shareholders and their holdings',
            'That shareholder liability is limited'
          ]
        },
        {
          h: 'Articles of Association',
          p: ['How the company runs internally. It sets out:'],
          list: [
            'How general meetings are called and what quorum applies',
            'How directors are appointed and removed',
            'The share transfer procedure',
            'Auditor appointment',
            'How dividends are declared'
          ]
        },
        {
          h: 'When they must be amended',
          list: [
            'Changing the company name',
            'Changing the registered address, in some cases',
            'Increasing authorised capital',
            'Adding a new line of business',
            'Changing how the company is governed'
          ],
          note: 'Amendment needs a special general meeting resolution and an application to the Registrar.'
        }
      ]
    }
  },

  {
    slug: 'guides/company-annual-update',
    order: 5,
    updated: '2026-09-04',
    sources: [OCR, CAMIS],
    relatedServices: ['annual-update-single', 'annual-update-multiple', 'records-auditor'],
    relatedGuides: ['guides/section-51-92-explained', 'guides/initial-three-month-update'],
    np: {
      title: 'कम्पनीको वार्षिक अद्यावधिक कसरी गर्ने?',
      metaTitle: 'कम्पनी वार्षिक अद्यावधिक कसरी गर्ने? | कागजात र प्रक्रिया',
      metaDesc: 'कम्पनीको वार्षिक अद्यावधिकमा कुन-कुन कागजात चाहिन्छ, कहिलेसम्म पेस गर्नुपर्छ र ढिलो भए के हुन्छ भन्ने जानकारी।',
      intro: 'दर्ता भएको हरेक कम्पनीले प्रत्येक आर्थिक वर्षपछि कम्पनी रजिष्ट्रारको कार्यालयमा अद्यावधिक विवरण पेस गर्नुपर्छ। कारोबार भएन भन्दैमा छुट हुँदैन।',
      sections: [
        {
          h: 'चाहिने कागजात',
          list: [
            'सञ्चालक समितिको बैठकको माइन्युट',
            'वार्षिक साधारण सभाको माइन्युट',
            'दफा ५१ बमोजिम शेयर, ऋणपत्र र ऋणको लगत',
            'दफा ९२ बमोजिम सञ्चालकको विवरण',
            'लेखापरीक्षण प्रतिवेदन र वित्तीय विवरण',
            'रजिष्ट्रारको कार्यालयमा पेस गर्ने निवेदन'
          ]
        },
        {
          h: 'क्रम',
          steps: [
            { k: 'लेखापरीक्षण', v: 'लेखापरीक्षकबाट वार्षिक हिसाब र प्रतिवेदन तयार गराउनुहोस्।' },
            { k: 'सञ्चालक बैठक', v: 'हिसाब स्वीकृत गरी साधारण सभा बोलाउने निर्णय गर्नुहोस्।' },
            { k: 'साधारण सभा', v: 'हिसाब पारित गर्नुहोस्, लेखापरीक्षक नियुक्त वा पुनर्नियुक्त गर्नुहोस्।' },
            { k: 'कागजात तयार', v: 'माइन्युट, दफा ५१ र दफा ९२ का विवरण तयार गर्नुहोस्।' },
            { k: 'CAMIS मा पेस', v: 'कागजात अपलोड गरी निवेदन दर्ता गर्नुहोस्।' }
          ]
        },
        {
          h: 'ढिलो भए के हुन्छ?',
          p: ['म्याद नाघेमा जरिवाना लाग्छ र ढिलाइ बढ्दै गएपछि रकम पनि बढ्दै जान्छ। लामो समय अद्यावधिक नगरेको कम्पनीलाई बैंक कर्जा, ठेक्का र नवीकरणमा समस्या पर्छ। जरिवानाको दर कार्यालयले तोक्छ र समय-समयमा फेरिन्छ, त्यसैले हालको दर CAMIS मा वा कार्यालयमा सोधेर पक्का गर्नुहोस्।']
        }
      ]
    },
    en: {
      title: 'How to complete a company annual update in Nepal',
      metaTitle: 'How to Do a Company Annual Update in Nepal | Documents and Process',
      metaDesc: 'Which documents the annual company update needs, the order to prepare them in, when it is due and what happens if you file late.',
      intro: 'Every registered company must file an update with the Office of the Company Registrar after each fiscal year. Having no turnover does not exempt you.',
      sections: [
        {
          h: 'Documents needed',
          list: [
            'Board of Directors minute',
            'Annual General Meeting minute',
            'Section 51 inventory of shares, debentures and loans',
            'Section 92 disclosure by directors',
            'Audit report and financial statements',
            'Application to the Registrar'
          ]
        },
        {
          h: 'The order',
          steps: [
            { k: 'Audit', v: 'Have your auditor prepare the annual accounts and report.' },
            { k: 'Board meeting', v: 'Approve the accounts and resolve to call the general meeting.' },
            { k: 'General meeting', v: 'Adopt the accounts and appoint or reappoint the auditor.' },
            { k: 'Prepare documents', v: 'Draft the minutes and the Section 51 and Section 92 statements.' },
            { k: 'File in CAMIS', v: 'Upload the documents and submit the application.' }
          ]
        },
        {
          h: 'What happens if you file late',
          p: ['A fine applies and it grows the longer the filing is outstanding. A company that has not updated for years will run into problems with bank lending, tenders and renewals. Fine rates are set by the office and change over time, so confirm the current rate in CAMIS or at the office.']
        }
      ]
    }
  },

  {
    slug: 'guides/initial-three-month-update',
    order: 6,
    updated: '2026-09-04',
    sources: [OCR, CAMIS],
    relatedServices: ['initial-update-single', 'initial-update-multiple', 'pan-registration'],
    relatedGuides: ['guides/company-annual-update', 'guides/company-registration-nepal'],
    np: {
      title: '३ महिने प्रारम्भिक विवरण के हो?',
      metaTitle: '३ महिने कम्पनी विवरण के हो? | प्रारम्भिक अद्यावधिक नेपाल',
      metaDesc: 'दर्ता भएको तीन महिनाभित्र पेस गर्नुपर्ने प्रारम्भिक विवरणमा के-के चाहिन्छ र नगरे के हुन्छ भन्ने जानकारी।',
      intro: 'कम्पनी दर्ता भएपछि तीन महिनाभित्र केही आधारभूत विवरण कम्पनी रजिष्ट्रारको कार्यालयमा पेस गर्नुपर्छ। धेरै नयाँ कम्पनीले यो बिर्सन्छन् र पहिलो जरिवाना यहीँबाट सुरु हुन्छ।',
      sections: [
        {
          h: 'के-के पेस गर्नुपर्छ?',
          list: [
            'प्रारम्भिक सञ्चालक बैठकको माइन्युट',
            'लेखापरीक्षक नियुक्तिको जानकारी',
            'दफा १८४ बमोजिम दर्ता ठेगानाको जानकारी',
            'दफा ९२ बमोजिम सञ्चालकको विवरण',
            'रजिष्ट्रारको कार्यालयमा निवेदन'
          ]
        },
        {
          h: 'वार्षिक अद्यावधिकसँग फरक',
          p: ['प्रारम्भिक विवरण कम्पनीको जीवनमा एक पटक मात्र, दर्ता भएको तीन महिनाभित्र पेस गरिन्छ। वार्षिक अद्यावधिक हरेक आर्थिक वर्षपछि दोहोरिन्छ। कागजात पनि फरक हुन्छन् — प्रारम्भिकमा लेखापरीक्षण प्रतिवेदन चाहिँदैन।']
        },
        {
          h: 'ध्यान दिनुहोस्',
          list: [
            'लेखापरीक्षक पहिले नियुक्त गर्नुहोस्, अनि मात्र यो विवरण तयार हुन्छ',
            'दर्ता ठेगाना र वास्तविक कार्यालय ठेगाना फरक भए त्यो स्पष्ट खुलाउनुहोस्',
            'यही अवधिमा PAN दर्ता र पालिकामा व्यवसाय दर्ता पनि सकाउनु राम्रो'
          ]
        }
      ]
    },
    en: {
      title: 'What is the three-month initial return?',
      metaTitle: 'What is the 3-Month Company Return in Nepal? | Initial Update',
      metaDesc: 'What the initial return due within three months of incorporation contains, how it differs from the annual update, and what happens if you miss it.',
      intro: 'Within three months of incorporation a company must file some basic information with the Office of the Company Registrar. Many new companies forget it, and it is where their first fine usually comes from.',
      sections: [
        {
          h: 'What you file',
          list: [
            'Initial board minute',
            'Auditor appointment information',
            'Section 184 registered address information',
            'Section 92 disclosure by directors',
            'Application to the Registrar'
          ]
        },
        {
          h: 'How it differs from the annual update',
          p: ['The initial return happens once, within three months of incorporation. The annual update repeats after every fiscal year. The documents differ too — the initial return does not need an audit report.']
        },
        {
          h: 'Watch out for',
          list: [
            'Appoint your auditor first; this return depends on it',
            'If the registered address differs from where you actually work, state that clearly',
            'This is also a good window to finish PAN registration and municipal business registration'
          ]
        }
      ]
    }
  },

  {
    slug: 'guides/section-51-92-explained',
    order: 7,
    updated: '2026-09-04',
    sources: [OCR],
    relatedServices: ['annual-update-single', 'annual-update-multiple', 'records-auditor'],
    relatedGuides: ['guides/company-annual-update'],
    np: {
      title: 'दफा ५१ र दफा ९२ का विवरण के हुन्?',
      metaTitle: 'दफा ५१ र दफा ९२ विवरण के हो? | कम्पनी अद्यावधिक नेपाल',
      metaDesc: 'कम्पनी अद्यावधिकमा माग गरिने दफा ५१ को शेयर–ऋण लगत र दफा ९२ को सञ्चालक विवरणमा के-के लेखिन्छ भन्ने सरल व्याख्या।',
      intro: 'वार्षिक अद्यावधिकका कागजातमा सबैभन्दा धेरै अलमल पार्ने यी दुई विवरण हुन्। दुवैले फरक कुरा सोध्छन्।',
      sections: [
        {
          h: 'दफा ५१ — शेयर, ऋणपत्र र ऋणको लगत',
          p: ['कम्पनीमा कसको कति लगानी छ र कम्पनीले कति ऋण लिएको छ भन्ने अभिलेख। यसमा लेखिन्छ:'],
          list: [
            'प्रत्येक शेयरधनीको नाम, ठेगाना र शेयर संख्या',
            'शेयरको अंकित मूल्य र कुल रकम',
            'ऋणपत्र जारी गरेको भए त्यसको विवरण',
            'कम्पनीले लिएको ऋण र त्यसको स्रोत'
          ]
        },
        {
          h: 'दफा ९२ — सञ्चालकको विवरण',
          p: ['सञ्चालकहरू को हुन् र निजहरूको अन्य कम्पनीमा के स्वार्थ छ भन्ने खुलासा। यसमा लेखिन्छ:'],
          list: [
            'प्रत्येक सञ्चालकको नाम, ठेगाना र नागरिकता नम्बर',
            'नियुक्ति मिति र पद',
            'सञ्चालकले यस कम्पनीमा लिएको शेयर',
            'अन्य कम्पनीमा सञ्चालक वा शेयरधनी भए त्यसको विवरण'
          ]
        },
        {
          h: 'दफा १८४ — ठेगानाको जानकारी',
          p: ['यो प्रारम्भिक विवरणमा माग हुन्छ र कम्पनीको दर्ता ठेगाना तथा सूचना पठाउने ठेगाना खुलाउँछ। ठेगाना फेरिएमा पनि यही विवरण अद्यावधिक गर्नुपर्छ।']
        },
        {
          h: 'बारम्बार हुने गल्ती',
          list: [
            'गत वर्षकै विवरण जस्ताको तस्तै सारेर पेस गर्ने — शेयर वा सञ्चालक फेरिएको भए गलत हुन्छ',
            'सञ्चालकको अन्य कम्पनीको स्वार्थ नखुलाउने',
            'शेयर संख्या र कुल पूँजी नमिल्ने'
          ]
        }
      ]
    },
    en: {
      title: 'What are the Section 51 and Section 92 statements?',
      metaTitle: 'Section 51 and Section 92 Explained | Company Update Nepal',
      metaDesc: 'A plain explanation of the Section 51 share and loan inventory and the Section 92 director disclosure required in a Nepali company update.',
      intro: 'These two statements cause more confusion than anything else in the annual update. They ask for different things.',
      sections: [
        {
          h: 'Section 51 — inventory of shares, debentures and loans',
          p: ['A record of who has invested in the company and what the company owes. It states:'],
          list: [
            'Each shareholder’s name, address and number of shares',
            'Face value per share and the total',
            'Details of any debentures issued',
            'Loans taken by the company and their source'
          ]
        },
        {
          h: 'Section 92 — disclosure by directors',
          p: ['Who the directors are and what other interests they hold. It states:'],
          list: [
            'Each director’s name, address and citizenship number',
            'Date of appointment and position',
            'Shares that director holds in this company',
            'Directorships or shareholdings in other companies'
          ]
        },
        {
          h: 'Section 184 — address information',
          p: ['This appears in the initial return and records the registered address and the address for notices. It is also what you update when the address changes.']
        },
        {
          h: 'Common mistakes',
          list: [
            'Copying last year’s statement unchanged when shares or directors have moved',
            'Not disclosing a director’s interest in other companies',
            'Share counts that do not reconcile with total capital'
          ]
        }
      ]
    }
  },

  {
    slug: 'guides/share-transfer-nepal',
    order: 8,
    updated: '2026-09-04',
    sources: [OCR, CAMIS],
    relatedServices: ['share-transfer', 'records-auditor', 'annual-update-multiple'],
    relatedGuides: ['guides/company-annual-update'],
    np: {
      title: 'कम्पनीको शेयर नामसारी कसरी गर्ने?',
      metaTitle: 'शेयर नामसारी कसरी गर्ने? | कागजात र प्रक्रिया नेपाल',
      metaDesc: 'कम्पनीको शेयर एक व्यक्तिबाट अर्कोमा सार्ने प्रक्रिया, आवश्यक कागजात र मृत्युपछिको नामसारीमा के फरक पर्छ भन्ने जानकारी।',
      intro: 'शेयर नामसारी भनेको कम्पनीको स्वामित्व आंशिक वा पूर्ण रूपमा अर्को व्यक्तिलाई हस्तान्तरण गर्नु हो। किनबेच, बकस वा हकवाला — कारण जुनसुकै भए पनि अभिलेख कार्यालयमा अद्यावधिक गर्नुपर्छ।',
      sections: [
        {
          h: 'प्रक्रिया',
          steps: [
            { k: 'सहमति', v: 'शेयर दिने र लिने पक्षबीच कति कित्ता, कति मूल्यमा भन्ने टुंगो लगाउनुहोस्।' },
            { k: 'नियमावली जाँच', v: 'नियमावलीमा शेयर नामसारीमा कुनै प्रतिबन्ध वा अग्राधिकार (pre-emption) छ कि छैन हेर्नुहोस्।' },
            { k: 'सभा र निर्णय', v: 'विशेष साधारण सभा वा सञ्चालक बैठकबाट नामसारी स्वीकृत गर्नुहोस्।' },
            { k: 'लिखत तयार', v: 'नामसारी लिखत, लगानी प्रमाणपत्र र आवश्यक परे राजीनामा पत्र तयार गर्नुहोस्।' },
            { k: 'कार्यालयमा पेस', v: 'निवेदनसहित कागजात रजिष्ट्रारको कार्यालयमा पेस गर्नुहोस्।' },
            { k: 'लगत अद्यावधिक', v: 'शेयर लगत र सञ्चालक लगत नयाँ संरचनाअनुसार अद्यावधिक गर्नुहोस्।' }
          ]
        },
        {
          h: 'मृत्युपछिको नामसारीमा थप',
          list: [
            'मृत्यु दर्ता प्रमाणपत्र',
            'नाता प्रमाणित',
            'हकवालाको नागरिकता प्रतिलिपि',
            'एकभन्दा बढी हकवाला भए आपसी सहमति वा अंशबन्डाको प्रमाण'
          ],
          note: 'हकवालाबीच विवाद भएमा त्यो अदालतको विषय बन्छ। त्यस्तो अवस्थामा अधिवक्तासँग परामर्श गर्नुहोस्।'
        },
        {
          h: 'ध्यान दिनुपर्ने',
          p: ['नामसारीपछि शेयर लगत, सञ्चालक लगत र आगामी वार्षिक अद्यावधिकमा नयाँ संरचना देखिनुपर्छ। पुरानै विवरण दोहोर्‍याएमा कागजात बाझिन्छ र पछि समस्या पर्छ।']
        }
      ]
    },
    en: {
      title: 'How to transfer company shares in Nepal',
      metaTitle: 'How to Transfer Shares in Nepal | Documents and Process',
      metaDesc: 'The share transfer process for Nepali companies, the documents required, and what changes for a transfer after death.',
      intro: 'A share transfer moves ownership of the company, in part or in whole, to someone else. Whether by sale, gift or inheritance, the register has to be updated at the office.',
      sections: [
        {
          h: 'The process',
          steps: [
            { k: 'Agree terms', v: 'Settle how many shares move and at what price.' },
            { k: 'Check the articles', v: 'See whether your articles restrict transfers or give existing shareholders a right of first refusal.' },
            { k: 'Meet and resolve', v: 'Approve the transfer at a special general meeting or board meeting.' },
            { k: 'Draft the deed', v: 'Prepare the transfer deed, investment certificate and a resignation letter if a director steps down.' },
            { k: 'File with the office', v: 'Submit the documents with an application to the Registrar.' },
            { k: 'Update the registers', v: 'Bring the share register and director registry into line with the new structure.' }
          ]
        },
        {
          h: 'Additional documents for a transfer after death',
          list: [
            'Death registration certificate',
            'Proof of relationship',
            'Heir’s citizenship copy',
            'Where there are several heirs, their agreement or evidence of partition'
          ],
          note: 'A dispute between heirs becomes a court matter. Consult an advocate in that situation.'
        },
        {
          h: 'Worth knowing',
          p: ['After the transfer, the share register, the director registry and your next annual update all have to show the new structure. Repeating the old figures creates contradictions that surface later.']
        }
      ]
    }
  },

  {
    slug: 'guides/company-name-change',
    order: 9,
    updated: '2026-09-04',
    sources: [OCR, CAMIS],
    relatedServices: ['name-change-single', 'name-change-multiple', 'bank-account'],
    relatedGuides: ['guides/moa-aoa-explained'],
    np: {
      title: 'कम्पनीको नाम कसरी परिवर्तन गर्ने?',
      metaTitle: 'कम्पनीको नाम कसरी परिवर्तन गर्ने? | प्रक्रिया र कागजात',
      metaDesc: 'कम्पनीको नाम परिवर्तनको प्रक्रिया, आवश्यक कागजात र नाम फेरेपछि कहाँ-कहाँ अद्यावधिक गर्नुपर्छ भन्ने जानकारी।',
      intro: 'कम्पनीको नाम फेर्न विशेष साधारण सभाको निर्णय, संशोधित प्रबन्धपत्र–नियमावली र रजिष्ट्रारको कार्यालयको स्वीकृति चाहिन्छ।',
      sections: [
        {
          h: 'प्रक्रिया',
          steps: [
            { k: 'नयाँ नाम छान्नुहोस्', v: 'CAMIS मा मिल्दोजुल्दो नाम दर्ता भइसकेको छ कि छैन हेर्नुहोस्। २–३ विकल्प राख्नुहोस्।' },
            { k: 'सभाको निर्णय', v: 'विशेष साधारण सभाबाट नाम परिवर्तनको निर्णय गर्नुहोस्।' },
            { k: 'कागजात संशोधन', v: 'प्रबन्धपत्र र नियमावलीमा नयाँ नाम राखी संशोधित प्रति तयार गर्नुहोस्।' },
            { k: 'निवेदन पेस', v: 'माइन्युट र संशोधित कागजातसहित कार्यालयमा निवेदन दिनुहोस्।' },
            { k: 'स्वीकृति', v: 'कार्यालयले स्वीकृत गरेपछि नयाँ नाममा प्रमाणपत्र जारी हुन्छ।' }
          ]
        },
        {
          h: 'नाम फेरेपछि कहाँ अद्यावधिक गर्ने?',
          list: [
            'आन्तरिक राजस्व कार्यालय — PAN अभिलेख',
            'बैंक — खाता र हस्ताक्षरकर्ता विवरण',
            'स्थानीय तह — व्यवसाय दर्ता',
            'इजाजतपत्र दिने निकाय, भए',
            'ग्राहक र आपूर्तिकर्तासँगका सम्झौता'
          ]
        },
        {
          h: 'ध्यान दिनुहोस्',
          p: ['नाम स्वीकृत हुने वा नहुने कार्यालयको निर्णय हो। धेरै मिल्दोजुल्दो नाम, भ्रामक नाम वा प्रतिबन्धित शब्द भएको नाम अस्वीकृत हुन सक्छ।']
        }
      ]
    },
    en: {
      title: 'How to change a company name in Nepal',
      metaTitle: 'How to Change a Company Name in Nepal | Process and Documents',
      metaDesc: 'The company name change process in Nepal, the documents required, and everywhere you need to update after the name changes.',
      intro: 'Changing a company name needs a special general meeting resolution, amended memorandum and articles, and approval from the Office of the Company Registrar.',
      sections: [
        {
          h: 'The process',
          steps: [
            { k: 'Choose the new name', v: 'Check CAMIS for similar names already registered. Have two or three options.' },
            { k: 'Pass the resolution', v: 'Resolve on the change at a special general meeting.' },
            { k: 'Amend the documents', v: 'Prepare amended memorandum and articles carrying the new name.' },
            { k: 'File the application', v: 'Submit the minute and amended documents to the office.' },
            { k: 'Approval', v: 'Once approved, a certificate in the new name is issued.' }
          ]
        },
        {
          h: 'Where to update afterwards',
          list: [
            'Inland Revenue Office — PAN records',
            'Your bank — account and signatory details',
            'Local level — business registration',
            'Any licensing authority',
            'Contracts with customers and suppliers'
          ]
        },
        {
          h: 'Worth knowing',
          p: ['Approval is the office’s decision. Names too similar to an existing one, misleading names, or names using restricted words can be rejected.']
        }
      ]
    }
  },

  {
    slug: 'guides/company-address-change',
    order: 10,
    updated: '2026-09-04',
    sources: [OCR],
    relatedServices: ['address-change-single', 'address-change-multiple', 'ward-office'],
    relatedGuides: ['guides/section-51-92-explained'],
    np: {
      title: 'कम्पनीको ठेगाना कसरी परिवर्तन गर्ने?',
      metaTitle: 'कम्पनीको ठेगाना कसरी परिवर्तन गर्ने? | दफा १८४',
      metaDesc: 'कम्पनीको दर्ता ठेगाना परिवर्तन गर्ने प्रक्रिया, आवश्यक कागजात र अर्को पालिकामा सर्दा के फरक पर्छ भन्ने जानकारी।',
      intro: 'दर्ता ठेगाना कम्पनीको आधिकारिक सम्पर्क ठेगाना हो। सरेपछि कार्यालयलाई जानकारी नदिँदा सरकारी सूचना नपुग्ने र त्यसैले समस्या पर्ने हुन्छ।',
      sections: [
        {
          h: 'प्रक्रिया',
          steps: [
            { k: 'नयाँ ठेगानाको प्रमाण', v: 'बहाल सम्झौता वा स्वामित्व प्रमाण तयार गर्नुहोस्। बहालमा भए वडा कार्यालयबाट प्रमाणित गराउनुपर्न सक्छ।' },
            { k: 'निर्णय', v: 'सञ्चालक बैठक — बहुल शेयरधनी भए विशेष साधारण सभा — बाट ठेगाना परिवर्तनको निर्णय गर्नुहोस्।' },
            { k: 'कागजात तयार', v: 'निवेदन, माइन्युट र आवश्यक परे संशोधित प्रबन्धपत्र–नियमावली तयार गर्नुहोस्।' },
            { k: 'पेस गर्नुहोस्', v: 'दफा १८४ बमोजिमको ठेगाना जानकारीसहित कार्यालयमा पेस गर्नुहोस्।' }
          ]
        },
        {
          h: 'अर्को पालिका वा जिल्लामा सर्दा',
          p: ['ठेगाना अर्को स्थानीय तहमा सर्दा त्यहाँको व्यवसाय दर्ता नयाँ गर्नुपर्ने हुन सक्छ र पुरानो पालिकाबाट खारेजी वा सिफारिस चाहिन सक्छ। प्रदेश फेरिँदा थप प्रक्रिया लाग्न सक्छ, त्यसैले सर्नुअघि दुवै पालिकामा सोध्नुहोस्।']
        },
        {
          h: 'सँगै अद्यावधिक गर्नुपर्ने',
          list: ['PAN अभिलेख', 'बैंक खाता', 'व्यवसाय दर्ता र नवीकरण', 'इजाजतपत्र, भए']
        }
      ]
    },
    en: {
      title: 'How to change a company address in Nepal',
      metaTitle: 'How to Change a Company Address in Nepal | Section 184',
      metaDesc: 'The process for changing a company’s registered address in Nepal, the documents needed, and what changes when you move municipality.',
      intro: 'The registered address is the company’s official address for notices. Not telling the office after you move means government correspondence does not reach you, which is how problems start.',
      sections: [
        {
          h: 'The process',
          steps: [
            { k: 'Proof for the new address', v: 'Prepare a rent agreement or ownership document. A rented address may need ward office certification.' },
            { k: 'Resolve', v: 'Pass the resolution at a board meeting — or a special general meeting for a multiple-shareholder company.' },
            { k: 'Prepare documents', v: 'Draft the application, the minute and amended MOA/AOA where required.' },
            { k: 'File', v: 'Submit with the Section 184 address information.' }
          ]
        },
        {
          h: 'Moving to another municipality or district',
          p: ['Moving to a different local level can mean registering the business afresh there and getting a cancellation or recommendation from the old one. Crossing a provincial boundary can add steps. Ask both local offices before you move.']
        },
        {
          h: 'Update at the same time',
          list: ['PAN records', 'Bank account', 'Business registration and renewal', 'Any licences']
        }
      ]
    }
  },

  {
    slug: 'guides/capital-increase-nepal',
    order: 11,
    updated: '2026-09-04',
    sources: [OCR],
    relatedServices: ['capital-increase-single', 'capital-increase-multiple', 'share-transfer'],
    relatedGuides: ['guides/moa-aoa-explained'],
    np: {
      title: 'कम्पनीको पूँजी कसरी वृद्धि गर्ने?',
      metaTitle: 'कम्पनीको पूँजी कसरी बढाउने? | अधिकृत र जारी पूँजी',
      metaDesc: 'अधिकृत र जारी पूँजी बीचको फरक, पूँजी वृद्धिको प्रक्रिया र सरकारी दस्तुर कसरी लाग्छ भन्ने जानकारी।',
      intro: 'बैंक कर्जा, ठेक्का वा व्यवसाय विस्तारका लागि पूँजी बढाउनुपर्ने हुन्छ। पहिले दुई शब्दको फरक बुझ्नुहोस्।',
      sections: [
        {
          h: 'अधिकृत र जारी पूँजी',
          list: [
            'अधिकृत पूँजी — कम्पनीले बढीमा जति शेयर जारी गर्न पाउने सीमा',
            'जारी पूँजी — वास्तवमा शेयरधनीलाई जारी गरिएको रकम',
            'चुक्ता पूँजी — शेयरधनीले वास्तवमा तिरिसकेको रकम'
          ],
          note: 'सरकारी दस्तुर अधिकृत पूँजीका आधारमा लाग्छ, त्यसैले आवश्यकभन्दा धेरै अधिकृत पूँजी राख्दा खर्च बढ्छ।'
        },
        {
          h: 'प्रक्रिया',
          steps: [
            { k: 'कति बढाउने तय गर्नुहोस्', v: 'अधिकृत मात्र बढाउने कि जारी पूँजी पनि — दुवैको प्रक्रिया फरक हुन्छ।' },
            { k: 'सभाको निर्णय', v: 'विशेष साधारण सभाबाट पूँजी वृद्धि र प्रबन्धपत्र संशोधनको निर्णय गर्नुहोस्।' },
            { k: 'शेयर बाँडफाँड', v: 'थप शेयर कसले लिने तय गर्नुहोस्। समानुपातिक नलिए स्वामित्व अनुपात फेरिन्छ।' },
            { k: 'कागजात संशोधन', v: 'प्रबन्धपत्र र नियमावली संशोधन गर्नुहोस्।' },
            { k: 'दस्तुर र पेसी', v: 'दस्तुर तिरी कार्यालयमा निवेदन पेस गर्नुहोस्।' }
          ]
        },
        {
          h: 'सुझाव',
          p: ['पूँजी वृद्धिको कर सम्बन्धी असर हुन सक्छ, विशेष गरी मुनाफा पूँजीकरण गरेर बढाउँदा। निर्णय गर्नुअघि लेखापरीक्षकसँग परामर्श गर्नुहोस्।']
        }
      ]
    },
    en: {
      title: 'How to increase company capital in Nepal',
      metaTitle: 'How to Increase Company Capital in Nepal | Authorised vs Issued',
      metaDesc: 'The difference between authorised, issued and paid-up capital, the process for increasing capital in Nepal, and how the government fee is calculated.',
      intro: 'Capital increases usually come up for a bank loan, a tender or expansion. Start by getting the terms straight.',
      sections: [
        {
          h: 'Authorised, issued and paid-up',
          list: [
            'Authorised capital — the ceiling on what the company may issue',
            'Issued capital — what has actually been issued to shareholders',
            'Paid-up capital — what shareholders have actually paid in'
          ],
          note: 'The government fee is based on authorised capital, so setting it higher than you need costs money.'
        },
        {
          h: 'The process',
          steps: [
            { k: 'Decide the increase', v: 'Authorised only, or issued as well — the process differs.' },
            { k: 'Pass the resolution', v: 'Resolve on the increase and the memorandum amendment at a special general meeting.' },
            { k: 'Allocate the new shares', v: 'Decide who takes them up. Anything other than proportional take-up shifts the ownership split.' },
            { k: 'Amend the documents', v: 'Amend the memorandum and articles.' },
            { k: 'Pay and file', v: 'Pay the fee and file the application.' }
          ]
        },
        {
          h: 'Advice',
          p: ['A capital increase can have tax consequences, particularly when funded by capitalising profit. Talk to your auditor before deciding.']
        }
      ]
    }
  },

  {
    slug: 'guides/pan-registration-documents',
    order: 12,
    updated: '2026-09-04',
    sources: [IRD],
    relatedServices: ['pan-registration', 'tax-clearance', 'bank-account'],
    relatedGuides: ['guides/company-registration-nepal', 'guides/tax-clearance-certificate'],
    np: {
      title: 'PAN दर्ताका लागि के कागजात चाहिन्छ?',
      metaTitle: 'PAN दर्ताका लागि कागजात | स्थायी लेखा नम्बर नेपाल',
      metaDesc: 'कम्पनीको स्थायी लेखा नम्बर (PAN) दर्ताका लागि आवश्यक कागजात, प्रक्रिया र VAT सँगको फरक।',
      intro: 'कम्पनी दर्ता भएपछि आन्तरिक राजस्व कार्यालयबाट स्थायी लेखा नम्बर लिनुपर्छ। PAN नभई बैंक खाता, बिजक र कर विवरण केही पनि मिल्दैन।',
      sections: [
        {
          h: 'चाहिने कागजात',
          list: [
            'कम्पनी दर्ता प्रमाणपत्रको प्रतिलिपि',
            'प्रबन्धपत्र र नियमावलीको प्रतिलिपि',
            'PAN दर्ताको अधिकार दिने सञ्चालक माइन्युट',
            'सञ्चालक र शेयरधनीको नागरिकता प्रतिलिपि',
            'पासपोर्ट साइजको फोटो',
            'कार्यालय ठेगानाको प्रमाण — बहाल सम्झौता वा स्वामित्व प्रमाण',
            'आन्तरिक राजस्व कार्यालयको दर्ता फारम'
          ]
        },
        {
          h: 'PAN र VAT को फरक',
          p: ['PAN सबै दर्ता कम्पनीले अनिवार्य लिनुपर्छ। VAT भने कारोबार तोकिएको सीमा नाघेमा वा तोकिएका व्यवसायमा मात्र अनिवार्य हुन्छ। VAT दर्ता भएपछि नियमित VAT विवरण बुझाउनुपर्ने दायित्व थपिन्छ, त्यसैले आवश्यक नभई दर्ता नगर्नुहोस्।']
        },
        {
          h: 'ध्यान दिनुहोस्',
          list: [
            'कम्पनीको नाम वा ठेगाना फेरिएमा PAN अभिलेख पनि अद्यावधिक गर्नुपर्छ',
            'PAN लिएपछि कारोबार नभए पनि तोकिएअनुसार विवरण बुझाउनुपर्छ',
            'सीमा र दरहरू समय-समयमा फेरिन्छन् — हालको अवस्था कार्यालयमा वा लेखापरीक्षकसँग पक्का गर्नुहोस्'
          ]
        }
      ]
    },
    en: {
      title: 'What documents are needed for PAN registration?',
      metaTitle: 'Documents Required for PAN Registration in Nepal',
      metaDesc: 'The documents needed to register a company for a Permanent Account Number in Nepal, the process, and how PAN differs from VAT.',
      intro: 'After incorporation a company registers for a Permanent Account Number at the Inland Revenue Office. Without a PAN you cannot open a bank account, issue invoices or file returns.',
      sections: [
        {
          h: 'Documents needed',
          list: [
            'Copy of the certificate of incorporation',
            'Copies of the memorandum and articles',
            'Board minute authorising PAN registration',
            'Citizenship copies for directors and shareholders',
            'Passport-size photographs',
            'Proof of office address — rent agreement or ownership document',
            'The Inland Revenue Office registration form'
          ]
        },
        {
          h: 'PAN versus VAT',
          p: ['Every registered company must have a PAN. VAT applies only once turnover crosses the threshold or for certain listed businesses. VAT registration brings a continuing return-filing obligation, so do not register for it unless you need to.']
        },
        {
          h: 'Worth knowing',
          list: [
            'If the company name or address changes, the PAN record must be updated too',
            'Once registered, returns are due even in a year with no trading',
            'Thresholds and rates change — confirm the current position with the office or your auditor'
          ]
        }
      ]
    }
  },

  {
    slug: 'guides/tax-clearance-certificate',
    order: 13,
    updated: '2026-09-04',
    sources: [IRD],
    relatedServices: ['tax-clearance', 'pan-registration', 'annual-update-single'],
    relatedGuides: ['guides/pan-registration-documents'],
    np: {
      title: 'कर चुक्ता प्रमाणपत्र कसरी लिने?',
      metaTitle: 'कर चुक्ता प्रमाणपत्र कसरी लिने? | IRD नेपाल',
      metaDesc: 'कर चुक्ता प्रमाणपत्रका लागि के चाहिन्छ, कहाँ निवेदन दिने र कुन-कुन प्रयोजनमा आवश्यक पर्छ भन्ने जानकारी।',
      intro: 'कर चुक्ता प्रमाणपत्रले तोकिएको आर्थिक वर्षसम्मको कर दायित्व चुक्ता भएको देखाउँछ। ठेक्का, कर्जा र नवीकरणमा प्रायः माग गरिन्छ।',
      sections: [
        {
          h: 'पहिले पूरा हुनुपर्ने',
          list: [
            'सम्बन्धित आर्थिक वर्षको आय विवरण दाखिला',
            'लेखापरीक्षण सम्पन्न',
            'बाँकी कर र जरिवाना भए चुक्ता',
            'VAT दर्ता भए VAT विवरण अद्यावधिक'
          ],
          note: 'यी पूरा नभई निवेदन मात्र दिँदा प्रमाणपत्र जारी हुँदैन।'
        },
        {
          h: 'प्रक्रिया',
          steps: [
            { k: 'हिसाब मिलाउनुहोस्', v: 'लेखापरीक्षकमार्फत विवरण दाखिला र बाँकी कर चुक्ता गर्नुहोस्।' },
            { k: 'निवेदन तयार', v: 'कुन आर्थिक वर्ष र कुन प्रयोजनका लागि चाहिएको हो स्पष्ट लेख्नुहोस्।' },
            { k: 'पेस गर्नुहोस्', v: 'आफ्नो करदाता सेवा कार्यालयमा निवेदन र सम्बन्धित कागजात पेस गर्नुहोस्।' },
            { k: 'जाँच', v: 'कार्यालयले अभिलेख जाँचेर प्रमाणपत्र जारी गर्छ।' }
          ]
        },
        {
          h: 'कहिले चाहिन्छ?',
          list: ['सरकारी ठेक्का र बोलपत्र', 'बैंक कर्जा', 'व्यवसाय नवीकरण', 'कम्पनी खारेजी', 'केही इजाजतपत्र नवीकरण']
        }
      ]
    },
    en: {
      title: 'How to get a tax clearance certificate in Nepal',
      metaTitle: 'How to Get a Tax Clearance Certificate in Nepal | IRD',
      metaDesc: 'What must be settled before applying for a tax clearance certificate in Nepal, where to apply, and what it is usually needed for.',
      intro: 'A tax clearance certificate shows that tax obligations are settled up to a given fiscal year. Tenders, loans and renewals commonly ask for one.',
      sections: [
        {
          h: 'Settle these first',
          list: [
            'Income tax return filed for the relevant year',
            'Audit completed',
            'Outstanding tax and any penalties paid',
            'VAT returns up to date if registered'
          ],
          note: 'Applying before these are done will not produce a certificate.'
        },
        {
          h: 'The process',
          steps: [
            { k: 'Get the accounts straight', v: 'File returns and clear outstanding tax through your auditor.' },
            { k: 'Prepare the application', v: 'State clearly which fiscal year and what the certificate is for.' },
            { k: 'Submit', v: 'File the application with supporting documents at your taxpayer service office.' },
            { k: 'Verification', v: 'The office checks its records and issues the certificate.' }
          ]
        },
        {
          h: 'When you need one',
          list: ['Government tenders and bids', 'Bank loans', 'Business renewal', 'Company de-registration', 'Renewing certain licences']
        }
      ]
    }
  },

  {
    slug: 'guides/camis-password-recovery',
    order: 14,
    updated: '2026-09-04',
    sources: [OCR, CAMIS],
    relatedServices: ['camis-recovery-single', 'camis-recovery-multiple', 'annual-update-single'],
    relatedGuides: ['guides/company-annual-update'],
    np: {
      title: 'OCR / CAMIS पासवर्ड कसरी रिकभर गर्ने?',
      metaTitle: 'CAMIS पासवर्ड कसरी रिकभर गर्ने? | OCR नेपाल',
      metaDesc: 'CAMIS को लगइन वा पासवर्ड हराएमा पुनःप्राप्तिको प्रक्रिया, आवश्यक कागजात र सजिलो बनाउने उपाय।',
      intro: 'CAMIS को पहुँच हराउनु सामान्य समस्या हो — प्रायः दर्ता गराउने परामर्शदाता फेरिएपछि वा पुरानो इमेल बन्द भएपछि। पहुँच नभई अद्यावधिक पेस गर्न सकिँदैन।',
      sections: [
        {
          h: 'पहिले यी प्रयास गर्नुहोस्',
          list: [
            'CAMIS को "forgot password" विकल्प — दर्ता गर्दा प्रयोग गरेको इमेल चल्दै छ भने यसैले काम गर्न सक्छ',
            'पुरानो परामर्शदाता वा लेखापरीक्षकसँग सोध्नुहोस् — प्रायः खाता निजहरूकै इमेलमा खोलिएको हुन्छ',
            'दर्ता गर्दाका पुराना इमेल र सम्पर्क नम्बर खोज्नुहोस्'
          ]
        },
        {
          h: 'यी नचलेमा',
          steps: [
            { k: 'निवेदन तयार', v: 'कम्पनी रजिष्ट्रारको कार्यालयमा पेस गर्ने रिकभरी निवेदन तयार गर्नुहोस्।' },
            { k: 'माइन्युट', v: 'सञ्चालक बैठकबाट अधिकार प्राप्त व्यक्ति तोक्ने निर्णय गर्नुहोस्।' },
            { k: 'प्रमाण जुटाउनुहोस्', v: 'दर्ता प्रमाणपत्र, PAN र सञ्चालकको नागरिकता प्रतिलिपि तयार राख्नुहोस्।' },
            { k: 'कार्यालयमा पेस', v: 'अधिकार प्राप्त व्यक्ति स्वयं गएर पेस गर्नुपर्ने हुन सक्छ।' }
          ]
        },
        {
          h: 'फेरि नहराओस् भनेर',
          list: [
            'कम्पनीकै आधिकारिक इमेल प्रयोग गर्नुहोस्, व्यक्तिगत वा परामर्शदाताको होइन',
            'लगइन विवरण सञ्चालक सबैलाई थाहा हुने ठाउँमा सुरक्षित राख्नुहोस्',
            'परामर्शदाता फेर्दा खाताको इमेल र सम्पर्क आफ्नै नाममा सारिसक्नुहोस्'
          ]
        }
      ]
    },
    en: {
      title: 'How to recover an OCR / CAMIS password',
      metaTitle: 'How to Recover a CAMIS Password in Nepal | OCR',
      metaDesc: 'What to do when a CAMIS login or password is lost — recovery steps, documents required, and how to avoid losing access again.',
      intro: 'Losing CAMIS access is common, usually after changing consultants or when the email used at registration is closed. Without access you cannot file updates.',
      sections: [
        {
          h: 'Try these first',
          list: [
            'The CAMIS "forgot password" option — this works if the registration email is still live',
            'Ask your previous consultant or auditor; the account was often opened under their email',
            'Dig out the old email addresses and phone numbers used at registration'
          ]
        },
        {
          h: 'If none of that works',
          steps: [
            { k: 'Prepare the application', v: 'Draft a recovery application to the Office of the Company Registrar.' },
            { k: 'Pass a minute', v: 'Resolve at a board meeting to designate an authorised person.' },
            { k: 'Gather proof', v: 'Have the certificate of incorporation, PAN and directors’ citizenship copies ready.' },
            { k: 'File in person', v: 'The authorised person may need to attend the office themselves.' }
          ]
        },
        {
          h: 'So it does not happen again',
          list: [
            'Use a company email address, not a personal or consultant’s one',
            'Keep the login details somewhere all directors can reach',
            'When changing consultants, move the account email and phone into your own name first'
          ]
        }
      ]
    }
  }
];

module.exports = { guides };
