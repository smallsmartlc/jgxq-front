<template>
  <div style="width:250px">
    <diamond-title dname="近日比赛"/>
    <div v-for="match in matches" :key="match.id">
    <a :href="`/match/${match.id}`">
        <div class="match_box">
            <div class="imgbox">
                <el-image style="width:40px;height:40px"
                :src="$utils.url2img(match.homeTeam.logo)"
                fit="cover"/>
                <div style="text-align:center">{{match.homeTeam.name}}</div>
            </div>
            <div style="text-align:center;">
                <div>{{match.title}}</div>
                <div style="font-size:25px" v-if="dateDiff(match.startTime)>0">{{match.homeScore}}&nbsp;-&nbsp;{{match.visitingScore}}</div>
                <div v-else>VS</div>
            </div>
            <div class="imgbox">
                <el-image style="width:40px;height:40px"
                :src="$utils.url2img(match.visitingTeam.logo)"
                fit="cover"/>
                <div style="text-align:center">{{match.visitingTeam.name}}</div>
            </div>
        </div>
    </a>
    </div>
    
  </div>
</template>

<script>
import {endMatches} from '@/api/match'
import DiamondTitle from '../common/DiamondTitle.vue'
export default {
    components: { DiamondTitle },
    mounted() {
        this.loading();
    },
    methods: {
        loading(){
           endMatches(10).then((res)=>{
               if(res.code==200){
                   this.matches = res.data;
               }
           }) 
        }
    },
    data() {
        return {
            matches:[]
        }
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
.imgbox{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.match_box{
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>