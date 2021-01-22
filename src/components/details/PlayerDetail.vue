<template>
  <el-row>
      <el-col :span="14" :offset="2">
        <div v-if="player">
            <div class="title">
                <div class="info">
                    <p class="cn_name">
                        {{player.name}}
                        <router-link v-if="player.team" :to="`/team/${player.team.id}`">
                        <img :src="$utils.url2img(player.team.logo)" alt></router-link>
                    </p>
                    <p class="en_name">{{player.enName}}</p>
                    <div class="detail_info">
                        <ul>
                            <li v-if="player.team"><span>俱乐部：</span>{{player.team.name}}</li>
                            <li><span>国籍：</span>{{player.nation}}</li>
                            <li><span>身高：</span>{{player.height}}CM</li>
                        </ul>
                        <ul>
                            <li><span>位置：</span>{{player.position}}</li>
                            <li v-if="player.birthday"><span>年龄：</span>{{$moment().diff($moment(player.birthday),'year')}}岁</li>
                            <li><span>体重：</span>{{player.weight}}KG</li>
                        </ul>
                        <ul>
                            <li><span>号码：</span>{{player.number}}号</li>
                            <li v-if="player.birthday"><span>生日：</span>{{$moment(player.birthday).format("YYYY-MM-DD")}}</li>
                            <li><span>惯用脚：</span>{{player.strongFoot}}</li>
                        </ul>
                    </div>
                </div>
                <div class="img">
                    <el-image
                    style="width: 150px; height: 150px"
                    :src="$utils.url2img(player.headImage)"
                    fit="contain"></el-image>
                </div>    
            </div>
            <div class="means">
                <diamond-title style="margin-bottom:20px" dname="资料"/>
                <div style="padding:5px;background-color: #F5F5EB;">
                    <div style="border-left:5px solid #fc0;padding-left:10px;">基本资料</div>
                    <div style="display:flex;margin:10px auto;padding-left:40px" v-for="(item,index) in player.infos.normal" :key="index">
                        <div style="width:120px;color:#666">{{item.name}}</div>
                        <div>{{item.value}}</div>
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
import {getPlayerById,getTeamMembers} from '@/api/player'
import {pageNewsByTag} from '@/api/news'
import DiamondTitle from '../common/DiamondTitle.vue';
import NewsBox from '../common/NewsBox.vue';

export default {
  components: { DiamondTitle, NewsBox },
    mounted() {
        this.getPlayerById();
        this.loadNews();
    },
    data() {
        return {
            player : null,
            news : [],
            playerList : [],
            cur: 0,
            pageSize:10,
            total:1,
            loading: false,
        }
    },
    methods: {
        getPlayerById(){
            getPlayerById(this.$route.params.id).then((res)=>{
                if(res.code == 200){
                    this.player = res.data;
                    this.loadPlayers();
                }
            })
        },
        loadNews(){
            if(this.disabled) return;
            this.loading = true
            this.cur ++;
            pageNewsByTag(this.cur,this.pageSize,this.$route.params.id,1).then((res)=>{
                if(res.code == 200){
                var temp = res.data.records;
                this.total = res.data.total
                this.news = this.news.concat(temp);
                }else this.cur--;
            })
            this.loading = false;
        },
        loadPlayers(){
            if(!this.player.team) return;
            getTeamMembers(this.player.team.id).then((res)=>{
                if(res.code==200){
                    this.playerList = res.data;
                }
            }) 
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
.title{
    padding: 30px;
    background-color: #F5F5EB;
    display: flex;
    justify-content: space-between;
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
}
.detail_info ul{
    width: 150px;
}
.detail_info ul li{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 20px;
}
.detail_info ul li span{
    width: 60px;
    text-align: justify;
    text-align-last: justify;
    display: inline-block;
    white-space: nowrap;
}
.means {
    margin-top: 40px;
}
.relative{
    background-color: #F5F5EB;
    padding: 10px 0;
}
</style>