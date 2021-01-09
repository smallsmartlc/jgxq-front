<template>
<div style="padding:40px;">
  <div v-if="user.userInfo&&user.userInfo.author">
    <div>
      <div style="font-size:30px">{{nowNoon}}好, {{user.userInfo.nickName}}</div>
      <div class="main">
        <div class="info_container">
          <div class="info_item">
            <div class="number">{{infos.publishNum}}</div>
            <span>发表</span>
          </div>
          <div class="info_item">
            <div class="number">{{infos.thumbs}}</div>
            <span>点赞</span>
          </div>
          <div class="info_item">
            <div class="number">{{infos.comments}}</div>
            <span>评论</span>
          </div>
          <div class="info_item">
            <div class="number">{{infos.collects}}</div>
            <span>收藏</span>
          </div>
        </div>
        <div class="main_right">
          <div style="text-align:center">
            <div class="chicken_soup">{{chickenSoup}}</div>
            <a href="/author/news"><el-button type="primary" round>开始创作</el-button></a>
          </div>
        </div>
      </div>
    </div>
    <div class="news_container">
      <div style="font-size:20px;margin-bottom:10px;">最近创作</div>
      <div style="height: 200px;">
        <el-scrollbar style="height:100%;">
          <ul
          class="list"
          v-infinite-scroll="loadNews"
          infinite-scroll-disabled="disabled">
          <li class="news_item" style="position:relative"  v-for="item in news" :key="item.id">
            <router-link :to="'/news/'+item.id">
              <news-l-box :news='item' :imgSize='"80px"' :width="'450px'" style="width:100%;height:100px"/>
            </router-link>
            <div class="button" style="position:absolute;right:30px;top:10px;">
              <a :href="`/author/news/${item.id}`"><el-button icon="el-icon-edit" type="primary" circle></el-button></a>
              <el-button icon="el-icon-delete" @click="deleteNews(item.id)" type="danger" plain circle/>
            </div>
          </li>
          </ul>
          <p v-if="loading"><page-loading/></p>
          <p v-if="noMore"><no-more/></p>
        </el-scrollbar>
      </div>
    </div>
  </div>
  <div v-else style="width:100%;height:400px;display:flex;justify-content:center;align-items:center">
    <i class="iconfont icon-unie605"></i> 您还不能发表新闻哦,去申请成为创作者吧!!!
  </div>
</div>
    
</template>

<script>
import {pageAuthorNews,authorDeleteNews} from '@/api/news'
import {getAuthorInfo} from '@/api/author'
import NewsLBox from '../common/NewsLBox.vue'
import PageLoading from '../common/PageLoading.vue'
import NoMore from '../common/NoMore.vue'
export default {
  components: { NewsLBox, PageLoading, NoMore },
  data () {
    return {
      infos : {},
      chickenSoups : [
        '嘘寒问暖三千日，不及凉时一身衣',
        '但愿你比冬天先来',
        '晚来天欲雪，能涮一锅无',
        '没有一个冬天不能逾越，没有一个春天不会到来',
        '春天终究会来的 你也是'
        ],
      news : [], 
      hover : -1,
      cur : 0,
      size : 10,
      total : 1,
      loading : false,
    }
  },
  mounted() {
    this.getAuthorInfo();
  },
  methods: {
    getAuthorInfo(){
      this.loading = true;
      getAuthorInfo().then((res)=>{
        if(res.code == 200){
          this.infos = res.data;
        }
        this.loading = false;
      });
    },
    deleteNews(id){
      this.$confirm('你将删除这条新闻, 是否继续?',  {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        authorDeleteNews(id).then((res)=>{
          if(res.code == 200){
            if(res.data){
              this.news = this.news.filter(n=>n.id!=id);
              this.$message.success("删除成功")
            }
          }
        })
      }).catch();
    },
    loadNews(){
      this.cur++;
      pageAuthorNews(this.cur,this.size).then((res)=>{
        if(res.code==200){
          this.news = this.news.concat(res.data.records);
          this.total = res.data.total;
        }else {this.cur--}
      })
    },
  },
  props:{
    user:Object,
  },
  computed:{
    nowNoon(){
      var time = this.$moment().hour();
      if(time>19||time<7) {return "晚上"}
      if(time>14) {return "下午"}
      if(time>12){return "中午"} 
      else {return "早上"}
    },
    noMore () {
      return this.news.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    },
    chickenSoup(){
      return this.chickenSoups[Math.floor((Math.random()*this.chickenSoups.length))]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  margin-top:40px;
  width: 100%;
  display: flex;
}
.info_container{
  display: flex;
  width: 400px;
  padding: 20px;
  background-color: #fbfbfb;
  border-radius: 20px;
  justify-content: center;
  margin-right: 50px;
}
.main_right{
  width: 300px;
  background-color: #fafafa;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info_item{
  width:100px;
  height: 60px;
  text-align: center;
}
.number{
  font-size: 30px;
}
.chicken_soup{
  font-size: 14px;
  margin-bottom: 10px;
}
.news_container{
  margin-top: 40px;
  width: 700px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fafafa;
}
.button{
  visibility:hidden;
}
.news_item:hover .button{
  visibility: visible;
}
</style>