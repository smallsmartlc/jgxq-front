<template>
<div v-if="user.userInfo" class="userInteract" style="padding-right:20px;">
  <div class="Interactmain">
    <div class="mask_bg" :style="{'background-image':'url('+$utils.url2img(user.userInfo.headImage)+')'}"></div>
    <div class="info">
      <router-link :to="'/center/info'">
      <el-avatar :size="80" 
        :src="$utils.url2img(user.userInfo.headImage)" 
        fit="cover"
        style="border:4px solid #fc0;background:transparent;"></el-avatar></router-link>
      <div style="display:flex;align-items:center">
        <div style="color:#fff;font-size:20px">{{user.userInfo.nickName}}&nbsp;</div>
        <el-image v-if="user.userInfo.homeTeam" style="width:20px;height:20px;"
          :src="$utils.url2img(user.userInfo.homeTeam.logo)"
          fit="cover"/>
      </div>
      <div v-if="user.userInfo.homeTeam" style="color:#CCCBC0;font-size:12px">{{user.userInfo.homeTeam.name}}球迷</div>
      <div style="color:#fff;font-size:12px">{{user.userInfo.city}}&nbsp;注册经管雄起账号<span style="color:#fc0">{{parseInt((new Date() - new Date(user.userInfo.createAt))/(1*24*60*60*1000))}}</span>天</div>
    </div>
  </div>
  <div style="background-color:#fff;padding-left:20px">
    <el-tabs :value="defaultActive">
      <el-tab-pane :label="`发表${user.talks}`" name="issue"><center-issue :user="user.userInfo"/></el-tab-pane>
      <el-tab-pane :label="`评论${user.comments}`" name="comment"><center-comment :user="user.userInfo"/></el-tab-pane>
      <el-tab-pane :label="`关注${user.focus}`" name="focus"><center-focus :user="user.userInfo"/></el-tab-pane>
      <el-tab-pane :label="`粉丝${user.fans}`" name="fans"><center-fans :user="user.userInfo"/></el-tab-pane>
    </el-tabs>
  </div>
</div>
    
</template>

<script>
import CenterComment from '@/components/user/CenterComment'
import CenterIssue from '@/components/user/CenterIssue'
import CenterFocus from '@/components/user/CenterFocus'
import CenterFans from '@/components/user/CenterFans'
export default {
  components: { CenterComment,CenterIssue,CenterFocus,CenterFans },
  name: 'UserInteract',
  props:{
    user : Object
  },
  data () {
    return {
    }
  },
  computed:{
    defaultActive(){
      var flag = this.$route.params.info;
      return flag?flag:'issue';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tabs__item{
  display: block!important;
}
.el-menu-item.is-active{
  background-color: transparent !important;
}
.el-menu-item:hover{
  background-color: transparent !important;
}
.Interactmain{
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

<style>
.userInteract .el-tabs__nav{  
  height:60px;
  display: flex;
}
.userInteract .el-tabs__item{
  font-size: 16px;
  text-align: center;
  line-height: 60px;
}
</style>