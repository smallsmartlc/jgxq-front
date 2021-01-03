<template>
  <el-row>
      <el-col :span="14" :offset="2">
        <div>
            <div class="matchTitle" v-if="match.id">
                <router-link :to="`/team/${match.homeTeam.id}`">
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
                <router-link :to="`/team/${match.visitingTeam.id}`">
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
                        <div v-if="match.actions">
                            <div v-for="(action,index) in match.actions" :key="index">
                                <div v-for="(item,index) in action.infoList" :key="index">
                                    <div class="action_box">
                                        <div>{{action.time}}′</div>
                                        <div>{{isHome(item.home)}}</div>
                                        <div>{{item.name}}</div>
                                        <i :class="actionType[item.type].icon" :style="{'color':actionType[item.type].color}"></i>
                                    </div>
                                </div>
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
                    icon : "el-icon-top",
                },
                {
                    name : "换下",
                    color:"#ea3443",
                    icon : "el-icon-bottom",
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
        }
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
.action_box{
    display: flex;
    font-size: 18px;
    line-height:40px
}
.action_box div{
    margin-left: 10px;
}

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

</style>