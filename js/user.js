var USER = {
    getUser:function(){
        return JSON.parse(localStorage.getItem("user"));
    },
    clearUser:function(){
        localStorage.removeItem("user");
    },
    setUser:function(item){
        localStorage.setItem("user",JSON.stringify(item));
    },
    hasLogin:function(){
        var user = this.getUser();
        if(user && Object.keys(user).length>0) return true;
        return false;
    }
};