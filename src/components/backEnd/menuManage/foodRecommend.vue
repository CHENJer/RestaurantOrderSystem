<template>
    <div class="foodRecommend">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--推荐菜品-->
        <el-tab-pane label="推荐菜品" name="first">
          <div style="height: 100px;text-align: center">
            <!--查询工具条-->
            <el-col :span="24" class="" style="padding-bottom: 0px;">
              <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
                <el-form-item>
                  <el-input v-model="searchRecommed" size="medium" placeholder="请输入菜品名搜索"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit('推荐')">查询</el-button>
                </el-form-item>

              </el-form>
            </el-col>
          </div>
          <el-row>
              <el-col :span="6" v-for="(item,key,index) in recommendfoods" :key="index" :offset="1">
                <el-card shadow="hover" style="width: 100%;text-align: center;height: 400px;position: relative" >
                  <img :src="item.fPic" class="image" width="100%">
                  <div>
                    <span style="font-size: 20px;font-weight: bolder">{{item.fName}}</span>
                    <el-input type="textarea" :value="item.fDesc" disabled style="font-weight: bolder;color: black;"></el-input>
                    <!--
                                  <div style="margin-top: 10px;overflow: scroll;">{{item.fDesc}}</div>
                    -->
                    <div class="bottom clearfix" style="position: absolute;left: 25%;bottom: 5%;">
                      <div >价格：
                        <span style="color: red;font-size: 18px;font-weight: bold">￥{{item.fPrice}}</span>
                      </div>
                      <div style="height: 10px"></div>
                      <el-button type="info" round size="mini" :value="item.fId" @click="quitRecommendfood(item.fId)" v-loading="loading">取消推荐</el-button>
                      <!--<el-button type="danger" round size="mini" :value="item.fId" >下架</el-button>-->
                    </div>
                  </div>
                </el-card>
                <div style="width: 20px;height: 20px"></div>
              </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="全部菜品" name="second">
          <div style="height: 100px;text-align: center">
            <!--查询工具条-->
            <el-col :span="24" class="" style="padding-bottom: 0px;">
              <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
                <el-form-item>
                  <el-input v-model="search" size="medium" placeholder="请输入菜品名搜索"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit('全部')">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </div>
          <div class="main">
            <el-row>
              <el-col :span="6" v-for="(item,key,index) in foods" :key="index" :offset="1">
                <el-card shadow="hover" style="width: 100%;text-align: left;height: 400px;position: relative" >
                  <img :src="item.fPic" class="image" width="100%">
                  <div>
                    <span style="font-size: 20px;font-weight: bolder">{{item.fName}}</span>
                    <el-input type="textarea" :value="item.fDesc" disabled style="font-weight: bolder;color: black;"></el-input>
                    <!--
                                  <div style="margin-top: 10px;overflow: scroll;">{{item.fDesc}}</div>
                    -->
                    <div class="bottom clearfix" style="position: absolute;left: 25%;bottom: 5%;">
                      <div >价格：
                        <span style="color: red;font-size: 18px;font-weight: bold;margin-bottom: 20px">￥{{item.fPrice}}</span>
                      </div>
                      <div style="height: 10px"></div>
                      <el-button type="danger" round size="mini" :value="item.fId" @click="toRecommendfood(item.fId)" v-loading="loading">推荐菜品</el-button>
                      <!--<el-button type="info" round size="mini" :value="item.fId" v-else>取消推荐</el-button>-->
                    </div>
                  </div>
                </el-card>
                <div style="width: 20px;height: 20px"></div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
</template>

<script>
    export default {
      name: "foodRecommend",
      data(){
        return{
          search:'',
          searchRecommed:'',
          loading:true,
          isrecommend:true,
          activeName: 'second', //标签页
          currentDate:new Date(),
          tofood:{},
          recommendfoods:{},
          foods:{}
        }
      },
      methods:{
        onSearchSubmit(e){
          if(e=='全部'){
            if(this.search!=''){
              let foodName = {"fName":this.search,"fIsrecommend":0}
              this.LikequeryFood(JSON.parse(JSON.stringify(foodName)))
            }else{
              let tofood ={"fIsrecommend":0}
              this.getFood(tofood)
            }


          }else if(e=='推荐'){
            if(this.searchRecommed!=''){
              let foodName = {"fName":this.searchRecommed,"fIsrecommend":1}
              this.LikequeryFood(JSON.parse(JSON.stringify(foodName)))
            }else{

              let tofood ={"fIsrecommend":1}
              this.getFood(tofood)
            }

          }
        },
        handleClick(tab, event) {
         if(this.activeName=='second'){
           let tofood ={"fIsrecommend":0}
           this.getFood(tofood)
         }else if (this.activeName=='first') {

           let tofood ={"fIsrecommend":1}
           this.getFood(tofood)
         }

        },
        addFood(){
          this.dialogVisible = false
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        toRecommendfood(fId){
          console.log("fId："+fId)
          let food = {"fId":fId,"fIsrecommend":1}
          this.loading = true
          this.updateFood(food)

          setTimeout(() => {
            let tofood ={"fIsrecommend":0}
            this.getFood(tofood)
            this.loading = false
            this.$notify.success("推荐成功")

          },1000)
        },
        quitRecommendfood(fId){
          console.log("fId："+fId)
          let food = {"fId":fId,"fIsrecommend":0}
          this.loading = true
          this.updateFood(food)

          setTimeout(() => {
            let tofood ={"fIsrecommend":1}
            this.getFood(tofood)
            this.loading = false
            this.$notify.success("取消成功")
          },1000)
        },
        getFood(food){
          let that = this
          this.loading = true
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/queryFoodAndMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(food)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.loading = false
            if(food.fIsrecommend == 1){
              that.recommendfoods = res.data.data
            }else {
              that.foods = res.data.data
            }
          }).catch(function (error)
          {
            console.log(error)
            that.$notify.info("加载数据失败")
            that.loading = false
          })
        },
        LikequeryFood(foodName){
          let that = this
          this.loading = true
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/LikequeryFood",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(foodName)
          }).then((res)=>{
            that.loading = false
            that.recommendfoods = res.data.data
            that.foods = res.data.data
            console.log("foods")
            console.log(that.foods)

            that.$notify.info("查询成功")
          }).catch(function (error)
          {
            that.loading = false
            console.log(error)
          })
        },
        updateFood(food){
          let that = this
          this.loading = true
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/updateFood",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(food)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.loading = false
          }).catch(function (error)
          {
            that.loading = false
            console.log(error)
          })
        }
      },
      mounted() {
        let food ={"fIsrecommend":0}
        this.getFood(food)
      }
    }
</script>

<style scoped>

</style>
