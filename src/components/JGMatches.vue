<template>
    <el-row>
        <el-col :span="20" :offset="2">
          <match-info/>
        </el-col>
    </el-row>
</template>

<script>
import MatchInfo from './match/MatchInfo.vue'
export default {
  components: { MatchInfo},
  name: 'JGMatches',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>