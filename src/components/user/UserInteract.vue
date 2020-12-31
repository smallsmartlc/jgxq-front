<template>
<div style="padding-right:20px">
  <div class="main">
    <div class="mask_bg" :style="{'background-image':'url('+$utils.url2img(user.userInfo.headImage)+')'}"></div>
    <div class="info">
      <el-avatar :size="80" 
        :src="$utils.url2img(user.userInfo.headImage)" 
        fit="cover"
        style="border:4px solid #fc0;background:transparent;"></el-avatar>
      <div style="display:flex;align-items:center">
        <div style="color:#fff;font-size:20px">{{user.userInfo.nickName}}&nbsp;</div>
        <el-image style="width:20px;height:20px;"
          :src="$utils.url2img(user.userInfo.homeTeam.logo)"
          fit="cover"/>
      </div>
      <div style="color:#CCCBC0;font-size:12px">{{user.userInfo.homeTeam.name}}球迷</div>
      <div style="color:#fff;font-size:12px">{{user.userInfo.city}}&nbsp;注册经管雄起账号<span style="color:#fc0">{{parseInt((new Date() - new Date(user.userInfo.createAt))/(1*24*60*60*1000))}}</span>天</div>
    </div>
  </div>
  <el-menu :default-active="this.$route.path" mode="horizontal" style="background-color:transparent" router>
    <el-menu-item index="/center/interact/issue">发表{{user.talks}}</el-menu-item>
    <el-menu-item index="/center/interact/comment">评论{{user.comments}}</el-menu-item>
    <el-menu-item index="/center/interact/focus">关注{{user.focus}}</el-menu-item>
    <el-menu-item index="/center/interact/fans">粉丝{{user.fans}}</el-menu-item>
  </el-menu>
  <router-view :user="user.userInfo"></router-view>
</div>
    
</template>

<script>

export default {
  name: 'UserInteract',
  data () {
    return {
      user : {
        "userInfo": {
            "userkey": "SmArTkEy",
            "nickName": "小聪明",
            "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg",
            "city": "贵州 安顺",
            "createAt": "2020-12-13T13:19:07.000+00:00",
            "homeTeam": {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            }
        },
        "talks": 2,
        "comments": 7,
        "focus": 1,
        "fans": 0,
        "msg": null
      },
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-item.is-active{
  background-color: transparent !important;
}
.el-menu-item:hover{
  background-color: transparent !important;
}
.main{
  height: 200px;
  position: relative;
}
.mask_bg{
  border: 1px solid #000;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 50%;
  z-index: 0;
  filter: blur(4px);
  position: absolute;
  width: 100%;
  height: 100%;
}
.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>