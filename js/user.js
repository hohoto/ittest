var USER = {
    getUser:function(){
        return localStorage.getItem("user");
    },
    clearUser:function(){
        localStorage.removeItem("user");
    },
    setUser:function(item){
        localStorage.setItem("user",item);
    },
    hasLogin:function(){
        var user = this.getUser();
        if(Object.keys(user).length>0) return true;
        return false;
    }
};