/**
 * Created by 123 on 2017/8/4.
 */
$(function(){
    $(".nav>li").hover(function(){
        $(this).addClass("current").siblings().removeClass('current');
    })
});