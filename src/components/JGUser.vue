<template>
<el-container style="background-color:#fff;height:600px;padding-top:20px">
  <el-aside width="200px">
    <el-menu
      style="height:100%"
      :default-active="this.$route.path"
      class="el-menu-vertical-demo" router>
      <el-menu-item index="/center/interact">
        <i class="el-icon-s-home"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="/center/message">
        <i class="el-icon-chat-line-round"></i>
        <span slot="title">消息</span>
      </el-menu-item>
      <el-menu-item index="/center/collect">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的收藏</span>
      </el-menu-item>
      <el-menu-item index="/center/info">
        <i class="el-icon-user"></i>
        <span slot="title">个人资料</span>
      </el-menu-item>
      <el-menu-item index="/center/author">
        <i class="el-icon-edit"></i>
        <span slot="title">创作中心</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-main>
    <el-scrollbar style="height:100%;">
      <router-view :user="user"></router-view>
    </el-scrollbar>
  </el-main>
</el-container>
</template>

<script>
import {getUserInfo} from '@/api/user'
export default {
  name: 'JGUser',
  mounted() {
    this.loadingUser();
  },
  methods:{
    loadingUser(){
      getUserInfo().then((res)=>{
        if(res.code == 200){
          this.user = res.data;
        }
      })
    }
  },
  data () {
    return {
      user : {},
    }
  },
  // computed: {
  //   defaultActive(){
  //     var split = this.$route.path.split('/')
  //     var res = '/' + split[1]+'/'+ split[2];
  //     return res;
  //   }
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>