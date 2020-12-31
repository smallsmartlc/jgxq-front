<template>
  <div class="main" v-if="news.id">
        <div class="interact">
            <el-badge :value="news.hit.thumbs" class="item" type="primary">
                <el-button @click="thumb" :style="{'color': news.hit.thumb?'#fc0':'#666'}" icon="iconfont icon-zan" circle></el-button> 
            </el-badge>
            <el-badge :value="news.hit.comments" class="item" type="primary">
                <a href="#newsComment"><el-button icon="el-icon-chat-dot-round" circle></el-button></a> 
            </el-badge>
            <el-badge :value="news.hit.collects" class="item" type="primary">
                <el-button @click="collect" :style="{'color': news.hit.collect?'#fc0':'#666'}" icon="el-icon-star-off" circle></el-button> 
            </el-badge>
            <div><el-button @click="shareqq" icon="iconfont icon-qq" circle></el-button></div>
            <div><el-button @click="shareqzone" icon="iconfont icon-kongjian" circle></el-button></div> 
        </div>
        <div class="newsbox">
          <div class="title">{{news.title}}</div>
          <div class="author">
              <el-link :underline="false" style="font-size:16px;margin-right:10px">{{news.author.nickName}}</el-link>
              <span>{{fromNowStr(news.createAt)}}</span>
          </div>
          <el-divider></el-divider>
          <div class="content" v-html="news.text"></div>
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
                return temp.format('MM-DD HH:mm');
            }else{
                return temp.fromNow();
            }
        }
    }
},
methods: {
    thumb(){
        thumbById(0,this.news.id).then((res)=>{
            if(res.code == 200){
                if(res.data){
                    this.news.hit.thumb = true;
                    this.news.hit.thumbs++;
                }else{
                    this.$message({
                        message: '您已经赞过了',
                        type: 'warning'
                    });
                }
            }
        })
    },
    collect(){
        collectById(0,this.news.id,this.news.hit.collect).then((res)=>{
            if(res.code == 200){
                if(res.data == true){
                   var str = this.news.hit.collect?"取消收藏成功":"已添加到我的收藏";
                    this.$message({
                        message: str,
                        type: 'success'
                    });
                    this.news.hit.collect = !this.news.hit.collect;
                }else{
                    var str = this.news.hit.collect?"取消收藏失败":"收藏失败"
                    this.$message({
                        message: str,
                        type: 'warning'
                    });
                }
            }
        })
        
    },
    shareqq(){
        var url = window.location.href;
        var title = this.news.title;
        var site = url.split('/')[0];
        var summary = this.news.text.substring(0, 30);
        var pics = "http://localhost:6800/images/"+this.news.cover;
        var desc = "我在“经管雄起”看到一条新闻，一起来看看吧"
        var link =  "http://connect.qq.com/widget/shareqq/index.html?url="+url+"&title="+title+"&desc="+desc+"&summary="+summary+"&site="+site+"&pics="+pics
        window.open(link);
    },
    shareqzone(){
        var url = window.location.href;
        var title = this.news.title;
        var summary = this.news.text.substring(0, 30);
        var pics = "http://localhost:6800/images/"+this.news.cover;
        var link =  "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&sharesource=qzone&title="+title+"&pics="+pics+"&summary="+summary;
        window.open(link);
    }
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
.interact{
   width:60px;
   position: fixed;
   background-color: #fff;
   left: 160px;
   background-color: transparent;
   z-index: 1000;
}
.interact .el-button{
background-color:#fff;
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
</style>