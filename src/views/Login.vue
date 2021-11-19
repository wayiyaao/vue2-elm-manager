<template>
<div class="login-page">
  <div class="login-inner">
    <div class="login-title">
      <p>elm后台管理系统</p>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="text-align: center">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: "login",
  data(){
    return{
      ruleForm:{
        username:'',
        password:''
      },
      rules:{
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },]
      },
    }
  },
  watch: {
    adminInfo: function (newValue){
      if (newValue.id) {
        this.$message({
          type: 'success',
          message: '检测到您之前登录过，将自动登录'
        });
        this.$router.push('manage')
      }
    }
  },
  mounted() {

  },
  methods:{
    submitForm(formName){
      const data={
        user_name:this.ruleForm.username,
        password:this.ruleForm.password
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.axios.post('//elm.cangdu.org/admin/login',data)
          if(res.data.status === 1){
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            console.log(document.cookie)
            setTimeout(() =>{
              this.$router.replace('/home')
            },500)

          }else{
            this.$message({
              type:'error',
              message:res.data.message
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
}
</script>

<style scoped lang="less">
@import '../style/mixin';
.login-page{
  background-color: #324057;
  width: 100%;
  height: 100%;
  .login-inner{
    .wh(400px,300px);
    .ctp(400px,300px);
    .login-title{
      text-align: center;
      color: #fff;
      font-size: 30px;
    }
    .demo-ruleForm{
      //margin: 0 auto;
      margin-top: 40px;
      padding: 25px;
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
