<template>
  <div v-if="tag">
      <div>
        <diamond-title :dstyle="{'margin-bottom':'10px'}" dname="相关标签"/>
        <div v-if="(tag.teams||tag.players)">
            <div v-for="team in tag.teams" :key="'team'+team.id" class="tagbox">
                <el-image
            style="width: 40px; height: 40px"
            :src="'http://localhost:6800/images/'+team.logo"
            fit="cover"></el-image>
                <div>{{team.name}}</div>
            </div>
            <div v-for="player in tag.players" :key="'player'+player.id" class="tagbox">
                <el-image
            style="width: 40px; height: 40px"
            :src="'http://localhost:6800/images/'+player.headImage"
            fit="cover"></el-image>
                <div>{{player.name}}</div>
            </div>
        </div>
      </div>
      
      <div style="margin-top:40px">
          <diamond-title :dstyle="{'margin-bottom':'10px'}" dname="相关新闻"/>
          <div v-for="item in news" :key="item.id" style="background-color:#fff;padding:10px;border-bottom:1px solid #f2f2f2">
            <el-link :underline="false">{{item.title}}</el-link>
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
    tag:Object,
},
data() {
    return {
        cur: 0,
        pageSize : 10,
        news : [],
        tags : {}
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
        var temp1 ;
        var type;
        if(this.tags.teams&&this.tags.teams.length > 0){
            temp1 = this.tags.teams[0];
            type = 0;
        }else if(this.tags.players&&this.tags.players.length > 0){
            temp1 = this.tags.players[0];
            type = 1;
        }else{
            return;
        }
        pageNewsByTag(this.cur,this.pageSize,temp1.id,type).then((res)=>{
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