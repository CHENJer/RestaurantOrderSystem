<template>
    <div class="kitchenFoodSet">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="菜品设置" name="first" id="foodover">
          <div style="height: 100px;text-align: center">
            <!--查询工具条-->
            <el-col :span="24" class="" style="padding-bottom: 0px;">
              <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
                <el-form-item>
                  <el-input v-model="outSearch" size="medium" placeholder="请输入菜品名搜索"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit('outSearch')">查询</el-button>
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
                    <div class="bottom clearfix" style="position: absolute;left: 20%;bottom: 5%;">
                      <div >价格：
                        <span style="color: red;font-size: 18px;font-weight: bold;">￥{{item.fPrice}}</span>
                      </div>
                      <div >余量：
                        <span v-if="item.fSavenum == null">暂无</span>
                        <span v-else style="color: red;font-size: 18px;font-weight: bold;margin-bottom: 20px">￥{{item.fPrice}}</span>
                      </div>
                      <div style="height: 10px"></div>
                      <el-button type="danger" round size="mini" :value="item.fId" @click="tofoodover(item.fId)">下架</el-button>
                      <el-button type="info" round size="mini" :value="item.fId" @click="saveNum(item.fId)">库存</el-button>
                      <!--<el-button type="info" round size="mini" :value="item.fId" v-else>取消推荐</el-button>-->
                    </div>
                    <el-dialog title="请输入库存"
                      :visible.sync="dialogVisible"
                      width="30%" style="border: 0px">
                      <input type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                             style="margin-left: 50px;text-align: center;border: 1px solid #ccc;
                      padding: 7px 0px;border-radius: 3px;padding-left:5px;"  placeholder="请输入库存"
                      >
                      </input>
                      <div style="margin-top: 15px;margin-left: 50px">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                      </div>
                    </el-dialog>
                  </div>
                </el-card>
                <div style="width: 20px;height: 20px"></div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="菜品恢复" name="second" id="foodRecover">
          <div style="height: 100px;text-align: center">
            <!--查询工具条-->
            <el-col :span="24" class="" style="padding-bottom: 0px;">
              <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
                <el-form-item>
                  <el-input v-model="RecoverSearch" size="medium" placeholder="请输入菜品名搜索"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit('RecoverSearch')">查询</el-button>
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
                      <el-button type="danger" round size="mini" :value="item.fId" @click="tofoodRecover(item.fId)">菜品恢复</el-button>
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
    name: "kitchenFoodSet",
    data(){
      return{
        activeName: 'first',
        outSearch:'',
        RecoverSearch:'',
        foods:{},
        input:'',
        dialogVisible:false
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab.$el.id);
        if(tab.$el.id== "foodRecover"){
          let food = { "fStatus": 1}
          this.getFood(food)
          console.log(this.foods);
        }else if(tab.$el.id== "foodover"){
          let food = { "fStatus": 0}
          this.getFood(food)
          console.log(this.foods);
        }

      },
      onSearchSubmit(type){
        if(type == 'RecoverSearch'){
          let food = { "fStatus": 1,"fName":this.RecoverSearch}
          this.LikequeryFood(food)
          if(type == ''){
            let food = { "fStatus": 1}
            this.getFood(food)
          }
        }else if(type == 'outSearch'){
          let food = { "fStatus": 0,"fName":this.outSearch}
          this.LikequeryFood(food)
          if(type == ''){
            let food = { "fStatus": 0}
            this.getFood(food)
          }
        }

      },
      tofoodover(fId){
        /*更新菜品信息*/
        let food = {"fId":fId ,"fStatus": 1}
        this.updateFood(food)
        let getfood = { "fStatus": 0}
        /*延迟一秒调用getFood方法*/
        setTimeout(() => {
          this.getFood(getfood)
        },1000)
        this.$notify.success("下架成功")
      },
      saveNum(fId){
        this.dialogVisible = true
     /*   this.$alert('<input v-model="input" type="number" min="0" ' +
          ' style="margin-left: 100px;text-align: center;border: 1px solid #ccc;' +
          'padding: 7px 0px;border-radius: 3px;' +
          'padding-left:5px;" ' +
          'placeholder="请输入库存" ' +
          'oninput="this.value = this.value.replace(/[^0-9]/g, \'\');">' +
          '</input>', '输入库存', {
          dangerouslyUseHTMLString: true
        });
        //console.log(fId)
        let food ={"fId":fId,"fSavenum":this.input}
        this.updateFood(food)
        setTimeout(()=>{
          let getfood = { "fStatus": 1}
          setTimeout(() => {this.getFood(getfood)},1000)
        },1000)*/
      },
      tofoodRecover(fId){
        let food = {"fId":fId ,"fStatus": 0}
        this.updateFood(food)
        let getfood = { "fStatus": 1}
        setTimeout(() => {this.getFood(getfood)},1000)
        this.$notify.success("恢复成功")
      },
      getFood(food){
        let that = this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/queryFoodAndMenu",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(food)
        }).then((res)=>{
          //console.log(res.data.data[0].pType);
          that.foods = res.data.data
        }).catch(function (error)
        {
          console.log(error)
          that.$notify.info("加载数据失败")
        })
      },
      LikequeryFood(foodName){
        let that = this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/LikequeryFood",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(foodName)
        }).then((res)=>{
          that.foods = res.data.data
        }).catch(function (error)
        {
          console.log(error)
        })
      },
      updateFood(food){
        let that = this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/updateFood",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(food)
        }).then((res)=>{
          console.log(res)
        }).catch(function (error)
        {
          console.log(error)
        })
      }
    },
    mounted(){
      let food = { "fStatus": 0}
        this.getFood(food)
    }
  }
</script>

<style scoped>

</style>
