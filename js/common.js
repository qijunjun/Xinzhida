/**
 * Created by 123 on 2017/8/4.
 */
$(function(){
    //幻灯片
    var prev = 0;
    var nowLi;
    var $li = $(".slide li");
    var liLen = $li.length;
    var timer =setInterval(autoPlay,4000);
    $(".slide").mouseenter(function(){
        clearInterval(timer);
    });
    $(".slide").mouseleave(function(){
        timer = setInterval(autoPlay,4000);
    });
    function autoPlay(){
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
    }
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
    $(".nav").delegate("li","click",function(){
        var id =$(this).index();
        var href = $(this).children("a").attr("href");
        if(href == "index.html"){
            $(this).addClass("current");
        }
        $(this).children("a").attr("href",href+"?id="+id);
    });
    // 在线咨询
    $(window).scroll(function(){
        var top = $(this).scrollTop();
        if(top>300){
            $(".contact").css({top:"50%"});
        }else if(top == 0){
            $(".contact").animate({top:"50%"});
        }
        else{
            $(".contact").css({top:top});
        }
    });
    //实现点击哪个链接，对应的链接上面样式改变
    var str = window.location.href.split("=")[1];
    $(".nav>li").eq(str).addClass("current");
});