(function (j) {
    var e = /iPhone/i, f = /iPod/i, h = /iPad/i, b = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, n = /Android/i, m = /BlackBerry/i, k = /Opera Mini/i, d = /IEMobile/i, a = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, i = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i");
    var g = function (o, p) {
        return o.test(p)
    };
    var l = function (p) {
        var o = p || navigator.userAgent;
        this.apple = {phone: g(e, o), ipod: g(f, o), tablet: g(h, o), device: g(e, o) || g(f, o) || g(h, o)};
        this.android = {phone: g(b, o), tablet: !g(b, o) && g(n, o), device: g(b, o) || g(n, o)};
        this.other = {
            blackberry: g(m, o),
            opera: g(k, o),
            windows: g(d, o),
            firefox: g(a, o),
            device: g(m, o) || g(k, o) || g(d, o) || g(a, o)
        };
        this.seven_inch = g(i, o);
        this.any = this.apple.device || this.android.device || this.other.device || this.seven_inch
    };
    var c = j.isMobile = new l();
    c.Class = l
})(window);

var settings = {};
settings.isPhone = (isMobile.apple.ipod || isMobile.android.phone) ? true : false;
settings.isTablet = (isMobile.apple.tablet || isMobile.android.tablet || isMobile.seven_inch) ? true : false;

if (settings.isPhone && !settings.isTablet) {
    dspTxt = 'PHONE, non TABLET';
}
else if (!settings.isPhone && settings.isTablet) {
    dspTxt = 'TABLET, non PHONE';
}
console.log(settings)