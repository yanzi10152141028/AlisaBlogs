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
      selectPath:'/api/new/getNew',
      selectPagePath:'/api/new/getPageData',
      updatePath:'/api/new/updateNew',
      deletePath:'/api/new/delNew',
      col:'new'
    }
  }
}
</script>

