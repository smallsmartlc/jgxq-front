<template>
    <el-row>
        <el-col :span="20" :offset="2">
          <match-info @disabled="changedisabled"  ref="matchinfo"/>
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
  },  
  mounted(){
    this.load();
  },
  methods:{
    load(){
      this.$refs.matchinfo.load();
    },
    changedisabled(val){
      this.$emit("disabled",val);
    }
  },
  computed:{
    disabled2 () {
      console.log("变化");
      this.$emit("update:disabled",this.disabled);
      return val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>