<template>
  <el-row>
      <el-col :span="14" :offset="2">
        <div style="width:720px">
            <div class="matchTitle" v-if="match.id">
                <router-link v-if="match.homeTeam" :to="`/team/${match.homeTeam.id}`">
                <div>
                    <el-image style="width:60px;height:60px"
                    :src="$utils.url2img(match.homeTeam.logo)"
                    fit="cover"/>
                    <div style="text-align:center">{{match.homeTeam.name}}</div>
                </div>
                </router-link>
                <div style="text-align:center;margin:0 20px" :style="{'color':(dateDiff(match.startTime)>0&&dateDiff(match.startTime)<(120*60*1000))?'#fc0':'#fff'}">
                    <div>{{this.$moment(match.startTime).format('MM-DD HH:mm')}}&nbsp;{{match.title}}</div>
                    <div style="font-size:30px">{{match.homeScore}}&nbsp;-&nbsp;{{match.visitingScore}}</div>
                    <div v-if="match.link" style="width:100%">
                        <a :href="match.link">
                            <el-button class="button" type="primary" icon="el-icon-caret-right">视频地址</el-button>
                        </a>
                    </div>
                    <div v-else>
                        <div v-if="dateDiff(match.startTime)>(120*60*1000)">已结束</div>
                        <div v-else-if="dateDiff(match.startTime)>0">进行中</div>
                        <div v-else>未开始</div>
                    </div>
                </div>
                <router-link v-if="match.visitingTeam" :to="`/team/${match.visitingTeam.id}`">
                <div>
                    <el-image style="width:60px;height:60px"
                    :src="$utils.url2img(match.visitingTeam.logo)"
                    fit="cover"/>
                    <div style="text-align:center">{{match.visitingTeam.name}}</div>
                </div></router-link>
            </div>
            <el-tabs v-model="activeName" type="card" style="background-color:#fff">
                <el-tab-pane label="赛况" name="first" style="padding:10px">
                    <div style="height:30px;line-height:30px;font-size:20px">战报</div>
                    <el-divider/>
                    <div>
                        <div v-if="match.matchNews" style="padding:10px">
                        <router-link :to="'/news/'+match.matchNews.id">
                        <news-l-box :news='match.matchNews'  imgSize="80px" width="500px" />
                        </router-link>
                        </div>
                        <div v-else style="height:100px;line-height:100px;text-align:center">暂无战报</div>
                    </div>
                    <div style="height:30px;line-height:30px;font-size:20px">事件</div>
                    <el-divider/>
                    <div></div>
                    <div class="action">
                        <div class="action-wrap" v-if="match.actions">
                            <div class="content flex-center">
                                <div class="line-wrapper flex-center">
                                    <i class="el-icon-time" style="color:#fc0;font-size:20px;margin:4px"></i>
                                    <div class="dot"></div>
                                    <div class="line"></div>
                                    <div v-for="(item,index) in match.actions" class="action-item" :key="index">
                                        <div v-if="item.infoList.filter((e)=>e.home).length" class="float-wrapper">
                                            <div class="action-list float-left">
                                                <div v-for="(home,index) in item.infoList.filter((e)=>e.home)" class="action-detail align-right" :data-id="home.playerId" @click="toPlayerDetail" :key="index">
                                                    <div class="icon"><i :class="actionType[home.type].icon" :style="{'color':actionType[home.type].color}" ></i></div>
                                                    <div class="playerName">{{home.name}}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex-center">
                                            <div class="time-box">{{item.time}}</div>
                                            <div class="line"></div>
                                        </div>
                                        <div v-if="item.infoList.filter((e)=>!e.home).length" class="float-wrapper">
                                            <div class="action-list float-right">
                                                <div v-for="(visit,index) in item.infoList.filter((e)=>!e.home)" class="action-detail" :data-id="visit.playerId" @click="toPlayerDetail" :key="index">
                                                    <div class="icon"><i :class="actionType[visit.type].icon" :style="{'color':actionType[visit.type].color}" ></i></div>
                                                    <div class="playerName">{{visit.name}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dot"></div>
                                </div>
                                <i class="iconfont icon-koushao" style="color:#fc0;font-size:20px;"></i>
                            </div>
                        </div>
                        <div v-else style="height:100px;line-height:100px;text-align:center">暂无事件</div>
                        <el-divider/>
                        <div class="description">
                            <div v-for="type in actionType" :key="type.name">
                                <i :class="type.icon" :style="{'color':type.color}"></i>{{type.name}}
                            </div>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="阵容" name="second">
                    <match-fomation v-if="match.matchInfo" :matchInfo="match.matchInfo"/>
                    <div v-else style="height:100px;line-height:100px;text-align:center">暂无阵容信息</div>
                </el-tab-pane>
            </el-tabs>
        </div>
      </el-col>
      <el-col :span="6" :offset="2" class = "hidden-md-and-down">
        <match-right/>
      </el-col>
  </el-row>
</template>

<script>
import {getMatchById} from '@/api/match'
import NewsLBox from '../common/NewsLBox'
import MatchFomation from './MatchFomation.vue'
import MatchRight from './MatchRight.vue'

export default {
    components: { MatchFomation,MatchRight, NewsLBox },
    mounted() {
        this.getMatchById();
    },
    data() {
        return {
            trueVal : true,
            activeName: 'first',
            actionType:[
                {
                    name : "进球",
                    color:"#000",
                    icon : "iconfont icon-zuqiu",
                },
                {
                    name : "点球",
                    color:"#fc0",
                    icon : "iconfont icon-zuqiu",
                },
                {
                    name : "点球不进",
                    color:"#FF0000",
                    icon : "iconfont icon-zuqiu",
                },
                {
                    name : "乌龙球",
                    color:"#FF00FF",
                    icon : "iconfont icon-zuqiu",
                },
                {
                    name : "助攻",
                    color:"#666",
                    icon : "iconfont icon-zhugong",
                },
                {
                    name : "红牌",
                    color:"#ea3443",
                    icon : "iconfont icon-red-card",
                },
                {
                    name : "黄牌",
                    color:"#fc0",
                    icon : "iconfont icon-red-card",
                },
                {
                    name : "换上",
                    color:"#fc0",
                    icon : "iconfont icon-shang",
                },
                {
                    name : "换下",
                    color:"#ea3443",
                    icon : "iconfont icon-xia",
                },
            ],
            match : {},

        }
    },
    methods: {
        getMatchById(){
            getMatchById(this.$route.params.id).then((res)=>{
                if(res.code == 200){
                    this.match = res.data;
                }
            })
        },
        toPlayerDetail(e){
            let id = e.currentTarget.dataset.id;
            if(!id) return;
            this.$router.push(`/player/${id}`);
        },
    },
    computed: {
        dateDiff(){
            return function(timeStr){
               var time = new Date(timeStr)
                return new Date()-time; 
            }
        },
        isHome(){
            return (bool)=> {
                if(bool){
                    return "主队"
                }else{
                    return "客队"
                }
            }
        }
    },
}
</script>

<style scoped>

.description{
    display: flex;
    justify-content: space-around;
    margin:20px 0;
}
.button{
    width:100px;
    height:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin: 0 auto;
}
.matchTitle{
    background:  url("../../assets/match-bg.jpg") no-repeat;
    background-size: cover;
    height: 173px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.action-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 2px solid #f7f7f7;
}

.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    margin: 0 20px;
}

.content {
    width: 40px;
}

.line-wrapper {
    margin : 8px 0;
}

.line {
    height: 100%;
    min-height: 40px;
    width: 3px;
    background-color: #fc0;
}

.dot {
    min-width: 10px;
    min-height: 10px;
    border-radius: 50%;
    background-color: #fc0;
}

.action-item {
    display: flex;
    justify-content: center;
}

.time-box {
    font-size: 10px;
    color: #fff;
    background-color: #fc0;
    border-radius: 50%;
    min-height: 20px;
    min-width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.float-wrapper {
    width: 0;
}

.float-right {
    align-items : flex-start;
}

.float-left {
    margin-left: -150px;
    align-items : flex-end;
}

.action-list {
    width: 150px;
    padding: 20px;
    border: 2px solid #f2f2f2;
    border-radius: 4px;
    margin-bottom: 16px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
.action-detail{
    display: flex;
    width: auto;
    margin: 2px 0;
    cursor: pointer;
}
.align-right{
    flex-direction: row-reverse;
}
.icon{
    width: 28px;
    height: 28px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.playerName{
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>