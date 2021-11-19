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
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="食品 ID">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.restaurant_address }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.category_name }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.month_sales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="食品名称"
          prop="name">
      </el-table-column>
      <el-table-column
          label="食品介绍"
          prop="description">
      </el-table-column>
      <el-table-column
          label="评分"
          prop="rating">
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
    <el-dialog title="修改食品信息" :visible.sync="EditFormVisible">
      <el-form :model="foodTable">
        <el-form-item label="食品名称" label-width="100px">
          <el-input v-model="foodTable.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品介绍" label-width="100px">
          <el-input v-model="foodTable.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品分类" label-width="100px">
          <el-select v-model="selectedCategory" :placeholder="foodTable.category_name" @change="categoryChange">
            <el-option
                v-for="item in categoryOptions"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品照片" label-width="100px">
          <el-upload
              class="avatar-uploader"
              action="https://elm.cangdu.org/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleServiceAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="foodTable.image_path" :src="'https://elm.cangdu.org/img/'+foodTable.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-row style="overflow: auto; text-align: center;">
        <el-table
            :data="specs"
            style="margin-bottom: 20px;"
            :row-class-name="tableRowClassName">
          <el-table-column
              prop="specs"
              label="规格">
          </el-table-column>
          <el-table-column
              prop="packing_fee"
              label="包装费">
          </el-table-column>
          <el-table-column
              prop="price"
              label="价格">
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
                  size="small"
                  type="danger"
                  @click="deleteSpecs(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="specsFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStore">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加规格" :visible.sync="specsFormVisible">
      <el-form :model="specsForm" >
        <el-form :rules="specsFormrules" :model="specsForm">
          <el-form-item label="规格" label-width="100px" prop="specs">
            <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="包装费" label-width="100px">
            <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="价格" label-width="100px">
            <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
          </el-form-item>
        </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="specsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSpecs">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMenu,
  getFoods,
  getFoodsCount,
  getMenuById,
  getRestaurantDetail,
  updateFood,
  deleteFood
} from "@/api/getData";

export default {
  name: "FoodList",
  data(){
    return{
      restaurant_id:null,
      tableData:[],  //食品列表
      expandKey:[],   //展开折叠key

      currentPage:1,  //当前页
      total:0,
      limit:20,
      offset:0,

      foodTable:{},
      selectedCategory:null,
      categoryOptions:[],
      selectMenu:{},
      EditFormVisible:false,

      specs:[],//规格
      specsForm: {
        specs: '',
        packing_fee: 0,
        price: 20,
      },
      specsFormrules: {
        specs: [
          { required: true, message: '请输入规格', trigger: 'blur' },
        ],
      },
      specsFormVisible:false,
    }
  },
  created() {
    this.initData()
  },
  methods:{
    async initData(){
      const {data} = await getFoodsCount()
      if(data.status == 1){
        this.total = data.count
      }else{
        throw new Error('获取数据失败');
      }
      this.getFoodsList()
    },
    //食品分类列表
    async getCategoryOptions(row){
      const {data} = await getMenu(this.foodTable.restaurant_id)

      data.forEach((item,index) =>{
        this.categoryOptions.push({label:item.name,value:item.id,index})
      })
    },
    //食品列表
    async getFoodsList(){
      const {data} = await getFoods(this.offset,this.limit,this.restaurant_id)
      // console.log(data)
      this.tableData = []
      data.forEach((item,index) =>{
        const tableData = {};
        tableData.name = item.name;
        tableData.item_id = item.item_id;
        tableData.description = item.description;
        tableData.rating = item.rating;
        tableData.month_sales = item.month_sales;
        tableData.restaurant_id = item.restaurant_id;
        tableData.category_id = item.category_id;
        tableData.image_path = item.image_path;
        tableData.specfoods = item.specfoods;
        tableData.index = index;
        this.tableData.push(tableData);
      })
      // console.log(this.tableData)
    },
    //列表展开/折叠
    expandChange(row,expandedRow){
      if(expandedRow.length !== 0){
        this.getSelectItemData(row)
      }
    },
    //根据店铺id和分类id获取店铺名称和分类名称
    async getSelectItemData(row){
      const restaurant = await getRestaurantDetail(row.restaurant_id)
      const category = await getMenuById(row.category_id)
      this.selectMenu = {label: category.data.name, value: row.category_id}
      this.foodTable = {...row,...{restaurant_name:restaurant.data.name,restaurant_address:restaurant.data.address,category_name:category.data.name}}
      this.tableData.splice(row.index,1,{...this.foodTable})
      // this.$nextTick(()=>{
      //   this.expandKey.push(row.index)
      // })
    },

    /*分页*/
    handleSizeChange(val){},
    handleCurrentChange(val){
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getFoodsList()
    },

    //编辑
    handleEdit(index,row){
      this.getSelectItemData(row)
      this.EditFormVisible = true
      this.getCategoryOptions(row)
      this.getSpecs(row)
    },
    handleServiceAvatarSuccess(res){
      if(res.status === 1){
        this.foodTable.image_path = res.image_path
      }else{
        this.$message.error('上传图片失败！');
      }
    },
    beforeAvatarUpload(file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isRightType && isLt2M;
    },
    tableRowClassName(){},
    categoryChange(index){
      console.log(index)
      this.selectedCategory = index;
      const aaa = this.categoryOptions.find(item =>item.value === index)
      this.selectMenu = aaa
      console.log(this.selectMenu)
    },
    getSpecs(row){
      this.specs = [];
      if (row.specfoods) {
        row.specfoods.forEach(item => {
          this.specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price,
          })
        })
      }
    },
    //删除某规格
    deleteSpecs(index){
      this.specs.splice(index,1)
    },
    //添加规格
    addSpecs(){
      console.log(this.specsForm)
      this.specs.push({...this.specsForm});
      this.specsForm.specs = '';
      this.specsForm.packing_fee = 0;
      this.specsForm.price = 20;
      this.specsFormVisible = false;
    },
    async updateStore(){
      console.log(this.selectedCategory)
      this.EditFormVisible = false
      this.foodTable.new_category_id = this.selectMenu.value

      this.foodTable.specs = this.specs
      const {data} = await updateFood(this.foodTable)
      if(data.status === 1){
        this.$message.success(data.success)
        this.getFoodsList()
      }else{
        this.$message.error(data.message)
      }

    },
    async handleDelete(index,row){
      try{
        const {data} = await deleteFood(row.item_id);
        if (data.status === 1) {
          this.$message({
            type: 'success',
            message: '删除食品成功'
          });
          this.tableData.splice(index, 1);
        }else{
          throw new Error(data.message)
        }
      }catch(err){
        this.$message({
          type: 'error',
          message: err.message
        });
        console.log('删除食品失败')
      }

    },




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
