<template>
<div class="main" style="padding-right:20px">
  <div class="box" v-for="item in comments" :key="item.id">
    <div class="header">
      <div style="margin-right:10px">
        <el-avatar :size="40" 
            :src="$utils.url2img(user.headImage)" 
            fit="cover"
            style="background:transparent;"
            ></el-avatar>
      </div>
      <div class="title">
        <div class="name">{{user.nickName}}</div>
        <div class="time">{{fromNowStr(item.createAt)}} · 回复{{item.type==0?'文章':'帖子'}}</div>
      </div>
    </div>
    <div>{{item.content}}</div>
    <router-link :to="`/${item.type==0?'news':'talk'}/${item.objectId}`">
    <div class="replyBox">
      {{item.title}}
    </div>
    </router-link>
  </div>
</div>
    
</template>

<script>
export default {
  name: 'CenterComment',
  props : {user:Object},
  data () {
    return {
      comments : [
            {
                "id": 1,
                "thumbs": 1,
                "content": "我是第一条评论",
                "createAt": "2020-12-13T06:07:28.000+00:00",
                "type": 0,
                "objectId": 1,
                "title": "我是一则好新闻"
            },
            {
                "id": 2,
                "thumbs": 0,
                "content": "我是第二条评论",
                "createAt": "2020-12-13T06:08:26.000+00:00",
                "type": 0,
                "objectId": 1,
                "title": "我是一则好新闻"
            },
            {
                "id": 3,
                "thumbs": 1,
                "content": "第二条评论的第一条回复",
                "createAt": "2020-12-13T06:08:39.000+00:00",
                "type": 0,
                "objectId": 1,
                "title": "我是一则好新闻"
            },
            {
                "id": 4,
                "thumbs": 0,
                "content": "我回复了第二条评论的第一条回复",
                "createAt": "2020-12-13T06:09:00.000+00:00",
                "type": 1,
                "objectId": 2,
                "title": "我是一则好新闻"
            },
            {
                "id": 5,
                "thumbs": 0,
                "content": "第二条评论的第2条回复",
                "createAt": "2020-12-14T02:50:50.000+00:00",
                "type": 0,
                "objectId": 1,
                "title": "我是一则好新闻"
            },
            {
                "id": 6,
                "thumbs": 0,
                "content": "我也回复了第二条评论的第三条回复",
                "createAt": "2020-12-14T02:53:33.000+00:00",
                "type": 0,
                "objectId": 1,
                "title": "我是一则好新闻"
            },
            {
                "id": 7,
                "thumbs": 0,
                "content": "我是第一条评论",
                "createAt": "2020-12-15T04:54:25.000+00:00",
                "type": 1,
                "objectId": 1,
                "title": "这这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是第一个talk这是..."
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