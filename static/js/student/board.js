var boardVm = new Vue({
    el:'#app',
    data(){
        return{
            navIndex:"",
            msg:{},
        }
    },
    methods:{
        navSelect(key){
            iden = getCookie("identify");
            const base = "http://" + window.location.host + "/" + iden;
            switch (key) {
              case "1":
                window.location.href = base + "/board.html";
                break;
              case "2":
                window.location.href = base + "/board.html";
                break;
              case "3":
                window.location.href = base + "/training.html";
                break;
              case "4":
                window.location.href = base + "/publication.html";
                break;
              case "5-1":
                window.location.href = base + "/userinfo.html";
                break;
              case "5-2":
                clearCookie();
                window.location.href = "http://" + window.location.host;
                break;
            }
        }
    },
    mounted(){
        instance.get('/getBoards').then(res=>{
            boardVm.msg=res.data["msg"]
        })
    }
})