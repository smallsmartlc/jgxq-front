<template>
  <div class="main" style="padding:20px;background-color:#fff">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/talk' }">闲聊</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <talk-box :talk="talk" :user="user"/>
  </div>
</template>

<script>
import TalkBox from '../talk/TalkBox.vue';
export default {
components:{TalkBox,},
props:{
    user : Object
},
data() {
    return {
        talk : {
        "id": 1,
        "author": {
            "userkey": "SmArTkEy",
            "nickName": "小聪明",
            "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg",
            "city": "贵州 安顺",
            "author": null,
            "createAt": "2020-12-13T13:19:07.000+00:00",
            "homeTeam": {
                "id": 1,
                "name": "重邮经管",
                "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
            }
        },
        "text": "这这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk是第一个talk",
        "createAt": "2020-12-14T08:04:57.000+00:00",
        "hit": {
            "thumbs": 2,
            "comments": 1,
            "thumb": true,
            "collect": true
        }
    }
    }
},
}
</script>

<style scoped>

</style>