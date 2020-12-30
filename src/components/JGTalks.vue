<template>
  <div>
    <talk-editor v-model="talk" :isClear="isClear" @change="change"/>
    <div style="padding:40px;background:#fff" v-for="item in talks" :key = "item.id">
      <talk-box :talk="item" :user="user"/>
    </div>
    <div class="block">
      <el-pagination
        style="text-align:right"
        layout="prev, pager, next"
        :current-page = "cur"
        :hide-on-single-page="false" 
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import TalkBox from './talk/TalkBox.vue'
import TalkEditor from './wangEnduit/TalkEditor.vue'

export default {
  components: { TalkEditor, TalkBox },
  name: 'JGNews',
  data () {
    return {
      total : 250,
      pageSize : 10,
      cur : 1,
      isClear: false,
      talk : "",
      talks : [
        {
            "id": 2,
            "author": {
                "userkey": "SmArTkEy",
                "nickName": "小聪明",
                "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg"
            },
            "text": "这是一个话很多的talk",
            "hit": {
                "thumbs": 0,
                "comments": 0,
                "thumb": false,
                "collect": false
            },
            "createAt": "2020-12-21T07:44:21.000+00:00"
        },
        {
            "id": 1,
            "author": {
                "userkey": "SmArTkEy2",
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
    ]
    }
  },
  methods: {
 },
 props : {
   user : Object,
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>