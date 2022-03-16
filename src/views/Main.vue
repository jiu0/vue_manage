<template>
  <div class="home" style="height:100%">
      <el-container style="height:100%">
        <el-aside style="width:auto;height:100%;">
          <CommonAside/>
        </el-aside>
        <el-container>
          <el-header><CommonHeader/></el-header>
          <CommonTag />
          <el-main><router-view/></el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  name: 'Home',
  components:{
     CommonAside,
     CommonHeader,
     CommonTag,
  },
  data(){
    return{

    }
  },
}
</script>


<style lang="less" scoped>
.el-header{ background-color: #555;}

.el-main{padding-top:0;}
body{margin:0;}
</style>
