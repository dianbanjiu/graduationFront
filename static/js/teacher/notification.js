const status = new Map();
status.set("0", "等待审核");
status.set("1", "审核通过");
status.set("2", "审核失败");
const notifyVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: [],
      navIndex: "",
      courses: [],
      unhandleNotify: [],
      handledNotify: [],
      disabled:true,
      dialogVisible:false,
      statuses:[{
        value: '1',
        label: '同意'
      }, {
        value: '2',
        label: '拒绝'
      }],
      tStatus:"",
      id:"",
      index:"",
    };
  },
  methods: {
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
    setId(index, val){
        notifyVm.dialogVisible = true
        notifyVm.index=index
        notifyVm.id=val
    },
    allNotifyButton(){
        window.location.reload()
    },
    notNotifyButton(){
        notifyVm.courses=notifyVm.unhandleNotify
        notifyVm.disabled=false
    },
    alreadyNotifyButton(){
        notifyVm.courses=notifyVm.handledNotify
        notifyVm.disabled=true
    },
    handleEdit() {
        notifyVm.dialogVisible=false
        if(notifyVm.tStatus==""){
            return
        }

        instance.post("/teacher/handleApplyCourse",{
            id: notifyVm.id,
            teacher_status:notifyVm.tStatus
        }).then(res=>{
            notifyVm.unhandleNotify.splice(notifyVm.index,notifyVm.index+1)
            notifyVm.$message({
                message:res.data["msg"],
                type:'success'
            })
        }).catch(err=>{
            notifyVm.$message({
                message:"审核失败",
                type:"error"
            })
        })
    },
  },
  mounted() {
    instance.get("/teacher/viewAllApplyProgress").then((res) => {
      notifyVm.msg = res.data["msg"];
      for(var i = 0;i<notifyVm.msg.length;i++){
        if(notifyVm.msg[i].teacher_status==0){
            notifyVm.unhandleNotify.push(notifyVm.msg[i])
        }else{
            notifyVm.handledNotify.push(notifyVm.msg[i])
        }  
        notifyVm.msg[i].teacher_status=status.get(notifyVm.msg[i].teacher_status)
          notifyVm.msg[i].admin_status=status.get(notifyVm.msg[i].admin_status) 
      }
      notifyVm.courses = notifyVm.msg;
    });
  },
});
