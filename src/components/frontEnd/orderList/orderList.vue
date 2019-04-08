<template>
  <div class="orderList" :style="{'width': clientWidth}">
    <mu-container style="width: 100%">
      <mu-tabs inverse :value.sync="active" color="#c62828" text-color="rgba(0, 0, 0, .54)"  indicator-color="#AAAAAA"  full-width>
        <mu-tab>进行中订单</mu-tab>
        <mu-tab>历史订单</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active === 0" >
        <mu-container :style="{'width': clientWidth}" v-for="(item ,index) in OrderMaster" :key="index" v-if="item.omStatus ==0 || item.omStatus ==2">
          <mu-card style="height: 150px; margin-bottom: 20px" >
            <mu-card-text  @click.navict="toAboutOrder(item.omId)">

              <span style="position: absolute;left: 5%;top: 10%;color: green;" v-if="item.omStatus==0">
                进行中
              </span>
              <span style="position: absolute;left: 5%;top: 10%;color: red;" v-if="item.omStatus==2">
                退单中
              </span>
              <span style="position: absolute;right: 5%;top: 10%" v-if="item.omPayStatus==1">
                已结账
              </span>
              <span style="position: absolute;right: 5%;top: 10%" v-if="item.omPayStatus==0">
                未结账
              </span>
              <span style="position: absolute;left: 5%;top: 45%">订单编号：{{item.omId}}</span>
              <!--<div v-for="(od,index) in OrderDetail">
                 <div style="margin-top: 70px" v-if="item.omId ==od.omId">
                        <span>{{OrderDetail[0].fName}}</span>
                        <span style="margin-left: 30px">×{{OrderDetail[0].fQuantity}}</span>
                        <span style="margin-left: 30px">￥{{OrderDetail[0].fPrice}}</span>
                        <span style="margin-left: 30px">....</span>
                </div>
              </div>-->

              <span style="position: absolute;left: 5%;bottom: 5%;font-weight: lighter;font-size: small" >
                        下单时间：{{item.omCreatetime}}
                      </span>
              <span style="position: absolute;right: 5%;bottom: 3%;color:red;font-size: 18px;font-weight: bolder" >
                        ￥{{item.omAmount}}
                      </span>
            </mu-card-text>
          </mu-card>
        </mu-container>
      </div>
      <div class="demo-text" v-if="active === 1">
        <mu-container  v-for="(item ,index) in OrderMaster" :key="index" v-if="item.omStatus == 1 || item.omStatus == 3">
          <mu-card style="height: 150px; margin-bottom: 20px">
            <mu-card-text  @click.navict="toAboutOrder(item.omId)">
              <span style="position: absolute;left: 5%;top: 10%;color: dimgrey;" v-if="item.omStatus==1">
                已完成
              </span>
              <span style="position: absolute;left: 5%;top: 10%;color: dimgrey;" v-if="item.omStatus==3">
                已退单
              </span>
              <span style="position: absolute;right: 5%;top: 10%" v-if="item.omPayStatus==1">
                已结账
              </span>
              <span style="position: absolute;right: 5%;top: 10%" v-if="item.omPayStatus==0">
                未结账
              </span>
              <span style="position: absolute;left: 10%;top: 45%">订单编号：{{item.omId}}</span>
              <!--<div v-for="(od,index) in OrderDetail" style="height: 50px;">
                <div style="margin-top: 70px;" v-if="item.omId ==od.omId">
                  <span>{{OrderDetail[0].fName}}</span>
                  <span style="margin-left: 30px">×{{OrderDetail[0].fQuantity}}</span>
                  <span style="margin-left: 30px">￥{{OrderDetail[0].fPrice}}</span>
                  <span style="margin-left: 30px">....</span>
                </div>
              </div>-->
              <span style="position: absolute;left: 5%;bottom: 5%;font-weight: lighter;font-size: small" >
                          完成时间：{{item.omUpdatetime}}
              </span>
              <span style="position: absolute;right: 5%;bottom: 5%;color:red;font-size: 18px;font-weight: bolder" >
                           ￥{{item.omAmount}}
              </span>
            </mu-card-text>
          </mu-card>
        </mu-container>
      </div>
      <mu-row>
        <mu-col span="12">
          <div class="navigation" id="navigation" style="width: 100%;position: fixed;bottom: 0%;left: 0%">
            <mu-appbar style="width: 100%;" color="#4F4F4F">
              <mu-menu slot="right">
                <mu-button flat > <mu-icon value="menu"></mu-icon></mu-button>
                <mu-list slot="content">
                  <mu-list-item button @click.navict="backFood()">
                    <mu-list-item-content>
                      <mu-list-item-title>
                        首页
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                </mu-list>
              </mu-menu>
            </mu-appbar>
          </div>

        </mu-col>
      </mu-row>
    </mu-container>

  </div>
</template>

<script>
  export default {
      name: "orderList",
      data() {
        return {
          active: 0,
          clientWidth: '',       //设备宽度
          orders:{},
          OrderMaster:{},
          OrderDetail:{},
        }
      },
      methods: {
        backFood(){
          //alert(this.orderInfo.sSeatnum)
          window.location.href="http://192.168.43.139:8088/CustomerOrder/sellPage?sId=8"
        },
        toAboutOrder(omId){
          //this.$router.push("/CustomerOrder/aboutOrder/"+omId)
          window.location.href="http://192.168.43.139:8088/CustomerOrder/aboutOrder/"+omId
        },
        getOrder(orders){
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
            that.orders = res.data.data
            console.log(that.orders)
          }).catch(function (error)
          {
            console.log(error)
            that.loading = false
          })
        },
        getOrderMaster(OrderMaster){
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/queryOrderMaster",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(OrderMaster)
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
            console.log("OrderDetail")
            console.log(that.OrderDetail)
          }).catch(function (error)
          {
            console.log(error)
          })
        }
      },
      watch:{
        active(newV,oldV){
          if(newV == 0){
            //console.log("0")
            this.getOrderDetail()
            let OrderMaster = {}
            this.getOrderMaster(OrderMaster)
          }else if(newV == 1) {
            //console.log("1")
            this.getOrderDetail()
            let OrderMaster = {}
            this.getOrderMaster(OrderMaster)
          }
        }
      },
      mounted(){
        this.getOrderDetail()
        let OrderMaster = {}
        this.getOrderMaster(OrderMaster)
        this.clientWidth = document.documentElement.clientWidth;
        const that = this;
        /*mounted监听窗口大小*/
        window.onresize = function temp() {
          document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
          /*获取设备高度*/
          that.clientWidth = document.documentElement.clientWidth;
        }
      }
  }
</script>

<style scoped>
  .demo-text {
    padding: 16px;
    background: #fff;
    p {
      margin: 8px 0;
    }
  }
</style>
