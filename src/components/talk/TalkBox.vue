<template>
  <div class="main">
    <div class="info">
        <el-avatar :size="60" 
        :src="'http://localhost:6800/images/'+talk.author.headImage" 
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
                <div><el-link :underline="false" @click="thumb(talk.hit)" :style="{'color':talk.hit.thumb?'#fc0':'#666'}"><i class="iconfont icon-zan"></i></el-link>{{talk.hit.thumbs}}</div>
                <div><el-link :underline="false" @click="doComment"><i class="el-icon-chat-dot-round"/></el-link>{{talk.hit.comments}}</div> 
            </div>
            <div v-if="talk.author.userkey === user.userkey"><el-link :underline="false" @click="deleteTalk()"><i class="el-icon-delete"/></el-link></div>
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
            <comment-box :comment="item" :user="user"/>
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
import CommentBox from '../common/CommentBox.vue';
export default {
components:{CommentBox,},
props:{
    talk : Object,
    user : Object
},
methods: {
    thumb(hit){
        hit.thumb=!hit.thumb;
    },
    doComment(){
        this.commentBox = !this.commentBox;
    },
    submitComment(){
        console.log(this.comment);
        this.comment = "";
    },
    deleteTalk(){
        console.log("删除");
    },
    loadingComment(){
        console.log("加载评论");
        this.cur++;
        var com = [{
                "id": 1,
                "userkey": {
                    "userkey": "SmArTkEy",
                    "nickName": "小聪明",
                    "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg",
                    "city": "贵州 安顺",
                    "createAt": "2020-12-23T13:19:07.000+00:00",
                    "homeTeam": {
                        "id": 1,
                        "name": "重邮经管",
                        "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
                    }
                },
                "hits": {
                    "thumbs": 1,
                    "comments": 0,
                    "thumb": true
                },
                "content": "我是第一条评论",
                "createAt": "2020-12-23T06:07:28.000+00:00"
            },
            {
                "id": 2,
                "userkey": {
                    "userkey": "SmArTkEy",
                    "nickName": "小聪明",
                    "headImage": "images/jgxq/headimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg",
                    "city": "贵州 安顺",
                    "createAt": "2020-12-13T13:19:07.000+00:00",
                    "homeTeam": {
                        "id": 1,
                        "name": "重邮经管",
                        "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
                    }
                },
                "hits": {
                    "thumbs": 0,
                    "comments": 4,
                    "thumb": false
                },
                "content": "我是第二条评论",
                "createAt": "2020-12-13T06:08:26.000+00:00"
            }];
        this.comments = this.comments.concat(com);
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