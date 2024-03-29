var LOGIN = {
    loginUrl:"/user/login",
    login:function() {
        if(!$("input[name=userCode]").val() || !$("input[name=password]").val()){
            layer.msg("用户名密码不能为空", {
                time: 2000
            });
            return ;
        }

        if($("#code").val()!=$(".code").val()){
            layer.msg("验证码错误", {
                time: 2000
            });
            return ;
        }
        $.ajax({
            url:window.ITM.restDomain+ this.loginUrl,
            type:"post",
            data:{
                "usercode":$("input[name=userCode]").val(),
                "password":$("input[name=password]").val()
            },success:function(e){
                if(e && e.loginInfo){
                     USER.setUser(e.loginInfo);
                     window.location.href = window.ITM.jumpDomain + "index.html";
                 }else{
                    layer.msg(e.msg, {
                        time: 2000
                    });
                }
            },error:function(){
                layer.msg("登陆失败", {
                    time: 2000
                });
            }
        })
    },
    bindEvent:function(){
        var _this = this;
        $("#login").click(function(){
            _this.login();
        })
    },
    init:function(){
        this.bindEvent();
        return this;
    }
}.init();


