<template>
<div>
  <div class="userMessage" style="width:100%" v-for="item in messages" :key="item.id">
    <el-badge :is-dot="item.read==1" class="item" style="width:100%">
    <div class="box">
      <div class="header">
        <div style="margin-right:10px">
          <router-link :to="`/user/${item.user.userkey}`">
            <el-avatar :size="40" 
            :src="$utils.url2img(item.user.headImage)" 
            fit="cover"
            style="background:transparent;"
            ></el-avatar>
          </router-link>
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
  <div class="loadmore">
      <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="load">点击加载更多<i class="el-icon-arrow-down"/></el-link>
      <div v-else style="color:#fc0;text-align:center">没有更多了</div>
  </div>
</div>
</template>

<script>
import {pageMessage} from '@/api/user'
export default {
  name: 'UserMessage',
  data () {
    return {
      loading : false,
      cur : 0,
      pageSize : 10,
      total : 1,
      messages : [],
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
      return this.messages.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  mounted() {
    this.load();
  },
  methods : {
    load(){
      this.loading = true
      this.cur++;
      pageMessage(this.cur,this.pageSize)
      .then((res)=>{
          if(res.code == 200){
              var temp = res.data.records;
              this.total = res.data.total;
              this.messages = this.messages.concat(temp);
          }else{this.cur--;}
      })
      this.loading = false
    }
  },
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