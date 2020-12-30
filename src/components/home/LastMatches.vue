<template>
<div style="background-color:#fff;">
    <div class="window">近日比赛</div>
    <el-divider></el-divider> 
        <div class="dynamic infinite-list-wrapper" style="width:100%;height:300px;">
            <el-scrollbar style="height:100%;">
            <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
                <li v-for="item in matches" :key="item.id" style="margin : 5px 5px">
                    <router-link replace :to="'/match/'+item.id">
                    <match-box fontSize='14px' imgSize="25px" margin="8px" :match='item' style="width:100%;height:80px"></match-box>
                    </router-link>
                </li>
            </ul>
            <p v-if="loading"><page-loading/></p>
            <p v-if="noMore"><no-more/></p>
    </el-scrollbar>
        </div>
</div>
</template>
<script>
import MatchBox from '../common/MatchBox'
import PageLoading from '../common/PageLoading'
import NoMore from '../common/NoMore'
export default {
    components : {MatchBox,PageLoading,NoMore},
    data() {
        return {
            count: 2,
            loading: false,
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
    ],
        }
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

<style scoped>
    .window{
        color: #fc0;
        height:60px;
        width: 100px;
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
        vertical-align: top;
        text-align: center;
    }
</style>