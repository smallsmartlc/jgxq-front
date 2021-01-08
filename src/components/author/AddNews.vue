<template>
  <el-form class="newsEditor" :model="newsReq" :rules="rules" ref="newsForm">
  <div style="width:800px;margin: 0 auto;">
    <div class="info_box">
      <el-form-item prop="title">
        <el-input
        type="text"
        placeholder="输入标题"
        v-model="newsReq.title"
        maxlength="64"
        show-word-limit/></el-form-item>
      <el-form-item prop="text"><news-editor v-model="newsReq.text"/></el-form-item>
    </div>
    <div class="info_box" style="padding:20px">
      <el-form-item label='封面' prop="cover">
        <el-upload
          class="cover-uploader"
          :action="uploadImgUrl"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :with-credentials = "true"
          :before-upload="beforeCoverUpload">
          <img v-if="newsReq.cover" :src="$utils.url2img(newsReq.cover)" class="cover">
          <i v-else class="el-icon-plus cover-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label='标签'>
        <el-tag
          style="margin:5px"
          :key="tag.id"
          v-for="tag in newsReq.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag.id)"
          effect="plain">
          <img :src="$utils.url2img(tag.logo)" style="height:18px;vertical-align: middle;">
          <span class="name">{{ tag.name }}</span>
        </el-tag>
        <el-autocomplete
        class="input-new-tag"
        v-if="inputVisible"
        v-model="keyword"
        ref="saveTagInput"
        size="small"
        :fetch-suggestions="querySearch"
        placeholder="搜索标签"
        :trigger-on-focus="false"
        @select="handleSelect">
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
            <!-- <span class="addr">{{ item.address }}</span> -->
          </template>
        </el-autocomplete>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item  label='定时发布'>
        <el-date-picker
        v-model="newsReq.createAt"
        type="datetime"
        value-format = "timestamp"
        placeholder="选择发布时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item><el-button type="primary" @click="submitNews('newsForm')">提交</el-button></el-form-item>
    </div>
  </div>
  </el-form>
</template>

<script>
import NewsEditor from '../wangEnduit/NewsEditor.vue'
import { BaseUrl } from '@/constants/index'
export default {
  components: { NewsEditor },
  data() {
    return {
      newsReq:{
        "title" : "",
        "cover" : "",
        "text" : "",
        "tags" : [],
        "createAt" : null,
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { max: 64, message: '标题最多64个字', trigger: 'blur' }
        ],
        text : [{required: true, message: '内容不少于20个字'},{'min': 20, message: '内容不少于20个字', trigger: 'blur'}],
        cover : [{required: true, message: '必须上传封面'}]
      },
      inputVisible : false,
      keyword : "",
    }
  },
  methods: {
    submitNews(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCoverSuccess(res, file){
      this.newsReq.cover = res.data;
    },
    beforeCoverUpload(file) {
      var typeList = ['image/jpeg','image/jpg','image/png','image/bmp','image/gif','image/GIF','image/JPG','image/PNG']
      const isIMG = typeList.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMG) {
        this.$message.error('上传封面格式不正确!');
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!');
      }
      return isIMG && isLt2M;
    },
    handleClose(id) {
      this.newsReq.tags = this.newsReq.tags.filter(n=>n.id!=id);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    querySearch(queryString, cb){
      // todo: 搜索的方法
      var res = [
        {
          "id" : 10,
          "type" : 0,
          "objectId" : 1,
          "name" : "很厉害",
          "logo" : "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
        },
        {
          "id" : 11,
          "type" : 0,
          "objectId" : 1,
          "name" : "有点厉害",
          "logo" : "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
        },
        {
          "id" : 12,
          "type" : 0,
          "objectId" : 1,
          "name" : "特别厉害",
          "logo" : "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png"
        },
      ]
      cb(res);
    },
    handleSelect(item) {
      this.newsReq.tags.push(item);
    },
  },
  computed:{
    uploadImgUrl(){
      return BaseUrl + '/file/img/upload/cover'
    }
  }
}
</script>

<style>
  .newsEditor .cover-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .newsEditor .cover-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .newsEditor .cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .newsEditor .cover {
    width: 100px;
    height: 100px;
    display: block;
  }
  .info_box{
    /* padding: 20px 0; */
    background-color:#fff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
  .input-new-tag{
    width: 120px;
  }
</style>