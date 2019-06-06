<template>
    <div class="set">
        <h3>添加我的故事</h3>
        <div class="menu">
            <el-row>
                <el-col :span="12">
                  <el-form  :model="dataList" :rules="rules"  ref="menuList" label-width="100px" class="demo-ruleForm login-container" id="register">
                    <el-form-item label="标题" prop="title" >
                        <el-input v-model="dataList.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="文章类型" prop="type" >
                        <el-select v-model="dataList.type" clearable placeholder="请选择文章类型">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="主图" prop="url">
                        <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :show-file-list="true">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="photo" >
                        </el-dialog>     
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="addAboutus" >添加</el-button>
                    <el-button  >重置</el-button>
                    </el-form-item>
                 </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import common from '../assets/public/js/common.js'
export default {
  data() {
    return {
      dataList: {
        //主图
        photo: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请输入文章类型", trigger: "blur" }],
        photo: [{ required: true, message: "请上传轮播图片", trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
       options: [{
          value: '选项1',
          label: '旅行'
        }, {
          value: '选项2',
          label: '美食'
        }, {
          value: '选项3',
          label: '运动'
        }, {
          value: '选项4',
          label: '兴趣爱好'
        }]
    };
  },
  mounted() {},
  computed: {
    imgUrl: function() {
      return this.dialogImageUrl;
    }
  },
  methods: {
    // 删除照片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 获取图片路径
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file.url);
      console.log(document.getElementById("imgUrl").getAttribute("src"));
    },
    //上传成功
    handleSuccess(file, fileList) {
      this.dialogImageUrl = fileList.url;
      this.$message({
        type:"success",
        message:"上传成功"
      });
    },
    //上传失败
    handleError(file,fileList){
     this.$message("上传失败！")
    },
    // 添加菜单
    addAboutus() {
      var self = this;
      var  now = new Date().toLocaleString();
	         now = common.getDateTime(now);
      this.$http.post("/api/aboutus/addAboutus", {
          title: this.dataList.title,
          type: this.dataList.type,
          url: this.dialogImageUrl,
          addDate: now
        })
        .then(function(result) {
          if (result.status == 200) {
            self.$message({
              message: "添加成功！",
              type: "success"
            });
          }
        });
    }
  }
};
</script>
<style >
.set {
  background-color: #fff;
  width: 100%;
  padding-top: 20px;
}
.set h3 {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
