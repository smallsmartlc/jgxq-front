<template>
    <div>
      <el-row>
        <el-col :span="16">
          <home-title :news="news"/>
          <home-news :news="news"/>
        </el-col>
        <el-col :span="6" :offset="2" class = "hidden-md-and-down">
          <home-team :homeTeam="user?user.homeTeam:null"/>
          <last-matches style="margin-top:60px"></last-matches>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {homeNews} from '@/api/news' 
  import HomeTitle from './home/HomeTitle.vue'
  import HomeTeam from './home/HomeTeam.vue'
  import HomeNews from './home/HomeNews.vue'
  import LastMatches from './home/LastMatches.vue'

export default {
  name: 'JGHome',
  data () {
    return {
      news : []
    }
  },
  props:{
    user:Object,
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
      homeNews(10).then((res)=>{
        if(res.code == 200){
          var temp = res.data;
          this.news = temp;
        }
      })
      this.loading = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>