function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = document.location.search.substr(1).match(reg);
	if (r!=null) return (r[2]); return null;
}
var debug = GetQueryString('debug') ? 1 : 0;
//var HOST = 'http://helloan.dev';
//var HOST = 'http://www.if-image.com/helloan';
var HOST = 'http://wechat.helloan.cn';

$(function(){

	// $('body').bind('touchmove',function(event){
	// 	event.preventDefault();
	// })fendGameSpan1

	$('#popup-user-reg-btn').bind('touchend',function(event){
		event.preventDefault();
		$('#popup-user-reg').hide();
		$('#popup-user-login').show();
	})

	$('#popup-user-login-btn').bind('touchend',function(event){
		event.preventDefault();
		$('#popup-user-login').hide();
		$('#popup-user-reg').show();
	})

	$('.popup-user-main-close').bind('touchend',function(event){
		event.preventDefault();
		$(this).parents('.popup-user').fadeOut();
	})

	$('.popup-what-main-close').bind('touchend',function(event){
		event.preventDefault();
		$(this).parents('.popup-what').fadeOut();
	})

	$('.page-3-btn .btn-share').bind('touchend',function(event){
		$('#share').fadeIn();
	});
	
	$('#share').bind('touchend',function(event){
		event.preventDefault();
		$('#share').fadeOut();
	});

	$('.btn-focus').bind('touchend',function(event){
		$('#focus').fadeIn();
	});
	
	$('#focus').bind('touchend',function(event){
		event.preventDefault();
		$('#focus').fadeOut();
	});

	// 登录
	$('#btn-login').bind('touchend',function(event){
		var tel = $('#tel-login').val();
		// var checkcode = $('#checkcode-login').val();
		var password = $('#password-login').val();
		if ( !checkTel(tel) ) {
			return false;
		};
		// if ( checkcode == '' ) {
		// 	alert('请输入验证码');
		// 	return false;
		// };
		if ( password == '' ) {
			alert('请输入密码');
			return false;
		};
		$.ajax({
			type: "POST",
			dataType: "JSON",
			url: HOST + "/account/login",
			data: "telephone=" + tel + "&password=" + password,
			success: function(msg){
				if (msg.code == 1)
				    alert(msg.msg);
				else
				    window.location.href='get_done.html';
			}
		});
	})

	// 注册
	$('#btn-register').bind('touchend',function(event){
		var tel = $('#tel-register').val();
		var password = $('#password-register').val();
		var checkcode = $('#checkcode-register').val();
		if ( !checkTel(tel) ) {
			return false;
		};
		if ( password == '' ) {
			alert('请输入密码');
			return false;
		};
		if ( checkcode == '' ) {
			alert('请输入验证码');
			return false;
		};
		$.ajax({
			type: "POST",
			dataType: "JSON",
			url: HOST + "/account/register",
			data: "telephone=" + tel + "&password=" + password + "&checkcode=" + checkcode,
			success: function(msg){
				alert(msg.msg);
				// window.location.href='get_done.html';
				$('#popup-user-reg').hide();
				$('#popup-user-login').show();
			}
		});
	})

	// 验证码
	$('.send-checkcode').bind('touchend',function(event){
		event.preventDefault();
		var tel = $(this).parents('dl').prev('dl').prev('dl').find('input[type="tel"]').val();
		if ( !checkTel(tel) ) {
			return false;
		};
		$.ajax({
			type: "POST",
			dataType: "JSON",
			url: HOST + "/checkcode",
			data: "telephone=" + tel,
			success: function(msg){
				// alert(msg);
				alert('验证码已发送');
			}
		});
	})

	// 挑战好友
	$('.btn-challenge').bind('touchend',function(event){
		event.preventDefault();
		var fopenid = $(this).parents('li').attr('fopenid');
		$.ajax({
			type: "POST",
			dataType: "JSON",
			url: HOST + "/game/play",
			data: "fopenid=" + fopenid,
			success: function(msg){
			}
		});
	})

	// 赠送好友
	$('body').on('touchend','.btn-give', function(event){
		event.preventDefault();
		var fopenid = $(this).parents('li').attr('fopenid');
		var user = $(this).parents('li').find('.user').html();
		$('.popup-user h4 strong').html(user);
		$('.popup-user').attr({'fopenid':fopenid});
		$('.popup-user').fadeIn();
	})

	$('body').on('touchend','#btn-popup-give', function(event){
		event.preventDefault();
		var fopenid = $(this).parents('.popup-user').attr('fopenid');
		var score = $('#score-give').val();
		if ( score == '' ) {
			alert('请输入赠送合氏币金额');
		} else {
			$.ajax({
				type: "POST",
				dataType: "JSON",
				url: HOST + "/account/give",
				data: "fopenid=" + fopenid + "&score=" + score,
				success: function(msg){
					//alert(msg);
					$('.popup-user').fadeOut();
					$('#share').fadeIn();
					wx.onMenuShareAppMessage({
					    title: ' ', // 分享标题
					    desc: '太有面儿啦，你的朋友 '+getCookie('nickname')+' 赠送了你 '+score+' 合氏币，快来挑战吧！',// 分享标题
					    link: HOST,// 分享链接
					    imgUrl: HOST+'/activity/img/touxiang.jpg' , // 分享图标
					    type: '', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 
						$('#share').fadeOut();
					    },
					    cancel: function () { 
					    }
					});
				}
			});
		};
	})

	// 拆开钱袋
	$('#btn-open-purse').bind('touchend',function(event){
		event.preventDefault();
		openid = getCookie('openid');
		if ( openid != null && openid != '' ) {
			window.location.href='get_done.html';
		} else {
			if_register = getCookie('if_register');	
			if (if_register) {
			    $('#popup-user-reg').show();
			    $('#popup-user-login').hide();
			}					
			$('.popup-user').fadeIn();
		}
	})

})

function load() {
	document.getElementById('loading').style.display = 'none';
	$('.page-1 ul').addClass('bounceIn');
	$('.page-2-main').addClass('bounceInDown');
	$('.page-3-main').addClass('bounceInDown');
	$('.page-4-main').addClass('bounceInDown');
}

// 验证手机号
function checkTel(tel) {
	if ( tel == '' ) {
		alert('请输入手机号');
		return false;
	};
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	if ( !reg.test(tel) ) {
		alert('请输入正确的手机号');
		return false;
	};
	return true;
}

// 获取Cookie
function getCookie(c_name) {
	if ( document.cookie.length > 0 ) {
		c_start = document.cookie.indexOf(c_name + '=');
		if ( c_start != -1 ) { 
			c_start = c_start + c_name.length + 1; 
			c_end = document.cookie.indexOf(';',c_start);
			if ( c_end == -1) {
				c_end = document.cookie.length;
			}
			return decodeURIComponent(document.cookie.substring(c_start,c_end))
		} 
	}
	return '';
}

function shareHelloan() {
$.ajax({
    type: "POST",
    dataType: "JSON",
    url: HOST + "/account/shareHelloan",
    data: "",
    success: function(msg){
	if(msg.code == 1)
	    alert(msg.msg);
    },
});
}

$(function(){
$.ajax({
	type: "POST",
	dataType: "JSON",
	url: HOST + "/welcome/getSignPackage",
	data: 'url='+encodeURIComponent(location.href.split('#')[0]),
	success: function(msg){
		if (msg.code == 0) {
			var data = msg.data;	
			wx.config({
				debug: false,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
			});
		}
		wx.ready(function () {
		// 在这里调用 API
			wx.onMenuShareTimeline({
				title: '春节到，腾讯阿里送的少，'+getCookie('nickname')+'在此有礼了！送您千元现金包！', // 分享标题
				link: HOST,// 分享链接
				imgUrl: HOST+'/activity/img/touxiang.jpg' , // 分享图标
				success: function () { 
				    shareHelloan();
				    $('#share').fadeOut();
				},
				cancel: function () { 
				    $('#share').fadeOut();
				}
			});
			wx.onMenuShareAppMessage({
				title: ' ', // 分享标题
				desc: '春节到，腾讯阿里送的少，'+getCookie('nickname')+'在此有礼了！送您千元现金包！', // 分享
				link: HOST, // 分享链接
				imgUrl: HOST+'/activity/img/touxiang.jpg' , // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () { 
				    shareHelloan();
				    $('#share').fadeOut();
				},
				cancel: function () { 
				    $('#share').fadeOut();
				}
			});
		});
	}
});
});
