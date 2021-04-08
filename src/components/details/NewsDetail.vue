<template>
  <el-row>
      <el-col :span="14" :offset="2">
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

</style>