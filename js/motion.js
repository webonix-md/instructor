// Движение на странице: видео, знаки, «маршрут» прокрутки, появление блоков.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var trip = document.querySelector('.trip');
  var signs = [].slice.call(document.querySelectorAll('[data-sign]'));

  // ---------- Видео ----------
  // Экономия трафика или «уменьшить движение» — только кадр-заставка.
  // Иначе играет только то видео, чей блок сейчас на экране
  // (у «окон» видео position: fixed, поэтому следим за секцией, а не за самим видео).
  var videos = [].slice.call(document.querySelectorAll('video'));
  if (reduce || saveData) {
    videos.forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  } else if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target.querySelector('video');
        if (en.isIntersecting && !document.hidden) {
          if (v.preload === 'none') v.preload = 'auto';
          v.play().catch(function () {});
        } else v.pause();
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach(function (v) { vio.observe(v.closest('section')); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) videos.forEach(function (v) { v.pause(); });
    });
  }

  // ---------- Прокрутка: машинка справа и поворот знаков ----------
  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    var max = root.scrollHeight - vh;
    var y = window.scrollY;
    if (trip) trip.style.setProperty('--trip', max > 0 ? (y / max).toFixed(4) : 0);

    if (reduce) return;
    signs.forEach(function (s) {
      var r = s.getBoundingClientRect();
      var p = (r.top + r.height / 2) / vh;          // 1 — внизу экрана, 0 — вверху
      if (p < -0.2 || p > 1.2) return;
      // Поворачивается только на подъезде: от низа экрана до середины.
      // Выше середины знак остаётся ровным и так и уходит вверх.
      var k = Math.max(p, 0.3) - 0.3;              // 0.5 — внизу экрана, 0 — с середины и выше
      s.style.setProperty('--ry', (k * 120).toFixed(1) + 'deg');
      s.style.setProperty('--rx', (-k * 12).toFixed(1) + 'deg');
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  // Знаки чуть смещаются за курсором (только мышь)
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', function (e) {
      var dx = e.clientX / window.innerWidth - 0.5;
      signs.forEach(function (s) { s.style.translate = (dx * 8).toFixed(1) + 'px 0'; });
    }, { passive: true });
  }

  // ---------- Появление блоков ----------
  // Карточки цен рисует main.js — к этому моменту они уже есть
  document.querySelectorAll('.price').forEach(function (el) { el.classList.add('reveal'); });
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
