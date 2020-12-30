<template>
    <el-row>
        <el-col :span="16">
            <news-list :news='news'/>
        </el-col>
            <el-col :span="6" :offset="2" class = "hidden-md-and-down">
            <follow-us/>
        </el-col>
    </el-row>
</template>

<script>
import FollowUs from './news/FollowUs.vue'
import NewsList from "./news/NewsList.vue"

export default {
  components: { NewsList, FollowUs },
  name: 'JGNews',
  data () {
    return {
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
            },
            {
                "id": 15,
                "title": "19日NBA综述：篮网大胜绿军，湖人逆转险胜太阳",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 14,
                "title": "为了世界杯入场券，这两个国家真的诉诸战争",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 11,
                "title": "我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 6
            },
            {
                "id": 13,
                "title": "tag修改了!!!!!",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 12,
                "title": "我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 25,
                "title": "19日NBA综述：篮网大胜绿军，湖人逆转险胜太阳",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 24,
                "title": "为了世界杯入场券，这两个国家真的诉诸战争",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 21,
                "title": "我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 6
            },
            {
                "id": 23,
                "title": "tag修改了!!!!!",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 22,
                "title": "我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            }
        ],
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>