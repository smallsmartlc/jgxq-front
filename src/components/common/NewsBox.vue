<template>
    <div>
        <div class = "news-box">
            <div class="title_box" :style="{'max-width':width}">
                <span class="news-title jg-line-2">{{news.title}}</span>
                <div v-if="news.comments!=null" style="color:#666660"><i class="el-icon-chat-dot-round"/><span style="font-size:10px">{{news.comments>999?"999+":news.comments}}</span></div>
            </div>
            <div :style="{'width':imgSize}">
                <el-image
                :style="{'width':imgSize,'height':imgSize}"
                :src="$utils.url2img(news.cover)"
                fit="cover"></el-image>
            </div>
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