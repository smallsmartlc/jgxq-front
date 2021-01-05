<template>
    <el-backtop target='.app-component .el-scrollbar__wrap' @click="ignite" style="height:60px;width:60px;" >
        <div>
            <el-image class="fire" :class="isIgnite?'ignite':''"
            :src="require('../../assets/rocket-fire.png')" fit="cover"></el-image>
            <el-image style="width: 60px; height: 60px;position:absolute;left:0;top:0" :src="require('../../assets/rocket.png')" fit="cover"></el-image>
        </div>
    </el-backtop>
  
</template>

<script>
export default {
    
    data() {
        return {
            isIgnite : false,
        }
    },
    methods: {
        ignite(){
            this.isIgnite = true;
            setTimeout(() => {
                this.isIgnite = false; 
            }, 500);
        },
    },
}
</script>

<style>
.fire{
    width: 60px; 
    height: 60px;
    position:absolute;
    left:0;
    top:-20px;
}
.fly{
    animation:ignite 1s 1;
}
.ignite{
    animation:ignite 0.5s 1;
}
@keyframes ignite{
    from{top:-20px}
    to{top:0px}
}
@keyframes fly{
    from{margin-bottom:0px}
    to{margin-bottom:80px}
}
</style>