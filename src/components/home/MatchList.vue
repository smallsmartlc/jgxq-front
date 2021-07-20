<template>
  <el-scrollbar style="height:100%;">
    <div class="dynamic infinite-list-wrapper" style="height:100%;width:100%;">
      <ul
      class="list"
      v-infinite-scroll="load"  
      infinite-scroll-disabled="disabled">
      <li v-for="matchlist in matchGroup(matches)" :key="matchlist.startTime">
        <div style="background-color:#f7f7f7;text-align:center;font-size:12px">
            <span v-if="getNear(matchlist.startTime)">{{getNear(matchlist.startTime)}}&nbsp;</span>{{matchlist.startTime}}
        </div>
        <ul>
            <li style="padding:2px" v-for="item in matchlist.matchlist" :key="item.id">
                <router-link :to="'/match/'+item.id">
                <match-box-basic :match="item"  style="width:100%;height:60px" ></match-box-basic>
                </router-link>
            </li>
        </ul>
      </li>
      </ul>
      <p v-if="loading"><page-loading/></p>
      <p v-if="noMore"><no-more text="最近没有比赛"/></p>
    </div>
  </el-scrollbar>
</template>

<script>
import {pageMatches} from '@/api/match'
import MatchBoxBasic from '../common/MatchBoxBasic.vue';
import PageLoading from '../common/PageLoading.vue';
import NoMore from '../common/NoMore.vue';
export default {
    components : {MatchBoxBasic,PageLoading,NoMore},
    mounted() {
        this.load();
    },
    data() {
        return {
          cur: 0,
          pageSize:10,
          total:1,
          loading: false,
          matches:[],
        }
    },
    props : {
        homeTeam : Object,
    },
    computed: {
      noMore () {
        return this.matches.length >= this.total;
      },
      disabled () {
        return this.loading || this.noMore
      },
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
      },
      getNear(){
          return (time)=>{
              var now = this.$moment().startOf('day');
              var target = this.$moment(time,'yyyy-MM-DD 周dd');
              var daydiff = now.diff(target,'day');
              if(daydiff==1) return '昨天';
              if(daydiff==0) return '今天';
              if(daydiff==-1) return '明天';
              return null;
          }
      },
    },
    methods: {
      load () {
        this.loading = true
        this.cur++;
        pageMatches({pageNum:this.cur,pageSize:this.pageSize,"teamId":this.homeTeam.id,start : this.$moment(new Date - (1000*60*60*24*7)).format("YYYY/MM/DD HH:mm:ss")})
        .then((res)=>{
            if(res.code == 200){
                var temp = res.data.records;
                this.total = res.data.total;
                this.matches = this.matches.concat(temp);
            }else{this.cur--;}
        })
        this.loading = false
      }
    }
}
</script>

<style>

</style>