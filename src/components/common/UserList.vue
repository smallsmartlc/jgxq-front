<template>
    <div>
        <div class="box" v-for="user in users" :key="user.userkey">
            <div class="left">
                <div style="margin-right:20px">
                    <el-avatar :size="80" 
                    :src="img(user.headImage)" 
                    fit="cover"
                    style="background:transparent;"
                    ></el-avatar>
                </div>
                <div>
                    <div style="font-size:24px">{{user.nickName}}</div>
                    <div style="color:#666;font-size:16px">来自{{user.city}}</div>
                </div>
            </div>
            <div class="right">
                <el-button :style="user.focus?{}:bStyle" :icon="user.focus?'el-icon-check':'el-icon-plus'">{{user.focus?'已关注':'关注'}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { imgUrl } from '@/constants/index'
export default {
data() {
    return {
        bStyle : {
            'border-color' : '#fc0',
            'color' : '#fc0'
        }
    }
},
props : {
    users : Array,
},
computed : {
img(){
    return (url)=>{
    return imgUrl + url;
    }
}
}
}
</script>

<style scoped>
.left{
    display: flex;
    align-items: center;
}
.box{
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>