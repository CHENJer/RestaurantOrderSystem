<template>
  <div class="seatQrCodeImg">
    <el-row>
      <el-col :span="6" v-for="(o, index) in 5" :key="o" :offset="1">

        <el-card shadow="hover" :body-style="{ padding: '10px',textAlign:'center',height:'300px',position: 'relative'}" >
          <el-tooltip placement="top" content="餐桌号">
            <el-tag style="font-size: 30px;font-weight: bolder;position: absolute;left: 38%;bottom: 50%;">
              3A
            </el-tag>
          </el-tooltip>
          <!--左上角-->
          <el-tooltip placement="top">
            <div slot="content">
              <img src="../../../assets/logo.png"><br/>
              <el-button type="info" round size="mini" >更新二维码</el-button>
              <el-button type="danger" round size="mini">打印二维码</el-button>
            </div>
            <el-button style="position: absolute;left: 0%;top: 0%;">11</el-button>
          </el-tooltip>
          <!--右上角-->
          <el-tooltip placement="top">
            <div slot="content">
              <img src="../../../assets/logo.png"><br/>
              <el-button type="info" round size="mini" >更新二维码</el-button>
              <el-button type="danger" round size="mini">打印二维码</el-button>
            </div>
            <el-button style="position: absolute;right: 0%;top: 0%;">11</el-button>
          </el-tooltip>
          <!--左上角-->
          <el-tooltip placement="top">
            <div slot="content">
              <img src="../../../assets/logo.png"><br/>
              <el-button type="info" round size="mini" >更新二维码</el-button>
              <el-button type="danger" round size="mini">打印二维码</el-button>
            </div>
            <el-button style="position: absolute;left: 0%;bottom: 0%;">11</el-button>
          </el-tooltip>
          <!--右下角-->
          <el-tooltip placement="top">
            <div slot="content">
              <img src="../../../assets/logo.png"><br/>
              <el-button type="info" round size="mini" >更新二维码</el-button>
              <el-button type="danger" round size="mini">打印二维码</el-button>
            </div>
            <el-button style="position: absolute;right: 0%;bottom: 0%;">11</el-button>
          </el-tooltip>
        </el-card>
        <div style="width: 20px;height: 20px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "seatQrCodeImg",
      data() {
        return {
          currentDate: new Date()
        }
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
