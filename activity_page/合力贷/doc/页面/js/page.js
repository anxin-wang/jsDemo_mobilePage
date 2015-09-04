$(function(){

	$('body').bind('touchmove',function(event){
		event.preventDefault();
	})

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

})

function load() {
	document.getElementById('loading').style.display = 'none';
}