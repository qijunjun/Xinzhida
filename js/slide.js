/**
 * Created by 123 on 2017/8/4.
 */
$(function(){
    //幻灯片
    autoplay();
    var prev = 0;
    var $li = $(".slide li");
    var liLen = $li.length;
    var timer;
    function autoplay(){
        timer =setInterval(function(){
            prev=$(".points .active").prevAll().length;
            nowLi = prev+1;
            $(".points li").eq(nowLi).addClass("active").siblings().removeClass("active");
            //滑动到最后一张幻灯片
            if(nowLi > liLen-1){
                $li.eq(0).css({left:1113}).animate({left:0});
                $li.eq(prev).animate({left:-1113});
                $(".points li").eq(0).addClass("active").siblings().removeClass("active");
            }else{
                $li.eq(prev).animate({left:-1113});
                $li.eq(nowLi).css({left:1113}).animate({left:0});
            }
        },5000);
    }
    $li.hover(function(){
        clearInterval(timer);
    },function(){
        autoplay();
    });
    //幻灯片切换
    function move(prevLi,nowLi){
        //判断prevLi和nowLi的大小，来确定幻灯片往哪边移动
        if(prevLi == nowLi){
            return false;
        }else if(prevLi<nowLi){
            //比如所在位置为第1个，此时点击第4个按钮
            $li.eq(prevLi).animate({left:-1113});
            $li.eq(nowLi).css({left:1113}).animate({left:0});
        }else{
            //比如当前所在的位置为3，此时点击第2个按钮，需要往右滑
            $li.eq(prevLi).animate({left:1113});
            $li.eq(nowLi).css({left:-1113}).animate({left:0});
        }
    }
    $(".points").delegate("li","click",function(){
        prev = $(".points .active").prevAll().length;
        //即将要滑来的元素
        var i = $(this).index();
        move(prev,i);
        $(this).addClass("active").siblings().removeClass("active");
    });
    // 幻灯片结束
    // 无缝滚动开始
    var speed =10;
    var demo = document.getElementById("demo");
    var demo1 = document.getElementById("demo1");
    var demo2 = document.getElementById("demo2");
    demo2.innerHTML = demo1.innerHTML;
    function slide(){
        if(demo2.offsetWidth-demo.scrollLeft <=0){
            demo.scrollLeft -=demo2.offsetWidth;
        }else{
            demo.scrollLeft++;
        }
    }
    timer = setInterval(slide,speed);
    $(".demo").mouseenter(function(){
        clearInterval(timer);
    });
    $(".demo").mouseleave(function(){
        timer = setInterval(slide,speed);
    })
});