<template>
  <div style="width:250px">
    <diamond-title dname="近日比赛"/>
    <div class="match_box" v-for="match in matches" :key="match.id">
        <div class="imgbox">
            <el-image style="width:40px;height:40px"
            :src="'http://localhost:6800/images/'+match.homeTeam.logo"
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
            :src="'http://localhost:6800/images/'+match.visitingTeam.logo"
            fit="cover"/>
            <div style="text-align:center">{{match.visitingTeam.name}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import DiamondTitle from '../common/DiamondTitle.vue'
export default {
  components: { DiamondTitle },
    data() {
        return {
            matches:[
        {
            "id": 6,
            "title": "邮超联赛38轮",
            "homeTeam": {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "homeScore": 5,
            "visitingTeam": {
                "id": 6,
                "name": "好球队",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "visitingScore": 1,
            "startTime": "2020-12-23T04:00:00.000+00:00",
            "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025"
        },
        {
            "id": 5,
            "title": "友谊赛",
            "homeTeam": {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "homeScore": 0,
            "visitingTeam": {
                "id": 5,
                "name": "好球队",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "visitingScore": 0,
            "startTime": "2020-12-24T04:00:09.000+00:00",
            "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025"
        },
        {
            "id": 16,
            "title": "邮超联赛38轮",
            "homeTeam": {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "homeScore": 5,
            "visitingTeam": {
                "id": 6,
                "name": "好球队",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "visitingScore": 1,
            "startTime": "2020-12-19T04:00:00.000+00:00",
            "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025"
        },
        {
            "id": 15,
            "title": "友谊赛",
            "homeTeam": {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "homeScore": 0,
            "visitingTeam": {
                "id": 5,
                "name": "好球队",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "visitingScore": 0,
            "startTime": "2020-12-12T04:00:09.000+00:00",
            "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025"
        },
        {
            "id": 26,
            "title": "邮超联赛38轮",
            "homeTeam": {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "homeScore": 5,
            "visitingTeam": {
                "id": 6,
                "name": "好球队",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "visitingScore": 1,
            "startTime": "2020-12-19T04:00:00.000+00:00",
            "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025"
        },
        {
            "id": 25,
            "title": "友谊赛",
            "homeTeam": {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "homeScore": 0,
            "visitingTeam": {
                "id": 5,
                "name": "好球队",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            "visitingScore": 0,
            "startTime": "2020-12-12T04:00:09.000+00:00",
            "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025"
        }
    ]
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