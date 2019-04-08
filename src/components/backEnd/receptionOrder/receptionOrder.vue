<template>
  <div class="receptionOrder">
    <div style="height: 100px;text-align: center">
      <!--查询工具条-->
      <el-col :span="24" class="" style="padding-bottom: 0px;margin-top: 20px">
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="search" size="medium" placeholder="请输入菜品名搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="5" v-for="(o, index) in 20" :key="o" :offset="1">
          <el-card shadow="hover" style="width: 100%;text-align: center;height: 350px;position: relative" >
            <img src="../../../assets/logo.png" class="image" width="100%">
            <div style="padding: 10px;">
              <span style="font-size: 20px;font-weight: bolder">啦啦啦啦</span>
              <div class="bottom clearfix" style="position: absolute;left: 10%;bottom: 10%;">
                <div style="margin-bottom: 5px">月销量：13513</div>
                <div style="margin-bottom: 5px">销量排行：1</div>
                <div style="margin-bottom: 5px"> <time class="time">{{ currentDate | shortTime }}</time>  </div>
                <el-button type="info" round size="mini">取消</el-button>
                <el-button type="danger" round size="mini">推荐</el-button>
              </div>
            </div>
          </el-card>
          <div style="width: 20px;height: 20px"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "receptionOrder",
      data(){
        return{
          search:'',
          currentDate:new Date()
        }
      },
      methods:{
        onSearchSubmit(){

        },
        handleAdd(){

        }
      }
    }
</script>

<style scoped>

</style>
