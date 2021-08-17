<template>
    <el-row>
        <el-col :span="16">
            <div class="main">
                <div style="margin-top:10px;">
                  <ul>
                      <li  v-for="item in news" :key="item.id" style="background-color:#fff;border-bottom:1px solid #E6E4DC;padding:10px">
                        <router-link :to="'/news/'+item.id">
                          <news-box :news='item' style="width:100%;height:100px"></news-box>
                        </router-link>
                      </li>
                  </ul>
                  <p v-if="nloading"><page-loading/></p>
                  <p v-if="nnoMore"><no-more/></p>
              </div>
            </div>
        </el-col>
        <el-col :span="6" :offset="2">
            <div class="main">
                <div style="padding:5px;color:#909399;font-size:14px">球队/球员</div>
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
                <div class="loadmore">
                    <el-link v-if="!tnoMore" style="width:100%" :underline="false" type="primary">
                        <span v-if="tloading"><i class="el-icon-loading"></i>加载中</span>
                        <span v-else  @click="pageTag">更多<i class="el-icon-arrow-down"/></span></el-link>
                    <div v-else style="color:#fc0;text-align:center">没有更多了</div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {pageNews} from '@/api/news'
import {pageTag} from '@/api/search.js'
import NewsBox from './common/NewsBox.vue'
import PageLoading from './common/PageLoading.vue'
import NoMore from './common/NoMore.vue'
export default {
components:{NewsBox, PageLoading, NoMore},
data() {
    return {
        keyword : null,
        tcur : 0,
        tsize : 10,
        ttotal : 1,
        tloading: false,
        tag : [],
        ncur : 0,
        nsize : 10,
        ntotal : 1,
        news : [],
        nloading: false,
        
    }
},
mounted() {
    var keyword = this.$route.query.keyword;
    if(this.$utils.isEmpty(keyword)){
        this.$router.push("/")
    }
    this.keyword = keyword;
    this.pageTag();
    // this.load_scoll();
},
methods: {
    pageTag(){
        this.tloading = true
        this.tcur ++;
        pageTag(this.tcur,this.tsize,this.keyword).then((res) => {
            if(res.code == 200){
                var temp = res.data.records;
                this.ttotal = res.data.total
                this.tag = this.tag.concat(temp);
            }else this.tcur--;
            this.tloading = false
        })
    },
    load_scoll () {
      this.nloading = true
      this.ncur ++;
      pageNews(this.ncur,this.nsize,{keyword : this.keyword}).then((res) => {
        if(res.code == 200){
            var temp = res.data.records;
            this.ntotal = res.data.total
            this.news = this.news.concat(temp);
        }else this.ncur--;
        this.nloading = false
      })
    }
},
watch: {
    ndisabled(newVal, oldVal) {
        this.$emit("disabled",newVal);
    }
},
computed: {
    tnoMore () {
      return this.tag.length >= this.ttotal
    },
    tdisabled () {
      var val = this.tloading || this.tnoMore;
      return val;
    },
    nnoMore () {
      return this.news.length >= this.ntotal
    },
    ndisabled () {
      var val = this.nloading || this.nnoMore;
      return val;
    }
}
}
</script>

<style scoped>
.main{
    background-color: #fff;
}
.tagbox{
    display:flex;
    align-items:center;
    background-color:#fcfcfc;
    padding:10px;
    border-bottom: 1px solid #f2f2f2;
}
.tagbox div{
    margin-right: 10px;
}
</style>