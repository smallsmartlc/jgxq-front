<template>
  <div class="main">
    <div class="info">
        <el-avatar :size="60" 
        :src="$utils.url2img(talk.author.headImage)" 
        fit="cover"
        style="background:transparent;"
        ></el-avatar>
    </div>
    <div class="text">
        <div class="name">
            <div style="font-weight:bold;font-size:20px">{{talk.author.nickName}}</div>
            <div style="font-size:12px;color:#666">{{fromNowStr(talk.createAt)}}</div>
        </div>
        <router-link style="width:100%" :to="`/talk/${talk.id}`">
        <div class="message" style="width:100%" v-html="talk.text"></div>
        </router-link>
        <div class="interact">
            <div style="display:flex;">
                <div><el-link :underline="false" @click="thumb" :style="{'color':talk.hit.thumb?'#fc0':'#666'}"><i class="iconfont icon-zan"></i></el-link>{{talk.hit.thumbs}}</div>
                <div><el-link :underline="false" @click="doComment"><i class="el-icon-chat-dot-round"/></el-link>{{talk.hit.comments}}</div> 
            </div>
            <div v-if="talk.author.userkey === user.userkey">
                <el-popconfirm cancel-button-type="warning" @confirm="deleteTalk" title="确定要删除这条内容吗?">   
                    <el-link slot="reference" :underline="false"><i class="el-icon-delete"/></el-link>
                </el-popconfirm>
            </div>
        </div>
        <div v-if="commentBox" class="comment">
            <el-input
                placeholder="发表你的评论"
                v-model="comment"
                style="flex-grow:1;margin-right:20px"
                clearable>
            </el-input>
            <el-button type="primary" @click="submitComment">评论</el-button>
        </div>
        <div v-for="item in comments" :key="item.id" style="width:100%">
            <comment-box  @delete="deleteComment(item.id)" :objType="1" :comment="item" :user="user"/>
        </div>
        <div class="reply" v-if="comments.length<talk.hit.comments">
            <el-link :underline="false" @click="loadingComment">
                <i class="el-icon-arrow-down"></i>
                <span v-if="cur<1">点击查看评论</span>
                <span v-else>查看更多评论</span>
            </el-link>
        </div>
    </div>
  </div>
</template>

<script>
import {pageComment,deleteTalk} from '@/api/talk'
import {thumbById} from '@/api/hit'
import {commentObj} from '@/api/comment'
import CommentBox from '../common/CommentBox.vue';
export default {
components:{CommentBox,},
props:{
    talk : Object,
    user : Object
},
methods: {
    thumb(){
        thumbById(1,this.talk.id).then((res)=>{
            if(res.code == 200){
                if(res.data){
                    this.talk.hit.thumb = true;
                    this.talk.hit.thumbs++;
                }else{
                    this.$message({
                        message: '您已经赞过了',
                        type: 'warning'
                    });
                }
            }
        })
    },
    doComment(){
        this.commentBox = !this.commentBox;
    },
    submitComment(){
        if(this.comment.length<1){
            return;
        }
        var commentReq = {
            type : 1,
            objectId : this.talk.id,
            content : this.comment,
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
                    objectId : commentReq.objectId,
                    type : commentReq.type,
                    "content":commentReq.content,
                    "createAt" : new Date(),
                }
                this.comment = "";
                this.$message({
                    message: '评论成功',
                    type: 'success'
                });
                this.comments.unshift(temp);
                this.talk.hit.comments++;
            }
        })
    },
    deleteTalk(){
        deleteTalk(this.talk.id).then((res)=>{
            if(res.code==200){
                if(res.data==true){
                    this.$message({
                        message: '已删除',
                        type: 'success'
                    });
                    this.$emit('delete');
                }else{
                    this.$message({
                        message: '删除失败,内容不存在',
                        type: 'warning'
                    });}
            }else{

            }
        });
        console.log("删除");
    },
    deleteComment(id){
      this.comments = this.comments.filter(c=>c.id!=id)
      this.total--;
    },
    loadingComment(){
        this.cur++;
        pageComment(this.talk.id,this.cur,this.pageSize).then((res)=>{
            if(res.code == 200){
            var temp = res.data.records;
            this.total = res.data.total
            this.comments = this.comments.concat(temp);
            }else this.cur--;
        })
    }
},
computed : {
    fromNowStr(){
        return (time)=>{
            var now = this.$moment();
            var temp =  this.$moment(time);
            if((now-temp) > (3*24*3600*1000)){
                return temp.format('MM-DD HH:mm');
            }else{
                return temp.fromNow();
            }
        }
    }
},
data() {
    return {
        comments : [],
        comment : "",
        commentBox : false,
        cur : 0,
        pageSize:10,
        total : 1,
    }
},
}
</script>

<style scoped>
.reply{
    margin-bottom: 10px;
}
.comment{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.main{
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #f2f2f4;
    /* padding: 10px; */
}
.info{
    width:60px;
    display:flex;
    justify-content:center;
    align-items:top;
    min-height: 100px;
    margin-right: 20px;
    border-bottom: 1px solid #f2f2f4;
}
.text{
    display: flex;
    align-items: center;
    flex-grow:1;
    flex-direction: column;
}
.name{
    width: 100%;
    display: flex;
    justify-content : space-between;
    align-items: center;
    flex-grow:1;
    height:40px;
}
.interact{
    padding-top:20px;
    padding-bottom: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.message{
    width: 100%;
}
.interact i{
    font-size: 20px;
}
.interact i:hover{
    color : #fc0!important;
}
</style>