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
      selectPath:'/api/aboutus/getAboutus',
      selectPagePath:'/api/aboutus/getPageData',
      updatePath:'/api/aboutus/updateAboutus',
      deletePath:'/api/aboutus/delAboutus',
      col:'aboutus'
    }
  }
}
</script>

