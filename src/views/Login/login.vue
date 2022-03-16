<template>
  <div>
    <el-form class="login-container" :model="form" status-icon :rules="rules" ref="form" label-width="100px">
            <h3 style="margin:0 auto 40px auto;text-align:center;">系统登录</h3>
            <el-form-item prop="username" label-width="80px" label="用户名">
                <el-input  v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <!-- 密码 -->
             <el-form-item  prop="password" label-width="80px" label="密码">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label-width="0" style="text-align:center;">
                <el-button type="primary" size="mini" @click="login">登录</el-button>
            </el-form-item>
    </el-form>
  </div>
</template>

<script>
//import Mock from 'mockjs'
import { getMenu } from '@/api/data'
export default {
  name: 'login',
  data(){
    return{
      form:{
        username:'',
        password:''
      },
      rules:{
        username:[
            { required: true, message: '请输入登录用户名', trigger: 'blur' },
            { min:3,max:20,  message: '长度在 3 到 20 个字符', trigger: 'blur'},
          ],
         password: [
             { required: true, message: '请输入登录密码', trigger: 'blur' },
             { min:6,max:15,  message: '长度在 6 到 15 个字符', trigger: 'blur'},
          ],
       },
    }
  },
  methods:{
      login(){
        getMenu(this.form).then(({data:res})=>{
          if(res.code===20000){
              this.$store.commit('clearMenu')
              this.$store.commit('setMenu',res.data.menu)
              this.$store.commit('setToken',res.data.token)
              this.$store.commit('addMenu',this.$router)
              this.$router.push({ name:'home'})
          }else{
              this.$message.warning(res.data.message)
          }
        })
        // const token = Mock.Random.guid();
        // this.$store.commit('setToken',token)
        // this.$router.push({ name:'home'})
      }
  },
}
</script>

<style lang="less" scoped>
.login-container{
    border-radius: 15px;
    background-clip: padding-box;
    margin:120px auto;
    width:350px;
    background-color:#fff ;
}
</style>
