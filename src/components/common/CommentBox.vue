<template>
  <div class="main">
    <div class="info">
        <el-avatar :size="60" 
        :src="'http://localhost:6800/images/'+comment.userkey.headImage" 
        fit="cover"
        style="background:transparent;"
        ></el-avatar>
    </div>
    <div class="text">
        <div class="name">
            <div style="display:flex;align-items:center">
                <div style="font-weight:bold;font-size:20px">{{comment.userkey.nickName}}&nbsp;</div>
                <el-image style="width:20px;height:20px;"
                :src="'http://localhost:6800/images/'+comment.userkey.homeTeam.logo"
                fit="cover"/>
            </div>
            <div style="font-size:12px;color:#666">{{fromNowStr(comment.createAt)}}</div>
        </div>
        <div style="width:100%;color:#666;font-size:12px;height:24px;align-items:center;display:flex;">{{comment.userkey.city}}</div>
        <div class="message" v-html="comment.content"></div>
        <div class="interact">
            <div style="display:flex;">
                <div><el-link :underline="false" @click="thumb(comment.hits)" :style="{'color':comment.hits.thumb?'#fc0':'#666'}"><i class="iconfont icon-zan"></i></el-link>{{comment.hits.thumbs}}</div>
                <div><el-link :underline="false" @click="doComment"><i class="el-icon-chat-dot-round"/></el-link></div>
            </div>
            <div v-if="comment.userkey.userkey === user.userkey"><el-link :underline="false" @click="deleteTalk()"><i class="el-icon-delete"/></el-link></div>
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
            <reply-box :reply="item" :user="user"/>
        </div>
        <div class="reply"  v-if="replys.length<comment.hits.comments">
            <el-link :underline="false" @click="loadingComment">
                <span v-if="cur<1">共{{comment.hits.comments}}条回复</span>
                <span v-else>查看更多回复</span>
                <i class="el-icon-arrow-right"></i>
            </el-link>
        </div>
    </div>
  </div>
</template>

<script>
import ReplyBox from './ReplyBox.vue';
export default {
components:{ReplyBox},
props:{
    comment : Object,
    user : Object
},
methods: {
    thumb(hit){
        hit.thumb=!hit.thumb;
    },
    doComment(){
        this.replyBox = !this.replyBox;
    },
    submitComment(){
        console.log(this.reply);
        this.reply = "";
    },
    deleteTalk(){
        console.log("删除");
    },
    loadingComment(){
        console.log("加载评论");
        this.cur++;
        var temp = [
            {
                "id": 3,
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
                "thumbs": 1,
                "thumb": false,
                "content": "第二条评论的第一条回复",
                "createAt": "2020-12-13T06:08:39.000+00:00",
                "reply": null
            },
            {
                "id": 4,
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
                "thumbs": 0,
                "thumb": false,
                "content": "我回复了第二条评论的第一条回复",
                "createAt": "2020-12-13T06:09:00.000+00:00",
                "reply": {
                    "id": 3,
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
                    "hits": null,
                    "content": "第二条评论的第一条回复",
                    "createAt": "2020-12-13T06:08:39.000+00:00"
                }
            },
            {
                "id": 5,
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
                "thumbs": 0,
                "thumb": false,
                "content": "第二条评论的第2条回复",
                "createAt": "2020-12-14T02:50:50.000+00:00",
                "reply": null
            },
            {
                "id": 6,
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
                "thumbs": 0,
                "thumb": false,
                "content": "我也回复了第二条评论的第三条回复",
                "createAt": "2020-12-14T02:53:33.000+00:00",
                "reply": {
                    "id": 3,
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
                    "hits": null,
                    "content": "第二条评论的第一条回复",
                    "createAt": "2020-12-13T06:08:39.000+00:00"
                }
            }
        ];
        this.replys = this.replys.concat(temp);
    }
},
data() {
    return {
        replys : [],
        reply : "",
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