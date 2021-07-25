<template>
    <div>
        <div v-for="matchlist in matchGroup(matches)" :key="matchlist.startTime">
            <div class="title">
                <div style="background-color:#fc0;transform: skewX(-20deg);width:6px;height:25px;margin-right:10px"></div>
                <div>{{matchlist.startTime}}</div>
            </div>
            <ul class="jg-shadow-box">
                <li class="match-item" v-for="(item) in matchlist.matchlist" :key="item.id">
                    <router-link :to="'/match/'+item.id">
                    <match-bigbox :match="item"  style="width:100%;height:60px"></match-bigbox>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import MatchBigbox from './MatchBigbox.vue';
export default {
  components: {MatchBigbox, },
    props : {
      matches : Array,
    },
    computed: {
        matchGroup () {
            return (matches)=>{
                let newArr = [];
                if(!matches) return;
                matches.forEach(match => {
                    let index = -1;
                    let isExists = newArr.some((item,j)=>{
                        if(item.startTime===this.$moment(match.startTime).format('yyyy-MM-DD 周dd')){
                        index = j;
                        return true;
                        }
                    });
                    if(!isExists){
                        newArr.push({
                            startTime:this.$moment(match.startTime).format('yyyy-MM-DD 周dd'),
                            matchlist:[match]
                        })
                    }else{
                        newArr[index].matchlist.push(match);
                    }
                });
                return newArr; 
            }
        }
    },
}
</script>

<style scoped>
    .match-item{
        padding:2px;
    }
    .match-item:hover{
        background-color: rgba(255, 255, 255, 0.6)!important;
    }
    .match-item:first-child{
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .match-item:last-child{
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .match-item:nth-child(odd){
        background-color:#fff;
    }
    .match-item:nth-child(even){
        background-color:#f7f7f7;
    }
    .title{
        display: flex;
        align-items: center;
        padding: 16px;
    }
</style>