$(function(){
    var $rotaryArrow = $('#rotaryArrow');
    var $result = $('#result');
    var $resultTxt = $('#resultTxt');
    var $resultBtn = $('#result');
 
    $rotaryArrow.click(function(){
        var data = [0, 1, 2, 3, 4, 5, 6, 7];
        //data = data[Math.floor(Math.random()*data.length)];
        data=2;
        switch(data){
            case 1: 
                rotateFunc(1,87,'恭喜您获得了 <em>1</em> 元代金券');
                break;
            case 2: 
                rotateFunc(2,43,'恭喜您获得了 <em>5</em> 元代金券');
                break;
            case 3: 
                rotateFunc(3,134,'恭喜您获得了 <em>10</em> 元代金券');
                break;
            case 4: 
                rotateFunc(4,177,'很遗憾，这次您未抽中奖，继续加油吧');
                break;
            case 5: 
                rotateFunc(5,223,'恭喜您获得了 <em>20</em> 元代金券');
                break;
            case 6: 
                rotateFunc(6,268,'恭喜您获得了 <em>50</em> 元代金券');
                break;
            case 7: 
                rotateFunc(7,316,'恭喜您获得了 <em>30</em> 元代金券');
                break;
            default:
                rotateFunc(0,0,'很遗憾，这次您未抽中奖，继续加油吧');
        }
    });
 
    var rotateFunc = function(awards,angle,text){  //awards:奖项，angle:奖项对应的角度
        $rotaryArrow.stopRotate();
        $rotaryArrow.rotate({
            angle: 0,
            duration: 5000,
            animateTo: angle + 1440,  //angle是图片上各奖项对应的角度，1440是让指针固定旋转4圈
            callback: function(){
                $resultTxt.html(text);
                $result.show();
            }
        });
    };
 
    $resultBtn.click(function(){
        $result.hide();
    });
});