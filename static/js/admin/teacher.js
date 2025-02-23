const teacherVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: "",
      navIndex: "",
      searchTeacher: "",
      select: [],
      adduservisible: { display: "none" },
      userone: {},
      dialogVisible: false,
      fileList: [],
      getHeader: { Authorization: "Bearer " + getCookie("token") },
      currentPage: 1,
      teachers: [],
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
    findTeacher() {
      let t = [];
      if (teacherVm.select === "id") {
        for (let i = 0; i < teacherVm.msg.length; i++) {
          if (teacherVm.msg[i].id === teacherVm.searchTeacher) {
            t.push(teacherVm.msg[i]);
          }
        }
      } else if (teacherVm.select === "name") {
        for (let i = 0; i < teacherVm.msg.length; i++) {
          if (teacherVm.msg[i].name === teacherVm.searchTeacher) {
            t.push(teacherVm.msg[i]);
          }
        }
      }
      teacherVm.teachers = t;
    },
    deleteTeachers() {
      teacherVm
        .$confirm("确定删除该教师？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          if (teacherVm.multipleSelection.length === 0) {
            return;
          }
          for (var i = 0; i < teacherVm.multipleSelection.length; i++) {
            instance.post("/admin/deleteUsers", {
              id: teacherVm.multipleSelection[i].id,
            });
          }
          teacherVm.$message({
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
    handleSelectionChange(val) {
      teacherVm.multipleSelection = val;
    },
    handleCommand(command) {
      if (command === "one") {
        teacherVm.adduservisible = { display: "" };
      } else if (command === "much") {
        teacherVm.dialogVisible = true;
      }
    },
    hideAdd() {
      teacherVm.adduservisible = { display: "none" };
    },
    pushuser() {
      if (
        teacherVm.userone.id == undefined ||
        teacherVm.userone.name == undefined ||
        teacherVm.userone.phone == undefined ||
        teacherVm.userone.phone.length != 11 ||
        teacherVm.userone.school == undefined ||
        teacherVm.userone.profession == undefined ||
        teacherVm.userone.gender == undefined
      ) {
        teacherVm.$message({
          message: "添加失败，请检查用户信息",
          type: "error",
        });
        return;
      }
      teacherVm.userone.identify = teacherVm.msg[0].identify;
      instance
        .post("/admin/addUser", {
          id: teacherVm.userone.id,
          name: teacherVm.userone.name,
          identify: teacherVm.msg[0].identify,
          phone: teacherVm.userone.phone,
          school: teacherVm.userone.school,
          profession: teacherVm.userone.profession,
          gender: teacherVm.userone.gender,
        })
        .then((res) => {
          teacherVm.$message({
            message: "添加成功",
            type: "success",
          });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          teacherVm.$message({
            message: err.response.data["msg"],
            type: "error",
          });
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    uploadSuccess() {
      window.location.reload();
    },
  },
  mounted() {
    instance
      .get("/admin/getUsersInfo", {
        params: {
          identify: "teacher",
        },
      })
      .then((res) => {
        teacherVm.msg = res.data["msg"];
        teacherVm.teachers = teacherVm.msg.slice(0, 10);
      });
    instance.get("/admin/viewAllApplyProgress").then((res) => {
      var notifications = res.data["msg"];
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].teacher_status == 0) {
          teacherVm.notify += 1;
        }
      }
    });
  },
  watch: {
    currentPage(val) {
      teacherVm.teachers = teacherVm.msg.slice(10 * (val - 1), 10 * val);
    },
  },
});
