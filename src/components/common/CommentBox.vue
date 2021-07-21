<template>
  <div class="main">
    <div class="info">
        <router-link :to="`/user/${comment.userkey.userkey}`">
        <el-avatar :size="40" 
        :src="$utils.url2img(comment.userkey.headImage)" 
        fit="cover"
        style="background:transparent;"
        ></el-avatar></router-link>
    </div>
    <div class="text">
        <div class="name">
            <span style="color: #fc0;">{{comment.userkey.nickName}}</span>
            <router-link v-if="comment.userkey.homeTeam"  :to="`/team/${comment.userkey.homeTeam.id}`">
            <el-image style="width:20px;height:20px;vertical-align: middle;"
            :src="$utils.url2img(comment.userkey.homeTeam.logo)"
            fit="cover"/></router-link>
            <span class="message" v-html="`:${comment.content}`"></span>
        </div>
        <div class="interact_wrap">
            <div>{{fromNowStr(comment.createAt)}}&nbsp;{{comment.userkey.city}}</div>
            <div class="interact">
                <div class="i-button"><span class="link" @click="thumb" :style="{'color':comment.hits.thumb?'#fc0':'#666'}"><i class="iconfont icon-zan"></i></span>{{comment.hits.thumbs}}</div>
                <div class="i-button"><span class="link" @click="doComment"><i class="el-icon-chat-dot-round"/></span></div>
                <div class="i-button" v-if="user && comment.userkey.userkey === user.userkey">
                    <el-popconfirm cancel-button-type="warning" @confirm="deleteComment" title="确定要删除这条评论吗?">   
                        <span slot="reference" class="link"><i 
                    class="el-icon-delete"/></span>
                    </el-popconfirm>
                </div>
            </div>
        </div>
        <div class="reply_wrap">
            <div v-for="item in replys" :key="item.id" style="width:100%">
                <reply-box @reply="addReply"  @delete="deleteReply(item.id)" :reply="item" :user="user"/>
            </div>
            <div class="reply"  v-if="replys.length<total">
                <el-link :underline="false" @click="loadingComment">
                    <span v-if="cur<1">共{{total}}条回复</span>
                    <span v-else>查看更多回复</span>
                    <i class="el-icon-arrow-down"></i>
                </el-link>
            </div>
        </div>
        <el-dialog
            :title="`回复@${comment.userkey.nickName}`"
            :visible.sync="replyBox"
            custom-class="comment_dialog"
            width="600px">
            <div>
                <el-input
                    :placeholder="`回复 ${comment.userkey.nickName}：`"
                    v-model="reply"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 8}"
                    resize = "none"
                    maxlength="140"
                    show-word-limit
                    clearable >
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" round @click="submitComment"><b>回复</b></el-button>
            </span>
        </el-dialog>
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
        cur : 0,
        pageSize:10,
        total: this.comment.hits.comments,
        replyBox : false
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
        this.replyBox = true;
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
            target : this.comment.userkey.userkey,
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
                this.replys.push(temp);
                this.total++;
            }
        })
        this.replyBox = false;
        this.reply = "";
    },
    addReply(obj){
        this.replys.push(obj);
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
.reply_wrap{
    position: relative;
    padding-left: 10px;
    width: 100%;
}
.reply_wrap:before {
    content: "";
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 0;
    border-left: 2px solid #f2f2f2;
}
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
    padding: 5px 0;
    font-size: 14px;
    width: 100%;
}
.text{
    display: flex;
    align-items: center;
    flex-grow:1;
    flex-direction: column;
}
.name{
    width: 100%;
    line-height: 24px;
}
.link{
    cursor: pointer;
}
.interact_wrap{
    color:#939393;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
}
.interact{
    display: flex;
    flex-direction: row-reverse;
    padding-top:10px;
    padding-bottom: 10px;
    width: 100px;
}
.interact .i-button{
    margin-right: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
}
.interact .i-button:hover{
    color:#fc0;
}
.interact i{
    font-size: 20px;
    padding: 4px;
    border-radius: 50%;
}
.interact .i-button:hover i{
    color : #fc0;
    background-color: #fffae6;
}

</style>
<style>
.el-dialog.comment_dialog{
    border-radius: 10px;
    color: #000;
}
</style>