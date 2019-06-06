<template>
  <div class="list">
   <common-list
   :selectPath="selectPath"
   :selectPagePath="selectPagePath"
   :updatePath="updatePath"
   :deletePath="deletePath"
   :cols="col"
   >
   </common-list>
  </div>
</template>
<script>
import commonList from '../components/list'
export default {
  components:{commonList},
  data(){
    return{
      selectPath:'/api/comment/getComment',
      selectPagePath:'/api/comment/getPageData',
      updatePath:'',
      deletePath:'/api/comment/delData',
      col:'comment'
    }
  }
}
</script>

