const boardVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: [],
      navIndex: "",
      dialogVisible: false,
      newBoardContent:''
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
          window.location.href = base + "/teacher.html";
          break;
        case "5":
          window.location.href = base + "/student.html";
          break;
        case "6-1":
          window.location.href = base + "/userinfo.html";
          break;
        case "6-2":
          clearCookie();
          window.location.href = "http://" + window.location.host;
          break;
      }
    },
    addBoard(content){
        boardVm.dialogVisible = false
        instance.post('/admin/addBoard',{
            "content":content,
        }).then(()=>{
            boardVm.$message({
                message:'添加成功',
                type:'success',
            })
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }).catch(()=>{
            boardVm.$message({
                message:'添加失败',
                type:'error',
            })
            setTimeout(()=>{
                window.location.reload()
            },1000)
        })
    },
    deleteBoard(item){
        instance.post('/admin/deleteBoard',{
            'id':item.id
        }).then(()=>{
            boardVm.$message({
                message:'删除成功',
                type:'success',
            })
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }).catch(()=>{
            boardVm.$message({
                message:'删除失败',
                type:'error',
            })
            setTimeout(()=>{
                window.location.reload()
            },1000)
        })
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },
  mounted(){
      instance.get('/getBoards').then(res=>{
         boardVm.msg = res.data["msg"] 
      })
      }
  }
);
