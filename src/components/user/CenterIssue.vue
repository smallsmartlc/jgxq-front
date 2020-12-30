<template>
<div style="padding:20px">
  <div v-for="talk in talks" :key="talk.id" >
    <router-link :to="`/talk/${talk.id}`">
    <talk-box :talk="talk" :user="user"/>
    </router-link>
  </div>
</div>
    
</template>

<script>
import TalkBox from '../talk/TalkBox.vue'

export default {
  components: { TalkBox },
  name: 'CenterIssue',
  data () {
    return {
      talks : [
        {
            "id": 2,
            "author": {
                "userkey": "SmArTkEy",
                "nickName": "小聪明",
                "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg"
            },
            "text": "这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk这是一个话很多的talk",
            "hit": {
                "thumbs": 0,
                "comments": 0,
                "thumb": false,
                "collect": false
            },
            "createAt": "2020-12-14T08:12:51.000+00:00"
        },
        {
            "id": 1,
            "author": {
                "userkey": "SmArTkEy",
                "nickName": "小聪明",
                "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg"
            },
            "text": "这这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk是第一个talk",
            "hit": {
                "thumbs": 2,
                "comments": 1,
                "thumb": true,
                "collect": false
            },
            "createAt": "2020-12-14T08:04:57.000+00:00"
        }
    ],
    }
  },
  props : {
    user:Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>