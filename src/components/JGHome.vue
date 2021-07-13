<template>
<div>
    <div>
      <el-row>
        <el-col v-loading.fullscreen.lock="loading" :span="16">
          <home-title :news="news"/>
          <home-news :news="news"/>
        </el-col>
        <el-col :span="6" :offset="2">
          <home-team :homeTeam="user?user.homeTeam:null"/>
          <last-matches style="margin-top:60px"></last-matches>
        </el-col>
      </el-row>
    </div>
</div>
</template>

<script>
  import {homeNews,pageNews} from '@/api/news' 
  import HomeTitle from './home/HomeTitle.vue'
  import HomeTeam from './home/HomeTeam.vue'
  import HomeNews from './home/HomeNews.vue'
  import LastMatches from './home/LastMatches.vue'

export default {
  name: 'JGHome',
  data () {
    return {
      topNews : [],
      newsList : [],
      news : [],
      loading : false,
    }
  },
  computed : {
    user(){
      return this.$store.getters.userInfo;
    }
  },
  components : {
    HomeTitle,
    HomeTeam,
    HomeNews,
    LastMatches
  },
  mounted(){
    this.load();
  },
  methods: {
    load () {
      this.loading = true
      homeNews().then((res)=>{
        if(res.code == 200){
          var temp = res.data;
          this.news = temp.concat(this.news);
        }
        this.loading = false
      })
      // todo 可能更换成热点话题
      pageNews(1,10,{topNews:true}).then((res) => {
        if(res.code == 200){
            var temp = res.data.records;
            this.news = this.news.concat(temp);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>