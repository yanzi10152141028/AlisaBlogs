<template>
  <div id="app">
     <router-view v-if="isRouterAlive"></router-view>
    <!-- <el-row>
      <el-col :span="24">
        <top-menu></top-menu>
      </el-col>
    </el-row>
  	<el-row>
  		<el-col :span='18'  :offset='3'>
		    <router-view/>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
       <bottom></bottom>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
// import TopMenu from '@/components/topMenu'
// import Bottom from '@/components/bottom'
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
  // components:{TopMenu,Bottom}
}
</script>
<style lang="scss">
	@import './assets/public/sass/common.scss'
</style>


