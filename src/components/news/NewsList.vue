<template>
<div>
  <diamond-title dname="最新报道" />
  <div style="margin-top:10px;width:800px;height:700px;">
      <el-scrollbar style="height:100%;">
      <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
          <li v-for="item in news" :key="item.id" style="background-color:#fff;border-bottom:1px solid #E6E4DC;padding:10px" >
            <router-link :to="'/news/'+item.id">
              <news-box :news='item' style="width:100%;height:100px"></news-box>
            </router-link>
          </li>
      </ul>
      </el-scrollbar>
      <p v-if="loading"><page-loading/></p>
      <p v-if="noMore"><no-more/></p>
  </div>
</div>
</template>
<script>
import {pageNews} from '@/api/news'
import NewsBox from '../common/NewsBox'
import NoMore from '../common/NoMore.vue'
import PageLoading from '../common/PageLoading.vue'
import DiamondTitle from '../common/DiamondTitle.vue'
export default {
    components : {NewsBox,PageLoading, NoMore,DiamondTitle},
    data() {
        return {
            cur: 0,
            pageSize:10,
            total:1,
            loading: false,
            news : [],    
        }
    },
    computed: {
      noMore () {
        return this.news.length >= this.total
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        this.cur ++;
        pageNews(this.cur,this.pageSize).then((res) => {
          if(res.code == 200){
                var temp = res.data.records;
                this.total = res.data.total
                this.news = this.news.concat(temp);
            }else this.cur--;
        })
        this.loading = false
      }
    },
}
</script>

<style scoped>

</style>