<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
 /* import HelloWorld from './components/HelloWorld.vue'
  import TEST from './components/test.vue'
  import CustomerOrder from './components/CustomerOrder.vue'*/
export default {
  name: 'App',
  data(){
    return{
    }
  },
  methods:{
    handleClick: function() {
      this.$toast('Hello world!');
    }
  },
  components:{

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body{
    margin-top: 0px;
  }
.el-submenu__title{
  padding: 0 45px;
  font-size: 20px;
  font-weight: bold;
}
.el-menu-item{
  font-size: 18px;
  font-weight: bold;
}
</style>
