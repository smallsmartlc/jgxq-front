<template>
  <div class="main" :style="lstyle?{'height':lstyle.height,'font-size':lstyle.fontSize}:''">
      <div class="item">{{text}}</div>
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
        default : "没有更多了"
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