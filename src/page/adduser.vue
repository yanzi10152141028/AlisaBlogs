<template>
    <div class="manage_addUser">
      <h3> 添加用户</h3>
        <el-row>
          <el-col :span="12">
              <el-form :model="registerData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
</template>
<script>
import { setTimeout } from "timers";
import common from '../assets/public/js/common.js'
export default {
  data() {
    return {
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
    //点击注册
    toRegister() {
      var self = this;
      //判断用户是否存在
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
              setTimeout(function() {
                self.$router.push({ path: "/getuser" });
              }, 1000);
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
    //调用添加用户接口
    addUser() {
      var self = this;
      var  now = new Date();
		       now = common.getDateTime(now)
      this.$http.post("/api/user/addUser", {
          nickName: self.registerData.nickName,
          username: self.registerData.name,
          password: self.registerData.pwd,
          phone: self.registerData.phone,
          registerDate: now,
          state: "user"
        })
        .then(function(data) {
          if (data.status == 200) {
            self.$message({
              message: "恭喜你，注册成功！",
              type: "success"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style>
</style>
