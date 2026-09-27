/* ============================================================
   SITE CONFIG  —  edit contact details and domain here only.
   ============================================================ */

const site = {
  // ---- Where the site lives. Change siteUrl before you go live. ----
  siteUrl: 'https://kagajsewa.com',   // no trailing slash
  basePath: '',                        // '' for root. Links are relative, so this is rarely needed.

  // Custom domain for GitHub Pages. The build writes this into a CNAME file.
  // Leave it '' if you are NOT using a custom domain.
  // Why it matters: GitHub Pages un-sets your custom domain if CNAME goes
  // missing from a push, so the build regenerates it every time.
  customDomain: 'kagajsewa.com',

  // ---- Contact. This is the only place these appear. ----
  contact: {
    phoneDisplay: '+977 970-5163163',      // shown to Nepali visitors
    phoneDisplayEn: '+977 970-5163163',    // shown to English visitors
    phoneDial: '+9779705163163',           // tel: link — country code + digits, no spaces
    whatsapp: '9779705163163',             // wa.me number, digits only
    viber: '+9779705163163',
    email: 'info.kagajsewa@gmail.com',
    hoursNp: 'आइतबार – शुक्रबार, बिहान १० – बेलुका ६',
    hoursEn: 'Sunday – Friday, 10:00 – 18:00 NPT',
    replyNp: 'सामान्यतया केही घण्टाभित्र',
    replyEn: 'Usually within a few hours'
  },

  brand: {
    np: 'कागज सेवा',
    en: 'KagajSewa',
    taglineNp: 'कम्पनी दर्ता, अद्यावधिक र कागजात तयारी सेवा',
    taglineEn: 'Company registration, updates and document preparation'
  },

  // Payment methods actually accepted today.
  payment: ['eSewa', 'Khalti', 'Bank transfer'],

  // Shown on guide pages so process information can be dated honestly.
  contentUpdated: '2026-09-04'
};

module.exports = { site };
