<template>
    <div>
        <div class="title">
            <diamond-title dname="比赛信息"/>
            <div class="block">
                <el-date-picker
                v-model="time"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                :editable = "false"
                :clearable = "false"
                @change="changeTime"
                >
                </el-date-picker>
            </div>
        </div>
        <div class="dynamic infinite-list-wrapper"  style="overflow:auto">
            <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                <match-group :matches="matches" class="list"></match-group>
                <p v-if="loading"><page-loading/></p>
                <p v-if="noMore"><no-more/></p>
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
        time: new Date(),
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
         matches : [],
      };
    },
    computed: {
      noMore () {
        return this.matches.length >= this.total
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
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
        load () {
            this.loading = true
            this.cur++;
            pageMatches({pageNum:this.cur,pageSize:this.pageSize,start : this.$moment(this.time).format("YYYY/MM/DD HH:mm:ss")})
            .then((res)=>{
                if(res.code == 200){
                    var temp = res.data.records;
                    this.total = res.data.total;
                    this.matches = this.matches.concat(temp);
                }else{this.cur--;}
            })
            this.loading = false
        }
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