<template>
  <div>
      <diamond-title dname="关注我们"/>
      <div class="main">
        <div class="info_box" v-for="(info,index) in infos" :key='index'>
            <div class="type">{{info.type}}</div>
            <el-popover v-if="info.qrCode"
                placement="left"
                width="200"
                trigger="hover">
                <el-image style="width: 200px; height: 200px" :src="info.qrCode" fit="cover"></el-image>
                <!-- <el-image slot="reference" style="width: 60px; height: 60px" :src="info.img" fit="cover"></el-image> -->
                <div  slot="reference" style="width:60px;font-size:60px"><svg class="icon" aria-hidden="true"><use :xlink:href="info.icon"></use></svg></div>
                
            </el-popover>
            <!-- <el-image v-else style="width: 60px; height: 60px" :src="info.img" fit="cover"></el-image> -->
            <svg v-else class="icon" aria-hidden="true"><use :xlink:href="info.icon"></use></svg>
                <!-- <i class="iconfont" :class="info.icon"></i> -->

            <div class="way">
                <el-link v-if="info.url" :href="info.url" target="_blank">{{info.name}}</el-link>
                <div v-else>{{info.name}}</div>
                <div v-if="info.extra">{{info.extra}}</div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import DiamondTitle from '../common/DiamondTitle.vue'
export default {
    components: {DiamondTitle },
    data() {
        return {
            infos : [
                {
                    type : "QQ",
                    name : "重庆邮电大学经管足球队",
                    extra : "1805279152 / QID:cquptjgxq",
                    icon : "#icon-QQ",
                    qrCode : require("../../assets/qr-qq.png"),
                },
                {
                    type : "bilibili",
                    name : "经管雄起",
                    url : "https://space.bilibili.com/383597807",
                    icon : "#icon-bilibili",
                    qrCode : require("../../assets/qr-bilibili.png"),
                },
                {
                    type : "邮箱",
                    name : "jgxq@foxmail.com",
                    url : "http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=XzwuKi8rcjU4OTwfLi5xPDAy",
                    extra : "cqupt-jgfc@qq.com",
                    icon : "#icon-youxiang"
                }
            ]
        }
    },
}
</script>

<style scoped>
    .way{
        color: #666;
        font-size: 12px;
        margin-left: 10px;
    }
    .main{
        height:250px;
        width:100%;
        background-color:#fff;
        margin-top:10px;
        padding:10px;
    }
    .type{
        width: 60px;
        font-weight: bold;
    }
    .info_box{
        display: flex;
        height: 80px;
        align-items: center;
    }
    svg{
        width: 60px;
        height: 60px;
    }
</style>