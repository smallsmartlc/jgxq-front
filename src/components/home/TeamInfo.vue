<template>
  <div v-if="teamInfo" style="height:100%;width:100%;">
    <el-scrollbar style="height:100%;">
      <infos-box v-if="teamInfo.infos.normal" title = "基本信息" :items = 'teamInfo.infos.normal'></infos-box>
      <infos-box v-if="teamInfo.infos.contact" title = "联系方式" :items = 'teamInfo.infos.contact'></infos-box>
      <champion-box v-if="teamInfo.infos.champions" title = "荣誉记录" :items = 'teamInfo.infos.champions'></champion-box>
    </el-scrollbar>
  </div>
</template>

<script>
import {getTeamById} from '@/api/team'
import InfosBox from '../common/InfosBox'
import ChampionBox from '../common/ChampionBox'
export default {
    components : {InfosBox,ChampionBox},
    mounted() {
        this.load();
    },
    methods: {
        load(){
            getTeamById(this.homeTeam.id).then((res)=>{
                if(res.code == 200){
                    this.teamInfo = res.data;
                }
            })
        }
    },
    data() {
        return {
          teamInfo : null,
        }
    },
    props : {
        homeTeam:Object,
    },
    computed: {
    },
}
</script>

<style scoped>

</style>