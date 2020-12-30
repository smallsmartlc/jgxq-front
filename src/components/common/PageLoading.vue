<template>
  <div class="main" :style="lstyle">
      <div class="item"><i class="el-icon-loading"></i><span>加载中</span></div>
  </div>
</template>

<script>
export default {
data() {
    return {
        
    }
},
props : {
    lstyle : Object,
}
}
</script>

<style scoped>
    .main{
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #FCFCF2;
        font-size: 12px;
    }
    .item{
        color: #fc0;
    }
</style>