import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Login',
    component: () =>import('../views/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'',
        redirect:'dataStatement'
      },
      {
        path: 'dataStatement',
        name: 'DataStatement',
        component: () =>import('../views/dataStatement/DataStatement')
      },
      /*数据管理*/
      { //用户列表
        path: 'userList',
        name: 'UserList',
        component: () =>import('../views/dataManage/UserList')
      },
      { //商家列表
        path: 'storeList',
        name: 'StoreList',
        component: () =>import('../views/dataManage/StoreList')
      },
      { //食品列表
        path: 'foodList',
        name: 'FoodList',
        component: () =>import('../views/dataManage/FoodList')
      },
      { //订单户列表
        path: 'orderList',
        name: 'OrderList',
        component: () =>import('../views/dataManage/OrderList')
      },
      { //管理员列表
        path: 'managerList',
        name: 'ManagerList',
        component: () =>import('../views/dataManage/ManagerList')
      },
      /*添加数据*/
      { //添加商铺
        path: 'storeAdd',
        name: 'StoreAdd',
        component: () =>import('../views/dataAdd/StoreAdd')
      },
      { //添加商品
        path: 'foodAdd',
        name: 'FoodAdd',
        component: () =>import('../views/dataAdd/FoodAdd')
      },
      /*图表*/
      { //用户分布
        path: 'userProfile',
        name: 'UserProfile',
        component: () =>import('../views/dataChart/UserProfile')
      },
      /*编辑*/
      { //文本编辑
        path: 'textEdit',
        name: 'TextEdit',
        component: () =>import('../views/dataEdit/TextEdit')
      },
      /*设置*/
      { //管理员设置
        path: 'managerSetting',
        name: 'ManagerSetting',
        component: () =>import('../views/dataSetting/ManagerSetting')
      },
      /*说明*/
      { //说明
        path: 'dataExplain',
        name: 'DataExplain',
        component: () =>import('../views/dataExplain/DataExplain')
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
