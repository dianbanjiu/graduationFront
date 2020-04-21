const vm = new Vue({
    el:"#app",
    data(){
        return{
            activeIndex:'',
            newPost:''
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
          },
          clear(){
              vm.newPost = ""
          },
          addNewPost(){
            if(vm.newPost.length!=0){
                instance.post('/student/addPublication',{
                  content:vm.newPost
                }).then(()=>{
                  vm.$message({
                    message:'发布成功',
                    type:'success'
                  })
                  setTimeout(()=>{
                    window.location.href = "http://" + window.location.host + "/home.html";
                  },1000)
                }).catch(()=>{
                  publicationVm.$message({
                    message:'发布失败',
                    type:'error'
                  })
                })
              }
          }
    },
    mounted(){
    
    }
})
