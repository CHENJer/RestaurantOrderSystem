<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
  import HelloWorld from './components/HelloWorld.vue'
  import TEST from './components/test.vue'
  import CustomerOrder from './components/CustomerOrder.vue'
export default {
  name: 'App',
  data(){
    return{
    }
  },
  methods:{

  },
  components:{
    'helloworld':HelloWorld,
    "test":TEST,
    "customerorder":CustomerOrder
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
  margin-top: 60px;
}
</style>
