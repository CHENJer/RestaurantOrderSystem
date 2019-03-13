<template>
    <div class="createOrder" style="background-color: white;overflow: hidden">
      <div class="header">
        <mu-button flat style="font-size: 20px;font-weight: bolder">确认订单：</mu-button>
        <mu-container :style="{'width': clientWidth}">
          <mu-row gutter style="position: absolute;left: 0%;top: 5%; width: 102%">
            <mu-col>
              <mu-paper :z-depth="0">
                <mu-list>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        订单编号：
                        <span style="margin-left: 0.5rem;font-size: larger;">1234567899874563</span>
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title >
                        当前桌号：
                        <span style="margin-left: 0.5rem;font-size: larger;color: red">3a21</span>
                      </mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-divider shallow-inset></mu-divider>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title>订单备注：</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <div style="width: 80%;position: relative;left: 10%">
                    <div style="height:100px; font-size: 18px;overflow: scroll;word-wrap: break-word; word-break: normal;">
                        {{orderDes}}
                    </div>
                  </div>
                  <mu-divider shallow-inset></mu-divider>
                  <mu-list-item>
                    <mu-list-item-content>
                      <mu-list-item-title style="position: absolute;left: 0%;top:10%;margin-left: 20px">支付方式</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-content>
                      <img src="../../../assets/alipay.jpg" width="20px" style="position: absolute;left: 0%;top: -10%;margin-left: 20px">
                      <span style="position: absolute;left: 0%;top: -10%;font-size: 16px;margin-left: 50px">支付宝支付</span>
                      <mu-radio :value="'alipay'" v-model="radio.value"  style="position: absolute;right: 5%;top: -10%;"></mu-radio>
                    </mu-list-item-content>
                    <mu-list-item-content>
                      <img src="../../../assets/UnionPay.png" width="20px" style="position: absolute;left: 0%;top: 60%;margin-left: 20px">
                      <span style="position: absolute;left: 0%;top: 60%;font-size: 16px;margin-left: 50px">模拟支付</span>
                      <mu-radio :value="'demopay'" v-model="radio.value" style="position: absolute;right: 5%;top: 60%;"></mu-radio>
                    </mu-list-item-content>
                  </mu-list-item>
                  <div style="margin-top: 15px"></div>
                </mu-list>
                <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')" :z-depth="0">
                  <div slot="header">已点菜品：</div>
                  <mu-list style="overflow: auto;">
                    <mu-list-item  v-for="index in 5" :key="index">
                      <mu-list-item-content>
                        <mu-list-item-title>
                          <span>菜品名字</span>
                          <span style="margin-left: 20%">× 2</span>
                          <span style="margin-left: 20%">￥ 12</span>

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
            <span >￥12</span>
            <mu-button @click="pay()" color="success" slot="right" v-bind:style="{'height': payHeight+'px'}" style="width: 30%;position: absolute;bottom: 0%;right: 0%">去支付</mu-button>
        </mu-appbar>
      </div>

    </div>
</template>

<script>
    export default {
      name: "createOrder",
      data(){
        return{
          cententHeight:'',
          payHeight:'',
          clientWidth:'',
          clientHeight:'',
          orderDes:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', //订单备注
          radio: {     //Selects: {{radio.value1}}  radio1 or  radio2
            value: 'alipay',
          },
          panel: '',
          sort: {
            name: '',
            order: 'asc'
          },
          columns: [
            { title: '', name: 'name' ,width: 100,height: 0},
            { title: '', name: 'calories', width: 100,height: 0 ,align: 'center'},
            { title: '', name: 'fat', width: 80, height: 0 ,align: 'center'},
            { title: '', name: 'carbs', width: 80, height: 0 ,align: 'center'},
          ],
          list: [
            {
              name: '酸菜鱼鲈鱼',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: 1
            },
            {
              name: 'Ice cream sandwich',
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
              iron: 1
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              iron: 7
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              iron: 8
            },
            {
              name: 'Gingerbread',
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
              iron: 16
            },
            {
              name: 'Jelly bean',
              calories: 375,
              fat: 0.0,
              carbs: 94,
              protein: 0.0,
              iron: 0
            },
            {
              name: 'Lollipop',
              calories: 392,
              fat: 0.2,
              carbs: 98,
              protein: 0,
              iron: 2
            },
            {
              name: 'Honeycomb',
              calories: 408,
              fat: 3.2,
              carbs: 87,
              protein: 6.5,
              iron: 45
            },
            {
              name: 'Donut',
              calories: 452,
              fat: 25.0,
              carbs: 51,
              protein: 4.9,
              iron: 22
            },
            {
              name: 'KitKat',
              calories: 518,
              fat: 26.0,
              carbs: 65,
              protein: 7,
              iron: 6
            }
          ]

        }
      },
      methods:{
        toggle (panel) {
          this.panel = panel === this.panel ? '' : panel;
        },
        pay(){
          let goEasy = new GoEasy({appkey: 'BC-fa9286de3f184384a585e6f0429788f8'});
          goEasy.publish ({
            channel: 'newsOrder',
            message: '有顾客下单了！'
          });
          this.$store.newOrderMsg =true
          this.$router.push('')
        },
        backFood(){
          this.$router.push('/CustomerOrder/sellPage');
        },
        handleSortChange ({name, order}) {
          this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
        }
      },
      mounted(){
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

<style scoped>

</style>
