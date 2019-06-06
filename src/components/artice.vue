<template>
    <div class="artice">
        <div v-for="(item,index) in data" :key="index"  v-if="marker == item.type" v-cloak>
           <el-row class="artice_left" v-if="data.length != 0">
              <el-col :span="6" class="left_col">
                <img src="../assets/public/images/tab.jpg"/>
              </el-col>
              <el-col :span="16"  class="right_col" :offset="1">
                <h3>{{item.title}}</h3>
                <div>{{item.content}}</div>
                <p>发布时间：{{item.addDate}} <span>分类：{{item.type}}</span></p>
              </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import moment from "moment"
export default {
  props: ["marker","data"],
  data() {
    return {
      articeList: [],
      currentPage: 1,
      totalItem: 0,
      pageSize: 12,
      index: 1,
    };
  },
  created(){
   this.getNewType();
  },
  methods:{
    // 查询分类
    getNewType() {
      var self = this;
      self.defaultStyle = false;
      this.$http.post("/api/new/getTypeData", {
          type: this.marker,
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
              self.articeList.push({
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
    },
    //获取分页数据
    getPage() {
      var self = this;
      this.$http.post("/api/new/getPageData", {
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
              self.articeList.push({
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
    }
  }
};
</script>

