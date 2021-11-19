<template>
  <div>
    <el-table :data="tableData"  :highlight-current-row="true" style="width: 95%;margin:2.5%;border: 1px solid #EBEEF5;">
      <el-table-column type="index"  width="100"></el-table-column>
      <el-table-column prop="username" label="用户名" min-width="100px"></el-table-column>
      <el-table-column prop="registTime" label="注册时间" min-width="200px"></el-table-column>
      <el-table-column prop="city" label="注册地址"></el-table-column>
    </el-table>
    <div class="block" style="margin-left: 3%;">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total=total>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getUserCount, getUserList} from "@/api/getData";

export default {
  name: "UserList",
  data(){
    return{
      tableData:[],
      currentPage:1,
      total:0,
      offset:0,
      limit:20
    }
  },

  mounted() {
    this.getUserTotal()
    this.getUsersList()
  },
  methods:{
    async getUserTotal(){
      const {data} = await getUserCount()
      this.total = data.count

    },
    async getUsersList(){
      this.tableData = []
      const {data} = await getUserList(this.offset,this.limit)
      data.forEach(item =>{
        this.tableData.push({username:item.username,registTime:item.registe_time,city:item.city})
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getUsersList()
    }
  }
}
</script>

<style scoped>

</style>
