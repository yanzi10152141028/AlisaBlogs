<template>
    <div class="comment">
    <top-menu id='5'></top-menu>
    <el-row>
        <el-col :span='18'  :offset='3'>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item >首页</el-breadcrumb-item>
                    <el-breadcrumb-item>吐槽天地</el-breadcrumb-item>
               </el-breadcrumb>
            <div class="comment_content">
            <el-row>
                  <el-col :span="17" class="left">
                        <el-form :model="comment">
                            <textarea placeholder="吐槽从这里开始..." v-model="comment.content" maxlength="100"></textarea>
                            <el-form-item class="commit">
                                <el-button type="primary" @click="addComment">提交评论</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="show_comment">
                            <div class="comment_summary">
                                <span><b>{{totalItem}}</b>条评论</span>
                                <span>最新评论</span>
                                <span>点赞最多</span>
                            </div>
                            <div class="show_comment_detail">
                                <dl v-for="(item,index) in commmentList" :key="index">
                                    <dt><img  src="../assets/public/images/tab.jpg"/></dt>
                                    <dd>
                                        <p>{{item.username}}</p>
                                        <p>{{item.content}}</p>
                                        <p>{{item.addDate}}</p>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalItem">
                        </el-pagination>
                   </el-col>
                   <el-col :span="6" :offset="1" class="right"> 
                </el-col>
            </el-row>
            </div>
        </el-col>
     </el-row>
    <bottom-content></bottom-content>
    </div>
</template>
<script>
import TopMenu from "../components/topMenu";
import BottomContent from "../components/bottom";
import moment from "moment";
import common from "../assets/public/js/common.js"
export default {
  components: { TopMenu, BottomContent },
  inject:["reload"],
  data() {
    return {
      currentPage: 1,
      totalItem: 0,
      pageSize: 5,
      comment: {},
      commmentList:[],
    };
  },
  created(){
      this.getComment();
  },
  methods : {
     // 添加评论
    addComment() {
      var self = this;
      var  now = new Date();
		       now = common.getDateTime(now);
      this.$http.post("/api/comment/addComment", {
          username: "燕子",
          content: this.comment.content,
          url: "../assets/public/images/tab.jpg",
          addDate: now
        })
        .then(function(result) {
          if(result.status == 200){
            self.$message({
                message:'评论成功！',
                type:'success'
            })
           self.reload();
            self.comment.content="";
          }else{
               self.$message("提交失败！");
          }
        });
    },
    // 查询评论
    getComment(){
        var self = this;
        this.$http.get("/api/comment/getComment").
        then(function(result){ 
           if(result.status == 200){
            self.totalItem = result.data.length;
            self.getPage();
           }
        })
    },
    //查询分页
    getPage(){
      var self = this;
      this.$http.post("/api/comment/getPageData", {
          currentPage: (this.currentPage - 1) * this.pageSize,
          pageSize: this.pageSize
        })
        .then(function(result) {
          if (result.status == 200) {
            var username = "",
              content = "",
              addDate = "";
            for (var i = 0; i < result.data.length; i++) {
              username = result.data[i].username;
              content = result.data[i].content;
              addDate= result.data[i].addDate;
              addDate = moment(addDate).format('YYYY-MM-DD HH:mm:ss');
              self.commmentList.push({
               username:username,
               content:content,
               addDate:addDate
              });
            }
          }
        });
    },
    // 查询最新的数据
    getNewDate(){
      var self = this;
      var  now = new Date().toLocaleString();
		  var date = now.substring(0,10);
      var time = now.substring(12,20);
      now = date+" "+time;
       this.$http.post("/api/comment/getNewComment",{addDate:now}).
       then(function(result){
          var username = "",
              content = "",
              addDate = "";
            for (var i = 0; i < result.data.length; i++) {
              username = result.data[i].username;
              content = result.data[i].content;
              addDate = result.data[i].addDate;
              addDate = moment(addDate).format('YYYY-MM-DD HH:mm:ss');
              self.commmentList.push({
               username:username,
               content:content,
               addDate:addDate
              });
            }
       })
    },
    //每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.commmentList.splice(0, this.commmentList.length);
      console.log(this.pageSize+','+this.currentPage);
      this.getPage();
    },
    //当前页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.index = val;
      this.commmentList.splice(0, this.commmentList.length);
      console.log(this.pageSize+','+this.currentPage);
      this.getPage();
    },
  }
};
</script>
<style lang="scss">
@import "../assets/public/sass/comment.scss";
</style>
