
function turnTo(dom){
  $('.bgconter').hide();
  dom.show();
}

function info_page(){
  if(!saoke.base_info.is_join){
    turnTo($wel_page);
    return;
  }
  if(!saoke.base_info.is_questionnaire){
    turnTo($wenjuan)
    return;
  }
  if(!saoke.base_info.is_guarantee){
    turnTo($confirmWindow);
    return;  
  }
  if(!saoke.base_info.is_scan){
    turnTo($baozhengshu)
    render($baozhengshu);
    return;    
  }
  if(!saoke.base_info.is_lottery){
    turnTo($baozhengshuAfter)
    render($baozhengshuAfter);
    return;
  }
  if(saoke.base_info.is_lottery){
    turnTo($actIndexNav)
  }

}

info_page();



$('.returnIndex').on('tap',function(){
  turnTo($actIndexNav);
})

$('.inUserblock').on('tap',function(){
  turnTo($personCenter);
  render($personCenter);
})

$('.welcome_page .cljoin').on('tap',function(){
  turnTo($wenjuan);
  if(!saoke.base_info.is_join){
      $.ajax({
        type: 'GET',
        url: saoke.interface.join,
        //async: false,
        success: function(data){
          if(data.status){
            turnTo($wenjuan);               
          }else{
            alert(data.description);
          }

        },
        error: function(xhr, type){
          alert('服务器出错，请稍后重试!')
      }
    })
  }
})


$('.personCenter .blo4').on('tap',function(){
  turnTo($myPrize);
  render($myPrize);
})