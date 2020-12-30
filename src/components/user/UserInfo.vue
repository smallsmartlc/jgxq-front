<template>
<div style="padding:20px">
  <div style="font-size:30px">个人资料</div>
  <div>个人信息</div>
  <div class="info_row">
    <div style="margin-right:20px">
      <el-avatar :size="80" 
      :src="img(user.headImage)" 
      fit="cover"
      style="border:4px solid #fc0;background:transparent;"
      ></el-avatar>
    </div>
    <el-link type="primary" :underline="false">更换新头像</el-link>
  </div>
  <div class="info_row">
    <div>姓名</div>
    <div>{{user.nickName}}</div>
    <el-link type="primary" :underline="false">修改</el-link>
  </div>
  <div class="info_row">
    <div>城市</div>
    <div>{{user.city}}</div>
    <el-link type="primary" :underline="false">修改</el-link>
  </div>
  <div class="info_row">
    <div>主队</div>
    <div v-if="user.homeTeam">
      {{user.homeTeam.name}}<el-link type="primary" :underline="false">更改主队</el-link>
    </div>
    <div v-else>未设置主队<el-link type="primary" :underline="false">点我设置</el-link></div>
  </div>
  <div>账号信息</div>
  <div class="info_row">
    <el-link type="primary" :underline="false">更改密码</el-link>
  </div>
</div>
    
</template>

<script>
import { imgUrl } from '@/constants/index'
export default {
  name: 'UserInfo',
  data () {
    return {
      
    }
  },
  props : {
    user:Object,
  },
  computed : {
    img(){
      return (url)=>{
        return imgUrl + url;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info_row{
  display: flex;
}

</style>