<template>
    <div class="manage_getuser">
        <h3>用户信息查询</h3>
        <template>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号" type='index' :index='CalculationIndex' style="width:200px;">
            </el-table-column>
            <el-table-column
              prop="nickName"
              label="昵称">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="password"
              label="密码">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话号码">
            </el-table-column>
            <el-table-column
              prop="state"
              label="接口">
            </el-table-column>
            <el-table-column
              prop="registerDate"
              label="注册时间">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </template>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItem">
      </el-pagination>
      <el-dialog title="用户信息编辑" :visible.sync="dialogFormVisible">
        <el-form :model="registerData" :rules="rules">
              <el-form-item label="昵称" prop="nickName" >
                    <el-input v-model="registerData.nickName" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name" >
                    <el-input v-model="registerData.name" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input  v-model="registerData.pwd" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model.number="registerData.phone" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import { debug } from "util";
import { stat } from 'fs';
export default {
  inject:['reload'],//注入reload方法
  data() {
    return {
        dialogFormVisible: false,
        registerData: {},
        tableData: [],
        currentPage: 1,
        totalItem: 0,
        pageSize: 5,
        index: 1,
        formLabelWidth: "100px",
        rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur"}],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur"}],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur"}],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur"},
               {type: "number", message: "电话号码必须为数字值", trigger: "blur"}]
      }
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    //获取用户信息
    getUser() {
      var self = this;
      this.$http.get("/api/user/getUser").then(function(result) {
        if (result.status == 200) {
          self.totalItem = result.data.length;
          // 获取分页信息
          self.getPage();
        }
      });
    },
    // 点击编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.registerData = Object.assign({}, this.registerData, {
        nickName: row.nickName,
        name: row.username,
        pwd: row.password,
        phone: row.phone,
        uid: row.uid
      });
    },
    //更新用户信息
    updateUser() {
      var self = this;
      this.$http.post("/api/user/updateUser", {
          nickName: this.registerData.nickName,
          username: this.registerData.name,
          password: this.registerData.pwd,
          phone: this.registerData.phone,
          registerDate: new Date().toLocaleDateString(),
          uid: this.registerData.uid
        })
        .then(function(result) {
          if (result.status == 200) {
            self.$message({
              type: "success",
              message: "更新成功!"
            });
            self.tableData.splice(0, self.tableData.length);
            setTimeout(() => {
              this.dialogFormVisible = false;
              self.getUser();
            }, 1000);
          }
        });
    },
    //删除用户信息
    handleDelete(index, row) {
      var self = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http.post("/api/user/deleteUser", {
              uid: row.uid
            })
            .then(function(result) {
                if(result.status == 200){
                    self.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  self.tableData.splice(index, 1);
                  self.reload(); //直接调用
                }
            });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableData.splice(0, this.tableData.length);
      console.log(this.pageSize+','+this.currentPage);
      this.getPage();
    },
    //当前页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.index = val;
      this.tableData.splice(0, this.tableData.length);
      console.log(this.pageSize+','+this.currentPage);
      this.getPage();
    },
    //计算分页
    CalculationIndex(index) {
      return index + (this.index - 1) * this.pageSize + 1;
    },
    //获取分页数据
    getPage() {
      var self = this;
      this.$http.post("/api/user/getPageData", {
          currentPage: (this.currentPage-1)*this.pageSize,
          pageSize: this.pageSize
        })
        .then(function(data) {
          if (result.status == 200) {
              self.tableData = result.data;
            // var   time = "",
            //       name = "",
            //       pwd = "",
            //       nickName = "",
            //       phone = "",
            //       uid = "",
            //       state='';
            // for (var i = 0; i < result.data.length; i++) {
            //   nickName = result.data[i].nickName;
            //   name = result.data[i].username;
            //   pwd = result.data[i].password;
            //   phone = result.data[i].phone;
            //   time = result.data[i].registerDate;
            //   uid = result.data[i].uid;
            //   state = result.data[i].state;
            //   time = time.split("T")[0];
            //   self.tableData.push({
            //     nickName: nickName,
            //     username: name,
            //     password: pwd,
            //     phone: phone,
            //     registerDate: time,
            //     uid: uid,
            //     state:state
            //   });
            // }
          }
        });
    }
  }
};
</script>
<style>
</style>
