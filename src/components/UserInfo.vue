<template>
    <div v-if="user.userInfo" class="userInfoBox">
        <div class="title">
            <router-link to="/center/info">
                <el-avatar :size="90" 
                    :src="$utils.url2img(user.userInfo.headImage)" 
                    fit="cover"
                    style="border:4px solid #fc0;background:transparent;"
                    ></el-avatar>
                <div class="nick-name">
                    <span style="color:#fc0">{{user.userInfo.nickName}}</span><el-image v-if="user.userInfo.homeTeam"
                    style="max-width: 24px; max-height: 24px;vertical-align :text-bottom;"
                    :src="$utils.url2img(user.userInfo.homeTeam.logo)"
                    fit="fill"> <div slot="error"></div></el-image>
                </div>
            </router-link>
                <span style="color:#999; font-size:12px;">已注册经管雄起账号{{parseInt((new Date() - new Date(user.userInfo.createAt))/(1*24*60*60*1000))}}天</span>    
            <el-divider></el-divider>
        </div>
        <div class="info">
            <div style="display:flex">
                <router-link to="/center/interact/issue">
                    <div class="info-num">
                        <div>{{user.talks}}</div>
                        <div class = "description">发表</div>
                    </div>
                </router-link>
                <router-link to="/center/interact/comment">
                    <div class="info-num">
                        <div>{{user.comments}}</div>
                        <div class = "description">评论</div>
                    </div>
                </router-link>
                <router-link to="/center/interact/focus">
                    <div class="info-num">
                        <div>{{user.focus}}</div>
                        <div class = "description">关注</div>
                    </div>
                </router-link>
                <router-link to="/center/interact/fans">
                    <div class="info-num">
                        <div>{{user.fans}}</div>
                        <div class = "description">粉丝</div>
                    </div>
                </router-link>
            </div>
            <el-divider></el-divider>
            <div>
                <router-link to="/center/message">
                <el-dropdown-item >
                    <el-badge :is-dot="message" style="display:inline" class="icon_box">
                        <i class="el-icon-chat-line-round"></i>
                    </el-badge>
                    <span>消息</span>
                </el-dropdown-item>
                </router-link>
                <router-link to="/center/collect">
                <el-dropdown-item>
                    <span><i class="el-icon-star-off"></i>我的收藏</span>
                </el-dropdown-item>
                </router-link>
                <router-link to="/center/info" >
                <el-dropdown-item>
                    <span><i class="el-icon-user"></i>个人资料</span>
                </el-dropdown-item>
                </router-link>
                <router-link to="/center/author" >
                <el-dropdown-item>
                    <span><i class="el-icon-edit"></i>创作中心</span>
                </el-dropdown-item>
                </router-link>
                <el-dropdown-item  @click.native="logOut()">
                    <span><i class="el-icon-back"></i>退出登陆</span>
                </el-dropdown-item>
                <!-- 使用submenu方式实现 -->
                <!-- 
                <el-menu-item index="/center/message" class="drop-down-route">
                    <el-badge :is-dot="message" style="display:inline">
                        <i class="el-icon-chat-line-round"></i>
                    </el-badge>
                    <span slot="title">消息</span>
                </el-menu-item>
                <el-menu-item index="/center/collect" class="drop-down-route">
                    <i class="el-icon-star-off"></i>
                    <span slot="title">我的收藏</span>
                </el-menu-item>
                <el-menu-item index="/center/info"  class="drop-down-route">
                    <i class="el-icon-user"></i>
                    <span slot="title">个人资料</span>
                </el-menu-item>
                <el-menu-item index="/center/author"  class="drop-down-route">
                    <i class="el-icon-edit"></i>
                    <span slot="title">创作中心</span>
                </el-menu-item> -->
            </div>
        </div>
        <div class=""></div>
    </div>
</template>
<script>
import {getUserInfo} from '@/api/user'
export default {
    data() {
        return{
            user : {},
        }
    },
    mounted() {
        this.loadingUser();
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        loadingUser(){
            getUserInfo().then((res)=>{
                if(res.code == 200){
                    this.user = res.data;
                }
            })
        },
        logOut(){
            this.$store.commit("setUserInfo",null);
            this.$router.push({ path:'/login'})
        },
    },
    props : {
      message : Boolean
    },
}
</script>
<style scoped>
    .userInfoBox.el-menu-item .drop-down-route{
        color: #000;
    }
    .userInfoBox .el-menu-item.is-active{
        color : #FF9912 !important;
        background-color: #FFFFF0 !important;
    }
    .userInfoBox .drop-down-route:hover{
        color : #FF9912 !important;
        background-color: #FFFFF0!important;
    }
    .info-num .description{
        font-size: 10px;
        color: #999;
        font-weight: normal;
    }

    .info-num{
        min-width: 75px;
        font-size: 20px;
        font-weight: bolder;
    }
    .info-num:hover{
        transition: 0.1s;
        transform: scale(1.1);
    }
    .el-divider--horizontal{
        margin: 12px 0;
    }
    .nick-name{
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
    }
    .title{
        margin-top: 10px;
        text-align: center;
    }
    .userInfoBox{
        display: inline-block;
        min-width: 300px;
        text-align: center;
    }
    span{
        display: inline-block;
    }
</style>
<style>
.icon_box sup{
    right: 10%!important;
    left: 10%!important;
}
</style>