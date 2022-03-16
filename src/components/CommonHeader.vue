<template>
  <header>
     <div class="l-content">
        <el-button @click="handlerMenu" style="margin-right:15px;" plain icon="el-icon-menu" size="mini"></el-button>
        <!-- <h3 style="color:#fff;font-size:14px;margin-left:15px;">首页</h3> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path:item.path }">{{item.label}}</el-breadcrumb-item>
          
         </el-breadcrumb>
     </div>
     <div>
         <el-dropdown trigger="click" size="mini">
             <span>
                <img style="width:32px;height:32px;border-radius:50%;" :src="userImg" />
             </span>
             <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                <el-dropdown-item command="b" @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
         </el-dropdown>
    </div>    
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data(){
      return{
         userImg:require('../assets/userImg.jpeg')
      }
  },
  methods:{
      handlerMenu(){
          this.$store.commit('collapseMenu')
      },
      logOut(){
         this.$store.commit('clearToken')
         this.$store.commit('clearMenu')
         this.$router.push('/login')
      }
   },
   computed:{
     ...mapState({
         tags:state=> state.tab.tabsList
     })
   },
}
</script>

<style lang="less" scoped>
.el-button{
    padding:4px 8px;
}

header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:100%;
}
    
.l-content{
  display: flex;
  align-items: center;
}

</style>
