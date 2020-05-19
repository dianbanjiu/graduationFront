Vue.use(VueMarkdown);
const publicationVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: [],
      navIndex: "",
      dialogVisible: false,
      publicationForm: {},
      evaluation: "",
      currentPage: 1,
      publications: [],
      showChartDialog: false,
      studentsList: [],
      studentSel: "",
      courseScoreList: {
        columns: ["score", "times"],
        rows: [],
      },
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
    deletePublication(id) {
      publicationVm
        .$confirm("是否删除评价", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          instance
            .post("/teacher/deleteEvaluation", {
              id: id,
            })
            .then(() => {
              publicationVm.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
            .catch(() => {
              publicationVm.$message({
                message: "删除失败",
                type: "error",
              });
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
    ap(row) {
      publicationVm.dialogVisible = true;
      publicationVm.publicationForm = row;
    },
    addEvaluation(id) {
      publicationVm.dialogVisible = false;
      if (
        publicationVm.publicationForm.score === undefined &&
        publicationVm.publicationForm.content === undefined
      ) {
        publicationVm.$message({
          message: "请填写评分和评价后再提交",
          type: "warning",
        });
        return;
      }
      instance
        .post("/teacher/evaluationAndScore", {
          id: id,
          teacher_score: publicationVm.publicationForm.score,
          teacher_evaluation: publicationVm.publicationForm.teacher_evaluation,
        })
        .then(() => {
          publicationVm.$message({
            message: "评价成功",
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          publicationVm.$message({
            message: "评分失败",
            type: "error",
          });
        });
    },
  },
  mounted() {
    instance.get("/teacher/viewAllPublications").then((res) => {
      publicationVm.msg = res.data["msg"];
      publicationVm.publications = publicationVm.msg.slice(0, 10);
    });
    instance.get("/teacher/viewAllSelectedStudents").then((res) => {
      selectedStudents = res.data["msg"];
      selectedStudents.forEach((student) => {
        publicationVm.studentsList.push({
          value: student.id,
          label: student.name,
        });
      });
    });
  },
  watch: {
    currentPage(val) {
      publicationVm.publications = publicationVm.msg.slice(
        10 * (val - 1),
        10 * val
      );
    },
    studentSel(val) {
      instance
        .get("/teacher/studentScoreTimes", { params: { student_id: val } })
        .then(function (res) {
          publicationVm.courseScoreList.rows = new Array();
          studentScoreList = res.data["msg"];
          for (var studentKey in studentScoreList) {
            publicationVm.courseScoreList.rows.push({
              score: studentKey,
              times: studentScoreList[studentKey],
            });
          }
        });
    },
  },
});
