<template>
  <div>
    <el-row :gutter="16"> 
      <el-col :span="8" style="margin-top:20px;">
        <el-card>
           <div class="user">
               <img :src="userImg" style="width:80px;height:80px;border-radius:50%;"/>
               <div style="margin-left:20px;">
                   <p>Admin</p>
                   <p style="font-size:12px;color:#ccc">超级管理员</p>
               </div>
           </div>
           <div style="margin-top:15px;font-size:14px;">
               <p style="font-size:12px;color:#ccc;line-height:22px;">上次登录时间:<span style="margin-left:15px;">2033-09-09</span></p>
               <p style="font-size:12px;color:#ccc;line-height:22px;">上次登录地点:<span style="margin-left:15px;">武汉</span></p>
           </div>
        </el-card>
        <el-card style="margin-top:15px;">
           <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column v-for="(item,key) in tableLabel"
                    :key="key"
                    :prop="key"
                    :label="item"
                    width="76px">
                </el-table-column>
            </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
          <div class="cf" style="margin-top:20px;">
                <el-card class="num" style="float:left;width:32%;margin-left:2%;box-sizing:border-box;margin-bottom:15px;" v-for="item in countData" :key="item.name" :body-style="{padding:0,}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div style="margin-left:15px;">
                        <p>￥{{item.value}}</p>
                        <p style="font-size:12px;">{{item.name}}</p>
                    </div>
                </el-card>
          </div>
          <el-card style="height:260px;">
              <!-- <div style="height:280px;" ref="echarts"></div> -->
              <Echarts :chartData="echartData.order" style="height:280px;" />
          </el-card>
          <div style="display:flex;margin-top:15px;">
               <el-card style="height:260px;width:49%;margin-right:1%;">
                    <!-- <div style="height:240px;" ref="userEcharts"></div> -->
                  <Echarts :chartData="echartData.user" style="height:240px;" />
               </el-card>
               <el-card style="height:260px;width:49%;margin-left:1%;">
                   <!-- <div style="height:240px;" ref="videoEcharts"></div> -->
                  <Echarts :chartData="echartData.video" :isAxisChart="false" style="height:240px;" />
               </el-card>
          </div>
      </el-col>    
    </el-row>
  </div>
</template>

<script>
import {getData} from '@/api/data.js'
//import * as echarts from 'echarts'
import Echarts from '@/components/Echarts.vue'
export default {
  name: 'Home',
  components:{
     Echarts
  },
  data(){
      return{
          // 传给子组件的数据
          echartData:{
             order:{
                 xData:[],
                 series:[]
             },
             user:{
                 xData:[],
                 series:[]
             },
             video:{
                  series:[]
             }
          },
          //userImg:require('../../../src/assets/userImg.jpeg')
          userImg:require('@/assets/userImg.jpeg'),
          tableData:[],
          tableLabel:{
             name:'课程',
             todayBuy:'今日购买',
             monthBuy:'本月购买',
             totalBuy:'总购买',
          },
          countData:[],
      }
  },
  mounted(){
      getData().then(res=>{ 
         const { data,code } = res.data;
         if(code ===20000){
             this.tableData = data.tableData
             this.countData = data.countData
             const order = data.orderData;
             const xData = order.date;
             const KeyArray = Object.keys(order.data[0])
             const series = []
             //折线图
             KeyArray.forEach(key=>{
                 //console.log('map',order.data.map(item=>item[key]))
                 series.push({
                     name:key,
                     data:order.data.map(item=>item[key]),
                     type:'line'
                 })
             })
            //  const option = {
            //       xAxis:{
            //         data:xData
            //       },
            //       yAxis:{},
            //       legend:{ data:KeyArray },
            //       series
            //  }
             this.echartData.order.xData = xData;
             this.echartData.order.series = series;

            //  const E = echarts.init(this.$refs.echarts)
            //  E.setOption(option)
             // 指定用户柱状图
            //  var userOption = {
            //     // title: {
            //     // text: 'ECharts 入门示例'
            //     // },
            //     //提示框
            //     tooltip: { trigger:'axis'},
            //     legend: {
            //       // 图例的文字颜色
            //       textStyle:{
            //           color:'#333'
            //       },
            //     },
            //     grid:{
            //         left:'20%',
            //     },
            //     xAxis: {
            //        data:data.userData.map(item=>item.week),
            //        type:'category',  // 类目轴
            //        axisLine:{
            //            lineStyle:{
            //                color:'#17b3a3'
            //            },
            //        },
            //        axisLabel:{
            //            interval:0,
            //            color:'#333'
            //        },
            //     },
            //     yAxis:[
            //       {
            //         type:'value',
            //         axisLine:{
            //             lineStyle:{
            //                color:'#17b3a3'
            //            },
            //          },
            //       },
            //     ],
            //     color:['#2ec7c9','#b6a2de'],
            //     series: [
            //        {
            //         name: '新增用户',
            //         type: 'bar',
            //         data: data.userData.map(item=>item.new)
            //        },
            //        {
            //         name: '活跃用户',
            //         type: 'bar',
            //         data: data.userData.map(item=>item.active)
            //        },
            //     ]
            // };
             this.echartData.user.xData = data.userData.map(item=>item.week);
             this.echartData.user.series = [
                   {
                    name: '新增用户',
                    type: 'bar',
                    data: data.userData.map(item=>item.new)
                   },
                   {
                    name: '活跃用户',
                    type: 'bar',
                    data: data.userData.map(item=>item.active)
                   },
                ];
            //  const userE = echarts.init(this.$refs.userEcharts)
            //  userE.setOption(userOption)
             // 饼图
            //  var videoOption = {
            //         tooltip: { trigger:'item'},
            //         color:[
            //             '#0f78f4',
            //             '#dd536b',
            //             '#9462e5',
            //             '#a6a6a6',
            //             '#39c362',
            //             '#3exd1cf',
            //         ],
            //         series: [ 
            //             { 
            //              data:data.videoData,
            //              type:'pie',  
            //             }
            //         ],
            //   };
              console.log('videoData',data.videoData)
              this.echartData.video.series = [ 
                        { 
                         data:data.videoData,
                         type:'pie',  
                        }
                    ];
            //  const V = echarts.init(this.$refs.videoEcharts)
            //  V.setOption(videoOption)
         }
         console.log('res',res)
      }).catch(err=>{

      })
  }
}
</script>

<style lang="less" scoped>
.user{
 display:flex;
 align-items: center;
 padding-bottom:15px;
 border-bottom: 1px solid #ccc;
}

 p{margin:0;}

.el-card:nth-child(1){
    margin-left:0!important;
}
.el-card:nth-child(4){
    margin-left:0!important;
}

.cf:before,.cf:after{display:table;line-height:0;content:' '}
.cf:after{clear:both}
.cf{*zoom:1}

.icon{
    width:50px;
    height:50px;
    display:flex;align-items: center;
    justify-content: center;color:#fff;
}

</style>
