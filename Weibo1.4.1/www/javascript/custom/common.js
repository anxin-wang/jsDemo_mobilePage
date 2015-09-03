var host = "http://i.e-doctor.cn/api/";
//var host = "http://localhost:3000/api/";
var photo_id = '';
// alert dialog dismissed
function alertDismissed() {
	// do something
}
/**************************************************************从url中获取值****************************************/
function getToken() {
    //由于jQuery改写了url，所以从location.search获取不到任何值
	var hash = location.hash;
	var uid = hash.slice(hash.indexOf("token")).slice(6);
    
	return uid;
}
function getSource() {
    //由于jQuery改写了url，所以从location.search获取不到任何值
	var hash = location.hash;
	var uid = hash.slice(hash.indexOf("source"),hash.indexOf("token")-1).slice(7);
	return uid;
}

function getTopicId() {
	var hash = location.hash;
	var topic_id = hash.slice(hash.indexOf("topicid"),hash.indexOf("topicname")-1).slice(8);
	
	return topic_id;
}

function getTopicName() {
	var hash = location.hash;
	var topic_name = hash.slice(hash.indexOf("topicname"),hash.indexOf("token")-1).slice(10);
	
	return topic_name;
}
function getMode() {
	var hash = location.hash;
	var mode = hash.slice(hash.indexOf("mode"), hash.lastIndexOf("&")).slice(5);
	return mode;
}
function getUserId() {
    var hash = location.hash;
    var mode = hash.slice(hash.indexOf("userid"), hash.indexOf("mode")-1).slice(7);
    return mode;
}
function getTweetId() {
	var hash = location.hash;
	var tweet_id = hash.slice(hash.indexOf("tweetid"), hash.indexOf("&")).slice(8);
	return tweet_id;
}
/**************************************************************EOF 从url中获取值****************************************/
//ajax error的处理函数
function noConnectionToNetwork(jqXHR, textStatus, errorThrown){
    $('.mask').hide();
    if(textStatus=='error'){
        alert('无法连接服务器\n请确认手机已连入网络，重新打开程序再试', alertDismissed, '提示');
    }
 }
//统一设置底部nav url
function setFooterNavToken(uid) {
	$(".nav-home").attr("href", "home.html?token=" + uid);
	$(".nav-message").attr("href", "message.html?token=" + uid);
	$(".nav-profile").attr("href","profile.html?token="+uid);
	//$(".nav-topic").attr("href","topic.html?token="+uid);
	$(".nav-more").attr("href", "more.html?token=" + uid);
}


//移除article页面的单篇文章
function removeLocalStorageArticle() {
	window.localStorage.removeItem("article_id");
	window.localStorage.removeItem("article_avatar");
	window.localStorage.removeItem("article_name");
	window.localStorage.removeItem("article_content");
	window.localStorage.removeItem("article_thumb");
	window.localStorage.removeItem("article_parenttweet_name");
	window.localStorage.removeItem("article_parenttweet_content");
    window.localStorage.removeItem("article_parenttweet_thumb");
	window.localStorage.removeItem("article_bigpic");
    window.localStorage.removeItem("article_parenttweet_bigpic");      
}
//article页面转发文章时需要去掉文章内的a标签，应该放在工具类中
function filter_Tags(content){		
		var strarray=content.match(/<a[^>]*>.*?<\/a>/ig);	    	
				if(strarray!=null && strarray.length>0){
					for(var i=0;i<strarray.length;i++)
					{
						var result=strarray[i].slice(strarray[i].indexOf(">")+1,strarray[i].indexOf("</a>"));
					    var end=content.indexOf(strarray[i])					    
					    var before=content.slice(0,end);
					    var after=content.slice(end+strarray[i].length);
					    content=before+result+after;
					}					
				}
		return content;
}
//防止页面被拖动
function preventBehavior(e) {
	e.preventDefault();
};
document.addEventListener("touchmove", preventBehavior, false);

// 拍照片并Upload files to server
function uploadFile(imageURI) {
	//Set option
	var options = new FileUploadOptions();
	var params = new Object();
	params.token = getToken();
	options.params = params;
	//FileTranser Object
	var ft = new FileTransfer();
	ft.upload(imageURI, host + "/upload/tweet_photo", function(result) {
		//console.log('Upload success: ' + result.response);
		//console.log(result.bytesSent + ' bytes sent');
		//window.localStorage.setItem("mobile", name);
		var resp = eval("(" + result.response + ")");
		photo_id = resp.tweet_photo_id;
        $("#uploadedPicture").show().attr("src",imageURI);
		if($("#content").val() == '') {
			$("#content").val("分享图片");
			$("#content").focus();
		}
	}, function(error) {
			navigator.notification.alert('哎呀，发送图片出错了，请稍后再试！', alertDismissed, '提示');
			
			//console.log('Error uploading file ' + path + ': ' + error.code);
	}, options);
}

// Called when capture operation is finished
function captureSuccess(mediaFiles) {
	var i, len;
	for( i = 0, len = mediaFiles.length; i < len; i += 1) {
		uploadFile(mediaFiles[i]);
	}
}
// Called if something bad happens.
//
function captureError(error) {
	var msg = 'An error occurred during capture: ' + error.code;
	navigator.notification.alert(msg, null, 'Uh oh!');
}

/*********************************************login***********************************************/

$("#loginPage").live("pagecreate", function() {
    //Todo:Mask的统一加入写成一个类
	$('.mask').hide();
    //读取本地存储中已有的，假如已经登录过的话
	$("#name").val(window.localStorage.getItem("mobile"));
	$("#password").val(window.localStorage.getItem("password"));
    //点击Login按钮，登录系统
	$("#login-btn").click(function(e) {
		e.preventDefault();
		var name = $("#name").val().trim(), password = $("#password").val().trim();
        //错误判断
		if((name == "") || (password == "")) {
			navigator.notification.alert('用户名和密码不能为空', alertDismissed, '提示');
		} else {
			$('.mask').ajaxStart(function() {				
				$("p", this).text('正在登录中');
				$(this).show();
        });
            $.ajax({
  			  url: host + "account/verify_credentials",
			  data: {
					mobile : name,
					password : password
                }, 
			  success: function(data,testStatus,jqXHR) {
							$('.mask').hide();
							if((data.error) && (data.error == "invalid mobile")) {
								navigator.notification.alert('用户名和密码不正确', alertDismissed, '提示');
							} else if(data.token) {
								window.localStorage.setItem("mobile", name);
								window.localStorage.setItem("password", password);
								window.localStorage.setItem("username", data.username);
								window.localStorage.setItem("userid", data.user_id);
								window.localStorage.setItem("my_userid",data.user_id);
								$.mobile.changePage("./home.html?token=" + data.token, {
									transition : "slideup"
								})
								//location.href="./home.html?token="+data.token;
							}
						},
				error:noConnectionToNetwork,
			  dataType: "json"
			});
		}
	})
})
/**********************************************************home*************************************************/

$("#homePage").live("pagebeforeshow", function() {
	//pagecreate获取不到uid
	//
    
	var uid = getToken();
	setFooterNavToken(uid);
	

	$("h1", this).text(window.localStorage.getItem("username"));
//	$.ajax({
//	  url: host + "statuses/index",
//	  data: {
//		 token : uid,
//		 page : 1
//	  }, 
//	  success: function(data) {
//			if(data.error) {
//				navigator.notification.alert('哎呀，出错了，请重新登录后再试！\n点击确定后重新登录。', alertDismissed, '提示');
//				$.mobile.changePage("index.html", {
//					transition : "slidedown"
//				})
//			} else {
//				$(".refresh-btn").removeClass("hidebutton");
//			    $(".loading-btn").addClass("hidebutton");
//			    $('.mask').hide();
//				$("#scroller").weibolist(data.list, {
//					"uid" : uid
//				});
//			}
//		},
//		error:noConnectionToNetwork,
//	  dataType: "json"
//	});
			
			
	
	$('.mask').ajaxStart(function() {
		$(".refresh-btn").addClass("hidebutton");
		$(".loading-btn").removeClass("hidebutton");
		
		$(this).show();
	});
	$(".new-weibo-btn").attr("href", "newweibo.html?token=" + uid);
	//$(".arrow-btn").attr("href","profile.html?token="+uid);
	//$(".refresh-btn").attr("href", "home.html?token=" + uid);
	//$(".refresh-btn").attr("reloadPage", true);
	$(".refresh-btn").click(function(e) {
		e.preventDefault();
		$("#scroller").html('');
		
		$.ajax({
		  url: host + "statuses/index",
		  data: {
			 token : uid,
			 page : 1
		  }, 
          success: function(data) {
				if(data.error) {
					navigator.notification.alert('哎呀，出错了，请重新登录后再试！\n点击确定后重新登录。', alertDismissed, '提示');
					$.mobile.changePage("index.html", {
						transition : "slidedown"
					})
				} else {
					$(".refresh-btn").removeClass("hidebutton");
				    $(".loading-btn").addClass("hidebutton");
				    $('.mask').hide();
					$("#scroller").weibolist(data.list, {
						"uid" : uid,
                        "source":"homelist"
					});
                  
                  
				}
			},
			error:noConnectionToNetwork,
		  dataType: "json"
		});
	});
    
    $(".refresh-btn").trigger('click');
       
    
});
/*****************************************************message********************************************/
$("#mention").live("pagebeforeshow", function() {
	//myScroll = new iScroll('scroller');
	var uid = getToken();
	setFooterNavToken(uid);
    $('.mask').show();
	$.ajax({
		  url: host + "statuses/mentions",
		  data: {
			 token : uid,
			 page : 1
		  }, 
		  success: function(data) {
				if(data.error) {
						navigator.notification.alert('哎呀，出错了，请重新登录后再试！\n点击确定后重新登录。', alertDismissed, '提示');
						$.mobile.changePage("index.html", {
							transition : "slidedown"
						})
				} else {
                    $('.mask').hide();
					$("#scroller").weibolist(data.list);
				}
			},
			error:noConnectionToNetwork,
		  dataType: "json"
		});
})
/*****************************************************more***********************************************/

$("#more").live("pagebeforeshow", function() {
	myScroll = new iScroll('scroller');

	var uid = getToken();
	setFooterNavToken(uid);
	$("#logout-btn").click(function(e) {

		e.preventDefault();
		$.ajax({
		  url: host + "account/end_session",
		  data: {
			token : uid
		  }, 
		  success: function(data) {
			//if(data.status) {
				window.localStorage.clear();
				location.href = "./index.html";
				//这里不能换成changePage
			//}
		  },
		  error:noConnectionToNetwork,
		  dataType: "json"
		});
	});
})
//***********************************************newweibo*****************************************/
//$("#newweibo").live("pagehide", function() {
//    $("#nav-photo-library").die('click');
//    $("#nav-camera").die('click');
//    $("#nav-newweibo-topic").die('click');
//})
$("#newweibo").live("pagebeforeshow", function() {
	$(".camera-menu-container").hide();
	$('.mask').hide();
	$("#uploadedPicture").hide();
	var uid = getToken();
    
	var mode = getMode();
	//发送新微博
	if(!mode) {
        $("#newweibo .back-btn").attr("href", "home.html?token=" + uid);
        $("#newweibo .back-btn").removeAttr("data-rel");
        var original_content=window.localStorage.getItem("original_content")== undefined ? '' : window.localStorage.getItem("original_content")
        var topic_content=window.localStorage.getItem("topic")== undefined ? '' : window.localStorage.getItem("topic")
		var topic=original_content+topic_content;
        //var topic=window.localStorage.getItem("topic")+window.localStorage.getItem("original_content");
        window.localStorage.removeItem("original_content")
		//if(topic!==undefined && topic!="" & topic !=null){
       
			$("#content").val(topic);
			window.localStorage.removeItem("topic");
			topic="";
		//}
		$(".article-header").text("发表新微博");
		//发送按钮
		$(".send-btn").click(function() {
            var content = $("#content").val();
            if(content==""){
                alert("请输入微博内容后再点击发送！");
            }
            else{
                $('.mask').ajaxStart(function() {
                    $(".send-btn").addClass("hidebutton");
                    $(".loading-btn").removeClass("hidebutton");
                    $("p", this).text('正在发送');
                    $(this).show();
                });
                $.ajax({
                    url: host + "statuses/update",
                    type:'post',
                    data: {
                        content : content,
                        tweet_photo_id : photo_id || undefined,
                        token : uid,
                        created_from : 'iPhone客户端'
                    }, 
                    success: function(data) {
                        photo_id=undefined;
                        if(data.error) {
                            navigator.notification.alert('哎呀，出错了，请重新登录后再试！\n点击确定后重新登录。', alertDismissed, '提示');
                            $.mobile.changePage("index.html", {
                                transition : "slidedown"
                            })
                        } else {
                            $(".send-btn").removeClass("hidebutton");
                            $(".loading-btn").addClass("hidebutton");
                            $('.mask').hide();
                            if(data.update) {
                                $.mobile.changePage("./home.html?token=" + uid, {
                                    transition : "slideup"
                                })
                            }
                        }
                    },
                    error:noConnectionToNetwork,
                    dataType: "json"
                });
            }
			
		})
	}
	//转发
	else if(mode == "resend") {
        //$("#newweibo .back-btn").attr("href", "newweibo.html?token=" + uid);
        $("#newweibofooter",this).hide();
        $("#content").css("height",400);
		$(".article-header").text("转发微博");
		//发送按钮
		//$(".new-weibo-btn").attr("href", "newweibo.html?token=" + uid);
		$("#content").val(window.localStorage.getItem("resend_content"));
		window.localStorage.removeItem("resend_content")
		$(".send-btn").click(function() {
			var content = $("#content").val();
			$('.mask').ajaxStart(function() {
				$("p", this).text('正在发送');
				$(this).show();
			});
			$.ajax({
			  url: host + "statuses/update",
              type:'post',
			  data: {
				content : content,
				tweet_photo_id : photo_id || undefined,
				token : uid,
				created_from : 'iPhone客户端',
                content_type:1
			  }, 
			  success: function(data) {
				if(data.error) {
					navigator.notification.alert('哎呀，出错了，请重新登录后再试！\n点击确定后重新登录。', alertDismissed, '提示');
					$.mobile.changePage("index.html", {
						transition : "slidedown"
					})
				} else if(data.update) {
					removeLocalStorageArticle();
					$('.mask').hide();
					$.mobile.changePage("./home.html?token=" + uid, {
						transition : "slideup"
					})
				}
			},
			  error:noConnectionToNetwork,
			  dataType: "json"
			});
		})
	}
	//评论
	else if(mode == 'comment') {
        //$("#newweibo .back-btn").attr("href", "ar.html?token=" + uid);
        $("#newweibofooter",this).hide();
        $("#content").css("height",400);
		$(".article-header").text("发表评论");
		//发送按钮
		//$(".new-weibo-btn").attr("href", "newweibo.html?token=" + uid);
		$(".send-btn").click(function() {

			var content = $("#content").val();
			var tweet_id = getTweetId();
            var user_id = getUserId();
            
			$('.mask').ajaxStart(function() {
				$("p", this).text('正在发送');
				$(this).show();
			});
			$.ajax({
			  url: host + "statuses/reply",
              type:'post',
			  data: {
				content : content,
				parent_tweet_id : tweet_id,
                id : tweet_id,
                root_tweet_id : tweet_id,
                user_id:user_id,
				tweet_photo_id : photo_id || undefined,
				token : uid,
				created_from : 'iPhone客户端',
                content_type:2
			  }, 
			  success: function(data) {
				if(data.error) {
					navigator.notification.alert('哎呀，出错了，请重新登录后再试！\n点击确定后重新登录。', alertDismissed, '提示');
					$.mobile.changePage("index.html", {
						transition : "slidedown"
					})
				} else	if(data.update) {
					removeLocalStorageArticle();
					$('.mask').hide();
					$.mobile.changePage("./home.html?token=" + uid, {
						transition : "slideup"
					})
				}
			},
			  error:noConnectionToNetwork,
			  dataType: "json"
			});
		})
	}

	//相册菜单-从照片库中选择
	$("#nav-camera").click(function() {
		navigator.camera.getPicture(uploadFile, function(message) {
		}, {
			quality : 25,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType : navigator.camera.PictureSourceType.CAMERA
		});

	})
	$("#nav-photo-library").click(function() {
		navigator.camera.getPicture(uploadFile, function(message) {
		}, {
			quality : 25,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
		});

	})
    //话题
	$("#nav-newweibo-topic").click(function(){
		window.localStorage.setItem("original_content",$("#content").val());
		$.mobile.changePage("topic.html?token=" + uid, {
						transition : "slidedown"
		})
	})
	//@召唤
	$("#nav-at").click(function(){
		window.localStorage.setItem("original_content",$("#content").val());
		$.mobile.changePage("friends.html?token=" + uid, {
						transition : "slidedown"
		})
	})
})
/*************************************************article*****************************************/

$("#entire-article").live("pageshow", function() {
                                               
    var uid = getToken();
    var source=getSource();
    if(source=="topiclist"){
       $("#back-btn").remove();
       
    }
                          
    var user_id = window.localStorage.getItem("author_id");
	var tweet_id = window.localStorage.getItem("article_id");
	var avatar = window.localStorage.getItem("article_avatar");
	var name = window.localStorage.getItem("article_name");
	var content = window.localStorage.getItem("article_content");
	var thumb = window.localStorage.getItem("article_thumb");	
	var bigpic=window.localStorage.getItem("article_bigpic");
    //转发内容
    var parenttweet_name = window.localStorage.getItem("article_parenttweet_name");
    var parenttweet_content = window.localStorage.getItem("article_parenttweet_content");
    var parenttweet_thumb=window.localStorage.getItem("article_parenttweet_thumb");
    var parenttweet_bigpic=window.localStorage.getItem("article_parenttweet_bigpic");
    //话题id,@ id
    var topic_ids=null,parent_topic_ids=null;
    if(window.localStorage.getItem("topic_ids")!=null && window.localStorage.getItem("topic_ids").length>0){                      
        var topic_ids_str=window.localStorage.getItem("topic_ids");
                          console.log(topic_ids_str)
        if(topic_ids_str.indexOf(",")>=0){
              topic_ids=topic_ids_str.split(",");
        }else{
              topic_ids=new Array(topic_ids_str); 
                          
        }                          
    }
    if(window.localStorage.getItem("article_parenttweet_topic_ids")!=null && window.localStorage.getItem("article_parenttweet_topic_ids").length>0){    
        var parent_topic_ids_str=window.localStorage.getItem("article_parenttweet_topic_ids");
        if(parent_topic_ids_str.indexOf(",")>=0){
            parent_topic_ids=parent_topic_ids_str.split(",");
        }else{
                          
            parent_topic_ids=new Array(parent_topic_ids_str); 
                          console.log(parent_topic_ids);
        } 
    }
    var at_ids=null,parent_at_ids=null;
    if(window.localStorage.getItem("article_atIds")!=null && window.localStorage.getItem("article_atIds").length>0){
        at_ids = window.localStorage.getItem("article_atIds").split(",");
        at_ids.shift(); 
    }
    if(window.localStorage.getItem("article_parenttweet_atIds")!=null && window.localStorage.getItem("article_parenttweet_atIds").length>0){
        parent_at_ids=window.localStorage.getItem("article_parenttweet_atIds").split(","); 
        parent_at_ids.shift();                 
    }   
    
    //开始设置内容
	if(avatar) {
		$("#weibo-user-icon").attr("src", avatar);
	}
	if(name) {
		$(".article-title").text(name);
	}
    $("#pic-mask").click(function(){
        $(this).addClass("hide");
    })
	if(content) {
		$(".article-body-words p").html(content);
	}
	if(thumb) {
		$(".article-body-picture").append("<img src='"+thumb+"'/>");
        $(".article-body-picture img").click(function(){
            $("#pic-mask img").attr('src',bigpic);
            $("#pic-mask").removeClass("hide");
        })    
	}
	if(parenttweet_name && parenttweet_content) {
        if(parenttweet_thumb){
            $(".weibo-article-source").append("<div class='weibo-article-source-top'></div><div class='weibo-article-source-middle'><p>"+parenttweet_name + ":"+parenttweet_content+"</p><img src='"+parenttweet_thumb+"'/></div><div class='weibo-article-source-bottom'></div>");
            $(".weibo-article-source-middle img").click(function(){
                $("#pic-mask img").attr('src',parenttweet_bigpic);
                $("#pic-mask").removeClass("hide");
            })
        }		
        else{
            $(".weibo-article-source").append("<div class='weibo-article-source-top'></div><div class='weibo-article-source-middle'><p>"+parenttweet_name + ":"+parenttweet_content+"</p></div><div class='weibo-article-source-bottom'></div>");
        }
	} else {
		$(".weibo-article-source").hide();
	}
	$(".back-btn").click(function() {
		removeLocalStorageArticle();
	})
    //点击评论
	$("#nav-comment").click(function() {
		$.mobile.changePage("newweibo.html?tweetid=" + tweet_id + "&userid="+user_id+"&mode=comment" + "&token=" + uid, {
			transition : "slideup"
		})
	})
    //点击转发
	$("#nav-resend").click(function() {
		var resend_content = "//@" + name + ":" + filter_Tags(content);
		window.localStorage.setItem("resend_content", resend_content);
		$.mobile.changePage("newweibo.html?mode=resend&token=" + uid, {
			transition : "slideup"
		})
	})
    
	var myScroll = new iScroll("scroller");
    //将topic_id,@id加到正文链接上
  var link_index=0;
  $(".article-body-words a").each(function(index,item){
    
  	if($(item).text().indexOf("@")>=0){
  		$(item).attr("at_id",at_ids.shift())
  		$(item).addClass("at_link");
  	}else{
        //if(topic_ids!=null && topic_ids.length>0){
         $(item).attr("topic_id",topic_ids[link_index]);
         link_index++;
        //}
  		
  	}       
  })
    //将topic_id,@id加到转发链接上
  var parent_link_index=0;
  $(".weibo-article-source a").each(function(index,item){
  	if($(item).text().indexOf("@")>=0){
      $(item).attr("at_id",parent_at_ids.shift())
      $(item).addClass("at_link");
    }else{
      $(item).attr("topic_id",parent_topic_ids[parent_link_index]);
      parent_link_index++;
    } 
  })
  
  $(".article-body-words a,.weibo-article-source a").bind('click',function(e){
  	if($(this).hasClass("at_link")){
  		var at_id=$(this).attr("at_id");
                                                          
	    	e.preventDefault();
	    	var at_name=$(this).text().slice(1);
           
	    	$(this).attr("href","#");
	        window.localStorage.setItem("atName", at_name);
	        removeLocalStorageArticle();
	        window.localStorage.setItem("userid",at_id);
	    	$.mobile.changePage("profile.html?token=" + uid, {
				transition : "slideup"
			})
  	}else{                                                           
  		var topic_id=$(this).attr("topic_id");
	    	e.preventDefault();
	    	var topic_name=$(this).text().slice(1,$(this).text().lastIndexOf("#"));
	    	$(this).attr("href","#");
	        window.localStorage.setItem("topicname", topic_name);
	        //removeLocalStorageArticle();
	    	$.mobile.changePage("topiclist.html?topicid="+topic_id+"&topicname="+topic_name+"&token=" + uid, {
				transition : "slideup"
			})
  	}
       
  })
})
/*************************************************topic*****************************************/
$("#my-topic").live("pagebeforeshow", function() {
     $(".topic-list-item").die('click');
	 var uid = getToken();
	 $.ajax({
	   url: host + "statuses/group_list",
      type:'get', 
      data:{token : uid},
	   success: function(data) {			  	
	  	 //var li='<ul data-role="listview" data-theme="c"  data-filter="true" id="topiclist">';
	  	 var li="";
		$.each(data.list,function(index,item){
           
			li=li+'<li class="topic-list-item" id="'+item.id+'"><a href="#">#'+item.name+'#</a>('+item.count+')</li>';					
		})
		 //li=li+"</div></div>";
		 $("#topiclist").append(li);
         
	 },
	  error:noConnectionToNetwork,
	  dataType: "json"
	});
	var my_Scroll = new iScroll("scroller");
    $(".topic-list-item").live('click',function(e){
				e.preventDefault();
             
				$.mobile.changePage("newweibo.html?token=" + uid, {
						transition : "slidedown"
				})
				var content=$(this).find("a").text();
				window.localStorage.setItem("topic", content);
			})
})
/**********************************************************topiclist*************************************************/

$("#topiclist").live("pagebeforeshow", function() {
     
	 var uid = getToken();
     setFooterNavToken(uid);
     var topic_id=getTopicId();

	 var topic_name=window.localStorage.getItem("topicname");
     //window.localStorage.removeItem("topicname");
	 $("h1", this).text(topic_name);
	 $.ajax({
		  url: host + "statuses/group",
		  data: {
			 token : uid,
			 id : topic_id
		  }, 
          success: function(data) {
				if(data.error) {
					navigator.notification.alert('哎呀，出错了，请重新登录后再试！\n点击确定后重新登录。', alertDismissed, '提示');
					$.mobile.changePage("index.html", {
						transition : "slidedown"
					})
				} else {
					$(".refresh-btn").removeClass("hidebutton");
				    $(".loading-btn").addClass("hidebutton");
				    $('.mask').hide();
					$("#scroller").weibolist(data.list, {
						"uid" : uid,
                        "source":"topiclist"
					});
				}
			},
			error:noConnectionToNetwork,
		  dataType: "json"
		});
})
/*************************************************friendslist*****************************************/
$("#friends").live("pagebeforeshow", function() {
     $(".topic-list-item").die('click');
	 var uid = getToken();
	 $('.mask').ajaxStart(function() {
		$(".refresh-btn").addClass("hidebutton");		
		$(this).show();
	});
	 $.ajax({
	   url: host + "friends/ids",
       type:'get', 
       data:{token : uid},
	   success: function(data) {			  	
	  	 $(".refresh-btn").removeClass("hidebutton");
	     $('.mask').hide();
	  	 var li="";	  	 
		 $.each(data,function(index,item){           
			li=li+'<li class="topic-list-item" id="'+item.id+'"><a href="#">'+item.name+'</a></li>';						
		})		 
		 $("#friendslist").append(li);
	 },
	  error:noConnectionToNetwork,
	  dataType: "json"
	});
                   
	var my_Scroll = new iScroll("scroller");
    $(".topic-list-item").live('click',function(e){
				e.preventDefault();
				$.mobile.changePage("newweibo.html?token=" + uid, {
						transition : "slidedown"
				})
				var content="@"+$(this).find("a").text();
				window.localStorage.setItem("topic", content);
			})
})
$("#profile").live("pagebeforehide", function() { 
	window.localStorage.setItem("userid",window.localStorage.getItem("my_userid"));
})
/**********************************************************profile*************************************************/
$("#profile").live("pagebeforeshow", function() {     
	 var uid = getToken();
     setFooterNavToken(uid);
     $('.mask').show();
	 $.ajax({
		  url: host + "users/"+window.localStorage.getItem("userid"),
		  data: {
			 token : uid
		  }, 
          success: function(data) {
				if(data.error) {
					navigator.notification.alert('哎呀，出错了，请重新登录后再试！\n点击确定后重新登录。', alertDismissed, '提示');
					$.mobile.changePage("index.html", {
						transition : "slidedown"
					})
				} else {
                    $('.mask').hide();
					$(".profile-h1").text(data.display_name+"资料");
				    $(".myprofile-header img").attr("src",data.avatar);
				    $(".myprofile-username").text(data.display_name);
				    $("#myprofile-follows").text(data.follows);
				    $("#myprofile-fans").text(data.fans);
				    $("#myprofile-tweets").text(data.tweets);
				    $("#myprofile-topic").text("0");
				    
				    var li='';
				    for(var key in data.profiles){
				    	if(key=="职位" || key=="部门" || key=="手机")
				    	li=li+'<li class="myprofile-item ui-li ui-li-static ui-body-c">'+key+":"+data.profiles[key]+"</li>";
                    }
                    $("#myprofile-list").append(li)
					//Todo:还有几个值
				}
			},
			error:noConnectionToNetwork,
		  dataType: "json"
		});
})