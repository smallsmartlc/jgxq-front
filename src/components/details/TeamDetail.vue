<template>
  <el-row>
      <el-col :span="14" :offset="2">
        <div v-if="team">
            <div class="title">
                <div class="img">
                    <el-image
                    style="width: 150px; height: 150px"
                    :src="$utils.url2img(team.logo)"
                    fit="contain"></el-image>
                </div> 
                <div class="info">
                    <p class="cn_name">
                        {{team.name}}
                    </p>
                    <p class="en_name">{{team.enName}}</p>
                    <div class="detail_info">
                        <div style="display:flex;flex-wrap:wrap">
                            <div style="display:flex;margin:10px;" v-for="(item,index) in team.infos.normal" :key="'normal'+index">
                                <div style="width:80px;color:#666">{{item.name}}：</div>
                                <div style="white-space:nowrap;">{{item.value}}</div>
                            </div>
                            <div style="display:flex;margin:10px;" v-for="(item,index) in team.infos.contact" :key="'contact'+index">
                                <div style="width:80px;color:#666">{{item.name}}：</div>
                                <div style="white-space:nowrap;">{{item.value}}</div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
            <div class="means">
                <team-match/>
            </div>
            <div class="champion">
                <diamond-title style="margin-bottom:20px" dname="荣誉"/>
                <div class="championbox" v-for="(item,index) in team.infos.champions" :key="index">
                    <div style="color:#fc0;"><i class="el-icon-trophy-1" style="font-size:30px"/></div>
                    <div style="color:#fc0;">{{item.name}}×{{item.time.length}}</div>
                    <div style="display:flex;flex-wrap:wrap;font-size:14px">
                        <div v-for="time in item.time" :key="time">{{time}}</div>
                    </div>
                </div>
            </div>
            <div class="news">
                <diamond-title style="margin:20px 0" dname="相关新闻"/>
                <div style="padding:5px;background-color: #fff;">
                    <div v-for="item in news" :key="item.id">
                        <router-link :to="'/news/'+item.id">
                        <news-box :news='item' width='600px' imgSize="80px" style="width:100%;height:100px"></news-box>
                        </router-link>
                    </div>
                    <div class="loadmore">
                        <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="loadNews">
                            <span v-if="loading"><i class="el-icon-loading"></i>加载中</span>
                            <span v-else >点击加载更多<i class="el-icon-arrow-down"/></span></el-link>
                        <div v-else style="color:#fc0;text-align:center">没有更多了</div>
                    </div>
                </div>
            </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="2" class = "hidden-md-and-down">
        <div class="relative">
            <div style="border-left:5px solid #fc0;padding-left:10px;">相关队员</div>
            <div v-for="item in playerList" :key="item.id" style="font-size:14px">
                <div style="background-color:#f7f7f7;padding:5px;color:#666;">{{item.name}}</div>
                <div v-for="player in item.playerList" :key="player.id">
                    <a :href="`/player/${player.id}`"><div style="padding:5px;display:flex;background-color:#fff;justify-content:space-between;align-items:center">
                        <div style="display:flex;align-items:center"><el-avatar :size="25" 
                                :src="$utils.url2img(player.headImage)" 
                                fit="cover"
                                shape = "square"
                                style="background:#fff;margin-right:10px"
                                ></el-avatar>
                            <div>{{player.name}}</div>        
                        </div>
                        <div style="color:#666;font-size:12px">{{player.number}}号·{{player.nation}}</div>
                    </div></a>
                </div>
            </div>
        </div>
      </el-col>
  </el-row>
</template>

<script>
import {getTeamById} from '@/api/team'
import {getTeamMembers} from '@/api/player'
import {pageNewsByTag} from '@/api/news'
import DiamondTitle from '../common/DiamondTitle.vue';
import NewsBox from '../common/NewsBox.vue';
import TeamMatch from './TeamMatch.vue';

export default {
  components: { DiamondTitle, NewsBox, TeamMatch },
    mounted() {
        this.getTeamById();
        this.loadPlayers();
        this.loadNews();
    },
    data() {
        return {
            team : null,
            news : [],
            playerList : [],
            cur: 0,
            pageSize:10,
            total:1,
            loading: false,
        }
    },
    methods: {
        getTeamById(){
            getTeamById(this.$route.params.id).then((res)=>{
                if(res.code == 200){
                    this.team = res.data;
                }
            })
        },
        loadNews(){
            if(this.disabled) return;
            this.loading = true
            this.cur ++;
            pageNewsByTag(this.cur,this.pageSize,this.$route.params.id,0).then((res)=>{
                if(res.code == 200){
                var temp = res.data.records;
                this.total = res.data.total
                this.news = this.news.concat(temp);
                }else this.cur--;
            })
            this.loading = false;
        },
        loadPlayers(){
            getTeamMembers(this.$route.params.id).then((res)=>{
                if(res.code==200){
                    this.playerList = res.data;
                }
            }) 
        },
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
.title{
    padding: 30px;
    background-color: #F5F5EB;
    display: flex;
}
.cn_name{
    font-size: 24px;
    display: inline-flex;
    align-items: center;
}
.cn_name img{
    height: 25px;
    width: 25px;
    margin-left: 10px;
}
.en_name{
    font-size: 16px;
    color:#999890;
}
.detail_info{
    display: flex;
    font-size: 14px;
    margin-top: 20px;
    flex-wrap : wrap
}
.means {
    margin-top: 40px;
}
.relative{
    background-color: #F5F5EB;
    padding: 10px 0;
}
.championbox{
    display:flex;
    align-items:center;
    min-height:40px;
    background-color:#fff
}
.championbox div{
    margin: 0 5px;
}
</style>