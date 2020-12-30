<template>
    <div class="infos">
        <div class="info-title" :style="{'height':height}"><div style="margin:auto 0">{{title}}</div></div>
        <div class = "info" :style="{'height':height}" v-for="(item, index) in items" :key="index">
            <div style="color:#666;margin:auto 0;margin-right:10px">{{item.name}}</div>
            <div style="margin:auto 0">{{item.value}}</div>
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
        height : String
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
        height: 20px;
        display: flex;
        font-size: 12px;
        margin: auto 0;
        padding-left: 10px;
        padding: 4px;
        border-bottom:1px solid #E6E4DC;
    }
</style>