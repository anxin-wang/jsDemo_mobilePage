var host="http://i.e-doctor.cn/api/",photo_id="";function getToken(){var a=location.hash;return a.slice(a.indexOf("token")).slice(6)}function getTopicId(){var a=location.hash;return a.slice(a.indexOf("topicid"),a.indexOf("topicname")-1).slice(8)}function getTopicName(){var a=location.hash;return a.slice(a.indexOf("topicname"),a.indexOf("token")-1).slice(10)}function getMode(){var a=location.hash;return a.slice(a.indexOf("mode"),a.lastIndexOf("&")).slice(5)}
function getUserId(){var a=location.hash;return a.slice(a.indexOf("userid"),a.indexOf("mode")-1).slice(7)}function getTweetId(){var a=location.hash;return a.slice(a.indexOf("tweetid"),a.indexOf("&")).slice(8)}function noConnectionToNetwork(a,b){$(".mask").hide();b=="error"&&alert("\u65e0\u6cd5\u8fde\u63a5\u670d\u52a1\u5668\n\u8bf7\u786e\u8ba4\u624b\u673a\u5df2\u8fde\u5165\u7f51\u7edc\uff0c\u91cd\u65b0\u6253\u5f00\u7a0b\u5e8f\u518d\u8bd5",alertDismissed,"\u63d0\u793a")}
function setFooterNavToken(a){$(".nav-home").attr("href","home.html?token="+a);$(".nav-message").attr("href","message.html?token="+a);$(".nav-profile").attr("href","profile.html?token="+a);$(".nav-more").attr("href","more.html?token="+a)}function alertDismissed(){}
function removeLocalStorageArticle(){window.localStorage.removeItem("article_id");window.localStorage.removeItem("article_avatar");window.localStorage.removeItem("article_name");window.localStorage.removeItem("article_content");window.localStorage.removeItem("article_thumb");window.localStorage.removeItem("article_parenttweet_name");window.localStorage.removeItem("article_parenttweet_content");window.localStorage.removeItem("article_parenttweet_thumb");window.localStorage.removeItem("article_bigpic");
window.localStorage.removeItem("article_parenttweet_bigpic")}function filter_Tags(a){var b=a.match(/<a[^>]*>.*?<\/a>/ig);if(b!=null&&b.length>0)for(var d=0;d<b.length;d++)var f=b[d].slice(b[d].indexOf(">")+1,b[d].indexOf("</a>")),c=a.indexOf(b[d]),i=a.slice(0,c),a=a.slice(c+b[d].length),a=i+f+a;return a}function preventBehavior(a){a.preventDefault()}document.addEventListener("touchmove",preventBehavior,!1);
function uploadFile(a){var b=new FileUploadOptions,d={};d.token=getToken();b.params=d;(new FileTransfer).upload(a,host+"/upload/tweet_photo",function(b){photo_id=eval("("+b.response+")").tweet_photo_id;$("#uploadedPicture").show().attr("src",a);$("#content").val()==""&&($("#content").val("\u5206\u4eab\u56fe\u7247"),$("#content").focus())},function(){navigator.notification.alert("\u54ce\u5440\uff0c\u53d1\u9001\u56fe\u7247\u51fa\u9519\u4e86\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01",alertDismissed,
"\u63d0\u793a")},b)}function captureSuccess(a){var b,d;b=0;for(d=a.length;b<d;b+=1)uploadFile(a[b])}function captureError(a){navigator.notification.alert("An error occurred during capture: "+a.code,null,"Uh oh!")}
$("#loginPage").live("pagecreate",function(){$(".mask").hide();$("#name").val(window.localStorage.getItem("mobile"));$("#password").val(window.localStorage.getItem("password"));$("#login-btn").click(function(a){a.preventDefault();var b=$("#name").val().trim(),d=$("#password").val().trim();b==""||d==""?navigator.notification.alert("\u7528\u6237\u540d\u548c\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a",alertDismissed,"\u63d0\u793a"):($(".mask").ajaxStart(function(){$("p",this).text("\u6b63\u5728\u767b\u5f55\u4e2d");
$(this).show()}),$.ajax({url:host+"account/verify_credentials",data:{mobile:b,password:d},success:function(a){$(".mask").hide();a.error&&a.error=="invalid mobile"?navigator.notification.alert("\u7528\u6237\u540d\u548c\u5bc6\u7801\u4e0d\u6b63\u786e",alertDismissed,"\u63d0\u793a"):a.token&&(window.localStorage.setItem("mobile",b),window.localStorage.setItem("password",d),window.localStorage.setItem("username",a.username),window.localStorage.setItem("userid",a.user_id),window.localStorage.setItem("my_userid",
a.user_id),$.mobile.changePage("./home.html?token="+a.token,{transition:"slideup"}))},error:noConnectionToNetwork,dataType:"json"}))})});
$("#homePage").live("pagebeforeshow",function(){var a=getToken();setFooterNavToken(a);$("h1",this).text(window.localStorage.getItem("username"));$(".mask").ajaxStart(function(){$(".refresh-btn").addClass("hidebutton");$(".loading-btn").removeClass("hidebutton");$(this).show()});$(".new-weibo-btn").attr("href","newweibo.html?token="+a);$(".refresh-btn").click(function(b){b.preventDefault();$("#scroller").html("");$.ajax({url:host+"statuses/index",data:{token:a,page:1},success:function(b){b.error?(navigator.notification.alert("\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u540e\u518d\u8bd5\uff01\n\u70b9\u51fb\u786e\u5b9a\u540e\u91cd\u65b0\u767b\u5f55\u3002",
alertDismissed,"\u63d0\u793a"),$.mobile.changePage("index.html",{transition:"slidedown"})):($(".refresh-btn").removeClass("hidebutton"),$(".loading-btn").addClass("hidebutton"),$(".mask").hide(),$("#scroller").weibolist(b.list,{uid:a}))},error:noConnectionToNetwork,dataType:"json"})});$(".refresh-btn").trigger("click")});
$("#mention").live("pagebeforeshow",function(){var a=getToken();setFooterNavToken(a);$(".mask").show();$.ajax({url:host+"statuses/mentions",data:{token:a,page:1},success:function(a){a.error?(navigator.notification.alert("\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u540e\u518d\u8bd5\uff01\n\u70b9\u51fb\u786e\u5b9a\u540e\u91cd\u65b0\u767b\u5f55\u3002",alertDismissed,"\u63d0\u793a"),$.mobile.changePage("index.html",{transition:"slidedown"})):($(".mask").hide(),$("#scroller").weibolist(a.list))},
error:noConnectionToNetwork,dataType:"json"})});$("#more").live("pagebeforeshow",function(){myScroll=new iScroll("scroller");var a=getToken();setFooterNavToken(a);$("#logout-btn").click(function(b){b.preventDefault();$.ajax({url:host+"account/end_session",data:{token:a},success:function(){window.localStorage.clear();location.href="./index.html"},error:noConnectionToNetwork,dataType:"json"})})});
$("#newweibo").live("pagebeforeshow",function(){$(".camera-menu-container").hide();$(".mask").hide();$("#uploadedPicture").hide();var a=getToken(),b=getMode();if(b)b=="resend"?($("#newweibofooter",this).hide(),$("#content").css("height",400),$(".article-header").text("\u8f6c\u53d1\u5fae\u535a"),$("#content").val(window.localStorage.getItem("resend_content")),window.localStorage.removeItem("resend_content"),$(".send-btn").click(function(){var b=$("#content").val();$(".mask").ajaxStart(function(){$("p",
this).text("\u6b63\u5728\u53d1\u9001");$(this).show()});$.ajax({url:host+"statuses/update",type:"post",data:{content:b,tweet_photo_id:photo_id||void 0,token:a,created_from:"iPhone\u5ba2\u6237\u7aef",content_type:1},success:function(c){c.error?(navigator.notification.alert("\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u540e\u518d\u8bd5\uff01\n\u70b9\u51fb\u786e\u5b9a\u540e\u91cd\u65b0\u767b\u5f55\u3002",alertDismissed,"\u63d0\u793a"),$.mobile.changePage("index.html",{transition:"slidedown"})):
c.update&&(removeLocalStorageArticle(),$(".mask").hide(),$.mobile.changePage("./home.html?token="+a,{transition:"slideup"}))},error:noConnectionToNetwork,dataType:"json"})})):b=="comment"&&($("#newweibofooter",this).hide(),$("#content").css("height",400),$(".article-header").text("\u53d1\u8868\u8bc4\u8bba"),$(".send-btn").click(function(){var b=$("#content").val(),c=getTweetId(),d=getUserId();$(".mask").ajaxStart(function(){$("p",this).text("\u6b63\u5728\u53d1\u9001");$(this).show()});$.ajax({url:host+
"statuses/reply",type:"post",data:{content:b,parent_tweet_id:c,id:c,root_tweet_id:c,user_id:d,tweet_photo_id:photo_id||void 0,token:a,created_from:"iPhone\u5ba2\u6237\u7aef",content_type:2},success:function(c){c.error?(navigator.notification.alert("\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u540e\u518d\u8bd5\uff01\n\u70b9\u51fb\u786e\u5b9a\u540e\u91cd\u65b0\u767b\u5f55\u3002",alertDismissed,"\u63d0\u793a"),$.mobile.changePage("index.html",{transition:"slidedown"})):c.update&&
(removeLocalStorageArticle(),$(".mask").hide(),$.mobile.changePage("./home.html?token="+a,{transition:"slideup"}))},error:noConnectionToNetwork,dataType:"json"})}));else{$("#newweibo .back-btn").attr("href","home.html?token="+a);$("#newweibo .back-btn").removeAttr("data-rel");var b=window.localStorage.getItem("original_content")==void 0?"":window.localStorage.getItem("original_content"),d=window.localStorage.getItem("topic")==void 0?"":window.localStorage.getItem("topic");b+=d;window.localStorage.removeItem("original_content");
$("#content").val(b);window.localStorage.removeItem("topic");b="";$(".article-header").text("\u53d1\u8868\u65b0\u5fae\u535a");$(".send-btn").click(function(){var b=$("#content").val();b==""?alert("\u8bf7\u8f93\u5165\u5fae\u535a\u5185\u5bb9\u540e\u518d\u70b9\u51fb\u53d1\u9001\uff01"):($(".mask").ajaxStart(function(){$(".send-btn").addClass("hidebutton");$(".loading-btn").removeClass("hidebutton");$("p",this).text("\u6b63\u5728\u53d1\u9001");$(this).show()}),$.ajax({url:host+"statuses/update",type:"post",
data:{content:b,tweet_photo_id:photo_id||void 0,token:a,created_from:"iPhone\u5ba2\u6237\u7aef"},success:function(c){photo_id=void 0;c.error?(navigator.notification.alert("\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u540e\u518d\u8bd5\uff01\n\u70b9\u51fb\u786e\u5b9a\u540e\u91cd\u65b0\u767b\u5f55\u3002",alertDismissed,"\u63d0\u793a"),$.mobile.changePage("index.html",{transition:"slidedown"})):($(".send-btn").removeClass("hidebutton"),$(".loading-btn").addClass("hidebutton"),
$(".mask").hide(),c.update&&$.mobile.changePage("./home.html?token="+a,{transition:"slideup"}))},error:noConnectionToNetwork,dataType:"json"}))})}$("#nav-camera").click(function(){navigator.camera.getPicture(uploadFile,function(){},{quality:25,destinationType:navigator.camera.DestinationType.FILE_URI,sourceType:navigator.camera.PictureSourceType.CAMERA})});$("#nav-photo-library").click(function(){navigator.camera.getPicture(uploadFile,function(){},{quality:25,destinationType:navigator.camera.DestinationType.FILE_URI,
sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY})});$("#nav-newweibo-topic").click(function(){window.localStorage.setItem("original_content",$("#content").val());$.mobile.changePage("topic.html?token="+a,{transition:"slidedown"})});$("#nav-at").click(function(){window.localStorage.setItem("original_content",$("#content").val());$.mobile.changePage("friends.html?token="+a,{transition:"slidedown"})})});
$("#entire-article").live("pageshow",function(){var a=getToken(),b=window.localStorage.getItem("author_id"),d=window.localStorage.getItem("article_id"),f=window.localStorage.getItem("article_avatar"),c=window.localStorage.getItem("article_name"),i=window.localStorage.getItem("article_content"),h=window.localStorage.getItem("article_thumb"),g=window.localStorage.getItem("article_bigpic"),e=window.localStorage.getItem("article_parenttweet_name"),j=window.localStorage.getItem("article_parenttweet_content"),
m=window.localStorage.getItem("article_parenttweet_thumb"),p=window.localStorage.getItem("article_parenttweet_bigpic"),n,o=null;window.localStorage.getItem("topic_ids")!=null&&window.localStorage.getItem("topic_ids").length>0&&(n=window.localStorage.getItem("topic_ids").split(","));window.localStorage.getItem("article_parenttweet_topic_ids")!=null&&window.localStorage.getItem("article_parenttweet_topic_ids").length>0&&(o=window.localStorage.getItem("article_parenttweet_topic_ids").split(","));var k,
l=null;window.localStorage.getItem("article_atIds")!=null&&window.localStorage.getItem("article_atIds").length>0&&(k=window.localStorage.getItem("article_atIds").split(","),k.shift());window.localStorage.getItem("article_parenttweet_atIds")!=null&&window.localStorage.getItem("article_parenttweet_atIds").length>0&&(l=window.localStorage.getItem("article_parenttweet_atIds").split(","),l.shift());f&&$("#weibo-user-icon").attr("src",f);c&&$(".article-title").text(c);$("#pic-mask").click(function(){$(this).addClass("hide")});
i&&$(".article-body-words p").html(i);h&&($(".article-body-picture").append("<img src='"+h+"'/>"),$(".article-body-picture img").click(function(){$("#pic-mask img").attr("src",g);$("#pic-mask").removeClass("hide")}));e&&j?m?($(".weibo-article-source").append("<div class='weibo-article-source-top'></div><div class='weibo-article-source-middle'><p>"+e+":"+j+"</p><img src='"+m+"'/></div><div class='weibo-article-source-bottom'></div>"),$(".weibo-article-source-middle img").click(function(){$("#pic-mask img").attr("src",
p);$("#pic-mask").removeClass("hide")})):$(".weibo-article-source").append("<div class='weibo-article-source-top'></div><div class='weibo-article-source-middle'><p>"+e+":"+j+"</p></div><div class='weibo-article-source-bottom'></div>"):$(".weibo-article-source").hide();$(".back-btn").click(function(){removeLocalStorageArticle()});$("#nav-comment").click(function(){$.mobile.changePage("newweibo.html?tweetid="+d+"&userid="+b+"&mode=comment&token="+a,{transition:"slideup"})});$("#nav-resend").click(function(){var b=
"//@"+c+":"+filter_Tags(i);window.localStorage.setItem("resend_content",b);$.mobile.changePage("newweibo.html?mode=resend&token="+a,{transition:"slideup"})});new iScroll("scroller");$(".article-body-words a").each(function(a,c){$(c).text().indexOf("@")>=0?($(c).attr("at_id",k.shift()),$(c).addClass("at_link")):$(c).attr("topic_id",n[a])});$(".weibo-article-source a").each(function(a,c){$(c).text().indexOf("@")>=0&&($(c).attr("at_id",l.shift()),$(c).addClass("at_link"));$(c).attr("topic_id",o[a])});
$(".article-body-words a,.weibo-article-source a").bind("click",function(c){if($(this).hasClass("at_link")){var b=$(this).attr("at_id");c.preventDefault();c=$(this).text().slice(1);alert(c);$(this).attr("href","#");window.localStorage.setItem("atName",c);removeLocalStorageArticle();window.localStorage.setItem("userid",b);$.mobile.changePage("profile.html?token="+a,{transition:"slideup"})}else b=$(this).attr("topic_id"),c.preventDefault(),c=$(this).text().slice(1,$(this).text().lastIndexOf("#")),$(this).attr("href",
"#"),window.localStorage.setItem("topicname",c),removeLocalStorageArticle(),$.mobile.changePage("topiclist.html?topicid="+b+"&topicname="+c+"&token="+a,{transition:"slideup"})})});
$("#my-topic").live("pagebeforeshow",function(){$(".topic-list-item").die("click");var a=getToken();$.ajax({url:host+"statuses/group_list",type:"get",data:{token:a},success:function(a){var d="";$.each(a.list,function(a,c){d=d+'<li class="topic-list-item" id="'+c.id+'"><a href="#">#'+c.name+"#</a>("+c.count+")</li>"});$("#topiclist").append(d)},error:noConnectionToNetwork,dataType:"json"});new iScroll("scroller");$(".topic-list-item").live("click",function(b){b.preventDefault();$.mobile.changePage("newweibo.html?token="+
a,{transition:"slidedown"});b=$(this).find("a").text();window.localStorage.setItem("topic",b)})});
$("#topiclist").live("pagebeforeshow",function(){var a=getToken();setFooterNavToken(a);var b=getTopicId(),d=window.localStorage.getItem("topicname");$("h1",this).text(d);$.ajax({url:host+"statuses/group",data:{token:a,id:b},success:function(b){b.error?(navigator.notification.alert("\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u540e\u518d\u8bd5\uff01\n\u70b9\u51fb\u786e\u5b9a\u540e\u91cd\u65b0\u767b\u5f55\u3002",alertDismissed,"\u63d0\u793a"),$.mobile.changePage("index.html",
{transition:"slidedown"})):($(".refresh-btn").removeClass("hidebutton"),$(".loading-btn").addClass("hidebutton"),$(".mask").hide(),$("#scroller").weibolist(b.list,{uid:a}))},error:noConnectionToNetwork,dataType:"json"})});
$("#friends").live("pagebeforeshow",function(){$(".topic-list-item").die("click");var a=getToken();$(".mask").ajaxStart(function(){$(".refresh-btn").addClass("hidebutton");$(this).show()});$.ajax({url:host+"friends/ids",type:"get",data:{token:a},success:function(a){$(".refresh-btn").removeClass("hidebutton");$(".mask").hide();var d="";$.each(a,function(a,c){d=d+'<li class="topic-list-item" id="'+c.id+'"><a href="#">'+c.name+"</a></li>"});$("#friendslist").append(d)},error:noConnectionToNetwork,dataType:"json"});
new iScroll("scroller");$(".topic-list-item").live("click",function(b){b.preventDefault();$.mobile.changePage("newweibo.html?token="+a,{transition:"slidedown"});b="@"+$(this).find("a").text();window.localStorage.setItem("topic",b)})});$("#profile").live("pagebeforehide",function(){window.localStorage.setItem("userid",window.localStorage.getItem("my_userid"))});
$("#profile").live("pagebeforeshow",function(){var a=getToken();setFooterNavToken(a);$(".mask").show();$.ajax({url:host+"users/"+window.localStorage.getItem("userid"),data:{token:a},success:function(a){if(a.error)navigator.notification.alert("\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u540e\u518d\u8bd5\uff01\n\u70b9\u51fb\u786e\u5b9a\u540e\u91cd\u65b0\u767b\u5f55\u3002",alertDismissed,"\u63d0\u793a"),$.mobile.changePage("index.html",{transition:"slidedown"});else{$(".mask").hide();
$(".profile-h1").text(a.display_name+"\u8d44\u6599");$(".myprofile-header img").attr("src",a.avatar);$(".myprofile-username").text(a.display_name);$("#myprofile-follows").text(a.follows);$("#myprofile-fans").text(a.fans);$("#myprofile-tweets").text(a.tweets);$("#myprofile-topic").text("0");var d="",f;for(f in a.profiles)if(f=="\u804c\u4f4d"||f=="\u90e8\u95e8"||f=="\u624b\u673a")d=d+'<li class="myprofile-item ui-li ui-li-static ui-body-c">'+f+":"+a.profiles[f]+"</li>";$("#myprofile-list").append(d)}},
error:noConnectionToNetwork,dataType:"json"})});(function(a){function b(a){var b=a.match(/<a[^>]*>.*?<\/a>/ig);if(b!=null&&b.length>0)for(var d=0;d<b.length;d++)var g=b[d].slice(b[d].indexOf(">")+1,b[d].indexOf("</a>")),e=a.indexOf(b[d]),j=a.slice(0,e),a=a.slice(e+b[d].length),a=j+g+a;return a}function d(a){a=a.match(/<a[^>]*>.*?<\/a>/ig);if(a!=null&&a!=void 0&&a.length>0){for(var b="",d=0;d<a.length;d++){var g=a[d].match(/\/users\/(\d+)\/tweets[^@]+@\S+<\/a/);g!=null&&g!=void 0&&g.length>0&&(b=b+","+g[1])}return b}}function f(c,f,h){var g=c.created_at,
g=g.slice(0,g.lastIndexOf(" ")),e='<div class="weibo-list-item" id="'+c.id+'"><div class="weibo-user-icon">';c.avatar&&(e=e+'<img src="'+c.avatar+'"/>');c.name&&(e=e+'<p class="weibo-user-name">'+c.name+"</p>");e+='</div><div class="weibo-content">';e+='<div class="weibo-short-article" >';c.content&&(e=e+"<p>"+b(c.content)+"</p>");e+="</div>";c.thumb&&(e=e+'<div class="weibo-image"><img width="60" height="auto" src="'+c.thumb+'"/></div>');c.parent_tweet&&(e=e+'<div class="weibo-article-source"><div class="weibo-article-source-top"></div><div class="weibo-article-source-middle"><p>'+
c.parent_tweet.name+":"+b(c.parent_tweet.content)+"</p>",c.parent_tweet.thumb&&(e=e+'<img width="60" height="auto" src="'+c.parent_tweet.thumb+'"/>'),e+='</div><div class="weibo-article-source-bottom"></div></div>');e=e+'</div><div class="weibo-information"><p class="weibo-time">'+g+"</p></div></div>";e+='<div class="weibo-list-item-bottom"></div>';f.append(e);f.find(".weibo-list-item").last().click(function(){window.localStorage.setItem("author_id",c.author_id);window.localStorage.setItem("article_id",
c.id);c.avatar&&window.localStorage.setItem("article_avatar",c.avatar);c.name&&window.localStorage.setItem("article_name",c.name);c.topic_ids&&window.localStorage.setItem("topic_ids",c.topic_ids);if(c.content){var b=d(c.content);b!=null&&b!=void 0&&window.localStorage.setItem("article_atIds",b);window.localStorage.setItem("article_content",c.content)}c.thumb&&window.localStorage.setItem("article_thumb",c.thumb);c.pagesize&&window.localStorage.setItem("article_bigpic",c.pagesize);c.parent_tweet&&(b=
d(c.parent_tweet.content),b!=null&&b!=void 0&&window.localStorage.setItem("article_parenttweet_atIds",b),window.localStorage.setItem("article_parenttweet_name",c.parent_tweet.name),window.localStorage.setItem("article_parenttweet_content",c.parent_tweet.content),c.parent_tweet.thumb&&window.localStorage.setItem("article_parenttweet_thumb",c.parent_tweet.thumb),c.parent_tweet.pagesize&&window.localStorage.setItem("article_parenttweet_bigpic",c.parent_tweet.pagesize),c.parent_tweet.topic_ids&&window.localStorage.setItem("article_parenttweet_topic_ids",
c.parent_tweet.topic_ids));a.mobile.changePage("./article.html?token="+h.uid)})}a.fn.weibolist=function(b,d){var h=a.extend({},a.fn.weibolist.defaults,d);return this.each(function(){var d=a(this);a.each(b,function(a,b){f(b,d,h)});new iScroll(this)})}})(jQuery);
