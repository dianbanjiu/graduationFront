var boardVm = new Vue({
    el:'#app',
    data(){
        return{
            navIndex:"",
            selectedCourse:[],
            allCourses:[],
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
        },
        dropCourse(){
          if (boardVm.selectedCourse.length===0||boardVm.selectedCourse[0].id===undefined||boardVm.selectedCourse[0].id===""){
            boardVm.$message({
              message:'你还尚未选择任何课程',
              type:'warning'
            })
          }else{
            instance.post('/student/dropCourse',{
              id:boardVm.selectedCourse[0].id
            }).then(()=>{
              boardVm.$message({
                message:'退选成功',
                type:'success'
              })
              setTimeout(()=>{
                window.location.reload()
              },1000)
            }).catch(()=>{
              boardVm.$message({
                message:'退选失败',
                type:'error'
              })
            })
          }
        },
        selectCourse(id){
          if(boardVm.selectedCourse.length!=0){
            boardVm.$message({
              message:'请先退选已选课程',
              type:'wrining'
            })
          }else{
            instance.post('/student/selectCourse',{
              id:id
            }).then(()=>{
              boardVm.$message({
                message:'选课成功',
                type:'success'
              })
              setTimeout(()=>{
                window.location.reload()
              },1000)
            }).catch(()=>{
              boardVm.$message({
                message:'选课失败',
                type:'error'
              })
            })
          }
        },
    },
    mounted(){
        instance.get('/student/alreadySelectedCourse').then(res=>{
          boardVm.selectedCourse.push(res.data["msg"])
        })
        instance.get('/getCourses').then(res=>{
          boardVm.allCourses=res.data["msg"]
        })
    }
})