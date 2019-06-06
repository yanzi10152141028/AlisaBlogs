<template>
    <div class="about_us">
        <top-menu id='4'></top-menu>
        <el-row>
            <el-col :span='18'  :offset='3'>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item >首页</el-breadcrumb-item>
                    <el-breadcrumb-item>我的故事</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="aboutus_content">
                    <el-row class="classify">
                        <el-col :span="24">
                            <span>分类:</span>
                            <span :class="{active:defaultStyle}" @click="getAboutus">全部</span>
                            <span v-for="(item,index) in typeList"  :class="{active:index==num}"  @click="getAboutusType(item,index)">{{item}}</span>
                            <!-- <span :class="{active:isClick}" @click="getAboutusType('旅行')">旅行</span>
                            <span :class="{active:isClick}" @click="getAboutusType('美食')">美食</span>
                            <span :class="{active:isClick}" @click="getAboutusType('兴趣爱好')">兴趣爱好</span> -->
                        </el-col>
                    </el-row>
                    <el-row class="case_content">
                        <el-col :span="6" v-for="(item, index) in aboutusList" :key="index" >
                        <el-card :body-style="{ padding: '20px' }">
                            <img src="../assets/public/images/img.png" class="image">
                            <!-- <img  :src="item.url" class="image"> -->
                            <div style="padding: 14px;">
                            <span>{{item.title}}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{item.addDate}}</time>
                                <el-button type="text" class="button">查看更多</el-button>
                            </div>
                            </div>
                        </el-card>
                        </el-col>
                    </el-row>
                     <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[12, 24]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalItem">
                     </el-pagination>
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
export default {
  components: { TopMenu, BottomContent },
  data() {
    return {
      currentPage: 1,
      totalItem: 0,
      pageSize: 12,
      index: 1,
      aboutusList: [],
      typeList: [],
      isClick: false, //是否点击
      defaultStyle: true,
      num:4
    };
  },
  mounted() {
    this.getAboutus();
  },
  methods: {
    //获取我的故事
    getAboutus() {
      var self = this;
      self.defaultStyle = true;
      self.num =5;
      self.aboutusList.splice(0, self.aboutusList.length);
      this.$http.get("/api/aboutus/getAboutus").then(function(result) {
        if (result.status == 200) {
          self.totalItem = result.data.length;
          var arry = [];
          for (var i = 0; i < result.data.length; i++) {
            arry.push(result.data[i].type);
            if (self.typeList.indexOf(arry[i]) == -1) {
              self.typeList.push(arry[i]);
            }
          }
          // 获取分页信息
          self.getPage();
        }
      });
    },
    // 查询分类
    getAboutusType(param,index) {
      var self = this;
      self.defaultStyle = false;
      this.num = index;
      self.aboutusList.splice(0, self.aboutusList.length);
      this.$http.post("/api/aboutus/getTypeData", {
          type: param,
          currentPage: (this.currentPage - 1) * this.pageSize,
          pageSize: this.pageSize
          // currentDate:(thi.currentDate-1)*this.pageSize,
          // pageSize:this.pageSize
        })
        .then(function(result) {
          if (result.status == 200) {
            var time = "",
              title = "",
              type = "",
              url = "";
            for (var i = 0; i < result.data.length; i++) {
              title = result.data[i].title;
              type = result.data[i].type;
              url = result.data[i].url;
              time = result.data[i].addDate;
              time = moment(time).format("YYYY-MM-DD HH:mm:ss");
              self.aboutusList.push({
                title: title,
                type: type,
                url: url,
                addDate: time
              });
            }
          }
        });
    },
    //每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.aboutusList.splice(0, this.aboutusList.length);
      console.log(this.pageSize + "," + this.currentPage);
      this.getPage();
    },
    //当前页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.index = val;
      this.aboutusList.splice(0, this.aboutusList.length);
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
      this.$http
        .post("/api/aboutus/getPageData", {
          currentPage: (this.currentPage - 1) * this.pageSize,
          pageSize: this.pageSize
        })
        .then(function(data) {
          if (data.status == 200) {
            var time = "",
              title = "",
              type = "",
              url = "";
            for (var i = 0; i < data.data.length; i++) {
              title = data.data[i].title;
              type = data.data[i].type;
              url = data.data[i].url;
              time = data.data[i].addDate;
              time = moment(time).format("YYYY-MM-DD HH:mm:ss");
              self.aboutusList.push({
                title: title,
                type: type,
                url: url,
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
@import "../assets/public/sass/aboutus.scss";
</style>



