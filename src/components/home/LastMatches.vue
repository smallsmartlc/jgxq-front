<template>
<div class="jg-border" style="background-color:#fff;border-radius:8px">
    <div class="window">近日比赛</div>
    <el-divider></el-divider> 
        <div class="dynamic infinite-list-wrapper" style="width:100%;height:300px;">
            <el-scrollbar style="height:100%;">
            <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
                <li v-for="item in matches" :key="item.id" style="margin : 5px 5px">
                    <router-link :to="'/match/'+item.id">
                    <match-box fontSize='14px' imgSize="25px" margin="8px" :match='item' style="width:100%;height:80px"></match-box>
                    </router-link>
                </li>
            </ul>
            <p v-if="loading"><page-loading/></p>
            <p v-if="noMore"><no-more text="最近没有比赛哦"/></p>
    </el-scrollbar>
        </div>
</div>
</template>
<script>
import {pageMatches} from '@/api/match'
import MatchBox from '../common/MatchBox'
import PageLoading from '../common/PageLoading'
import NoMore from '../common/NoMore.vue'
export default {
    components : {MatchBox,PageLoading,NoMore},
    data() {
        return {
            cur: 0,
            pageSize:10,
            total:1,
            loading: false,
            matches : [],
        }
    },
    computed: {
      noMore () {
        return this.matches.length >= this.total;
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        this.cur++;
        pageMatches({pageNum:this.cur,pageSize:this.pageSize,start : this.$moment().subtract(2, 'days').format("YYYY/MM/DD HH:mm:ss")})
        .then((res)=>{
            if(res.code == 200){
                var temp = res.data.records;
                this.total = res.data.total;
                this.matches = this.matches.concat(temp);
            }else{this.cur--;}
        })
        this.loading = false
      }
    }
}
</script>

<style scoped>
    .window{
        color: #fc0;
        height:60px;
        width: 100px;
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
        vertical-align: top;
        text-align: center;
    }
</style>