<template>
  <div class="app-component" style="height:100vh;">
    <el-scrollbar wrap-class="main_wrap" style="height:100%;">
      <div class="list" :infinite-scroll-immediate="false" v-infinite-scroll="load" infinite-scroll-distance="10" infinite-scroll-disabled="disabled">
        <el-row style="z-index:100">
          <el-col :span="24" style="margin-bottom:40px"><jg-header :message="message"></jg-header></el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <div style="min-width:900px">
              <router-view @disabled = "changedisabled" ref="children"/>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
    <back-top/>
  </div>
</template>

<script>
import {hasMessage} from '@/api/message'
import {checkUser} from '@/api/login'
import BackTop from './components/common/BackTop.vue'
import JGHeader from './components/JGHeader.vue'
export default {
  name: 'App',
  components: { 
    jgHeader : JGHeader,
    BackTop
  },
  mounted() {
    this.checkUser().then(()=>{
      if(this.$store.getters.userInfo){
        this.hasMessage();
      }
    });
  },
  methods: {
    async checkUser(){
      await checkUser().then((res)=>{
        if(res.code==200){
          this.$store.commit("setUserInfo", res.data);
        }
      })
    },
    hasMessage(){
      hasMessage().then((res)=>{
        if(res.code == 200){
          this.message = res.data;
        }
      })
    },
    load(){
      if(this.$refs.children.load_scoll){this.$refs.children.load_scoll();}
    },
    changedisabled(val){
      this.disabled = val; 
    }
  },
  data(){
    return {
      disabled : false,
      message : false
    }
  },
  computed:{
    // disabled () {
    //   if(this.$refs.children.disabled) {
    //     return this.$refs.children.disabled
    //   }
    //   return false;
    // }
  },

}
</script>

<style>
  *{
    margin:0;
    padding:0;
    list-style:none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .el-scrollbar{
    overflow-x: hidden;
  }
  .el-divider{
    margin-top: 0;
    margin-bottom: 0;
  }
  .app-component{
    color: #333;
  }
</style>
<style>
@import "./css/common.css";
</style>
 