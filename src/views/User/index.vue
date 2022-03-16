<template>
  <div>
    <el-dialog
      :title="operaType==='add'?'新增用户':'修改用户'"
      :visible.sync="isShow"
      width="50%"
      >
      <CommonForm :formLabel="operateFormLabel" :form="operateForm"
      :inline="true" ref="form" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button> 
        <CommonForm :formLabel="formLabel" :form="searchForm"
        :inline="true" ref="form">
          <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
        </CommonForm>
    </div>
       <CommonTable :tableData="tableData" :tableLabel="tableLabel" :config="config"
        @changePage="getList()" @edit="editUser" @del="delUser"
       ></CommonTable>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import {getUser } from '@/api/data'
export default {
  name: 'User',
  components:{
     CommonForm,
     CommonTable
  },
  data(){
    return{
       config:{
         page:1,
         total:20,
       },
       tableData:[],
       tableLabel:[
         {
           prop:'name',
           label:'姓名'
         },
         {
           prop:'age',
           label:'年龄'
         },
         {
           prop:'sexLabel',
           label:'性别'
         },
         {
           prop:'birth',
           label:'出生日期'
         },
         {
           prop:'addr',
           label:'地址',
           width:280
         },
       ],
       operaType:'add',
       isShow:false,
       operateForm:{
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:'',
       },
       searchForm:{
          keyword:'',
       },
       formLabel:[
          {
            model:'keyword',
            label:'',
            type:'input',
          }
       ],
       operateFormLabel:[
          {
            model:'name',
            label:'姓名',
            type:'input',
          },
          {
            model:'age',
            label:'年龄',
            type:'input',
          },
          {
            model:'birth',
            label:'出生日期',
            type:'date',
          },
          {
            model:'addr',
            label:'地址',
            type:'input',
          },
          {
            model:'sex',
            label:'性别',
            type:'select',
            opts:[
              {
                label:'男',
                value:1,
              },
              {
                label:'女',
                value:0,
              },
            ]
          },
       ]
    }
  },
  methods:{
    // 弹框的确认按钮
    confirm(){
      if(this.operaType === 'edit'){
        this.$http.post('/user/edit',this.operateForm).then(res=>{
          this.isShow = false;
          this.getList()
        })
      }else{
         this.$http.post('/user/add',this.operateForm).then(res=>{
          this.isShow = false;
          this.getList()
        })
      }
    },
    addUser(){
       this.isShow = true;
       this.operaType = 'add';
       this.operateForm = {
           name:'',
           addr:'',
           age:'',
           birth:'',
           sex:'',
       }
    },
    getList(name = ''){
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      const paramsObj = {
         page:this.config.page,
         name
      }
      getUser(paramsObj).then(res=>{
        this.tableData = res.data.list.map(item=>{
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item;
         })
         this.config.total = res.data.count;
         this.config.loading = false;
      })
    },
    editUser(row){
        this.isShow = true;
        this.operaType = 'edit';
        this.operateForm = row
    },
    delUser(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           const id = row.id;
           this.$http.get('/user/del',{
               params:{ id }
           }).then(res=>{
              this.$message({
                 type: 'success',
                 message: '删除成功!'
              });
              this.getList()
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header{
  display:flex;
  justify-content: space-between;
  align-items: center;
}



</style>
