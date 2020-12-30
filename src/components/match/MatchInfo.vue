<template>
    <div>
        <div class="title">
            <diamond-title dname="比赛信息"/>
            <div class="block">
                <el-date-picker
                v-model="time"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                :editable = "false"
                :clearable = "false"
                @change="log"
                >
                </el-date-picker>
            </div>
        </div>
        <div class="dynamic infinite-list-wrapper">
            <match-group :matches="matches"></match-group>
            <p v-if="loading"><page-loading/></p>
            <p v-if="noMore"><no-more/></p>
        </div>
    </div>
</template>

<script>
import DiamondTitle from '../common/DiamondTitle.vue'
import MatchBoxBasic from '../common/MatchBoxBasic.vue';
import MatchList from '../home/MatchList.vue';
import MatchGroup from './MatchGroup.vue';
export default {
  components: { DiamondTitle, MatchList, MatchGroup, MatchBoxBasic, },
     data() {
      return {
        count: 2,
        loading: false,
        time: new Date(),
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
         matches : [
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
            "startTime": "2020-12-24T04:00:00.000+00:00",
            "link": null
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
            "startTime": "2020-12-12T05:00:09.000+00:00",
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
        ],
      };
    },
    computed: {
      noMore () {
        return this.count>= 10
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
        log(){
            console.log(this.time);
            this.matches.push({
                "id": 56,
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
                })
        },
        load () {
            this.loading = true
            setTimeout(() => {
                     
            //TODO 无限滚动逻辑
            this.loading = false
            }, 2000)
        }
    },
}
</script>

<style scoped>
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>