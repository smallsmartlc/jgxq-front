<template>
   <div class="main jg-shadow-box">
        <div class="newsbox" v-if="news.id">
          <div class="title">{{news.title}}</div>
          <div class="author">
              <router-link v-if="news.author" :to="`/user/${news.author.userkey}`"><el-link :underline="false" style="font-size:16px;margin-right:10px">{{news.author.nickName}}</el-link></router-link>
              <span>{{fromNowStr(news.createAt)}}</span>
          </div>
          <el-divider></el-divider>
          <div class="content" v-html="news.text"></div>
        </div>
    </div>
</template>

<script>
export default {
props:{
    news :  Object,
},
computed : {
    fromNowStr(){
        return (time)=>{
            var now = this.$moment();
            var temp =  this.$moment(time);
            if(now.year() == temp.year()){
                if((now-temp) > (3*24*3600*1000)){
                    return temp.format('MM-DD HH:mm');
                }else{
                    return temp.fromNow();
                }
            }else{
                return temp.format('YYYY-MM-DD HH:mm');
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
    background-color:#fff;
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
.newsbox{
    width:100%;
    padding:40px;
}

</style>
<style>
.content img{
    max-width: 80%!important;
}
.content iframe{
    width: 600px;
    height: 400px;
    margin: 0 auto;
}
.content video{
    max-width: 100%;
}
</style>