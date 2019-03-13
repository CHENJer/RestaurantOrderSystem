<template>
  <div class="sellPage">
    <!--头部-->
    <div class="header" style="height: 5rem;">
      <div class="" style="height: 4rem; ">
        <mu-row style="height: 3.0rem;width:100%;">
          <mu-col span="4" style="height: 3.0rem;width:100%;">
            <img src="../../../assets/1.jpg" width="50%" style="position:absolute;top: 20%;left: 20%">
          </mu-col>
          <mu-col span="8" style="height: 3.0rem;width:100%;">

          </mu-col>
        </mu-row>
        <mu-row style="height: 1rem;width:100%;">
          <mu-col span="8" style="height: 1rem;background-color: white">
            <mu-button flat color="" slot="left" style="height: 1rem;width:100%;font-size: 0.4rem;line-height:1rem">
            </mu-button>
          </mu-col>
          <mu-col span="4" style="height: 1rem;background-color: white">
            <span style="height: 1rem;width:100%;font-size: 0.4rem;line-height:1rem">
              当前桌：{{tableNum}}
            </span>
          </mu-col>
        </mu-row>
      </div>
      <!--公告-->
      <div class="notice" style="height: 1rem;">
        <mu-row style="height: 1rem; filter:Alpha(opacity=50);">
          <mu-col span="10" style="height: 1rem;overflow:hidden;">
            <mu-button flat color="red" slot="left" style="height: 1rem;width:100%;font-size: 0.4rem;" @click="openFullscreenDialog">
              <div style="height: 1rem;line-height:1rem;text-overflow: ellipsis;overflow:hidden;">
                公告：啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃
              </div>
            </mu-button>

          </mu-col>
          <mu-col span="2" style="height: 1rem;line-height:1rem;">
            <mu-button icon color="primary" style="height: 1rem;line-height:1rem;"  @click="openFullscreenDialog">
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-button>
          </mu-col>
        </mu-row>
        <mu-container style="height: 1rem;">
          <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen" style="background-color: dimgrey;filter:alpha(Opacity=80);-moz-opacity:0.8;opacity: 0.8;">
            <mu-appbar color="primary" title="商家公告" style="background-color: dimgrey">
              <mu-button slot="right" flat  @click="closeFullscreenDialog">
                Done
              </mu-button>
              <mu-button slot="left" icon @click="closeFullscreenDialog">
                <mu-icon value="close"></mu-icon>
              </mu-button>
            </mu-appbar>
            <div v-bind:style="{'height': cententHeight+'px'}" style=" position: absolute;top: 30%;text-align: center;font-size: 0.7rem;color: white;z-index: 10000">
              <mu-col span="12">公告时间：2019年12月22号</mu-col>
              <mu-col span="12">this is a fullscreen dialog</mu-col>
            </div>

          </mu-dialog>
        </mu-container>
      </div>
    </div>

    <!--搜索框-->
    <div class="search">
      <mu-col span="12" style="font-size: 0.3rem">
        <mu-container>
          <mu-text-field v-model="f_search"  placeholder="输入菜品搜索" icon="youtube_searched_for" style="font-size: 0.3rem"/>
          <mu-button round  color="primary" @click="searchFood()">搜索</mu-button>
        </mu-container>
      </mu-col>
    </div>

    <div class="searchFood" v-bind:style="{'height': cententHeight+'px'}" v-show="isSearch">
          对不起，本餐厅没有您想要的菜品
    </div>


    <div class="Content" v-show="!isSearch">
      <!--商家推荐-->
      <div class="recommend" style="height: 7.5rem;width:100%;border-bottom: 1px dimgrey solid">
        <!--标题-->
        <mu-col span="12" style="height: 1rem;width:100%;line-height: 1rem;font-size: 0.5rem;font-weight: bolder;">商家推荐</mu-col>
        <!--商品-->
        <div class="recommendFoods" style="height: 6.2rem;width: 10rem;font-weight: bold;margin-top: 0.1rem; display: -webkit-box;overflow-x: scroll;" >
          <mu-col span="6" style="height: 5.8rem;width:100%;" v-for="index in 5" :key="index">
            <mu-button style="height: 5.8rem;width:100%;position: relative" @click="openFoodscreenDialog" >
              <mu-row style="height: 3.0rem;">
                <mu-col span="12" style="height: 4.0rem;width:100%;position: absolute;left: 0%;top: 0%">
                  <img src="../../../assets/1.jpg" width="70%">
                </mu-col>
              </mu-row>
              <mu-row style="height: 1.0rem;">
                <mu-col span="12" style="height: 0.7rem;font-weight: bolder;font-size: 0.45rem;position: absolute;left: 0%;bottom: 30%">
                  劲爆鸡米花
                </mu-col>
              </mu-row>
              <mu-row style="height: 1.0rem;">
                <mu-col span="12" style="height: 0.7rem;width:100%;position: absolute;font-size: 0.35rem;left: 0%;bottom: 18%">
                  月销量115
                </mu-col>
              </mu-row>

            </mu-button>
            <!--价格-->
            <div  style="position: absolute;left: 10%;bottom: 0%">
              <mu-row>
                <mu-col span="12" style="height: 0.7rem;width:100%;font-size: 0.5rem;color: red;font-weight: bold">
                    ￥20.5
                </mu-col>
              </mu-row>

            </div>
            <!--加减按钮-->
            <div  style="position: absolute;right: 10%;bottom: 0%">
              <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem">
                <mu-icon value="remove"></mu-icon>
              </mu-button>
              <span style="width: 20px;font-size: 0.4rem">111</span>
              <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;">
                <mu-icon value="add"></mu-icon>
              </mu-button>
            </div>
          </mu-col>

          </div>
        </div>
      </div>
      <!--主体-->
      <div class="foodContent" v-bind:style="{'height': cententHeight+'px'}" >
        <mu-container class="demo-container is-stripe">
          <mu-row>
            <!--左边菜单-->
            <mu-col span="3"  v-bind:style="{'height': cententHeight+'px','overflow':'scroll','border-right':'1px darkgrey solid'}" >
              <mu-button flat color="primary" style="height: 2rem;width:100%;border-bottom: 1px darkgrey solid;font-size: 0.4rem">热销榜</mu-button>
              <div class="left"v-for="indexs in 20" :key="indexs">
                <mu-button flat color="primary" style="height: 2rem;width:100%;font-size: 0.4rem">{{cententHeight}}</mu-button>
              </div>
            </mu-col>
            <!--右边菜品-->
            <mu-col span="9" v-bind:style="{'height': cententHeight+'px','overflow':'scroll'}" >
              <!--标题-->
              <mu-col span="12" style="height: 0.8rem;width:100%;line-height: 1rem;font-weight: bolder;">热销榜</mu-col>
              <!--菜品-->
              <div class="right" v-for="indexs in 20" :key="indexs">
                <div class="food" style="height: 3.7rem;width:100%;" >
                  <mu-row style="height: 3.7rem;width:100%;position: relative">
                    <mu-button style="height: 3.5rem;width:100%;" @click="openFoodscreenDialog">
                        <mu-col span="5" style="height: 3.8rem;width:100%;">
                          <img src="../../../assets/1.jpg" width="100%" style="position: absolute;top: 10%; left: 0%">
                        </mu-col>
                        <mu-col span="7"style="height: 3.5rem;width:100%; text-align: left;">
                          <!--菜名-->
                          <mu-col span="12" style="height: 1rem;width:100%;line-height: 1rem;font-weight: bolder;font-size: 0.5rem">劲爆鸡米花</mu-col>
                          <mu-col span="12" style="height: 0.7rem;width:100%;line-height: 0.7rem;text-overflow: ellipsis;overflow:hidden;font-size: 0.35rem">劲爆鸡真的好好好好好好好好好好好好好好。。。。。。。。。</mu-col>
                          <mu-col span="12" style="height: 0.7rem;width:100%;line-height: 0.7rem;overflow: hidden;font-size: 0.30rem">月销量115</mu-col>

                          <div class="rightPrice" >
                            <mu-col span="12" style="height: 0.6rem;line-height: 0.5rem;overflow: hidden;color: red;font-size: 0.35rem">
                              ￥15
                            </mu-col>
                          </div>
                        </mu-col>
                    </mu-button>
                    <!--加减按钮-->
                    <div class="addRemoveButton">
                      <mu-button fab small color="primary" style="width: 0.8rem;height: 0.8rem">
                        <mu-icon value="remove"></mu-icon>
                      </mu-button>
                      <span style="width: 20px">111</span>
                      <mu-button fab small color="primary" style="width: 0.8rem;height: 0.8rem;">
                        <mu-icon value="add"></mu-icon>
                      </mu-button>
                    </div>
                  </mu-row>
                </div>

              </div>
            </mu-col>
            <!--菜品详情窗口-->
            <mu-container style="height: 1rem;">
              <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFoodscreen" style="">
                <mu-appbar color="primary" title="菜品详情" style="">
                  <mu-button slot="right" flat  @click="closeFoodscreenDialog">
                    Done
                  </mu-button>
                  <mu-button slot="left" icon @click="closeFoodscreenDialog">
                    <mu-icon value="close"></mu-icon>
                  </mu-button>
                </mu-appbar>
                <div v-bind:style="{'height': cententHeight+'px'}" style=" position: absolute;top: 30%;text-align: center;font-size: 0.7rem;color: white;z-index: 10000">
                  <mu-col span="12">公告时间：2019年12月22号</mu-col>
                  <mu-col span="12">this is a fullscreen dialog</mu-col>
                </div>

              </mu-dialog>
            </mu-container>

          </mu-row>
        </mu-container>
      </div>

      <div class="shopcartContent" v-show="shopcartContent">
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-appbar color="lightBlue">
            已选商品
            <mu-button icon slot="right" style="width: 3rem;font-size: 19px">
              <mu-icon value="delete"></mu-icon>清空
            </mu-button>
            <!--<span slot="right" style="margin-right: 0.3rem">清空</span>-->
          </mu-appbar>
          <mu-list v-for="index in 5" :key="index">
            <mu-list-item button :ripple="false">
              <mu-list-item-title style="width: 40rem;overflow: hidden">商品assfs,fnksnf,s f,</mu-list-item-title>
              <mu-list-item-title style="width: 22rem;margin-left: 0.3rem"><span style="color: red;font-weight: bold">￥35.5</span></mu-list-item-title>
              <mu-button fab small color="primary" style="width: 0.6rem;height: 0.6rem;">
                <mu-icon value="remove"></mu-icon>
              </mu-button>
              <mu-list-item-title style="width: 18rem;text-align: center">12</mu-list-item-title>
              <mu-button fab small color="primary" style="width: 0.6rem;height: 0.6rem">
                <mu-icon value="add"></mu-icon>
              </mu-button>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </div>


      <!--购物车-->
      <div  class="shopAppbar" v-bind:style="{'height': shopcartHeight+'px'}" >
        <div class="leftShop" v-bind:style="{'height': shopcartHeight+'px'}" style="width: 70%; float: left;" >
          <mu-appbar color="#4F4F4F" class="shopcart" id="shopcart">
            <mu-menu slot="left">
              <mu-badge :content="shopNum" circle color="secondary"  class="demo-icon-badge">
                <mu-button color="primary" fab small class="shoppingCart" solt="left" :disabled="isShopcart" @click="openBotttomSheet">
                  <mu-icon value="shopping_cart"></mu-icon>
                </mu-button>
              </mu-badge>
              <span class="shoplist">{{foodAmount}}</span>
            </mu-menu>
            <mu-menu slot="right">
              <mu-button flat>
                <mu-icon value="menu"></mu-icon>
              </mu-button>
              <mu-list slot="content">
                <mu-list-item button>
                  <mu-list-item-content>
                    <mu-list-item-title>个人订单</mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-list-item button>
                  <mu-list-item-content>
                    <mu-list-item-title>商家详情</mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
              </mu-list>
            </mu-menu>
          </mu-appbar>
        </div>
        <div class="rightShop" v-bind:style="{'height': shopcartHeight+'px'}" style="width: 25%;float: right">
          <mu-button color="success"slot="right"large :disabled="isToOrder"  v-loading="loading"  v-bind:style="{'height': shopcartHeight+'px'}" @click="toOrderPage()">{{toPay}}</mu-button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "sellPage",
      data(){
          return{
            tableNum:'未选',
            app_auth_code:'',
            userId :'111',
            f_search:'',  // 搜索字段
            isSearch:false, //搜索内容展示
            openFullscreen: false,  //公告详情窗口
            openFoodscreen:false,  //菜品详情窗口
            clientHeight: '',      //设备高度
            clientWidth: '',       //设备宽度
            shopcartHeight: '',    //购物车导航高度
            cententHeight:'',      //主体内容高度
            foodAmount:'未选购商品',//选购的商品价格总额
            isShopcart:false,      //购物车显示
            shopcartContent:false,  //购物车内容
            isToOrder:false,          //点餐订单按钮
            toPay:"暂无",
            loading: false,  //是否加载
            shopNum: "20"
          }
      },
      methods: {
        /*打开关闭公告*/
        openFullscreenDialog () {
          this.openFullscreen = true;
        },
        closeFullscreenDialog () {
          this.openFullscreen = false;
        },
        openFoodscreenDialog () {
          this.openFoodscreen = true;
        },
        closeFoodscreenDialog () {
          this.openFoodscreen = false;
        },
        searchFood(){
          this.isSearch=true
          if(this.f_search==''||this.f_search==null){
              this.isSearch=false
            }
          },
        /*打开购物车详情*/
        openBotttomSheet(){
          this.shopcartContent=!this.shopcartContent
        },
        toOrderPage(){
          this.$toast.info('订单');
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$router.push('/CustomerOrder/createOrder')
          }, 2000)
        }
        ,
        getUserId(){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"/orderSystem/SystemManager/getUserId",
            /* headers:{
               'Content-type': 'application/json'
             },*/
            data:{
              appAuthCode: this.app_auth_code
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then((res)=>{
            this.userId = res.data
            this.$toast.message("res:"+res.data);
          })
            .catch(function (error)
            {
              console.log(error)
            })
        }
      },
      created() {
        /*初始化 获取设备宽度除于10，作为rem的单位值*/
        document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
        this.$toast.message('欢迎光临本餐厅');
        console.log(this.tableNum)
        if(typeof(this.$route.query.tableNum )!="undefined"){
          this.tableNum = this.$route.query.tableNum
        }
        console.log(this.tableNum)
        this.app_auth_code = this.$route.query.app_auth_code
        if(this.app_auth_code ==''){
          this.getUserId()
        }

      },
      mounted(){
        /*获取设备宽度除于10，作为rem的单位值*/
        document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
        /*获取设备高度*/
        this.shopcartHeight = document.getElementById("shopcart").offsetHeight
        /*- document.documentElement.clientWidth/ 10 *10.5- 50*/
        this.cententHeight = document.documentElement.clientHeight - 15 - this.shopcartHeight
        const that = this;
        /*mounted监听窗口大小*/
        window.onresize = function temp() {
          document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
          /*获取设备高度*/
          that.clientHeight = document.documentElement.clientHeight;
          that.clientWidth = document.documentElement.clientWidth;
          that.shopcartHeight = document.getElementById("shopcart").offsetHeight
          /**- that.clientWidth / 10 *10.5 - 50 */
          that.cententHeight = that.clientHeight - that.shopcartHeight - 15
        }

      },
      computed: {}
    }
</script>
<style>
  .mu-card{
    top: 0;
    left: 0;
  }
  /*查看公告主体区域*/
  /*.mu-dialog-fullscreen{
    background-color: black;
    text-align: center;
  }*/
  /*整个搜索区域div*/
  .search{
    height: 60px;
    font-weight: bold;
    background-color: #FCFCFC;
    border-top: darkgrey 1px solid;
    border-bottom: darkgrey 1px solid;
    border-radius: 0.08rem;
  }
  /*设置搜索输入框*/
  .mu-input{
    width: 6.0rem;
    margin-top: 5px;
    margin-right: 0.1rem;
    padding-right: 20px;
  }
  /*设置按钮*/
  .mu-raised-button{
    margin-top: 8px;
  }
  /*中间主体内容*/
  .foodContent{
    margin-bottom: 0.5rem;
    overflow: hidden;
  }
  .left{
    overflow: scroll;
    text-align: center;
    border-bottom: 1px silver solid;
  }
  .right{
    overflow: scroll;
    /*border-bottom: 1px silver solid;*/
  }
  /*右边价格*/
  .rightPrice{
    position: absolute;
    bottom: 3%;
    left: 0%;
    float: right;
  }

  /*右边菜品按钮*/
  .addRemoveButton{
    position: absolute;
    bottom: 0%;
    right: 0%;

  }
  /*底部div*/
  .shopcart{
    position: fixed;
    width: 70%;
    bottom: 0;
    left: 0;
    padding: 0;
    z-index: 1;
  }
  /*购物车图标*/
  .shoppingCart{
    margin-top: 6px;
    margin-left: 5px;
  }
  /*价格总额*/
  .shoplist{
    font-size: small;
    color: beige;
    margin-left: 8px;

  }
  /*购物车内容*/
  .shopcartContent{
    position: fixed;
    width: 100%;
   /* height: 8rem;*/
    bottom: 1.2rem;
    left: 0;
    background-color: #F7F7F7;
    z-index: 0;
    /*border: 0.1rem darkgrey solid;*/
  }
  /*pay按钮*/
  .mu-raised-button.mu-button-large {
    font-size: 15px;
    width: 3rem;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

</style>
