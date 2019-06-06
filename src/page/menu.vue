<template>
    <div class="set">
        <h3>添加菜单</h3>
        <div class="menu">
            <el-row>
                <el-col :span="12">
                  <el-form  :model="menuList" :rules="rules"  ref="menuList" label-width="100px" class="demo-ruleForm login-container" id="register">
                    <el-form-item label="菜单名称" prop="title" >
                        <el-input v-model="menuList.title" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                    <el-form-item label="路由" prop="path" >
                        <el-input v-model="menuList.path" placeholder="请输入路由如/VueFrame"></el-input>
                    </el-form-item>
                    <el-form-item label="name" prop="name">
                        <el-input   auto-complete="off" v-model="menuList.name" placeholder="请输入路由name"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="num">
                        <el-input   auto-complete="off" v-model.number="menuList.num" maxlength="1" placeholder="请输入排序"></el-input>
                    </el-form-item>
                    <el-form-item label="项目" prop="type" >
                        <el-select v-model="menuList.type" clearable placeholder="请选择项目">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单类型" prop="type" >
                        <el-select v-model="menuList.menuType" clearable placeholder="请选择菜单">
                            <el-option
                            v-for="item in menuTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="轮播图" prop="url">
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
                        <img width="100%" :src="dialogImageUrl" alt="photo" id="imgUrl">
                        </el-dialog>     
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="addMenu" >添加</el-button>
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
      menuList: {
        //轮播图片
        photo: ""
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        path: [{ required: true, message: "请输入路径", trigger: "blur" }],
        name: [{ required: true, message: "请输入name", trigger: "blur" }],
        url: [{ required: true, message: "请输入轮播路径", trigger: "blur" }],
        photo: [{ required: true, message: "请上传轮播图片", trigger: "blur" }],
        num:[{required: true, message: "请输入排序", trigger: "blur"},
             {type:'number',message:"必须输入数字",trigger:'blur'}]
      },
      options: [{
          value: '0',
          label: '博客'
        }, {
          value: '1',
          label: '小程序'
        }],
       menuTypeList:[{
          value: '0',
          label: '首页'
        }, {
          value: '1',
          label: '西瓜视频'
        }],
      dialogImageUrl: "",
      dialogVisible: false
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
    },
    //上传失败
    handleError(file,fileList){
     this.$message("上传失败！")
    },
    // 添加菜单
    addMenu() {
      var self = this;
      var  now = new Date().toLocaleString();
		       now = common.getDateTime(now);
      this.$http.post("/api/menu/addMenu", {
          text: this.menuList.title,
          path: this.menuList.path,
          name: this.menuList.name,
          url: this.dialogImageUrl,
          num:this.menuList.num,
          type:this.menuList.type,
          menuType:this.menuList.menuType,
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
