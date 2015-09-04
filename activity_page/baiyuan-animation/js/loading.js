
(function($) {
    var qLimages = new Array;
    var qLdone = 0;

    var qLimageContainer = "";
    var qLoverlay = "";
    var qLbar = "";
    var qLpercentage = "";
    var qLimageCounter = 0;

    var qLoptions = {
        onComplete: function () {},
        backgroundColor: "",
        barColor: "",
        barHeight: 1,
        percentage: false,
        deepSearch: true,
        completeAnimation: "fade",
        onLoadComplete: function () {
            if (qLoptions.completeAnimation == "grow") {
                $(qLbar).stop().css("width", "100%").animate({
                    top: "0%",
                    height: "100%"
                }, 500, function () {
                    $(qLoverlay).fadeOut(500, function () {
                        $(this).remove();
                        qLoptions.onComplete();
                    })
                });
            } else {
                $(qLoverlay).fadeOut(500, function () {
                    $(qLoverlay).remove();
                    qLoptions.onComplete();
                });
            }
        }
    }

    var afterEach = function () {
        createPreloadContainer();
        createOverlayLoader();
    }

    var createPreloadContainer = function() {
        qLimageContainer = $("<div></div>").appendTo("body").css({
            display: "none",
            width: 0,
            height: 0,
            overflow: "hidden"
        });

        for (var i = 0; qLimages.length > i; i++) {
            $.ajax({
                url: qLimages[i],
                type: 'HEAD',
                success: function(data) {
                    qLimageCounter++;
                    addImageForPreload(this['url']);
                }
            });
        }
    }

    var addImageForPreload = function(url) {
        var image = $("<img />").attr("src", url).bind("load", function () {
            completeImageLoading();
        }).appendTo(qLimageContainer);
    }

    var prev_percentage = 0;
    var completeImageLoading = function () {
        qLdone++;

        var percentage = (qLdone / qLimageCounter) * 100;
        $(qLbar).stop().animate({
            width: percentage + "%"
        }, 200);

        if (qLoptions.percentage == true) {
            if (Math.ceil(percentage) > prev_percentage)
            {

                $(qLpercentage).text(Math.ceil(percentage));
                prev_percentage = Math.ceil(percentage);

                var c = Math.ceil(prev_percentage/20)*20;
                if (!$('#preloader .bird').hasClass('p-' + c)){
                    $('#preloader .bird').addClass('p-' + c);
                }
            }
        }

        if (qLdone == qLimageCounter) {
            destroyQueryLoader();
        }
    }

    var destroyQueryLoader = function () {
        $(qLimageContainer).remove();
        qLoptions.onLoadComplete();
    }

    var createOverlayLoader = function () {
        qLoverlay = $('#preloader');
        qLbar = $("#dev-null");
        if (qLoptions.percentage == true) {
            qLpercentage = $("#preloader .figure").text("0");
        }
    }

    var findImageInElement = function (element) {
        var url = "";

        if ($(element).css("background-image") != "none") {
            var url = $(element).css("background-image");
        } else if (typeof($(element).attr("src")) != "undefined" && element.nodeName.toLowerCase() == "img") {
            var url = $(element).attr("src");
        }

        if (url.indexOf("gradient") == -1) {
            url = url.replace(/url\(\"/g, "");
            url = url.replace(/url\(/g, "");
            url = url.replace(/\"\)/g, "");
            url = url.replace(/\)/g, "");

            var urls = url.split(", ");

            for (var i = 0; i < urls.length; i++) {
                if (urls[i].length > 0) {
                    var extra = "";
                    if ($.browser.msie && $.browser.version < 9) {
                        extra = "?" + Math.floor(Math.random() * 3000);
                    }
                    qLimages.push(urls[i] + extra);
                }
            }
        }
    }

    $.fn.queryLoader2 = function(options) {
        if(options) {
            $.extend(qLoptions, options );
        }

        this.each(function() {
            findImageInElement(this);
            if (qLoptions.deepSearch == true) {
                $(this).find("*:not(script)").each(function() {
                    findImageInElement(this);
                });
            }
        });
		
        afterEach();

        return this;
    };

})(jQuery);