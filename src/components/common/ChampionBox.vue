<template>
    <div class="infos">
        <div class="info-title" ><div style="margin:auto 0">{{title}}</div></div>
        <div class = "info" v-for="(item, index) in items" :key="index">
            <div style="text-align:center;font-size:16px;font-weight:bold;">{{item.name}}<span style="font-size:20px;margin:0 5px">{{item.time.length}}</span>个</div>
            <div class = "c-boxes">
                <div class="c-box" v-for="(time,i2) in item.time" :key = "index + '-' +i2">
                    <div style="color:#fc0;font-size:50px"><i class="el-icon-trophy-1"></i></div>
                    <div style="margin:auto 0">{{time}}</div>
                </div>
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
        title : String,
        items : Array,
    },
    computed : {
    }

}
</script>

<style scoped>
    .infos{
        width:100%;
    }
    .info-title{
        height: 20px;
        background-color:#f7f7f7;
        padding : 2px;
        padding-left: 10px;
        color:#666;
        font-size: 14px;
        display: flex;
    }
    .info{
        
        margin: auto 0;
        padding-left: 10px;
        width: 100%;
        box-sizing : border-box;
        padding: 10px;
        border-bottom:1px solid #E6E4DC;
    }
    .c-boxes{
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
    }
    .c-box{
        margin: 0 5px;
    }
</style>