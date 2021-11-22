<template>
  <div>
    <el-table :data="tableData"  :highlight-current-row="true" style="width: 95%;margin:2.5%;border: 1px solid #EBEEF5;">
      <el-table-column prop="user_name" label="姓名" min-width="100px"></el-table-column>
      <el-table-column prop="create_time" label="注册日期" min-width="200px"></el-table-column>
      <el-table-column prop="city" label="地址"></el-table-column>
      <el-table-column prop="admin" label="权限"></el-table-column>
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
import {adminList,adminCount} from "@/api/getData";

export default {
  name: "ManagerList",
  data(){
    return{
      tableData:[],
      currentPage:1,
      total:0,
      offset:0,
      limit:20
    }
  },
  created() {
    this.initData()
  },
  methods:{
    async initData(){
      try{
        const {data} = await adminCount();
        if (data.status == 1) {
          this.total = data.count;
          this.getAdminList();
        }else{
          throw new Error('获取数据失败');
        }

      }catch(err){
        console.log('获取数据失败', err);
      }
    },
    async getAdminList(){
      const {data} = await adminList(this.offset,this.limit)
      if (data.status == 1) {
        this.tableData = [];
        data.data.forEach(item => {
          const tableItem = {
            create_time: item.create_time,
            user_name: item.user_name,
            admin: item.admin,
            city: item.city,
          }
          this.tableData.push(tableItem)
        })

      }else{
        throw new Error(data.message)
      }

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getAdminList()
    }
  }
}
</script>

<style scoped>

</style>
