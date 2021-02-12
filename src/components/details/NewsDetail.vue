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
mounted() {
    this.getNewsById(this.$route.params.id);
},
methods: {
    getNewsById(id){
        getNewsById(id).then((res)=>{
            if(res.code == 200){
                this.news = res.data
            }
        })
        // axios.get('http://localhost:6800/news/'+id)
        // .then((response)=> {
        //   console.log(response);
        //   this.news = response.data.data
        // })  
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