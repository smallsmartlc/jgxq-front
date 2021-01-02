<template>
<div style="padding:20px">
  <div>
    <div>
      <div v-for="talk in talks" :key="talk.id" >
        <router-link :to="`/talk/${talk.id}`">
        <talk-box :talk="talk" :user="user"/>
        </router-link>
      </div>
      <div class="loadmore">
          <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="load">点击加载更多<i class="el-icon-arrow-down"/></el-link>
          <div v-else style="color:#fc0;text-align:center">没有更多了</div>
      </div>
    </div>
  </div>
</div>
    
</template>

<script>
import TalkBox from '../talk/TalkBox.vue'
import {pageTalkList} from '@/api/talk'
import PageLoading from '../common/PageLoading.vue'
import NoMore from '../common/NoMore.vue'
export default {
  components: { TalkBox, PageLoading, NoMore },
  name: 'CenterIssue',
  data () {
    return {
      loading : false,
      cur : 0,
      pageSize : 10,
      total : 1,
      talks : [],
    }
  },
  methods : {
    load(){
      this.loading = true
      this.cur++;
      pageTalkList({pageNum:this.cur,pageSize:this.pageSize,target : this.user.userkey})
      .then((res)=>{
          if(res.code == 200){
              var temp = res.data.records;
              this.total = res.data.total;
              this.talks = this.talks.concat(temp);
          }else{this.cur--;}
      })
      this.loading = false
    }
  },
  props : {
    user:Object,
  },    
  mounted() {
    this.load();
  },
  computed: {
    noMore () {
      return this.talks.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>