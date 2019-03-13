<template>
  <div class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>


<script>
  import axios from 'axios'
  const ERR_OK = 0
export default {
  name: 'App',
  data(){
    return{
      seller: {}
    }
  },
  created() {

  },
  methods:{

  },
  components: {

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*由于图标被墙不显示，因此引入样式解决*/
  //@import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
  @import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
</style>
