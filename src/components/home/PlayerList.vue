<template>
  <div style="height:100%;width:100%;">
    <el-scrollbar style="height:100%;">
    <ul>
    <li v-for="item in playerList" :key="item.id" style="font-size:14px">
      <div style="background-color:#f7f7f7;padding:5px;color:#666;">{{item.name}}</div>
      <div v-for="player in item.playerList" :key="player.id">
        <router-link :to="`/player/${player.id}`">
        <div style="padding:5px;display:flex">
          <div><el-avatar :size="60" 
                  :src="$utils.url2img(player.headImage)" 
                  fit="cover"
                  style="background:#fff;margin:auto 0"
                  ></el-avatar></div>
          <div style="margin:auto 0">
            <div>{{player.name}}</div>
            <div style="color:#666;font-size:12px">{{player.age}}岁·{{player.number}}号·{{player.nation}}</div>
          </div>
        </div>
        </router-link>
      </div>
    </li>
    </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import {getTeamMembers} from '@/api/player.js'
export default {
   
    mounted() {
        this.load();
    },
    methods: {
        load(){
            getTeamMembers(this.homeTeam.id).then((res)=>{
                if(res.code==200){
                    this.playerList = res.data;
                }
            })     
        }
    },
    data() {
        return {
          playerList : []
        }
    },
    props : {
        homeTeam : Object,
    },
    computed: {
    },
}
</script>

<style scoped>

</style>