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
        @change="changeTime"/>
    </div>
    <div style="padding:2px" :style="{'background-color':index%2==0?'#fff':'#f7f7f7'}" v-for="(item,index) in matches" :key="item.id">
        <router-link :to="'/match/'+item.id">
        <team-match-box :match="item"  style="width:100%;height:60px"/>
        </router-link>
    </div>
    <div class="loadmore">
        <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="loadDown">
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
            time: null,
            matchDownList :[],
            matchUpList:[],
            cur: 0,
            pageSize:10,
            total:1,
            loading: false,
        }
    },
    mounted() {
        this.loadDown().then(()=>{
            if(this.matchDownList.length < 1){
                this.loadUp();
            }
        });
    },
    methods:{
        async loadDown(){
            if(this.disabled) return;
            this.loading = true
            this.cur++;
            await pageMatches({pageNum:this.cur,pageSize:this.pageSize,start : this.start,teamId : this.$route.params.id})
            .then((res)=>{
                if(res.code == 200){
                    var temp = res.data.records;
                    this.total = res.data.total;
                    this.matchDownList = this.matchDownList.concat(temp);
                }else{this.cur--;}
            })
            this.loading = false
        },
        loadUp() {
            pageMatches({
                    pageNum: 1,
                    pageSize: 10,
                    past: true,
                    teamId : this.$route.params.id
                })
                .then((res) => {
                    if (res.code == 200) {
                        var temp = res.data.records;
                        this.matchUpList = temp.reverse();
                    }
                })
        },
        changeTime(){
            this.cur = 1;
            pageMatches({pageNum:this.cur,pageSize:this.pageSize,start : this.start,teamId : this.$route.params.id})
            .then((res)=>{
                if(res.code == 200){
                    this.total = res.data.total;
                    this.matchDownList = res.data.records;;
                }
            })
        },
    },
    computed: {
        noMore () {
            return this.matchDownList.length >= this.total
        },
        disabled () {
            return this.loading || this.noMore
        },
        matches(){
            return this.time?this.matchDownList:[...this.matchUpList,...this.matchDownList]
        },
        start(){
            return this.time?this.$moment(this.time).format("YYYY/MM/DD HH:mm:ss"):null;
        }
    },

}
</script>

<style>

</style>