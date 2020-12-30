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
                <router-link replace :to="'/match/'+item.id">
                <match-box-basic :match="item"  style="width:100%;height:60px" ></match-box-basic>
                </router-link>
            </li>
        </ul>
      </li>
      </ul>
      <p v-if="loading"><page-loading/></p>
      <p v-if="noMore"><no-more/></p>
    </div>
  </el-scrollbar>
</template>

<script>
import MatchBoxBasic from '../common/MatchBoxBasic.vue';
import PageLoading from '../common/PageLoading.vue';
import NoMore from '../common/NoMore.vue';
export default {
    components : {MatchBoxBasic,PageLoading,NoMore},
    data() {
        return {
          count: 2,
          loading: false,
          matches:[{
              "id": 6,
              "title": "邮超联赛38轮",
              "homeTeam": {
                  "id": 1,
                  "name": "重邮经管足球队",
                  "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
              },
              "homeScore": 3,
              "visitingTeam": {
                  "id": 5,
                  "name": "莫斯科中央陆军",
                  "logo": "images/jgxq/headimg/2cbb204cfc7e40178f81931859510c07.jpg"
              },
              "visitingScore": 99,
              "startTime": "2020-12-24T12:00:00.000+00:00",
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
              "homeScore": 1,
              "visitingTeam": {
                  "id": 5,
                  "name": "好球队",
                  "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
              },
              "visitingScore": 0,
              "startTime": "2020-12-23T04:00:09.000+00:00",
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
              "homeScore": 3,
              "visitingTeam": {
                  "id": 5,
                  "name": "拜仁慕尼黑",
                  "logo": "images/jgxq/headimg/2cbb204cfc7e40178f81931859510c07.jpg"
              },
              "visitingScore": 99,
              "startTime": "2020-12-24T14:00:00.000+00:00",
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
              "homeScore": 1,
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
              "homeScore": 3,
              "visitingTeam": {
                  "id": 5,
                  "name": "拜仁慕尼黑",
                  "logo": "images/jgxq/headimg/2cbb204cfc7e40178f81931859510c07.jpg"
              },
              "visitingScore": 99,
              "startTime": "2020-12-22T12:00:00.000+00:00",
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
              "homeScore": 1,
              "visitingTeam": {
                  "id": 5,
                  "name": "好球队",
                  "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
              },
              "visitingScore": 0,
              "startTime": "2020-12-12T04:00:09.000+00:00",
              "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025"
          }],
        }
    },
    props : {
    },
    computed: {
      noMore () {
        return this.count>= 10
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
        setTimeout(() => {
          this.count += 2
          //TODO 无限滚动逻辑
          
          this.loading = false
        }, 2000)
      }
    }
}
</script>

<style>

</style>