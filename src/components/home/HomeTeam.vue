<template>
  <div class="home-team-title">
      <div style="height : 60px;display:flex">
        <div class="window">主队</div>
        <div v-if="homeTeam">
            <el-image
            style="width: 50px; height: 50px;margin:5px"
            :src="'http://localhost:6800/images/'+homeTeam.logo"
            fit="cover"></el-image>
        </div>
      </div>
    <el-divider></el-divider> 

      <el-tabs v-if="homeTeam" value="first" :stretch="true">
        <el-tab-pane label="动态" name="first">
            <div class="dynamic infinite-list-wrapper" style="height:300px;">
            <el-scrollbar style="height:100%;">
                <ul
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
                <div class="match-boxes" style =' display:flex;justify-content:space-between;'>
                    <div class="match-box" v-for="match in matches" :key = 'match.id' style="width : 50%; height : 70px;">
                        <router-link replace :to="'/match/'+match.id">
                        <match-box :match='match'></match-box>
                        </router-link>
                    </div>
                </div>
                <li  v-for="item in news" :key="item.id">
                    <router-link replace :to="'/news/'+item.id">
                    <news-box :news='item' :imgSize='"60px"' style="width:100%;height:80px"></news-box>
                    </router-link>
                </li>
                </ul>
                <p v-if="loading"><page-loading/></p>
                <p v-if="noMore"><no-more/></p>
            </el-scrollbar>
            </div>
        </el-tab-pane>
        
        <el-tab-pane label="赛程" name="second">
            <div style="height:300px;">
                <match-list></match-list>
            </div>
        </el-tab-pane>
        <el-tab-pane label="球员" name="third">
            <div style="height:300px;">
                <player-list></player-list>
            </div>
        </el-tab-pane>
        <el-tab-pane label="资料" name="fourth">
            <div style="height:300px;">
                <team-info></team-info>
            </div>
        </el-tab-pane>
      </el-tabs>
      <div v-if="!homeTeam" style="height:300px;text-align:center">
          <span style="display:inline-block;margin-top:120px">
            <div>你还没有设置最爱球队</div>
            <el-button>立即设置</el-button>
          </span>
      </div>
  </div>
</template>

<script>
import MatchBox from '../common/MatchBox.vue'
import NewsBox from '../common/NewsBox.vue'
import NoMore from '../common/NoMore.vue'
import PageLoading from '../common/PageLoading.vue'
import MatchList from './MatchList.vue'
import PlayerList from './PlayerList.vue'
import TeamInfo from './TeamInfo.vue'
export default {
    components: { MatchBox,NewsBox,MatchList,PlayerList,TeamInfo,PageLoading, NoMore,},
    data() {
        return {
            homeTeam : {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            matches:[{
                "id": 6,
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
                "startTime": "2020-12-12T04:00:09.000+00:00",
                "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025"
            }],
            news:[
            {
                "id": 5,
                "title": "19日NBA综述：篮网大胜绿军，湖人逆转险胜太阳",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 4,
                "title": "为了世界杯入场券，这两个国家真的诉诸战争",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 1,
                "title": "我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 1024
            },
            {
                "id": 3,
                "title": "tag修改了!!!!!",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 2,
                "title": "我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            }],
            count: 10,
            loading: false
        }
    },
    computed: {
      noMore () {
        return this.news.length >= 10
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
          var newNews = [
            {
                "id": 6,
                "title": "19日NBA综述：篮网大胜绿军，湖人逆转险胜太阳",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 7,
                "title": "为了世界杯入场券，这两个国家真的诉诸战争",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 8,
                "title": "我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 1024
            },
            {
                "id": 9,
                "title": "tag修改了!!!!!",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 10,
                "title": "我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            }];
          this.news = this.news.concat(newNews)
          this.loading = false
        }, 2000)
      }
    }
}
</script>

<style scoped>
    
    .el-divider{
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }
    .el-tabs__item{
        padding-left: 20px !important;
        padding-right: 20px !important;
    }
    .home-team-title{
        min-width:300px;
        background-color:#fff; 
        box-shadow: 0 0 4px rgba(0, 0, 0, .12);
        border-radius: 2px;
    }
    .window{
        color: #fc0;
        height:60px;
        width: 25%;
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
        vertical-align: top;
        text-align: center;
    }
</style>