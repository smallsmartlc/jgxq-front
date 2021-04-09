<template>  
    <div class="block" style="width:100%">
        <el-carousel trigger="click" height="400px" indicator-position="outside" style="background-color:#fff;border:10px solid #fff;box-sizing:border-box;">
            <el-carousel-item v-for="item in news.slice(0,5)" :key="item.id" style="display:relative">
                <router-link :to="`/news/${item.id}`">
                    <div style="width:100%;height:100%;overflow:hidden;display:flex;align-items:center">
                        <el-image
                        style="width:100%;"
                        :src="$utils.url2img(item.cover)"
                        fit="cover"></el-image>
                        <div class="small">{{ item.title }}</div>
                    </div>
                </router-link>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props:{
        news:Array,
    },
    data() {
        return {
        }
    }, 
} 
</script>

<style scoped>
    .small{
        position:absolute;
        bottom:0;
        font-size:20px;
        color:#fff;
        background-color:rgba(0,0,0,0.5);
        width:100%;
        padding : 10px;
        padding-right: 30%;
        box-sizing:border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow:hidden;
    }
    .el-carousel{
        width: 100%;
    }
    .el-carousel__item h3 {
    color: #696447;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #bfbb99;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #e6e5d3;
  }
</style>