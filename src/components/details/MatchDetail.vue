<template>
  <el-row>
      <el-col :span="14" :offset="2">
        <div>
            <div class="matchTitle">
                <div>
                    <el-image style="width:60px;height:60px"
                    :src="'http://localhost:6800/images/'+match.homeTeam.logo"
                    fit="cover"/>
                    <div style="text-align:center">{{match.homeTeam.name}}</div>
                </div>
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
                <div>
                    <el-image style="width:60px;height:60px"
                    :src="'http://localhost:6800/images/'+match.visitingTeam.logo"
                    fit="cover"/>
                    <div style="text-align:center">{{match.visitingTeam.name}}</div>
                </div>
            </div>
            <el-tabs v-model="activeName" type="card" style="background-color:#fff">
                <el-tab-pane label="赛况" name="first" style="padding:10px">
                    <div style="height:30px;line-height:30px;font-size:20px">战报</div>
                    <el-divider/>
                    <div>
                        <div v-if="match.matchNews" style="padding:10px">
                        <router-link replace :to="'/news/'+match.matchNews.id">
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
import NewsLBox from '../common/NewsLBox'
import MatchFomation from './MatchFomation.vue'
import MatchRight from './MatchRight.vue'

export default {
    components: { MatchFomation,MatchRight, NewsLBox },
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
            match : {
                "id": 5,
                "title": "友谊赛",
                "homeTeam": {
                    "id": 1,
                    "name": "重邮经管",
                    "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
                },
                "visitingTeam": {
                    "id": 5,
                    "name": "经管名宿队",
                    "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
                },
                "startTime": "2020-12-27T04:00:00.000+00:00",
                "matchNews": {
                    "id": 1,
                    "title": "我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻",
                    "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                    "comments": null
                },
                "matchInfo": {
                    "homeLineUp": [
                        {
                            "playerId": 4,
                            "matchPos": 0,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 1,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 1,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 1,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 1,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 2,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 2,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 3,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 3,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 3,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 4,
                            "name": "胡杰洋",
                            "number": 0
                        }
                    ],
                    "homeSubstitute": [
                        {
                            "playerId": 4,
                            "matchPos": 0,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 1,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 2,
                            "name": "胡杰洋",
                            "number": 0
                        },
                        {
                            "playerId": 4,
                            "matchPos": 3,
                            "name": "胡杰洋",
                            "number": 0
                        }
                    ],
                    "visitingLineUp": [
                        {
                            "playerId": 0,
                            "matchPos": 0,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 1,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 1,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 1,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 1,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 3,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 3,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 3,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 3,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 3,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 0,
                            "matchPos": 4,
                            "name": "胡戈汉",
                            "number": 10
                        }
                    ],
                    "visitingSubstitute": [
                        {
                            "playerId": 1,
                            "matchPos": 1,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 1,
                            "matchPos": 2,
                            "name": "胡戈汉",
                            "number": 10
                        },
                        {
                            "playerId": 1,
                            "matchPos": 3,
                            "name": "胡戈汉",
                            "number": 10
                        }
                    ]
                },
                "link": "https://space.bilibili.com/383597807?from=search&seid=17263830448621825025",
                "actions": [
                    {
                        "time": "15",
                        "infoList": [
                            {
                                "home": false,
                                "type": 3,
                                "playerId": 0,
                                "name": "胡戈汉"
                            },
                            {
                                "home": true,
                                "type": 4,
                                "playerId": 0,
                                "name": "胡杰洋"
                            }
                        ]
                    },
                    {
                        "time": "47",
                        "infoList": [
                            {
                                "home": true,
                                "type": 6,
                                "playerId": 0,
                                "name": "胡杰洋"
                            }
                        ]
                    },
                    {
                        "time": "15",
                        "infoList": [
                            {
                                "home": false,
                                "type": 3,
                                "playerId": 0,
                                "name": "胡戈汉"
                            },
                            {
                                "home": true,
                                "type": 4,
                                "playerId": 0,
                                "name": "胡杰洋"
                            }
                        ]
                    },
                    {
                        "time": "47",
                        "infoList": [
                            {
                                "home": true,
                                "type": 6,
                                "playerId": 0,
                                "name": "胡杰洋"
                            }
                        ]
                    },
                    {
                        "time": "15",
                        "infoList": [
                            {
                                "home": false,
                                "type": 3,
                                "playerId": 0,
                                "name": "胡戈汉"
                            },
                            {
                                "home": true,
                                "type": 4,
                                "playerId": 0,
                                "name": "胡杰洋"
                            }
                        ]
                    },
                    {
                        "time": "47",
                        "infoList": [
                            {
                                "home": true,
                                "type": 6,
                                "playerId": 0,
                                "name": "胡杰洋"
                            }
                        ]
                    }
                ],
                "homeScore": 0,
                "visitingScore": 0
            },

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