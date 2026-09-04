/* KagajSewa — mobile menu + service search. No framework, ~3 KB.
   Everything on the page works without this file; it only adds convenience. */
(function () {
  'use strict';

  /* ---------- mobile menu ---------- */
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('navMob');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.hidden;
      nav.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !nav.hidden) { btn.click(); btn.focus(); }
    });
  }

  /* ---------- service search ---------- */
  var input = document.getElementById('svcSearch');
  var out = document.getElementById('svcResults');
  if (!input || !out || !window.KS_INDEX) return;

  var index = window.KS_INDEX;
  var empty = out.getAttribute('data-empty') || 'No results';

  function norm(s) {
    return String(s || '').toLowerCase().replace(/[‍‌]/g, '').trim();
  }

  function score(item, q) {
    var hay = item.h;
    if (hay.indexOf(q) === -1) return 0;
    // name match beats keyword match
    return norm(item.n).indexOf(q) === 0 ? 100
         : norm(item.n).indexOf(q) > -1 ? 60
         : 20;
  }

  function render(list, q) {
    if (!q) { out.hidden = true; out.innerHTML = ''; return; }
    out.hidden = false;
    if (!list.length) {
      out.innerHTML = '<p class="search-empty"></p>';
      out.firstChild.textContent = empty;
      return;
    }
    var html = '';
    for (var i = 0; i < list.length && i < 8; i++) {
      var it = list[i];
      html += '<a href="' + it.u + '">'
            + '<span class="r-name"></span>'
            + '<span class="r-alt"></span>'
            + '<span class="r-cat"></span>'
            + '</a>';
    }
    out.innerHTML = html;
    // set text via textContent so nothing from the index can inject markup
    var anchors = out.querySelectorAll('a');
    for (var j = 0; j < anchors.length; j++) {
      anchors[j].children[0].textContent = list[j].n;
      anchors[j].children[1].textContent = list[j].a || '';
      anchors[j].children[2].textContent = list[j].c || '';
    }
  }

  var t;
  input.addEventListener('input', function () {
    clearTimeout(t);
    t = setTimeout(function () {
      var q = norm(input.value);
      if (q.length < 2) { render([], ''); return; }
      var hits = [];
      for (var i = 0; i < index.length; i++) {
        var s = score(index[i], q);
        if (s) hits.push({ s: s, i: index[i] });
      }
      hits.sort(function (a, b) { return b.s - a.s; });
      render(hits.map(function (h) { return h.i; }), q);
    }, 90);
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { input.value = ''; render([], ''); }
    if (e.key === 'ArrowDown') {
      var first = out.querySelector('a');
      if (first) { e.preventDefault(); first.focus(); }
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search')) { out.hidden = true; }
  });
})();
