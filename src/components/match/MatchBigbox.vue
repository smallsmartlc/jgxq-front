<template>
  <div class="main">
    <div style="width:10%;text-align:center">{{this.$moment(match.startTime).format('HH:mm')}}</div>
    <div style="width:10%;text-align:center">{{match.title}}</div>
    <div class="match" style="width:60%">
      <div style="width:40%;display:flex;align-items:center;justify-content:flex-end">
        <div style="text-align:right">{{match.homeTeam.name}}</div>
        <el-image
        style="width: 40px; height: 40px;margin: 0 4px"
        :src="'http://localhost:6800/images/'+match.homeTeam.logo"
        fit="cover"></el-image>
      </div>
      <div class="score">
          <span v-if='dateDiff(match.startTime)>0'>{{match.homeScore}}-{{match.visitingScore}}</span>
          <span v-else>VS</span>
      </div>
      <div style="width:40%;display:flex;align-items:center;">
        <el-image
        style="width: 40px; height: 40px;margin: 0 4px"
        :src="'http://localhost:6800/images/'+match.visitingTeam.logo"
        fit="cover"></el-image>
        <div style="width:100px;text-align:left">{{match.visitingTeam.name}}</div>
      </div>
    </div>
    <div style="width:20%;text-align:center"><el-link  v-if="match.link" :href="match.link" :underline='false' type="primary">直播链接</el-link></div>
  </div>
</template>

<script>
export default {
props : {
  match : Object,
},
computed: {
  dateDiff(){
      return function(timeStr){
          var time = new Date(timeStr)
          return new Date()-time; 
      }
  },
},
}
</script>

<style scoped>
  .main{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .match{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .score{
    width:20%;
    text-align: center;
  }
</style>