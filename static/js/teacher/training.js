const trainingVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: [],
      navIndex: "",
      allCourses:[],
      selectedStudents:{},
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
  },
  mounted() {
    instance.get('/getCourses').then(res=>{
        trainingVm.allCourses=res.data["msg"]
      })
    instance.get("/teacher/viewAllSelectedStudents").then(res=>{
      trainingVm.selectedStudents=res.data["msg"]})
  },
});
