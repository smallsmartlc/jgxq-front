<template>
  <div>
      <div class="box" :style="dstyle">
          <div class="content">{{dname}}</div>
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
    transform: skewX(-10deg);
    border-radius: 4px;
}
.box:hover{
  animation:test 0.3s 1;
}
@keyframes test{
  50% {transform: skewX(-40deg)}
}
.content{
  transform: skewX(10deg);
}
</style>