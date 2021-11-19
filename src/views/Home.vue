<template>
  <div class="home">
    <div class="left-navbar">
      <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" background-color="#324157" text-color="#fff" active-text-color="#20a0ff">
        <el-menu-item index="/home/dataStatement">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document-remove"></i>
            <span>数据管理</span>
          </template>
          <el-menu-item index="/home/userList">用户列表</el-menu-item>
          <el-menu-item index="/home/storeList">商家列表</el-menu-item>
          <el-menu-item index="/home/foodList">食品列表</el-menu-item>
          <el-menu-item index="/home/orderList">订单列表</el-menu-item>
          <el-menu-item index="/home/managerList">管理员列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span>添加数据</span>
          </template>
          <el-menu-item index="/home/storeAdd">添加店铺</el-menu-item>
          <el-menu-item index="/home/foodAdd">添加商品</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-data-analysis"></i>
            <span>图表</span>
          </template>
          <el-menu-item index="/home/userProfile">用户分布</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span>编辑</span>
          </template>
          <el-menu-item index="/home/textEdit">文本编辑</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>设置</span>
          </template>
          <el-menu-item index="/home/managerSetting">管理员设置</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-warning-outline"></i>
            <span>说明</span>
          </template>
          <el-menu-item index="/home/dataExplain">说明</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content-inner">
      <el-row class="topBar">
        <el-col :span="22">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumb" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="2">
          <el-avatar icon="el-icon-user-solid" style="margin-top: 10px;"></el-avatar>
        </el-col>
      </el-row>
      <div style="height: calc(100% - 60px);width: 100%">
        <keep-alive>
          <transition name="fade">
            <router-view/>
          </transition>
        </keep-alive>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      breadcrumb:[{
        path:'/home',
        name:'首页'
      },{
        path:'',
        name:'数据管理'
      },{
        path:'',
        name:'用户列表'
      }]
    }
  },
  watch:{
    $route(to,from){
      if(to.path === '/home/dataStatement'){
        this.breadcrumb.splice(1,2)
      }
      if(to.path === '/home/userList'){
        this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '用户列表'})
      }
      if(to.path === '/home/storeList'){
        this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '商家列表'})
      }
      if(to.path === '/home/foodList'){
        this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '食品列表'})
      }
      if(to.path === '/home/orderList'){
        this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '订单列表'})
      }
      if(to.path === '/home/managerList'){
        this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '管理员列表'})
      }
      if(to.path === '/home/storeAdd'){
        this.breadcrumb.splice(1,2,{path:'',name:'添加数据'},{path:'',name: '添加店铺'})
      }
      if(to.path === '/home/foodAdd'){
        this.breadcrumb.splice(1,2,{path:'',name:'添加数据'},{path:'',name: '添加商品'})
      }
      if(to.path === '/home/userProfile'){
        this.breadcrumb.splice(1,2,{path:'',name:'图表'},{path:'',name: '用户分布'})
      }
      if(to.path === '/home/textEdit'){
        this.breadcrumb.splice(1,2,{path:'',name:'编辑'},{path:'',name: '文本编辑'})
      }
      if(to.path === '/home/managerSetting'){
        this.breadcrumb.splice(1,2,{path:'',name:'设置'},{path:'',name: '管理员设置'})
      }
      if(to.path === '/home/dataExplain'){
        this.breadcrumb.splice(1,2,{path:'',name:'编辑'},{path:'',name: '文本编辑'})
      }
    }
  },
  mounted() {
    if(this.$route.path === '/home/dataStatement'){
      this.breadcrumb.splice(1,2)
    }
    if(this.$route.path === '/home/userList'){
      this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '用户列表'})
    }
    if(this.$route.path === '/home/storeList'){
      this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '商家列表'})
    }
    if(this.$route.path === '/home/foodList'){
      this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '食品列表'})
    }
    if(this.$route.path === '/home/orderList'){
      this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '订单列表'})
    }
    if(this.$route.path === '/home/managerList'){
      this.breadcrumb.splice(1,2,{path:'',name:'数据管理'},{path:'',name: '管理员列表'})
    }
    if(this.$route.path === '/home/storeAdd'){
      this.breadcrumb.splice(1,2,{path:'',name:'添加数据'},{path:'',name: '添加店铺'})
    }
    if(this.$route.path === '/home/foodAdd'){
      this.breadcrumb.splice(1,2,{path:'',name:'添加数据'},{path:'',name: '添加商品'})
    }
    if(this.$route.path === '/home/userProfile'){
      this.breadcrumb.splice(1,2,{path:'',name:'图表'},{path:'',name: '用户分布'})
    }
    if(this.$route.path === '/home/textEdit'){
      this.breadcrumb.splice(1,2,{path:'',name:'编辑'},{path:'',name: '文本编辑'})
    }
    if(this.$route.path === '/home/managerSetting'){
      this.breadcrumb.splice(1,2,{path:'',name:'设置'},{path:'',name: '管理员设置'})
    }
    if(this.$route.path === '/home/dataExplain'){
      this.breadcrumb.splice(1,2,{path:'',name:'编辑'},{path:'',name: '文本编辑'})
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  .left-navbar{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 320px;
    height: 100%;
    background-color: rgb(50, 64, 87);
    .el-menu-vertical-demo{
      border: none;
    }
  }
  .content-inner{
    margin-left: 320px;
    height: 100%;
    .topBar{
      height: 60px;
      background-color: #EFF2F7;
      //line-height: 60px;
      padding-left: 20px;
      color: #97a8be;
      /deep/ .el-breadcrumb{
        line-height: 60px;
      }
    }
  }
}


.fade-enter-active,.fade-leave-active{
  transition: all .5s;
}
.fade-enter{
  opacity: 0;
  transform: translateX(-30px);
}
.fade-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
</style>
