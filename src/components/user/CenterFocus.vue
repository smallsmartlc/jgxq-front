<template>
<div>
  <user-list :users="users"/>
</div>
</template>

<script>
import UserList from '../common/UserList.vue'

export default {
  components: { UserList },
  name: 'CenterFocus',
  data () {
    return {
      users : [
          {
              "userkey": "testuse2",
              "nickName": "测试用户2",
              "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg",
              "city": "火星",
              "focus": true
          },
          {
              "userkey": "testuse3",
              "nickName": "测试用户2",
              "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg",
              "city": "重庆 南岸",
              "focus": false
          },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>