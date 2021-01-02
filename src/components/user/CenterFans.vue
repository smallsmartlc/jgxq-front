<template>
<div>
<div>
  <user-list :users="users"/>
  <div class="loadmore">
    <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="load">点击加载更多<i class="el-icon-arrow-down"/></el-link>
    <div v-else style="color:#fc0;text-align:center">没有更多了</div>
  </div>
</div>
</div>
    
</template>

<script>
import UserList from '../common/UserList.vue'
import {getFansUser} from '@/api/user'
export default {
  props : {
    user:Object,
  },
  components: { UserList },
  name: 'CenterFocus',
  data () {
    return {
      users : [],
      cur : 0,
      pageSize : 10,
      total : 1,
      loading : false,
    }
  },
  mounted() {
    this.load();
  },
  methods : {
    load(){
      this.loading = true
      this.cur++;
      getFansUser({pageNum:this.cur,pageSize:this.pageSize,target : this.user.userkey})
      .then((res)=>{
          if(res.code == 200){
              var temp = res.data.records;
              this.total = res.data.total;
              this.users = this.users.concat(temp);
          }else{this.cur--;}
      })
      this.loading = false
    }
  },
  computed : {
    noMore () {
      return this.users.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>