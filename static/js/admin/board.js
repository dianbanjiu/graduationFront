const boardVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: [],
      navIndex: "",
      dialogVisible: false,
      newBoardContent: "",
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
    addBoard(content) {
      boardVm.dialogVisible = false;
      instance
        .post("/admin/addBoard", {
          content: content,
        })
        .then(() => {
          boardVm.$message({
            message: "添加成功",
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          boardVm.$message({
            message: "添加失败",
            type: "error",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    },
    deleteBoard(item) {
      boardVm
        .$confirm("此操作将永久删除该公告, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          instance
            .post("/teacher/deleteBoard", {
              id: item.id,
            })
            .then(() => {
              boardVm.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
            .catch(() => {
              boardVm.$message({
                message: "删除失败",
                type: "error",
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  mounted() {
    instance.get("/getBoards").then((res) => {
      boardVm.msg = res.data["msg"];
    });
    instance.get("/admin/viewAllApplyProgress").then((res) => {
      var notifications = res.data["msg"];
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].teacher_status == 0) {
          boardVm.notify += 1;
        }
      }
    });
  },
});
