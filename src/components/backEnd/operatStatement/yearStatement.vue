<template>
  <div class="yearStatement">
    <el-row v-loading="isLoading">
      <el-col :span="24">
        <!--创建一个echarts的容器-->
        <div  style="height:20px;text-align: center;font-size: 25px;font-weight: bolder">
          总收入：￥{{countMoney}}
        </div>
      </el-col>
      <el-col :span="24">
        <!--创建一个echarts的容器-->
        <div id="yearechartContainer" style="height:500px"></div>
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
        years:[],
        amount:[],
        countMoney:0,
      }
    },
    created() {

    },
    mounted() {
      this.getOrderMonthCount()
      setTimeout(()=>{
        this.yearsales()
      },2000)

    },
    methods:{
      getOrderMonthCount(){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/Order/selectOrderYear",
          headers:{
            'Content-type': 'application/json'
          },
          data: {}
        }).then((res)=>{
          for(let i =0 ; i<res.data.data.length; i++){
            that.years.push(res.data.data[i].years)
            that.amount.push(res.data.data[i].sum)
            that.countMoney = that.countMoney + res.data.data[i].sum
          }

          console.log(that.years)
          console.log(that.amount)

        }).catch(function (error)
        {
          console.log(error)
          that.$notify.info("查询失败："+error)
        })
      },

      yearsales(){
        // 月销售量 基于准备好的dom，初始化echarts实例
        var yearmyChart = this.$echarts.init(document.getElementById('yearechartContainer'));
        // 绘制图表
        yearmyChart.setOption({
          title: {text: '餐厅年营业统计'},
          tooltip:{},
          xAxis: {
            type: 'category',
            data: this.years,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.amount,
            type: 'line',
            name: '营业额',
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
