<template>
    <div class="orderView">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="进行中" name="doing" id="doing">
          <el-row :gutter="100" style="height:500px;overflow: scroll">
            <el-col :span="12">
              <template v-for="(item,index) in OrderMaster" v-if="item.omStatus == 0 && item.omPayStatus ==1 ">
                  <el-card class="box-card" style="margin-bottom: 20px">
                      <div slot="header" class="clearfix" style="margin-top: 20px">
                      <span>桌号:</span>
                      <span style="margin-left:20px;color: red;font-weight: bolder;font-size: 18px">
                      {{item.tNum}}{{item.sSeatnum}}
                      </span>
                      <el-button flat @click="finishFood(item.omId)" style="float: right" type="text">
                        完成
                      </el-button>
                      <div style="height: 10px"></div>
                      <span style="font-weight: lighter">
                      下单时间：{{item.omCreatetime}}
                     </span>
                    </div>
                    <div style="font-size: 20px;font-weight:bolder;margin-bottom: 15px">备注：{{item.omDesc}}</div>
                    <div class="text item" v-for="(od,index) in OrderDetail" :key="index" v-if="od.omId == item.omId">

                      <span style="font-size: 18px;font-weight: bolder;margin-left: 30px">
                        {{od.fName}}
                      </span>
                      <span style="font-size: 18px;font-weight: bolder;position: absolute;left: 35%">
                        ×{{od.fQuantity}}
                      </span>
                    </div>
                  </el-card>

              </template>
            </el-col>
            <el-col :span="12">
              <div class="block">
                <el-timeline :reverse="reverse">
                  <el-timeline-item  v-for="(items, index) in OrderMaster" v-if="items.omIsreminder == 1 && items.omStatus == 0"
                       :key="index" :timestamp="items.omRemindertime" placement="top">
                    <el-card :value="12">
                      <el-badge :value="items.omRemindernum" class="item">
                        <h4>催单</h4>
                      </el-badge>
                      <span style="position: relative;left:30%;top:50%;font-size: 18px">
                        {{items.tNum}}{{items.sSeatnum}}
                      </span>
                      <div style="position: relative;left:0%;top:50%;font-weight: lighter">
                        下单时间：{{items.omCreatetime}}
                      </div>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="finish" id="finish">
          <el-row :gutter="250" style="height:500px;overflow: scroll">
            <el-col :span="24">
              <template v-for="(items,index) in OrderMaster" v-if="items.omStatus == 1">
                <el-card class="box-card" style="margin-bottom: 20px" >
                  <div slot="header" class="clearfix">
                    <span>桌号:</span>
                    <span style="margin-left:20px;color: red;font-weight: bolder;font-size: 18px">
                      {{items.tNum}}{{items.sSeatnum}}
                    </span>
                    <span style="margin-left:20px;font-weight: lighter">
                      下单时间：{{items.omCreatetime}}
                    </span>
                    <span style="margin-left:20px;font-weight: lighter">
                      完成时间：{{items.omUpdatetime}}
                    </span>

                    <el-button flat style="float: right; padding: 3px 0" type="text">
                      已完成
                    </el-button>
                    <el-button flat @click="chang(items.omId,items.omUpdatetime)" v-if="new Date().getTime()-new Date(items.omUpdatetime).getTime() < 300000 "
                               style="float: right; padding: 3px 0;margin-right: 30px" type="text">
                      撤销
                    </el-button>
                  </div>
                  <div class="text item" v-for="(od,index) in OrderDetail" :key="index" v-if="od.omId == items.omId">
                    <div>
                      <span style="font-size: 18px;font-weight: bolder;margin-left: 30px">
                      {{od.fName}}
                      </span>
                      <span style="font-size: 18px;font-weight: bolder;position: absolute;left: 50%">
                        ×{{od.fQuantity}}
                      </span>
                    </div>

                  </div>
                </el-card>
              </template>

            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  let goEasy = new GoEasy({appkey: 'BS-5c690639637b4e91a82db6fd25d5dc96'});
    export default {
      name: "orderView",
      data(){
        return{
          activeName: 'doing',
          reverse: false,
          OrderDetail:[
            {tNum:''}
          ],
          OrderMaster:{},
          orders:{},

        }
      },

      methods:{
        finishFood(omId){
          this.$confirm('确定完成菜品？?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          }).then(() => {
            let order = {"omId":omId,"omStatus": 1}
            this.updateOrderMaster(order)
            let goEasy = new GoEasy({appkey: 'BC-fa9286de3f184384a585e6f0429788f8'});
            goEasy.publish ({
              channel: 'newsOrder',
              message: '厨房制作完成了，请耐心等待！'
            });
            this.$message({type: 'success', message: '完成菜品!'});
          }).catch(() => {
            this.$message({type: 'info', message: '已取消完成菜品'});
          })
          setTimeout(() => {
            this.getOrder()
            this.getOrderMaster()
            this.getOrderDetail()
          }, 1000);

        },
        chang(omId,omUpdatetime){
          this.$confirm('确定撤销菜品状态？?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          }).then(() => {
            let order = {"omId":omId,"omStatus": 0}
            this.updateOrderMaster(order)
            let goEasy = new GoEasy({appkey: 'BC-fa9286de3f184384a585e6f0429788f8'});
            goEasy.publish ({
              channel: omId,
              message: '菜品撤销完成状态'
            });
            this.$message({type: 'success', message: '撤销完成!'});
          }).catch(() => {
            this.$message({type: 'info', message: '已取消撤销菜品'});
          })
          setTimeout(() => {
            this.getOrder()
            this.getOrderMaster()
            this.getOrderDetail()
          }, 1000);
        },
        handleClick(tab, event) {
          this.getOrder()
          this.getOrderMaster()
          this.getOrderDetail()
          //console.log(tab.$el.id);
        },
        getOrder(){
          let orders = {}
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/queryOrder",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(orders)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.loading = false
            //that.orders = res.data.data
          //  console.log(that.orders)
          }).catch(function (error)
          {
            console.log(error)
            that.loading = false
          })
        },
        getOrderMaster(){
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/queryOrderMasterInfo",
            headers:{
              'Content-type': 'application/json'
            }
            /*data: JSON.stringify(OrderMaster)*/
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.OrderMaster = res.data.data
            console.log(that.OrderMaster)
          }).catch(function (error)
          {
            console.log(error)
          })
        },
        getOrderDetail(){
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/queryOrderDetailInfo",
            headers:{
              'Content-type': 'application/json'
            },
            /*data: JSON.stringify(OrderDetail)*/
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.OrderDetail = res.data.data
            console.log(that.OrderDetail)
          }).catch(function (error)
          {
            console.log(error)
          })
        },
        updateOrderMaster(Order){
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

          }).catch(function (error)
          {
            console.log(error)
          })
        },

      },
     mounted() {
       this.newOrderMsg=this.$store.state.newOrderMsg
        this.getOrder()
        this.getOrderMaster()
        this.getOrderDetail()
     },
      watch: {
        newOrderMsg(newV,oldV) {
          let that = this;
          // 配置Goeasy订阅方
          goEasy.subscribe({
            /*配置channel值，只能接受相同channel的消息*/
            channel: 'newsOrder',
            onMessage: function(message){
              //下单时提示
              if(message.content=="有顾客下单了"){
                that.newOrderMsg = message.content
                /*延迟更新菜品视图*/
                setTimeout(()=>{
                  this.getOrder()
                  this.getOrderMaster()
                  this.getOrderDetail()
                },3000)
                //催单时提示
              }else if(message.content=="有顾客催单了"){
                that.newOrderMsg = message.content
                setTimeout(()=>{
                  console.log("催单")
                  this.getOrder()
                  this.getOrderMaster()
                  this.getOrderDetail()
                },3000)
              }
            }
          });
        }
      },
    }
</script>

<style scoped>

</style>
