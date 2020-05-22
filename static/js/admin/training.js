const courseVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: [],
      navIndex: "",
      searchCourse: "",
      select: "",
      multipleSelection: [],
      dialogAddOneTrainingVisible: false,
      dialogAddMuchVisible: false,
      trainingForm: {},
      formLabelWidth: "200px",
      fileList: [],
      getHeader: { Authorization: "Bearer " + getCookie("token") },
      currentPage: 1,
      courses: [],
      notify: 0,
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
        case "6-2":
          window.location.href = base + "/userinfo.html";
          break;
        case "6-3":
          clearCookie();
          window.location.href = "http://" + window.location.host;
          break;
        case "6-1":
          window.location.href = base + "/notification.html";
          break;
      }
    },
    handleSelectionChange(val) {
      courseVm.multipleSelection.push(val);
    },
    deleteCourses() {
      courseVm
        .$confirm("此操作将永久删除该实训, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          if (courseVm.multipleSelection.length === 0) {
            return;
          }
          for (var i = 0; i < courseVm.multipleSelection.length; i++) {
            instance.post("/admin/deleteCourses", {
              id: courseVm.multipleSelection[i][0].id,
            });
          }
          courseVm.$message({
            message: "删除成功",
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    findCourse() {
      let t = [];
      if (courseVm.select === "id") {
        for (let i = 0; i < courseVm.msg.length; i++) {
          if (courseVm.msg[i].id === courseVm.searchCourse) {
            t.push(courseVm.msg[i]);
          }
        }
      } else if (courseVm.select === "name") {
        for (let i = 0; i < courseVm.msg.length; i++) {
          if (courseVm.msg[i].name === courseVm.searchCourse) {
            t.push(courseVm.msg[i]);
          }
        }
      }
      courseVm.courses = t;
    },
    pushTraining() {
      courseVm.dialogAddOneTrainingVisible = false;
      instance
        .post("admin/addCourse", {
          id: courseVm.trainingForm.id,
          name: courseVm.trainingForm.name,
          company: courseVm.trainingForm.company,
          mentor: courseVm.trainingForm.mentor,
          count: parseInt(courseVm.trainingForm.count),
          desc: courseVm.trainingForm.desc,
          address: courseVm.trainingForm.address,
        })
        .then((_) => {
          courseVm.$message({
            message: "创建成功",
            type: "success",
          });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        })
        .catch((_) => {
          courseVm.$message({
            message: "创建失败",
            type: "error",
          });
        });
    },
    submitUpload() {
      courseVm.$refs.upload.submit();
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    },
    handleCommand(command) {
      if (command === "one") {
        courseVm.dialogAddOneTrainingVisible = true;
      } else if (command === "much") {
        courseVm.dialogAddMuchVisible = true;
      }
    },
  },
  mounted() {
    instance.get("/getCourses").then((res) => {
      courseVm.msg = res.data["msg"];
      courseVm.courses = courseVm.msg.slice(0, 10);
    });
    instance.get("/admin/viewAllApplyProgress").then((res) => {
      var notifications = res.data["msg"];
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].teacher_status == 0) {
          courseVm.notify += 1;
        }
      }
    });
  },
  watch: {
    currentPage(val) {
      courseVm.courses = courseVm.msg.slice(10 * (val - 1), 10 * val);
    },
  },
});
