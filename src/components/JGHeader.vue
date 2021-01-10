<template>
  <div>
    <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" 
    text-color="#111"
    active-text-color="#fff" style="min-width :900px"
    router>
      <el-menu-item class="just-box" style=" background-color: #fff!important;border-bottom: 2px solid #fff !important; ">
        <div style="display:flex;align-items:center;height:100%">
          <el-image
            style="width: 50px; height: 50px;display:block;"
            :src="require('../assets/jgxq.png')"
            fit="cover">
            <div slot="error" class="image-slot"><i class="el-icon-picture-outline"></i></div>
          </el-image>
        </div>
      </el-menu-item>
      <el-menu-item v-for="(nav,index) in navs" :index='nav.route' :key='index'>{{nav.name}}</el-menu-item>
      <el-menu-item v-if="!user" index='/register' class="right">注册</el-menu-item>
      <el-menu-item v-if="!user" index='/login' class="right">登陆</el-menu-item>
      <div style="width:auto;height:100%">
        <el-menu-item v-if="user" index='/center' class="right">
          <el-dropdown>
            <div class="el-dropdown-link" style="display:flex;align-items:center">
              <div class="title-box"  style="color:#111!important">{{user.nickName}}</div>
              <div class="title-box">
                <el-badge :is-dot="message" class="item head-message">
                  <el-avatar :size="55" 
                  :src="$utils.url2img(user.headImage)" 
                  fit="cover"
                  style="border:4px solid #fc0;background:transparent;"
                  ></el-avatar>
                </el-badge>
              </div>
            </div>
            <el-dropdown-menu slot="dropdown" show-timeout="0">
              <user-info @logout="logout" :message = "message"></user-info>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <!-- 使用submenu方式实现 -->
        <!-- <el-submenu v-if="user" class="right" index='/center' route='/center'>
          <template slot="title">
            <div class="el-dropdown-link" style="display:flex">
              <div class="title-box"  style="color:#111!important">{{user.nickName}}</div>
              <div class="title-box">
                <el-badge :is-dot="message" class="item head-message">
                  <el-avatar :size="60" 
                  :src="'$utils.url2img(user.headImage)" 
                  fit="cover"
                  style="border:4px solid #fc0;background:transparent;"
                  ></el-avatar>
                </el-badge>
              </div>
            </div>
          </template>
          <user-info  :message = "message"></user-info>
        </el-submenu> -->
      </div>
    </el-menu>
  </div>
</template>

<script>
import UserInfo from './UserInfo.vue'
export default {
  name: 'JGHeader',
  methods:{
    logout(){
      this.$emit("logout");
    }
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '2',
      navs : [{
        "index" : 1,
        "name" : "首页",
        "route" : "/home"
      },
      {
        "index" : 2,
        "name" : "新闻",
        "route" : "/news"
      },
      {
        "index" : 3,
        "name" : "比赛",
        "route" : "/match"
      },
      {
        "index" : 4,
        "name" : "闲聊",
        "route" : "/talk"
      },
      ]
    };
  },
  props : {
    user : Object,
    message : Boolean,
  },
  components : {
    UserInfo
  },
  computed : {
    defaultActive(){
      var res = '/' + this.$route.path.split('/')[1]
      return res;
    },
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

:focus {outline: 0;}
.el-dropdown-link .title-box{
  font-size: 20px;
  margin-left:10px;
  display: flex;
  align-items: center;
}
.el-menu-demo{
    height: 60px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .12)
}
.el-submenu{
  height: 100%;
}

.el-menu-item {
  height: 100%;
  font-size: 20px;
  text-align: center;
  padding: 0 30px;
  font-weight: 300;
}
.el-menu-item.is-active{
  background-color: #FFCC00 !important;
  border-bottom: 2px solid #FFCC00 !important;
}
.right{
  float: right!important;
}
.is-opened{
  background-color: #fff !important;
}
.right.is-active{
  background-color: #fff !important;
  color: #111 !important;
  border-bottom: 2px solid #FFCC00 !important;
}
.el-badge__content.el-badge__content--undefined.is-fixed.is-dot{
  transform: translate(50%, -25%)!important;
}
sup{
      right: 20% !important;
      top: 20% !important;
    }
</style>
<style>
  a {
    color: inherit;
    text-decoration: none;
  }
  .head-message sup{
      right: 20% !important;
      top: 20% !important;
  }
  

  .router-link-active {
    text-decoration: none;
  }
  .el-submenu__title{
    height: 100%;
  }
</style>