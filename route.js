var instance = axios.create({
    baseURL : 'http://127.0.0.1:9091/api',
    timeout: 1000,
    headers: { Authorization: `Bearer `+getCookie("token") }
});
function setCookie(cookieName,cookieValue){
    document.cookie = cookieName+"="+cookieValue;
};

function getCookie(cookieName){
    var ca = document.cookie.split(";")
    for (var i = 0;i<ca.length;i++){
        var c = ca[i].split("=")
        if (c[0]==cookieName){
            return c[1]
        }
    }
    return ""
}