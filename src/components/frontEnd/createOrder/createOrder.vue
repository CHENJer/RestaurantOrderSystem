<template>
    <div class="createOrder" style="background-color: white;overflow: hidden">
      <div class="header">
        <mu-button flat style="font-size: 20px;font-weight: bolder">确认订单：</mu-button>
        <mu-container :style="{'width': clientWidth}">
          <mu-row gutter style="position: absolute;left: 0%;top: 5%; width: 102%">
            <mu-col>
              <mu-paper :z-depth="0">
                <mu-list>
                  <!--<mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        订单编号：
                        <span style="margin-left: 0.5rem;font-size: larger;">{{OrderMaster.omId}}</span>
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>-->
                 <!-- <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        当前桌号：
                        <span style="margin-left: 0.5rem;font-size: larger;color: red">{{}}</span>
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>-->
               <!--   <mu-divider shallow-inset></mu-divider>-->
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title>订单备注：</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <div :style="{'width': clientWidth}" style="position: relative;left: 10%;font-size: 18px;" class="div_textarea">
                      <mu-text-field multi-line :rows="3" :rows-max="6"  cols="12" v-model="OrderMaster.omDesc" style="font-size: 18px;"
                                     placeholder="如有特殊要求，请在这里写下来">
                      </mu-text-field>
                  </div>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title style="position: absolute;left: 0%;top:0%;margin-left: 20px">支付方式</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-content>
                      <img src="../../../assets/alipay.jpg" width="20px" style="position: absolute;left: 0%;top: 0%;margin-left: 20px">
                      <span style="position: absolute;left: 0%;top: -10%;font-size: 16px;margin-left: 50px">支付宝支付</span>
                      <mu-radio :value="'alipay'" v-model="radio.value"  style="position: absolute;right: 5%;top: -10%;"></mu-radio>
                    </mu-list-item-content>
                    <!--<mu-list-item-content>
                      <img src="../../../assets/UnionPay.png" width="20px" style="position: absolute;left: 0%;top: 60%;margin-left: 20px">
                      <span style="position: absolute;left: 0%;top: 60%;font-size: 16px;margin-left: 50px">模拟支付</span>
                      <mu-radio :value="'demopay'" v-model="radio.value" style="position: absolute;right: 5%;top: 60%;"></mu-radio>
                    </mu-list-item-content>-->
                  </mu-list-item>
                  <div style="margin-top: 0px"></div>
                </mu-list>
                <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')" :z-depth="0">
                  <div slot="header">已点菜品：</div>
                  <mu-list style="overflow: auto;">
                    <mu-list-item  v-for="(items,index) in shopchat" :key="index">
                      <mu-list-item-content>
                        <mu-list-item-title>
                          <span>{{items.fName}}</span>
                          <span style="position: absolute;left: 65%;top: 20%">× {{items.fQuantity}}</span>
                          <span style="position: absolute;left: 85%;top: 20%">￥ {{items.fPrice}}</span>
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

      </div>

      <div class="pay" id="pay" style="width: 100%;position: fixed;bottom: 0%;left: 0%">
          <mu-appbar style="width: 100%;" color="#4F4F4F">
          <mu-button icon slot="left" @click="backFood()">
            <mu-icon value="keyboard_backspace"></mu-icon>
          </mu-button>
            <span v-if="OrderMaster.omAmount>0">￥</span>
            <span>{{OrderMaster.omAmount}}</span>
            <mu-button @click="pay()" color="success" slot="right" v-bind:style="{'height': payHeight+'px'}" style="width: 30%;position: absolute;bottom: 0%;right: 0%">去支付</mu-button>
        </mu-appbar>
      </div>

    </div>
</template>

<script>
  import {randomNum}  from '../../../common/util/getRandom.js'
    export default {
      name: "createOrder",
      data(){
        return{
          cententHeight:'',
          payHeight:'',
          clientWidth:'',
          clientHeight:'',
          orderDes:'', //订单备注
          radio: {     //Selects: {{radio.value1}}  radio1 or  radio2
            value: 'alipay',
          },
          panel: '',
          sort: {
            name: '',
            order: 'asc'
          },
          /*购物车详情*/
          shopchat:{

          },
          /*订单编号*/
          omId:"",
          sId:'',
          /*订单详情*/
          OrderDetail:{
            odId:"",
            omId:"",
            fId:"",
            sId:"",
            fQuantity:""
          },
          OrderMaster:{
            omId:"",
            buyerId:"",
            omAmount:"",
            omStatus:0,
            omPayStatus:0,
            omIsreminder:"",
            omRemindertime:"",
            omRemindernum:"",
            omDesc:""
        }


        }
      },
      methods:{
        toggle (panel) {
          this.panel = panel === this.panel ? '' : panel;
        },
        pay(){
          this.addOrderMaster()
        },
        NewMsg(){
          let goEasy = new GoEasy({appkey: 'BC-fa9286de3f184384a585e6f0429788f8'});
          goEasy.publish ({
            channel: 'newsOrder',
            message: '有顾客下单了'
          });
          this.$router.push('/CustomerOrder/aboutOrder')
        },
        backFood(){
          this.shopchat ={}
          window.location.href="http://192.168.43.139:8088/CustomerOrder/sellPage"

        },
        handleSortChange ({name, order}) {
          this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
        },
        alipay() {
          let returnurl = 'http://chenjie.nat300.top/CustomerOrder/alipayStatus/'+this.omId
          window.location.href='http://47.107.115.216:8002/Api.php?sn=' + this.OrderMaster.omId + '&money=' + this.OrderMaster.omAmount + '&returnurl=' + returnurl;

        },
        addOrderMaster(){
          this.OrderMaster.omId =randomNum(18)
          this.omId = this.OrderMaster.omId
          let that = this
          this.$axios({
            method:"post",
            url:that.COMMON.backUrl+"orderSystem/Order/insertOrderMaster",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(this.OrderMaster)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.$notify.info("创建订单成功")
              for(let i=0;i<that.shopchat.length;i++) {
                that.OrderDetail.odId = randomNum(18)
                that.OrderDetail.omId = that.omId
                that.OrderDetail.fId = that.shopchat[i].fId
                that.OrderDetail.sId = that.sId
                that.OrderDetail.fQuantity = that.shopchat[i].fQuantity
                console.log(that.OrderDetail)
                that.addOrderDetail(that.OrderDetail)
              }
          }).catch(function (error)
          {
            console.log(error)
            //this.$notify.info("查询失败："+error)
          })
        },
        addOrderDetail(OrderDetail){
          let that =this
          console.log("插入订单详情+++++++++++++++++++++++++")
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/insertOrderDetail",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(OrderDetail)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
              console.log("插入成功+++++++++++++++++++++++++")
            //that.$notify.info("创建订单详情成功")
            this.alipay()

          }).catch(function (error)
          {
            console.log(error)
            //that.$notify.info("创建订单详情失败："+error)
          })
        },
      },
      mounted(){
        this.shopchat = this.$route.params.shopcartContent
        this.OrderMaster.buyerId = this.$route.params.buyerId
        this.OrderMaster.omAmount = this.$route.params.foodAmount
        this.sId = this.$route.params.sId
        console.log(this.omId)
        /*获取设备宽度除于10，作为rem的单位值*/
        document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
        /*获取设备高度*/
        this.payHeight = document.getElementById("pay").offsetHeight
        /*- document.documentElement.clientWidth/ 10 *10.5- 50*/
        this.cententHeight = document.documentElement.clientHeight - this.payHeight
        const that = this;
        /*mounted监听窗口大小*/
        window.onresize = function temp() {
          document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
          /*获取设备高度*/
          that.clientHeight = document.documentElement.clientHeight;
          that.clientWidth = document.documentElement.clientWidth;
          that.payHeight = document.getElementById("pay").offsetHeight
          /**- that.clientWidth / 10 *10.5 - 50 */
          that.cententHeight = that.clientHeight - that.payHeight
        }
      },
      computed:{

      },
      created() {
      }
    }
</script>

<style>
.div_textarea .mu-input{
  width: 8rem;
  padding: 10px;
}
</style>
