<template>
  <div class="main">
    <div class="info">
        <el-avatar :size="60" 
        :src="'http://localhost:6800/images/'+reply.userkey.headImage" 
        fit="cover"
        style="background:transparent;"
        ></el-avatar>
    </div>
    <div class="text">
        <div class="name">
            <div style="display:flex;align-items:center">
                <div style="font-weight:bold;font-size:20px">{{reply.userkey.nickName}}&nbsp;</div>
                <el-image v-if="reply.userkey.homeTeam" style="width:20px;height:20px;"
                    :src="'http://localhost:6800/images/'+reply.userkey.homeTeam.logo"
                    fit="cover"/>
            </div>
            <div style="font-size:12px;color:#666">{{fromNowStr(reply.createAt)}}</div>
        </div>
        <div style="width:100%;color:#666;font-size:12px;height:24px;align-items:center;display:flex;">{{reply.userkey.city}}</div>
        <div class="message" v-html="reply.content"></div>
        <div v-if="reply.reply!=null" style="background-color:#f2f2f2;width:100%;padding:10px;box-sizing:border-box">
            <div style="display:flex;align-items:center;margin-bottom:10px;">
                <div style="">{{reply.reply.userkey.nickName}}&nbsp;</div>
                <el-image v-if="reply.reply.userkey.homeTeam" style="width:20px;height:20px;"
                    :src="'http://localhost:6800/images/'+reply.reply.userkey.homeTeam.logo"
                    fit="cover"/>
            </div>
            <div style="color:#666">{{reply.reply.content}}</div>
        </div>
        <div class="interact">
            <div style="display:flex;">
                <div><el-link :underline="false" @click="thumb" :style="{'color':reply.thumb?'#fc0':'#666'}"><i class="iconfont icon-zan"></i></el-link>{{reply.thumbs}}</div>
                <div><el-link :underline="false" @click="doComment"><i class="el-icon-chat-dot-round"/></el-link></div>
            </div>
            <div v-if="reply.userkey.userkey === user.userkey">
                <el-popconfirm cancel-button-type="warning" @confirm="deleteReply" title="确定要删除这条回复吗?">
                    <el-link slot="reference" :underline="false"><i class="el-icon-delete"/></el-link>
                </el-popconfirm>    
            </div>
        </div>
        <div v-if="replyBox" class="reply">
            <el-input
                :placeholder="'回复 '+reply.userkey.nickName+'：'"
                v-model="replytxt"
                style="flex-grow:1;margin-right:20px"
                clearable>
            </el-input>
            <el-button type="primary" @click="submitComment">评论</el-button>
        </div>
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
    commentId : Number,
    objType : Number,
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
    doComment(){
        this.replyBox = !this.replyBox;
    },
    submitComment(){
        if(this.replytxt.length<1){
                return;
            }
        var commentReq = {
            type : this.objType,
            objectId : this.$route.params.id,
            content : this.replytxt,
            parentId : this.commentId,
            replyId : this.reply.id,
        }
        commentObj(commentReq).then((res)=>{
            if(res.code == 200){
                if(res.data){
                    this.$message({
                        message: '评论成功',
                        type: 'success'
                    });
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
.main{
    display: flex;
    background-color: #F5F5EB;
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