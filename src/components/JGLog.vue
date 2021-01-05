<template>
  <div class="main">
    <div class="container">
      <div>
        <a href="/home"><div class="title">经管雄起</div></a>
        <div class="desc">重邮经管的足球论坛</div>
        <el-tabs value="password" type="card">
          <el-tab-pane label="账户密码登陆" name="password">
            <el-form v-loading="loading" @submit.native.prevent :model="user" ref="loginForm" :rules="rules">
              <el-form-item  prop="email">
                <el-input v-model="user.email" placeholder="请输入电子邮箱" prefix-icon="el-icon-message" clearable/>
              </el-form-item>
              <el-form-item  prop="password">
              <el-input v-model="user.password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock" clearable/>
              </el-form-item>
              <div style="text-align:right"><el-link href="/find-password" type="primary" :underline="false">忘记密码</el-link></div>
              <el-form-item>
              <el-button native-type="submit" @click="login" type="primary" style="width:100%;margin:10px 0">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="验证码登陆" name="code">
            <el-form v-loading="loading" @submit.native.prevent :model="user" ref="emailForm" :rules="rules">
              <el-form-item  prop="email">
                <el-input v-model="user.email" placeholder="请输入电子邮箱" prefix-icon="el-icon-message" clearable/>
              </el-form-item>
              <el-form-item  prop="verificationCode">
                <el-input v-model="user.verificationCode" placeholder="请输入验证码" prefix-icon="el-icon-key" clearable>
                  <el-button :loading="b_loading" slot="append" @click="sendCode" :disabled="disabled">{{codeInfo}}</el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
              <el-button native-type="submit" @click="loginByCode" type="primary" style="width:100%;margin:10px 0">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div style="font-size:14px;color:#999;display:flex;justify-content:center"><div>还没有账号？</div><el-link type="primary" href="/register" :underline="false">注册新账号</el-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import {validateEmail,validatePass,validateVerCode} from "@/utils/validateInput"
import {logOut} from '@/utils/cookies'
import {userLogin,emailLogin,getCode} from '@/api/login'
export default {
  name: 'JGLog',
  data () {
    return {
      user:{
        email : "",
        password : "",
        verificationCode : null,
      },
      codeInfo : "获取验证码",
      disabled : false,
      loading : null,
      b_loading : null,

      rules: {
        email : [{validator:validateEmail,trigger:'blur'}],
        password : [{validator:validatePass, trigger: 'blur' },],
        verificationCode : [{validator:validateVerCode, trigger: 'blur' },],
      }
    }
  },
  mounted() {
    logOut();
  },
  methods: {
    login(){
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          userLogin(this.user).then((res)=>{
            if(res.code==200){
              this.$message({
                message: '登陆成功',
                type: 'success'
              });
              this.$emit("login",res.data);
              this.$router.push("/");
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
            this.loading = false;
          })
        }else{
          return false;
        }
      })
    },
    loginByCode(){
      this.$refs['emailForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          emailLogin(this.user).then((res)=>{
            if(res.code==200){
              this.$message({
                message: '登陆成功',
                type: 'success'
              });
              this.$emit("login",res.data);
              this.$router.push("/");
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
            this.loading = false; 
          })
        }else{
          return false;
        }
      })
    },
    sendCode(){
      if(this.b_loading||this.desabled) return;
      this.b_loading = true;
      this.$refs['emailForm'].validateField('email',(valid) => {
        if(!valid){
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
            }else{
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
            this.b_loading = false;
          })
        }else{
          return false;
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
#fc0 rgb(255,204,0)
orange rgb(232,140,48)
yellow rgb(232,226,47)
配色方案1 rgb(247,151,30) -> rgb(255,210,0)
配色方案2 颜色较绿 rgb(237,229,116) -> rgb(225,245,196)
配色方案3 Sunny Morning rgb(237,229,116) -> rgb(225,245,196)
-->
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
  padding: 40px 50px 0 50px;
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