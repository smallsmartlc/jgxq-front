<template>
  <div class="app-component" style="height:100vh;">
    <el-scrollbar style="height:100%">
      <div class="list" :infinite-scroll-immediate="false" v-infinite-scroll="load" infinite-scroll-distance="10" infinite-scroll-disabled="disabled">
        <el-row style="z-index:100">
          <el-col :span="24" style="margin-bottom:40px"><jg-header @logout="logout" :message="message" :user="user"></jg-header></el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <div style="min-width:900px">
              <router-view @disabled = "changedisabled" ref="children" @login="login" :user="user"/>
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
    this.checkUser();
  },
  methods: {
    checkUser(){
      checkUser().then((res)=>{
        if(res.code==200){
          this.user = res.data;
          if(this.user){
            this.hasMessage();
          }
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
    login(data){
      this.user = data;
    },
    logout(){
      this.user = null;
      this.$router.push({ path:'/login'})
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
      user : null,
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

</style>
 