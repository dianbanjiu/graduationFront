const status = new Map();
status.set("0", "等待审核");
status.set("1", "审核通过");
status.set("2", "审核失败");
var boardVm = new Vue({
  el: "#app",
  data() {
    return {
      navIndex: "",
      selectedCourse: [],
      allCourses: [],
      courses: [],
      currentPage: 1,
      searchCourse: "",
      select: "",
      applyCourseDialogVisible: false,
      applyCourseForm: {
        id: "",
        course_name: "",
        address: "",
        desc: "",
        company: "",
        student_name: "",
        student_id: "",
        mentor_id: "",
        mentor_name: "",
        teacher_status: "",
        admin_status: "",
      },
      teacherStatus: "",
      adminStatus: "",
      disabled: false,
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
    findCourse() {
      let t = [];
      if (boardVm.select === "id") {
        for (let i = 0; i < boardVm.allCourses.length; i++) {
          if (boardVm.allCourses[i].id === boardVm.searchCourse) {
            t.push(boardVm.allCourses[i]);
          }
        }
      } else if (boardVm.select === "name") {
        for (let i = 0; i < boardVm.allCourses.length; i++) {
          if (boardVm.allCourses[i].name === boardVm.searchCourse) {
            t.push(boardVm.allCourses[i]);
          }
        }
      }
      boardVm.courses = t;
    },
    dropCourse() {
      boardVm
        .$confirm("确定要退选该课程？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          if (
            boardVm.selectedCourse.length === 0 ||
            boardVm.selectedCourse[0].id === undefined ||
            boardVm.selectedCourse[0].id === ""
          ) {
            boardVm.$message({
              message: "你还尚未选择任何课程",
              type: "warning",
            });
          } else {
            instance
              .post("/student/dropCourse", {
                id: boardVm.selectedCourse[0].id,
              })
              .then(() => {
                boardVm.$message({
                  message: "退选成功",
                  type: "success",
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              })
              .catch(() => {
                boardVm.$message({
                  message: "退选失败",
                  type: "error",
                });
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    selectCourse(id) {
      if (boardVm.selectedCourse.length != 0) {
        boardVm.$message({
          message: "请先退选已选课程",
          type: "wrining",
        });
      } else {
        instance
          .post("/student/selectCourse", {
            id: id,
          })
          .then(() => {
            boardVm.$message({
              message: "选课成功",
              type: "success",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(() => {
            boardVm.$message({
              message: "选课失败",
              type: "error",
            });
          });
      }
    },
    applyCourse() {
      instance
        .post("/student/applyCourse", {
          course_name: boardVm.applyCourseForm.course_name,
          address: boardVm.applyCourseForm.address,
          desc: boardVm.applyCourseForm.desc,
          company: boardVm.applyCourseForm.company,
          mentor_id: boardVm.applyCourseForm.mentor_id,
          mentor_name: boardVm.applyCourseForm.mentor_name,
        })
        .then((res) => {
          boardVm.$message({
            message: "提交成功",
            type: "success"
          });
          setTimeout(function(){
            window.location.reload()
          },1000)
        })
        .catch((err) => {
          boardVm.$message({
            message: "您是否有未退的课程或者检查你填写的表项是否正确",
            type: "error",
          });
        });
    },
  },
  mounted() {
    instance.get("/student/alreadySelectedCourse").then((res) => {
      boardVm.selectedCourse.push(res.data["msg"]);
    });
    instance.get("/getCourses").then((res) => {
      boardVm.allCourses = res.data["msg"];
      boardVm.courses = boardVm.allCourses.slice(0, 10);
    });
    instance.get("/student/viewApplyProgress").then((res) => {
      if (res.status == 204) {
        return;
      }
      boardVm.applyCourseForm = res.data["msg"];
      if (res.data["msg"].id.length != 0) {
        boardVm.disabled = true;
      }
      boardVm.teacherStatus = status.get(
        boardVm.applyCourseForm.teacher_status
      );
      boardVm.adminStatus = status.get(boardVm.applyCourseForm.admin_status);
    });
  },
  watch: {
    currentPage(val) {
      boardVm.courses = boardVm.allCourses.slice(10 * (val - 1), 10 * val);
    },
  },
});
