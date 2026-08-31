/* ═══════════════════════════════════════════
   ADC · AMIGOS DO CONSÓRCIO
   Nova AI Solutions
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine    = window.matchMedia('(pointer: fine)').matches;

  /* ── WHATSAPP: os dois números ficam aqui ── */
  var WPP = { enzo: '5511977996066', pedro: '5511939079880' };

  /* ─────────── LOADER ─────────── */
  var loader = $('#loader');
  function hideLoader() {
    if (!loader || loader.classList.contains('gone')) return;
    loader.classList.add('gone');
    setTimeout(function () { loader.remove(); }, 700);
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, reduced ? 100 : 1750); });
  setTimeout(hideLoader, 4200);

  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ─────────── SCROLL ─────────── */
  var nav = $('#nav'), bar = $('#scrollbar i');
  var ticking = false;
  function onScroll() {
    var sy = window.scrollY || 0;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('stuck', sy > 40);
    if (bar) bar.style.width = (h > 0 ? (sy / h) * 100 : 0) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ─────────── DRAWER ─────────── */
  var burger = $('#burger'), drawer = $('#drawer');
  function toggleDrawer(force) {
    var open = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
    drawer.classList.toggle('open', open);
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () { toggleDrawer(); });
    $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { toggleDrawer(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) toggleDrawer(false);
    });
  }

  /* ─────────── REVEAL ─────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      if (en.target.hasAttribute('data-count')) countUp(en.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -60px' });

  $$('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
    io.observe(el);
  });
  $$('.mask').forEach(function (el) { io.observe(el); });
  $$('[data-count]').forEach(function (el) { io.observe(el); });
  var barsBlock = $('.bars'); if (barsBlock) io.observe(barsBlock);

  /* ─────────── CONTADORES ─────────── */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    if (reduced) { el.textContent = target; return; }
    var t0 = null, dur = 1200;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ─────────── GLOW QUE SEGUE O CURSOR ─────────── */
  if (fine && !reduced) {
    document.body.classList.add('fine');
    var glow = $('#glow'), gx = 0, gy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      if (glow) glow.style.transform = 'translate3d(' + (gx - 350) + 'px,' + (gy - 350) + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* ─────────── BOTÃO MAGNÉTICO ─────────── */
  if (fine && !reduced) {
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.2 + 'px,' +
                                            (e.clientY - r.top - r.height / 2) * 0.28 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ─────────── RIPPLE ─────────── */
  $$('[data-ripple]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var r = el.getBoundingClientRect();
      var s = document.createElement('span');
      s.className = 'rip';
      s.style.width = s.style.height = (Math.max(r.width, r.height) * 2) + 'px';
      s.style.left = (e.clientX - r.left) + 'px';
      s.style.top  = (e.clientY - r.top) + 'px';
      el.appendChild(s);
      setTimeout(function () { s.remove(); }, 700);
    });
  });

  /* ═════════ ANEL SELETOR DE MODALIDADES ═════════ */
  var MODS = [
    { idx: '01', name: 'Automóvel', sub: '& Moto' },
    { idx: '02', name: 'Imóvel',    sub: 'residencial e comercial' },
    { idx: '03', name: 'Serviços',  sub: 'o projeto que ficou pra depois' },
    { idx: '04', name: 'Pesados',   sub: '& Frota' }
  ];
  var LEN = 1000, SEG = 250;                 // pathLength do círculo e tamanho do arco

  var arc   = $('.dial-arc');
  var core  = $('.dial-core');
  var cIdx  = $('.dial-idx');
  var cName = $('.dial-name');
  var cSub  = $('.dial-sub');
  var items = $$('.dl');
  var turns = 0, last = 0;

  function openMod(i) {
    if (i < 0 || i >= items.length) return;

    items.forEach(function (li, n) {
      var on = n === i;
      li.classList.toggle('is-on', on);
      $('.dl-btn', li).setAttribute('aria-expanded', String(on));
    });

    if (arc) {
      // o arco sempre gira pelo caminho mais curto, acumulando voltas
      var diff = i - last;
      if (diff >  2) turns -= 1;
      if (diff < -2) turns += 1;
      last = i;
      arc.style.strokeDashoffset = -((i / items.length) * LEN + turns * LEN);
    }
    if (core) {
      var m = MODS[i];
      cIdx.textContent = m.idx; cName.textContent = m.name; cSub.textContent = m.sub;
      core.classList.remove('swap');
      void core.offsetWidth;                 // reinicia a animação
      core.classList.add('swap');
    }
  }

  items.forEach(function (li, i) {
    $('.dl-btn', li).addEventListener('click', function () { openMod(i); });
    li.addEventListener('mouseenter', function () { if (fine) openMod(i); });
  });
  if (arc) arc.style.strokeDasharray = SEG + ' ' + (LEN - SEG);
  openMod(0);
})();
