<template>
  <div class="topMenu">
				<div class="logo">Alisa 博客</div>
				<el-menu 
					class="el-menu-demo" 
					mode="horizontal"
					background-color="#fff" 
					text-color="#545c64"
					active-text-color="#ffd04b"
					:default-active="id"
					>
						<el-menu-item 
						  :index="String(item.num)" 
						  v-for="(item,index) in menuList"  
						  :key="index"
						  @click="toPage(item)">{{item.text}}</el-menu-item>
				</el-menu>
				<div class="login">
					<button @click="toLoginPage">登录</button>
					<button>注册</button>
				</div>
			<!-- <div class="search">
				<span>搜索</span>
				<div class="search_input">
					<el-autocomplete
					class="inline-input"
					v-model="state"
					placeholder="请输入搜索内容"
					:trigger-on-focus="false"
					>
					</el-autocomplete>
				</div>
			</div> -->
  </div>
</template>
<script>
export default {
	name: "topmenu",
	props:['id'],
  data() {
    return {
			activeIndex:'1',
			state:'',
			menuList:[
				// {id:'1',text:'首页',path:'/',name:'/home'},
				// {id:'2',text:'前端新闻',path:'/VueFrame',name:'/vueframe '},
				// {id:'3',text:'常见问题',path:'/Faq',name:'/faq'},
				// {id:'4',text:'我的故事',path:'/AboutUs',name:'/aboutus'},
				// {id:'5',text:'吐槽天地',path:'/Comment',name:'/comment'}
			]
    };
	},
	created(){
		this.getMenu();
	},
	methods:{
		//跳转链接
		toPage(e){
			this.$router.push(e.path);
    //  this.$router.push({
		// 	 path:e.path,//跳转路由
    //    query:{
		// 		 id:e.id
		// 	 }//参数对象
		//  })
		},
		//跳转登录
		toLoginPage(){
			this.$router.push({path:'/login'})
		},
		//查询菜单
		getMenu(){
			var self = this;
			this.$http.post("/api/menu/getMenu",{type:'博客'}).
			then(function(result){
            if(result.status == 200){
							self.menuList = result.data;
 			   }
			})
		}
	}
};
</script>
