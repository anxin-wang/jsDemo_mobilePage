;(function($) {
	$.fn.weibolist = function(data, options) {
		// Merge passed options with defaults
		var opts = $.extend({}, $.fn.weibolist.defaults, options);

		return this.each(function() {
			var container = $(this);
			$.each(data, function(index, item) {
				createWeiboItem(item, container, opts);
			})
			var myScroll = new iScroll(this);
			//                         $(this).css({
			//                              '-webkit-transition-property': '-webkit-transform';
			//                              '-webkit-transform-origin-x': '0px';
			//                              '-webkit-transform-origin-y': '0px';
			//                              '-webkit-transition-duration': '0ms';
			//                              '-webkit-transform': 'translate3d(0px, 0px, 0px) scale(1)';
			//                          });
		});
	};
	//Timeline List需要过滤掉a标签，但要提取a标签中的文本
	//思路：先将a标签一个个匹配出来，然后取前面的内容，中间的内容和后面的内容拼起来返回
	//注意：正则match后得出的结果数组要判空
	function filter_A_Tag(content) {
		var strarray = content.match(/<a[^>]*>.*?<\/a>/ig);
		if(strarray != null && strarray.length > 0) {
			for(var i = 0; i < strarray.length; i++) {
				var result = strarray[i].slice(strarray[i].indexOf(">") + 1, strarray[i].indexOf("</a>"));
				var end = content.indexOf(strarray[i])
				var before = content.slice(0, end);
				var after = content.slice(end + strarray[i].length);
				content = before + result + after;
			}
		}
		return content;
	}
  function filter_link_Tag(content) {
    var filtered = content.replace(/<a[^>]*http:\/\/edr\.im\/[^>]*>.*?<\/a>/i, '');
  
//  if(strarray != null && strarray.length > 0) {
//    for(var i = 0; i < strarray.length; i++) {
//    var result = strarray[i].slice(strarray[i].indexOf(">") + 1, strarray[i].indexOf("</a>"));
//    var end = content.indexOf(strarray[i])
//    var before = content.slice(0, end);
//    var after = content.slice(end + strarray[i].length);
//    content = before + result + after;
//  }
//  }
    return filtered;
  }

	//提取a标签中href里的id值
	//思路：先匹配出a标签，在从a标签中匹配出user_id，再将id值连接起来返回
	function getAtId(ori_content) {
		var content = ori_content;
		var strarray = content.match(/<a[^>]*>.*?<\/a>/ig);
		if(strarray != null && strarray != undefined && strarray.length > 0) {
			var id = "";
			for(var i = 0; i < strarray.length; i++) {
				var tempid = strarray[i].match(/\/users\/(\d+)\/tweets[^@]+@\S+<\/a/);
				if(tempid != null && tempid != undefined && tempid.length > 0) {
					id = id + "," + tempid[1];
				}
			}
			return id;

		} else {
			return undefined;
		}
	}
    //创建单条微博
	function createWeiboItem(obj, container, opts) {
		/*
		 * 				<div class="weibo-list-item">

		 <div class="weibo-user-icon"></div>
		 <div class="weibo-content">
		 <div class="weibo-information">
		 <p class="weibo-user-name">
		 某医生
		 </p>
		 <div><img src="resources/images/weibo-picture-icon.png"/>
		 <p class="weibo-time">
		 8分钟前
		 </p>
		 </div>
		 </div>
		 <div class="weibo-short-article" >
		 <p>
		 信息安全是个得罪人的事情，很多同事会不理解。我想通过讲一些故事，告诉大家，其实这些事并不遥远。今天下午又收到北京同事的客户对我们企业信息安全的审计。如果交得答卷不好，很可能以后失去很多商业机会。这事儿得多沟通，大家都能谅解。毕竟生意减少了，最终损害的还是我们自身的利益。 <a href="">http://edoctor.cc/6f622a</a>
		 </p>
		 </div>
		 <div class="weibo-image"></div>
		 <div class="weibo-article-source"></div>
		 </div>
		 </div>
		 */
		/*
		 {"geography":null,
		 "created_from":"\u7f51\u9875",
		 "author_id":2231,
		 "content":"\u5434\u519b\u53bb\u75bc\u718f\u5f53VP\u4e86",
		 "avatar":"http://localhost:3000/system/images/4711/medium/IMG_0204.jpg",
		 "thumb":"http://localhost:3000/system/images/4711/medium/IMG_0204.jpg",
		 "name":"\u6881\u9701\u5929",
		 "created_at":1313725133,
		 "id":122461,
		 "parent_tweet":{
		 "geography":null,
		 "created_from":"\u7f51\u9875","author_id":741,
		 "content":"\u597d\u4e66\u5206\u4eab",
		 "avatar":"http://localhost:3000/system/images/4921/medium/me.jpg",
		 "name":"\u674e\u715c\u6625",
		 "created_at":1313722100,
		 "id":122451
		 }
		 }
		 */
		var time = obj.created_at;
		var weibotime = time.slice(0, time.lastIndexOf(' '));
		var html = '<div class="weibo-list-item" id="' + obj.id + '"><div class="weibo-user-icon">';
		if(obj.avatar) {
			html = html + '<img src="' + obj.avatar + '"/>';
		}
		if(obj.name) {
			html = html + '<p class="weibo-user-name">' + obj.name + '</p>';
		}
		html = html + '</div><div class="weibo-content">';
		html = html + '<div class="weibo-short-article" >';
		if(obj.content) {
			html = html + '<p>' + filter_A_Tag(filter_link_Tag(obj.content)) + '</p>';
		}
		html = html + '</div>';
		if(obj.thumb) {
			html = html + '<div class="weibo-image"><img width="60" height="auto" src="' + obj.thumb + '"/></div>';
		}
		//拼转发内容块
		if(obj.parent_tweet) {
			html = html + '<div class="weibo-article-source"><div class="weibo-article-source-top"></div><div class="weibo-article-source-middle"><p>' + obj.parent_tweet.name + ":" + filter_A_Tag(filter_link_Tag(obj.parent_tweet.content)) + '</p>';
			if(obj.parent_tweet.thumb) {
				html = html + '<img width="60" height="auto" src="' + obj.parent_tweet.thumb + '"/>';
			}
			html = html + '</div><div class="weibo-article-source-bottom"></div></div>';
		}
		html = html + '</div><div class="weibo-information"><p class="weibo-time">' + weibotime + '</p></div></div>';
		html = html + '<div class="weibo-list-item-bottom"></div>';
		container.append(html);
        //加上click处理函数，这里需要获取单条记录的各种id，topicid在json数据里有，不需要从a标签中获取
		container.find(".weibo-list-item").last().click(function() {
            removeLocalStorageArticle();
			window.localStorage.setItem("author_id", obj.author_id);
			window.localStorage.setItem("article_id", obj.id);
			if(obj.avatar) {
				window.localStorage.setItem("article_avatar", obj.avatar);
			}
			if(obj.name) {
				window.localStorage.setItem("article_name", obj.name);
			}
			if(obj.topic_ids) {
				window.localStorage.setItem("topic_ids", obj.topic_ids);
			}
			//设置content，获取@ id
			if(obj.content) {
				//如果直接obj.content，会对content造成影响
				var temp = obj.content;
                
				var article_atIds = getAtId(temp);
				if(article_atIds != null && article_atIds != undefined) {
					window.localStorage.setItem("article_atIds", article_atIds);
				}
				window.localStorage.setItem("article_content", filter_link_Tag(obj.content));
			}
			if(obj.thumb) {
				window.localStorage.setItem("article_thumb", obj.thumb);
			}
			if(obj.pagesize) {
				window.localStorage.setItem("article_bigpic", obj.pagesize);
			}
			//设置转发部分的内容，获取@ id
			if(obj.parent_tweet) {
				var parent_tweet_temp = obj.parent_tweet.content;
				var parent_tweet_article_atIds = getAtId(parent_tweet_temp);
                
				if(parent_tweet_article_atIds != null && parent_tweet_article_atIds != undefined) {
					window.localStorage.setItem("article_parenttweet_atIds", parent_tweet_article_atIds);				
				}
				window.localStorage.setItem("article_parenttweet_name", obj.parent_tweet.name);
				window.localStorage.setItem("article_parenttweet_content", filter_link_Tag(obj.parent_tweet.content));
				if(obj.parent_tweet.thumb) {
					window.localStorage.setItem("article_parenttweet_thumb", obj.parent_tweet.thumb);
				}
				if(obj.parent_tweet.pagesize) {
					window.localStorage.setItem("article_parenttweet_bigpic", obj.parent_tweet.pagesize);
				}
				if(obj.parent_tweet.topic_ids) {
					window.localStorage.setItem("article_parenttweet_topic_ids", obj.parent_tweet.topic_ids);
				}
			}
			//location.href="./article.html?token="+uid;
                                                        
            //token传给article.html 
            
            
			$.mobile.changePage("./article.html?source=" + opts.source+"&token="+opts.uid);

		});
	}

})(jQuery);
