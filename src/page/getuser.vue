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
      selectPath:'/api/user/getUser',
      selectPagePath:'/api/user/getPageData',
      updatePath:'/api/user/updateUser',
      deletePath:'/api/user/deleteUser',
      col:'user'
    }
  }
}
</script>

