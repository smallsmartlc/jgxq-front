<template>
    <div v-if="news" class="dynamic infinite-list-wrapper" style="margin:20px 0;width:100%;overflow:auto">
        <ul
        class="list">
            <li class="news_item" v-for="item in news" :key="item.id">
              <router-link :to="'/news/'+item.id">
                <news-box :news='item' width='600px' imgSize="80px" style="width:100%;height:100px"></news-box>
              </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import NewsBox from '../common/NewsBox.vue'
import NoMore from '../common/NoMore.vue'
import PageLoading from '../common/PageLoading.vue'
export default {
    components : {NewsBox,PageLoading, NoMore,},
    props :{
      news:Array,
    },
    data() {
        return {
            count: 2,
            loading: false
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

}
</script>

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