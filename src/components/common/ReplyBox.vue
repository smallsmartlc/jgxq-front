<template>
  <div class="main-reply">
    <!-- <div class="info">
        <router-link :to="`/user/${reply.userkey.userkey}`">
        <el-avatar :size="60" 
        :src="$utils.url2img(reply.userkey.headImage)" 
        fit="cover"
        style="background:transparent;"
        ></el-avatar>
        </router-link>
    </div> -->
    <div class="text">
        <div class="name">
            <router-link style="color: #fc0;" :to="`/user/${reply.userkey.userkey}`">{{reply.userkey.nickName}}</router-link>
            <router-link v-if="reply.userkey.homeTeam" :to="`/team/${reply.userkey.homeTeam.id}`">
            <el-image style="width:20px;height:20px;vertical-align: middle;"
                :src="$utils.url2img(reply.userkey.homeTeam.logo)"
                fit="cover"/></router-link>
            <span v-if="reply.reply!=null">回复<router-link style="color: #fc0;" :to="`/user/${reply.reply.userkey.userkey}`">@{{reply.userkey.nickName}}</router-link></span>
            <span class="message" v-html="`:${reply.content}`"></span>
        </div>
        <div class="interact_wrap">
            <div>{{fromNowStr(reply.createAt)}}&nbsp;{{reply.userkey.city}}</div>
            <div class="interact">
                <div class="i-button"><span class="link" @click="thumb" :style="{'color':reply.thumb?'#fc0':'#666'}"><i class="iconfont icon-zan"></i></span>{{reply.thumbs}}</div>
                <div class="i-button"><span class="link" @click="replyBox=true"><i class="el-icon-chat-dot-round"/></span></div>
                <div class="i-button" v-if="user && reply.userkey.userkey === user.userkey">
                    <el-popconfirm cancel-button-type="warning" @confirm="deleteReply" title="确定要删除这条评论吗?">   
                        <span slot="reference" class="link"><i 
                    class="el-icon-delete"/></span>
                    </el-popconfirm>
                </div>
            </div>
        </div>
        <el-dialog
            :title="`回复@${reply.userkey.nickName}`"
            :visible.sync="replyBox"
            custom-class="comment_dialog"
            width="600px">
            <div>
                <el-input
                    :placeholder="`回复 ${reply.userkey.nickName}：`"
                    v-model="replytxt"
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
import {thumbById} from '@/api/hit'
import {commentObj,deleteComment}  from '@/api/comment'
export default {
props:{
    reply : Object,
    user : Object,
},
methods: {
    thumb(){
        thumbById(2,this.reply.id).then((res)=>{
            if(res.code == 200){
                if(res.data){
                    this.reply.thumb = true;
                    this.reply.thumbs++;
                }else{
                    this.$message({
                        message: '您已经赞过了',
                        type: 'warning'
                    });
                }
            }
        })
    },
    submitComment(){
        if(this.replytxt.length<1){
                return;
            }
        var commentReq = {
            type : this.reply.type,
            objectId : this.reply.objectId,
            content : this.replytxt,
            parentId : this.reply.parentId,
            replyId : this.reply.id,
            target : this.reply.userkey.userkey,
        }
        commentObj(commentReq).then((res)=>{
            if(res.code == 200){
                if(res.data){
                    this.$message({
                        message: '评论成功',
                        type: 'success'
                    });
                    var temp={
                        id:res.data,
                        content:this.replytxt,
                        objectId : this.reply.objectId,
                        reply : this.reply,
                        parentId : this.reply.parentId,
                        thumb: false,
                        thumbs: 0,
                        type: this.reply.type,
                        userkey : this.user,
                    }
                    this.replyBox = false;
                    this.$emit("reply",temp);
                    this.replytxt = ""
                }
            }
        })
    },
    deleteReply(){
        deleteComment(this.reply.id).then((res)=>{
            if(res.code == 200){
                if(res.data==true){
                    this.$message({
                        message: '已删除',
                        type: 'success'
                    });
                    this.$emit('delete');
                }
            }
        })
    }
},
data() {
    return {
        replytxt : "",
        replyBox : false,
        cur : 0,
        pageSize:10,
        
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
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.main-reply{
    display: flex;
    background-color: #fff;
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
}.link{
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
.main-reply:hover .interact{
    opacity: 1;
}
.interact{
    display: flex;
    flex-direction: row-reverse;
    padding-top:10px;
    padding-bottom: 10px;
    width: 100px;
    opacity: 0;
    transition-duration: 0.2s;
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