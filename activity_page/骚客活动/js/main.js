
window.welcome = {}; // welcome对象
window.questionnaire = {}; //问卷调查对象;
window.bgLayout = {};
window.myPrize = {};
function loadResources(callback) {  //图片资源预加载

  var resources = [];
  $('img').each(function(){ 
    resources.push($(this).attr('src'))
  });
  var selfleng=0;
  for(var i=0; i<resources.length; i++){
    var imageobj = new Image();
    imageobj.index = i;
    imageobj.onload  = function(){
      selfleng += 1;
      if(selfleng==resources.length){
        setTimeout(function(){
          callback();
        },800)
      }
    }
    imageobj.src = resources[i]
  }
}
   
loadResources(function(){

    $('.loading').fadeOut(200);
    bgLayout = new BgLayout();
    welcome = new Welcome();
    questionnaire = new Questionnaire();
    myPrize = new MyPrize();
})


