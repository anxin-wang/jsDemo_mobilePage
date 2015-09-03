$(function(){
	$(".menu-trigger, .mobilenav").click(function () {
		$(".mobilenav").fadeToggle(500);
	});
	$(".menu-trigger, .mobilenav").click(function () {
	    $(".top-menu").toggleClass("top-animate");
	    $(".mid-menu").toggleClass("mid-animate");
	    $(".bottom-menu").toggleClass("bottom-animate");
	});
	
})
