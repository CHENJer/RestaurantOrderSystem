import Vue from 'vue'
import Router from 'vue-router'
import CustomerOrder from '@/components/CustomerOrder'
import ManageRegister from '@/components/manage/ManageRegister.vue'
import receptionPage from '@/components/manage/receptionPage.vue'
import kitchenPage from '@/components/manage/kitchenPage.vue'
import adminPage from '@/components/manage/adminPage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: 'ManageRegister',
      component:ManageRegister
    },
    {
      path:'/CustomerOrder',
      name: 'CustomerOrder',
      component:CustomerOrder
    },
    {
      path:'/ManageRegister',
      name: 'ManageRegister',
      component:ManageRegister
    },
    {
      path:'/receptionPage',
      name: 'receptionPage',
      component:receptionPage
    },
    {
      path:'/kitchenPage',
      name: 'kitchenPage',
      component:kitchenPage
    },
    {
      path:'/adminPage',
      name: 'adminPage',
      component:adminPage
    },
    /*默认跳转页面*/
    {
      path:'*',
      redirect:'/ManageRegister'

    }
  ],
  mode:"history"
})
