<template>
    <div>
      <el-row>
        <el-col :span="16">
          <home-title/>
          <home-news/>
        </el-col>
        <el-col :span="6" :offset="2" class = "hidden-md-and-down">
          <home-team/>
          <last-matches style="margin-top:60px"></last-matches>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import HomeTitle from './home/HomeTitle.vue'
  import HomeTeam from './home/HomeTeam.vue'
  import HomeNews from './home/HomeNews.vue'
  import LastMatches from './home/LastMatches.vue'

export default {
  name: 'JGHome',
  data () {
    return {
      
    }
  },
  components : {
    HomeTitle,
    HomeTeam,
    HomeNews,
    LastMatches
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>