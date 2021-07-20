<template>
  <div class="match-boxes" style="display: flex; justify-content: space-between">
    <div class="match-box" v-for="match in matches" :key="match.id" style="width: 50%; height: 70px">
      <router-link :to="'/match/' + match.id">
        <match-box :match="match"></match-box>
      </router-link>
    </div>
  </div>
</template>

<script>
import MatchBox from '../common/MatchBox.vue'
import {homeMatches} from '@/api/match'
export default {
    components:{MatchBox},
    data() {
        return {
            matches : []
        }
    },
    props:{
        homeTeam:Object,
    },
    mounted() {
        this.loadMatch();
    },
    methods:{
        loadMatch(){
            if(!this.homeTeam) return;
            homeMatches(2,this.homeTeam.id).then((res)=>{
                if(res.code==200){
                    this.matches = res.data;
                }
            })
        },
    }

};
</script>

<style scoped>

</style>