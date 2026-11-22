(function () {
  'use strict';

  // Refuse to run inside someone else's frame (clickjacking). GitHub Pages can't send frame-ancestors headers.
  if (window.top !== window.self) {
    try { window.top.location.href = window.location.href; } catch (e) { /* cross-origin top */ }
    document.documentElement.classList.add('framed');
    return;
  }

  var REPO = 'OneillAlim/reelo';
  var DL_PREFIX = 'https://github.com/' + REPO + '/releases/download/';
  // Shown when GitHub can't be reached (offline, or the 60 requests/hour API limit).
  var FALLBACK = {
    tag: 'v1.0',
    url: DL_PREFIX + 'v1.0/Reelo-v1.0.apk',
    size: 2540222,
    sha: '4a33f15181dda7ea3d5c7b3cd5a39999c8b12bd8187b1a088826d884cf9cea73',
    date: '2026-11-16T03:21:43Z',
    notes: null,
    live: false
  };

  var T = {
    en: {
      skip: 'Skip to content', navMascots: 'Mascots', navFeatures: 'Features', navInstall: 'Install',
      kicker: 'Android app · free · no internet permission',
      title: 'Never lose a TikTok streak again.',
      lead: 'Reelo sends your streak messages for you every night at 00.00, and counts the reels you watch on TikTok, YouTube Shorts and Instagram, with a pixel mascot that gets tired the more you scroll.',
      download: 'Download APK', source: 'View source', req: 'Needs Android 9 or newer.', heroSafe: 'streaks safe',
      castTitle: 'Meet the cast',
      castSub: 'Four pixel mascots, drawn from the same code as the app. Tap one to change its mood.',
      kindReelo: 'Film reel · main mascot', kindPopi: 'Popcorn bucket · Instagram', kindTiko: 'Cinema ticket · TikTok', kindTelo: 'Tube TV · YouTube Shorts',
      quoteReelo: '“Roll it!”', quotePopi: '“Crunch!”', quoteTiko: '“Click, ticket checked!”', quoteTelo: '“We’re back on air!”',
      featTitle: 'What it does',
      f1t: 'Streak keeper',
      f1d: 'At 00.00 Reelo opens TikTok and sends one of your own messages to every friend you have a streak with. Phone locked? It waits until you unlock. Something failed? It tries again after 10 and 20 minutes, and reminds you at 20.00 and 23.00.',
      f2t: 'Reel counter',
      f2d: 'Counts new reels, not swipes. Each reel gets a fingerprint, so scrolling back up never counts twice. Optional daily limits, a Pause Card, night curfew and a 25-minute focus mode.',
      f3t: 'Home screen widgets',
      f3d: '2×2, 4×2 and a 4×1 cinema marquee. See which streaks are still at risk, and tap the widget to send them right away.',
      f4t: 'Private by design',
      f4d: 'The app has no internet permission, so your data never leaves your phone. Text on screen is turned into a hash and thrown away.',
      instTitle: 'Install in 4 steps',
      s1: 'Tap Download APK above.',
      s2: 'Open the file. When Android asks, allow your browser to install unknown apps.',
      s3: 'Open Reelo, then turn it on in Settings › Accessibility › Reelo.',
      s4: 'Xiaomi, POCO or Redmi: set Reelo’s battery to No restrictions, turn on Autostart, and allow “Open new windows while running in the background”.',
      protect: 'Play Protect may show a warning because Reelo isn’t on the Play Store and uses Accessibility. That’s expected for apps installed this way.',
      verTitle: 'Check your download',
      verText: 'Only get Reelo from this page or the official GitHub release. The file’s SHA-256 checksum should be:',
      copy: 'Copy checksum', copied: 'Copied', copyFail: 'Select and copy it',
      notesTitle: 'Release notes', allReleases: 'All releases on GitHub',
      warnHead: 'Heads up.',
      warnText: 'The streak keeper automates TikTok, which goes against TikTok’s rules on automation. Use it at your own risk.',
      madeBy: 'Made by', notAffiliated: 'Not affiliated with TikTok, YouTube or Instagram.',
      checking: 'Checking GitHub for the latest version…',
      live: function (tag) { return 'Latest version: ' + tag + ' (checked on GitHub just now).'; },
      offline: function (tag) { return 'Couldn’t reach GitHub, showing ' + tag + '.'; },
      published: 'Published ',
      moods: { segar: 'Fresh', santai: 'Chill', capek: 'Tired', teler: 'Woozy', pingsan: 'Knocked out' }
    },
    id: {
      skip: 'Langsung ke isi', navMascots: 'Maskot', navFeatures: 'Fitur', navInstall: 'Cara pasang',
      kicker: 'App Android · gratis · tanpa izin internet',
      title: 'Streak TikTok nggak bakal padam lagi.',
      lead: 'Reelo ngirim pesan streak buat kamu tiap jam 00.00, dan ngitung reels yang kamu tonton di TikTok, YouTube Shorts, dan Instagram, ditemenin maskot pixel yang makin capek makin lama kamu scroll.',
      download: 'Unduh APK', source: 'Lihat kode', req: 'Butuh Android 9 ke atas.', heroSafe: 'api aman',
      castTitle: 'Kenalan sama pemerannya',
      castSub: 'Empat maskot pixel, digambar dari kode yang sama dengan app-nya. Ketuk buat ganti mood.',
      kindReelo: 'Gulungan film · maskot utama', kindPopi: 'Ember popcorn · Instagram', kindTiko: 'Tiket bioskop · TikTok', kindTelo: 'TV tabung · YouTube Shorts',
      quoteReelo: '“Rol jalan!”', quotePopi: '“Kriuk!”', quoteTiko: '“Cekrek, tiket dicek!”', quoteTelo: '“Kami kembali ke siaran!”',
      featTitle: 'Bisa apa aja',
      f1t: 'Jaga Api',
      f1d: 'Jam 00.00 Reelo buka TikTok dan ngirim salah satu pesan buatanmu ke semua teman yang lagi ngestreak. HP terkunci? Ditunggu sampai kamu buka. Ada yang gagal? Dicoba lagi 10 dan 20 menit kemudian, plus diingetin jam 20.00 dan 23.00.',
      f2t: 'Penghitung reels',
      f2d: 'Yang dihitung reel baru, bukan jumlah swipe. Tiap reel punya sidik jari, jadi scroll balik ke atas nggak kehitung dua kali. Ada jatah harian, Pause Card, Jam Malam, dan mode Fokus 25 menit (opsional).',
      f3t: 'Widget layar utama',
      f3d: 'Ukuran 2×2, 4×2, dan papan bioskop 4×1. Kelihatan api mana yang belum aman, dan ketuk widget-nya buat langsung nyalain.',
      f4t: 'Privasi dari awal',
      f4d: 'App ini nggak punya izin internet, jadi datamu nggak pernah keluar dari HP. Teks di layar diubah jadi hash lalu dibuang.',
      instTitle: 'Pasang dalam 4 langkah',
      s1: 'Ketuk Unduh APK di atas.',
      s2: 'Buka file-nya. Kalau Android nanya, izinkan browser kamu menginstal app tidak dikenal.',
      s3: 'Buka Reelo, lalu nyalakan di Setelan › Aksesibilitas › Reelo.',
      s4: 'Xiaomi, POCO, atau Redmi: atur baterai Reelo ke Tanpa batasan, nyalakan Mulai otomatis, dan izinkan “Tampilkan jendela pop-up saat berjalan di latar belakang”.',
      protect: 'Play Protect mungkin ngasih peringatan karena Reelo nggak ada di Play Store dan pakai Aksesibilitas. Itu wajar buat app yang dipasang dengan cara ini.',
      verTitle: 'Cek file yang kamu unduh',
      verText: 'Unduh Reelo cuma dari halaman ini atau rilis resmi di GitHub. Checksum SHA-256 file-nya harus:',
      copy: 'Salin checksum', copied: 'Tersalin', copyFail: 'Pilih lalu salin manual',
      notesTitle: 'Catatan rilis', allReleases: 'Semua rilis di GitHub',
      warnHead: 'Perhatian.',
      warnText: 'Jaga Api ngotomatisin TikTok, dan itu melanggar aturan otomasi TikTok. Pakai dengan risiko sendiri.',
      madeBy: 'Dibuat oleh', notAffiliated: 'Nggak berafiliasi dengan TikTok, YouTube, atau Instagram.',
      checking: 'Ngecek versi terbaru di GitHub…',
      live: function (tag) { return 'Versi terbaru: ' + tag + ' (barusan dicek di GitHub).'; },
      offline: function (tag) { return 'GitHub nggak bisa dihubungi, nampilin ' + tag + '.'; },
      published: 'Rilis ',
      moods: { segar: 'Segar', santai: 'Santai', capek: 'Capek', teler: 'Teler', pingsan: 'Pingsan' }
    }
  };

  var lang = pickLang();
  var release = null; // null = still checking

  function pickLang() {
    var saved = null;
    try { saved = window.localStorage.getItem('reelo-lang'); } catch (e) { /* storage blocked */ }
    if (saved === 'en' || saved === 'id') return saved;
    var nav = (navigator.language || '').toLowerCase();
    return nav.indexOf('id') === 0 || nav.indexOf('in') === 0 ? 'id' : 'en';
  }

  function t(key) { return T[lang][key]; }

  function applyLang() {
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var v = t(nodes[i].getAttribute('data-i18n'));
      if (typeof v === 'string') nodes[i].textContent = v;
    }
    var btns = document.querySelectorAll('.lang-btn');
    for (var j = 0; j < btns.length; j++) btns[j].setAttribute('aria-pressed', String(btns[j].getAttribute('data-lang') === lang));
    renderRelease();
    renderMoods();
  }

  // ---------- version check ----------

  function fmtSize(bytes) {
    var mb = bytes / 1048576;
    var s = (Math.round(mb * 10) / 10).toFixed(1);
    return (lang === 'id' ? s.replace('.', ',') : s) + ' MB';
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    try { return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(d); }
    catch (e) { return iso.slice(0, 10); }
  }

  /** Everything from the API is checked before use: nothing is trusted, nothing is inserted as HTML. */
  function parseRelease(j) {
    if (!j || typeof j !== 'object' || j.draft || j.prerelease) return null;
    var tag = typeof j.tag_name === 'string' ? j.tag_name : '';
    if (!/^v?\d{1,4}(\.\d{1,4}){0,3}$/.test(tag)) return null;
    var assets = Array.isArray(j.assets) ? j.assets : [];
    var apk = null;
    for (var i = 0; i < assets.length; i++) {
      var a = assets[i];
      if (a && typeof a.name === 'string' && /^[\w.-]{1,100}\.apk$/i.test(a.name) && safeUrl(a.browser_download_url)) { apk = a; break; }
    }
    if (!apk) return null;
    var sha = typeof apk.digest === 'string' && /^sha256:[0-9a-f]{64}$/.test(apk.digest) ? apk.digest.slice(7) : null;
    var notes = typeof j.body === 'string' ? j.body.slice(0, 1500) : null;
    return {
      tag: tag,
      url: apk.browser_download_url,
      size: typeof apk.size === 'number' && apk.size > 0 ? apk.size : null,
      sha: sha,
      date: typeof j.published_at === 'string' ? j.published_at : null,
      notes: notes,
      live: true
    };
  }

  /** Only ever link to a file in this repo's GitHub releases, over https. */
  function safeUrl(u) {
    if (typeof u !== 'string' || u.indexOf(DL_PREFIX) !== 0) return false;
    try {
      var p = new URL(u);
      return p.protocol === 'https:' && p.hostname === 'github.com' && p.pathname.indexOf('/' + REPO + '/releases/download/') === 0 && /\.apk$/i.test(p.pathname);
    } catch (e) { return false; }
  }

  function cached() {
    try {
      var c = JSON.parse(window.sessionStorage.getItem('reelo-release') || 'null');
      if (c && Date.now() - c.at < 10 * 60 * 1000) return parseRelease(c.data);
    } catch (e) { /* ignore */ }
    return null;
  }

  function checkVersion() {
    var c = cached();
    if (c) { release = c; renderRelease(); return; }
    if (!window.fetch) { release = FALLBACK; renderRelease(); return; }
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    fetch('https://api.github.com/repos/' + REPO + '/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      credentials: 'omit', referrerPolicy: 'no-referrer', redirect: 'error',
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (j) {
      var rel = parseRelease(j);
      if (!rel) throw new Error('unexpected release data');
      try { window.sessionStorage.setItem('reelo-release', JSON.stringify({ at: Date.now(), data: j })); } catch (e) { /* ignore */ }
      release = rel;
    }).catch(function () {
      release = FALLBACK;
    }).then(function () {
      clearTimeout(timer);
      renderRelease();
    });
  }

  function renderRelease() {
    var status = document.getElementById('ver-status');
    if (!release) { status.textContent = t('checking'); return; }
    var r = release;
    var btn = document.getElementById('dl-btn');
    if (safeUrl(r.url)) btn.href = r.url;
    var size = r.size || FALLBACK.size;
    document.getElementById('dl-chip').textContent = r.tag + ' · ' + fmtSize(size);
    status.textContent = r.live ? t('live')(r.tag) : t('offline')(r.tag);
    status.classList.toggle('is-live', !!r.live);
    document.getElementById('notes-tag').textContent = r.tag;
    var date = r.date ? fmtDate(r.date) : '';
    document.getElementById('notes-date').textContent = date ? t('published') + date : '';
    if (r.notes) document.getElementById('notes-body').textContent = r.notes;
    // Fallback checksum belongs to v1.0 only; never show it next to a different version.
    var sha = r.sha || (r.tag === FALLBACK.tag ? FALLBACK.sha : null);
    var shaBox = document.getElementById('sha');
    var shaBtn = document.getElementById('copy-sha');
    if (sha) { shaBox.textContent = sha; shaBox.hidden = false; shaBtn.hidden = false; }
    else { shaBox.hidden = true; shaBtn.hidden = true; }
  }

  // ---------- mascots ----------

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var moodOf = {};

  function drawAll(blink) {
    var cvs = document.querySelectorAll('canvas[data-mascot]');
    for (var i = 0; i < cvs.length; i++) {
      var c = cvs[i];
      var name = c.getAttribute('data-mascot');
      var scale = Math.max(1, Math.round(c.width / 26));
      var b = blink && (c.hasAttribute('data-blink') || c.closest('.ticket'));
      window.ReeloSprite.paint(c, name, moodOf[name] || 'segar', b, scale);
    }
  }

  function renderMoods() {
    var cards = document.querySelectorAll('[data-mascot-card]');
    for (var i = 0; i < cards.length; i++) {
      var name = cards[i].getAttribute('data-mascot-card');
      var m = moodOf[name] || 'segar';
      var label = t('moods')[m];
      cards[i].querySelector('.t-mood').textContent = label;
      cards[i].setAttribute('aria-label', cards[i].querySelector('.t-name').textContent + ', ' + label);
    }
  }

  function initMascots() {
    if (!window.ReeloSprite) return;
    drawAll(false);
    var cards = document.querySelectorAll('[data-mascot-card]');
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function () {
        var name = this.getAttribute('data-mascot-card');
        var moods = window.ReeloSprite.MOODS;
        moodOf[name] = moods[(moods.indexOf(moodOf[name] || 'segar') + 1) % moods.length];
        drawAll(false);
        renderMoods();
        if (!reduce) { this.classList.remove('poke'); void this.offsetWidth; this.classList.add('poke'); }
      });
    }
    renderMoods();
    if (!reduce) {
      setInterval(function () {
        drawAll(true);
        setTimeout(function () { drawAll(false); }, 160);
      }, 3200);
    }
  }

  // ---------- wiring ----------

  function initLang() {
    var btns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        lang = this.getAttribute('data-lang') === 'id' ? 'id' : 'en';
        try { window.localStorage.setItem('reelo-lang', lang); } catch (e) { /* ignore */ }
        applyLang();
      });
    }
  }

  function initCopy() {
    var btn = document.getElementById('copy-sha');
    btn.addEventListener('click', function () {
      var text = document.getElementById('sha').textContent;
      var done = function (ok) {
        btn.textContent = t(ok ? 'copied' : 'copyFail');
        setTimeout(function () { btn.textContent = t('copy'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
  }

  initLang();
  initCopy();
  initMascots();
  applyLang();
  checkVersion();
})();
