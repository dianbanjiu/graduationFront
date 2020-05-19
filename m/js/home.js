Vue.use(VueMarkdown);
const vm = new Vue({
  el: "#app",
  data() {
    return {
      activeIndex: "",
      msg: [],
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
    handleSelect(key) {
      const base = "http://" + window.location.host;
      switch (key) {
        case "0":
          window.location.href = base + "/m/board.html";
          break;
        case "1":
          window.location.href = base + "/m/home.html";
          break;
        case "2":
          window.location.href = base + "/m/create.html";
          break;
        case "3":
          window.location.href = base + "/m/more.html";
          break;
      }
    },
  },
  mounted() {
    instance.get("/student/viewAllPublications").then((res) => {
      vm.msg = res.data["msg"];
      vm.publications = vm.msg.slice(0, 10);
    });
  },
  watch: {
    currentPage(val) {
      vm.publications = vm.msg.slice(
        10 * (val - 1),
        10 * val
      );
    },
  },
});
