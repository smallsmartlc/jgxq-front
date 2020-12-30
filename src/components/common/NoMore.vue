<template>
  <div class="main" :style="lstyle?{'height':lstyle.height,'font-size':lstyle.fontSize}:''">
      <div class="item">没有更多了</div>
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