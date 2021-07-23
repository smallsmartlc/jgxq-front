<template>
    <el-backtop target='.app-component .el-scrollbar__wrap' style="height:60px;width:60px;" >
        <div tabindex="0" class="button">
            <el-image class="fire"
            :src="require('../../assets/rocket-fire.png')" fit="cover"></el-image>
            <el-image style="width: 60px; height: 60px;position:absolute;left:0;top:0" :src="require('../../assets/rocket.png')" fit="cover"></el-image>
        </div>
    </el-backtop>
  
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style>
.button:focus .fire{
    /* 实现原理是backtop组件每次点击后都会删除dom元素然后再重新加载，相当于重置了focus状态，所以我们不用管动画完成后的状态 */
    transition: 0.5s;
    transform: translateY(20px);
}
.fire{
    width: 60px; 
    height: 60px;
    position:absolute;
    left:0;
    top:-20px;
}
</style>