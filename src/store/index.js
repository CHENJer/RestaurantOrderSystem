import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//使用方法this.$store
const state={//要设置的全局访问的state对象
  newOrderMsg: false, //this.$store.state.newOrderMsg
  kOrderStatus: 0  //厨房订单状态,下单
  //要设置的初始属性值
};
const sortList =[]


const getters = {   //实时监听state值的变化(最新状态)
  isShow(state) {  //方法名随意,主要是来承载变化的newOrderMsg的值
    return state.newOrderMsg
  },
  getkOrderStatus(){  //方法名随意,主要是用来承载变化的kOrderStatus的值
    return state.kOrderStatus
  },

};
/* this.$store.commit('show') 或 this.$store.commit('hide') 以及 this.$store.commit('newNum',6) */
const mutations = {
  show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.newOrderMsg = true;
  },
  hide(state) {  //同上
    state.newOrderMsg = false;
  },
  kOrderpass(state,num){ //同上，这里面的参数除了state之外还传了需要增加的值sum
    state.kOrderStatus = num;
  }
};
//把对象扔里面
const store = new Vuex.Store({
  state,
  sortList,
  getters,
  mutations
});

export default store;
