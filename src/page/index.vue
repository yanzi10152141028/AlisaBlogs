<template>
    <div>
        <el-container>
            <el-header>后台管理系统</el-header>
            <el-container>
                <el-aside style="width:260px;"><aside-menu></aside-menu></el-aside>
                <router-view/>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import AsideMenu from '../components/manageMenu'
export default {
    components:{AsideMenu}
};
</script>
<style>
@import "../assets/page/css/index.scss";
@import "../assets/page/css/table.scss";
</style>
