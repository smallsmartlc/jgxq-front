<template>
  <div style="background-color:#fff">
    <talk-editor v-loading="submiting" @submit="submit" v-model="talk" :isClear="isClear" @change="change"/>
    <div style="padding:40px;background:#fff" v-for="item in talks" :key = "item.id">
      <talk-box @delete="deleteComment(item.id)" :talk="item" :user="user"/>
    </div>
    <div class="block">
      <el-pagination
        style="text-align:right"
        layout="prev, pager, next"
        :hide-on-single-page="false" 
        @current-change = "change"
        :current-page = "cur"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {pageTalk,addTalk} from '@/api/talk'
import TalkBox from './talk/TalkBox.vue'
import TalkEditor from './wangEnduit/TalkEditor.vue'

export default {
  components: { TalkEditor, TalkBox },
  name: 'JGNews',
  mounted() {
    this.load();
  },
  data () {
    return {
      total : 0,
      pageSize : 10,
      cur : 1,
      isClear: false,
      talk : "",
      talks : [],
      submiting : false,
    }
  },
  methods: {
    submit(){
      this.submiting = true
      addTalk(this.talk).then((res)=>{
        if(res.code==200){
          this.$message({
            message: '发帖成功!',
            type: 'success'
          });
          var temp = {
            author : this.user,
            hit : {
              collect:false,
              comments:0,
              thumb:false,
              thumbs:0,
            },
            id : res.data,
            text : this.talk,
          }
          this.talk = "";
          this.talks.unshift(temp);
        }else{
          this.$message({
            message: '发送失败!',
            type: 'error'
          });
        }
        this.submiting = false;
      })
    },
    load(){
      pageTalk(this.cur,this.pageSize).then((res)=>{
        if(res.code==200){
          this.total = res.data.total;
          this.talks = res.data.records;
        }
      })
    },
    change(val){
      if(val > 0){
        this.cur = val;
        this.load();
      }
    },
    deleteComment(id){
      this.talks = this.talks.filter(t=>t.id!=id)
      this.total--;
    }
  },
  props : {
    user : Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>