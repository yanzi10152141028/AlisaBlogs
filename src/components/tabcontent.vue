<template>
    <div class="tab_content">
       <el-row v-for="(item,index) in tabList" :key="item.id" v-if='id == item.id'>
           <template >
            <el-col :span="6">
                <div class="tab_left">
                    <img :src="item.imgUrl" />
                    <h3>文字title</h3>
                </div>
            </el-col>
            <el-col :span="16" :offset="1">
                <ul>
                    <li v-for="(i,index) in item.item">
                       <span>{{index+1}}</span>
                       <span>{{i.title}}</span>
                        <p>{{i.detail}}</p>
                    </li>
                </ul>
            </el-col>
           </template>
       </el-row>
    </div>
</template>
<script>
export default {
    props:["id"],
    data(){
        return {
            tabList:[{
            id:1,
            imgUrl:require('../assets/public/images/tab.jpg'),
            item:[{
                title:"第一条",
                detail:'第一条详情'
            },{
                title:'第二条',
                detail:"第二条详情"
            },
            {
                title:"第一条",
                detail:'第一条详情'
            },{
                title:'第二条',
                detail:"第二条详情"
            }]
            },
            {
            id:2,
            imgUrl:require('../assets/public/images/tab.jpg'),
            item:[{
                title:"第一条2",
                detail:'第一条详情'
            },{
                title:'第二条2',
                detail:"第二条详情"
            }]
            },
            {
            id:3,
            imgUrl:require('../assets/public/images/tab.jpg'),
            item:[{
                title:"第一条3",
                detail:'第一条详情'
            },{
                title:'第二条3',
                detail:"第二条详情"
            }] 
            }]
        }
    }
}
</script>
<style lang='scss'>
@import '../assets/public/sass/tab.scss';
</style>

