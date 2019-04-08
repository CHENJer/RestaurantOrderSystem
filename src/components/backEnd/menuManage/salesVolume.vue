<template>
  <div class="salesVolume">
   <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="true" v-on:click.native="changeShow('表格')">表格</el-radio-button>
      <el-radio-button :label="false"  v-on:click.native="changeShow('视图')">视图</el-radio-button>
    </el-radio-group>-->
    <el-row v-show=ischarst>
      <el-col :span="24" style="height: 350px">
        <!--创建一个echarts的容器-->
        <div id="monthechartContainer" style="height:500px"></div>
      </el-col>
    </el-row>


    <div class="salesTable" v-show=!ischarst style="text-align: center">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

        <el-col :span="24" style="height: 390px" v-loading="charstLoading">
          <!--创建一个echarts的容器-->
          <div id="montheFiveContainer" style="height:380px;margin-bottom: 100px"></div>
        </el-col>

        <el-table  :data="tableDatas.filter(data => !search || data.fName.toLowerCase().includes(search.toLowerCase()))"
                   height="500px"
                   style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">

          <el-table-column label="菜品名称" prop="fName" width="160">
          </el-table-column>
          <el-table-column label="单价" prop="fPrice" width="150">
          </el-table-column>
          <el-table-column label="本月订单数" prop="count" width="150">
          </el-table-column>
          <el-table-column label="是否为推荐菜品"  width="150">
            <template slot-scope="scope" >
              <el-tag type="success" v-if="scope.row.fIsrecommend == 1">
                是
              </el-tag>
              <el-tag type="danger" v-else>
                否
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="销量" prop="sum" width="150">
          </el-table-column>
        </el-table>
      </el-col>

    </div>

  </div>
</template>

<script>
    export default {
      name: "salesVolume",
      data(){
        return{
          charstLoading:true,
          ischarst: false,
          isCollapse: true,
          search:'', // 搜索内容
          tableDatas:[],
          foodName:[],
          foodSum:[],
      }
      },
      created() {

      },
      mounted() {
        this.getOrderMonthCount()
        setTimeout(()=>{
            this.monthSales(),
            this.monthFiveSales()
        },3000)

      },
      methods:{
        getOrderMonthCount(){
          let that = this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/selectOrderMonthCount",
            headers:{
              'Content-type': 'application/json'
            },
            data: {}
          }).then((res)=>{
            that.tableDatas = res.data.data
            for(let i =0;i<res.data.data.length;i++){
              that.foodName.push(res.data.data[i].fName)
              that.foodSum.push(res.data.data[i].sum)
            }
            //console.log(that.foodName)
           // console.log(that.foodSum)

          }).catch(function (error)
          {
            console.log(error)
            this.$notify.info("查询失败："+error)
          })
        },
        changeShow(e){
          if(e == '表格'){
            this.ischarst = false
            console.log(this.ischarst)
          }else{
            this.ischarst = true
            console.log(this.ischarst)
          }
        },
        monthSales(){
          //console.log(this.foodName[0],this.foodName[1],this.foodName[2],this.foodName[3],this.foodName[4])
          // 月销售量 基于准备好的dom，初始化echarts实例
          var daymyChart = this.$echarts.init(document.getElementById('monthechartContainer'));
          // 绘制图表
          daymyChart.setOption({
            title: {text: '菜品日销量前五统计'},
            tooltip: {},
            xAxis: {
              data: this.foodName,
              axisLabel: {
                interval:0,
                rotate:40
              }
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: this.foodSum
            }]
          });
        },
        monthFiveSales(){
          //console.log(this.foodName[0],this.foodName[1],this.foodName[2],this.foodName[3],this.foodName[4])
          // 月销售量 基于准备好的dom，初始化echarts实例
          var daymyChart = this.$echarts.init(document.getElementById('montheFiveContainer'));
          // 绘制图表
          daymyChart.setOption({
            title: {text: '菜品月销量前五统计'},
            tooltip: {},
            xAxis: {
              data: [this.foodName[0],this.foodName[1],this.foodName[2],this.foodName[3],this.foodName[4]],
              axisLabel: {
                interval:0,
                rotate:0
              }
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [this.foodSum[0],this.foodSum[1],this.foodSum[2],this.foodSum[3],this.foodSum[4]],
            }]
          });
          this.charstLoading =false
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
