<template>
  <div class="main">
    <div class="container">
      <div>
        <a href="/home"><div class="title">经管雄起</div></a>
        <div class="desc">重邮经管的足球论坛</div>
        <el-form v-loading="loading" @submit.native.prevent :model="user" ref="regForm" :rules="rules">
          <el-form-item prop="email">
            <el-input v-model="user.email" placeholder="请输入电子邮箱" prefix-icon="el-icon-message" clearable/>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input v-model="user.verificationCode" placeholder="请输入验证码" prefix-icon="el-icon-key" clearable>
              <el-button :loading="b_loading" slot="append" @click="sendCode" :disabled="disabled">{{codeInfo}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="输入密码" v-model="user.password" show-password prefix-icon="el-icon-lock" clearable/>
          </el-form-item>
          <el-form-item  prop="checkpass">
            <el-input placeholder="再次输入密码" v-model="user.checkpass" show-password prefix-icon="el-icon-lock" clearable/>
          </el-form-item>
          <el-form-item  prop="nickName">
            <el-input placeholder="请输入姓名" v-model="user.nickName" prefix-icon="el-icon-user" clearable/>
          </el-form-item>
          <el-form-item><el-button native-type="submit" type="primary" @click="register" style="width:100%;margin:10px 0">注册</el-button></el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {validateEmail,validatePass,validateVerCode} from "@/utils/validateInput"
import {getCode,userRegister} from '@/api/register'
export default {
  name: 'JGReg',
  data () {
    var validatePassConfirm = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
      } else {
          callback();
      }
    };
    return {
      user:{
        nickName : "",
        email : "",
        verificationCode : "",
        password : "",
        checkpass : "",
      },
      codeInfo : "获取验证码",
      disabled : false,
      loading : null,
      b_loading : false,

      rules: {
        email : [{validator:validateEmail,trigger:'blur'}],
        password : [{validator:validatePass, trigger: 'blur' },],
        checkpass : [{validator:validatePassConfirm, trigger: 'blur' },],
        verificationCode : [{validator:validateVerCode, trigger: 'blur' },],
        nickName : [{required: true, message: '昵称不能为空哦'}]
      }
    }
  },
  methods:{
    sendCode(){
      if(this.b_loading||this.desabled) return;
      this.$refs['regForm'].validateField('email',(valid) => {
        if(!valid){
          this.b_loading = true;
          getCode(this.user.email).then((res)=>{
            if(res.code==200){
              if(res.data){
                this.codeInfo = 60;
                this.$message({
                    message: '验证码发送成功',
                    type: 'success'
                });
                this.disabled = true
                var si = setInterval(()=>{
                  this.codeInfo--;
                  if(this.codeInfo<=0){
                    clearInterval(si);
                    this.codeInfo = "获取验证码"
                    this.disabled = false;
                  }
                },1000)
              }else{
                this.$message({
                    message: res.msg,
                    type: 'warning'
                });
              }
              this.disabled = false;
            }
            this.b_loading = false;
          }).catch((err)=>{
            this.b_loading = false;
          })
        }else{
          return false;
        }
      });
    },
    register(){
      this.$refs['regForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          userRegister(this.user).then((res)=>{
            console.log(res);
            if(res.code==200){
              this.$message({
                message: '注册成功,快去登陆吧!',
                type: 'success'
              });
              this.$router.replace("/login");
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
            this.loading = false;
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  background-image: linear-gradient(to bottom right,#f6d365, #fda085);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  margin-top:-101px ;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.container{
  width: 480px;
  min-height: 500px;
  margin-top: 15vh;
  background-color: #fff;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0 0 50px rgba(255,204,0,0.6);
  padding: 30px 50px 0 50px;
}
.title{
  text-align: center;
  font-size: 24px;
  margin: 20px 0;
}
.desc{
  font-size: 16px;
  color: #999;
  text-align: center;
  margin: 20px 0;
}


</style>