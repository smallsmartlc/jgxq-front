<template>
<div>
  <div v-if="user.author">
  </div>
  <div v-else style="width:100%;height:400px;display:flex;justify-content:center;align-items:center">
    <i class="iconfont icon-unie605"></i> 您还不能发表新闻哦,去申请成为创作者吧!!!
  </div>
</div>
    
</template>

<script>

export default {
  name: 'UserCollect',
  data () {
    return {
      
    }
  },
  props:{
    user:Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>