
<template>
    <el-row type="flex" justify="center" align="middle" :span='12'>
      <el-col :span = '8'>
       <el-form :model='loginForm' :rules='rules' ref='loginForm'>
         <el-form-item label="用户名" prop='username'>
           <el-input v-model="loginForm.username"></el-input>
         </el-form-item>
        <el-form-item label="密码" prop='password'>
           <el-input v-model='loginForm.password'></el-input>
         </el-form-item>

      <el-form-item>
        <el-button type="warning" @click='startLogin'>登录</el-button>
       <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>

/* eslint-disable */
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 开始登陆
    startLogin () {
      this.$refs.loginForm.validate( async (valid) => {
        if (!valid) {
          return
        }

        let res = await axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)

         if(res.data.meta.status ===200){
            //保存token
            localStorage.setItem('token',res.data.data.token)
            //提示信息
            this.$message({
              message:'登录成功',
              type: 'success',
              duration: 800
            })

            //跳转到首页
            this.$router.push('/home')
          }else{
            this.$message({
              message: res.data.meta.msg,
              type: 'error',
              duration: 800
            })
          }
      //   axios.post('http://localhost:8888/api/private/v1/login',this.loginForm).then(res =>{
      //     if(res.data.meta.status ===200){

      //       //保存token
      //       localStorage.setItem('token',res.data.data.token)
      //       //提示信息
      //       this.$message({
      //         message:'登录成功',
      //         type: 'success',
      //         duration: 800
      //       })

      //       //跳转到首页
      //       this.$router.push('/home')
      //     }else{
      //       this.$message({
      //         message: res.data.meta.msg,
      //         type: 'error',
      //         duration: 800
      //       })
      //     }
      //   })
      })
      },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
  .el-row{
    height: 100%;
    background: url(../../assets/2.jpg);
    background-size: 100%;
    background-position: 0px -139px;
  }

  .el-col{
    background: #202867;
    padding: 20px 30px;
    border-radius: 15px;
  }
</style>
