<template>
    <el-row type="flex">
        <el-col :span="16">
            <div>
              <diamond-title dname="最新报道" />
              <div style="margin-top:10px;width:800px;">
                  <ul>
                      <li  v-for="item in news" :key="item.id" class="news_item">
                        <router-link :to="'/news/'+item.id">
                          <news-box :news='item' width='600px' imgSize="80px" style="width:100%;height:100px"></news-box>
                        </router-link>
                      </li>
                  </ul>
                  <p v-if="loading"><page-loading/></p>
                  <p v-if="noMore"><no-more/></p>
              </div>
            </div>
        </el-col>
        <el-col :span="6" :offset="2" class = "hidden-md-and-down" >
            <follow-us/>
        </el-col>
    </el-row>
</template>

<script>
import {pageNews} from '@/api/news'
import NewsBox from './common/NewsBox.vue'
import NoMore from './common/NoMore.vue'
import PageLoading from './common/PageLoading.vue'
import DiamondTitle from './common/DiamondTitle.vue'

import FollowUs from './news/FollowUs.vue'
export default {
  components: { FollowUs,NewsBox,PageLoading, NoMore,DiamondTitle },
  name: 'JGNews',
  data () {
    return {
      cur: 0,
      pageSize:10,
      total:1,
      loading: false,
      news : [],
    }
  },
  mounted(){
    this.load_scoll();
  },
  watch: {
    disabled(newVal, oldVal) {
      this.$emit("disabled",newVal);
    }
  },
  computed: {
    noMore () {
      return this.news.length >= this.total
    },
    disabled () {
      var val = this.loading || this.noMore;
      return val;
    }
  },
  methods: {
    load_scoll () {
      this.loading = true
      this.cur ++;
      pageNews(this.cur,this.pageSize).then((res) => {
        if(res.code == 200){
            var temp = res.data.records;
            this.total = res.data.total
            this.news = this.news.concat(temp);
        }else this.cur--;
        this.loading = false
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news_item{
  margin-bottom: 12px;
  padding: 8px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 0 rgb(56 56 56 / 15%);
}
.news_item:hover{
  box-shadow: 0 6px 12px rgb(56 56 56 / 10%);
}
</style>