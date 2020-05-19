Vue.use(VueMarkdown);
var publicationVm = new Vue({
  el: "#app",
  data() {
    return {
      navIndex: "",
      msg: [],
      dialogVisible: false,
      newPublication: "",
      show: true,
      html: false,
      breaks: true,
      linkify: false,
      emoji: true,
      typographer: true,
      toc: false,
      currentPage: 1,
      publications: [],
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    activeAddDialog() {
      publicationVm.dialogVisible = true;
    },
    addPublication() {
      publicationVm.dialogVisible = false;
      if (publicationVm.newPublication.length != 0) {
        instance
          .post("/student/addPublication", {
            content: publicationVm.newPublication,
          })
          .then(() => {
            publicationVm.$message({
              message: "发布成功",
              type: "success",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(() => {
            publicationVm.$message({
              message: "发布失败",
              type: "error",
            });
          });
      }
    },
  },
  mounted() {
    instance.get("/student/viewAllPublications").then((res) => {
      publicationVm.msg = res.data["msg"];
      publicationVm.publications = publicationVm.msg.slice(0, 10);
    });
  },
  watch: {
    currentPage(val) {
      publicationVm.publications = publicationVm.msg.slice(
        10 * (val - 1),
        10 * val
      );
    },
  },
});
