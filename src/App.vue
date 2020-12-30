<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin-bottom:40px"><jg-header :user="user" :message="message"></jg-header></el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2"><router-view :user="user"></router-view></el-col>
    </el-row>
    <back-top/>
  </div>
</template>

<script>
import BackTop from './components/common/BackTop.vue'
import JGHeader from './components/JGHeader.vue'
export default {
  name: 'App',
  components: { 
    jgHeader : JGHeader,
    BackTop
  },
  data(){
    return {
      user : {
        "userkey": "SmArTkEy",
        "nickName": "小聪明",
        "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg",
        "city": "贵州 安顺",
        "author": false,
        "createAt": "2020-12-13T13:19:07.000+00:00",
        // "homeTeam": {
        //     "id": 1,
        //     "name": "重邮经管",
        //     "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
        // }
        "homeTeam" : null,
      },
      message : true,
    }
  }
}
</script>

<style>

</style>
 