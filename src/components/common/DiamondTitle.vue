<template>
  <div>
      <div class="box" :style="dstyle">
          <div style="transform: skewX(30deg);">{{dname}}</div>
        </div>
  </div>
</template>

<script>
export default {
props : {
    dname : String,
    dstyle : Object,
}
}
</script>

<style scoped>
.box{
    height: 40px;
    width: 100px;
    background-color: #fc0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transform: skewX(-30deg);
}
</style>