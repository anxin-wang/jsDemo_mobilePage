!function () {
    function e(e, t) {
        for (var i in t)e[i] = t[i];
        return e
    }

    var game = "app-m-chihuo@0.3.9/entries/game.js",
        i = "app-m-chihuo@0.3.9/entries/gamepotal.js",
        n = "app-m-chihuo@0.3.9/entries/index.js",
        a = "app-m-chihuo@0.3.9/entries/puzzle.js",
        s = "app-m-chihuo@0.3.9/entries/util/appinit.js",
        o = "app-m-chihuo@0.3.9/entries/util/cfg.js",
        c = "app-m-chihuo@0.3.9/entries/util/checkshare.js",
        p = "app-m-chihuo@0.3.9/entries/util/fx.js",
        l = "app-m-chihuo@0.3.9/entries/util/fx_methods.js",
        r = "app-m-chihuo@0.3.9/entries/util/lazyload.js",
        d = "app-m-chihuo@0.3.9/entries/util/loading.js",
        u = "app-m-chihuo@0.3.9/entries/util/login.js",
        h = "app-m-chihuo@0.3.9/entries/util/overlay.js",
        m = "app-m-chihuo@0.3.9/entries/util/pageconsole.js",
        f = "app-m-chihuo@0.3.9/entries/util/purl.js",
        g = "app-m-chihuo@0.3.9/entries/util/request.js",
        v = "app-m-chihuo@0.3.9/entries/util/toast.js",
        w = "app-m-chihuo@0.3.9/entries/util/totop.js",
        b = "app-m-chihuo@0.3.9/entries/util/webshare.js",
        y = "app-m-chihuo@0.3.9/entries/util/wxapi.js",
        k = "app-m-chihuo@0.3.9/entries/warmup.js",
        x = "zepto@^1.2.2",
        _ = "util-timer@~0.1.3",
        j = "dpapp@^1.1.13",
        z = [game, i, n, a, s, o, c, p, l, r, d, u, h, m, f, g, v, w, b, y, k],
        A = {},
        C = A;
    define(k, [x, _, w, o, s, m, g, f, v, u, i, h, d, r, y, c, b], function (e) {
        function game() {
            C.show();
            var e = b('<img src="' + PAGE_CFG.imgpath + '/notstart.png"/>');
            e.css({
                position: "fixed",
                "z-index": "20000",
                width: 285,
                height: 246,
                top: 120,
                left: (b(window).width() - 285) / 2
            }), b("body").append(e)
        }

        function i() {
            b("#J_pageLoading").addClass("loadingerr");
            var e = Date.now(), i = new Date;
            i.setTime(0), i.setFullYear(2015, 8, 7), i > e && "dianping.com" == y.sdomain && (b("#J_pageLoading").hide(), t())
        }

        function n() {
            Q.inApp ? DPApp.initShare({
                image: N.image,
                url: N.link,
                title: N.title,
                desc: N.desc,
                content: N.content,
                feed: [DPApp.Share.WECHAT_FRIENDS, DPApp.Share.WECHAT_TIMELINE, DPApp.Share.QQ, DPApp.Share.SMS, DPApp.Share.WEIBO, DPApp.Share.QZONE, DPApp.Share.EMAIL, DPApp.Share.COPY],
                success: function (e) {
                    x(e ? JSON.stringify(e) : "share success")
                },
                fail: function (e) {
                    x(JSON.stringify(e))
                }
            }) : (F.ready(function () {
                F.setShare({
                    channel: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"],
                    config: {
                        title: N.title,
                        desc: N.desc,
                        link: N.link,
                        content: N.content,
                        imgUrl: N.image,
                        trigger: function (e) {
                            x("wx share trigger: " + JSON.stringify(e))
                        },
                        complete: function (e) {
                            x("wx share complete: " + JSON.stringify(e))
                        },
                        success: function (e) {
                            x("wx share success: " + JSON.stringify(e))
                        },
                        cancel: function (e) {
                            x("wx share cancel: " + JSON.stringify(e))
                        },
                        fail: function (e) {
                            x("wx share fail: " + JSON.stringify(e))
                        }
                    }
                })
            }), U.init({link: N.link, title: N.title, img: N.image, desc: N.desc}))
        }

        function a() {
            P.isWeixin || P.isQQ ? b("#J_shareOverlay").removeClass("Hide") : Q.inApp ? DPApp.share({
                title: G.title,
                desc: G.desc,
                content: G.content,
                image: G.image,
                url: G.link,
                success: function (e) {
                    x(e ? JSON.stringify(e) : "share success")
                },
                fail: function (e) {
                    x(JSON.stringify(e))
                }
            }) : U.show()
        }

        function s() {
            var e = b(window).width(), t = b(".red-button").width(), i = b(".red-button p").height();
            b("#red-button-p").css("top", .9 * (t - i) / 2), b(".rule-wrap").css("left", (e - 290) / 2), b(".sec6-line-block-wrap .title").css("left", (b(".sec6-line-block-wrap").width() - b(".sec6-line-block-wrap .title").width()) / 2), b(".sec6-line-block-wrap .title").css("top", e / 640 * 176), b(".sec6-line-block-wrap .content").css("left", (b(".sec6-line-block-wrap").width() - b(".sec6-line-block-wrap .content").width()) / 2), b(".sec6-line-block-wrap .content").css("top", e / 640 * 211)
        }

        function o() {
            D(b(".lazyload"))
        }

        function c() {
            b(".rule-close").on("click", function (e) {
                e.preventDefault(), b(".rule-wrap").addClass("hide"), b(".caption").addClass("hide")
            }), b(".rule-button").on("click", function (e) {
                b(".caption").css("height", b("body").height()), e.preventDefault(), b(".rule-wrap").removeClass("hide"), b(".caption").removeClass("hide")
            })
        }

        function p(e) {
            var t, i = 0, n = "";
            t = 0 == e.type ? 1 : e.type;
            for (var s = B[t - 1], o = 0; o < e.game.length; o++) {
                var c = o + 1;
                1 == e.game[o] ? (i++, b("#warmup-puzzleimg" + c.toString()).attr("src", v + "img_" + s + "_" + c + ".jpg")) : b("#warmup-puzzleimg" + c.toString()).attr("src", v + "img_" + s + "_h_" + c + ".jpg")
            }
            6 == i && (N = G), b(".red-button").on("click", function (e) {
                _hip.push(L.actBtn_jkp);
                var t = (Date.now(), new Date);
                t.setTime(0), t.setFullYear(2015, 8, 7), 6 == i && (e.preventDefault(), a())
            }), 0 == i ? (n = "", b(".red-button").find("img").attr("src", w + "red-button-state1.png")) : 6 == i ? (n = "", b(".red-button").find("img").attr("src", w + "red-button-state3.png")) : (n = "", b(".red-button").find("img").attr("src", w + "lack" + (6 - i).toString() + ".png")), b("#red-button-p").html(n)
        }

        function l(e) {
            b("#switch").html(1 == e.time.type ? "吃货节" : "结束");
            var t = new Date;
            t.setDate(e.time.days), t.setHours(e.time.hours, e.time.minutes, e.time.seconds);
            new I({
                time: t, isCountDown: !0, step: 1e3, interval: 1e3, onStart: function () {
                }, onChange: function (t) {
                    0 == e.time.days ? (b(".sec1-day").addClass("Hide"), b(".sec1-second").removeClass("Hide")) : (b(".sec1-day").removeClass("Hide"), b(".sec1-second").addClass("Hide")), b("#sec1-day").html(t.date < 10 ? "0" + t.date.toString() : t.date.toString()), b("#sec1-hour").html(t.hour < 10 ? "0" + t.hour.toString() : t.hour.toString()), b("#sec1-minute").html(t.minute < 10 ? "0" + t.minute.toString() : t.minute.toString()), b("#sec1-second").html(t.second < 10 ? "0" + t.second.toString() : t.second.toString())
                }
            });
            0 == Q.inApp && (b(".alarm-button").addClass("hide"), b(".sec1-content-wrap-in").css("width", "200px")), x("isRemind:" + e.remind.isRemind), x("dpid:" + Q.dpId), 1 == e.remind.isRemind ? (b(".alarm-button").find("img").attr("src", w + "button2.png"), A = 1) : b(".alarm-button").on("click", function () {
                return _hip.push(L.actBtn_txw), 0 == e.userid ? (z(Q.inApp, "http://evt." + y.sdomain + "/event/chihuo/warmup.html", Q.appVersion), !1) : void(0 == A && _({
                    data: {
                        dpid: Q.dpId,
                        event: "917"
                    }, key: y.api.remind, success: function (e) {
                        1 == e.success ? (A = 1, b(".alarm-button").find("img").attr("src", w + "button2.png"), j(1 == e.status ? "设置成功" : e.msg)) : j("服务器繁忙")
                    }, fail: function () {
                        i()
                    }
                }))
            })
        }

        function r(e) {
            var t;
            t = e ? 2 : 100, b.ajax({
                data: {
                    topicId: 13445,
                    itemId: 0,
                    cx: Q.cx,
                    pageno: 1,
                    pagesize: t,
                    jsonp: "jsonp3",
                    token: Q.token,
                    cityid: Q.cityId,
                    longitude: Q.geo.lng,
                    latitude: Q.geo.lat,
                    version: Q.appVersion,
                    dpid: Q.dpId
                }, url: y.api.deal, dataType: "jsonp", timeout: 1e4, beforeSend: function () {
                }, complete: function () {
                }, success: function (e) {
                    if (1 == e.success) {
                        var t = b(".sec3-wrap .goods-list");
                        0 == e.isOver ? (b(".sec3-foot").removeClass("forbid"), b(".sec3-foot").html('更多免费吃<span><img class="lazyload" src="' + g + '"/></span>'), R++) : (b(".sec3-foot").html('收起<span><img class="lazyload arrowup" src="' + g + '"/></span>'), b(".sec3-foot").addClass("forbid")), html = [];
                        for (var i = 0; i < e.deals.length; i++) {
                            var n = (["mv", {
                                module: "gameindexclick_mf" + (O * (R - 1) + i + 1).toString(),
                                action: "click"
                            }], "");
                            n = Q.inApp ? "dianping://tuandeal?id=" + e.deals[i].dealGroupId : "http://m." + y.sdomain + "/tuan/deal/" + e.deals[i].dealGroupId;
                            {
                                var a = "http://i1.s1.dpfile.com" + e.deals[i].imageUrl;
                                e.deals[i].title.split(" ", 1)
                            }
                            html.push('<li>  <div class="wrappic1"><div class="wrappic2"><img class="lazyload-sec3 dealpic" lazy-src="' + a + '" /></div></div>'), html.push(' <div class="sec3-button grey">即将开始</div>'), html.push(' <div class="text"><p class="title">' + e.deals[i].title + "</p>"), html.push('<p class="desc">' + e.deals[i].titleDesc + "</p>"), html.push(' <p class="price"> <span class="now-price-span">¥<span class="now-price">0</span></span>'), html.push(' <span class="past-price-span">¥<span class="past-price">' + e.deals[i].marketPrice + "</span></span>"), html.push('</p> </div> <div class="clear-fix"></div> </li>')
                        }
                        t.html(""), t.append(html.join(" ")), t.find("a").lazyLink(), D(b(".lazyload-sec3"))
                    }
                }, error: function () {
                    b(".sec3-foot").removeClass("forbid")
                }
            })
        }

        function d() {
            b.ajax({
                data: {
                    topicId: 13551,
                    itemId: 0,
                    pageno: H,
                    pagesize: E,
                    jsonp: "jsonp3",
                    token: Q.token,
                    cityid: Q.cityId,
                    longitude: Q.geo.lng,
                    latitude: Q.geo.lat,
                    cx: Q.cx,
                    version: Q.appVersion,
                    dpid: Q.dpId
                }, url: y.api.deal, dataType: "jsonp", timeout: 1e4, beforeSend: function () {
                }, complete: function () {
                }, success: function (e) {
                    if (1 == e.success) {
                        if (0 == e.isOver) {
                            b(".sec5-foot").removeClass("forbid"), H++;
                            var t = w + "arrow.jpg";
                            b(".sec5-foot").html('更多满返<span><img class="lazyload" src="' + t + '"/></span>')
                        } else b(".sec5-foot").html('收起<span><img class="lazyload arrowup" src="' + PAGE_CFG.imgpath + '/warmup/arrow.jpg"/></span>'), b(".sec5-foot").addClass("forbid");
                        html = [];
                        for (var i = 0; i < e.deals.length; i++) {
                            var n = (["mv", {
                                module: "gameindexclick_lj" + (E * (H - 1) + i + 1).toString(),
                                action: "click"
                            }], "");
                            n = Q.inApp ? "dianping://tuandeal?id=" + e.deals[i].dealGroupId : "http://m." + y.sdomain + "/tuan/deal/" + e.deals[i].dealGroupId;
                            {
                                var a = "http://i1.s1.dpfile.com" + e.deals[i].imageUrl;
                                e.deals[i].title.split(" ", 1)
                            }
                            html.push('<li><div class="distance">' + e.deals[i].distanceStrCN + '</div>  <div class="wrappic1"><div class="wrappic2"><img class="lazyload-sec5 dealpic" lazy-src="' + a + '" /></div></div>'), html.push(' <div class="sec5-button grey">即将开始</div>'), html.push(' <div class="text"><p class="title">' + e.deals[i].title + "</p>"), html.push('<p class="desc">' + e.deals[i].titleDesc + "</p>"), html.push(' <p class="price"> <span class="now-price-span">¥<span class="now-price">' + e.deals[i].price + "</span>"), html.push('<img class="lable" src="' + w + 'label_warmup.jpg" /></span>'), html.push(' <span class="past-price-span">¥<span class="past-price">' + e.deals[i].marketPrice + "</span></span>"), html.push('</p> </div> <div class="clear-fix"></div> </li>')
                        }
                        b(".sec5-wrap .goods-list").append(html.join(" ")), D(b(".lazyload-sec5"))
                    }
                }, error: function () {
                    b(".sec5-foot").removeClass("forbid")
                }
            })
        }

        function u() {
            b.ajax({
                data: {
                    topic: "917shanhui",
                    pageno: q,
                    pagesize: T,
                    jsonp: "jsonp",
                    token: Q.token,
                    cityid: Q.cityId,
                    cx: Q.cx,
                    version: Q.appVersion,
                    longitude: Q.geo.lng,
                    latitude: Q.geo.lat,
                    dpid: Q.dpId
                }, url: y.api.business, dataType: "jsonp", timeout: 1e4, beforeSend: function () {
                }, complete: function () {
                }, success: function (e) {
                    if (200 == e.code) {
                        0 == e.isOver ? (q++, b(".sec4-foot").removeClass("forbid"), b(".sec4-foot").html('更多闪惠<span><img class="lazyload" src="' + g + '"/></span>')) : (b(".sec4-foot").html('收起<span><img class="lazyload arrowup" src="' + g + '"/></span>'), b(".sec4-foot").addClass("forbid")), html = [];
                        for (var t = 0; t < e.items.length; t++) {
                            var i = (["mv", {
                                module: "gameindexclick_sh" + (T * (q - 1) + t + 1).toString(),
                                action: "click"
                            }], "");
                            i = Q.inApp ? "dianping://shopinfo?id=" + e.items[t].id : "http://m." + y.sdomain + "/shop/" + e.items[t].id;
                            var n = e.items[t].picture.split("/"), a = "http://i1.s1.dpfile.com/" + n[3] + "/" + n[4] + "/" + n[5], s = (e.items[t].name.split(" ", 1), "");
                            e.items[t].shanhui.discount && (s = e.items[t].shanhui.discount), html.push('<li><div class="distance">' + e.items[t].distance + "</div>"), html.push('  <div class="wrappic1"><div class="wrappic2"><img class="lazyload-sec4 dealpic" lazy-src="' + a + '" /></div></div>'), html.push(' <div class="sec4-button grey">即将开始</div>'), html.push(' <div class="text"><p class="title">' + e.items[t].name + "</p>"), html.push('<p class="desc"><span class="star star-' + e.items[t].star + '"></span>&nbsp人均:¥<span class="price">' + e.items[t].avgPrice + "</span></p>"), html.push(' <p class="tab"><span class="first">' + e.items[t].regionName + "</span><span>" + e.items[t].primaryTag + "</span>"), html.push('</p> </div> <div class="clear-fix"></div>  <div class="shanhui"> '), html.push('<img class="lazyload-sec4" lazy-src="' + w + 'sec4-shanhui.png" /><span class="discount">' + s + "</span>"), html.push('<div class="morediscount">折后再减?元</div> '), html.push('</div> <div class="clear-fix"></div></li>')
                        }
                        b(".sec4-wrap .goods-list").append(html.join(" ")), D(b(".lazyload-sec4"))
                    }
                }, error: function () {
                    b(".sec4-foot").removeClass("forbid")
                }
            })
        }

        function h() {
            b(".sec3-foot").on("click", function (e) {
                e.preventDefault(), b(this).hasClass("forbid") ? (r(!0), location.hash = "mapDeallist", b(this).removeClass("forbid")) : (b(this).addClass("forbid"), r(!1))
            }), b(".sec4-foot").on("click", function (e) {
                e.preventDefault(), b(this).hasClass("forbid") ? (b(this).removeClass("forbid"), q = 1, b(".sec4-wrap .goods-list").html(""), u(), location.hash = "mapDeallist-sec4") : u()
            }), b(".sec5-foot").on("click", function (e) {
                e.preventDefault(), b(this).hasClass("forbid") ? (b(this).removeClass("forbid"), H = 1, b(".sec5-wrap .goods-list").html(""), d(), location.hash = "mapDeallist-sec5") : (b(this).addClass("forbid"), d())
            })
        }

        function m() {
            b(".sec6-block-1").on("click", function () {
                var e;
                e = Q.inApp ? "dianping://web?url=http%3A%2F%2Fm.dianping.com%2Fbonusplatform%2Finvite%3Fe%3D687%26token%3D!%26cityid%3D*" : "http://evt.dianping.com/synthesislink/4705.html", _hip.push(L.actBtn_pic1), window.location.href = e
            }), b(".sec6-block-2").on("click", function () {
                var e;
                e = Q.inApp ? "dianping://cinemalist?movieid=983" : "http://evt.dianping.com/synthesislink/4709.html", _hip.push(L.actBtn_pic2), window.location.href = e
            }), b(".sec6-block-3").on("click", function () {
                var e;
                e = Q.inApp ? "dianping://web?url=http%3A%2F%2Fevt.dianping.com%2F10599%2Fhtml%2Fapp.html%3Fcityid%3D*%26env%3Dproduct" : "http://evt.dianping.com/synthesislink/4715.html", _hip.push(L.actBtn_pic3), window.location.href = e
            }), b(".sec6-block-4").on("click", function () {
                var e;
                e = Q.inApp ? "dianping://web?url=http%3a%2f%2fmm.dianping.com%2fwaimai%2ffengwei%3fparams%3d9cde246d4ddf4221be7de627103b8b30__WaimaiFengWei%26source%3d11%26token%3d" : "http://evt.dianping.com/synthesislink/4512.html", _hip.push(L.actBtn_pic4), window.location.href = e
            }), b(".sec6-block-5").on("click", function () {
                var e;
                e = Q.inApp ? "dianping://web?url=http%3A%2F%2Fevt.dianping.com%2F8602%2Fhtml%2Fapp.html%3Fcityid%3D*%26env%3Dproduct" : "http://evt.dianping.com/synthesislink/4697.html", _hip.push(L.actBtn_pic5), window.location.href = e
            }), b(".sec6-block-6").on("click", function () {
                var e;
                e = Q.inApp ? "dianping://web?url=http%3a%2f%2fevt.dianping.com%2f10109%2fhtml%2fapp.html%3fcityid%3d*%26env%3dproduct" : "http://evt.dianping.com/synthesislink/4712.html", _hip.push(L.actBtn_pic6), window.location.href = e
            }), b(".sec6-block-7").on("click", function () {
                var e;
                e = Q.inApp ? "dianping://recommendshop?url=http%3A%2F%2Ftgapp.dianping.com%2Fhotel%2Fevent%2Fapp%2FshowAppEvent%2F20150821_xcjall" : "http://tgapp.dianping.com/hotel/event/app/showAppEvent/20150821_xcjall?platform=3", _hip.push(L.actBtn_pic7), window.location.href = e
            }), b(".sec6-block-8").on("click", function () {
                var e;
                e = Q.inApp ? "http://m.dianping.com/mobile/event/list?utm_source=co_temp&utm_campaign=event0901&utm_medium=917sales" : "http://m.dianping.com/mobile/event/list?utm_source=co_temp&utm_campaign=event0901&utm_medium=917sales", _hip.push(L.actBtn_pic8), window.location.href = e
            }), b(".sec6-block-9").on("click", function () {
                var e;
                e = Q.inApp ? "dianping://web?url=http%3A%2F%2Fevt.dianping.com%2Fchannel%2Ftohome%2Fflashsaleactivity.html%23s%3D917" : "http://evt.dianping.com/channel/tohome/flashsaleactivity.html#s=banner?_utm=__3y8d&_p=main_app_tohome_topbanner&dp_res=main_app_tohome_topbanner", _hip.push(L.actBtn_pic9), window.location.href = e
            })
        }

        function f(e) {
            s(), c(), p(e), n(), l(e), r(!0), u(), d(), h(), m(), o(), b("#ask").on("click", function (e) {
                e.preventDefault(), window.location.href = " http://kf.dianping.com/third-part/user/app/consultCategory?d.user_token=" + Q.token + "&d.user_ip=&d.city_id=" + Q.cityId + "&d.user_type=user&d.from=app&d.skill_code=skillActivity&d.consult_code=activityConsult&activityName=AppActivityRuleConsult&activityTitle=App"
            })
        }

        var g, v, w, b = e("zepto"), y = (e("./util/totop"), e("./util/cfg")), k = e("./util/appinit"), x = e("./util/pageconsole"), _ = e("./util/request"), j = (e("./util/purl")(), e("./util/toast")), z = e("./util/login"), A = (e("./gamepotal"), 0), C = e("./util/overlay"), S = e("./util/loading"), I = e("util-timer"), D = e("./util/lazyload"), F = e("./util/wxapi"), P = e("./util/checkshare"), U = e("./util/webshare"), B = ["r", "g", "l"], O = 2, R = 1, T = 10, q = 1, E = 20, H = 1, G = {
            image: PAGE_CFG.shareico,
            link: "http://evt." + y.sdomain + "/event/chihuo/warmup.html",
            title: "大众点评917吃货节,必须炫耀一下，轻松抢到免费吃！",
            desc: "又能再吃一顿了，午餐午餐，你比四餐多一餐！☞",
            content: "【大众点评917吃货节，必须炫耀一下，轻松抢到免费吃！】又能再吃一顿了，午餐午餐，你比四餐多一餐！☞"
        }, N = {
            image: PAGE_CFG.shareico,
            link: "http://evt." + y.sdomain + "/event/chihuo/warmup.html",
            title: "大众点评917吃货节，你有一份免费大餐没抢!快来☞",
            desc: "填色块抢免费，吃货们，躁起来！☞",
            content: "【大众点评917吃货节，你有一份免费大餐没抢!快来☞】填色块抢免费，吃货们，躁起来！☞"
        }, Q = {
            inApp: "",
            cityId: 1,
            cx: "",
            dpId: "",
            token: "",
            appVersion: 0,
            geo: {lat: 0, lng: 0}
        }, L = {
            actBtn_txw: ["mv", {module: "gameindexclick_txw", action: "click"}],
            actBtn_jkp: ["mv", {module: "gameindexclick_jkp", action: "click"}],
            actBtn_pic1: ["mv", {module: "gameindexclick_meishi", action: "click"}],
            actBtn_pic2: ["mv", {module: "gameindexclick_dianying", action: "click"}],
            actBtn_pic3: ["mv", {module: "gameindexclick_ktv", action: "click"}],
            actBtn_pic4: ["mv", {module: "gameindexclick_waimai", action: "click"}],
            actBtn_pic5: ["mv", {module: "gameindexclick_jingdian", action: "click"}],
            actBtn_pic6: ["mv", {module: "gameindexclick_zuyu", action: "click"}],
            actBtn_pic7: ["mv", {module: "gameindexclick_jiudian", action: "click"}],
            actBtn_pic8: ["mv", {module: "gameindexclick_bawangcan", action: "click"}],
            actBtn_pic9: ["mv", {module: "gameindexclick_daojia", action: "click"}]
        };
        b.fn.lazyLink = function () {
            b(this).each(function () {
                var e = b(this), t = e.attr("href");
                e.off("click").on("click", function (e) {
                    e.preventDefault(), S.show();
                    var i = parseInt(3e3 * Math.random());
                    0 == i && (i = 1), setTimeout(function () {
                        S.hide(), location.href = t
                    }, i)
                })
            })
        }, k(function (e) {
            b.extend(Q, e), v = PAGE_CFG.puzzleimg.split("/"), v.splice(v.length - 1, 1), v = v.join("/") + "/", w = PAGE_CFG.warmupimg.split("/"), w.splice(w.length - 1, 1), w = w.join("/") + "/", g = w + "arrow.jpg", b("#J_loadingReload").on("click", function (e) {
                e.preventDefault(), location.reload()
            }), _({
                data: {token: Q.token, dpid: Q.dpId, event: "917"}, key: y.api.festivalpre, success: function (e) {
                    "event is not in time" == e.err_msg && i(), 1 == e.success ? (f(e), b("#J_pageLoading").hide()) : i()
                }, fail: function () {
                    i()
                }
            })
        })
    }, {
        entries: z,
        map: e({
            "./util/totop": w,
            "./util/cfg": o,
            "./util/appinit": s,
            "./util/pageconsole": m,
            "./util/request": g,
            "./util/purl": f,
            "./util/toast": v,
            "./util/login": u,
            "./gamepotal": i,
            "./util/overlay": h,
            "./util/loading": d,
            "./util/lazyload": r,
            "./util/wxapi": y,
            "./util/checkshare": c,
            "./util/webshare": b
        }, C)
    }), define(w, [x], function (e) {
        function t() {
            var e = i('<a href="#" class="gotop"><i class="icon-gotop"></i>顶部</a>');
            i("body").append(e);
            var t = i(window).scrollTop();
            t > screen.availHeight ? e.show() : e.hide(), i(window).on("scroll", function () {
                var t = i(this).scrollTop();
                t > screen.availHeight ? e.show() : e.hide()
            })
        }

        var i = e("zepto");
        t()
    }, {entries: z, map: C}), define(o, [], function (e, t, i) {
        var n = "51ping.com", a = {
            supportList: "/promotion/festival/supportList?jsonp=?",
            remind: "/promotion/festival/remind?jsonp=?",
            festivalpre: "/promotion/festivalpre?jsonp=?",
            mygame: "/promotion/mygame?jsonp=?",
            gamesupport: "/promotion/gamesupport?jsonp=?",
            gameopencard: "/promotion/gameopencard?jsonp=?",
            deal: "/sale/festival/ajax/deal?jsonp=?",
            openbonus: "/promotion/festival/envelope/open?jsonp=?",
            bonuslist: "/promotion/festival/envelope/list?jsonp=?",
            sysdate: "/sale/festival/917/sysdate?jsonp=?",
            business: "/sale/festival/ajax/business?jsonp=?",
            indexpage: "/sale/festival/917?jsonp=?",
            indexremind: "/sale/festival/game/remind?jsonp=?"
        };
        ~document.domain.indexOf("dianping.com") && (n = "dianping.com");
        var s = "http://m." + n, o = "http://m.dianping.com";
        i.exports = {
            sdomain: n,
            api: {
                supportList: s + a.supportList,
                remind: s + a.remind,
                festivalpre: s + a.festivalpre,
                mygame: s + a.mygame,
                gamesupport: s + a.gamesupport,
                gameopencard: s + a.gameopencard,
                deal: o + a.deal,
                business: o + a.business,
                openbonus: s + a.openbonus,
                bonuslist: s + a.bonuslist,
                sysdate: s + a.sysdate,
                indexpage: s + a.indexpage,
                indexremind: s + a.indexremind
            }
        }
    }, {entries: z, map: C}), define(s, [j, m], function (e, t, i) {
        function n() {
            0 == d && p(u)
        }

        function a() {
            d++, r("cityid s"), l.getCityId({
                success: function (e) {
                    e.cityId && (u.cityId = e.cityId), d--, r("cityid d"), n()
                }, fail: function () {
                    d--, r("cityid e"), n()
                }
            })
        }

        function s() {
            d++, r("cs s"), l.getCX({
                business: "cx", success: function (e) {
                    u.cx = e.cx, d--, r("cs d"), n()
                }, fail: function () {
                    d--, r("cs e"), n()
                }
            })
        }

        function o() {
            d++, r("geo s"), l.getLocation({
                success: function (e) {
                    u.geo = e, d--, r("geo d"), n()
                }, fail: function () {
                    d--, r("geo e"), n()
                }
            })
        }

        function c() {
            d++, r("user s"), l.getUserInfo({
                success: function (e) {
                    u.dpId = e.dpid, u.token = e.token, d--, r("user d"), n()
                }, fail: function () {
                    d--, r("user e"), n()
                }
            })
        }

        var p, l = e("dpapp"), r = e("./pageconsole"), d = 0, u = {inApp: !1};
        i.exports = function (e) {
            p = e, r("dpapp s"), l.ready(function () {
                r("app ready"), l.getUA({
                    success: function (e) {
                        (u.inApp = "dpapp" == e.platform) ? (u.appVersion = e.appVersion, a(), s(), o(), c()) : p(u), r("ua d")
                    }, fail: function () {
                        r("ua e"), p(u)
                    }
                })
            })
        }
    }, {entries: z, map: e({"./pageconsole": m}, C)}), define(m, [x], function (e, t, i) {
        var n = e("zepto"), a = null, s = !1;
        i.exports = function (e) {
            s && (null == a && (a = n("<div></div>").css({
                position: "fixed",
                width: "100%",
                top: 0,
                left: 0,
                height: "80px",
                "line-height": "20px",
                overflow: "auto",
                background: "rgba(255,255,255,.5)",
                color: "#000",
                "z-index": 2e4
            }), n("body").append(a)), a.prepend("<div><i>" + Date.now() + ": </i>" + e + "</div>"))
        }
    }, {entries: z, map: C}), define(g, [x, d], function (e, t, i) {
        function n(e) {
            var t = {data: {}, key: "/", success: null, fail: null};
            a.extend(t, e), a.ajax({
                data: t.data, url: t.key, dataType: "jsonp", timeout: 1e4, beforeSend: function () {
                    s.show()
                }, complete: function () {
                    s.hide()
                }, success: function (e) {
                    t.success && t.success(e)
                }, error: function () {
                    t.fail && t.fail()
                }
            })
        }

        var a = e("zepto"), s = e("./loading");
        i.exports = n
    }, {entries: z, map: e({"./loading": d}, C)}), define(f, [], function (e, t, i) {
        !function (e) {
            "function" == typeof define && define.amd ? define(e) : "undefined" != typeof t ? i.exports = e() : window.purl = e()
        }(function () {
            function e(e, t) {
                for (var i = decodeURI(e), n = h[t ? "strict" : "loose"].exec(i), s = {
                    attr: {},
                    param: {},
                    seg: {}
                }, o = 14; o--;)s.attr[d[o]] = n[o] || "";
                return s.param.query = a(s.attr.query), s.param.fragment = a(s.attr.fragment), s.seg.path = s.attr.path.replace(/^\/+|\/+$/g, "").split("/"), s.seg.fragment = s.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), s.attr.base = s.attr.host ? (s.attr.protocol ? s.attr.protocol + "://" + s.attr.host : s.attr.host) + (s.attr.port ? ":" + s.attr.port : "") : "", s
            }

            function t(e, t) {
                if (0 === e[t].length)return e[t] = {};
                var i = {};
                for (var n in e[t])i[n] = e[t][n];
                return e[t] = i, i
            }

            function i(e, n, a, s) {
                var o = e.shift();
                if (o) {
                    var c = n[a] = n[a] || [];
                    "]" == o ? p(c) ? "" !== s && c.push(s) : "object" == typeof c ? c[l(c).length] = s : c = n[a] = [n[a], s] : ~o.indexOf("]") ? (o = o.substr(0, o.length - 1), !m.test(o) && p(c) && (c = t(n, a)), i(e, c, o, s)) : (!m.test(o) && p(c) && (c = t(n, a)), i(e, c, o, s))
                } else p(n[a]) ? n[a].push(s) : n[a] = "object" == typeof n[a] ? s : "undefined" == typeof n[a] ? s : [n[a], s]
            }

            function n(e, t, n) {
                if (~t.indexOf("]")) {
                    var a = t.split("[");
                    i(a, e, "base", n)
                } else {
                    if (!m.test(t) && p(e.base)) {
                        var o = {};
                        for (var c in e.base)o[c] = e.base[c];
                        e.base = o
                    }
                    "" !== t && s(e.base, t, n)
                }
                return e
            }

            function a(e) {
                return c(String(e).split(/&|;/), function (e, t) {
                    try {
                        t = decodeURIComponent(t.replace(/\+/g, " "))
                    } catch (i) {
                    }
                    var a = t.indexOf("="), s = o(t), c = t.substr(0, s || a), p = t.substr(s || a, t.length);
                    return p = p.substr(p.indexOf("=") + 1, p.length), "" === c && (c = t, p = ""), n(e, c, p)
                }, {base: {}}).base
            }

            function s(e, t, i) {
                var n = e[t];
                "undefined" == typeof n ? e[t] = i : p(n) ? n.push(i) : e[t] = [n, i]
            }

            function o(e) {
                for (var t, i, n = e.length, a = 0; n > a; ++a)if (i = e[a], "]" == i && (t = !1), "[" == i && (t = !0), "=" == i && !t)return a
            }

            function c(e, t) {
                for (var i = 0, n = e.length >> 0, a = arguments[2]; n > i;)i in e && (a = t.call(void 0, a, e[i], i, e)), ++i;
                return a
            }

            function p(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }

            function l(e) {
                var t = [];
                for (var i in e)e.hasOwnProperty(i) && t.push(i);
                return t
            }

            function r(t, i) {
                return 1 === arguments.length && t === !0 && (i = !0, t = void 0), i = i || !1, t = t || window.location.toString(), {
                    data: e(t, i),
                    attr: function (e) {
                        return e = u[e] || e, "undefined" != typeof e ? this.data.attr[e] : this.data.attr
                    },
                    param: function (e) {
                        return "undefined" != typeof e ? this.data.param.query[e] : this.data.param.query
                    },
                    fparam: function (e) {
                        return "undefined" != typeof e ? this.data.param.fragment[e] : this.data.param.fragment
                    },
                    segment: function (e) {
                        return "undefined" == typeof e ? this.data.seg.path : (e = 0 > e ? this.data.seg.path.length + e : e - 1, this.data.seg.path[e])
                    },
                    fsegment: function (e) {
                        return "undefined" == typeof e ? this.data.seg.fragment : (e = 0 > e ? this.data.seg.fragment.length + e : e - 1, this.data.seg.fragment[e])
                    }
                }
            }

            var d = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], u = {anchor: "fragment"}, h = {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }, m = /^[0-9]+$/;
            return r
        })
    }, {entries: z, map: C}), define(v, [x, h], function (e, t, i) {
        function n(e, t) {
            function i() {
                s.hide(), p.remove()
            }

            t = t || c;
            var n = {
                position: "fixed",
                "z-index": o,
                top: "50%",
                left: "50%",
                "min-width": "100px",
                "max-width": "160px",
                padding: "10px",
                "border-radius": "5px",
                "-webkit-border-radius": "5px",
                background: "#000",
                color: "#fff",
                "text-align": "center",
                "font-size": "14px",
                "word-break": "break-all",
                "-webkit-box-sizing": "border-box",
                "box-sizing": "border-box"
            }, p = a("<div>" + e + "</div>");
            p.css(n).appendTo("body").css("margin", "-" + p.height() / 2 + "px 0 0 -" + p.width() / 2 + "px"), s.show();
            setTimeout(function () {
                i()
            }, t)
        }

        var a = e("zepto"), s = e("./overlay"), o = 10010, c = 2e3;
        i.exports = n
    }, {entries: z, map: e({"./overlay": h}, C)}), define(u, [o, c], function (e, t, i) {
        function n(e, t, i) {
            if (e) {
                var n = ["http://m." + a.sdomain + "/login/app?", "&version=" + i, "&logintype=m"].join("");
                location.href = "dianping://loginweb?url=" + encodeURIComponent(n) + "&goto=" + encodeURIComponent("dianping://complexweb?url=" + encodeURIComponent(t))
            } else location.href = s.isQQ || s.isWeixin ? "http://m." + a.sdomain + "/thirdlogin/auth?rurl=" + encodeURIComponent(t) : "http://m." + a.sdomain + "/login?redir=" + encodeURIComponent(t)
        }

        var a = e("./cfg"), s = e("./checkshare");
        i.exports = n
    }, {entries: z, map: e({"./cfg": o, "./checkshare": c}, C)}), define(i, [], function (e, t, i) {
        i.exports = function (t) {
            e.async("./game", function (e) {
                e(t)
            })
        }
    }, {entries: z, map: C}), define(h, [x], function (e, t, i) {
        var n = e("zepto"), a = 9999, s = 0, o = {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,.6)",
            "z-index": a,
            position: "fixed",
            display: "none"
        }, c = n('<div class="overlay"></div>').css(o).appendTo("body");
        i.exports = {
            show: function () {
                s++, c.css({background: "rgba(0,0,0,.6)"}), s > 0 && c.show()
            }, showDeep: function (e) {
                s++, c.css({background: "rgba(0,0,0," + e + ")"}), s > 0 && c.show()
            }, hide: function () {
                s--, 0 >= s && (s = 0, c.hide())
            }
        }
    }, {entries: z, map: C}), define(d, [x, h], function (e, t, i) {
        var n, a = e("zepto"), s = e("./overlay"), o = 10009, c = 0, p = {
            w: a(window).width(),
            h: a(window).height()
        }, l = {
            "z-index": o - 1,
            left: p.w / 2 - 11,
            top: p.h / 2 - 11
        }, r = a('<div class="onloading Hide"></div>').css(l).appendTo("body");
        i.exports = {
            show: function () {
                c++, c > 0 && !n && (r.removeClass("Hide"), s.show(), n = !0)
            }, hide: function () {
                c--, 0 >= c && (c = 0, n && (r.addClass("Hide"), s.hide(), n = !1))
            }
        }
    }, {entries: z, map: e({"./overlay": h}, C)}), define(r, [x], function (e, t, i) {
        var n = e("zepto"), a = "lazy-src", s = function (e, t) {
            t = t || {};
            var i = t.offset || 0, s = e.get().filter(function (e) {
                return !!n(e).attr(a)
            }), o = s.length, c = function () {
                for (var e = n(window).scrollTop(), t = n(window).scrollTop() + window.innerHeight + i, p = 0, l = s.length; l > p; p++) {
                    var r = n(s[p]);
                    if (r.attr(a)) {
                        var d = n(r).offset().top;
                        t >= d && d >= e && (r.attr("src", r.attr(a)).removeAttr(a), o--)
                    }
                }
                0 >= o && window.removeEventListener("scroll", c, !1)
            };
            window.addEventListener("load", c, !1), window.addEventListener("scroll", c, !1), c()
        };
        i.exports = s
    }, {entries: z, map: C}), define(y, [], function (e, t, i) {
        i.exports = {
            ready: function (e) {
                window.wx && wx.ready(function () {
                    e()
                })
            }, setShare: function (e) {
                for (var t = 0, i = e.channel.length; i > t; t++) {
                    var n = {
                        title: e.config.title,
                        desc: e.config.desc,
                        link: e.config.link,
                        imgUrl: e.config.imgUrl,
                        trigger: e.config.trigger,
                        complete: e.config.complete,
                        success: e.config.success,
                        cancel: e.config.cancel,
                        fail: e.config.fail
                    };
                    n.title = "onMenuShareTimeline" == e.channel[t] ? e.config.content : e.config.title, wx[e.channel[t]](n)
                }
            }
        }
    }, {entries: z, map: C}), define(c, [], function (e, t, i) {
        var n = /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/, a = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/, s = navigator.userAgent, o = s.search(a) > -1 || s.search(n) > -1, c = s.search(/MicroMessenger/i) > -1;
        i.exports = {isQQ: o, isWeixin: c}
    }, {entries: z, map: C}), define(b, [x, h], function (e, t, i) {
        var n = e("zepto"), a = (e("./overlay"), n(window)), s = n(".pop-main"), o = n(".pop-main-wrap");
        s.find("#share_close").click(function () {
            s.addClass("Hide"), o.addClass("Hide")
        }), i.exports = {
            init: function (e) {
                var t = {
                    weibo: "http://service.weibo.com/share/share.php?appkey=1392673069&title=" + encodeURI(e.desc) + "&url=" + encodeURI(e.link) + "&pic=" + encodeURI(e.img),
                    qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" + encodeURI(e.title) + "&desc=" + encodeURI(e.desc) + "&url=" + encodeURI(e.link) + "&pics=" + encodeURI(e.img) + "&site=http%3A%2F%2Fm.dianping.com",
                    tweibo: "http://share.v.t.qq.com/index.php?c=share&a=index&appkey=b0e02c1f67704ba4895b883cf2d86a6c&title=" + encodeURI(e.desc) + "&url=" + encodeURI(e.link) + "&pic=" + encodeURI(e.img) + "&site=http%3A%2F%2Fm.dianping.com"
                };
                n(".Share-min-list .sinat").attr("href", t.weibo), n(".Share-min-list .qqzone").attr("href", t.qzone), n(".Share-min-list .tcent").attr("href", t.tweibo)
            }, show: function () {
                s.removeClass("Hide"), o.removeClass("Hide"), s.css({
                    left: (a.width() - s.width()) / 2,
                    top: (a.height() - s.height()) / 2
                })
            }
        }
    }, {entries: z, map: e({"./overlay": h}, C)})
}();