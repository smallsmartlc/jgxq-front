<template>
  <div class="main" :style="lstyle">
      <div class="item"><i class="el-icon-loading"></i><span>{{text}}</span></div>
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
    text : {
        type : String,
        default : "加载中"
    }
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