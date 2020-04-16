const infoVm = new Vue({
    el:'#app',
    data(){
        return{
            msg:{},
            navIndex:'',
            disable:true,
        }
    },
    methods:{
        navSelect(key) {
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
          },
          change(){
              infoVm.disable = false
          },
          clear(){
              window.location.reload()
          },
          submit(){
            instance.post('/changeInfo',{
                "id":infoVm.msg.id,
                "phone":infoVm.msg.phone,
                "password":infoVm.msg.password
            }).then(()=>{
                infoVm.$message({
                    message:'修改成功',
                    type:'success'
                })
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }).catch(()=>{
                infoVm.$message({
                    message:'修改失败',
                    type:'error'
                })
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            })

          }

    },
    mounted(){
        instance.get('getUserInfo').then(res=>{
            infoVm.msg=res.data["msg"]
            infoVm.msg.identify = "学生"
        })
    }
})