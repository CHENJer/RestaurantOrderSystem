<template>
  <div class="aboutOrder">
    <mu-row style="height: 2rem;line-height: 1rem">
      <mu-col span="12">
        <div style="text-align: center;margin-top:20px;" v-if="orderInfo.omPayStatus == 0">
          <div style="font-size: 20px;margin-top:30px;font-weight: bolder;color: red">未付款，请先付款</div>
        </div>
        <div style="text-align: center;margin-top:20px;" v-if="orderInfo.omPayStatus == 1">
          <div style="text-align: center;" v-if="orderInfo.omStatus == 0">
            <div style="font-size: 20px;margin-top:20px;font-weight: bolder;">下单成功</div>
            <div style="font-size: 16px;margin-top:20px;font-weight: lighter;color:red">请耐心等待厨房制作，请不要随便更改座位</div>
          </div>
          <div style="text-align: center;" v-if="orderInfo.omStatus == 1">
            <div style="font-size: 20px;margin-top:20px;font-weight: bolder;color:green">已完成</div>
          </div>
          <div style="text-align: center;" v-if="orderInfo.omStatus == 2">
            <div style="font-size: 20px;margin-top:20px;font-weight: bolder;color:red">退单中...</div>
          </div>
          <div style="text-align: center;" v-if="orderInfo.omStatus == 3">
            <div style="font-size: 20px;margin-top:20px;font-weight: bolder;color:red">已退单</div>
          </div>
        </div>

      </mu-col>
    </mu-row>
    <mu-row style="height: 2rem;line-height: 1rem;margin-top:20px;">
      <mu-col span="12">
        <div style="text-align: center;margin-top:20px;" v-if="orderInfo.omPayStatus == 0">
          <mu-button color="error" @click="alipay()">
             去付款
          </mu-button>
        </div>
        <div v-if="orderInfo.omPayStatus == 1">
          <div style="text-align: center;margin-top:20px;" v-if="orderInfo.omStatus == 0">
            <mu-button flat @click.native="orderTip(0)">
              <mu-icon left value="delete"></mu-icon>
              退单
            </mu-button>
            <mu-button flat color="secondary" @click.native="orderTip(1)">
              <mu-icon left value="alarm"></mu-icon>
              催单
            </mu-button>
          </div>
          <div style="text-align: center;margin-top:20px;" v-if="orderInfo.omStatus != 0">
            <mu-button flat @click.native="orderTip(0)" disabled>
              <mu-icon left value="delete"></mu-icon>
              退单
            </mu-button>
            <mu-button flat color="secondary" @click.native="orderTip(1)" disabled>
              <mu-icon left value="alarm"></mu-icon>
              催单
            </mu-button>
            <mu-dialog title="确定退单" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
              您的菜品可能已经在制作中了，退单需要商家审核，确定继续退单？
              <mu-button slot="actions" flat color="primary" @click="AlertDialog('0')">取消</mu-button>
              <mu-button slot="actions" flat color="primary" @click="AlertDialog('1')">确定</mu-button>
            </mu-dialog>
          </div>
        </div>


      </mu-col>
    </mu-row>
    <mu-row style="height: 3rem;line-height: 3rem" v-if="orderInfo.omStatus == 0">
      <mu-col span="12">
        <mu-stepper :active-step="activeStep">
          <mu-step >
            <mu-step-label  style="font-size: 16px;font-weight: bold">
              餐厅接单
            </mu-step-label>
          </mu-step>
          <mu-step>
            <mu-step-label>
              厨房制作
            </mu-step-label>
          </mu-step>
          <mu-step>
            <mu-step-label>
              完成
            </mu-step-label>
          </mu-step>
        </mu-stepper>
      </mu-col>
    </mu-row>
    <mu-row style="height: 3rem;line-height: 3rem" v-if="orderInfo.omStatus != 0">
      <mu-col span="12">
        <mu-stepper :active-step="3">
          <mu-step >
            <mu-step-label  style="font-size: 16px;font-weight: bold">
              餐厅接单
            </mu-step-label>
          </mu-step>
          <mu-step>
            <mu-step-label>
              厨房制作
            </mu-step-label>
          </mu-step>
          <mu-step>
            <mu-step-label>
              完成
            </mu-step-label>
          </mu-step>
        </mu-stepper>
      </mu-col>
    </mu-row>

    <mu-row>
      <mu-col span="12" >
        <mu-container>
          <mu-row gutter style="position: absolute;left: 0%;top: 5%; width: 102%">
            <mu-col>
              <mu-paper :z-depth="0">
                <mu-list>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        订单号： <span style="margin-left: 0.5rem;font-size: larger;">{{omId}}</span>
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-divider shallow-inset></mu-divider>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        当前桌号：
                        <span style="margin-left: 0.5rem;font-size: larger;color: red">{{orderInfo.tNum}}{{orderInfo.sSeatnum}}</span>
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-divider shallow-inset></mu-divider>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        下单时间：<span style="margin-left: 0.5rem;font-size: larger;">{{orderInfo.omCreatetime}}</span>
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-divider shallow-inset></mu-divider>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        支付方式：支付宝
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        支付金额：
                        <span style="color: red;font-size: 18px">￥{{orderInfo.omAmount}}</span>
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                </mu-list>
                <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')" :z-depth="0">
                  <div slot="header">已点菜品：</div>
                  <mu-list style="overflow: auto;">
                    <mu-list-item v-for="(items, index) in order" :key="index">
                      <mu-list-item-content>

                        <mu-list-item-title>
                          <span>{{items.fName}}</span>
                          <span style="position: absolute;left: 60%;top: 25%">× {{items.fQuantity}}</span>
                          <span style="position: absolute;left: 80%;top: 25%">￥ {{items.fPrice}}</span>
                        </mu-list-item-title>
                      </mu-list-item-content>
                    </mu-list-item>
                  </mu-list>
                  <div style="height: 100px"></div>
                </mu-expansion-panel>
              </mu-paper>
            </mu-col>
          </mu-row>
        </mu-container>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col span="12">
        <div class="navigation" id="navigation" style="width: 100%;position: fixed;bottom: 0%;left: 0%">
          <mu-appbar style="width: 100%;" color="#4F4F4F">
            <mu-button icon slot="left" @click.navict="backFood()">
              <mu-icon value="keyboard_backspace"></mu-icon>
            </mu-button>
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
                <mu-list-item button @click.navict="orderList()">
                  <mu-list-item-content>
                    <mu-list-item-title>订单列表</mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
              </mu-list>
            </mu-menu>
          </mu-appbar>
        </div>

      </mu-col>
    </mu-row>

  </div>

</template>

<script>
  import moment from 'moment'
  let goEasy = new GoEasy({appkey: 'BS-5c690639637b4e91a82db6fd25d5dc96'});
  export default {
    name: "aboutOrder",
    data() {
      return {
        activeStep: 0,
        panel:'panel',
        navigation:'',
        openAlert: false,
        omId:'',
        order:{},
        orderInfo:{
          tNum:"",
          sId:"",
          sSeatnum:"",
          omCreatetime:"",
          omAmount:"",
          omStatus:'',
          omPayStatus:'',
          omRemindernum:''
        }
      }
    },
    methods: {
      alipay() {
        let returnurl = 'http://chenjie.nat300.top/CustomerOrder/alipayStatus/'+this.omId
        window.location.href='http://47.107.115.216:8002/Api.php?sn=' + this.omId + '&money=' + this.orderInfo.omAmount + '&returnurl=' + returnurl;

      },
      handleNext() {
        this.activeStep++;
      },
      /*退单弹出框*/
      AlertDialog (e) {
        if(e==0){
          this.$toast.message("感谢您的耐心等待！")
          this.openAlert = false;
        }else if(e==1){
          let order = {"omId": this.omId,"omStatus":2}
          this.updateOrderMaster(order)
          this.$toast.message("已为退单，请联系商家审核")
          this.openAlert = false;
        }

      },
      toggle (panel) {
        this.panel = panel === this.panel ? '' : panel;
      },
      /*订单操作 退单和催单*/
      orderTip(e){
        /*退单*/

        if(e == 0){
          this.AlertDialog('1')
          this.$toast.message("已提交退单")
         /* console.log(e == 0)
          this.openAlert = true;*/
        }else if(e == 1){
          let time = moment().format('YYYY-MM-DD HH:mm:ss')
          let order = {"omId": this.omId,"omIsreminder":1,"omRemindertime":time ,"omRemindernum":this.orderInfo.omRemindernum+1}
          this.updateOrderMaster(order)
          this.$toast.message("已催单")
          let goEasy = new GoEasy({appkey: 'BC-fa9286de3f184384a585e6f0429788f8'});
          goEasy.publish ({
            channel: 'newsOrder',
            message: '有顾客催单了'
          });
          console.log("success")
        }
      },
      backFood(){
        //alert(this.orderInfo.sSeatnum)
        window.location.href="http://192.168.43.139:8088/CustomerOrder/sellPage?sId="+this.orderInfo.sId;
      },
      orderList(){
        window.location.href="http://192.168.43.139:8088/CustomerOrder/orderList"
      },
      getOrder(){
        let that = this
        let order ={"omId":this.omId}
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/Order/queryOrder",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(order)
        }).then((res)=>{
          //console.log(res.data.data[0].pType);
          that.loading = false
          that.order = res.data.data
          that.orderInfo.tNum = that.order[0].tNum
          that.orderInfo.sId = that.order[0].sId
          that.orderInfo.sSeatnum = that.order[0].sSeatnum
          that.orderInfo.omAmount = that.order[0].omAmount
          that.orderInfo.omCreatetime = that.order[0].omCreatetime
          that.orderInfo.omStatus = that.order[0].omStatus
          that.orderInfo.omPayStatus = that.order[0].omPayStatus
          that.orderInfo.omRemindernum = that.order[0].omRemindernum
          if(that.orderInfo.omStatus == 0){
            let table = {"tId":this.order[0].tId,"tStatus":1}
            this.updateTable(table)
          }
          console.log(that.order)
        }).catch(function (error)
        {
          console.log(error)
          that.loading = false
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
          setTimeout(()=>{this.getOrder()},1000)
        }).catch(function (error)
        {
          console.log(error)
        })
      },
      updateTable(table){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/TableAndMenu/updateTable",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(table)
        }).then((res)=>{
          //that.$notify.success("更新成功")

        }).catch(function (error)
        {
          console.log(error)
        })
      },
    },
    mounted(){
     // let menu = document.getElementsByClassName("mu-popover");
     // menu[0].style.display='none';
      let url = window.location.href
      let urllength = url.indexOf('aboutOrder/')+11
      this.omId = url.substring(urllength,urllength+18);
      this.getOrder()
      this.handleNext();
      /*获取设备宽度除于10，作为rem的单位值*/
      document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
      /*获取设备高度*/
      const that = this;
      /*mounted监听窗口大小*/
      window.onresize = function temp() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
      }
    },
    watch:{
      activeStep(){
        let that = this;
        // do something
        goEasy.subscribe({
          channel: 'newsOrder',
          onMessage: function(message){
            //console.log(that);
            if (message.content=="厨房制作完成了，请耐心等待！"){
              that.$toast.message({title: '消息', message: message.content});
              that.handleNext();
              that.handleNext();
              this.getOrder();
            }

          }
        });
      }
    }

  }
</script>

<style scoped>

</style>
