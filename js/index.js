/**
 * Created by 123 on 2017/8/4.
 */
$(function(){
    // $(".nav>li").hover(function(){
    //     $(this).addClass("current").siblings().removeClass('current');
    // });
    // 无缝滚动开始
    var speed =10;
    var demo = document.getElementById("demo");
    var demo1 = document.getElementById("demo1");
    var demo2 = document.getElementById("demo2");
    $("#demo2").html($("#demo1").html());
    function slide(){
        if(demo2.offsetWidth-demo.scrollLeft <=0){
            demo.scrollLeft -=demo2.offsetWidth;
        }else{
            demo.scrollLeft++;
        }
    }
    var timer = setInterval(slide,speed);
    $(".demo").mouseenter(function(){
        clearInterval(timer);
    });
    $(".demo").mouseleave(function(){
        timer = setInterval(slide,speed);
    });
});