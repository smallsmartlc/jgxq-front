<template>
<div>
  <div class="userMessage" style="width:100%" v-for="item in messages" :key="item.id">
    <el-badge :is-dot="item.read==0" class="item" style="width:100%">
    <div class="box">
      <div class="header">
        <div style="margin-right:10px">
          <el-avatar :size="40" 
              :src="$utils.url2img(item.user.headImage)" 
              fit="cover"
              style="background:transparent;"
              ></el-avatar>
        </div>
        <div class="title">
          <div class="name">{{item.user.nickName}}</div>
          <div class="time">{{fromNowStr(item.createAt)}}</div>
        </div>
      </div>
      <div>{{item.text}}&nbsp;<router-link :to="`/${item.objectType==0?'news':'talk'}/${item.objectId}`"><el-link type="primary" :underline="false">点击查看</el-link></router-link></div>
    </div>
    </el-badge>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserMessage',
  data () {
    return {
      messages : [
            {
                "id": 5,
                "messageType": 0,
                "objectType": 0,
                "objectId": 1,
                "user": {
                    "userkey": "testuser",
                    "nickName": "测试用户",
                    "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg"
                },
                "read": 0,
                "text": " 赞了我的回复：第二条评论的第一条回复",
                "createAt": "2020-12-15T08:42:32.000+00:00"
            },
            {
                "id": 4,
                "messageType": 0,
                "objectType": 1,
                "objectId": 1,
                "user": {
                    "userkey": "testuser",
                    "nickName": "测试用户",
                    "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg"
                },
                "read": 0,
                "text": " 赞了我",
                "createAt": "2020-12-15T08:41:06.000+00:00"
            },
            {
                "id": 3,
                "messageType": 0,
                "objectType": 1,
                "objectId": 1,
                "user": {
                    "userkey": "SmArTkEy",
                    "nickName": "小聪明",
                    "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg"
                },
                "read": 0,
                "text": " 赞了我 ",
                "createAt": "2020-12-15T07:47:52.000+00:00"
            },
            {
                "id": 2,
                "messageType": 1,
                "objectType": 1,
                "objectId": 1,
                "user": {
                    "userkey": "SmArTkEy",
                    "nickName": "小聪明",
                    "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg"
                },
                "read": 0,
                "text": " 回复了我：真好",
                "createAt": "2020-12-15T07:47:52.000+00:00"
            },
            {
                "id": 1,
                "messageType": 0,
                "objectType": 1,
                "objectId": 1,
                "user": {
                    "userkey": "SmArTkEy",
                    "nickName": "小聪明",
                    "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg"
                },
                "read": 1,
                "text": "赞了我",
                "createAt": "2020-12-15T07:06:39.000+00:00"
            }
        ],
    }
  },
  computed : {
    fromNowStr(){
        return (time)=>{
            var now = this.$moment();
            var temp =  this.$moment(time);
            if((now-temp) > (3*24*3600*1000)){
                return temp.format('MM-DD HH:mm');
            }else{
                return temp.fromNow();
            }
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.replyBox{
  background-color: #FCFCF2;
  padding: 10px;
  font-size: 14px;
}
.box{
  padding: 10px;
  width: 80%;
}
.header{
  display: flex;
  align-items: center;
}
.name{
  font-size: 16px;
}
.time{
  font-size: 12px;
  color: #666;
}

</style>
<style>
  .userMessage sup{
      right: 10px !important;
      top: 20% !important;
  }
</style>