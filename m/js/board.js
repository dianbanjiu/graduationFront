const vm = new Vue({
  el: "#app",
  data() {
    return {
      activeIndex:'',
      msg:[]
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
    instance.get('/getBoards').then(res=>{
      vm.msg=res.data["msg"]
      if (vm.msg.length != 0) {
        for (var i = 0; i < vm.msg.length; i++) {
          if (vm.msg[i].create_identify == "teacher") {
            vm.msg[i].create_identify = "教师公告";
          } else if (vm.msg[i].create_identify == "admin") {
            vm.msg[i].create_identify = "系统公告";
          }
        }
      }
  })
  },
});
