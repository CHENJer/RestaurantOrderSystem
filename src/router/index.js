import Vue from 'vue'
import Router from 'vue-router'
import CustomerOrder from '@/components/CustomerOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: 'CustomerOrder',
      component:CustomerOrder
    },
    {
      path:'/CustomerOrder',
      name: 'CustomerOrder',
      component:CustomerOrder
    }
  ],
  mode:"history"
})
