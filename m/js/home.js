const vm = new Vue({
    el:"#app",
    data(){
        return{
            activeIndex:'',
            msg:[]
        }
    },
    methods:{
        handleSelect(key) {
            const base = "http://" + window.location.host
            switch (key){
                case "0":
            window.location.href = base + "/m/board.html";
            break; 
                case "1":
                    window.location.href = base + "/m/home.html";
                    break;
                case "2":
                    window.location.href = base + "/m/create.html";
                    break;
                case "3":
                    window.location.href = base + "/m/more.html";
                    break;
            }
          }
    },
    mounted(){
        instance.get('/student/viewAllPublications').then(res=>{
            vm.msg = res.data["msg"]
          })
    }
})