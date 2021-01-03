<template>
<div>
    <div style="background-color: #F5F5EB;display:flex;justify-content:space-between;align-items:center">
        <div style="padding:5px;border-left:5px solid #fc0;padding-left:10px;">赛程</div>
        <el-date-picker
        v-model="time"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        :editable = "false"
        :clearable = "false"
        @change="changeTime"/>
    </div>
    <div style="padding:2px" :style="{'background-color':index%2==0?'#fff':'#f7f7f7'}" v-for="(item,index) in matches" :key="item.id">
        <router-link :to="'/match/'+item.id">
        <team-match-box :match="item"  style="width:100%;height:60px"/>
        </router-link>
    </div>
    <div class="loadmore">
        <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="loadMatches">
            <span v-if="loading"><i class="el-icon-loading"></i>加载中</span>
            <span v-else >点击加载更多<i class="el-icon-arrow-down"/></span></el-link>
        <div v-else style="color:#fc0;text-align:center">没有更多了</div>
    </div>
</div>
</template>

<script>
import {pageMatches} from '@/api/match'
import TeamMatchBox from './TeamMatchBox.vue';
export default {
  components: { TeamMatchBox },
    data(){
        return {
            time: new Date(),
            matches :[],
            cur: 0,
            pageSize:10,
            total:1,
            loading: false,
        }
    },
    mounted() {
        this.loadMatches();
    },
    methods:{
        loadMatches(){
            if(this.disabled) return;
            this.loading = true
            this.cur++;
            pageMatches({pageNum:this.cur,pageSize:this.pageSize,start : this.$moment(this.time).format("YYYY/MM/DD HH:mm:ss"),teamId : this.$route.params.id})
            .then((res)=>{
                if(res.code == 200){
                    var temp = res.data.records;
                    this.total = res.data.total;
                    this.matches = this.matches.concat(temp);
                }else{this.cur--;}
            })
            this.loading = false
        },
        changeTime(){
            this.cur = 1;
            pageMatches({pageNum:this.cur,pageSize:this.pageSize,start : this.$moment(this.time).format("YYYY/MM/DD HH:mm:ss")})
            .then((res)=>{
                if(res.code == 200){
                    this.total = res.data.total;
                    this.matches = res.data.records;;
                }
            })
        },
    },
    computed: {
      noMore () {
        return this.matches.length >= this.total
      },
      disabled () {
        return this.loading || this.noMore
      }
    },

}
</script>

<style>

</style>