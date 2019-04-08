<template>
  <div>
    <div style="height: 80px">
      订单编号：{{Num}}
    </div>
    <div style="height: 80px">
      菜品菜单编号：{{foodNum}}
    </div>
    <button @click="getNum">刷新</button>
  </div>
</template>

<script>
import {randomNum} from '../common/util/getRandom.js'
import {getOnlyNum} from '../common/util/getRandom.js'
  export default {
    name: 'chat',
    data() {
      return {
        Num:'',
        foodNum:''
      }
    },
    computed: {},
    mounted() {

    },
    components: {},
    watch: {},
    methods: {
      getNum(){
        this.Num = randomNum(18)
        this.foodNum = getOnlyNum("S")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

