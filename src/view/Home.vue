<template>
  <div class="home">
    <top-menu id="1"></top-menu>
    <el-row>
      <el-col :span='18'  :offset='3'>
            <div class="banner">
              <template>
                <el-carousel indicator-position="outside">
                  <el-carousel-item v-for="(item,index) in urlImgs" :key='index'>
                    <img :src="item.url"/>
                  </el-carousel-item>
                </el-carousel>
              </template>
            </div>
            <div class="content">
              <el-row class="case_content">
                <el-col :span="6" v-for="(item, index) in aboutusData" :key="index" >
                  <el-card :body-style="{ padding: '20px' }">
                    <!-- <img :src="item.url" class="image"> -->
                    <img src="../assets/public/images/tab.jpg"/>
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
            <el-row class="new_content">
              <el-col :span="17">
                <div class="left">
                    <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="建站必知" name="first">
                    <tab-content id='1'></tab-content>
                    </el-tab-pane>
                    <el-tab-pane label="SEO优化" name="second">
                      <tab-content id='2'></tab-content></el-tab-pane>
                    <el-tab-pane label="WEB前端" name="third">
                      <tab-content id='3'></tab-content></el-tab-pane>
                    </el-tabs>
                  </template>
                </div>
              </el-col>
              <el-col :span="6" :offset="1"> 
                  <div class="right">
                        <h3>每日一语</h3>
                        <div>
                          <p>走自己的路让别人去说吧</p>
                          <p>走自己的路让别人去说吧</p>
                          <p>走自己的路让别人去说吧</p>
                          <p>走自己的路让别人去说吧</p>
                        </div>
                  </div>
                  <div class="right_bottom">
                      <ul>
                        <li>
                        <router-link to="/AboutUs">我的故事</router-link>
                        </li>
                        <li>
                          <router-link to="/Comment">吐槽天地</router-link>
                        </li>
                        <li>
                        <router-link to="/AboutUs">我的故事</router-link>
                        </li>
                      </ul>
                  </div>
              </el-col>
            </el-row>
            <div class="artice_title">
              <el-col :span="17">
                <h3>文章推荐</h3>
              </el-col>
              <el-col :span="6" :offset="1">
                <h3>分享快乐</h3>
              </el-col>
            </div>
            <el-row>
              <el-col :span="17">
                    <el-row class="artice_left" v-for="(item,index) in newList" :key="index">
                      <el-col :span="6" class="left_col">
                        <img src="../assets/public/images/tab.jpg"/>
                      </el-col>
                      <el-col :span="16"  class="right_col" :offset="1">
                        <h3>{{item.title}}</h3>
                        <div>{{item.content}}</div>
                        <p>发布时间：{{item.addDate}}</p>
                      </el-col>
                    </el-row>
              </el-col>
              <el-col :span="6" :offset="1" class="contact" v-for="(o,index) in 3" :key="o">
                <ul>
                  <li>
                    <span>QQ二维码：</span>
                    <span>1234567</span>
                  </li>
                    <li>
                    <span>微博二维码：</span>
                    <img src="../assets/public/images/wx.jpg"/>
                  </li>
                  <li>
                    <span>微信公众号：</span>
                    <img src="../assets/public/images/wx.jpg"/>
                  </li>
                </ul>
              </el-col>
            </el-row>
            </div>
      </el-col>
    </el-row>
    <bottom-content></bottom-content>
  </div>
</template>
<script>
import TabContent from "../components/tabcontent";
import TopMenu from "../components/topMenu";
import BottomContent from "../components/bottom";
export default {
  components: { TabContent, TopMenu, BottomContent },
  data() {
    return {
      urlImgs: [
        {url:require("../assets/public/images/tab.jpg"),id:1},
        {url:require("../assets/public/images/tab.jpg"),id:2},
        {url:require("../assets/public/images/tab.jpg"),id:3}
      ],
      currentDate: new Date().toLocaleString(),
      activeName: "first",
      aboutusData:[],
      min:1,
      max:4,
      newList:[]
    };
  },
  mounted(){
    this.getAboutus();
    this.getNew()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab);
    },
     //获取我的故事
    getAboutus() {
      var self = this;
      this.$http.post("/api/aboutus/getPageData",{
          currentPage: (this.min - 1) * this.max,
          pageSize: this.max
      }).then(function(result) {
        if (result.status == 200) {
               self.aboutusData = result.data;
        }
      });
    },
      //获取前端框架
    getNew() {
      var self = this;
      this.$http.post("/api/new/getPageData",{
          currentPage: (this.min - 1) * this.max,
          pageSize: this.max
      }).then(function(result) {
        if (result.status == 200) {
               self.newList = result.data;
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/public/sass/home.scss";
</style>

