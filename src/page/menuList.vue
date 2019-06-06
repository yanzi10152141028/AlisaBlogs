<template>
  <div class="list">
   <common-list
   :selectMenuPath="selectPath"
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
      selectPath:'/api/menu/getMenu',
      selectPagePath:'/api/menu/getPageData',
      updatePath:'/api/menu/updateMenu',
      deletePath:'/api/menu/delMenu',
      col:'menu'
    }
  }
}
</script>

