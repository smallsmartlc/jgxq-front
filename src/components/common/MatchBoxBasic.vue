<template>
    <div class="match-box">
        <div style="min-width:100px" class="title">
            <div style="font-size:12px;">{{this.$moment(match.startTime).format('HH:mm')}} {{match.title}}</div>
        </div>
        <div style="display:flex;justify-content:center;align-items:center;width:100%;">
            <div style="width:100px;text-align:right">{{match.homeTeam.name}}</div>
            <el-image
            style="width: 24px; height: 24px;margin: 0 4px"
            :src="$utils.url2img(match.homeTeam.logo)"
            fit="cover"></el-image>
            <div class="score" 
            :style="{'background-color':getMatchColor(match)}">
                <span v-if='dateDiff(match.startTime)>0'>{{match.homeScore}}-{{match.visitingScore}}</span>
                <span v-else><i class="el-icon-message-solid"></i></span>
            </div>
            <el-image
            style="width: 24px; height: 24px;margin: 0 4px"
            :src="$utils.url2img(match.visitingTeam.logo)"
            fit="cover"></el-image>
            <div style="width:100px;text-align:left">{{match.visitingTeam.name}}</div>
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
    },
    methods : {
        
    },
    computed : {
        getTime(){
            return (timeStr)=>{
                var time = new Date(timeStr);
                var month = time.getMonth()+1;
                var date = time.getDate();
                var hours = time.getHours();
                var min = time.getMinutes();
                var a = new Array("日", "一", "二", "三", "四", "五", "六");  
                var res = new Date(timeStr).getDay();
                month = month<10?'0'+month:month;
                date = date<10?'0'+date:date;
                hours = hours<10?'0'+hours:hours;
                min = min<10?'0'+min:min;
                return month + '-' +date+' '+hours+':'+min+' 周'+a[res]; 
            }
        },
        getMatchColor(){
            return (item)=>{
                if(item.homeScore > item.visitingScore){
                    return '#F56C6C';
                }else if(item.homeScore < item.visitingScore){
                    return '#409EFF';
                }else{
                    return '#67C23A';
                }
            }
        },
        dateDiff(){
            return function(timeStr){
               var time = new Date(timeStr)
                return new Date()-time; 
            }
        },

    }

}
</script>

<style scoped>
    .title{
        display: flex;
        justify-content:space-between;
    }
    .score{
        height:16px;
        padding:0 4px;
        border-radius:4px;
        color:#fff;
    }
    .match-box{
        display: flex;
        justify-content:center;
        align-items: center;
        flex-direction : column;
        border-bottom:1px solid #CCCBC0;
        font-size:12px;
        width:100%;
    }
</style>