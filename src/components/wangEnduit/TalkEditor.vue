<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar">
      <div style="position:absolute;right:5px;top:2px">
        <el-button @click="submit" type="primary" round size="medium">发布</el-button>
      </div>
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import { BaseUrl } from '@/constants/index'
import {emojis} from './emoji.js'
  import E from 'wangeditor'
  export default {
    name: 'editoritem',
    data() {
      return {
        // uploadPath,
        editor: null,
        info_: null
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = null
        }
      },
      value: function(value) {
        if (value !== this.editor.txt.html()) {
          this.editor.txt.html(this.value)
        }
      }
      //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    },
    mounted() {
      this.seteditor();
      this.editor.txt.html(this.value)
    },
    methods: {
      submit(){
        this.$emit("submit")
      },
      seteditor() {
        // http://192.168.2.125:8080/admin/storage/create
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        // 兼容老版本
        let config = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
        config.uploadImgShowBase64 = false // base 64 存储图片
        config.uploadImgServer = BaseUrl + '/file/img/upload/talkimg'// 配置服务器端地址
        config.uploadImgHeaders = {
          "Access-Control-Allow-Origin": '*',
          // "Content-Type" :"multipart/form-data;charset=UTF-8"
        }// 自定义 header
        config.uploadFileName = 'file' // 后端接受上传文件的参数名
        config.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
        config.uploadImgMaxLength = 1 // 限制一次最多上传 1 张图片
        config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
        config.customAlert = (info)=>{
          // info 是需要提示的内容
          // this.$message({
          //   message: info,
          //   type: 'warning'
          // });
        }
        config.placeholder = '说点什么吧···';
        config.withCredentials = true

        // 配置菜单
        config.menus = [
          'underline', // 下划线
          'strikeThrough', // 删除线
          'link', // 插入链接
          'emoticon', // 表情
          'image', // 插入图片
          'video', // 插入视频
          'undo', // 撤销
          'redo', // 重复
          'fullscreen' // 全屏
        ]
        config.emotions = emojis;
        config.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
            this.$message({
                message: '插入图片失败',
                type: 'warning'
            });
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
            this.$message({
                message: '图片上传成功',
                type: 'success'
            });
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
            this.$message({
                message: '网络超时',
                type: 'warning'
            });
          },
          
          error: (xhr,resData)=>{
            var code = xhr.status;
            // 图片上传错误的回调
            if(code == '401'){
              this.$message({
                  message: '请先登陆再操作',
                  type: 'warning'
              });
              this.$router.push('/login')
            }else{
              this.$message({
                  message: '图片上传错误',
                  type: 'warning'
              });
            }
          },
          customInsert: (insertImg, result, editor) => {
            // 图片上传成功，插入图片的回调
            //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
            // console.log(result.data[0].url)
            //insertImg()为插入图片的函数
             //循环插入图片
            // for (let i = 0; i < 1; i++) {
              // console.log(result)
              let url = this.$utils.url2img(result.data);
              insertImg(url)
            // }
          }
        }
        config.onchange = (html) => {
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create()
      }
    }
  }
</script>

<style scoped>
  .editor {
    width: 100%;
    margin: 0 auto;
    margin-bottom : 20px;
    position: relative;
    z-index: 0;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  }
  .toolbar {
    border-bottom: 1px solid #f7f7f7;
    background-color: #fcfcfc;
  }
  .text {
    /* border: 1px solid #ccc; */
    min-height: 200px;
  }
</style>