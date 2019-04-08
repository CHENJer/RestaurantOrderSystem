<template>
  <div class="dayStatement">
    <el-row v-loading="isLoading">
      <el-col :span="24">
        <!--创建一个echarts的容器-->
        <div  style="height:20px;text-align: center;font-size: 25px;font-weight: bolder">
          总收入：￥{{countMoney}}
        </div>
      </el-col>
      <el-col :span="24">
        <!--创建一个echarts的容器-->
        <div id="dayechartContainer" style="height:500px"></div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: "salesVolume",
    data(){
      return{
        isLoading:true,
        isCollapse: true,
        days:[],
        amount:[],
        countMoney:0,
      }
    },
    created() {

    },
    mounted() {
      this.getOrderMonthCount()
      setTimeout(()=>{
        this.daySales()
      },2000)

    },
    methods:{
      getOrderMonthCount(){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/Order/selectOrderDay",
          headers:{
            'Content-type': 'application/json'
          },
          data: {}
        }).then((res)=>{
          for(let i =0 ; i<res.data.data.length; i++){
            that.days.push(res.data.data[i].days)
            that.amount.push(res.data.data[i].sum)
            that.countMoney = that.countMoney + res.data.data[i].sum
          }
          console.log(that.days)
          console.log(that.amount)

        }).catch(function (error)
        {
          console.log(error)
          that.$notify.info("查询失败："+error)
        })
      },

      daySales(){
        //  基于准备好的dom，初始化echarts实例
        var daymyChart = this.$echarts.init(document.getElementById('dayechartContainer'));
        // 绘制图表
        daymyChart.setOption({
          title: {text: '餐厅日营业额统计'},
          tooltip:{
            formatter: "{b}日 : {c}元"
          },
          xAxis: {
            type: 'category',
            data: this.days,
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            data: this.amount,
            type: 'line',

          }]
        });
        this.isLoading = false
      },
    }

  }

</script>

<style>
  .salesVolume{
    width: 100%;
    float: left;
    display:inline
  }
</style>
