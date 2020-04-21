const vm = new Vue({
  el: "#app",
  data() {
    return {
      activeIndex: "",
      showInfo:{display:""},
      msg:{},
      disable:true,
      infoDetails:{display:"none"}
    };
  },
  methods: {
    handleSelect(key) {
      const base = "http://" + window.location.host;
      switch (key) {
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
    logout(){
        clearCookie()
        window.location.href="http://"+window.location.host+"/m"
    },
    clear(){
        vm.showInfo = {display:''}
        vm.infoDetails = {display:'none'}
    },
    submit(){
        instance.post('/changeInfo',{
            "id":vm.msg.id,
            "phone":vm.msg.phone,
            "password":vm.msg.password
        }).then(()=>{
            vm.$message({
                message:'修改成功',
                type:'success'
            })
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }).catch(()=>{
            vm.$message({
                message:'修改失败',
                type:'error'
            })
            setTimeout(()=>{
                window.location.reload()
            },1000)
        })

      },
    userInfoPage(){
        vm.showInfo = {display:'none'}
        vm.infoDetails = {display:''}
    },
    change(){
        vm.disable = false
    },
  },
  mounted(){
    instance.get('getUserInfo').then(res=>{
        vm.msg=res.data["msg"]
        vm.msg.identify = "学生"
    })
}
});
