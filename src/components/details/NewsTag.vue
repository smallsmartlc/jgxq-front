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
        <!-- <div v-if="(tag.teams||tag.players)">
            <div v-for="team in tag.teams" :key="'team'+team.id">
                <router-link :to="`/team/${team.id}`">
                    <div class="tagbox">
                        <el-image
                        style="width: 40px; height: 40px"
                        :src="$utils.url2img(team.logo)"
                        fit="cover"></el-image>
                        <div>{{team.name}}</div>
                    </div>
                </router-link>
            </div>
            <div v-for="player in tag.players" :key="'player'+player.id">
                <router-link :to="`/player/${player.id}`">
                    <div class="tagbox">
                        <el-image
                        style="width: 40px; height: 40px"
                        :src="$utils.url2img(player.headImage)"
                        fit="cover"></el-image>
                        <div>{{player.name}}</div>
                    </div>
                </router-link>
            </div>
        </div> -->
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
import {pageNewsByTag} from '@/api/news'
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
        newVal && this.pageNewsByTag();
    }
},  
methods: {
    pageNewsByTag(){
        this.cur++;
        var temp1 = this.tags[0];
        pageNewsByTag(this.cur,this.pageSize,temp1.objectId,temp1.type).then((res)=>{
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