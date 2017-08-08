/**
 * Created by 123 on 2017/8/8.
 */
$(function(){
    var usernameVal ="";
    var emailVal = "";
    var QQVal = "";
    var telVal = "";
    var contentVal = "";
    //用户名必须是以字母数字下划线开头，5到15位
    var regName = /^\w{5,15}$/i;
    var regEmail = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
    var regQQ =/^\d{5,12}/;
    var regTel =/[0-9-()（）]{7,18}/;
    // 封装验证函数
    function check(selector,val,reg,empty,regInfo){
        if(val == ""){
            selector.next().html(empty).addClass("error");
            return false;
        }else{
            //其次验证是否符合相应的正则表达式
            if(!reg.test(val)){
                selector.next().html(regInfo);
                return false;
            }else{
                selector.next().hide();
            }
        }
    }
    $("#username").blur(function(){
       usernameVal =$(this).val();
       check($(this),usernameVal,regName,"用户名不能为空","用户名开头必须是以字母数字下划线，长度为5~15位")
    });
    $("#email").blur(function(){
        emailVal =$(this).val();
        check($(this),emailVal,regEmail,"邮箱不能为空","邮箱格式不正确")
    });
    $("#QQ").blur(function(){
        QQVal =$(this).val();
        check($(this),QQVal,regQQ,"QQ不能为空","QQ格式不正确")
    });
    $("#tel").blur(function(){
        telVal =$(this).val();
        check($(this),telVal,regTel,"电话不能为空","电话格式不正确")
    });
    $("#content").blur(function () {
        contentVal = $(this).val();
        if(contentVal == ""){
            $(this).next().html("内容不能为空").addClass("error");
            return false;
        }else{
            $(this).next().hide();
        }
    });
    $("button").click(function(){
       if($(".error").length != 0){
           return false
       }else{
           $.ajax({
               url:"数据提交接口",
               type:"post",
               dataType:"json",
               data:{name:usernameVal,email:emailVal,qq:QQVal,tel:telVal,content:contentVal},
               success:function(res){
                   console.log(res);
               },
               error:function(err){
                   console.log(err);
               }
           })
       }
    })
});