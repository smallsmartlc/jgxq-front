<template>
<div class="userInfo" v-if="user.userInfo" style="padding:20px">
  <div style="font-size:30px">个人资料</div>
  <el-divider style="margin:20px" content-position="left"><span style="font-size:20px">个人信息</span></el-divider>
  <div class="info_row">
    <div style="margin-right:20px">
      <el-avatar :size="80" 
      :src="$utils.url2img(user.userInfo.headImage)" 
      fit="cover"
      style="border:4px solid #fc0;background:transparent;"
      ></el-avatar>
    </div>
    <el-link type="primary" :underline="false">更换头像</el-link>
  </div>
  <div class="info_row">
    <div>姓名：</div>
    <div>{{user.userInfo.nickName}}</div>
    <el-link type="primary" :underline="false">修改</el-link>
  </div>
  <div class="info_row">
    <div>城市：</div>
    <div>{{user.userInfo.city}}</div>
    <el-link type="primary" :underline="false">修改</el-link>
  </div>
  <div class="info_row" style="display:flex;align-items:center">
    <div class="divitem">主队：</div>
    <div class="divitem" style="display:flex;align-items:center" v-if="user.userInfo.homeTeam">
      <div>
        <div><el-image
        style="width: 50px; height: 50px;padding:10px"
        :src="$utils.url2img(user.userInfo.homeTeam.logo)"
        fit="cover"></el-image></div>
        <div style="text-align:center">{{user.userInfo.homeTeam.name}}</div>
      </div>
      <div><el-link type="primary" :underline="false" @click="dialogVisible=true">更改主队</el-link></div>
    </div>
    <div v-else>未设置主队<el-link type="primary" :underline="false"  @click="dialogVisible=true">点我设置</el-link></div>
    <team-update @close="close" :dialogVisible = "dialogVisible"/>
  </div>
  <el-divider style="margin:20px" content-position="left"><span style="font-size:20px">账户信息</span></el-divider>
  <div class="info_row">
    <el-link type="primary" :underline="false">更改密码</el-link>
  </div>
</div>
    
</template>

<script>
import TeamUpdate from '../common/TeamUpdate.vue'
export default {
  components: { TeamUpdate },
  name: 'UserInfo',
  data () {
    return {
      dialogVisible : false,

    }
  },
  methods:{
    close(){
      this.dialogVisible = false;
    }
  },
  props : {
    user:Object,
  },
  computed : {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info_row{
  display: flex;
}
</style>
<style>
.userInfo .el-divider{
  margin : 40px 0;
}
.info_row{
  margin : 10px
}

</style>