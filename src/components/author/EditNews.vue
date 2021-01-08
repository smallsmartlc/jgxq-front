<template>
  <el-form v-loading="loading" class="newsEditor" :model="newsReq" :rules="rules" ref="newsForm">
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
      <el-form-item  label='发布时间'>
        <el-date-picker
        v-model="newsReq.createAt"
        type="datetime"
        readonly
        value-format = "timestamp">
        </el-date-picker>
      </el-form-item>
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
          :key="index"
          v-for="(tag,index) in newsReq.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
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
        suffix-icon="el-icon-search"
        :fetch-suggestions="querySearch"
        placeholder="搜索标签"
        popper-class = "input_popper"
        :trigger-on-focus="false"
        @select="handleSelect">
          <template slot-scope="{ item }">
            <div><img :src="$utils.url2img(item.logo)" style="height:16px;vertical-align: middle;"><span style="font-size:12px">{{ item.name }}</span></div>
            <!-- <span class="addr">{{ item.address }}</span> -->
          </template>
        </el-autocomplete>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitNews('newsForm')" round>修改</el-button>
        <el-button @click="centerDialogVisible = true" round plain>预览</el-button>
        <el-dialog
          title="预览"
          :visible.sync="centerDialogVisible"
          width="50%"
          center>
          <news-preview  :news="newsReq"/>
        </el-dialog>
      </el-form-item>
    </div>
  </div>
  </el-form>
</template>

<script>
import NewsEditor from '../wangEnduit/NewsEditor.vue'
import NewsPreview from '../common/NewsPreview.vue'
import { BaseUrl } from '@/constants/index'
import {searchTag} from '@/api/search'
import {userAddNews} from '@/api/news'
export default {
  components: { NewsEditor, NewsPreview, },
  data() {
    return {
      newsReq:{},
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
      centerDialogVisible : false,
      loading:false,
    }
  },
  mounted() {
    
  },
  methods: {
    submitNews(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          userAddNews(this.newsReq).then((res)=>{
            this.newsReq = {};
            this.$message.success("发布成功")
            this.loading = false;
            this.$router.replace('/center/author')
          }).catch((err)=>{
            this.loading = false;
          })
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
    handleClose(tag) {
      this.newsReq.tags = this.newsReq.tags.filter(n=>(n.type!=tag.type || n.objectId != tag.objectId));
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    querySearch(queryString, cb){
      searchTag(queryString).then((res)=>{
        var resdata = res.data;
        cb(resdata);
      })
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
  .newsEditor .info_box{
    /* padding: 20px 0; */
    background-color:#fff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
  .input_popper{
    width: 180px!important;
  }
</style>
<style scoped>

  .input-new-tag{
    width: 100px;
  }
  
</style>