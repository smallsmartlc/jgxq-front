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
                <el-image style="width:20px;height:20px;"
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
                <el-image style="width:20px;height:20px;"
                    :src="'http://localhost:6800/images/'+reply.reply.userkey.homeTeam.logo"
                    fit="cover"/>
            </div>
            <div style="color:#666">{{reply.reply.content}}</div>
        </div>
        <div class="interact">
            <div style="display:flex;">
                <div><el-link :underline="false" @click="thumb(reply)" :style="{'color':reply.thumb?'#fc0':'#666'}"><i class="iconfont icon-zan"></i></el-link>{{reply.thumbs}}</div>
                <div><el-link :underline="false" @click="doComment"><i class="el-icon-chat-dot-round"/></el-link></div>
            </div>
            <div v-if="reply.userkey.userkey === user.userkey"><el-link :underline="false" @click="deleteTalk()"><i class="el-icon-delete"/></el-link></div>
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
export default {
props:{
    reply : Object,
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
        console.log(this.replytxt);
        this.replytxt = "";
    },
    deleteTalk(){
        console.log("删除");
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