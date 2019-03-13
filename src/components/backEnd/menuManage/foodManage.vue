<template>
  <div class="foodManage">
    <div style="height: 100px;text-align: center">
      <!--查询工具条-->
      <el-col :span="24" class="" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="search" size="medium" placeholder="请输入菜品名搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit">搜素</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <div class="main" v-show="!isSearch">
      <el-row>
        <el-col :span="5" v-for="(o, index) in 20" :key="o" :offset="1">
          <el-card shadow="hover" :body-style="{ padding: '10px',textAlign:'center',width:'230px',height:'300px',position: 'relative'}" >
            <img src="../../../assets/logo.png" class="image" width="100px">
            <div style="padding: 10px;">
              <span style="font-size: 20px;font-weight: bolder">啦啦啦啦</span>
              <div style="margin-bottom: 5px">详情dsdasdasdasdsadsad</div>
              <div class="bottom clearfix" style="position: absolute;left: 10%;bottom: 5%;">
                <div style="margin-bottom: 5px">价格：￥12</div>
                <div style="margin-bottom: 5px"> <time class="time">{{ currentDate | shortTime }}</time>  </div>
                <el-button type="info" round size="mini">修改菜品</el-button>
                <el-button type="danger" round size="mini">删除菜品</el-button>
              </div>
            </div>
          </el-card>
          <div style="width: 20px;height: 20px"></div>
        </el-col>
      </el-row>
    </div>
    <div class="searchFood" v-show="isSearch">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'foodManage',
    data() {
      return {
        search:'',
        isSearch:false
      }
    },
    methods: {
      onSearchSubmit(){
        if(this.search.length==0){
          this.isSearch=false
        }else{
          this.isSearch=true
        }

      }
    }
  }
</script>

<style>

</style>
