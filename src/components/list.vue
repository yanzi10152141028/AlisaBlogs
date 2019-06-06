<template>
    <div class="manage_getuser">
        <h3>用户信息查询</h3>
        <template>
          <el-table
            :data="tableData"
            border >
            <el-table-column
              prop="index"
              label="序号" type='index' :index='CalculationIndex' style="width:200px;">
            </el-table-column>
            <el-table-column v-for="(col,key) in tabCols" :key="key"
              :prop="col.key"
              :label="col.value">
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
          :page-sizes="[10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItem">
      </el-pagination>
      <edit-form :marker="Id" 
                 :cols="tabCols"
                 :dialogFormVisible="dialogFormVisible"
                 :formLabelWidth="formLabelWidth"
                 :data="dataList"></edit-form>
      <!-- <el-dialog title="信息编辑" :visible.sync="dialogFormVisible">
        <el-form :model="dataList" :rules="rules">
              <el-form-item :label="col.value"  :prop="col.key" v-for="(col,key) in tabCols" :key="key">
                    <el-input v-model="dataList" auto-complete="on" :label-width="formLabelWidth"></el-input>
              </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </div>
      </el-dialog> -->
    </div>
</template>
<script>
import { debug } from "util";
import { stat } from "fs";
import moment from "moment";
import modal from "../assets/public/js/modal.js";
import common from '../assets/public/js/common.js'
import editForm from './eidt.vue'
export default {
  components:{editForm},
  props: ["selectPath", "selectPagePath", "updatePath", "deletePath", "cols","selectMenuPath"],
  inject: ["reload"],
  data() {
    return {
      addOrUpdateVisible:false,
      dialogFormVisible: false,
      dataList: {},
      tableData: [],
      currentPage: 1,
      totalItem: 0,
      pageSize: 10,
      index: 1,
      Id:"",
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { type: "number", message: "电话号码必须为数字值", trigger: "blur" }
        ]
      },
      tabCols: []//表头
    };
  },
  created() {
    this.getUser();
    this.getMenu();
  },
  mounted() {
    this.getCols();
  },
  methods: {
    // 获取表格头部中文字段
    getCols() {
      var el = this.cols;
      if (typeof el != "undefined" && el != null && el != "") {
        switch (el) {
          case "user":
            this.tabCols = modal.user;
            break;
          case "aboutus":
            this.tabCols = modal.aboutus;
            break;
          case "comment":
            this.tabCols = modal.comment;
            break;
          case "new":
            this.tabCols = modal.new;
            break;
          case "question":
            this.tabCols = modal.question;
            break;
          case "menu":
            this.tabCols = modal.menu;
            break;
        }
      }
    },
    // 获取菜单信息
    getMenu(){
      if(this.selectMenuPath){
         var self = this;
         this.$http.post(this.selectMenuPath,{type:'小程序'}).then(function(result) {
         if (result.status == 200) {
          self.totalItem = result.data.length;
          // 获取分页信息
          self.getPage();
          }
        });
      }
    },
    //获取信息
    getUser() {
      if(this.selectPath){
          var self = this;
          this.$http.get(this.selectPath).then(function(result) {
          if (result.status == 200) {
          self.totalItem = result.data.length;
          // 获取分页信息
          self.getPage();
          }
        });
      }
    },
    // 点击编辑
    handleEdit(index, row) {
      this.Id = row.id;
      this.dialogFormVisible = true;
      this.dataList = Object.assign({}, this.dataList, {
        nickName: row.nickName,
        name: row.username,
        pwd: row.password,
        phone: row.phone,
        id: row.id
      });
    },
    //更新信息
    updateUser() {
      var self = this;
      var  now = new Date().toLocaleString();
	         now = common.getDateTime(now);
           now = date + " " + time;
      this.$http.post(this.updatePath, {
          nickName: this.dataList.nickName,
          username: this.dataList.name,
          password: this.dataList.pwd,
          phone: this.dataList.phone,
          registerDate: now,
          id: this.dataList.id
        })
        .then(function(result) {
          if (result.status == 200) {
            self.$message({
              type: "success",
              message: "更新成功!"
            });
            self.tableData.splice(0, self.tableData.length);
            self.reload();
            setTimeout(() => {
              self.dialogFormVisible = false;
            }, 1000);
          }
        });
    },
    //删除信息
    handleDelete(index, row) {
      var self = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http
            .post(this.deletePath, {
              id: row.id
            })
            .then(function(result) {
              if (result.status == 200) {
                self.$message({
                  type: "success",
                  message: "删除成功!"
                });
                self.tableData.splice(index, 1);
                self.reload();
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
      console.log(this.pageSize + "," + this.currentPage);
      this.getPage();
    },
    //当前页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.index = val;
      this.tableData.splice(0, this.tableData.length);
      console.log(this.pageSize + "," + this.currentPage);
      this.getPage();
    },
    //计算分页
    CalculationIndex(index) {
      return index + (this.index - 1) * this.pageSize + 1;
    },
    //获取分页数据
    getPage() {
      var self = this;
      this.$http.post(this.selectPagePath, {
          currentPage: (this.currentPage - 1) * this.pageSize,
          pageSize: this.pageSize
        })
        .then(function(data) {
          if (data.status == 200) {
            self.tableData = data.data;
            // var time ="";
            // for(var i = 0; i < data.data.length; i++){
            //   var addData = data.data[i].addData;
            //    addData = moment(addData).format("YYYY-MM-DD HH:mm:ss");
            //   self.tableData.push({
            //       addData:addData
            //   })
            // }   
            // console.log(data.data)
            // var time = "",
            //   name = "",
            //   pwd = "",
            //   nickName = "",
            //   phone = "",
            //   id = "",
            //   state = "";
            // for (var i = 0; i < data.data.length; i++) {
            //   nickName = data.data[i].nickName;
            //   name = data.data[i].username;
            //   pwd = data.data[i].password;
            //   phone = data.data[i].phone;
            //   time = data.data[i].registerDate;
            //   id = data.data[i].id;
            //   state = data.data[i].state;
            //   time = moment(time).format("YYYY-MM-DD HH:mm:ss");
            //   self.tableData.push({
            //     nickName: nickName,
            //     username: name,
            //     password: pwd,
            //     phone: phone,
            //     registerDate: time,
            //     id: id,
            //     state: state
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
