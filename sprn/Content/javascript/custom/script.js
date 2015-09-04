//正确选项对应序号，首项为0，以此类推
var correctChoiceIndex = 1;

document.addEventListener('touchmove', function(e){e.preventDefault();}, false);
function listenToChoiceTouchStart(){
  $('.choices:visible .choice').one('touchstart', choiceTouchStart);
}
function choiceTouchStart(e){
  e.preventDefault();
  $('.choices:visible .choice').unbind('touchstart');
  var offset = $(this).offset();
  var touch = e.originalEvent.touches[0];
  this.deltaX = offset.left - touch.pageX;
  this.deltaY = offset.top - touch.pageY;
  this.$originalContainer = $(this).parent().addClass('dragging-choice-container');
  this.$originalContainer.width(this.$originalContainer.width());
  $(this).appendTo('body').addClass('dragging').css({'left' : offset.left + 'px', 'top' : offset.top + 'px'});
  $(this).bind('touchmove', function(e){
    e.preventDefault();
    var touch = e.originalEvent.changedTouches[0];
    $(this).css({'left' : (this.deltaX + touch.pageX) + 'px', 'top' : (this.deltaY + touch.pageY) + 'px'});
  });
  $(this).one('touchend', function(e){
    e.preventDefault();
    $('.choice').unbind('touchmove');
    var $this = $(this);
    var touch = e.originalEvent.changedTouches[0];
    var $originalContainer = $('.choice-container.dragging-choice-container');
    var originalOffset = $originalContainer.offset();
    var $targetContainer = $('.answer:visible');
    var targetOffset = $targetContainer.offset();
    if(targetOffset.left <= touch.pageX && touch.pageX <= targetOffset.left + $targetContainer.width() &&  targetOffset.top <= touch.pageY && touch.pageY <= targetOffset.top + $targetContainer.height()){
      $('.answer:visible').text($this.text());
    }
    $this.removeClass('dragging').appendTo($originalContainer.removeClass('dragging-choice-container'));
    listenToChoiceTouchStart();
  });
}
$(function(){
  listenToChoiceTouchStart();
});
