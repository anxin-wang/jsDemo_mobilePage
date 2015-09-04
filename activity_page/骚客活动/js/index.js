/*
	index.js: [parseJSON,BgLayout,Welcome,Questionnaire,actIndexNav]
*/

$(document).on('touchmove',function(e){
  e.preventDefault(); 
})

//parseJSON
function parseJSON(data) {
  if (typeof data != 'object'){
    return $.parseJSON(data);
  }
  else {
    return data;
  }
}





//背景布局
function BgLayout(){
    var self = this;
    this.bgLayout = function(){
    var wx = $(window).width();
    var wy = $(window).height();
    var x = 416;
    var y = 738;
    var zoom = 0;
    if(wx/wy > x/y){
      zoom = wx/x;
      console.log('x方向100%,zoom:'+zoom);
    }else{
      console.log('y方向100%,zoom:'+zoom)
      zoom = wy/y;
    }
    $('.bg').css({
      '-webkit-transform':'scale('+(zoom+0.05)+')',
      'position':'absolute',
      'left':(wx-x)/2+'px',
      'top':(wy-y)/2+'px',
    })
  }

  $(window).resize(function(){
    self.bgLayout();
  })
  self.bgLayout();
}





//Welcome 第一个板块,欢迎页面
function Welcome(){
  var self = this;

	this.page = new pageSwitch('pages',{
    duration:800,
    start:0,
    direction:1,
    loop:false,
    ease:'ease',
    transition:'zoomCover',
    mousewheel:true,
    arrowkey:true
	});


  //welcome animate
  function pageAnimate(dom,time){
      for(var i= 0;i<dom.length;i++){
        (function(e){
          setTimeout(function(){
          dom[e].addClass('anm');
          },time[e])      
        })(i)
      }
  }

  pageAnimate(
      [ $('.page1 .slogin')],
      [100]
  ); 

  var pageINTER = true;
  self.page.on('before',function(){
        if(pageINTER){
            pageINTER = false;
            clearInterval(addTAKE);
            var addTAKE = setTimeout(function(){
                $('.anm').removeClass('anm');
                pageINTER = true;
                switch(self.page.current)
                {
                case 1:
                    pageAnimate(
                        [ $('.page2 .slogin')],
                        [100]
                    ); 
                  break;
                case 0:
                    pageAnimate(
                        [ $('.page1 .slogin')],
                        [100]
                    );           
                case 2:
                    pageAnimate(
                        [ $('.page3 .slogin')],
                        [100]
                    );                  
                  break;        
                case 3:
                    pageAnimate(
                        [ $('.page4 .slogin')],
                        [100]
                    );   
                  break;
                default:

                }

            },50)           
        }

  }); 


}


//Questionnaire 第二个板块,问卷调查
function Questionnaire(){
  var self = this;
  //问卷答案为val;
  this.val = [];
  this.multipleChoice = [];

  this.renderHandbtn = function(){
    if(self.multipleChoice.length == 4){
      $('#wenjuanbox .handon').show();
    }else{
      $('#wenjuanbox .handon').hide();
    }
  }
  //左右滑动布局
  this.layout = new pageSwitch('wenjuanbox',{
    duration:800,
    start:0,
    direction:0,
    loop:false,
    ease:'ease',
    transition:'scroll',
    mousewheel:true,
    arrowkey:true
  });
  
  this.layout.freeze(true|false);
  this.layout.on('after',function(){
    self.renderNav(self.layout.current)          
  })

  //增加导航小圆点
  $('#wenjuanbox').append('<ul class="nav"></ul>')
  for(var i = 0; i<4 ;i++){
    if(i==0){
      $('#wenjuanbox .nav').append('<li class="current"></li>')
    }else{
      $('#wenjuanbox .nav').append('<li></li>')
    }
  }
  //增加提交按钮
  $('#wenjuanbox').append('<img class="handon" src="./image/wenjuan_hand.png" alt="" />')

  //渲染原点
  this.renderNav = function(page){
    $('#wenjuanbox .nav li').removeClass('current');
    $('#wenjuanbox .nav li').eq(page).addClass('current')
  }

  //选择题
  $('#wenjuanbox .page').each(function(){
    var $page = $(this);    
    $('li',$page).on('tap',function(){
      if(self.layout.current != 3){
        $(this).addClass('current');
        console.log(self.layout.current+'，'+$(this).index())
        self.val[self.layout.current] = $(this).index();
        self.layout.next();
      }
    })
  })

  //多选
  $('li',$('#wenjuanbox .page').eq(3)).on('tap',function(){
    if(!$(this).hasClass('current')){
      $(this).addClass('current');
      self.multipleChoice.push($(this).index());
      self.val[3] = self.multipleChoice;
      var inputVal = '';
      for(var i = 0; i<self.multipleChoice.length;i++){
        inputVal += ['A','B','C','D'][(self.multipleChoice)[i]]
      }
      $('#wenjuanbox .input').text(inputVal);
      self.renderHandbtn();
    }

  })
  //多选重置
  $('#wenjuanbox .reset').on('tap',function(){
    self.multipleChoice = [];
    self.val[3] = self.multipleChoice;
    $('#wenjuanbox .input').text('');
    $('li',$('#wenjuanbox .page').eq(3)).removeClass('current');
    self.renderHandbtn();
  })

  //提交给服务器
  $('.handon').on('tap',function(){
      var handOnval = {};
      handOnval.formVla = self.val;
      alert(JSON.stringify(handOnval))
      console.log(handOnval)
  })

} 



//奖品模块
function MyPrize(url){

  this.getLottry = function(){
    if(!saoke.isLottery){
      $.ajax({
        type: 'GET',
        url: saoke.interface.lottery,
        //async: false,
        success: function(data){
          if(data.status){
            saoke.lottery = parseJSON(data).data;
            saoke.isLottery = true;            
          }else{
            alert(data.description);
          }

        },
        error: function(xhr, type){
          alert('服务器出错，请稍后重试!')
        }
      })
    }  
  }

}
