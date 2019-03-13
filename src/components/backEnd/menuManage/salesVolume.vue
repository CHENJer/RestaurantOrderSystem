<template>
  <div class="salesVolume">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="true" v-on:click.native="changeShow('表格')">表格</el-radio-button>
      <el-radio-button :label="false"  v-on:click.native="changeShow('视图')">视图</el-radio-button>
    </el-radio-group>
    <el-row v-show=ischarst>
      <el-carousel :interval="5000" arrow="always" height="500px" :autoplay=false>
        <el-carousel-item>
          <el-col :span="8">
            <!--创建一个echarts的容器-->
            <div id="dayechartContainer" style="width:350px; height:500px"></div>
          </el-col>
          <el-col :span="8">
            <!--创建一个echarts的容器-->
            <div id="monthechartContainer" style="width:350px; height:500px"></div>
          </el-col>
          <el-col :span="8">
            <!--创建一个echarts的容器-->
            <div id="yearechartContainer" style="width:350px; height:500px"></div>
          </el-col>
        </el-carousel-item>
        <el-carousel-item>
          <el-col :span="8">
            <!--创建一个echarts的容器-->
            <div id="dayRoundTable" style="width:350px; height:500px"></div>
          </el-col>
          <el-col :span="8">
            <!--创建一个echarts的容器-->
            <div id="monthRoundTable" style="width:350px; height:500px"></div>
          </el-col>
          <el-col :span="8">
            <!--创建一个echarts的容器-->
            <div id="yearRoundTable" style="width:350px; height:500px"></div>
          </el-col>
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <div class="salesTable" v-show=!ischarst style="text-align: center">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="查询公告">
            <el-input v-model="search" placeholder="请输入公告的标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </div>

  </div>
</template>

<script>
    export default {
      name: "salesVolume",
      data(){
        return{
          ischarst: false,
          isCollapse: true,
          search:'', // 搜索内容
          option:{
            backgroundColor: '#2c343c',
            title: {
              text: 'Customized Pie',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#ccc'
              }
            },

            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series : [
              {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:274, name:'联盟广告'},
                  {value:235, name:'视频广告'},
                  {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                  normal: {
                    textStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ]
          }
        }
      },
      created() {

      },
      mounted() {
        this.daySales(),
        this.monthSales(),
        this.yearSales(),
        this.dayRoundTable(),
        this.monthRoundTable(),
        this.yearRoundTable()
      },
      methods:{
        changeShow(e){
          if(e == '表格'){
            this.ischarst = false
            console.log(this.ischarst)
          }else{
            this.ischarst = true
            console.log(this.ischarst)
          }
        },
        daySales(){
          // 月销售量 基于准备好的dom，初始化echarts实例
          var daymyChart = this.$echarts.init(document.getElementById('dayechartContainer'));
          // 绘制图表
          daymyChart.setOption({
            title: {text: '菜品日销量前五统计'},
            tooltip: {},
            xAxis: {
              data: ["炒面", "牛肉排骨", "艇仔粥", "牛肉丸汤", "煲仔饭"],
              axisLabel: {
                interval:0,
                rotate:40
              }
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [50, 200, 360, 100, 100]
            }]
          });
        },
        monthSales(){
          // 月销售量 基于准备好的dom，初始化echarts实例
          var monthmyChart = this.$echarts.init(document.getElementById('monthechartContainer'));
          // 绘制图表
          monthmyChart.setOption({
            title: {text: '菜品月销量前五统计'},
            tooltip: {},
            xAxis: {
              data: ["炒面", "牛肉", "艇仔粥", "牛肉", "煲仔饭"],
              axisLabel: {
                interval:0,
                rotate:40
              }
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [50, 200, 360, 100, 100]
            }]

          });
        },
        yearSales(){
          // 月销售量 基于准备好的dom，初始化echarts实例
          var yearmyChart = this.$echarts.init(document.getElementById('yearechartContainer'));
          // 绘制图表
          yearmyChart.setOption({
            title: {text: '菜品年销量前五统计'},
            tooltip: {},
            xAxis: {
              data: ["炒面", "牛肉", "艇仔粥", "牛肉", "煲仔饭"],
              axisLabel: {
                interval:0,
                rotate:40
              }
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [50, 200, 360, 100, 100]
            }]
          });
        },
        dayRoundTable(){
          var daymyChart = this.$echarts.init(document.getElementById('dayRoundTable'));
          daymyChart.setOption(this.option)
        },
        monthRoundTable(){
          var monthmyChart = this.$echarts.init(document.getElementById('monthRoundTable'));
          monthmyChart.setOption(this.option)
        },
        yearRoundTable(){
          var yearmyChart = this.$echarts.init(document.getElementById('yearRoundTable'));
          yearmyChart.setOption(this.option)
        },
        onSubmit(){

        }
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
