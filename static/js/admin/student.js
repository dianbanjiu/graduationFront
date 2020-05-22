const studentVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: "",
      navIndex: "",
      searchstudent: "",
      select: [],
      adduservisible: { display: "none" },
      userone: {},
      dialogVisible: false,
      fileList: [],
      getHeader: { Authorization: "Bearer " + getCookie("token") },
      currentPage: 1,
      students: [],
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
    findstudent() {
      let t = [];
      if (studentVm.select === "id") {
        for (let i = 0; i < studentVm.msg.length; i++) {
          if (studentVm.msg[i].id === studentVm.searchstudent) {
            t.push(studentVm.msg[i]);
          }
        }
      } else if (studentVm.select === "name") {
        for (let i = 0; i < studentVm.msg.length; i++) {
          if (studentVm.msg[i].name === studentVm.searchstudent) {
            t.push(studentVm.msg[i]);
          }
        }
      }
      studentVm.students = t;
    },
    deletestudents() {
      studentVm
        .$confirm("确定删除该名学生?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          if (studentVm.multipleSelection.length === 0) {
            return;
          }
          for (var i = 0; i < studentVm.multipleSelection.length; i++) {
            instance.post("/admin/deleteUsers", {
              id: studentVm.multipleSelection[i].id,
            });
          }
          studentVm.$message({
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
      studentVm.multipleSelection = val;
    },
    handleCommand(command) {
      if (command === "one") {
        studentVm.adduservisible = { display: "" };
      } else if (command === "much") {
        studentVm.dialogVisible = true;
      }
    },
    hideAdd() {
      studentVm.adduservisible = { display: "none" };
    },
    pushuser() {
      if (
        studentVm.userone.id == undefined ||
        studentVm.userone.name == undefined ||
        studentVm.userone.phone == undefined ||
        studentVm.userone.phone.length != 11 ||
        studentVm.userone.school == undefined ||
        studentVm.userone.profession == undefined ||
        studentVm.userone.gender == undefined
      ) {
        studentVm.$message({
          message: "添加失败，请检查用户信息",
          type: "error",
        });
        return;
      }
      studentVm.userone.identify = studentVm.msg[0].identify;
      instance
        .post("/admin/addUser", {
          id: studentVm.userone.id,
          name: studentVm.userone.name,
          identify: studentVm.msg[0].identify,
          phone: studentVm.userone.phone,
          school: studentVm.userone.school,
          profession: studentVm.userone.profession,
          gender: studentVm.userone.gender,
        })
        .then((res) => {
          studentVm.$message({
            message: "添加成功",
            type: "success",
          });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          studentVm.$message({
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
          identify: "student",
        },
      })
      .then((res) => {
        studentVm.msg = res.data["msg"];
        studentVm.students = studentVm.msg.slice(0, 10);
      });
    instance.get("/admin/viewAllApplyProgress").then((res) => {
      var notifications = res.data["msg"];
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].teacher_status == 0) {
          studentVm.notify += 1;
        }
      }
    });
  },
  watch: {
    currentPage(val) {
      studentVm.students = studentVm.msg.slice(10 * (val - 1), 10 * val);
    },
  },
});
