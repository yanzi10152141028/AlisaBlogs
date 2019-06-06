<template>
    <div class="vueframe">
      <top-menu id='2'></top-menu>
        <el-row>
            <el-col :span='18'  :offset='3'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>前端新闻</el-breadcrumb-item>
            <el-breadcrumb-item>{{Tabtitle}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="title">
            <el-col :span="4" :offset="2" v-for="(item,index) in typeList" :key="index" v-cloak >
              <a href="#" @click="getNewType(item,index)" :class="{active:index==num}" >{{item}}</a>
            </el-col>
        </el-row>
       <el-row>
       <el-col :span="17">
            <artice :marker='Tabtitle':data='newList'></artice>
       </el-col>
       <!-- <el-col :span="6" :offset="1" class="contact" v-for="(o,index) in 1" :key="o" >
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
       </el-col> -->
     </el-row>
     </el-col>
  </el-row>
    <bottom-content></bottom-content>
    </div>
</template>
<script>
import Artice from "../components/artice";
import TopMenu from "../components/topMenu";
import BottomContent from "../components/bottom";
import moment from 'moment'
export default {
  components: { TopMenu, BottomContent, Artice },
  data() {
    return {
      Tabtitle: "Vue框架",
      currentPage: 1,
      totalItem: 0,
      pageSize: 12,
      index: 1,
      typeList: [],
      num:0,
      newList:[]
    };
  },
  created(){
    this.getNew()
    console.log(this.newList.length)
  },
  methods: {
    //获取前端框架
    getNew() {
      var self = this;
      self.defaultStyle = true;
      this.$http.get("/api/new/getNew").then(function(result) {
        if (result.status == 200) {
          self.totalItem = result.data.length;
          var arry = [];
          for (var i = 0; i < result.data.length; i++) {
            arry.push(result.data[i].type);
            if (self.typeList.indexOf(arry[i]) == -1) {
              self.typeList.push(arry[i]);
            }
          }
           self.getNewType(self.Tabtitle,self.num)
        }
      });
    },
    // 查询分类
    getNewType(param,index) {
      var self = this;
      self.defaultStyle = false;
      this.Tabtitle = param;
      this.newList.splice(0,this.newList.length)
      this.$http.post("/api/new/getTypeData", {
          type: param,
          currentPage: (this.currentPage - 1) * this.pageSize,
          pageSize: this.pageSize
        })
        .then(function(data) {
          if (data.status == 200) {
             var time = "",
              title = "",
              content = "",
              imgUrl = "",
              type= "",
              id = "";
            for (var i = 0; i < data.data.length; i++) {
              title = data.data[i].title;
              content = data.data[i].content;
              imgUrl = data.data[i].imgUrl;
              time = data.data[i].addDate;
              id = data.data[i].id;
              type = data.data[i].type;
              time = moment(time).format('YYYY-MM-DD HH:mm:ss');
              self.newList.push({
                id:id,
                title: title,
                content: content,
                imgUrl: imgUrl,
                addDate: time,
                type:type
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
    }
  }
};
</script>
<style lang="scss">
@import "../assets/public/sass/vueframe.scss";
</style>


