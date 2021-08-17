<template>
    <div>
        <div class = "news-box">
            <div class="title_box" :style="{'max-width':titleWidth}">
                <span class="news-title jg-line-2">{{news.title}}</span>
                <div v-if="news.comments!=null" style="color:#666660;" :class="size">
                    <span v-if="top" class="top">置顶</span><i class="el-icon-chat-dot-round"/><span>{{news.comments>999?"999+":news.comments}}</span>
                </div>
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
        top : {
            type : Boolean,
            default : false,
        },
        size : {
            type : String,
            default : 'medium'
        }
    },
    computed : {
        dateDiff(){
            return function(timeStr){
               var time = new Date(timeStr)
                return new Date()-time; 
            }
        },
        titleWidth(){
            if(this.size == "medium"){
                return "600px"
            }else if (this.size = "mini"){
                return "230px"
            }
            return "600px";
        },
        imgSize(){
            if(this.size == "medium"){
                return "80px"
            }else if (this.size = "mini"){
                return "60px"
            }
            return "80px";
        }
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
    .title_box .top{
        color: #fc0;
        margin: 0 8px;
    }
    .title_box .medium{
        font-size: 16px;
    }
    .title_box .mini{
        font-size: 12px;
    }
    .title_box .medium i{
        font-size: 20px;
    }
    .title_box .mini i{
        font-size: 16px;
    }
</style>