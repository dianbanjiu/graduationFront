const vm = new Vue({
    el: "#app",
    data() {
      var account = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户帐号"));
        } else {
          callback();
        }
      };
      var password = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("密码不能为空"));
        }
        setTimeout(() => {
          if (value.length < 6) {
            callback(new Error("密码长度需要大于 6"));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        userForm: {
          account: "",
          password: "",
          identify: "",
        },
        submitRule: {
          account: [{ validator: account, trigger: "blur" }],
          password: [{ validator: password, trigger: "blur" }],
        },
      };
    },
    methods: {
      resetForm(formName) {
        vm.$refs[formName].resetFields();
      },
      submitForm() {
        var iden = "student"
        if ((vm.userForm.account.length = 0 || vm.userForm.password.length < 6)) {
          return;
        } else {
          instance
            .post("/loginAuth", {
              identify: iden,
              id: vm.userForm.account,
              password: vm.userForm.password,
            })
            .then((res) => {
              if (res.status === 200) {
                vm.$message({
                  message: res.data["msg"],
                  type: "success",
                });
                setCookie("token", res.data["token"]);
  
                setCookie("identify", iden);
                setTimeout(() => {
                  window.location.href ="/m/home.html";
                }, 1000);
              }
            })
            .catch((err) => {
              vm.$message({
                message: "登录失败，请检查帐号密码是否正确",
                type: "error",
              });
            });
        }
      },
    },
  });
  