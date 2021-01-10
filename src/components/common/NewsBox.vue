<template>
    <div>
        <div class = "news-box">
            <div class="title_box">
                <span class="news-title" :style="{'width':width}">{{news.title}}</span>
                <div style="color:#666660"><i class="el-icon-chat-dot-round"/><span style="font-size:10px">{{news.comments>999?"999+":news.comments}}</span></div>
            </div>
            <el-image
                :style="{'width':imgSize,'height':imgSize}"
                :src="$utils.url2img(news.cover)"
                fit="cover"></el-image>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            
        }
    },
    props : {
        news : Object,
        imgSize : String,
        width :String,
    },
    computed : {
        dateDiff(){
            return function(timeStr){
               var time = new Date(timeStr)
                return new Date()-time; 
            }
            
        },
    }

}
</script>

<style scoped>
    .title_box{
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        height:100%;
        box-sizing: border-box;
    }
    .news-title{
        vertical-align: middle;
        overflow:hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 230px;
    }
    .news-box{
        font-weight: 500;
        display: flex;
        justify-content:space-between;
        align-items: center;
        padding: 6px;
        box-sizing: border-box;
        height: 100%;
    }
</style>