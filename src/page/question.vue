<template>
    <div class="manage_addUser">
      <h3> 添加问题</h3>
        <el-row>
          <el-col :span="12">
              <el-form :model="questionData" :rules="rules"  label-width="100px" class="demo-ruleForm">
                  <el-form-item label="问题" prop="question" >
                      <el-input v-model="questionData.question" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="解决办法" prop="answer" >
                      <el-input v-model="questionData.answer" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="addQuestion">添加</el-button>
                    <el-button  @click="reset">重置</el-button>

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
      questionData: {},
      rules: {
        question: [{ required: true, message: "请输入问题", trigger: "blur" }],
        answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
      
      }
    };
  },
  methods: {
    //调用添加问题
    addQuestion() {
      var self = this;
      var  now = new Date();
		       now = common.getDateTime(now)
      this.$http.post("/api/question/addQuestion", {
          question: self.questionData.question,
          answer: self.questionData.answer,
          addDate: now
        })
        .then(function(data) {
          if (data.status == 200) {
            self.$message({
              message: "添加成功！",
              type: "success"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    reset(){
      this.questionData.question = "";
      this.questionData.answer = "" ;
    }
  }
};
</script>
<style>
</style>
