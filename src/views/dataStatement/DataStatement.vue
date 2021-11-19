<template>
  <div class="dataStatement">
    <div class="page-title"><p>数据统计</p></div>
    <div class="page-state">
      <el-row :gutter="15" style="margin-bottom: 10px;">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><div class="data-mess data-title"><span>当日数据：</span></div></el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><div class="data-mess">{{userCount}}<span class="mess-tit">新增用户</span></div></el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><div class="data-mess">{{orderCount}}<span class="mess-tit">新增订单</span></div></el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><div class="data-mess">{{adminCount}}<span class="mess-tit">新增管理员</span></div></el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><div class="data-mess data-title"><span>总数据：</span></div></el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><div class="data-mess">{{allUserCount}}<span class="mess-tit">注册用户</span></div></el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><div class="data-mess">{{allOrderCount}}<span class="mess-tit">订单</span></div></el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><div class="data-mess">{{allAdminCount}}<span class="mess-tit">管理员</span></div></el-col>
      </el-row>
    </div>
    <date-chart :seven-day="sevenDay" :sevenDate="sevenDate" style="height: 64%;"/>
  </div>
</template>

<script>
import {orderCount, userCount,adminCount,adminDayCount,getUserCount,getOrderCount} from "@/api/getData";
import dateChart from "@/components/DataChart/dateChart";
export default {
  name: "DataStatement",
  data(){

    return{
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenDay: [],
      sevenDate: [[],[],[]],
      screenWidth: document.body.clientWidth,
    }
  },
  components:{
    dateChart
  },
  mounted() {
    this.initData();

    this.getSevenDate();
    // const that = this
    // window.onresize = ()=>{
    //   return(()=>{
    //     window.screenWidth = document.body.clientWidth
    //     that.screenWidth = window.screenWidth
    //   })
    // }
    // console.log(this.screenWidth)
    console.log(this.sevenDay)
    console.log(this.sevenDate)
  },
  watch:{
    // screenWidth(val){
    //   console.log(val)
    // }
  },
  methods:{
    async initData(){
      const myDate = new Date();
      const month = myDate.getMonth()+1
      const today = myDate.getFullYear() +'-'+ month+'-'+myDate.getDate();
      Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
          .then(res => {
            // console.log(res)
            this.userCount = res[0].data.count;
            this.orderCount = res[1].data.count;
            this.adminCount = res[2].data.count;
            this.allUserCount = res[3].data.count;
            this.allOrderCount = res[4].data.count;
            this.allAdminCount = res[5].data.count;
          }).catch(err => {
        console.log(err)
      })
    },
    async getSevenDate(){
      this.sevenDay = [this.getDay(-6),this.getDay(-5),this.getDay(-4),this.getDay(-3),this.getDay(-2),this.getDay(-1),this.getDay(-0)]
      const apiArr = [[],[],[]];
      this.sevenDay.forEach(item => {
        apiArr[0].push(userCount(item))
        apiArr[1].push(orderCount(item))
        apiArr[2].push(adminDayCount(item))
      })
      // console.log(apiArr)
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
      Promise.all(promiseArr).then(res => {
        // console.log(res)
        const resArr = [[],[],[]];
        res.forEach((item, index) => {
          if (item.data.status == 1) {
            resArr[Math.floor(index/7)].push(item.data.count)
          }
        })
        this.sevenDate = resArr;

      }).catch(err => {
        console.log(err)
      })
    },

    getDay(day) {
      const today = new Date();
      let targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      let tYear = today.getFullYear();
      let tMonth = today.getMonth();
      let tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear+"-"+tMonth+"-"+tDate;
    },
    doHandleMonth(month){
      let m = month
      if(month.toString().length == 1){
        m = "0"+month
      }
      return m
    }
  },
}
</script>

<style scoped lang="less">
.dataStatement{
  height: 100%;
  .page-title{
    text-align: center;
    font-size: 30px;
    height: 10%;
  }
  .page-state{
    height: 15%;
    .data-title{
      background-color: #20A0FF;
      font-size: 22px;
    }
    .data-mess{
      width: 80%;
      height: 50px;
      margin: 0 auto;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      color: #333;
      background-color: #E5E9F2;
      border-radius: 10px;
      .mess-tit{
        font-size: 10px;
        color: #666;
        padding-left: 5px;
      }
    }
  }
}
</style>
