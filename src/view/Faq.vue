<template>
  <div class="faq">
    <top-menu id="3"></top-menu>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>常见问题</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="faq_content">
          <el-col :span="24">
            <ul class="faq_ul">
              <li v-for="(item,index) in questionList" :key="index">
                <el-row>
                  <el-col :span="3" :offset="1">
                    <div
                      class="left"
                      :style="{backgroundImage: 'url(../assets/public/images/border.jpg)'}"
                    >
                      <img src="../assets/public/images/tab.jpg" />
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="right">
                      <p>
                        问题：
                        <span>{{item.question}}</span>
                      </p>
                      <p>
                        解决方案：
                        <span>{{item.answer}}</span>
                      </p>
                      <span class="date_time">{{item.addDate}}</span>
                    </div>
                  </el-col>
                </el-row>
              </li>
            </ul>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10,15]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalItem"
            ></el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <bottom-content></bottom-content>
  </div>
</template>
<script>
import TopMenu from "../components/topMenu";
import BottomContent from "../components/bottom";
import moment from "moment";
export default {
  components: { TopMenu, BottomContent },
  data() {
    return {
      currentPage: 1,
      totalItem: 0,
      pageSize: 5,
      index: 1,
      questionList: []
    };
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    //获取我的问题
    getQuestion() {
      var self = this;
      this.$http.get("/api/question/getQuestion").then(function(result) {
        if (result.status == 200) {
          self.totalItem = result.data.length;
          // 获取分页信息
          self.getPage();
        }
      });
    },
    //每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.aboutusList.splice(0, this.aboutusList.length);
      this.getPage();
    },
    //当前页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.index = val;
      this.aboutusList.splice(0, this.aboutusList.length);
      this.getPage();
    },
    //计算分页
    CalculationIndex(index) {
      return index + (this.index - 1) * this.pageSize + 1;
    },
    //获取分页数据
    getPage() {
      var self = this;
      this.$http
        .post("/api/question/getPageData", {
          currentPage: (this.currentPage - 1) * this.pageSize,
          pageSize: this.pageSize
        })
        .then(function(data) {
          if (data.status == 200) {
            var time = "",
              question = "",
              answer = "";
            for (var i = 0; i < data.data.length; i++) {
              question = data.data[i].question;
              answer = data.data[i].answer;
              time = data.data[i].addDate;
              time = moment(time).format("YYYY-MM-DD");
              self.questionList.push({
                question: question,
                answer: answer,
                addDate: time
              });
            }
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/public/sass/faq.scss";
</style>


