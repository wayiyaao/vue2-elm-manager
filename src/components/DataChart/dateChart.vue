<template>
<div>
  <el-row type="flex" justify="space-around" style="height: 50%">
    <el-col id="lineChart" :xs="24" :sm="24" :md="11" :lg="11" :xl="11" style="height: 100%;margin-top: 20px;"></el-col>
    <el-col id="radarChart" :xs="24" :sm="24" :md="11" :lg="11" :xl="11" style="height: 100%;margin-top: 20px;"></el-col>
  </el-row>
  <el-row type="flex" justify="space-around" style="height: 50%;margin-top: 20px">
    <el-col id="barChart" :xs="24" :sm="24" :md="11" :lg="11" :xl="11" style="height: 100%;margin-top: 20px;"></el-col>
    <el-col id="scatterChart" :xs="24" :sm="24" :md="11" :lg="11" :xl="11" style="height: 100%;margin-top: 20px;"></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "dateChart",
  props:{
    sevenDay:{
      type:Array
    },
    sevenDate:{
      type:Array
    }
  },
  mounted() {
    this.lineChart()
    this.radarChart()
  },
  methods:{
    lineChart(){
      const myChart = this.echarts.init(document.getElementById("lineChart"))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新注册用户', '新增订单', '新增管理员']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sevenDay
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'新注册用户',
            type:'line',
            stack:'Total',
            data:this.sevenDate[0],

          },
          {
            name:'新增订单',
            type:'line',
            stack:'Total',
            data:this.sevenDate[1],
          },
          {
            name:'新增管理员',
            type:'line',
            stack:'Total',
            data:this.sevenDate[2],

          }
        ]
      })
    },
    radarChart(){
      const myChart = this.echarts.init(document.getElementById("radarChart"))
      myChart.setOption({

        legend: {
          data: ['新注册用户', '新增订单','新增管理员']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: this.sevenDay[0], max: 100 },
            { name: this.sevenDay[1], max: 100 },
            { name: this.sevenDay[2], max: 100 },
            { name: this.sevenDay[3], max: 100 },
            { name: this.sevenDay[4], max: 100 },
            { name: this.sevenDay[5], max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: this.sevenDate[0],
                name: '新注册用户'
              },
              {
                value: this.sevenDate[1],
                name: '新增订单'
              },
              {
                value: this.sevenDate[2],
                name: '新增管理员'
              }
            ]
          }
        ]
      })
    },
  },
  watch: {
    sevenDate: function (){
      this.lineChart()
      this.radarChart()
    },
    sevenDay: function (){
      this.lineChart()
      this.radarChart()
    }
  }
}
</script>

<style scoped>

</style>
