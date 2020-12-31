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
                        <router-link :to="'/match/'+match.id">
                        <match-box :match='match'></match-box>
                        </router-link>
                    </div>
                </div>
                <li  v-for="item in news" :key="item.id">
                    <router-link :to="'/news/'+item.id">
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
                <match-list :homeTeam="homeTeam"></match-list>
            </div>
        </el-tab-pane>
        <el-tab-pane label="球员" name="third">
            <div style="height:300px;">
                <player-list :homeTeam="homeTeam"></player-list>
            </div>
        </el-tab-pane>
        <el-tab-pane label="资料" name="fourth">
            <div style="height:300px;">
                <team-info :homeTeam="homeTeam"></team-info>
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
import {pageNewsByTag} from '@/api/news'
import {homeMatches} from '@/api/match'
export default {
    components: { MatchBox,NewsBox,MatchList,PlayerList,TeamInfo,PageLoading, NoMore,},
    mounted() {
       this.loadMatch(); 
    },
    methods: {
      load () {
        this.loading = true,
        this.cur ++;
        pageNewsByTag(this.cur,this.pageSize,this.homeTeam.id,0).then((res)=>{
            if(res.code == 200){
                var temp = res.data.records;
                this.total = res.data.total
                this.news = this.news.concat(temp);
            }else this.cur--;
        })
        this.loading = false;
      },
      loadMatch(){
          homeMatches(2,this.homeTeam.id).then((res)=>{
              if(res.code==200){
                  this.matches = res.data;
              }
          })
      }
    },
    data() {
        return {
            homeTeam : {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            },
            matches:[],
            news:[],
            total : 1,
            cur: 0,
            pageSize:10,
            loading: false
        }
    },
    computed: {
      noMore () {
        return this.news.length >= this.total
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
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