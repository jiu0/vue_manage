<template>
  <div class="tabs">
    <el-tag size="small" v-for="(tag,index) in tags" 
    :key="tag.name" :closable="tag.name !== 'home'" 
    :effect="$route.name === tag.name ? 'dark':'plain' " 
    @click="changeMenu(tag)" @close="handleClose(tag,index)">{{tag.label}}</el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data(){
      return{

      }
   },
   computed:{
     ...mapState({
         tags:state=> state.tab.tabsList
     })
   },
   methods:{
     ...mapMutations({
        close:'closeTag'
     }),
     changeMenu(tag){
        this.$router.push({ name:tag.name})
     },
     handleClose(tag,index){
         const length = this.tags.length -1;
         this.close(tag)
         // 当前的路由 与聚焦的焦点 不一致  不做任何处理
         if(tag.name !== this.$route.name){
             return;
         }
         //删除的最右边一个  焦点向左移
         if(index === length){
            this.$router.push({
                name:this.tags[index-1].name
            })
          // 删除中间的 焦点向右跳转
         }else{
            this.$router.push({
                name:this.tags[index].name
            })
         }
      }
   }
}
</script>

<style lang="less" scoped>
.tabs{
    padding:15px;
    .el-tag{margin-right:15px;cursor: pointer;}
}



</style>
