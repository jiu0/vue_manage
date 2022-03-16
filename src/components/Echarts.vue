<template>
   <div ref="echartCom">
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Echarts',
  props:{
      isAxisChart:{
          type:Boolean,
          default:true,
      },
      chartData:{
          type:Object,
          default(){
              return{
                 xData:[],
                 series:[]
              }
          }
      }
   },
   watch:{
     chartData:{
         handler(){
            this.initChart()
         },
         deep:true,
      }
   },
   methods:{
     initChart(){
        this.initChartData()
        if(this.echart){
            this.echart.setOption(this.options)
        }else{
            this.echart = echarts.init(this.$refs.echartCom)
            this.echart.setOption(this.options)
        }
     },
     initChartData(){
         if(this.isAxisChart){
             this.axisOption.xAxis.data = this.chartData.xData
             this.axisOption.series = this.chartData.series
         }else{
             this.normalOption.series = this.chartData.series
         }
     }
   },
   data(){
       return{
         echart:null, 
          // 柱状图
         axisOption:{
                //提示框
                tooltip: { trigger:'axis'},
                legend: {
                  // 图例的文字颜色
                  textStyle:{
                      color:'#333'
                  },
                },
                grid:{
                    left:'20%',
                },
                xAxis: {
                   data:[],
                   type:'category',  // 类目轴
                   axisLine:{
                       lineStyle:{
                           color:'#17b3a3'
                       },
                   },
                   axisLabel:{
                       interval:0,
                       color:'#333'
                   },
                },
                yAxis:[
                  {
                    type:'value',
                    axisLine:{
                        lineStyle:{
                           color:'#17b3a3'
                       },
                     },
                  },
                ],
                color:['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#8d98b3'],
                series: [],
            },
            // 饼图
            normalOption:{
                    tooltip: { trigger:'item'},
                    color:[
                        '#0f78f4',
                        '#dd536b',
                        '#9462e5',
                        '#a6a6a6',
                        '#39c362',
                        '#3exd1cf',
                    ],
                    series: [],      
              }
        }
   },
   computed:{
       options(){
           return this.isAxisChart ? this.axisOption : this.normalOption
       }
   }
}
</script>

<style lang="less" scoped>
#app {

}
</style>
