<template>
    <div>
        <div class="title">
            <diamond-title dname="比赛信息"/>
            <div class="block">
                <el-date-picker
                v-model="time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :editable = "false"
                @change="changeTime"
                >
                </el-date-picker>
            </div>
        </div>
        <div style="margin-bottom : 30px">
            <div>
                <match-group :matches="matches"></match-group>
                <p v-if="loading"><page-loading/></p>
                <p v-if="noMore"><no-more/></p>
                <!-- <div class="loadmore">
                    <el-link v-if="!noMore" style="width:100%" :underline="false" type="primary" @click="load">
                        <span v-if="loading"><i class="el-icon-loading"></i>加载中</span>
                        <span v-else >点击加载更多<i class="el-icon-arrow-down"/></span></el-link>
                    <div v-else style="color:#fc0;text-align:center">没有更多了</div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import {pageMatches} from '@/api/match'
import DiamondTitle from '../common/DiamondTitle.vue'
import MatchBoxBasic from '../common/MatchBoxBasic.vue';
import MatchList from '../home/MatchList.vue';
import MatchGroup from './MatchGroup.vue';
import PageLoading from '../common/PageLoading.vue'
import NoMore from '../common/NoMore.vue'
export default {
  components: { DiamondTitle, MatchList, MatchGroup, MatchBoxBasic,PageLoading,NoMore },
     data() {
      return {
        cur: 0,
        pageSize:10,
        total : 1,
        loading: false,
        time: null,
        matchDownList : [],
        matchUpList:[],
      };
    },
    computed: {
        noMore () {
            return this.matchDownList.length >= this.total
        },
        disabled () {
            var val = this.loading || this.noMore;
            this.$emit("update:disabled",val);
            return val
        },
        matches(){
            return this.time?this.matchDownList:[...this.matchUpList,...this.matchDownList]
        },
        start(){
            return this.time?this.$moment(this.time).format("YYYY/MM/DD HH:mm:ss"):null;
        }
    },
    mounted() {
        this.load().then(()=>{
            if(this.matchDownList.length < 1){
                this.loadUp();
            }
        });
    },
    watch: {
        disabled(newVal, oldVal) {
            this.$emit("disabled",newVal);
        }
    },
    methods: {
        changeTime(){
            this.cur = 1;
            pageMatches({pageNum:this.cur,pageSize:this.pageSize,start : this.start})
            .then((res)=>{
                if(res.code == 200){
                    this.total = res.data.total;
                    this.matchDownList = res.data.records;
                }
            })
        },
        async load () {
            if(this.disabled) return;
            this.loading = true
            this.cur++;
            await pageMatches({pageNum:this.cur,pageSize:this.pageSize,start : this.start})
            .then((res)=>{
                if(res.code == 200){
                    var temp = res.data.records;
                    this.total = res.data.total;
                    this.matchDownList = this.matchDownList.concat(temp);
                }else{this.cur--;}
                this.loading = false
            })
        },
        loadUp() {
            pageMatches({
                    pageNum: 1,
                    pageSize: 10,
                    past: true
                })
                .then((res) => {
                    if (res.code == 200) {
                        var temp = res.data.records;
                        this.matchUpList = temp.reverse();
                    }
                })
        },
    },
}
</script>

<style scoped>
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>