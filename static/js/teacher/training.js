const trainingVm = new Vue({
  el: "#app",
  data() {
    return {
      navIndex: "",
      allCourses: [],
      selectedStudents: [],
      notify:0
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
        case "5-2":
          window.location.href = base + "/userinfo.html";
          break;
        case "5-3":
          clearCookie();
          window.location.href = "http://" + window.location.host;
          break;
        case "5-1":
          window.location.href = base + "/notification.html";
          break;
      }
    },
  },
  mounted() {
    instance.get("/getCourses").then((res) => {
      trainingVm.allCourses = res.data["msg"];
    });
    instance.get("/teacher/viewAllSelectedStudents").then((res) => {
      trainingVm.selectedStudents = res.data["msg"];
    });
    instance.get("/teacher/viewAllApplyProgress").then((res) => {
      var notifications = res.data["msg"];
      for(var i = 0;i<notifications.length;i++){
        if(notifications[i].teacher_status==0){
            trainingVm.notify+=1
        }
      }
    });
  },
});
