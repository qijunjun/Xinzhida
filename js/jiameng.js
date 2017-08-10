/**
 * Created by 123 on 2017/8/9.
 */
$(function(){
    var box = $(".box");
    // 获取页面中有多少图片
    var imgWidth = box[0].offsetWidth;
    var minHeight =0;
    //图片的高度
    var minIndex =0;
    var imgData ={"data":[{"src":"../images/jiameng5.jpg"},{"src":"../images/jiameng6.jpg"},{"src":"../images/jiameng7.jpg"}]};
    //实现滚动加载
    $(window).scroll(function(){
        // 当页面的高度+scrollTop的高度大于最后一张距离顶部的高度时，开始加载
        if(checkFlag()){
            var str ="";
            for(var i=0;i<imgData.data.length;i++){
              str += "<div class='box'><div class='imgbox'><img src='"+imgData.data[i].src+"'></div></div>"
            }
            $("#container").append(str);
            imgLocation("container","box");
        }
    });
    function checkFlag(){
        // 获取最后一张图片距离顶部的距离
        var lastHeight = box[box.length -1].offsetTop;
        var scrollTop = $(document).scrollTop();
        // 当前页面的高度
        var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if(lastHeight<scrollTop+pageHeight){
            return true;
        }
    }
    imgLocation("container","box");
    function imgLocation(parent,content){
        var cparent = $("#"+parent);
        var ccontent = $("."+content);
        // 一行放图片的个数
        var Num =Math.floor(cparent.width()/imgWidth);
        cparent.css({width:imgWidth*Num+"px"},{margin:"0 auto"});
        var imgHeight =[];
        for(var i=0;i<ccontent.length;i++){
            if(i<Num){
                imgHeight.push($(".box")[i].offsetHeight);
                console.log(imgHeight);
            }else{
                minHeight = Math.min.apply(null,imgHeight);
                // 获取最小高度那个元素位于第几个
                minIndex =getminheightLocation(imgHeight,minHeight);
                ccontent[i].style.position="absolute";
                ccontent[i].style.top=minHeight+"px";
                // 把下面的元素的left值设为最小高度之前元素的总宽度
                ccontent[i].style.left = imgWidth*minIndex+"px";
                // ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
                imgHeight[minIndex] = imgHeight[minIndex]+ccontent[i].offsetHeight;
            }
        }
    }
    function getminheightLocation(imgHeight,minHeight){
        for(var j in imgHeight){
            if(imgHeight[j] == minHeight){
                return j;
            }
        }
    }
    // var father = document.getElementById('container');
    // var son = document.getElementById('box');
    // father.style.height=son.offsetHeight+'px';
});