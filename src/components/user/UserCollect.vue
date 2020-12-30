<template>
<div>
  <div class="contain" v-for="item in collects" :key="item.id">
    <div style="font-size:12px;color:#666">{{fromNowStr(item.createTime)}}</div>
    <router-link :to="`/news/${item.news.id}`">
    <news-l-box :news='item.news'  imgSize="80px" width="800px" />
    </router-link>
    <el-divider/>
  </div>
</div>
    
</template>

<script>
import NewsBox from "../common/NewsBox.vue"
import NewsLBox from '../common/NewsLBox'


export default {
  components: { NewsLBox },
  name: 'UserCollect',
  data () {
    return {
      collects : [
            {
                "id": 6,
                "createTime": "2020-12-14T08:16:25.000+00:00",
                "news": {
                    "id": 1,
                    "title": "我是一则好新闻",
                    "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                    "comments": 6
                }
            },
            {
                "id": 5,
                "createTime": "2020-12-14T08:13:03.000+00:00",
                "news": {
                    "id": 2,
                    "title": "我是一则好新闻",
                    "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                    "comments": 0
                }
            },
            {
                "id": 4,
                "createTime": "2020-12-14T05:13:28.000+00:00",
                "news": {
                    "id": 2,
                    "title": "我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻",
                    "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                    "comments": 0
                }
            },
            {
                "id": 3,
                "createTime": "2020-12-13T05:35:03.000+00:00",
                "news": {
                    "id": 3,
                    "title": "tag修改了!!!!!",
                    "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                    "comments": 0
                }
            }
        ]
    }
  },
  computed : {
    fromNowStr(){
        return (time)=>{
            var now = this.$moment();
            var temp =  this.$moment(time);
            if((now-temp) > (3*24*3600*1000)){
                return temp.format('MM-DD HH:mm');
            }else{
                return temp.fromNow();
            }
        }
    }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contain{
  padding: 10px;
}

</style>