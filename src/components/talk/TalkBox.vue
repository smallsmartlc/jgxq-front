<template>
<div>
    <div class="main">
        <div class="info">
            <router-link :to="`/user/${talk.author.userkey}`">
            <el-avatar :size="50" 
            :src="$utils.url2img(talk.author.headImage)" 
            fit="cover"
            style="background:transparent;"
            ></el-avatar>
            </router-link>
        </div>
        <div class="text">
            <div class="name">
                <div style="font-weight:bold;font-size:16px">{{talk.author.nickName}}</div>
                <div style="font-size:12px;color:#939393">{{fromNowStr(talk.createAt)}}</div>
            </div>
            <router-link style="width:100%" :to="`/talk/${talk.id}`">
                <div class="message" style="width:100%" v-html="richText" @click.capture="showImg($event)"></div>
            </router-link>
            <div class="img-list">
                <el-image v-for="url in imgList" :key="url"
                    class="img"
                    :src="url" 
                    fit = "cover"
                    :preview-src-list="imgList">
                </el-image>
            </div>
        </div>
    </div>
    <div class="interact">
        <div class="i-toolbar">
            <div class="i-button"><span class="link" :class="talk.hit.thumb?'active':''" @click="thumb"><i class="iconfont icon-zan"></i></span>{{talk.hit.thumbs}}</div>
            <div class="i-button"><span class="link" @click="doComment"><i class="el-icon-chat-dot-round"/></span>{{talk.hit.comments}}</div> 
        </div>
        <div v-if="user && talk.author.userkey === user.userkey">
            <el-popconfirm cancel-button-type="warning" @confirm="deleteTalk" title="确定要删除这条内容吗?">   
                <el-link slot="reference" :underline="false"><i class="el-icon-delete"/></el-link>
            </el-popconfirm>
        </div>
    </div>
    <div style="margin-bottom:20px" v-if="commentBox">
        <div class="comment">
            <div style="margin-left:5px">
                <el-avatar :size="40" 
                :src="$utils.url2img(this.user.headImage)" 
                fit="cover"
                style="background:transparent;"
                ></el-avatar>
            </div>
            <el-input
                placeholder="发表你的评论"
                v-model="comment"
                style="margin:0 10px;"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 8}"
                resize = "none"
                maxlength="140"
                show-word-limit
                clearable >
            </el-input>
            <div style="height:40px"><el-button type="primary" @click="submitComment">评论</el-button></div>
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
    <el-divider></el-divider>
</div>
</template>

<script>
import {checkUser} from '@/api/login'
import {pageComment,deleteTalk} from '@/api/talk'
import {thumbById} from '@/api/hit'
import {commentObj} from '@/api/comment'
import CommentBox from '../common/CommentBox.vue';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
components:{CommentBox,ElImageViewer},
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
        if(this.user == null){
            this.$message.error("登录后才能评论哦!")
            return;
        }
        this.commentBox = !this.commentBox;
        if(this.comments.length<1 && this.talk.hit.comments > 0){
            this.loadingComment();
        }
    },
    submitComment(){
        if(this.comment.length<1){
            return;
        }
        var commentReq = {
            type : 1,
            objectId : this.talk.id,
            content : this.comment,
            target : this.talk.author.userkey,
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
    },
    showImg(e){
        console.log(e)
        if(e.target.tagName == "IMG"){
            e.preventDefault()
            this.urlList = [e.target.currentSrc]
            this.showViewer = true;
            return false;
        }
    },
    getImgSrc(richtext) {
        
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
    },
    richText(){
        // 对富文本进行处理
        return this.talk.text.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
            this.imgList.push(capture);
            return "";
        });
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
        showViewer : false,
        imgList:[]
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
    margin-bottom: 20px;
}
.main{
    background-color: #fff;
    display: flex;
    /* padding: 10px; */
}
.info{
    width:60px;
    display:flex;
    justify-content:center;
    align-items:top;
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
    flex-direction: column;
    justify-content: space-around;
    flex-grow:1;
    height:50px;
}
.interact{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.link{
    cursor: pointer;
}
.link.active{
    color: #fc0;
}
.message{
    width: 100%;
}
.interact .i-toolbar{
    display: flex;
    height: 40px;
    margin: 10px 0;
}
.interact .i-toolbar .i-button{
    width: 170px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
}
.interact i{
    font-size: 20px;
    padding: 4px;
    border-radius: 50%;
}
.interact .i-button:hover{
    color: #fc0;
}
.interact .i-button:hover i{
    /* color : #fc0!important; */
    background-color: #fffae6;
}
.img-list{
    width:100%;
    display: flex;
    flex-wrap: wrap;
}
.img-list .img{
    width: 160px;
    height: 160px;
    margin: 0.1em;
    border-radius: 8px;
    transition-duration: 0.2s;
}
.img-list .img:hover{
    transform: scale(1.05);
    opacity:0.6;
}
</style>
<style>
.message iframe{
    width: 600px;
    height: 400px;
}
.w-e-text img{
    max-width: 300px!important;
    height: auto;
}
</style>