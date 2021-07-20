<template>
    <div v-if="news" class="dynamic infinite-list-wrapper" style="margin:20px 0;width:100%;overflow:auto">
        <ul
        class="list">
            <li v-for="item in news" :key="item.id" style="background-color:#fff;border-bottom:1px solid #E6E4DC;padding:10px">
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

</style>