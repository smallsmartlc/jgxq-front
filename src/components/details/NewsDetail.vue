<template>
  <el-row>
      <el-col :span="14" :offset="2">
          <div class="affix">
              <div class="interact" v-if="news.id">
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
          </div>
          <main-news :news="getnews"/>
          <news-comment :user="user" id="newsComment"/>
      </el-col>
      <el-col :span="6" :offset="2">
          <news-tag :tag="news.tags"/>
      </el-col>
  </el-row>
</template>

<script>
// import axios from 'axios'
import {getNewsById} from '@/api/news'
import {thumbById,collectById} from '@/api/hit'
import MainNews from './MainNews.vue'
import NewsComment from './NewsComment.vue'
import NewsTag from './NewsTag.vue'
export default {
components: { MainNews, NewsTag, NewsComment },
data() {
  return {
    news : {},
  }
},
// metaInfo(){
//   return {
//     // title: this.news.title,
//     meta: [
//       { itemprop: 'name', content: this.news.title },
//       { itemprop: 'image', content: this.$utils.url2img(this.news.cover) },
//       { name:'description', itemprop: 'description', content: this.$utils.editor2Text(this.news.text).substring(0,30) }
//     ]
//   }
// },
created() {
    this.getNewsById(this.$route.params.id);
},
methods: {
    getNewsById(id){
        getNewsById(id).then((res)=>{
            if(res.code == 200){
                this.news = res.data;
                document.title = this.news.title;
                // this.setShare();
            }
        })
    },
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
                    this.news.hit.collects +=  this.news.hit.collect?1:-1;
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
        var pics = this.$utils.url2img(this.news.cover);
        var desc = "我在“经管雄起”看到一条新闻，一起来看看吧"
        var link =  "http://connect.qq.com/widget/shareqq/index.html?url="+url+"&title="+title+"&desc="+desc+"&summary="+summary+"&site="+site+"&pics="+pics
        window.open(link);
    },
    shareqzone(){
        var url = window.location.href;
        var title = this.news.title;
        var summary = this.news.text.substring(0, 30);
        var pics = this.$utils.url2img(this.news.cover);
        var link =  "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&sharesource=qzone&title="+title+"&pics="+pics+"&summary="+summary;
        window.open(link);
    }
},
computed : {
  getnews(){
    return this.news;
  }
},

props:{
  user:Object,
}
}
</script>

<style scoped>

.affix{
    position: sticky;
    top: 100px;
    height: 0;
    z-index: 1000;
}
.interact{
   width:60px;
   /* position: absolute; */
   background-color: #fff;
   /* margin-left: calc(-50% - 60px); */
   background-color: transparent;
   margin-left: -60px;
}
.interact .el-button{
  background-color:#fff;
}
</style>
<style>

.interact sup{
    right: 35% !important;
    top: 20% !important;
}
</style>