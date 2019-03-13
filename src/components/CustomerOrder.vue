<template>
    <div class="CustomerOrder">
      <div class="demo-text" v-if="active3 === 0 ">

      </div>
      <div class="demo-text" v-if="active3 === 1">
        <p>商家详情</p>
      </div>
      <div class="demo-text" v-if="active3 === 2">
        <p>订单管理</p>
      </div>
      <mu-container>
        <mu-tabs :value.sync="active3" center color="teal">
          <mu-tab v-on:click="toFoods">
            <mu-icon value="home"></mu-icon>
            点餐
          </mu-tab>
          <mu-tab>
            <mu-icon value="account_balance"></mu-icon>
            商家公告
          </mu-tab>
          <mu-tab>
            <mu-icon value="face"></mu-icon>
            订单
          </mu-tab>
        </mu-tabs>
      </mu-container>

    </div>
</template>

<script>
    export default {
      name: "CustomerOrder",
      data() {
        return {
          active3: 1
        }
      },
      created() {
       this.active3 = this.$route.query.active3;
      },
      methods: {
        toFoods() {
          this.$router.push(
            {path: '/CustomerOrder/Foods'}
          )
        }
      }

    }



</script>

<style scoped>

.CustomerOrder{
  overflow: hidden;
  background-color: #333;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.container {
  padding-right: 0px;
  padding-left: 0px;
}
.demo-text {
  padding: 20px;
  background: #fff;

}

</style>
