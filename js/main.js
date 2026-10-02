(function () {
  var S = window.SITE;
  // Язык берём из <html lang>: index.html — ru, ro.html — ro. Для ro подставляются поля x_ro.
  var LANG = document.documentElement.lang === 'ro' ? 'ro' : 'ru';
  var TXT = {
    ru: { tag: 'Если не хватило часов', book: 'Записаться' },
    ro: { tag: 'Dacă n-au ajuns orele', book: 'Programați-vă' }
  }[LANG];
  function t(obj, key) { return (LANG === 'ro' && obj[key + '_ro'] != null) ? obj[key + '_ro'] : obj[key]; }

  document.querySelectorAll('[data-text]').forEach(function (el) {
    var v = S[el.dataset.text];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll('[data-tel]').forEach(function (a) { a.href = 'tel:' + S.phoneHref; });
  document.querySelectorAll('[data-viber]').forEach(function (a) { a.href = S.viber; });
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    a.href = S.whatsapp; a.target = '_blank'; a.rel = 'noopener';
  });

  var prices = document.getElementById('prices');
  if (prices) {
    prices.innerHTML = S.packages.map(function (p) {
      return '<article class="price' + (p.featured ? ' price--hl' : '') + '">' +
        (p.featured ? '<span class="price__tag">' + TXT.tag + '</span>' : '') +
        '<h3>' + t(p, 'name') + '</h3>' +
        '<p class="price__sum"><b>' + t(p, 'price') + '</b>' + (p.unit ? ' <span class="price__unit">' + t(p, 'unit') + '</span>' : '') + '</p>' +
        '<p class="price__note">' + t(p, 'note') + '</p>' +
        '<a class="btn ' + (p.featured ? 'btn--blue' : 'btn--ghost') + '" href="tel:' + S.phoneHref + '">' + TXT.book + '</a>' +
        '</article>';
    }).join('');
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') document.body.classList.remove('nav-open');
    });
  }

  var top = document.querySelector('.top');
  var onScroll = function () { top.classList.toggle('top--scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
