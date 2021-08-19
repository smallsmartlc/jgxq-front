<template>
<div>
  <div class="contain" v-for="item in collects" :key="item.id" >
    <div style="font-size:12px;">{{fromNowStr(item.createTime)}}</div>
    <router-link v-if="item.news" :to="`/news/${item.news.id}`">
      <news-l-box :news='item.news'  imgSize="80px" width="600px" />
    </router-link>
    <news-l-box v-else :news='{title:"已删除"}'  imgSize="80px" width="600px" />
  </div>
    <div class="loadmore">
        <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="load">点击加载更多<i class="el-icon-arrow-down"/></el-link>
        <div v-else style="color:#fc0;text-align:center">没有更多了</div>
    </div>
</div>
    
</template>

<script>
import NewsLBox from '../common/NewsLBox'
import {getCollectNews} from '@/api/user'

export default {
  components: { NewsLBox },
  name: 'UserCollect',
  data () {
    return {
      collects : [],
      loading : false,
      cur : 0,
      pageSize : 10,
      total : 1,
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
      return this.collects.length >= this.total
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
      getCollectNews(this.cur,this.pageSize)
      .then((res)=>{
          if(res.code == 200){
              var temp = res.data.records;
              this.total = res.data.total;
              this.collects = this.collects.concat(temp);
          }else{this.cur--;}
      })
      this.loading = false
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contain{
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ececec;
  margin-bottom: 20px;
}

</style>