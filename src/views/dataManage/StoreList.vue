<template>
  <div>
    <el-table
        :data="tableData"
        :highlight-current-row="true"
        style="width: 95%;margin:2.5%;border: 1px solid #EBEEF5;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.recent_order_num }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="店铺名称"
          prop="name">
      </el-table-column>
      <el-table-column
          label="店铺地址"
          prop="address">
      </el-table-column>
      <el-table-column
          label="店铺介绍"
          prop="description">
      </el-table-column>
      <el-table-column
          label="操作"
          prop="desc">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="Success"
              @click="addFood(scope.$index, scope.row)">添加食品</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-left: 3%;">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>

    <!--编辑-->
    <el-dialog title="修改店铺信息" :visible.sync="EditFormVisible">
      <el-form :model="storeTable">
        <el-form-item label="店铺名称" label-width="100px">
          <el-input v-model="storeTable.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-autocomplete
              class="inline-input"
              v-model="address.address"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="addressSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="店铺介绍" label-width="100px">
          <el-input v-model="storeTable.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="storeTable.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" label-width="100px">
          <div class="block">
            <el-cascader
                v-model="selectedCategory"
                :options="categoryOptions"
                :props="{ expandTrigger: 'hover' }"
                @change="categoryChange"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="商铺照片" label-width="100px">
          <el-upload
              class="avatar-uploader"
              action="https://elm.cangdu.org/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleServiceAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="storeTable.image_path" :src="'https://elm.cangdu.org/img/'+storeTable.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStore">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  cityGuess, deleteRestaurant,
  foodCategory,
  getRestaurants,
  getRestaurantsCount,
  searchPlace,
  updateRestaurant
} from "@/api/getData";
import {deleteResturant} from "../../../../vue2-manage/src/api/getData";

export default {
  name: "StoreList",
  data(){
    return{
      tableData: [],
      storeTable: {},
      city:{},
      currentPage:1,
      total:0,
      limit:20,
      offset:0,
      selectedCategory:'',
      categoryOptions:[],
      address:{},

      EditFormVisible:false
    }
  },
  mounted() {
    this.initData()
    this.getCategory()

  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getRestaurants()
    },
    async initData(){
      try{
        const {data} = await cityGuess();
        this.city = data
        // console.log(this.city)
        const countData = await getRestaurantsCount();
        if (countData.data.status === 1) {
          this.total = countData.data.count;
        }else{
          throw new Error('获取数据失败');
        }
        this.getRestaurants();
      }catch(err){
        console.log('获取数据失败', err);
      }
    },
    async getRestaurants(){
      const {latitude, longitude} = this.city;
      const {data} = await this.axios.get('https://elm.cangdu.org/shopping/restaurants?latitude='+latitude+'&longitude='+longitude+'&limit='+this.limit+'&offset='+this.offset)
      this.tableData = []
      data.forEach(item => {
        const tableData = {};
        tableData.name = item.name;
        tableData.address = item.address;
        tableData.description = item.description;
        tableData.id = item.id;
        tableData.phone = item.phone;
        tableData.rating = item.rating;
        tableData.recent_order_num = item.recent_order_num;
        tableData.category = item.category;
        tableData.image_path = item.image_path;
        this.tableData.push(tableData);
      })
    },

    //编辑
    handleEdit(index,row){
      this.EditFormVisible = true
      this.storeTable = Object.assign({}, row)
      // this.storeTable = row
      this.address.address = row.address
      this.selectedCategory = row.category.split('/');
      if (!this.categoryOptions.length) {
        this.getCategory();
      }
    },
    categoryChange(value) {
      console.log(value)
    },
    async getCategory(){
      try{
        const {data} = await foodCategory()
        data.forEach(item =>{
          if(item.sub_categories.length){
            const addCategory={
              value:item.name,
              label:item.name,
              children:[]
            }
            item.sub_categories.forEach((subitem,index) =>{
              if(index === 0) return
              addCategory.children.push({value:subitem.name,label:subitem.name})
            })
            this.categoryOptions.push(addCategory)
          }
        })
      }catch (err) {
        console.log('获取商铺种类失败', err);
      }
    },
    async querySearchAsync(queryString,cb){
      if(queryString){
        const {data} = await searchPlace(this.city.id,queryString)
        if (data instanceof Array) {
          data.map(item => {
            item.value = item.address;
            return item;
          })
          cb(data)
        }
      }
    },
    addressSelect(value){
      const {address, latitude, longitude} = value;
      this.address = {address, latitude, longitude};
    },
    handleServiceAvatarSuccess(res){
      if(res.status === 1){
        this.storeTable.image_path = res.image_path
      }else{
        this.$message.error('上传图片失败！');
      }
    },
    beforeAvatarUpload(file){
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式或者 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isRightType && isLt2M;
    },
    async updateStore(){
      // console.log(this.storeTable)
      this.EditFormVisible = false
      Object.assign(this.storeTable, this.address);
      this.storeTable.category = this.selectedCategory.join('/');
      const {data} =await updateRestaurant(this.storeTable)
      if(data.status == 1){
        this.$message({
          type:"success",
          message:data.message
        })
        this.getRestaurants()
      }else{
        this.$message.error(data.message)
      }


    },

    //添加食品
    addFood(index,row){
      this.$router.push({ path: '/home/foodAdd', query: { restaurant_id: row.id }})
    },
    //删除
    async handleDelete(index,row){
      const {data} = await deleteRestaurant(row.id);
      if (data.status == 1) {
        this.$message({
          type: 'success',
          message: '删除店铺成功'
        });
        this.tableData.splice(index, 1);
      }else{
        this.$message.error(data.message)
      }
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
