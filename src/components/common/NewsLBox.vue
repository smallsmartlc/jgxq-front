<template>
    <div>
        <div class = "news-box">
            <el-image
                style="margin-right:20px"
                :style="{'width':imgSize,'height':imgSize,'min-width':imgSize}"
                :src="$utils.url2img(news.cover)"
                fit="cover"></el-image>
            <div class="title_box">
                <span class="news-title" :style="{'width':width}">{{news.title}}</span>
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
    }

}
</script>

<style scoped>
    .news-title{
        overflow:hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 230px;
        font-size: 16px;
    }
    .news-box{
        font-weight: 500;
        display: flex;
        align-items:top;
        padding: 6px;
        box-sizing: border-box;
        height: 100%;
    }
</style>