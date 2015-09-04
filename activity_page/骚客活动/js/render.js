var fontArray = ['我喜欢带着耳机跑步','我喜欢开着app跑步','我喜欢和大家一起跑步'];
var imgArray = ['<img src="./image/1.png" width="45" />','<img src="./image/2.png" width="40" />',' <img src="./image/3.png" width="47" />',' <img src="./image/4.png" width="50" />']
var mubiaolicheng = ['50公里','25公里','15公里']

function render(dom){
  //渲染保证书页面
  if(dom == $baozhengshu){
    (function(){
      var par = $('#baozhengshu');
      $('.userName',par).text(saoke.questionnaire_result.name+':')
      $('.notes',par).text(fontArray[saoke.questionnaire_result.questionnaire[2]])
      $('.awardList div',par).html('');
      for(var i = 0;i<4;i++){
        $('.awardList div',par).eq(i).append(imgArray[saoke.questionnaire_result.questionnaire[3][i]])   
      }
    })()
  }
  //渲染已经扫描后的保证书页面
  if(dom == $baozhengshuAfter){
    (function(){
      var par = $('#baozhengshuAfter');
      $('.userName',par).text(saoke.questionnaire_result.name+':')
      $('.notes',par).text(fontArray[saoke.questionnaire_result.questionnaire[2]])
      $('.awardList div',par).html('');
      for(var i = 0;i<4;i++){
        $('.awardList div',par).eq(i).append(imgArray[saoke.questionnaire_result.questionnaire[3][i]])   
      }
    })()
  }

  //渲染个人中心页面

  if(dom == $personCenter){
    (function(){
      var par = $('.personCenter');
      $('.potrait',par).attr('src',saoke.base_info.portrait);
      $('.msg li b',par).eq(0).text(saoke.questionnaire_result.name)
      $('.msg li b',par,par).eq(1).text(saoke.questionnaire_result.phone)
      $('.msg li b',par).eq(2).text(saoke.questionnaire_result.date)
      $('.blo2 .fr',par).text(saoke.questionnaire_result.run_length+'公里')
      $('.blo3 .fr',par).text(mubiaolicheng[saoke.questionnaire_result.questionnaire[1]])
    })()
  }

  //我的奖品页面

  if(dom == $myPrize){
    (function(){
      var par = $('.myPrize');
      if(!saoke.base_info.is_lottery){ //没有参与抽奖的情况
          $('.rewared', par).hide();
          $('.no_rewared', par).show();
      }else{ //抽了奖品的情况
        $('.rewared', par).show();
        $('.no_rewared', par).hide();
        if(saoke.base_info.lottery_result.entity_award != 0){
          $('.cont .shitijiang img').removeClass('rew').eq(saoke.base_info.lottery_result.entity_award-1).addClass('rew');
        }else{
          $('.cont .shitijiang img').remove();
        }
        $('.youhuijuan .input',par).text(saoke.base_info.lottery_result.coupon_code)
      }
    })()
  }


}
