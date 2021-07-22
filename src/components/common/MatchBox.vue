<template>
    <div class="main" :style="{'font-size':fontSize}">
        <div class="match-title">
            <div class="jg-line-1">{{match.title}}</div>
            <div style="min-width:40px;text-align:center" v-if="dateDiff(match.startTime)>(120*60*1000)">已结束</div>
            <div style="min-width:40px;text-align:center" v-else-if="dateDiff(match.startTime)>0">进行中</div>
            <div style="min-width:40px;text-align:center" v-else>未开始</div>
        </div>
        <div v-if="match.homeTeam" class="team-box">
            <div class="info">
                <el-image :style="{'width':imgSize,'height':imgSize,'margin-right':margin}"
                :src="$utils.url2img(match.homeTeam.logo)"
                fit="cover"/>
                <div>{{match.homeTeam.name}}</div>
            </div>
            <div class="score" :style="{'margin-right':margin}">
                <div v-if="dateDiff(match.startTime)>0">{{match.homeScore}}</div>
                <div v-else>{{timeStr(match.startTime)}}</div>
            </div>
        </div>
        <div v-if="match.visitingTeam" class="team-box">
            <div class="info">
                <el-image :style="{'width':imgSize,'height':imgSize,'margin-right':margin}"
                :src="$utils.url2img(match.visitingTeam.logo)"
                fit="cover"/>
                <div>{{match.visitingTeam.name}}</div>
            </div>
            <div class="score" :style="{'margin-right':margin}">
                <div v-if="dateDiff(match.startTime)>0">{{match.visitingScore}}</div>
                <div v-else>{{startTimeStr(match.startTime)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
             
        }
    },
    props : {
        match : Object,
        imgSize : String,
        fontSize : String,
        margin :String,
    },
    methods : {
        
    },
    computed : {
        dateDiff(){
            return function(timeStr){
               var time = new Date(timeStr)
                return new Date()-time; 
            }
        },
        timeStr(){
            return function(timeStr){
                var time = new Date(timeStr);
                var today = new Date();
                var days = time.setHours(0, 0, 0, 0)-today.setHours(0, 0, 0, 0);
                if(days<86400000) {
                    return "今天";      
                }else if(days<(86400000*2)){ return "明天"}
                else {return (time.getMonth()+1)+'-'+time.getDate()}
            }
        },
        startTimeStr(){
            return function(timeStr){
                var time = new Date(timeStr);
                var hour = time.getHours();
                var minutes = time.getMinutes();
                hour = hour<10?'0'+hour:hour;
                minutes = minutes<10?'0'+minutes:minutes;
                return hour + ':' + minutes;
            }
        }
    }

}
</script>

<style scoped>
    .team-box .info{
        display: flex;
        align-items: center;
    }
    .team-box .score{
        margin-top:4px;
    }
    .main{
        padding:2px;
        border-right:1px solid #F5F5EB;
        font-size:10px;
        box-sizing:border-box;
    }
    .team-box{
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    .match-title{
        color : #666666;
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    .el-image{
        width: 20px; 
        height: 20px;
        margin-top:4px;
        display: block;
    }
</style>