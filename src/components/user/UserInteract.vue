<template>
<div v-if="user.userInfo" class="userInteract" style="padding-right:20px;">
  <div class="Interactmain">
    <div class="mask_bg" :style="{'background-image':'url('+$utils.url2img(user.userInfo.headImage)+')'}">
      <div class="card"></div>
    </div>
    <div class="info_container">
      <div class="info">
        <el-avatar @click.native="showViewer=true" :size="80" 
          :src="$utils.url2img(user.userInfo.headImage)" 
          fit="cover"
          style="border:4px solid #fc0;background:transparent;"></el-avatar>
        <el-image-viewer
            v-if="showViewer"
            :on-close="()=>{showViewer=false}"
            :url-list="[$utils.url2img(user.userInfo.headImage)]" />
        <div v-if="user.userInfo.homeTeam" style="display:flex;align-items:center">
          <div style="color:#fff;font-size:20px">{{user.userInfo.nickName}}&nbsp;</div>
          <el-image v-if="user.userInfo.homeTeam" style="width:20px;height:20px;"
            :src="$utils.url2img(user.userInfo.homeTeam.logo)"
            fit="cover"/>
        </div>
        <div v-if="user.userInfo.homeTeam" style="color:#fff;opacity:0.9;font-size:12px">{{user.userInfo.homeTeam.name}}球迷</div>
        <div style="color:#fff;font-size:12px">{{user.userInfo.city}}&nbsp;注册经管雄起账号<span style="color:#fc0">{{parseInt((new Date() - new Date(user.userInfo.createAt))/(1*24*60*60*1000))}}</span>天</div>
        <div style="margin-top:10px" v-if="notMe">
          <el-button @click="focusOther" :style="user.focused?{}:bStyle" :icon="user.focused?'el-icon-check':'el-icon-plus'">{{user.focused?'已关注':'关注'}}</el-button>
        </div>
      </div>
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
import {focusUser} from '@/api/user'
import CenterComment from '@/components/user/CenterComment'
import CenterIssue from '@/components/user/CenterIssue'
import CenterFocus from '@/components/user/CenterFocus'
import CenterFans from '@/components/user/CenterFans'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  components: { CenterComment,CenterIssue,CenterFocus,CenterFans,ElImageViewer},
  name: 'UserInteract',
  props:{
    user : Object,
    notMe : {
      type : Boolean,
      default : false,
    },
  },
  data () {
    return {
      bStyle : {
          'border-color' : '#fc0',
          'color' : '#fc0'
      },
      showViewer : false,
    }
  },
  computed:{
    defaultActive(){
      var flag = this.$route.params.info;
      return flag?flag:'issue';
    }
  },
  methods:{
    focusOther(){
      focusUser(this.user.userInfo.userkey,this.user.focused).then((res)=>{
        if(res.code == 200){
          if(res.data == true){
              var str = this.user.focused?"取消关注成功":"关注成功!";
              this.$message({
                  message: str,
                  type: 'success'
              });
              this.user.focused = !this.user.focused
          }else{
              var str = this.user.focused?"取消关注失败":"已关注"
              this.$message({
                  message: str,
                  type: 'warning'
              });
          }
        }
      })
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
  background-position: 0 50%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 5px 20px rgba(0,0,0,0.2);
  border-top: 1px solid rgba(255,255,255,0.8);
  border-left: 1px solid rgba(255,255,255,0.8);
}
.mask_bg .card{
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom right,
    rgba(255,255,255,0.6),
    rgba(255,255,255,0.1)
  );
  backdrop-filter:brightness(90%) blur(4px);
}
.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  height: 100%;
  padding:0 20px;
}
.info_container{
  height: 100%;
  display: flex;
  justify-content: center;
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