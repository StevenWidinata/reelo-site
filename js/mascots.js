/*
 * Reelo pixel mascots. Straight port of Sprite.kt from the app (github.com/OneillAlim/reelo),
 * so the website draws exactly the same 24x24 characters as the phone.
 */
(function (root) {
  'use strict';

  var N = 24;
  var PAL = {
    k: '#2B2118', r: '#E8553D', R: '#B53B2A', y: '#F2B544', Y: '#CC8E22', w: '#FFF6E6', c: '#E6D3BA',
    t: '#2FA39A', T: '#1E7A72', p: '#F59AA0', g: '#9A8B7C', b: '#5B3F2C', s: '#CFEFEA'
  };

  function Grid() {
    this.px = [];
    for (var y = 0; y < N; y++) { this.px.push(new Array(N).fill(null)); }
  }
  Grid.prototype.set = function (x, y, c) { if (x >= 0 && x < N && y >= 0 && y < N) this.px[y][x] = c; };
  Grid.prototype.disc = function (cx, cy, r, c) {
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= r * r) this.px[y][x] = c;
    }
  };
  Grid.prototype.box = function (x0, y0, x1, y1, c) {
    for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) this.set(x, y, c);
  };
  Grid.prototype.outline = function () {
    var o = new Grid();
    var self = this;
    var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      o.px[y][x] = this.px[y][x];
      if (this.px[y][x] === null && dirs.some(function (d) {
        var nx = x + d[0], ny = y + d[1];
        return nx >= 0 && nx < N && ny >= 0 && ny < N && self.px[ny][nx] !== null;
      })) o.px[y][x] = 'k';
    }
    return o;
  };

  function body(g, fx, fy) { return { g: g, fx: fx, fy: fy }; }

  var BUILD = {
    reelo: function () {
      var g = new Grid(); g.disc(12, 13, 8, 'r');
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (p) { g.disc(12 + p[0] * 4.3, 13 + p[1] * 4.3, 1.5, 'b'); });
      g.disc(12, 13, 4.2, 'w'); g.box(16, 19, 22, 21, 'b');
      for (var x = 17; x <= 22; x += 2) { g.set(x, 19, 'c'); g.set(x, 21, 'c'); }
      return body(g.outline(), 9, 11);
    },
    popi: function () {
      var g = new Grid();
      [[7, 9, 2.6], [11, 6.5, 3.2], [15.5, 7.5, 2.8], [18, 10, 2], [5.5, 10.5, 1.8], [12.5, 9, 2.5]]
        .forEach(function (d) { g.disc(d[0], d[1], d[2], 'w'); });
      [[10, 6], [15, 7], [7, 9], [13, 9], [17, 10], [12, 5]].forEach(function (p) { g.set(p[0], p[1], 'y'); });
      for (var y = 10; y <= 21; y++) {
        var t = (y - 10) / 11;
        var x0 = Math.round(4 + t * 2), x1 = Math.round(19 - t * 2);
        for (var x = x0; x <= x1; x++) g.set(x, y, Math.floor(x / 2) % 2 === 1 ? 'w' : 'r');
      }
      g.box(7, 12, 16, 19, 'c'); g.box(8, 13, 15, 18, 'w');
      return body(g.outline(), 9, 14);
    },
    tiko: function () {
      var g = new Grid(); g.box(3, 7, 20, 18, 'y');
      g.disc(3, 12.5, 2.2, null); g.disc(20, 12.5, 2.2, null);
      for (var y = 8; y <= 17; y += 2) g.set(16, y, 'Y');
      [[18, 10], [17, 11], [18, 11], [19, 11], [18, 12]].forEach(function (p) { g.set(p[0], p[1], 'r'); });
      var o = g.outline(); o.box(7, 20, 7, 21, 'k'); o.box(12, 20, 12, 21, 'k'); o.set(8, 21, 'k'); o.set(13, 21, 'k');
      return body(o, 7, 10);
    },
    telo: function () {
      var g = new Grid(); g.box(4, 8, 19, 19, 't'); g.box(6, 10, 15, 17, 's');
      g.box(17, 10, 18, 11, 'y'); g.box(17, 13, 18, 14, 'r'); g.box(17, 16, 18, 16, 'T');
      var o = g.outline();
      [[9, 7], [8, 6], [8, 5], [7, 4], [14, 7], [15, 6], [15, 5], [16, 4]].forEach(function (p) { o.set(p[0], p[1], 'k'); });
      o.set(7, 3, 'r'); o.set(16, 3, 'r'); o.box(6, 21, 7, 21, 'k'); o.box(16, 21, 17, 21, 'k');
      return body(o, 8, 11);
    }
  };

  var MOODS = ['segar', 'santai', 'capek', 'teler', 'pingsan'];
  var OPEN = [[0, 0], [0, 1], [5, 0], [5, 1]];
  var HALF = [[0, 1], [1, 1], [4, 1], [5, 1]];

  function face(b, mood, blink) {
    function draw(list, c) { list.forEach(function (p) { b.g.set(b.fx + p[0], b.fy + p[1], c || 'k'); }); }
    var eyesOpen = mood === 'segar' || mood === 'santai';
    switch (mood) {
      case 'segar':
        b.g.set(b.fx - 1, b.fy + 2, 'p'); b.g.set(b.fx + 6, b.fy + 2, 'p');
        draw([[1, 3], [2, 3], [3, 3], [4, 3]]); draw([[2, 4], [3, 4]], 'R');
        break;
      case 'santai': draw([[1, 3], [2, 4], [3, 4], [4, 3]]); break;
      case 'capek': draw(HALF); draw([[2, 4], [3, 4]]); draw([[7, -1], [7, 0], [6, 0]], 't'); break;
      case 'teler': draw(HALF); draw([[1, 4], [2, 3], [3, 4], [4, 3]]); draw([[0, 2], [1, 2], [4, 2], [5, 2]], 'g'); break;
      case 'pingsan':
        draw([[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1], [4, -1], [6, -1], [5, 0], [4, 1], [6, 1]]);
        draw([[2, 3], [3, 3], [2, 4], [3, 4]]); b.g.set(b.fx + 3, b.fy + 5, 'p');
        break;
    }
    if (eyesOpen) draw(blink ? HALF : OPEN);
  }

  /** 24x24 array of palette chars (null = transparent). */
  function grid(name, mood, blink) {
    var b = BUILD[name]();
    face(b, mood || 'segar', !!blink);
    return b.g.px;
  }

  /** Draw onto a canvas. Canvas is (N + 2) * scale square, same 1-cell margin as the app. */
  function paint(canvas, name, mood, blink, scale) {
    var s = scale || 8;
    var size = (N + 2) * s;
    if (canvas.width !== size) { canvas.width = size; canvas.height = size; }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    var px = grid(name, mood, blink);
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      var c = px[y][x]; if (c === null) continue;
      ctx.fillStyle = PAL[c];
      ctx.fillRect((x + 1) * s, (y + 1) * s, s, s);
    }
  }

  var api = { N: N, PAL: PAL, MOODS: MOODS, NAMES: Object.keys(BUILD), grid: grid, paint: paint };
  root.ReeloSprite = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
