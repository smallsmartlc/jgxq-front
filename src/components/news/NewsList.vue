<template>
<div>
  <diamond-title dname="最新报道" />
  <div class="dynamic infinite-list-wrapper" style="margin-top:10px;width:800px;overflow:auto;">
      <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
          <li  v-for="item in news" :key="item.id" style="background-color:#fff;border-bottom:1px solid #E6E4DC">
            <router-link replace :to="'/news/'+item.id">
              <news-box :news='item' width='600px' imgSize="80px" style="width:100%;height:100px"></news-box>
            </router-link>
          </li>
      </ul>
      <p v-if="loading"><page-loading/></p>
      <p v-if="noMore"><no-more/></p>
  </div>
</div>
</template>
<script>
import NewsBox from '../common/NewsBox'
import NoMore from '../common/NoMore.vue'
import PageLoading from '../common/PageLoading.vue'
import DiamondTitle from '../common/DiamondTitle.vue'
export default {
    components : {NewsBox,PageLoading, NoMore,DiamondTitle},
    props : {
      news : Array,
    },
    data() {
        return {
            count: 2,
            loading: false,
            
        }
    },
    computed: {
      noMore () {
        return this.count>= 10
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          //TODO 无限滚动逻辑
          
          this.loading = false
        }, 2000)
      }
    }
}
</script>

<style scoped>

</style>