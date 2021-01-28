<template>
  <div v-if="tag">
      <div>
        <diamond-title :dstyle="{'margin-bottom':'10px'}" dname="相关标签"/>
        <div v-for="(item,index) in tag" :key="index">
            <router-link :to="`/${item.type==0?'team':'player'}/${item.objectId}`">
                <div class="tagbox">
                    <el-image
                    style="width: 40px; height: 40px"
                    :src="$utils.url2img(item.logo)"
                    fit="cover"></el-image>
                    <div>{{item.name}}</div>
                </div>
            </router-link>
        </div>
      </div>
      
      <div style="margin-top:40px">
          <diamond-title :dstyle="{'margin-bottom':'10px'}" dname="相关新闻"/>
          <div v-for="item in news" :key="item.id" style="background-color:#fff;padding:10px;border-bottom:1px solid #f2f2f2">
            <a :href="'/news/'+item.id"><el-link :underline="false">{{item.title}}</el-link></a>
          </div>
      </div>
  </div>
</template>

<script>
import {pageNewsByTags} from '@/api/news'
import DiamondTitle from '../common/DiamondTitle.vue'
import NewsBox from '../common/NewsBox.vue'
export default {
components: { DiamondTitle, NewsBox },
props:{
    tag:Array,
},
data() {
    return {
        cur: 0,
        pageSize : 10,
        news : [],
        tags : []
    }
},
watch : {
    tag : function (newVal,oldVal) {
        this.tags = newVal;
        newVal && this.pageNewsByTags();
    }
},  
methods: {
    pageNewsByTags(){
        this.cur++;
        if(!this.tags[0]){
            return ;
        }
        pageNewsByTags(this.cur,this.pageSize,this.tags).then((res)=>{
            if(res.code == 200){
                var temp = res.data.records;
                this.news = this.news.concat(temp);
            }
        })
    }
},
}
</script>

<style scoped>
.tagbox{
    display:flex;
    align-items:center;
    background-color:#fff;
    padding:10px;
    border-bottom: 1px solid #f2f2f2;
}
.tagbox div{
    margin-right: 10px;
}
</style>