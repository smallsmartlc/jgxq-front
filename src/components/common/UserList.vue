<template>
    <div>
        <div class="box" v-for="user in users" :key="user.userkey">
            <div class="left">
                <div style="margin-right:20px">
                    <a :href="`/user/${user.userkey}`">
                    <el-avatar :size="80" 
                    :src="$utils.url2img(user.headImage)" 
                    fit="cover"
                    style="background:transparent;"
                    ></el-avatar>
                    </a>
                </div>
                <div>
                    <div style="font-size:24px">{{user.nickName}}</div>
                    <div style="color:#666;font-size:16px">来自{{user.city}}</div>
                </div>
            </div>
            <div class="right">
                <el-button @click="focusOther(user)" :style="user.focus?{}:bStyle" :icon="user.focus?'el-icon-check':'el-icon-plus'">{{user.focus?'已关注':'关注'}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {focusUser} from '@/api/user'
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
methods: {
    focusOther(user){
      focusUser(user.userkey,user.focus).then((res)=>{
        if(res.code == 200){
          if(res.data == true){
              var str = user.focus?"取消关注成功":"关注成功!";
              this.$message({
                  message: str,
                  type: 'success'
              });
              user.focus = !user.focus
          }else{
              var str = user.focus?"取消关注失败":"已关注"
              this.$message({
                  message: str,
                  type: 'warning'
              });
          }
        }
      })
    }
},
computed : {

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