<template>
  <el-dialog
    v-loading = "loading"
    title="上传头像"
    :visible.sync="visible"
    :before-close="close"
    width="500px">
    <div style="display:flex">
        <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :fixed = "true"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :high="option.high"
        :infoTrue="option.infoTrue"
        @realTime="realTime"
        @imgLoad="imgLoad"
        @cropMoving="cropMoving"
        :enlarge="option.enlarge">
        </vueCropper>

        <div class="pre preview_container">
            <section class="pre-item" title="zoom: (100 / previews.w)">
                <div :style="previewStyle3"> 
                    <div class="preview" :style="previews.div">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
            </section>
        </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
            <label class="btn" for="uploads">上传图片</label> 图片大小限制2M
            <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)" ref="uploadImg">
        </div>
        <div>
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="commitImg">确 定</el-button>
        </div>
    </div>
    </el-dialog>
</template>

<script>
import axios from 'axios'
import {BaseUrl} from "@/constants";
import { VueCropper }  from 'vue-cropper' 
import { userUploadImg }  from '@/api/img' 
export default {
    components: {
        VueCropper,
    },
    props : {
        visible:Boolean,
        imgtype : String,
    },
    data() {
        return {
            loading:false,
            option: {
                img: "",
                size: 1,
                full: false,
                outputType: "png",
                canMove: true,
                fixed : true,
                fixedBox: false,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 200,
                autoCropHeight: 150,
                centerBox: true,
                high: false,
                cropData: {},
                        enlarge: 1,
                mode: 'contain',
                maxImgSize: 3000,
                limitMinSize: [100, 120]
            },
            previews: {},
            previewStyle1: {},
            previewStyle2: {},
            previewStyle3: {
                "width" : "100px!important",
                "height" : "100px"
            },
            previewStyle4: {},
        }
    },
    methods:{
        close(){
            this.$emit("close")
        },
        uploadImg(e, num) {
            //上传图片
            // this.option.img
            var file = e.target.files[0];
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
                return false;
            }
            var reader = new FileReader();
            reader.onload = e => {
            let data;
            if (typeof e.target.result === "object") {
                // 把Array Buffer转化为blob 如果是base64不需要
                data = window.URL.createObjectURL(new Blob([e.target.result]));
            } else {
                data = e.target.result;
            }
            if (num === 1) {
                this.option.img = data;
            } else if (num === 2) {
                this.example2.img = data;
            }
            this.$refs.uploadImg.value = ''
            };
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file);
        },
        realTime(data) {
            var previews = data;
            var h = 0.5;
            var w = 0.2;
            this.previewStyle1 = {
                width: previews.w + "px",
                height: previews.h + "px",
                overflow: "hidden",
                margin: "0",
                zoom: h
            };
            this.previewStyle2 = {
                width: previews.w + "px",
                height: previews.h + "px",
                overflow: "hidden",
                margin: "0",
                zoom: w
            };
            this.previewStyle3 = {
                width: previews.w + "px",
                height: previews.h + "px",
                overflow: "hidden",
                margin: "0",
                zoom: (100 / previews.w)
            };
            this.previewStyle4 = {
                width: previews.w + "px",
                height: previews.h + "px",
                overflow: "hidden",
                margin: "0",
                zoom: (100 / previews.h)        
            };
                this.previews = data;
        },
        imgLoad(msg) {
        //加载图片钩子
        },
        cropMoving(data) {
        this.option.cropData = data;
        },
        commitImg(){
            if(this.option.img === ''){
                this.$message({
                    type : "warning",
                    message : "未选择图片"
                })
                return;
            }
            this.$refs.cropper.getCropBlob((data)=>{
                if (data.size/1024/1024 > 5) {
                  this.$message.info('图片上传不能超过5M')
                  return false;
                }
                let files = new window.File([data], "temp.png")
                let param = new FormData()
                param.append('file', files)
                userUploadImg(param,this.imgtype).then((res)=>{
                    if (res.code==200) {
                        this.$message({
                            "type" : 'success',
                            message : "图片上传成功"
                        })
                        this.$emit("success",res.data);
                    }
                })
            })
            
        }
    }
    
}
</script>

<style>
.vue-cropper{
    height:300px!important;
    width:300px!important;
}
</style>
<style scoped>
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #fc0;
  border-color: #fc0;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
}
.preview{
    border-radius:50%;
    overflow:hidden;
    background-color:#fff;
}
.preview_container{
    background-color:#f6f6f6;
    border:1px solid #e5e5e5;
    height: 100px;
    width: 100px;
    margin: 0 20px ;
}
</style>