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
  <div class="loadmore">
    <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="load">点击加载更多<i class="el-icon-arrow-down"/></el-link>
    <div v-else style="color:#fc0;text-align:center">没有更多了</div>
  </div>
</div>
    
</template>

<script>
import {pageUserComment} from '@/api/comment'
export default {
  name: 'CenterComment',
  props : {user:Object},
  mounted() {
    this.load();
  },
  methods : {
    load(){
      this.loading = true
      this.cur++;
      pageUserComment({pageNum:this.cur,pageSize:this.pageSize,target : this.user.userkey})
      .then((res)=>{
          if(res.code == 200){
              var temp = res.data.records;
              this.total = res.data.total;
              this.comments = this.comments.concat(temp);
          }else{this.cur--;}
      })
      this.loading = false
    }
  },
  data () {
    return {
      comments : [],
      cur : 0,
      pageSize : 10,
      total : 1,
      loading : false,
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
    },
    noMore () {
      return this.comments.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    },
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