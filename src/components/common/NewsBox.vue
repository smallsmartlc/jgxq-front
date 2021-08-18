<template>
    <div>
        <div class = "news-box">
            <div class="title_box" :style="{'max-width':titleWidth}">
                <span class="news-title jg-line-2">{{news.title}}</span>
                <div v-if="news.comments!=null" class="bottom">
                    <span :style="{'font-size':fontSize}" v-if="top" class="top">置顶</span>
                    <i :style="{'font-size':iconSize}" class="el-icon-chat-dot-round"/>
                    <span :style="{'font-size':fontSize}" >{{news.comments>999?"999+":news.comments}}</span>
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
            default : 'medium',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['medium', 'small', 'mini'].indexOf(value) !== -1
            }
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
            }else if (this.size == "mini"){
                return "230px"
            }
            return "600px";
        },
        imgSize(){
            if(this.size == "medium"){
                return "80px"
            }else if (this.size == "mini"){
                return "60px"
            }
            return "80px";
        },
        fontSize(){
            if(this.size == "medium"){
                return "16px"
            }else if (this.size == "small"){
                return "14px"
            }else if (this.size == "mini"){
                return "12px"
            }
            return "16px";
        },
        iconSize(){
            if(this.size == "medium"){
                return "20px"
            }else if (this.size == "small"){
                return "18px"
            }else if (this.size == "mini"){
                return "16px"
            }
            return "20px";
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
    .title_box .bottom{
        color:#666660;
        font-size:0;/* 去除子标签的空隙 */
    }
    .title_box .top{
        color: #fc0;
        margin: 0 8px;
    }
</style>