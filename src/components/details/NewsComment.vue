<template>
  <div class="main jg-shadow-box">
      <div class="comment_input">
        <el-input
        type="textarea"
        placeholder="发表你的评论"
        :autosize="{ minRows: 2, maxRows: 8}"
        resize = "none"
        maxlength="140"
        show-word-limit
        v-model="content">
        </el-input>
        <div style="text-align:right;margin-top:20px"><el-button @click="commentNews" size="small" type="primary" round>发表</el-button></div>
      </div>
      <div>
        <div v-for="item in comments" :key="item.id" class="comment_item">
            <comment-box @delete="deleteComment(item.id)" :comment="item" :user="user"/>
        </div>
      </div>
      <div class="loadmore">
        <el-link v-if="comments.length<total" :underline="false" type="primary" @click="loadingComment">点击加载更多评论<i class="el-icon-arrow-down"/></el-link>
        <span v-else style="color:#fc0">没有更多了</span>
      </div>
  </div>
</template>

<script>
import {pageComment} from '@/api/news'
import {commentObj} from '@/api/comment'
import CommentBox from '../common/CommentBox.vue'
export default {
    components: { CommentBox },
    mounted() {
        this.loadingComment();
    },
    data() {
        return {
            content:"",
            comments : [],
            commentBox : false,
            cur : 0,
            pageSize:10,
            total:0,
        }
    },
    props : {
        user : Object,
    },
    methods: {
        loadingComment(){
            this.cur++;
            pageComment(this.$route.params.id,this.cur,this.pageSize).then((res)=>{
                if(res.code == 200){
                var temp = res.data.records;
                this.total = res.data.total
                this.comments = this.comments.concat(temp);
                }else this.cur--;
            })
        },
        commentNews(){
            if(this.content.length<1){
                return;
            }
            var commentReq = {
                type : 0,
                objectId : this.$route.params.id,
                content : this.content
            }
            commentObj(commentReq).then((res)=>{
                if(res.code == 200){
                    var temp = {
                        id : res.data,
                        userkey : this.user,
                        "hits": {
                            "thumbs": 0,
                            "comments": 0,
                            "thumb": false
                        },
                        "content":commentReq.content,
                        objectId : this.$route.params.id,
                        type : 0,
                        "createAt" : new Date(),
                    }
                    this.content = "";
                    this.$message({
                        message: '评论成功',
                        type: 'success'
                    });
                    this.comments.unshift(temp);
                    this.total++;
                }
            })
        },
        deleteComment(id){
            this.comments = this.comments.filter(c=>c.id!=id)
            this.total--;
        }
    },
}
</script>

<style scoped>
.main{
    background-color: #fff;
}
.loadmore{
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.comment_input{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 40px;
}
.comment_item{
    padding: 16px;
}
</style>