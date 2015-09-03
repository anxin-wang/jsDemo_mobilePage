;(function($) {
	$.fn.ref = function(data, options) {
		// Merge passed options with defaults
		var opts = $.extend({}, $.fn.ref.defaults, options);

		return this.each(function() {
			var container = $(this);
			$.each(data, function(index, item) {
				createRefItem(item, container, opts);
			})
			
		});
	};
	

	
    //创建单条微博
	function createRefItem(obj, container, opts) {
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
			html = html + '<p>' + filter_A_Tag(obj.content) + '</p>';
		}
		html = html + '</div>';
		if(obj.thumb) {
			html = html + '<div class="weibo-image"><img width="60" height="auto" src="' + obj.thumb + '"/></div>';
		}
		//拼转发内容块
		if(obj.parent_tweet) {
			html = html + '<div class="weibo-article-source"><div class="weibo-article-source-top"></div><div class="weibo-article-source-middle"><p>' + obj.parent_tweet.name + ":" + filter_A_Tag(obj.parent_tweet.content) + '</p>';
			if(obj.parent_tweet.thumb) {
				html = html + '<img width="60" height="auto" src="' + obj.parent_tweet.thumb + '"/>';
			}
			html = html + '</div><div class="weibo-article-source-bottom"></div></div>';
		}
		html = html + '</div><div class="weibo-information"><p class="weibo-time">' + weibotime + '</p></div></div>';
		html = html + '<div class="weibo-list-item-bottom"></div>';
		container.append(html);

	}

})(jQuery);
