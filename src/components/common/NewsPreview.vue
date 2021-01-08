<template>
  <div class="main">
        <div class="newsbox">
          <div class="title">{{news.title?news.title:'标题'}}</div>
          <div class="author">
              <el-link :underline="false" style="font-size:16px;margin-right:10px">{{news.author?news.author.nickName:'我'}}</el-link>
              <span>{{fromNowStr(news.createAt?news.createAt:new Date())}}</span>
          </div>
          <el-divider></el-divider>
          <div class="content" v-html="news.text?news.text:'内容'"></div>
      </div>
  </div>
</template>

<script>
import {thumbById,collectById} from '@/api/hit'
export default {
props:{
    news :  Object,
},
computed : {
    fromNowStr(){
        return (time)=>{
            var now = this.$moment();
            var temp =  this.$moment(time);
            if((now-temp) > (3*24*3600*1000)){
                return temp.format('YY-MM-DD HH:mm');
            }else{
                return temp.fromNow();
            }
        }
    }
},
methods: {
   
},
}
</script>

<style scoped>
.main{
    width:100%;
    display: flex;
    justify-content: center;
}
.title{
    font-size: 28px;
}
.author{
    font-size: 12px;
    color: #666;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.content{
    margin-top: 10px;
    font-size: 16px;
    line-height: 24px;
}
.content img{
    max-width: 500px;
    height: auto;
}
.newsbox{
width:100%;
background-color:#fff;
padding:40px;
}

</style>
<style>
.interact sup{
    right: 35% !important;
    top: 20% !important;
}
.content img{
    max-width: 500px!important;
}
.content iframe{
    width: 600px;
    height: 400px;
    margin: 0 auto;
}
</style>