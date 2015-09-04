$(function(){

	$("body").bind("touchmove",function(e){
		e.preventDefault();
	},false)

	var tjNum = null;

	$("#godCard").css({left:$(window).width()/2-48});

	var DivCard = document.getElementById("godCard");

	DivCard.addEventListener("touchstart", touchStart, false);
	DivCard.addEventListener("touchmove", touchMove, false);
	DivCard.addEventListener("touchend", touchEnd, false);

	var sx, sy, mx, my, ex, ey, isdrag, move_timer;
	var xiashang, shangxia, zuoyou, youzuo;
	var box_x1 = $("#godCard").offset().left;
	var box_x2 = $("#godCard").offset().left + $("#godCard").width();
	var a = 0;
	var lankuai_left = 0;
	var fraction = 0;
	var timer1 = null;
	var timer2 = null;
	var timer3 = null;
	var timer4 = null;
	var shareTitle;
	var descContent;
	var outBox = 0;
	//时间 
	var sec = ['300', '400', '500', '600', '700']; 
	// 移动速度
	var sec1 = ['1400', '1500', '1600', '1700', '1800']; 
	var gift = [{
		name: "+50",
		src: "img/gift1.png",
		price: 50
	},
	{
		name: "+80",
		src: "img/gift2.png",
		price: 80
	},
	{
		name: "+100",
		src: "img/gift3.png",
		price: 100
	},
	{
		name: "+150",
		src: "img/gift4.png",
		price: 150
	},
	{
		name: "+500",
		src: "img/gift5.png",
		price: 500
	},
	{
		name: "+999",
		src: "img/gift6.png",
		price: 999
	},
	{
		name: "*2",
		src: "img/gift7.png",
		price: 2
	},
	{
		name: "+10000",
		src: "img/gift8.png",
		price: 10000
	},
	{
		name: "bomb",
		src: "img/gift9.png",
		price: 0
	}]; 

	isdrag = false;

	function touchStart(e) {
		var t = e.targetTouches[0];
		e.preventDefault();
		isdrag = true;
		sx = t.pageX;
		sy = t.pageY;
		lankuai_left = parseInt(($("#godCard").css("left"))) || 0;
		strGameFn();
	}

	function touchMove(e) {
		var t = e.targetTouches[0];
		var w1=$(window).width()-$("#godCard").width();
		var windowWidth = $(window).width();
		var box_1x=t.pageX-sx + lankuai_left;
		var box_2X=box_1x+ $("#godCard").width();
		e.preventDefault();
		window.clearTimeout(move_timer);
		if (isdrag) {
			if (sx - t.pageX > 0 && Math.abs(t.pageY - sy) < Math.abs(sx - t.pageX)) {
				fangxiang();
				youzuo = true;
			} else if (t.pageX - sx > 0 && Math.abs(t.pageY - sy) < Math.abs(sx - t.pageX)) {
				fangxiang();
				zuoyou = true;
			};
			var cardLeft = (t.pageX - sx) + lankuai_left
			if ( cardLeft > 0 && cardLeft < $(window).width() - 95 ) {
				$("#godCard").css({
					left: (t.pageX - sx) + lankuai_left + "px"
				});
			};
			move_timer = window.setTimeout(function() {
				sx = t.pageX,
				sy = t.pageY;
			},1000);
		} 
		box_x1 = t.pageX-sx + lankuai_left;
		box_x2 = t.pageX-sx + lankuai_left  + $("#godCard").width();
	}

	function touchEnd(e) {
		isdrag = false;
	}

	function fangxiang() { 
		xiashang = shangxia = zuoyou = youzuo = false;
	}  


	function chooseGift(gailv) {
		var giftNum;
		var i = Math.floor(Math.random() * 100);
			//100个数里面的概率12组递减 13-12-12-11-10-9-8-7-6-5-4-2
			if (i <= 100 && i > 80) {
				giftNum = 8;
			} else if (i <= 80 && i > 78) {
				giftNum = 7;
			} else if (i <= 78 && i > 77) {
				giftNum = 6;
			} else if (i <= 77 && i > 74) {
				giftNum = 5;
			} else if (i <= 74 && i > 70) {
				giftNum = 4;
			} else if (i <= 70 && i > 60) {
				giftNum = 3;
			} else if (i <= 60 && i > 45) {
				giftNum = 2;
			} else if (i <= 45 && i > 25) {
				giftNum = 1;
			} else if (i <= 25 && i >= 0) {
				giftNum = 0;
			};
		var speed = randomSpeed();
		var left = randomLeft();
		runGift(giftNum, speed, left);
	} 

	function randomSpeed() {
		var i = parseInt(sec1[Math.floor(Math.random() * 10)]);
		return i;
	};

	function randomLeft() {
		var i = Math.ceil(Math.random() * 100);
		return i;
	};

	function runGift(giftNum, speed, left, num) {
		if(outBox=="0"){
		$("#div_1").append("<img id = id_" + a + " name=" + gift[giftNum].name + " price = " + gift[giftNum].price + " src = " + gift[giftNum].src + " style = 'top:-80px;left:" + parseInt(Math.random() * 300) + "px' /> ");
		$("#id_" + a).animate({top: $(window).height() + "px"},parseInt(sec1[Math.floor(Math.random() * 5)]),function() {$(this).remove()});
		a++;
		clearInterval(timer1);//标记
		timer1 = setInterval(function() {
			var a_1 = $("#div_1 img").css("top");
			var a_2 = $("#godCard").offset().top;
			$("#div_1 img").each(function(f) {
				if ((parseInt($(this).css("top")) + $(this).height()) >= $("#godCard").offset().top && (parseInt($(this).css("top")) <= $("#godCard").offset().top + $("#godCard").height())) {
					var img_x1 = parseInt($("#div_1 img").eq(f).css("left"));
					var img_x2 = img_x1 + $("#div_1 img").eq(f).width();
					var _this = $(this);
					function frac(_this) {
						if(_this.attr("name")=="*2"){
							fraction = fraction * 2;
						} else {
							fraction += parseInt(_this.attr("price"));//累加钱数
						}
						var name1 = _this.attr("name");
						if(_this.attr("name")=="bomb"){
							endJieguo();
							outBox=1;
						}else{
							jsjFontSize(name1);
						};
						_this.remove();
					}
					if(outBox==1){
						$(".daojishi").html("0");
					}
					if (img_x1 > box_x1 && img_x1 < box_x2) {
						frac(_this);
					}else if (img_x2 > box_x1 && img_x2 < box_x2) {
						frac(_this);
					}else if (img_x1 > box_x1 && img_x2 < box_x2) {
						frac(_this);
					}
					img_x1 = null;
					img_x2 = null;
					return false;
				}
			})
		},100);
		}
	};

	function jsjFontSize(name1){
		$(".score").html(fraction);
		$(".topjifen span").html(name1);
		$(".topjifen").animate({top:"200px",opacity:"1"},500)
		$(".topjifen").animate({top:"300px",opacity:"0"},10)
	};

	function startGift(n) {
		if (n == "0") {
			clearInterval(timer2);
		} else if(n == "1") {
			timer2 = setInterval(function() {
				if(countdown<20){
					chooseGift(0);
				}else if(countdown>=20){
					chooseGift(1);
				}
			},sec[parseInt(Math.floor(Math.random() * 5))]);	//随机时间
		}
	};

	var countdown = 0;
	function time() {
		countdown++;
		$(".daojishi").html(countdown);
	}
	function endJieguo(){  //结束
		endGameFn();
		$(".endGame").show();
		clearInterval(timer1); 
		clearInterval(timer2);
		clearInterval(timer3);
		clearInterval(timer4);
		tjNum = $('.score').html();
		$(".endGameSpan0 i strong").html(tjNum);
		$(".endGameSpan0").show();
		$(".endGameSpan1,.endGameSpan2,.endGameSpan3").show();
		return false;
	};
	
	$(".strBj1 div p").bind('touchend',function(event){
		$(this).parents(".strBj1").hide(300);
		$(".strBj2").css({
			display: "block"
		});
	}); 
	$(".strBj2 div p").bind('touchend',function(event){
		$(this).parents(".strBj2").fadeOut(300);
		$(".pointer").css({display:"block"});
	});

	function strGameFn(){//开始游戏
		$(".pointer").css({display:"none"});
		startGift(1);
		timer3 = setInterval(time, 1000);//这里是计时器
	}
	function endGameFn(){//结束游戏
		clearInterval(timer3);
		startGift(0);
	}
			
	$(".endGameSpan1").bind('touchend',function(event){
		
	});
	$(".endGameSpan2").bind('touchend',function(event){
		
	});
	$(".endGameSpan3").bind('touchend',function(event){
		window.location.reload();
	});

})

function load() {
	document.getElementById('loading').style.display = 'none';
}