const status = new Map();
status.set("0", "等待审核");
status.set("1", "审核通过");
status.set("2", "审核失败");
const notifyVm = new Vue({
  el: "#app",
  data() {
    return {
      msg: [],
      navIndex: "",
      courses: [],
      unhandleNotify: [],
      handledNotify: [],
      disabled: true,
      dialogVisible: false,
      statuses: [
        {
          value: "1",
          label: "同意",
        },
        {
          value: "2",
          label: "拒绝",
        },
      ],
      aStatus: "",
      id: "",
      index: "",
      inputDisabled: true,
      course_id: "",
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
        case "6-1":
          window.location.href = base + "/userinfo.html";
          break;
        case "6-2":
          clearCookie();
          window.location.href = "http://" + window.location.host;
          break;
      }
    },
    setId(index, val) {
      notifyVm.dialogVisible = true;
      notifyVm.index = index;
      notifyVm.id = val;
    },
    allNotifyButton() {
      window.location.reload();
    },
    notNotifyButton() {
      notifyVm.courses = notifyVm.unhandleNotify;
      notifyVm.disabled = false;
    },
    alreadyNotifyButton() {
      notifyVm.courses = notifyVm.handledNotify;
      notifyVm.disabled = true;
    },
    handleEdit() {
      notifyVm.dialogVisible = false;
      if (notifyVm.aStatus == "" || notifyVm.course_id == "") {
        return;
      }

      instance
        .post("/admin/handleApplyProgress?courseId=" + notifyVm.course_id, {
          id: notifyVm.id,
          course_name: notifyVm.unhandleNotify[notifyVm.index].course_name,
          address: notifyVm.unhandleNotify[notifyVm.index].address,
          desc: notifyVm.unhandleNotify[notifyVm.index].desc,
          company: notifyVm.unhandleNotify[notifyVm.index].company,
          student_name: notifyVm.unhandleNotify[notifyVm.index].student_name,
          student_id: notifyVm.unhandleNotify[notifyVm.index].student_id,
          mentor_id: notifyVm.unhandleNotify[notifyVm.index].mentor_id,
          mentor_name: notifyVm.unhandleNotify[notifyVm.index].mentor_name,
          admin_status: notifyVm.aStatus,
        })
        .then((res) => {
          notifyVm.unhandleNotify.splice(notifyVm.index, notifyVm.index + 1);
          notifyVm.$message({
            message: res.data["msg"],
            type: "success",
          });
        })
        .catch((err) => {
          notifyVm.$message({
            message: "审核失败",
            type: "error",
          });
        });
    },
  },
  mounted() {
    instance.get("/admin/viewAllApplyProgress").then((res) => {
      notifyVm.msg = res.data["msg"];
      for (var i = 0; i < notifyVm.msg.length; i++) {
        if (notifyVm.msg[i].admin_status == 0) {
          notifyVm.unhandleNotify.push(notifyVm.msg[i]);
        } else {
          notifyVm.handledNotify.push(notifyVm.msg[i]);
        }
        notifyVm.msg[i].teacher_status = status.get(
          notifyVm.msg[i].teacher_status
        );
        notifyVm.msg[i].admin_status = status.get(notifyVm.msg[i].admin_status);
      }
      notifyVm.courses = notifyVm.msg;
    });
  },
  watch: {
    aStatus(val) {
      if (val == "1") {
        notifyVm.inputDisabled = false;
      } else {
        notifyVm.inputDisabled = true;
      }
    },
  },
});
