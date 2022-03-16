<template>
  <div>
     <el-table :data="tableData" stripe>
        <el-table-column v-for="item in tableLabel" show-overflow-tooltip
          :key="item.prop" :label="item.label" :width="item.width ? item.width:125" >
          <template slot-scope="scope">
               <span style="margin-right:15px;">{{ scope.row[item.prop]  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180"> 
             <template slot-scope="scope">
              <el-button type="primary" size ="mini" @click="handlerEdit(scope.row)">编辑</el-button>
              <el-button type="danger"  size ="mini" @click="handlerDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
     </el-table>
      <el-pagination style="margin-top:15px;"
        @current-change="changePage"
        :current-page.sync="config.page"
        :page-size="5"
        layout="total,prev, pager, next, jumper"
        :total="config.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props:{
    tableData:Array,
    tableLabel:Array,
    config:Object,
  },
  data(){
      return{

      }
  },
  methods:{
    handlerEdit(row){
       this.$emit('edit',row)
    },
    handlerDelete(row){
       this.$emit('del',row)
    },
    changePage(page){
       console.log('page',page)  // 1 2 3 4 
       this.$emit('changePage',page) 
    }
    
  }
}
</script>

<style lang="less" scoped>

</style>
