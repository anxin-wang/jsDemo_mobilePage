!function () {
    function i(i, e) {
        for (var s in e)i[s] = e[s];
        return i
    }

    var e = "app-m-chihuo@0.3.9/entries/game.js", s = "app-m-chihuo@0.3.9/entries/gamepotal.js", o = "app-m-chihuo@0.3.9/entries/index.js", t = "app-m-chihuo@0.3.9/entries/puzzle.js", p = "app-m-chihuo@0.3.9/entries/util/appinit.js", h = "app-m-chihuo@0.3.9/entries/util/cfg.js", n = "app-m-chihuo@0.3.9/entries/util/checkshare.js", a = "app-m-chihuo@0.3.9/entries/util/fx.js", u = "app-m-chihuo@0.3.9/entries/util/fx_methods.js", r = "app-m-chihuo@0.3.9/entries/util/lazyload.js", c = "app-m-chihuo@0.3.9/entries/util/loading.js", l = "app-m-chihuo@0.3.9/entries/util/login.js", d = "app-m-chihuo@0.3.9/entries/util/overlay.js", m = "app-m-chihuo@0.3.9/entries/util/pageconsole.js", j = "app-m-chihuo@0.3.9/entries/util/purl.js", f = "app-m-chihuo@0.3.9/entries/util/request.js", w = "app-m-chihuo@0.3.9/entries/util/toast.js", g = "app-m-chihuo@0.3.9/entries/util/totop.js", v = "app-m-chihuo@0.3.9/entries/util/webshare.js", b = "app-m-chihuo@0.3.9/entries/util/wxapi.js", x = "app-m-chihuo@0.3.9/entries/warmup.js", y = "zepto@^1.2.2", z = [e, s, o, t, p, h, n, a, u, r, c, l, d, m, j, f, w, g, v, b, x], k = {}, H = k;
    define(c, [y, d], function (i, e, s) {
        var o, t = i("zepto"), p = i("./overlay"), h = 10009, n = 0, a = {
            w: t(window).width(),
            h: t(window).height()
        }, u = {
            "z-index": h - 1,
            left: a.w / 2 - 11,
            top: a.h / 2 - 11
        }, r = t('<div class="onloading Hide"></div>').css(u).appendTo("body");
        s.exports = {
            show: function () {
                n++, n > 0 && !o && (r.removeClass("Hide"), p.show(), o = !0)
            }, hide: function () {
                n--, 0 >= n && (n = 0, o && (r.addClass("Hide"), p.hide(), o = !1))
            }
        }
    }, {entries: z, map: i({"./overlay": d}, H)}), define(d, [y], function (i, e, s) {
        var o = i("zepto"), t = 9999, p = 0, h = {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,.6)",
            "z-index": t,
            position: "fixed",
            display: "none"
        }, n = o('<div class="overlay"></div>').css(h).appendTo("body");
        s.exports = {
            show: function () {
                p++, n.css({background: "rgba(0,0,0,.6)"}), p > 0 && n.show()
            }, showDeep: function (i) {
                p++, n.css({background: "rgba(0,0,0," + i + ")"}), p > 0 && n.show()
            }, hide: function () {
                p--, 0 >= p && (p = 0, n.hide())
            }
        }
    }, {entries: z, map: H})
}();