export default{
    state:{
        accessToken:'',
    },
    setAccessToken:function (token) {
        localStorage.setItem("LS_ACCESSTOKEN", token);
    },
    getAccessToken:function () {
        return localStorage.getItem("LS_ACCESSTOKEN");
    },
    clearAccessToken: function () {
        localStorage.removeItem('LS_ACCESSTOKEN');
    }
}