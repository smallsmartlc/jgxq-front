<template>
  <div class="main">
    <div class="info">
        <router-link :to="`/user/${comment.userkey.userkey}`">
        <el-avatar :size="60" 
        :src="$utils.url2img(comment.userkey.headImage)" 
        fit="cover"
        style="background:transparent;"
        ></el-avatar></router-link>
    </div>
    <div class="text">
        <div class="name">
            <div style="display:flex;align-items:center">
                <div style="font-weight:bold;font-size:20px">{{comment.userkey.nickName}}&nbsp;</div>
                <el-image v-if="comment.userkey.homeTeam" style="width:20px;height:20px;"
                :src="$utils.url2img(comment.userkey.homeTeam.logo)"
                fit="cover"/>
            </div>
            <div style="font-size:12px;color:#666">{{fromNowStr(comment.createAt)}}</div>
        </div>
        <div style="width:100%;color:#666;font-size:12px;height:24px;align-items:center;display:flex;">{{comment.userkey.city}}</div>
        <div class="message" v-html="comment.content"></div>
        <div class="interact">
            <div style="display:flex;">
                <div><el-link :underline="false" @click="thumb" :style="{'color':comment.hits.thumb?'#fc0':'#666'}"><i class="iconfont icon-zan"></i></el-link>{{comment.hits.thumbs}}</div>
                <div><el-link :underline="false" @click="doComment"><i class="el-icon-chat-dot-round"/></el-link></div>
            </div>
            <div v-if="comment.userkey.userkey === user.userkey">
                <el-popconfirm cancel-button-type="warning" @confirm="deleteComment" title="确定要删除这条评论吗?">   
                    <el-link slot="reference" :underline="false"><i 
                class="el-icon-delete"/></el-link>
                </el-popconfirm>
            </div>
        </div>
        <div v-if="replyBox" class="comment">
            <el-input
                :placeholder="'回复 '+comment.userkey.nickName+'：'"
                v-model="reply"
                style="flex-grow:1;margin-right:20px"
                clearable>
            </el-input>
            <el-button type="primary" @click="submitComment">评论</el-button>
        </div>
        <div v-for="item in replys" :key="item.id" style="width:100%">
            <reply-box @delete="deleteReply(item.id)" :reply="item" :user="user"/>
        </div>
        <div class="reply"  v-if="replys.length<total">
            <el-link :underline="false" @click="loadingComment">
                <span v-if="cur<1">共{{total}}条回复</span>
                <span v-else>查看更多回复</span>
                <i class="el-icon-arrow-right"></i>
            </el-link>
        </div>
    </div>
  </div>
</template>

<script>
import {commentObj,pageReply,deleteComment} from '@/api/comment'
import {thumbById} from '@/api/hit'
import ReplyBox from './ReplyBox.vue';
export default {
components:{ReplyBox},
props:{
    comment : Object,
    user : Object,
},
data() {
    return {
        replys : [],
        reply : "",
        replyBox : false,
        cur : 0,
        pageSize:10,
        total: this.comment.hits.comments
    }
},
methods: {
    thumb(){
        thumbById(2,this.comment.id).then((res)=>{
            if(res.code == 200){
                if(res.data){
                    this.comment.hits.thumb = true;
                    this.comment.hits.thumbs++;
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
        this.replyBox = !this.replyBox;
    },
    submitComment(){
        if(this.reply.length<1){
                return;
            }
        var commentReq = {
            type : this.comment.type,
            objectId : this.comment.objectId,
            content : this.reply,
            parentId : this.comment.id,
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
                this.content = "";
                this.$message({
                    message: '评论成功',
                    type: 'success'
                });
                this.replys.unshift(temp);
                this.total++;
            }
        })
        
        this.reply = "";
    },
    deleteComment(){
        deleteComment(this.comment.id).then((res)=>{
            if(res.code == 200){
                if(res.data==true){
                    this.$message({
                        message: '已删除',
                        type: 'success'
                    });
                    this.$emit('delete');
                }else{this.$message({
                        message: '删除失败,评论不存在',
                        type: 'warning'
                    });}
            }
        })
    },
    loadingComment(){
        this.cur++;
        pageReply(this.comment.id,this.cur,this.pageSize).then((res)=>{
            if(res.code == 200){
                var temp = res.data.records;
                this.total = res.data.total
                this.replys = this.replys.concat(temp);
            }else{this.cur--};
        })
    },
    deleteReply(id){
        this.replys = this.replys.filter(r=>r.id!=id);
        this.total--;
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
}
</script>

<style scoped>
.reply{
    margin-bottom: 10px;
    width: 100%;
}
.comment{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.main{
    display: flex;
    background-color: #FCFCF2;
    border-bottom: 1px solid #E6E4DC;
    padding: 10px;
    padding-right: 20px;
}
.info{
    width:80px;
    display:flex;
    justify-content:center;
    align-items:top;
    min-height: 100px;
    margin-right: 10px;
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
}
.interact{
    padding-top:10px;
    padding-bottom: 10px;
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