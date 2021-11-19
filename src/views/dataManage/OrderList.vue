<template>
  <div>
    <el-table
        :data="tableData"
        :highlight-current-row="true"
        @expand-change="expandChange"
        :expand-row-keys="expandKey"
        :row-key="row => row.index"
        style="width: 95%;margin:2.5%;border: 1px solid #EBEEF5;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.user_name }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.restaurant_address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="订单ID"
          prop="id">
      </el-table-column>
      <el-table-column
          label="总价格"
          prop="total_amount">
      </el-table-column>
      <el-table-column
          label="订单状态"
          prop="status">
      </el-table-column>
    </el-table>
    <div class="block" style="margin-left: 3%;">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getAddressById, getOrderCount, getOrderList, getRestaurantDetail, getUserInfo} from "@/api/getData";

export default {
  name: "OrderList",
  data(){
    return{
      tableData:[],
      expandKey:[],
      currentPage:1,
      total:0,
      limit:20,
      offset:0,
    }
  },
  created() {
    this.initData()
  },
  methods:{
    async initData(){
      const {data} = await getOrderCount()
      if(data.status == 1){
        this.total = data.count
      }else{
        throw new Error('获取数据失败');
      }
      this.getOrderList()
    },
    async getOrderList(){
      const {data} = await getOrderList(this.offset,this.limit)
      console.log(data)
      this.tableData = []
      data.forEach((item,index) =>{
        const tableData = {};
        tableData.id = item.id;
        tableData.total_amount = item.total_amount;
        tableData.status = item.status_bar.title;
        tableData.user_id = item.user_id;
        tableData.restaurant_name = item.restaurant_name;
        tableData.address_id = item.address_id
        tableData.restaurant_id = item.restaurant_id;
        tableData.index = index;
        this.tableData.push(tableData);
      })
    },
    //列表展开/折叠
    async expandChange(row,expandedRow){
      if(expandedRow.length !== 0){
        const userInfo = await getUserInfo(row.user_id)
        const restaurant = await getRestaurantDetail(row.restaurant_id)
        const address = await getAddressById(row.address_id)

        this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.data.name, restaurant_address: restaurant.data.address, address: address.data.address, user_name: userInfo.data.username}});
        this.$nextTick(()=>{
          this.expandKey.push(row.index)
        })
      }else{
        const index = this.expandKey.indexOf(row.index);
        this.expandKey.splice(index, 1)
      }
    },

    handleCurrentChange(val){
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getOrderList()
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
  margin-left: 5%;
}
</style>
