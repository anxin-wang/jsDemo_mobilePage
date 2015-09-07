$(function(){
    var $rotaryArrow = $('#arrow');
    var $result = $('#result');
    var $resultTxt = $('#resultTxt');
    var $resultBtn = $('#result');
 
    $rotaryArrow.click(function(){
        var data = [0, 1, 2, 3, 4, 5, 6, 7];
        //data = data[Math.floor(Math.random()*data.length)];
        data=2;
        switch(data){
            case 1: 
                rotateFunc(1,87,'��ϲ������ <em>1</em> Ԫ���ȯ');
                break;
            case 2: 
                rotateFunc(2,43,'��ϲ������ <em>5</em> Ԫ���ȯ');
                break;
            case 3: 
                rotateFunc(3,134,'��ϲ������ <em>10</em> Ԫ���ȯ');
                break;
            case 4: 
                rotateFunc(4,177,'���ź��������δ���н���������Ͱ�');
                break;
            case 5: 
                rotateFunc(5,223,'��ϲ������ <em>20</em> Ԫ���ȯ');
                break;
            case 6: 
                rotateFunc(6,268,'��ϲ������ <em>50</em> Ԫ���ȯ');
                break;
            case 7: 
                rotateFunc(7,316,'��ϲ������ <em>30</em> Ԫ���ȯ');
                break;
            default:
                rotateFunc(0,0,'���ź��������δ���н���������Ͱ�');
        }
    });
 
    var rotateFunc = function(awards,angle,text){  //awards:���angle:�����Ӧ�ĽǶ�
        $rotaryArrow.stopRotate();
        $rotaryArrow.rotate({
            angle: 0,
            duration: 5000,
            animateTo: angle + 1440,  //angle��ͼƬ�ϸ������Ӧ�ĽǶȣ�1440����ָ��̶���ת4Ȧ
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