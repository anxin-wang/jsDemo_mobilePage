var picFlag = false;

(function($){
  
  var defaults = {
	  step: 50
  };
  
  $.jPicture = function(e, settings){
	 this.init.call(this, e, settings); 
  }	
  
  $.jPicture.prototype = {
	init: function(e, settings){
		var that = this;
		
		that.options = $.extend(defaults, settings);
		that.self = $(e);
		that.list = this.self.children('li');
		that.lens = this.self.length;
		that.w = that.list.eq(0).width();
		
		var first = that.list.slice(0,2).clone();
		var last = that.list.slice(-2).clone();
		that.self.prepend(last).append(first);
		that.list = this.self.children('li');
		that.lens = this.list.length;
		that.current = 2;
		that.lastIndex = -1;
		
		that.flag = true;
		
		//wrapper the picture
		that.self.wrap('<div class="picture-wrapper cf"><div class="picture-inner-wrapper"></div></div>');
		that.wrapper = this.self.parent().parent();
		that.wrapper.prepend('<a href="javascript:;" class="picture-left-btn"></a><a href="javascript:;" class="picture-right-btn"></a>');
		that.leftBtn = this.wrapper.find('.picture-left-btn');
		that.rightBtn  = this.wrapper.find('.picture-right-btn');
		
		//bind buttons click handler
		$(that.leftBtn).bind('click', function(e){
			that.run('left');
		});
		$(that.rightBtn).bind('click', function(e){
			that.run('right');
		});
		
		that.move();
	},
	
	move: function(){
		picFlag = true;
		var that = this;
		that.flag = false;
		this.list.removeClass('active').eq(this.current).addClass('active').animate({width:'480px',marginTop:0,opacity:1},500);
		this.list.eq(this.lastIndex).animate({width:'180px',marginTop:100,opacity:.8},500);
		this.self.animate({left:that.w*that.current*(-1)},500,function(){
			if(that.current == 1){
				that.current = that.lens -3;	
				that.self.css({left:that.w*that.current*(-1)});
				that.list.removeClass('active').eq(that.current).addClass('active').css({width:'480px',marginTop:0,opacity:1});
				that.list.eq(1).css({width:'180px',marginTop:100,opacity:.8});
				that.list.eq(that.lastIndex).css({width:'180px',marginTop:100,opacity:.8});
			}	
			else if(that.current == that.lens -2){
				that.current = 2;	
				that.self.css({left:that.w*that.current*(-1)});
				that.list.removeClass('active').eq(that.current).addClass('active').css({width:'480px',marginTop:0,opacity:1});
				that.list.eq(that.lens -2).css({width:'180px',marginTop:100,opacity:.8});
				that.list.eq(that.lastIndex).css({width:'180px',marginTop:100,opacity:.8});
			}	
			that.lastIndex = that.current;	
			var i = that.current - 1;
			$('#titleTxt p').css("background","url(images/pro/title0" + i + ".png) no-repeat 20px 30px");
			$(".goodsTxt").hide();
			//that.list.find('p').remove();
			//that.list.eq(that.current).append('<p id="goodsTxt"><img src="images/pro/t1.png" style="width:249px;height:102px;" /></p>');
			picFlag = false;
			that.flag = true;
		});	
	},
	
	run: function(dir){
		if(this.flag){
			if(dir == 'left'){
				this.current ++;
			}
			if(dir == 'right'){
				this.current --;	
			}
			this.move();
		}
	}
  };
  
  $.fn.jPicture = function(settings){
	  return this.each(function(){
		  $(this).data('jpicture', new $.jPicture(this,settings));  
	  });  
  };
	
})(jQuery);

$(document).ready(function(e) {
    $('#picture').jPicture();
});