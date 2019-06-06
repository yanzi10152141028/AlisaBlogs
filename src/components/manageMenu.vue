<template>
    <div class="manageMenu">
        <el-row>
            <el-col >
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                theme="dark" 
                :unique-opened="true"
                :collapse="isCollapse">
                  <template  v-for="(item,i) in menuList">
                    <el-submenu :index='item.id' v-if='item.hasChild== true'>
                        <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{item.title}}</span>
                        </template>
                        <el-menu-item-group >
                        <el-menu-item :index='item.id+"-"+(o+1)' @click="toPage(i.path)" v-for="(i,o) in item.items" :key="o">{{i.title}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item :index="item.id" v-else  @click="toPage(item.path)">
                      <i class="el-icon-menu"></i>
                      <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                  </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false, //false展开
      menuList: [
        {
          id: "1",
          title: "用户信息管理",
          hasChild:true,
          items: [
            {
              title: "添加用户信息",
              path: "/AddUser"
            },
            {
              title: "用户信息列表",
              path: "/GetUser"
            }
          ]
        },
        {
          id: "2",
          title: "*前端框架管理",
          hasChild:true,
          items: [
            {
              title: "添加前端框架内容",
              path: "/new"
            },
            {
              title: "前端框架信息列表",
              path: "/newList"
            }
          ]
        },
        {
          id: "3",
          title: "常见问题管理",
          hasChild:true,
          items: [
            {
              title: "添加常见问题内容",
              path: "/question"
            },
            {
              title: "常见问题信息列表",
              path: "/questionList"
            }
          ]
        },
        {
          id: "4",
          title: "我的故事管理",
          hasChild:true,
          items: [
            {
              title: "添加我的故事内容",
              path: "/manageaboutus"
            },
            {
              title: "我的故事信息列表",
              path: "/aboutusList"
            }
          ]
        },
        {
          id: "5",
          title: "吐槽大会管理",
          path:'/managecomment',
          hasChild:false,
        },
        {
          id: "6",
          title: "*菜单设置",
          hasChild:true,
           items: [
            {
              title: "菜单设置",
              path: "/menu"
            },
            {
              title: "菜单列表",
              path: "/menuList"
            }
          ]
        }
      ]
    };
  },
  methods: {
    //跳转页面
    toPage(e) {
      this.$router.push(e);
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>
<style>
@import "../assets/page/css/menu.scss";
</style>
