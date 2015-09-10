// JavaScript Document

var myScroll;
var i = 0;
function loaded () {
	myScroll = new IScroll('#wrapper', {
		scrollX: false,
		scrollY: true,
		momentum: false,
		snap: true,
		
	});
	myScroll.on('scrollEnd', function (e){
		var y = this.y;
		var h = $('#wrapper').height();
		i = -(y/h);
		$('#wrapper .page').eq(i).addClass('on').siblings().removeClass('on');
	});	
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

