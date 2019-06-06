<template>
    <div class="login_register" >
     <div class="content">
       <el-row>
           <el-col :span="4" :offset="10" class="title">
                <span @click="btnLogin" class="active" ref="login">登录</span>&nbsp;&nbsp;&nbsp;
                <span @click="btnRegsiter">注册</span>
           </el-col>
       </el-row>
        <el-row>
            <el-col :span="8" :offset="6">
                <el-form    label-width="100px" class="demo-ruleForm login-container" id="login">
                    <el-form-item label="账号" prop="name" >
                        <el-input v-model="loginData.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password"  auto-complete="off" v-model="loginData.pwd" ref="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="toLogin">登录</el-button>
                    </el-form-item>
                </el-form>
                 <el-form  :model="registerData" :rules="rules"   ref="registerData" label-width="100px" class="demo-ruleForm login-container" id="register">
                    <el-form-item label="昵称" prop="nickName" >
                        <el-input v-model="registerData.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="name" >
                        <el-input v-model="registerData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input type="password"  auto-complete="off" v-model="registerData.pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phone">
                        <el-input v-model.number="registerData.phone" auto-complete="off" maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="toRegister">注册</el-button>
                        <el-button  @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        </div>
    </div>
</template>
<script>
import common from '../assets/public/js/common.js'
export default {
  data() {
    return {
      style: {
        backgroundImage: "url(" + require("../assets/page/images/login.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition:"center center",
        backgroundAttachment: "fixed",
        marginTop: "5px"
      },
      loginData: {},
      registerData: {},
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { type: "number", message: "电话号码必须为数字值", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登录，注册切换
    btnLogin() {
      document.getElementById("login").style.display = "block";
      document.getElementById("register").style.display = "none";
      this.$refs.login.className = "active";
      this.$refs.login.nextElementSibling.className = "";
    },
    btnRegsiter() {
      document.getElementById("register").style.display = "block";
      document.getElementById("login").style.display = "none";
      this.$refs.login.nextElementSibling.className = "active";
      this.$refs.login.className = "";
    },
    //登录
    toLogin() {
      var self = this;
      var pwd = this.$refs.password.value;
      this.$http
        .post("/api/user/toLogin", {
          username: this.loginData.name,
          password: this.loginData.pwd
        })
        .then(function(data) {
          if (data.status == 200) {
            if (data.data.length != 0) {
              if (data.data[0].password == pwd) {
                self.$message({
                  message: "登录成功！",
                  type: "success"
                });
                self.$router.push({ path: "/Index" });
              } else {
                self.$message.error("密码不正确！");
              }
            } else {
              self.$message({
                message: "用户名不存在",
                type: "warning"
              });
            }
          }
        });
    },
    //注册
    toRegister() {
      var self = this;
      //用户是否存在
      this.$http
        .post("/api/user/getUserName", {
          username: this.registerData.name,
          password: this.registerData.pwd
        })
        .then(function(data) {
          if (data.status == 200) {
            if (data.data.length == 1) {
              self.$message("该用户名已存在！");
            } else {
              //调用添加用户
              self.addUser();
            }
          }
        });
    },
    //重置
    resetForm() {
      this.registerData.name = "";
      this.registerData.nickName = "";
      this.registerData.pwd = "";
      this.registerData.phone = "";
    },
    //添加用户
    addUser() {
      var self = this;
      var  now = common.getDateTime(new Date());
      // var  now = new Date().toLocaleString();
		  // var date = now.substring(0,10);
      // var time = now.substring(12,20);
      // now = date+" "+time;
      this.$http
        .post("/api/user/addUser", {
          nickName: self.registerData.nickName,
          username: self.registerData.name,
          password: self.registerData.pwd,
          phone: self.registerData.phone,
          registerDate: now,
          state: "user"
        })
        .then(function(data) {
          self.$message({
            message: "恭喜你，注册成功！",
            type: "success"
          });
          self.registerData.name = "";
          self.registerData.nickName = "";
          self.registerData.pwd = "";
          self.registerData.phone = "";
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/page/css/login.scss";
</style>
