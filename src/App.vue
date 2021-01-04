<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin-bottom:40px"><jg-header @logout="logout" :user="user"></jg-header></el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2"><router-view @login="login" :user="user"></router-view></el-col>
    </el-row>
    <back-top/>
  </div>
</template>

<script>
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
        }
      })
    },
    login(data){
      this.user = data;
    },
    logout(){
      this.user = null;
      this.$router.push({ path:'/login'})
    }
    
  },
  data(){
    return {
      user : null,
    }
  }
}
</script>

<style>

</style>
 