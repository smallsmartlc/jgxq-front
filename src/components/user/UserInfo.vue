<template>
<div class="userInfo" v-if="user.userInfo" style="padding:20px">
  <div style="font-size:30px">个人资料</div>
  <el-divider style="margin:20px" content-position="left"><span style="font-size:20px">个人信息</span></el-divider>
  <div class="info_row">
     <div><el-avatar :size="80" 
    :src="$utils.url2img(user.userInfo.headImage)" 
    fit="cover"
    style="border:4px solid #fc0;background:transparent;"
    ></el-avatar><el-link type="primary" @click="imgDialog = true" :underline="false">更换头像</el-link></div>
  </div>
  <div class="info_row">
    <span>姓名：</span>
    <span>{{user.userInfo.nickName}}</span>
    <span><el-link type="primary" @click="modifyName" :underline="false">修改</el-link> </span>
  </div>
  <div class="info_row">
    <span>城市：</span>
    <span>{{user.userInfo.city}}</span>
    <el-link type="primary" @click="modifyCity" :underline="false">修改</el-link>
  </div>
  <div class="info_row" style="display:flex;">
    <div class="divitem">主队：</div>
    <div class="divitem" style="display:flex;align-items:center" v-if="user.userInfo.homeTeam">
      <div>
        <div><el-image
        style="width: 50px; height: 50px;padding:10px"
        :src="$utils.url2img(user.userInfo.homeTeam.logo)"
        fit="cover"></el-image></div>
        <div style="text-align:center">{{user.userInfo.homeTeam.name}}</div>
      </div>
      <div><el-link type="primary" :underline="false" @click="teamDialog=true">更改主队</el-link></div>
    </div>
    <div v-else>未设置主队<el-link type="primary" :underline="false"  @click="teamDialog=true">点我设置</el-link></div>
  </div>
  <el-divider style="margin:20px" content-position="left"><span style="font-size:20px">账户信息</span></el-divider>
  <div class="info_row">
    <span>邮箱：</span>
    <span>{{user.userInfo.email}}</span>
    <!-- <el-link type="primary" :underline="false">更改密码</el-link> -->
  </div>
  <img-update @success="changeHeadImg" imgtype="headimg" :visible = "imgDialog" @close="closeImgUpdate"/>
  <team-update @close="closeTeam" :dialogVisible = "teamDialog"/>
</div>
    
</template>

<script>
import {updateUser} from '@/api/user'
import ImgUpdate from '../common/ImgUpdate.vue';
import TeamUpdate from '../common/TeamUpdate.vue'
export default {
  components: { TeamUpdate, ImgUpdate },
  name: 'UserInfo',
  data () {
    return {
      teamDialog : false,
      imgDialog : false,
    }
  },
  methods:{
    closeTeam(){
      this.teamDialog = false;
    },
    closeImgUpdate(){
      this.imgDialog = false;
    },
    modifyName(){
      this.$prompt("", '修改姓名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue : this.user.userInfo.nickName,
        inputValidator: (v)=>v&&v.trim().split("").length>=2,
        inputErrorMessage: '长度不能小于2'
      }).then(({ value }) => {
        if(value){
          updateUser({"nickName":value}).then((res)=>{
            if(res.code == 200){
              if(res.data){
                this.user.userInfo.nickName = value
              }
            }
          })
        }
      }).catch(()=>{});
    },
    modifyCity(){
      this.$prompt(null, '修改城市', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue : this.user.userInfo.city,
        inputValidator: (v)=>v&&v.trim().split("").length>=2,
        inputErrorMessage: '长度不能小于2'
      }).then(({ value }) => {
        if(value){
          updateUser({"city":value}).then((res)=>{
            if(res.code == 200){
              if(res.data){
                this.user.userInfo.city = value
              }
            }
          })
        }
      }).catch(()=>{});
    },
    changeHeadImg(url){
      updateUser({"headImage":url}).then((res)=>{
        if(res.code == 200){
          if(res.data){
            this.user.userInfo.headImage = url;
            this.imgDialog = false;
            window.location.reload();
          }else{
            this.$message.warning("修改失败")
          }
        }
      })
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
  margin : 10px
}
.info_row span{
  margin-right: 25px;
}
.userInfo{
  padding: 20px;
}
</style>
<style>
.userInfo .el-divider{
  margin : 40px 0;
}
</style>