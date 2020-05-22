const infoVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: {},
      navIndex: "",
      disable: true,
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
    change() {
      infoVm.disable = false;
    },
    clear() {
      window.location.reload();
    },
    submit() {
      if (infoVm.msg.phone.length != 11) {
        infoVm.$message({
          message: "手机号长度不是11位",
          type: "warning",
        });
        return;
      }

      if (infoVm.msg.password != undefined && infoVm.msg.password.length < 6) {
        infoVm.$message({
          message: "密码长度需要大于 6 位",
          type: "warning",
        });
        return;
      }
      instance
        .post("/changeInfo", {
          id: infoVm.msg.id,
          phone: infoVm.msg.phone,
          password: infoVm.msg.password,
        })
        .then(() => {
          infoVm.$message({
            message: "修改成功",
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          infoVm.$message({
            message: "修改失败",
            type: "error",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    },
  },
  mounted() {
    instance.get("getUserInfo").then((res) => {
      infoVm.msg = res.data["msg"];
      infoVm.msg.identify = "教师";
    });
    instance.get("/teacher/viewAllApplyProgress").then((res) => {
      var notifications = res.data["msg"];
      for(var i = 0;i<notifications.length;i++){
        if(notifications[i].teacher_status==0){
            infoVm.notify+=1
        }
      }
    });
  },
});
