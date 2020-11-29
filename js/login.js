var LOGIN = {
    loginUrl:"/test1/testData/login",
    login:function() {
        $.ajax({
            url:window.ITM.restDomain+ this.loginUrl,
            type:"post",
            data:{
                "usercode":$("input[name=userCode]").val(),
                "password":$("input[name=password]").val()
            },success:function(e){
                 USER.setUser(e);
                 window.location.href= window.ITM.jumpDomain + "index.html";
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


