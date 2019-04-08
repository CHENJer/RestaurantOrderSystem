<template>
    <div class="alipayStatus">
        支付成功，正在跳转
    </div>
</template>

<script>
    export default {
      name: "alipayStatus",
      data() {
        return {
          omId:''
        }
      },
      methods: {
        alipayStatus(Order){
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/updateOrder",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(Order)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            this.$toast.message("支付成功，正在跳转订单详情页....")
            setTimeout(()=>{
              window.location.href='http://192.168.43.139:8088/CustomerOrder/aboutOrder/'+this.omId
            },1000)
          }).catch(function (error)
          {
            console.log(error)
          })
        }
      },
      mounted() {
        let url = window.location.href
        let urllength = url.indexOf('alipayStatus/')+13
        this.omId = url.substring(urllength,urllength+18);
        let order = {"omId":this.omId,"omPayStatus":1}
        this.alipayStatus(order)
        let goEasy = new GoEasy({appkey: 'BC-fa9286de3f184384a585e6f0429788f8'});
        goEasy.publish ({
          channel: 'newsOrder',
          message: '有顾客下单了'
        });
      }
    }
</script>

<style scoped>

</style>
