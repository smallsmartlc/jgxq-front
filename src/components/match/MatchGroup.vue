<template>
    <div>
        <div v-for="matchlist in matchGroup(matches)" :key="matchlist.startTime">
            <div class="title">
                <div style="background-color:#fc0;transform: skewX(-30deg);width:6px;height:25px;margin-right:10px"></div>
                <div>{{matchlist.startTime}}</div>
            </div>
            <ul>
                <li style="padding:2px" :style="{'background-color':index%2==0?'#fff':'#f7f7f7'}" v-for="(item,index) in matchlist.matchlist" :key="item.id">
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
    .title{
        height: 60px;
        display: flex;
        align-items: center;
    }
</style>