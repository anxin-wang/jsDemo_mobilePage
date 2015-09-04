//var HOST = 'http://115.28.24.126:8080';
//var HOST = 'http://www.if-image.com/helloan';
var HOST = 'http://wechat.helloan.cn';

$(function(){

	$("body").bind("touchmove",function(e){
		e.preventDefault();
	},false)

	var tjNum = null;

	$("#godCard").css({left:$(window).width()/2-48});

	var DivCard = document.getElementById("godCard");
	var bodyWidth = $('body').width() - 80;

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
	var speedRatio = 1500; // 速度系数
	var gameStart = 0;
	//时间 
	// var sec = ['200', '200', '200', '200', '200']; 
	// 移动速度
	// var sec1 = ['1500', '1600', '1700', '1800', '1900','2000', '2100', '2200', '2300', '2400']; 
	var gift = [{
		name: "+5",
		src: "img/gift1.png",
		price: 5
	},
	{
		name: "+8",
		src: "img/gift2.png",
		price: 8
	},
	{
		name: "+10",
		src: "img/gift3.png",
		price: 10
	},
	{
		name: "+15",
		src: "img/gift4.png",
		price: 15
	},
	{
		name: "+50",
		src: "img/gift5.png",
		price: 50
	},
	{
		name: "+99",
		src: "img/gift6.png",
		price: 99
	},
	{
		name: "X2",
		src: "img/gift7.png",
		price: 2
	},
	{
		name: "+100",
		src: "img/gift8.png",
		price: 100
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
		if ( gameStart == 0 ) {
			strGameFn();
			gameStart = 1;
		};
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
		// var i = $(".endGameSpan0 i strong").attr('data-time');
		//100个数里面的概率12组递减 13-12-12-11-10-9-8-7-6-5-4-2
		if ( i > 80 && countdown > 4 ) {//over bomb
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
		} else {
			giftNum = 0;
		};
		// var speed = randomSpeed();
		var left = randomLeft();
		// $(".endGameSpan0 i strong").attr('data-time', parseInt(i)+5);
		// runGift(giftNum, speed, left);
		runGift(giftNum, left);
	} 

	function randomSpeed() {
		var i = parseInt(sec1[Math.floor(Math.random() * 10)]);
		return i;
	};

	function randomLeft() {
		// var gameTime = $(".endGameSpan0 i strong").attr('data-time'); 
		var i = Math.ceil(Math.random() * 100);
		return i;
	};

	// function runGift(giftNum, speed, left, num) {
	function runGift(giftNum, left) {
		if(outBox=="0"){
		$("#div_1").append("<img id = id_" + a + " name=" + gift[giftNum].name + " price = " + gift[giftNum].price + " src = " + gift[giftNum].src + " style = 'top:-80px;left:" + parseInt(Math.random() * bodyWidth) + "px' /> ");
		$("#id_" + a).animate({
			top: $(window).height() + "px"
		},speedRatio,
		function() {
			$(this).remove()
		});
		a++;
		if ( speedRatio > 500 ) {
			speedRatio = speedRatio - 10;
		};
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
				// if(countdown<20){
					chooseGift();
				// }else if(countdown>=20){
					// chooseGift(1);
				// }
			},speedRatio/4);	//随机时间
		}
	};

	var countdown = 0;
	function time() {
		countdown++;
		$(".daojishi").html(countdown);
	}

	var isChallenge = getCookie('fopenid') ? true : false;
	/*
	$.ajax({
		type: "POST",
		dataType: "JSON",
		url: HOST + "/game/play",
		data: "fopenid="+getCookie('fopenid'),
		success: function(data){
			if (data.code == 3) {
				isChallenge = true;
			}
		}
	});
	*/

	function endJieguo(){  //结束
		endGameFn();
		$('.endGameSpan1').addClass('swing');
		$('.endGameSpan5').addClass('swing');
		clearInterval(timer1); 
		clearInterval(timer2);
		clearInterval(timer3);
		clearInterval(timer4);
		tjNum = $('.score').html();
		$(".endGameSpan0 i strong").html(tjNum);
		if ( isChallenge ) {
			$.ajax({
				type: "POST",
				dataType: "JSON",
				url: HOST + "/game/commit ",
				data: "fopenid="+getCookie('fopenid')+"&score="+tjNum+"&cmp_score="+getCookie('cmp_score'),
				success: function(msg){
				    if (msg.code == 3) {
					$(".play_title").html(msg.data.play_title);
					$(".endGameSpan0").html(msg.msg);
					$(".endGameSpan1").hide();
					$(".endGameSpan5").show();
					$(".endGame").show();
				    }	// alert(msg);
				}
			});
		}
		else {
		    $.ajax({
			type: "POST",
			dataType: "JSON",
			url: HOST + "/game/commit",
			data: "fopenid="+getCookie('fopenid')+"&score="+tjNum,
			success: function(msg){
				// alert(msg.msg);
			}
		});

		$(".endGame").show();
		$(".endGameSpan0").show();
		$(".endGameSpan2,.endGameSpan3").show();
		}
		return false;
	};
	
	$(".strBj1 .animated").bind('touchend',function(event){
		$.ajax({
			type: "POST",
			dataType: "JSON",
			url: HOST + "/game/play",
			data: "fopenid="+getCookie('fopenid'),
			success: function(data){
			     if(data.code ==1)
			     {
				alert(data.msg);
				window.location.href=HOST;
				return;
			     } 
				
			    $('.strBj1').hide(300);
			    $(".strBj2").css({
				    display: "block"
			    });
			    $('.strBj2 div p').addClass('swing');
			}
		});
	});
	
	$(".strBj1 .myhelloan").bind('touchend',function(event){
		window.location.href=HOST+'/activity/check_challenge.html';
	});

	$(".strBj2 div p").bind('touchend',function(event){
		$(this).parents(".strBj2").fadeOut(300);
		$(".fenshu").css({display:"block"});
	});

	function strGameFn(){//开始游戏
		$(".fenshu").css({display:"none"});
		startGift(1);
		timer3 = setInterval(time, 1000);//这里是计时器
	}
	function endGameFn(){//结束游戏
		clearInterval(timer3);
		startGift(0);
	}
			
	$(".endGameSpan1").bind('touchend',function(event){
		$(".endGameSpan1").unbind('touchend');
		/*$.ajax({
			type: "POST",
			dataType: "JSON",
			url: HOST + "/game/commit",
			data: "fopenid="+getCookie('fopenid')+"&score="+tjNum,
			success: function(msg){
			    if(msg.code ==0)
				window.location.href='open.html'
			    else
				// alert(msg.msg);
				window.location.href='open.html'
				// alert(msg);
			}
		});
		*/
		window.location.href='open.html'
	});

	$('.endGameSpan2').bind('touchend',function(event){
		$('#share').fadeIn();
	});
	
	$('#share').bind('touchend',function(event){
		event.preventDefault();
		$('#share').fadeOut();
	});

	$(".endGameSpan3").bind('touchend',function(event){
		window.location.reload();
	});

	$(".endGameSpan5").bind('touchend',function(event){
		window.location.href='check_challenge.html'
	});

})

function load() {
	document.getElementById('loading').style.display = 'none';
	$('.strBj1 div p').addClass('swing');
}
