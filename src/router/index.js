import Vue from 'vue'
import Router from 'vue-router'
import ManageRegister from '@/components/backEnd/manage/ManageRegister.vue'
import receptionPage from '@/components/backEnd/manage/receptionPage.vue'
import kitchenPage from '@/components/backEnd/manage/kitchenPage.vue'
import adminPage from '@/components/backEnd/manage/adminPage.vue'
import test from '@/components/test.vue'
import noticePush from '@/components/backEnd/notice/noticePush'
import noticeList from '@/components/backEnd/notice/noticeList'
import foodType from '@/components/backEnd/menuManage/foodType'
import foodRecommend from '@/components/backEnd/menuManage/foodRecommend'
import foodManage from '@/components/backEnd/menuManage/foodManage'
import salesVolume from '@/components/backEnd/menuManage/salesVolume'
import queryOrders from '@/components/backEnd/orderManage/queryOrders'
import orderBack from '@/components/backEnd/orderManage/orderBack'
import seatSet from '@/components/backEnd/seatManage/seatSet'
import seatQrCodeImg from '@/components/backEnd/seatManage/seatQrCodeImg'
import dayStatement from '@/components/backEnd/operatStatement/dayStatement'
import monthStatement from '@/components/backEnd/operatStatement/monthStatement'
import yearStatement from '@/components/backEnd/operatStatement/yearStatement'
import permissionAssignment from '@/components/backEnd/systemManage/permissionAssignment'
import userManage from '@/components/backEnd/systemManage/userManage'
import sellPage from '@/components/frontEnd/sellPage/sellPage'
import createOrder from '@/components/frontEnd/createOrder/createOrder'

import sortPage from '@/components/backEnd/sortManage/sortPage'
import tableView from '@/components/backEnd/tableView/tableView'
import receptionOrder from '@/components/backEnd/receptionOrder/receptionOrder'
import orderRecord from '@/components/backEnd/orderRecord/orderRecord'
import orderView from '@/components/backEnd/orderView/orderView'
import kitchenFoodSet from '@/components/backEnd/kitchenFoodSet/kitchenFoodSet'



Vue.use(Router)

export default new Router({
  routes: [
    {
      /*测试页面*/
      path:'/test',
      name: 'test',
      component:test
    },

    {
      /*顾客点餐界面*/
      path:'/CustomerOrder/sellPage',
      name: 'sellPage',
      component:sellPage
    },
   /* {
      /!*点餐菜单界面*!/
      path:'/CustomerOrder/Foods',
      name: 'Foods',
      component:Foods
    },
    {
      /!*商家公告界面*!/
      path:'/CustomerOrder/Store',
      name: 'Store',
      component:Store
    },*/
    {
      /*顾客订单界面*/
      path:'/CustomerOrder/createOrder',
      name: 'createOrder',
      component:createOrder
    },

    {
      /*后台登录界面*/
      path:'/ManageRegister',
      name: 'ManageRegister',
      component:ManageRegister
    },
    {
      /*前台管理界面*/
      path:'/receptionPage',
      name: 'receptionPage',
      component:receptionPage,
      children:[
      /*序号列表*/
        {
          path:'/receptionPage/sortPage',
          name:'sortPage',
          component:sortPage
        },
        /*餐桌视图*/
        {
          path:'/receptionPage/tableView',
          name:'tableView',
          component:tableView
        },
        /*菜品点餐*/
        {
          path:'/receptionPage/receptionOrder',
          name:'receptionOrder',
          component:receptionOrder
        },
        /*订单记录*/
        {
          path:'/receptionPage/orderRecord',
          name:'orderRecord',
          component:orderRecord
        }
      ]
    },
    {
      /*厨房管理界面*/
      path:'/kitchenPage',
      name: 'kitchenPage',
      component:kitchenPage,
      children:[
        /*订餐视图*/
        {
          path:'/kitchenPage/orderView',
          name:'orderView',
          component:orderView
        },
        /*菜单设置*/
        {
          path:'/kitchenPage/kitchenFoodSet',
          name:'kitchenFoodSet',
          component:kitchenFoodSet
        }
      ]
    },
    /*后台管理界面*/
    {
      path:'/adminPage',
      name: 'adminPage',
      component:adminPage,
      children:[
        /*公告推送页面*/
        {
          path:'/adminPage/noticePush',
          name:'noticePush',
          component:noticePush
        },
        /*公告记录页面*/
        {
          path:'/adminPage/noticeList',
          name:'noticeList',
          component:noticeList
        },
        /*菜品分类页面*/
        {
          path:'/adminPage/foodType',
          name:'foodType',
          component:foodType
        },
        /*菜品推荐页面*/
        {
          path:'/adminPage/foodRecommend',
          name:'foodRecommend',
          component:foodRecommend
        },
        /*菜品管理页面*/
        {
          path:'/adminPage/foodManage',
          name:'foodManage',
          component:foodManage
        },
        /*销量统计页面*/
        {
          path:'/adminPage/salesVolume',
          name:'salesVolume',
          component:salesVolume
        },
        /*订单记录页面*/
        {
          path:'/adminPage/queryOrders',
          name:'queryOrders',
          component:queryOrders
        },
        /*退单管理页面*/
        {
          path:'/adminPage/orderBack',
          name:'orderBack',
          component:orderBack
        },
        /*座位布置页面*/
        {
          path:'/adminPage/seatSet',
          name:'seatSet',
          component:seatSet
        },
        /*座位二维码页面*/
        {
          path:'/adminPage/seatQrCodeImg',
          name:'seatQrCodeImg',
          component:seatQrCodeImg
        },
        /*日营业报表页面*/
        {
          path:'/adminPage/dayStatement',
          name:'dayStatement',
          component:dayStatement
        },
        /*月营业报表页面*/
        {
          path:'/adminPage/monthStatement',
          name:'monthStatement',
          component:monthStatement
        },
        /*年营业报表页面*/
        {
          path:'/adminPage/yearStatement',
          name:'yearStatement',
          component:yearStatement
        },
        /*用户管理页面*/
        {
          path:'/adminPage/userManage',
          name:'userManage',
          component:userManage
        },
        /*权限分配页面*/
        {
          path:'/adminPage/permissionAssignment',
          name:'permissionAssignment',
          component:permissionAssignment
        }
      ]
    },

    /*默认跳转后台管理页面*/
    {
      path:'*',
      redirect:'/CustomerOrder/sellPage'
    },
  ],
  mode:"history"
})
