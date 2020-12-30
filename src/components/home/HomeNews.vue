<template>
    <div class="dynamic infinite-list-wrapper" style="margin-top:20px;width:800px;overflow:auto">
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
    </div>
</template>
<script>
import NewsBox from '../common/NewsBox'
import NoMore from '../common/NoMore.vue'
import PageLoading from '../common/PageLoading.vue'
export default {
    components : {NewsBox,PageLoading, NoMore,},
    
    data() {
        return {
            count: 2,
            loading: false,
            news : [
            {
                "id": 5,
                "title": "19日NBA综述：篮网大胜绿军，湖人逆转险胜太阳",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 4,
                "title": "为了世界杯入场券，这两个国家真的诉诸战争",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 1,
                "title": "我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 6
            },
            {
                "id": 3,
                "title": "tag修改了!!!!!",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 2,
                "title": "我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            }
        ],
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