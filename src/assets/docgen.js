/* ============================================================================
   KagajSewa — document generator engine.

   Runs entirely in the visitor's browser. Nothing is uploaded; the form and
   the finished document never leave the device. No dependencies.

   The page supplies, via window.KS_DOC:
     { id, lang, fields:[...], render: "<serialised function source>" }

   PDF: produced by the browser's own print-to-PDF. That is deliberate —
   it is the only way to get correct Devanagari shaping (conjuncts, the
   shirorekha, reordered vowel signs) without shipping a heavy font-shaping
   library. jsPDF and friends silently mangle Devanagari.
   ========================================================================== */
(function () {
  'use strict';

  var D = window.KS_DOC;
  if (!D) return;
  var NP = D.lang === 'np';

  /* ---------------------------------------------------------------- helpers */

  var DEV = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  /** 123 -> '१२३'. Leaves non-digits (spaces, dashes) untouched. */
  function npDigits(s) {
    return String(s == null ? '' : s).replace(/[0-9]/g, function (d) { return DEV[+d]; });
  }

  /** '2083/05/20' -> '२०८३/०५/२०' */
  function npDate(s) {
    if (!s) return '';
    return npDigits(s);
  }

  /** '10:00' -> '१०:०० बजे' */
  function npTime(s) {
    if (!s) return '';
    return npDigits(s) + ' बजे';
  }

  /** 5000000 -> '५०,००,०००'  (Nepali lakh/crore grouping, not thousands) */
  function npMoney(n) {
    var x = String(n == null ? '' : n).replace(/[^0-9]/g, '');
    if (!x) return '';
    var last3 = x.slice(-3), rest = x.slice(0, -3);
    if (rest) rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return npDigits(rest ? rest + ',' + last3 : last3);
  }

  var H = {
    np: npDigits, date: npDate, time: npTime, money: npMoney, lang: D.lang
  };

  var esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  var $ = function (id) { return document.getElementById(id); };
  var t = function (a, b) { return NP ? a : b; };

  /* ------------------------------------------------------------- form state */

  var STORE = 'ks-doc-' + D.id;
  var state = {};

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE);
      if (raw) state = JSON.parse(raw) || {};
    } catch (e) { state = {}; }
  }
  function saveState() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
  }

  function collect() {
    D.fields.forEach(function (f) {
      /* A bsdate has no element at the base id — only _y / _m / _d — so it
         has to be handled before the null check below. */
      if (f.t === 'bsdate') {
        var y = $('f_' + f.k + '_y'), m = $('f_' + f.k + '_m'), d = $('f_' + f.k + '_d');
        state[f.k] = (y && y.value && m && m.value && d && d.value)
          ? y.value + '/' + m.value + '/' + d.value : '';
        return;
      }
      var el = $('f_' + f.k);
      if (!el) return;
      state[f.k] = el.value;
    });
    saveState();
  }

  function restore() {
    D.fields.forEach(function (f) {
      var v = state[f.k];
      if (v == null || v === '') return;
      if (f.t === 'bsdate') {
        var p = String(v).split('/');
        if (p.length === 3) {
          var y = $('f_' + f.k + '_y'), m = $('f_' + f.k + '_m'), d = $('f_' + f.k + '_d');
          if (y) y.value = p[0]; if (m) m.value = p[1];
          if (d) { rebuildDays(f.k); d.value = p[2]; }
        }
      } else {
        var el = $('f_' + f.k);
        if (el) el.value = v;
      }
    });
  }

  /* ------------------------------------------------------- BS date controls
     No AD<->BS conversion and no month-length table: the visitor knows their
     own Bikram Sambat date, and a wrong computed date on a legal filing is
     far worse than one extra dropdown. Day list is 1-32, which is the widest
     any BS month gets.                                                      */

  var BS_MONTHS = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
                   'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'];

  function rebuildDays(key) {
    var d = $('f_' + key + '_d');
    if (!d || d.options.length > 1) return;
    for (var i = 1; i <= 32; i++) {
      var o = document.createElement('option');
      o.value = (i < 10 ? '0' : '') + i;
      o.textContent = NP ? npDigits(i) : String(i);
      d.appendChild(o);
    }
  }

  /* ------------------------------------------------------- address selector */

  var ADMIN = null, adminLoading = false;

  function loadAdmin(cb) {
    if (ADMIN) return cb(ADMIN);
    if (adminLoading) return;
    adminLoading = true;
    fetch(D.adminUrl)
      .then(function (r) { return r.json(); })
      .then(function (j) { ADMIN = j; adminLoading = false; cb(j); })
      .catch(function () {
        adminLoading = false;
        var w = $('addrWarn');
        if (w) {
          w.hidden = false;
          w.textContent = t(
            'ठेगाना सूची लोड हुन सकेन। माथिको ठेगाना बाकसमा सिधै लेख्नुहोस्।',
            'Could not load the address list. Type the address directly in the box above.'
          );
        }
      });
  }

  function fill(sel, rows, placeholder) {
    sel.innerHTML = '';
    var o0 = document.createElement('option');
    o0.value = ''; o0.textContent = placeholder;
    sel.appendChild(o0);
    rows.forEach(function (r) {
      var o = document.createElement('option');
      o.value = r.i; o.textContent = NP ? r.ne : r.en;
      sel.appendChild(o);
    });
    sel.disabled = false;
  }

  function setupAddress(key) {
    var box = $('f_' + key);
    var pv = $('addr_p'), ds = $('addr_d'), ll = $('addr_l'), wd = $('addr_w');
    if (!box || !pv) return;

    /* The dropdown LABELS follow the interface language, but the composed
       address does not: it is dropped straight into a Nepali legal document,
       so it is always built from the Nepali names. */
    var A = null;
    function nameOf(list, id) {
      var r = list.find(function (x) { return String(x.i) === String(id); });
      return r ? r.ne : '';
    }
    function compose() {
      if (!A) return;
      var parts = [];
      if (pv.value) parts.push(nameOf(A.provinces, pv.value));
      if (ds.value) parts.push(nameOf(A.districts, ds.value) + ' जिल्ला');
      if (ll.value) parts.push(nameOf(A.locals, ll.value));
      if (wd.value) parts.push('वडा नं. ' + npDigits(wd.value));
      parts = parts.filter(Boolean);
      if (parts.length) { box.value = parts.join(', '); collect(); }
    }

    loadAdmin(function (a) {
      A = a;
      fill(pv, a.provinces, t('प्रदेश', 'Province'));
      pv.addEventListener('change', function () {
        var rows = a.districts.filter(function (x) { return String(x.p) === pv.value; });
        fill(ds, rows, t('जिल्ला', 'District'));
        ll.innerHTML = ''; ll.disabled = true; wd.innerHTML = ''; wd.disabled = true;
        compose();
      });
      ds.addEventListener('change', function () {
        var rows = a.locals.filter(function (x) { return String(x.d) === ds.value; });
        fill(ll, rows, t('स्थानीय तह', 'Local body'));
        wd.innerHTML = ''; wd.disabled = true;
        compose();
      });
      ll.addEventListener('change', function () {
        var loc = a.locals.find(function (x) { return String(x.i) === ll.value; });
        var rows = [];
        if (loc) for (var i = 1; i <= loc.w; i++) rows.push({ i: i, ne: npDigits(i), en: String(i) });
        fill(wd, rows, t('वडा', 'Ward'));
        compose();
      });
      wd.addEventListener('change', compose);
    });
  }

  /* ----------------------------------------------------------- validation */

  function validate() {
    var bad = [];
    D.fields.forEach(function (f) {
      if (!f.req) return;
      var v = (state[f.k] || '').trim();
      if (!v) bad.push(f);
    });
    D.fields.forEach(function (f) {
      var el = $('f_' + f.k) || $('f_' + f.k + '_y');
      var row = el && el.closest('.fld');
      if (row) row.classList.toggle('is-bad', bad.indexOf(f) > -1);
    });
    var box = $('formErr');
    if (bad.length) {
      box.hidden = false;
      box.textContent = t(
        'तलका आवश्यक ठाउँ भर्न बाँकी छ: ',
        'Please fill in these required fields: '
      ) + bad.map(function (f) { return f.label; }).join(', ');
      var first = $('f_' + bad[0].k) || $('f_' + bad[0].k + '_y');
      if (first) first.focus();
      return false;
    }
    box.hidden = true;
    return true;
  }

  /* ------------------------------------------------------ document drawing

     A document is a list of PAGES; a page is a list of BLOCKS. One block
     renderer serves every document type, so a new template needs no changes
     here — it just returns different blocks.

     A template may instead return the flat single-page shape (cornerRight,
     title, meta, table, sections, …); `toBlocks` converts that, which is why
     the older templates keep working untouched.                             */

  /* Document text. Nepali sentences end " ।" — a danda must never be pushed
     onto a line of its own, so the space before it is made non-breaking. */
  function dt(s) {
    return esc(s).replace(/ ।/g, ' ।');
  }

  function drawTable(tb) {
    var h = '';
    if (tb.caption) h += '<p class="doc-cap">' + dt(tb.caption) + '</p>';
    h += '<table class="doc-table">';
    if (tb.cols) {
      h += '<thead><tr>';
      tb.cols.forEach(function (c) { h += '<th>' + dt(c) + '</th>'; });
      h += '</tr></thead>';
    }
    h += '<tbody>';
    (tb.rows || []).forEach(function (r) {
      h += '<tr>';
      r.forEach(function (c, i) {
        /* An empty last cell becomes a dotted signature rule. */
        h += '<td>' + (c ? dt(c) : (i === r.length - 1 ? '<span class="dots"></span>' : '')) + '</td>';
      });
      h += '</tr>';
    });
    return h + '</tbody></table>';
  }

  function drawBlock(b) {
    if (!b) return '';
    if (typeof b === 'string') return '<p class="doc-item">' + dt(b) + '</p>';

    switch (b.type) {
      case 'corner':  return '<p class="doc-corner">' + dt(b.text) + '</p>';
      case 'title':   return '<h2 class="doc-title">' + dt(b.text) + '</h2>';
      case 'sub':     return '<p class="doc-sub">' + dt(b.text) + '</p>';
      case 'conn':    return '<p class="doc-conn">' + dt(b.text) + '</p>';
      case 'heading': return '<p class="doc-heading">' + dt(b.text) + '</p>';
      case 'right':   return '<p class="doc-right">' + dt(b.text) + '</p>';
      case 'subject': return '<p class="doc-subject"><span>' + dt(b.text) + '</span></p>';
      case 'salut':   return '<p class="doc-salut">' + dt(b.text) + '</p>';
      case 'secH':    return '<p class="doc-sec-h"><span>' + dt(b.text) + '</span></p>';
      case 'gap':     return '<div class="doc-gap"></div>';
      case 'rule':    return '<hr class="doc-rule">';

      case 'para':
        return '<p class="doc-intro' + (b.indent ? ' indent' : '') + '">' + dt(b.text) + '</p>';

      /* A stack of plain left-aligned lines, e.g. the addressee. */
      case 'lines':
        return '<div class="doc-lines">' +
          (b.items || []).map(function (l) { return '<p>' + dt(l) + '</p>'; }).join('') +
          '</div>';

      case 'meta':
        return '<div class="doc-meta">' +
          (b.items || []).map(function (m) {
            return '<span><b>' + dt(m.l) + '</b> ' + dt(m.v) + '</span>';
          }).join('') + '</div>';

      case 'table':
        return drawTable(b);

      /* Numbered or labelled paragraphs — agenda items, decisions. */
      case 'items':
        return (b.items || []).map(function (it) {
          if (typeof it === 'string') return '<p class="doc-item">' + dt(it) + '</p>';
          return '<p class="doc-item"><b>' + dt(it.label) + '</b> ' + dt(it.text) + '</p>';
        }).join('');

      /* Right-aligned signature block. A null entry draws a dotted rule. */
      case 'sign':
        return '<div class="doc-sign">' +
          (b.heading ? '<p class="h"><span>' + dt(b.heading) + '</span></p>' : '') +
          (b.items || []).map(function (l) {
            if (l == null) return '<p><span class="dots"></span></p>';
            if (typeof l === 'string') return '<p>' + dt(l) + '</p>';
            return '<p' + (l.bold ? ' class="b"' : '') + '>' + dt(l.l || '') +
                   (l.v ? ' ' + dt(l.v) : '') +
                   (l.rule ? ' <span class="dots"></span>' : '') + '</p>';
          }).join('') + '</div>';
    }
    return '';
  }

  /** Flat single-page shape -> block list. Keeps older templates working. */
  function toBlocks(doc) {
    var b = [];
    if (doc.cornerRight) b.push({ type: 'corner', text: doc.cornerRight });
    if (doc.title)     b.push({ type: 'title', text: doc.title });
    if (doc.subtitle)  b.push({ type: 'sub', text: doc.subtitle });
    if (doc.connector) b.push({ type: 'conn', text: doc.connector });
    if (doc.heading)   b.push({ type: 'heading', text: doc.heading });
    if (doc.intro)     b.push({ type: 'para', text: doc.intro });
    if (doc.meta && doc.meta.length) b.push({ type: 'meta', items: doc.meta });
    if (doc.table) b.push({ type: 'table', caption: doc.table.caption,
                            cols: doc.table.cols, rows: doc.table.rows });
    (doc.sections || []).forEach(function (s) {
      b.push({ type: 'secH', text: s.h });
      b.push({ type: 'items', items: s.items });
    });
    if (doc.closing) b.push({ type: 'items', items: [doc.closing] });
    return b;
  }

  function drawDoc(doc) {
    var pages = doc && doc.pages ? doc.pages : [toBlocks(doc || {})];
    return pages.map(function (blocks) {
      return '<section class="doc-page">' +
        (blocks || []).map(drawBlock).join('') +
        '</section>';
    }).join('');
  }

  /* ------------------------------------------------------------------ wire */

  function ref() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return 'KS' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' +
           Math.random().toString(36).slice(2, 7).toUpperCase();
  }

  function init() {
    var renderFn;
    try { renderFn = eval('(' + D.render + ')'); }
    catch (e) { return; }

    loadState();
    D.fields.forEach(function (f) {
      if (f.t === 'bsdate') rebuildDays(f.k);
      if (f.t === 'address') setupAddress(f.k);
    });
    restore();

    var form = $('docForm');
    form.addEventListener('input', function () { collect(); markSaved(); });
    form.addEventListener('change', function () { collect(); markSaved(); });

    var savedT;
    function markSaved() {
      var s = $('savedNote');
      if (!s) return;
      s.textContent = t('स्थानीय रूपमा सुरक्षित', 'Saved locally');
      clearTimeout(savedT);
      savedT = setTimeout(function () { s.textContent = ''; }, 1800);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      collect();
      if (!validate()) return;
      var doc;
      try { doc = renderFn(state, H); }
      catch (err) {
        $('formErr').hidden = false;
        $('formErr').textContent = t('कागजात बनाउँदा समस्या आयो।', 'Something went wrong generating the document.');
        return;
      }
      $('docBody').innerHTML = drawDoc(doc);
      $('docRef').textContent = ref();
      $('stage').setAttribute('data-view', 'doc');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    $('btnBack').addEventListener('click', function () {
      $('stage').setAttribute('data-view', 'form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    $('btnPrint').addEventListener('click', function () { window.print(); });

    $('btnClear').addEventListener('click', function () {
      if (!confirm(t('सबै भरेको विवरण मेटाउने?', 'Clear everything you have entered?'))) return;
      state = {};
      try { localStorage.removeItem(STORE); } catch (e) {}
      form.reset();
      D.fields.forEach(function (f) {
        if (f.t === 'address') {
          ['addr_p', 'addr_d', 'addr_l', 'addr_w'].forEach(function (i) {
            var s = $(i); if (s) { s.selectedIndex = 0; }
          });
        }
      });
      $('formErr').hidden = true;
      document.querySelectorAll('.fld.is-bad').forEach(function (n) { n.classList.remove('is-bad'); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
