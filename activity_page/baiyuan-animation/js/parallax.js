//====================INIT===========================================
var baseClass,										//基类实例化
	$section = [],									//版块对象数组
	$sectionHeight = [],							//版块对象高度
	$sectionApp = [];								//版块实例化数组

//====================INIT===========================================



//====================BASE CLASS=====================================
/*---- 基类[初始方法] ----*/	
function BaseApp($root)
{
	$root = $(arguments[0]);										
	$root.children('div').each(function(i){
		if($(this).data('section') == true)
		{
			$section.push($(this));
			$sectionHeight.push($(this).height());
		}
	});
	this.init();
}
/*---- 基类[初始方法] ----*/	

/*---- 基类[通用方法] ----*/
BaseApp.prototype = {
	/*- 进场动画 -*/
	init : function()
	{
		$('.approach .logo').addClass('scale-1');
		$('.approach .date').animate({marginTop:'50px'},{easing:"easeOutQuad",duration:800});
		$('.approach .title').animate({marginTop:'110px'},{easing:"easeOutQuad",duration:800});
		$('.approach .iphone').animate({marginLeft:'-240px',opacity:'1'},{easing:"easeOutQuad",duration:800});
		$('.approach .products').animate({marginLeft:'5px',opacity:'1'},{easing:"easeOutQuad",duration:800});
		$('.approach .prizes-1').animate({opacity:'1'},{easing:"easeInExpo",duration:1000});
		$('.approach .prizes-2').animate({opacity:'1'},{easing:"easeInExpo",duration:1000,complete:function(){
			$('.approach .step').animate({marginTop:'594px'},{easing:"easeOutQuad",duration:1000,complete:function(){
				$('.approach .slogo1').addClass('scale-1');
				$('.approach .line1').animate({height:'135px'},{easing:"easeOutQuad",duration:1000,complete:function(){
					$('.summary .line1').animate({height:'590px'},{easing:"easeOutQuad",duration:2500});
				}});
				$('.approach .ribbons').animate({height:'509px'},{easing:"easeOutQuad",duration:2000});//
				$('.light-2').fadeIn(400,function(){
					setInterval(function(){
						if(!$('.light-1').is(':hidden'))
						{
							$('.light-1').hide();
							$('.light-2').show();
						}else{
							$('.light-1').show();
							$('.light-2').hide();
						}
					},500);
				});
				$('.approach .star1,.approach .star2,.approach .star3,.approach .star4,.approach .star5,.approach .star6,.approach .star7,.approach .star8,.approach .star9,.approach .star11,.approach .star12,.approach .star13,.approach .star14,.approach .star15').addClass('scale-1');
				$('.approach .star1,.approach .star4,.approach .star7,.approach .star13').addClass('starflash1');
				$('.approach .star2,.approach .star5,.approach .star8,.approach .star11,.approach .star14').addClass('starflash2');
				$('.approach .star3,.approach .star6,.approach .star9,.approach .star12,.approach .star15').addClass('starflash3');
				$('.summary .textarea-bg1').animate({marginTop:'40px',opacity:'1'},{easing:"easeOutQuad",duration:1000});
				$('.summary .textarea-bg2').animate({marginTop:'0px',opacity:'1'},{easing:"easeOutQuad",duration:1000});
				$('.summary .title-bg').animate({marginTop:'10px',opacity:'1'},{easing:"easeOutQuad",duration:1000});
				$('.summary .title').animate({marginTop:'76px',opacity:'1'},{easing:"easeOutQuad",duration:1000,complete:function(){
					/*---- 滚动条绑定 ----*/
					$('body').css('overflow-y','visible');
					$('.scrollto').animate({left:'50%',opacity:'1'},{easing:"easeOutQuad",duration:1000});
					var	scrollObj = new SmoothScroll({step:250});						//缓动初始实例化
					init = true;
				}});
			}});
		}});
	},
	
	/*- 核心方法[滚动时执行当前可视版块的所有动画] -*/
	sectionShow : function()
	{
		var bomTop = $(window).scrollTop(),
			bomHeight = bomTop + $(window).height(),
			windowHeight = $(window).height();

		for(var index in $section)
		{
			var offset = $section[index].offset();
			if(bomHeight > offset.top && bomHeight < offset.top + $sectionHeight[index] + windowHeight)
			{
				ratio = (bomTop - offset.top + windowHeight) / ($sectionHeight[index] + windowHeight);
				position = bomTop - offset.top + windowHeight;
				$sectionApp[index].align(ratio,position);
			}
		}
	}
}
/*---- 基类[通用方法] ----*/
//====================BASE CLASS=====================================




//====================APPROACH CLASS[第一屏]=================================
function approachApp()
{

}

approachApp.prototype = {
	align : function(ratio,position)
	{
		if($('.approach .slogo1').hasClass('scale-1'))
		{
			$('.approach .slogo1').removeClass('scale-0 scale-1')
		}
		
		if(scrollPos > 50)
		{
			$('.approach .date').stop().animate({marginTop:'-120px'},{easing:"easeOutQuad",duration:800});
			$('.approach .title').stop().animate({marginTop:'0px'},{easing:"easeOutQuad",duration:800});
		}else{
			$('.approach .date').stop().animate({marginTop:'50px'},{easing:"easeOutQuad",duration:800});
			$('.approach .title').stop().animate({marginTop:'110px'},{easing:"easeOutQuad",duration:800});
		}
		
		if(scrollPos > 250)
		{
			$('.approach .prizes-1').stop().animate({marginLeft:'-680px',opacity:'0'},{easing:"easeOutQuad",duration:1000});
			$('.approach .prizes-2').stop().animate({marginLeft:'450px',opacity:'0'},{easing:"easeOutQuad",duration:1000});	
		}else{
			$('.approach .prizes-1').stop().animate({marginLeft:'-480px',opacity:'1'},{easing:"easeOutQuad",duration:1000});
			$('.approach .prizes-2').stop().animate({marginLeft:'250px',opacity:'1'},{easing:"easeOutQuad",duration:1000});	
		}
		
		if(scrollPos > 500)
		{
			$('.approach .iphone').stop().animate({opacity:'0'},{easing:"easeOutQuad",duration:800});
			$('.approach .products').stop().animate({opacity:'0'},{easing:"easeOutQuad",duration:800});
			$('.approach .step').stop().animate({marginTop:'694px',opacity:'0'},{easing:"easeOutQuad",duration:1000});
			$('.approach .slogo1').stop().animate({marginTop:'740px',opacity:'0'},{easing:"easeOutQuad",duration:1000});
		}else{
			$('.approach .iphone').stop().animate({opacity:'1'},{easing:"easeOutQuad",duration:800});
			$('.approach .products').stop().animate({opacity:'1'},{easing:"easeOutQuad",duration:800});
			$('.approach .step').stop().animate({marginTop:'594px',opacity:'1'},{easing:"easeOutQuad",duration:1000});
			$('.approach .slogo1').stop().animate({marginTop:'640px',opacity:'1'},{easing:"easeOutQuad",duration:1000});
		}
	}	
}
//====================APPROACH CLASS[第一屏]=================================






//====================SUMMARY CLASS[第二屏]==================================
function summary()
{

}

summary.prototype = {
	align : function(ratio,position)
	{
		$('.summary-left-iphone1').css('margin-top',934 - 300 * ratio + 'px');
		$('.summary-left-iphone2').css('margin-top',1375 - 900 * ratio + 'px');
		$('.summary-right-pic1').css('margin-top',1500 - 750 * ratio + 'px');
		$('.summary-right-pic2').css('margin-top',900 + 340 * ratio + 'px');
		$('.summary-right-pic3').css('margin-top',1130 - 300 * ratio + 'px');
		if(position > 200)
		{
			$('.summary .slogo1').stop().animate({marginTop:'150px',marginLeft:'-586px',opacity:'1'},{easing:"easeOutQuad",duration:800});
			$('.summary .xx1').addClass('xxflash1');
			$('.summary .xx2').addClass('xxflash2');
			$('.summary .xx3').addClass('xxflash1');
			$('.summary .xx4').addClass('xxflash1');
			$('.summary .xx5').addClass('xxflash2');
		}else{
			$('.summary .slogo1').stop().animate({marginTop:'0px',marginLeft:'-536px',opacity:'0'},{easing:"easeOutQuad",duration:800});	
		}
		
		if(position > 400)
		{
			$('.summary .ax1').addClass('scale-1');
			$('.summary .ax2').addClass('scale-1');
			$('.summary .ax3').addClass('scale-1');
			$('.summary .ax4').addClass('scale-1');
		}
		
		if(position > 600)
		{
			$('.summary-slogo2').stop().animate({marginLeft:'-460px',opacity:'1'},{easing:"easeOutQuad",duration:800,complete:function(){
				$('.summary-slogo2-hh').addClass('scale-1');
				setTimeout(function(){$('.summary-slogo2-text').addClass('scale-1');},200); 
			}});

			$('.summary .right-xx1').addClass('scale-1');
			$('.summary .yq1').addClass('scale-1');
			$('.summary .yq3').addClass('scale-1');
			setTimeout(function(){
				$('.summary .right-xx2').addClass('scale-1');
				$('.summary .yq2').addClass('scale-1');
				$('.summary .yq4').addClass('scale-1');
			},500); 
		}else{
			$('.summary-slogo2-hh').removeClass('scale-1');
			setTimeout(function(){$('.summary-slogo2-text').removeClass('scale-1');},200); 
			$('.summary-slogo2').stop().animate({marginLeft:'-300px',opacity:'0'},{easing:"easeOutQuad",duration:800});
		}
	}	
}
//====================SUMMARY CLASS[第二屏]==================================






//====================ACTLIST CLASS[第三屏]==================================
function actlist()
{

}

actlist.prototype = {
	align : function(ratio,position)
	{
		$('.actlist-left-pic1').css('margin-top',1350 + 400 * ratio + 'px');
		$('.actlist-left-pic2').css('margin-top',1350 + 200 * ratio + 'px');
		$('.actlist-coffee').css('margin-top',1550 + 200 * ratio + 'px');
		$('.actlist .plate').css('margin-top',400 - 500 * ratio + 'px');
		$('.actlist .candle2').css('margin-top',0 + 250 * ratio + 'px');
		$('.actlist .candle1').css('margin-top',-100 + 400 * ratio + 'px');
		$('.actlist-right-iphone1').css('margin-top',2100 - 700 * ratio + 'px');
		$('.actlist-right-iphone2').css('margin-top',1900 - 200 * ratio + 'px');
		
		if(!$('.actlist-paper-1 .submit').hasClass('scale-0'))$('.actlist-paper-1 .submit').addClass('scale-0');
		
		if(position > 300)
		{
			$('.actlist .slogo1').stop().animate({marginTop:'180px',marginLeft:'494px',opacity:'1'},{easing:"easeOutQuad",duration:800});
			$('.actlist-paper-1 .ax').addClass('scale-1');
			$('.actlist-paper-1 .pro2').stop().animate({left:'118px',top:'26px',opacity:'1'},{easing:"easeOutQuad",duration:1000});
			$('.actlist-paper-1 .pro1').stop().animate({left:'310px',top:'64px',opacity:'1'},{easing:"easeOutQuad",duration:1000});
		}else{
			$('.actlist-paper-1 .ax').removeClass('scale-1');
			$('.actlist .slogo1').stop().animate({marginTop:'130px',marginLeft:'454px',opacity:'0'},{easing:"easeOutQuad",duration:800});
		}
		
		if(position > 450)
		{
			$('.actlist-paper-1 .submit').addClass('scale-1');
		}else{
			$('.actlist-paper-1 .submit').removeClass('scale-1');
		}
	}
}
//====================ACTLIST CLASS[第三屏]==================================






//====================INTRO CLASS[第四屏]====================================
function intro()
{

}

intro.prototype = {
	align : function(ratio,position)
	{
		$('.intro-left-pic1').css('margin-top',2440 - 500 * ratio + 'px');

		if(position > 200)
		{
			$('.intro .tip').addClass('scale-1').css('width','193px');
			$('.intro .title').stop().animate({marginLeft:'-228px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.intro .slogo1').stop().animate({marginTop:'102px',marginLeft:'-572px',opacity:'1'},{easing:"easeOutQuad",duration:500});
		}else{
			$('.intro .tip').removeClass('scale-1').css('width','148px');
			$('.intro .title').stop().animate({marginLeft:'-128px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.intro .slogo1').stop().animate({marginTop:'0px',marginLeft:'-552px',opacity:'0'},{easing:"easeOutQuad",duration:500});
		}
		
		if(position > 400)
		{
			$('.intro .yq1,.intro .yq2,.intro .yq4,.intro .yq5,.intro .yq7').addClass('scale-1');
			setTimeout(function(){$('.intro .yq3,.intro .yq6').addClass('scale-1');},400);
		}
		
		if(position > 720)
		{
			$('.intro-slogo2').stop().animate({marginLeft:'236px',opacity:'1'},{easing:"easeOutQuad",duration:500,complete:function(){
				$('.intro-slogo2-text').addClass('scale-1');	
			}});
		}
	}
}
//====================INTRO CLASS[第四屏]====================================






//====================TMALL CLASS[第五屏]====================================
function tmall()
{

}

tmall.prototype = {
	align : function(ratio,position)
	{
		$('.tmall-left-iphone3').css('margin-top',2900 - 200 * ratio + 'px');
		$('.tmall-left-iphone2').css('margin-top',2590 + 300 * ratio + 'px');
		$('.tmall-left-iphone1').css('margin-top',2940 - 500 * ratio + 'px');
		$('.tmall-right-pic1').css('margin-top',3100 - 500 * ratio + 'px');
		$('.tmall-right-pic2').css('margin-top',2590 + 300 * ratio + 'px');
		
		if(!$('.tmall-button').hasClass('scale-0'))$('.thanks-button1').addClass('scale-0');
		
		if(position > 100)
		{
			$('.across .tmall-top').stop().animate({marginTop:'2610px'},{easing:"easeOutQuad",duration:800});
		}else{
			
		}
		
		if(position > 350)
		{
			$('.across .tmall-wrap .pro1').stop().animate({marginTop:'80px',marginLeft:'5px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro2').stop().animate({marginTop:'70px',marginLeft:'110px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro3').stop().animate({marginTop:'46px',marginLeft:'174px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro4').stop().animate({marginTop:'78px',marginLeft:'258px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro5').stop().animate({marginTop:'176px',marginLeft:'16px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro6').stop().animate({marginTop:'195px',marginLeft:'66px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro7').stop().animate({marginTop:'218px',marginLeft:'124px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro8').stop().animate({marginTop:'205px',marginLeft:'208px',opacity:'1'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro9').stop().animate({marginTop:'183px',marginLeft:'260px',opacity:'1'},{easing:"easeOutQuad",duration:500});	
		}else{
			$('.across .tmall-wrap .pro1').stop().animate({marginTop:'20px',marginLeft:'-45px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro2').stop().animate({marginTop:'40px',marginLeft:'110px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro3').stop().animate({marginTop:'16px',marginLeft:'174px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro4').stop().animate({marginTop:'48px',marginLeft:'308px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro5').stop().animate({marginTop:'126px',marginLeft:'16px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro6').stop().animate({marginTop:'240px',marginLeft:'66px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro7').stop().animate({marginTop:'260px',marginLeft:'124px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro8').stop().animate({marginTop:'250px',marginLeft:'208px',opacity:'0'},{easing:"easeOutQuad",duration:500});
			$('.across .tmall-wrap .pro9').stop().animate({marginTop:'183px',marginLeft:'310px',opacity:'0'},{easing:"easeOutQuad",duration:500});	
		}
		
		if(position > 400)
		{
			$('.tmall-slogo1').addClass('scale-1');	
			$('.tmall-button').addClass('scale-1');	
		}else{
			$('.tmall-slogo1').removeClass('scale-1');
			$('.tmall-button').removeClass('scale-1');		
		}
		
		if(position > 500)
		{

			$('.tmall-slogo2').stop().animate({marginLeft:'-494px',opacity:'1'},{easing:"easeOutQuad",duration:500,complete:function(){
				$('.tmall .slogo2-text').addClass('scale-1');	
			}});
		}else{
			$('.tmall .slogo2-text').removeClass('scale-1');
			$('.tmall-slogo2').stop().animate({marginLeft:'-600px',opacity:'0'},{easing:"easeOutQuad",duration:500});
		}
	}
}
//====================TMALL CLASS[第五屏]====================================







//====================THANKS CLASS[第六屏]====================================
function thanks()
{

}

thanks.prototype = {
	align : function(ratio,position)
	{
		$('.thanks-left-pic1').css('margin-top',3100 + 500 * ratio + 'px');
		$('.thanks-left-pic2').css('margin-top',3600 - 500 * ratio + 'px');
		$('.thanks-right-iphone1').css('margin-top',3400 - 500 * ratio + 'px');
		$('.thanks-right-iphone2').css('margin-top',3200 + 500 * ratio + 'px');
		$('.thanks .sina').css('margin-left',300 - 400 * ratio + 'px');
		
		if(!$('.thanks-button1').hasClass('scale-0'))$('.thanks-button1').addClass('scale-0');
		if(!$('.thanks-button2').hasClass('scale-0'))$('.thanks-button2').addClass('scale-0');
		if(!$('.thanks-button3').hasClass('scale-0'))$('.thanks-button3').addClass('scale-0');
		
		if(position > 200)
		{
			$('.thanks .yq1').addClass('scale-1');
			setTimeout(function(){$('.thanks .yq2').addClass('scale-1');},200);
			setTimeout(function(){$('.thanks .yq3').addClass('scale-1');},400);
			$('.thanks .button-wrap').stop().animate({marginTop:'48px',opacity:'1'},{easing:"easeOutQuad",duration:800});	
		}else{
			$('.thanks .button-wrap').stop().animate({marginTop:'148px',opacity:'0'},{easing:"easeOutQuad",duration:800});	
		}
		
		if(position > 280)
		{
			$('.thanks .ax1').addClass('scale-1');
			setTimeout(function(){$('.thanks .ax2').addClass('scale-1');},200);
			$('.thanks-button1').addClass('scale-1');
			$('.thanks-button2').addClass('scale-1');
		}else{
			$('.thanks-button1').removeClass('scale-1');
			$('.thanks-button2').removeClass('scale-1');
		}
		
		if(position > 350)
		{
			$('.thanks-button3').addClass('scale-1');
			$('.thanks .slogo1').stop().animate({marginLeft:'-400px',opacity:'1'},{easing:"easeOutQuad",duration:800});	
		}else{
			$('.thanks-button3').removeClass('scale-1');
		}
	}
}
//====================THANKS CLASS[第六屏]====================================



















//====================SMOOTHSCROLL CLASS=============================
var scrollSwitch = true,							//缓动开关
	windowScroll = true;							//窗口滚动条拖动开关
			
var SmoothScroll = function (opt) {
	var that = this;
	that.opt = opt.step;
	$('body').bind('mousewheel', function(event, delta) {
		windowScroll = false;
		var dir = delta > 0 ? 'Up' : 'Down',
			tar = $(window).scrollTop() + that.opt * (dir == "Up" ? -1 : 1);
		if(scrollSwitch)
		{
			scrollSwitch = false;
			$('html,body').animate({scrollTop:tar},{easing:"easeOutQuad",duration:600,complete:function(){
				scrollSwitch = true;
				windowScroll = true;
			}});
		}
		event.preventDefault();
	});
	
	$('.act_txt').bind('mousewheel', function(event, delta) {
		if(parseInt($('.jscroll-c').css('top')) != 0 && parseInt($('.jscroll-c').css('top')) != -124)
		{
			event.preventDefault();
			return false; 
		}
	});
	
	$('.pop_mod').bind('mousewheel', function(event, delta) {
		event.preventDefault();
		return false; 
	});	
}  
//====================SMOOTHSCROLL CLASS=============================
var	scrollPos = 0,													//缓动坐标
	dialog,
	init = false;

function goto(id) {
	$("#" + id).ScrollTo(800);
}

function pop1(id){
		dialog = art.dialog({//2
		content: document.getElementById(id),
		resize: false,
		lock:true,
		padding:0,
		close:function(){$('.pop_mod').css('margin-top','-20000px')}
	});
	
	$(".close").click(function(){
		dialog.close()
	})
}

$(function(){	
	/* 初始SELECT地址 */
	$.ajax({
		dataType : 'JSON',
		url : '../api/base.php?c=get_province',
			success: function(e){
				var text;
				for(var i in e.data)
				{
					text+= '<option value="' + e.data[i].id + '">' + e.data[i].name + '</option>';
				}
				$('select[name="province"]' ).html(text);
			}
	})


	/*- GOTO -*/
	$('.scrollto li').click(function(){
		goto($(this).data('goto'));
		if($(this).index() > 0)
		{
			$('.scrollto li').css('background-color','#000');
			$(this).css('background-color','#F00');	
		}
	})
	
	$('.thanks-button3').click(function(){
		goto($(this).data('goto'));
	})
	
	$('.activities').click(function(){
		goto($(this).data('goto'));
	})
	
	/*---- 实例化版块 ----*/
	$sectionApp.push(new approachApp());
	$sectionApp.push(new summary());
	$sectionApp.push(new actlist());
	$sectionApp.push(new intro());
	$sectionApp.push(new tmall());
	$sectionApp.push(new thanks());
	
	
	
	/*---- 元素效果事件绑定----*/	
    $("body").queryLoader2({
		percentage: true,
		onComplete: function (){
			/*---- 初始化 ----*/
			baseClass = new BaseApp('#content');
			
			$('body, html').scrollTop(0);
			
			$(window).bind('scroll',function(){
				if(init)
				{
					baseClass.sectionShow();
				}
				scrollPos = $(window).scrollTop();			
				
			})
		}
	});

	
	
	$('select[name="province"]' ).change(function(){
		var id = $(this ).val();
		
		$('select[name="city"]').html();
		
		if(id != 0)
		{
			$.ajax({
				dataType : 'JSON',
				url : '../api/base.php?c=get_city&province_id=' + id,
				success: function(e)
				{
					var text;
					for(var i in e.data)
					{
						text+= '<option value="' + e.data[i].id + '">' + e.data[i].name + '</option>';
					}
					$('select[name="city"]' ).html(text);
				 }
			 })
		}
	})

    $('input[name="phone"]').keyup(function(){  //keyup事件处理 
            $(this).val($(this).val().replace(/[^\d^-]/g,''));  
        }).bind("paste",function(){  //CTR+V事件处理 
            $(this).val($(this).val().replace(/[^\d^-]/g,''));  
        }).css("ime-mode", "disabled");  //CSS设置输入法不可用
		
	$('.popup-content .submit' ).click(function(){
		var formValue = $("#form").serializeArray();
		if(!$('input[name="name"]').val())
		{
			alert('请输入姓名');
			return false; 
		}
		
		if(!$('input[name="phone"]').val())
		{
			alert('请输入电话号码');
			return false; 
		}
		
        if($('input:radio[name="sex"]:checked').val()==null)
		{
			alert('请输入性别');
			return false; 
		}
		
		if(!$('input[name="weibo_user"]').val() && !$('input[name="nickname"]').val())
		{
			alert('请输入微博账号或者昵称');
			return false; 
		}
		
		if($('select[name="province"] option:selected').text() == '请选择')
		{
			alert('请选择地区');
			return false; 
		}
		
		if($('select[name="city"] option:selected').text() == '请选择')
		{
			alert('请选择城市');
			return false; 
		}
		
		if(!$('input[name="address"]').val())
		{
			alert('请输入地址');	
			return false; 
		}
		
        if($('input:radio[name="age"]:checked').val()==null){ 
        	alert("请选择年龄"); 
            return false; 
        } 

        if($('input:radio[name="job"]:checked').val()==null){ 
        	alert("请选择职业"); 
            return false; 
        } 		
		
        if($('input:radio[name="job"]:checked').val()==null){ 
        	alert("请选择职业"); 
            return false; 
        } 
		
        if($('input:radio[name="a1"]:checked').val()==null){ 
        	alert("您是从何处得知本次活动的？"); 
            return false; 
        } 
		
        if($('input:radio[name="a2"]:checked').val()==null){ 
        	alert("今后如果还有活动的话，您希望得到什么样的奖品？"); 
            return false; 
        } 
		
        if($('input:radio[name="a3"]:checked').val()==null){ 
        	alert("今后您希望白元能够出售何种商品？"); 
            return false; 
        }
		
		if($('textarea').val() == '')
		{
        	alert("对白元有任何希望或者建议，请自由填写？"); 
            return false; 
		}
		
		$.ajax({
			dataType:'JSON',
			url : '../api/base.php?c=create_activity',
			data:formValue,
			success: function(e){
				if(e.success)
				{
					alert('感谢您的参与!');
					$('#form')[0].reset();
					dialog.close();
				}
			}
		})
	})
	
	$(".act_txt .act_txt-wrap").jscroll({
		W:"16px",
		BgUrl:"url(images/st-2-scroll-bg_01.gif)",
		Bg:"6px top repeat-y",
		Bar:{  Pos:"",//设置滚动条初始化位置在底部
			Bg:{Out:"-35px 0 ",Hover:"-35px 0 ",Focus:"-35px 0 "}},
			Btn:{btn:false}		
	});
	
	$(".popup_mod").jscroll({
		W:"16px",
		BgUrl:"url(images/scroll-bg_02.png)",
		Bg:"6px top repeat-y",
		Bar:{  Pos:"",//设置滚动条初始化位置在底部
			Bg:{Out:"-35px 0 ",Hover:"-35px 0 ",Focus:"-35px 0 "}},
			Btn:{btn:false}
	});
	
	
	$(".actlist-paper-1 .submit").click(function(){
		if($('.select_box a').hasClass('cur'))
		{
			$('.actlist-paper-1 .tip').fadeOut('slow');
			$('.pop_mod').css('margin-top','0px');
			pop1("pop_mod");
		}else{
			$('.actlist-paper-1 .tip').fadeIn('slow');	
		}
	})

	
	$('.paper-wrap').hover(function(){
		$('.actlist-paper-1 .ax').addClass('rotate-1');
	},function(){
		$('.actlist-paper-1 .ax').removeClass('rotate-1');
	})
	
	$('.actlist-paper-2,.actlist-paper-3').hover(function(){
		$('.actlist-paper-3').addClass('rotate-1');
		$('.actlist-paper-2').addClass('rotate-2');
	},function(){
		$('.actlist-paper-2').removeClass('rotate-2');
		$('.actlist-paper-3').removeClass('rotate-1');
	})
	
	
	$('.tmall-wrap,.tmall-top').hover(function(){
		$('.across .tmall-top').stop().animate({marginTop:'2580px'},{easing:"easeOutQuad",duration:500}).find('img').show();
	},function(){
		$('.across .tmall-top').stop().animate({marginTop:'2610px'},{easing:"easeOutQuad",duration:500}).find('img').hide();
	})
	
	$(".select_box a").click(function(){
		$(".select_box a").removeClass("cur");
		$(this).addClass("cur");
		$("input[name='a']").val($(this).data('name'));
	})
	
	$("#picture .active").live('mouseover',function(){
		if(!picFlag)
		$(this).find('p').show();
	})
	

	$("#picture .active").live('mouseout',function(){
		$(this).find('p').hide();
	});


	$('.actlist-paper-1 .submit').mousedown(function(){
		$(this).removeClass('scale-0 scale-1');
		$(this).addClass('submit-select');
	}).mouseup(function(){
		$(this).removeClass('submit-select');
	})
	
	$('.pop_mod .submit').mousedown(function(){
		$(this).addClass('submit-select');
	}).mouseup(function(){
		$(this).removeClass('submit-select');
	})

	
	$('.tmall-button').mousedown(function(){
		$(this).removeClass('scale-0 scale-1');
		$(this).addClass('tmall-button-select');
	}).mouseup(function(){
		$(this).removeClass('tmall-button-select');
	})	
	
	$('.thanks-button1').mousedown(function(){
		$(this).removeClass('scale-0 scale-1');
		$(this).addClass('thanks-button1-select');
	}).mouseup(function(){
		$(this).removeClass('thanks-button1-select');
	})
	
	$('.thanks-button2').mousedown(function(){
		$(this).removeClass('scale-0 scale-1');
		$(this).addClass('thanks-button2-select');
	}).mouseup(function(){
		$(this).removeClass('thanks-button2-select');
	})
	
	$('.thanks-button3').hover(function(){
		$(this).removeClass('scale-0 scale-1');
		$(this).addClass('thanks-button3-select');
	},function(){
		$(this).removeClass('thanks-button3-select');
	})
})