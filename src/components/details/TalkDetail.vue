<template>
  <div class="main" style="padding:20px;background-color:#fff">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/talk' }">闲聊</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <talk-box @delete="deleteTalk" v-if="talk && talk.id" :talk="talk" :user="user"/>
  </div>
</template>

<script>
import {getTalkById} from '@/api/talk'
import TalkBox from '../talk/TalkBox.vue';
export default {
components:{TalkBox,},
props:{
    user : Object
},
data() {
    return {
        talk : {}
    }
},
mounted() {
    this.loading();
},
methods:{
    loading(){
        getTalkById(this.$route.params.id).then((res)=>{
            if(res.code == 200){
                this.talk = res.data;
            }
        })
    },
    deleteTalk(){
        this.talk = {};
    }
}
}
</script>

<style scoped>

</style>