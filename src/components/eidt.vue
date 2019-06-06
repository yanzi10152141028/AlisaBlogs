<template>
    <div class="set">
      <el-dialog title="信息编辑" :visible.sync="dialogFormVisible">
        <!-- <el-form :model="eidtData" :rules="rules">
              <el-form-item :label="col.value"  :prop="col.key" v-for="(col,key) in cols" :key="key">
                <div v-for="item in eidtData ">
                   <el-input :v-model="item" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </div>
              </el-form-item> 
        </el-form> -->
        <el-form :model="eidtData" :rules="rules">
              <el-form-item label="昵称" prop="nickName" >
                    <el-input v-model="eidtData.nickName" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name" >
                    <el-input v-model="eidtData.name" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input  v-model="eidtData.pwd" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model.number="eidtData.phone" auto-complete="on" :label-width="formLabelWidth"></el-input>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateParentData">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import common from "../assets/public/js/common.js";
export default {
  props: ["dialogFormVisible", "formLabelWidth", "marker", "cols","data"],
  inject: ["reload"],
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请输入文章类型", trigger: "blur" }],
        photo: [{ required: true, message: "请上传轮播图片", trigger: "blur" }]
      },
      dialogImageUrl: "",
      dialogVisible: false,
      eidtData: {},
      options: [
        {
          value: "选项1",
          label: "旅行"
        },
        {
          value: "选项2",
          label: "美食"
        },
        {
          value: "选项3",
          label: "运动"
        },
        {
          value: "选项4",
          label: "兴趣爱好"
        }
      ]
    };
  },
  computed: {
    imgUrl: function() {
      return this.dialogImageUrl;
    }
  },
  watch: {
    //监听父传子的值/对象
    data: {
      handler(newVal, oldVal) {
        this.eidtData = newVal;
        // for(var i in newVal){
        //  this.eidtData.push(newVal[i])
        // }
        console.log(this.eidtData);
      },
      immediate: true
    }
  },
  methods: {
    //修改父组件的值
    updateParentData() {
      this.$emit("dialogFormVisible", false);
    },
    //更新信息
    updateUser() {
      var self = this;
      var now = new Date().toLocaleString();
      now = common.getDateTime(now);
      this.$http
        .post("/api/user/updateUser", {
          nickName: this.eidtData.nickName,
          username: this.eidtData.name,
          password: this.eidtData.pwd,
          phone: this.eidtData.phone,
          addDate: now,
          id: this.eidtData.id
        })
        .then(function(result) {
          if (result.status == 200) {
            self.$message({
              type: "success",
              message: "更新成功!"
            });
            self.reload();
            setTimeout(() => {
              self.updateParentData();
            }, 1000);
          }
        });
    },
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
        type: "success",
        message: "上传成功"
      });
    },
    //上传失败
    handleError(file, fileList) {
      this.$message("上传失败！");
    },
    // 添加菜单
    addAboutus() {
      var self = this;
      var now = new Date().toLocaleString();
      now = common.getDateTime(now);
      this.$http
        .post("/api/aboutus/addAboutus", {
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
