<template>
  <div class="sellPage">
    <!--头部-->
   <!-- <div class="header" style="height: 3rem;">
      tableNum:{{tableNum}}
      <div style="height: 20px"> app_auth_code:{{app_auth_code}}</div>
      <div style="height: 20px"> userId:{{userId}}</div>

     &lt;!&ndash; <div class="" style="height: 4rem; ">
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
      </div>&ndash;&gt;
      &lt;!&ndash;公告&ndash;&gt;
    </div>-->

    <!--搜索框-->
    <div class="search">
      <mu-col span="12" style="font-size: 0.3rem">
        <mu-container>
          <mu-text-field v-model="f_search"  placeholder="输入菜品搜索" icon="youtube_searched_for" style="font-size: 0.3rem"/>
          <mu-button round  color="primary" @click="searchFood()">搜索</mu-button>
        </mu-container>
      </mu-col>
    </div>
    <div class="notice" style="height: 1rem;" v-show="!isSearch">
      <mu-row style="height: 1rem; filter:Alpha(opacity=50);">
        <mu-col span="10" style="height: 1rem;overflow:hidden;">
          <mu-button flat color="red" slot="left" style="height: 1rem;width:100%;font-size: 0.4rem;" @click="openFullscreenDialog">
            <div style="height: 1rem;line-height:1rem;text-overflow: ellipsis;overflow:hidden;" v-for="(items,index) in Notice" :key="index" ref="Notice">
              公告：{{items.nDesc}}<span v-if="items.nDesc == ''">暂无公告</span>
            </div>
            <div v-show="isHasNotice" style="height: 1rem;line-height:1rem;text-overflow: ellipsis;overflow:hidden;">暂无公告</div>
          </mu-button>

        </mu-col>
        <mu-col span="2" style="height: 1rem;line-height:1rem;">
          <mu-button icon color="primary" style="height: 1rem;line-height:1rem;"  @click="openFullscreenDialog">
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-button>
        </mu-col>
      </mu-row>
      <mu-container style="height: 1rem;">
        <mu-dialog title="餐厅公告" width="100%" :open.sync="openFullscreen" v-for="(items,index) in Notice" :key="index">
          <div style="font-size: 14px;font-weight: lighter"> {{items.nDesc}}</div><span v-if="items.nDesc == ''">暂无公告</span>
          <!--<div style="font-size: 12px;font-weight: lighter">结束日期：{{items.nEndtime}}</div>-->
          <mu-button slot="actions" flat color="primary" @click="closeFullscreenDialog">关闭</mu-button>
        </mu-dialog>
      </mu-container>
    </div>
    <div class="searchFood" v-bind:style="{'height': cententHeight+'px'}" v-show="isSearch">
      <div v-if="flag" style="position: relative;left: 20%;top: 5%;font-size: 16px;">抱歉，找不到您想要的菜品</div>
      <mu-col span="12" v-bind:style="{'height': cententHeight+'px','overflow':'scroll'}" >
        <!--菜品-->
        <div class="right" v-for="(items,index) in searchFoods" :key="index">
          <div class="food" style="height: 3.9rem;width:100%;" >
            <mu-row style="height: 3.7rem;width:100%;position: relative">
              <mu-button style="height: 3.5rem;width:100%;" @click="openFoodscreenDialog(searchFoods[index].fId)">
                <mu-col span="4" style="height: 3.8rem;width:100%;">
                  <img :src="items.fPic" width="100%" style="position: absolute;top: 10%; left: 0%">
                </mu-col>
                <mu-col span="8"style="height: 3.5rem;width:100%; text-align: left;">
                  <!--菜名-->
                  <mu-col span="12" style="margin-top: 15px;font-weight: bolder;font-size: 0.35rem">{{items.fName}}</mu-col>
                  <mu-col span="12" style="margin-top: 15px;width:100%;line-height: 0.7rem;text-overflow: ellipsis;overflow:hidden;font-size: 0.30rem">{{items.fDesc}}</mu-col>
                  <!--<mu-col span="12" style="height: 0.7rem;width:100%;line-height: 0.7rem;overflow: hidden;font-size: 0.30rem">月销量115</mu-col>-->

                  <div class="rightPrice" >
                    <mu-col span="12" style="height: 0.6rem;line-height: 0.5rem;overflow: hidden;color: red;font-size: 0.35rem">
                      ￥{{items.fPrice}}
                    </mu-col>
                  </div>
                </mu-col>
              </mu-button>
              <!--加减按钮-->
              <div class="addRemoveButton">
                <mu-button fab small color="primary" style="width: 0.8rem;height: 0.8rem;position: absolute;bottom: 5%;right: 25%"
                           :id="items.fId" @click="removeFoods(index,'searchFoods')">
                  <mu-icon value="remove"></mu-icon>
                </mu-button>
                <span style="width: 20px;position: absolute;bottom: 5%;right: 15%"></span>
                <mu-button fab small color="primary" style="width: 0.8rem;height: 0.8rem;position: absolute;bottom: 5%;right: 5%"
                           @click="addFoods(index,'searchFoods')">
                  <mu-icon value="add"></mu-icon>
                </mu-button>
              </div>
            </mu-row>
          </div>
        </div>
      </mu-col>

    </div>


    <div class="Content" v-show="!isSearch">
      <!--商家推荐-->
      <div class="recommend" style="height: 7.5rem;width:100%;border-bottom: 1px dimgrey solid">
        <!--标题-->
        <mu-col span="12" style="height: 1rem;width:100%;line-height: 1rem;font-size: 0.5rem;font-weight: bolder;">商家推荐</mu-col>
        <!--商品-->
        <div class="recommendFoods" style="height: 6.2rem;width: 10rem;font-weight: bold;margin-top: 0.1rem; display: -webkit-box;overflow-x: scroll;" >
          <mu-col span="6" style="height: 5.8rem;width:100%;" v-for="(items, index) in recommendfoods" :key="index">
            <mu-button style="height: 5.8rem;width:100%;position: relative" @click="openFoodscreenDialog(recommendfoods[index].fId)" >
              <mu-row style="height: 3.0rem;">
                <mu-col span="12" style="height: 4.0rem;width:100%;position: absolute;left: 0%;top: 0%">
                  <img :src="items.fPic" width="70%">
                </mu-col>
              </mu-row>
              <mu-row style="height: 1.0rem;">
                <mu-col span="12" style="height: 0.7rem;font-weight: bolder;font-size: 0.40rem;position: absolute;left: 0%;bottom: 30%">
                  {{items.fName}}
                </mu-col>
              </mu-row>
              <mu-row style="height: 1.0rem;">
                <mu-col span="12" style="height: 0.7rem;width:100%;position: absolute;font-size: 0.35rem;font-weight:lighter;left: 0%;bottom: 18%">
                  {{items.fDesc}}
                </mu-col>
              </mu-row>
            </mu-button>
            <!--价格-->
            <div  style="position: absolute;left: 10%;bottom: 0%">
              <mu-row>
                <mu-col span="12" style="height: 0.7rem;width:100%;font-size: 0.5rem;color: red;font-weight: bold">
                    ￥ {{items.fPrice}}
                </mu-col>
              </mu-row>
            </div>
            <!--加减按钮-->
            <div>
              <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;
                         position: absolute;right: 40%;bottom: 0%;"
                         :id="items.fId"
                         @click="removeFoods(index,'RecommendFoods')">
                <mu-icon value="remove"></mu-icon>
              </mu-button>
              <!--<span v-if="foodNum>0" ref="index">{{foodNum}}</span>-->
              <span style="width: 20px;font-size: 0.4rem;position: absolute;right: 23%;bottom: 0%"> </span>
              <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;position: absolute;right: 8%;bottom: 0%"
                         @click="addFoods(index,'RecommendFoods')">
                <mu-icon value="add"></mu-icon>
              </mu-button>
            </div>
          </mu-col>

          </div>
      </div>
    </div>
      <!--主体-->
      <div class="foodContent" v-show="!isSearch" v-bind:style="{'height': cententHeight+'px'}" >
        <mu-container class="demo-container is-stripe">
          <mu-row>
              <!--左边菜单-->
              <mu-col span="3"  v-bind:style="{'height': '800px','overflow':'scroll','border-right':'1px darkgrey solid'}" >
                <mu-button flat color="primary" style="height: 1.4rem;width:100%;font-weight: bold;color: black;font-size: 0.47rem;background-color: snow;border-bottom: 1px lavender solid">
                  菜单
                </mu-button>
                <div class="left" v-for="(items , index) in menuTypeArry" :key="index" >
                  <mu-button :z-depth="5" flat color="primary" style="height: 1.4rem;width:100%;font-size: 0.36rem" @click="menuChange(items.mId)">
                    {{items.mType}}
                  </mu-button>
                </div>
              </mu-col>

            <!--右边菜品-->
            <mu-col span="9" id="foodsTip" v-bind:style="{'height': '800px','overflow':'scroll'}" >
              <!--标题-->
             <!-- <mu-col span="12" style="height: 0.8rem;width:100%;line-height: 1rem;font-weight: bolder;">热销榜</mu-col>-->
              <!--菜品-->
              <div class="right" v-for="(item, index) in food" :key="index" >
                <!--第一个绑定id-->
                <div v-if="index==0" :id="item.mId">

                </div>
                <div v-else-if="item.mId == food[index-1].mId"></div>
                <div v-else :id="item.mId"></div>
                <div class="food" style="height: 3.9rem;width:100%;" v-if="index ==0">

                  <mu-row style="height: 3.7rem;width:100%;position: relative">
                    <mu-button style="height: 3.5rem;width:100%;" @click="openFoodscreenDialog(food[index].fId)">
                        <mu-col span="4" style="height: 3.8rem;width:100%;">
                          <img :src="item.fPic" width="100%" style="position: absolute;top: 10%; left: 0%">
                        </mu-col>
                        <mu-col span="8"style="height: 3.5rem;width:100%; text-align: left;">
                          <!--菜名-->
                          <mu-col span="12" style="margin-top: 15px;font-weight: bolder;font-size: 0.35rem">{{item.fName}}</mu-col>
                          <mu-col span="12" style="margin-top: 15px;width:100%;line-height: 0.7rem;text-overflow: ellipsis;overflow:hidden;font-size: 0.30rem">{{item.fDesc}}</mu-col>
                          <!--<mu-col span="12" style="height: 0.7rem;width:100%;line-height: 0.7rem;overflow: hidden;font-size: 0.30rem">月销量115</mu-col>-->

                          <div class="rightPrice" >
                            <mu-col span="12" style="height: 0.6rem;line-height: 0.5rem;overflow: hidden;color: red;font-size: 0.35rem">
                              ￥{{item.fPrice}}
                            </mu-col>
                          </div>
                        </mu-col>
                    </mu-button>
                    <!--加减按钮-->
                    <div class="addRemoveButton"><!-- v-show="removeBtn" -->
                      <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;
                                  position: absolute;right: 25%;bottom: 5%;"
                                 :id='item.fId'   @click="removeFoods(index,'foods')">
                        <mu-icon value="remove" ></mu-icon>
                      </mu-button>
                      <span style="width: 15px;font-size: 16px;position: absolute;right: 15%;bottom: 5%"></span>
                      <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;position: absolute;right: 2%;bottom: 5%"
                                 @click="addFoods(index,'foods')">
                        <mu-icon value="add"></mu-icon>
                      </mu-button>
                    </div>
                  </mu-row>
                </div>
                <div class="food" style="height: 3.9rem;width:100%;" v-else>
                  <mu-row style="height: 3.7rem;width:100%;position: relative">
                    <mu-button style="height: 3.5rem;width:100%;" @click="openFoodscreenDialog(food[index].fId)">
                      <mu-col span="4" style="height: 3.8rem;width:100%;">
                        <img :src="item.fPic" width="100%" style="position: absolute;top: 10%; left: 0%">
                      </mu-col>
                      <mu-col span="8"style="height: 3.5rem;width:100%; text-align: left;">
                        <!--菜名-->
                        <mu-col span="12" style="margin-top: 15px;font-weight: bolder;font-size: 0.35rem">{{item.fName}}</mu-col>
                        <mu-col span="12" style="margin-top: 15px;width:100%;line-height: 0.7rem;text-overflow: ellipsis;overflow:hidden;font-size: 0.30rem">{{item.fDesc}}</mu-col>
                        <!--<mu-col span="12" style="height: 0.7rem;width:100%;line-height: 0.7rem;overflow: hidden;font-size: 0.30rem">月销量115</mu-col>-->

                        <div class="rightPrice" >
                          <mu-col span="12" style="height: 0.6rem;line-height: 0.5rem;overflow: hidden;color: red;font-size: 0.35rem">
                            ￥{{item.fPrice}}
                          </mu-col>
                        </div>
                      </mu-col>
                    </mu-button>
                    <!--加减按钮-->
                    <div class="addRemoveButton"><!-- v-show="removeBtn" -->
                      <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;
                                  position: absolute;right: 25%;bottom: 5%;"
                                 :id='item.fId'   @click="removeFoods(index,'foods')">
                        <mu-icon value="remove" ></mu-icon>
                      </mu-button>
                      <span style="width: 15px;font-size: 16px;position: absolute;right: 15%;bottom: 5%"></span>
                      <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;position: absolute;right: 2%;bottom: 5%"
                                 @click="addFoods(index,'foods')">
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
                    关闭
                  </mu-button>
                  <mu-button slot="left" icon @click="closeFoodscreenDialog">
                    <mu-icon value="close"></mu-icon>
                  </mu-button>
                </mu-appbar>
                <div v-bind:style="{'width': clientWidth+'px'}"
                     style=" position: absolute;top: 10%;left: 0%;text-align: left;font-size: 0.7rem;color: white;z-index: 10000">
                  <mu-row>
                    <mu-col span="12"> <img :src="foodMaster.fPic"  style="width:90%"></mu-col>
                  </mu-row>

                  <mu-row style="margin-left: 20px" >
                    <mu-col span="12" style="height: 0.6rem;line-height: 0.6rem;overflow: hidden;color: black;font-weight: bolder;font-size: 0.5rem">
                      {{foodMaster.fName}}
                    </mu-col>
                    <div style="height: 30px"></div>
                    <mu-col span="12" style="height: 1rem;line-height: 0.6rem;overflow: hidden;color: dimgrey;font-size: 0.45rem">
                      {{foodMaster.fDesc}}
                    </mu-col>
                    <div style="height: 40px"></div>
                    <mu-col span="12" style="height: 0.6rem;line-height: 0.6rem;overflow: hidden;color: red;font-weight: bolder;font-size: 0.55rem">
                      ￥{{foodMaster.fPrice}}
                    </mu-col>
                  </mu-row>
                  <!--加减按钮-->
                  <div class="addRemoveButton"><!-- v-show="removeBtn" -->
                    <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;
                                  position: absolute;right: 25%;bottom: 5%;"
                               :id='foodMaster.fId'   @click="removeFoodMaster(foodMaster)">
                      <mu-icon value="remove" ></mu-icon>
                    </mu-button>
                    <span style="width: 15px;font-size: 16px;position: absolute;right: 15%;bottom: 5%"></span>
                    <mu-button fab small color="primary" style="width: 0.7rem;height: 0.7rem;position: absolute;right: 2%;bottom: 5%"
                               @click="addFoodMaster(foodMaster)">
                      <mu-icon value="add"></mu-icon>
                    </mu-button>
                  </div>

                </div>

              </mu-dialog>
            </mu-container>
          </mu-row>
        </mu-container>
      </div>

      <div class="shopcartContent" v-show="isshopcartContent">
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-appbar color="lightBlue">
            已选商品
            <mu-button icon slot="right" style="width: 3rem;font-size: 19px" @click="deleteShopcart()">
              <mu-icon value="delete" ></mu-icon>清空
            </mu-button>
          </mu-appbar>
          <div style="height: 10px"></div>
          <mu-list style="overflow: scroll">
            <mu-list-item button :ripple="false" v-for="(items,index) in shopcartContent" :key="index">
              <mu-list-item-title style="width: 40rem;overflow: hidden"> {{items.fName}}</mu-list-item-title>
                <mu-list-item-title style="width: 22rem;margin-left: 0.5rem;color: red;font-size: 16px">
                <span v-if="items.fPrice>0" style="font-size: 18px">￥</span>{{items.fPrice}}
              </mu-list-item-title>
              <mu-button fab small color="primary" style="width: 0.55rem;height: 0.55rem;margin-right: 5px" @click="removeFoods(index,'shopcartFoods')">
                <mu-icon value="remove"></mu-icon>
              </mu-button>
              <span style="width: 20px"></span>
              <mu-list-item-title style="width: 18rem;text-align: center" v-if="shopNum>0">{{items.fQuantity}}</mu-list-item-title>
              <mu-button fab small color="primary" style="width: 0.55rem;height: 0.55rem" @click="addFoods(index,'shopcartFoods')">
                <mu-icon value="add"></mu-icon>
              </mu-button>
            </mu-list-item>
          </mu-list>
          <div style="height: 20px"></div>
        </mu-paper>
      </div>


      <!--购物车-->
      <div  class="shopAppbar" v-bind:style="{'height': shopcartHeight+'px'}" >
        <div class="leftShop" v-bind:style="{'height': shopcartHeight+'px'}" style="width: 70%; float: left;" >
          <mu-appbar color="#4F4F4F" class="shopcart" id="shopcart">
            <mu-menu slot="left">
              <mu-badge :content="shopNum" circle color="secondary"  class="demo-icon-badge">
                <mu-button color="primary" fab small class="shoppingCart" solt="left" :disabled="isToPay" @click="openBotttomSheet">
                  <mu-icon value="shopping_cart"></mu-icon>
                </mu-button>
              </mu-badge>
              <span class="shoplist" style="font-size: 18px; margin-left: 5px"><span v-if="foodAmount!='未选购商品'">￥</span> {{foodAmount}}</span>
            </mu-menu>
            <mu-menu slot="right">
              <mu-button flat>
                <mu-icon value="menu"></mu-icon>
              </mu-button>
              <mu-list slot="content">
                <mu-list-item button @click.navict="orderList()">
                  <mu-list-item-content>
                    <mu-list-item-title>历史订单</mu-list-item-title>
                  </mu-list-item-content>
                </mu-list-item>
              </mu-list>
            </mu-menu>
          </mu-appbar>
        </div>
        <div class="rightShop" v-bind:style="{'height': '56px'}" style="width: 30%;float: right">
          <mu-button color="success"slot="right"large :disabled="isToPay"  v-loading="loading"  v-bind:style="{'height': '56px'}" @click="toOrderPage()">{{toPay}}</mu-button>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

    export default {
      name: "sellPage",
      data(){
          return{
            sId:'',
            app_auth_code:"",
            userId :'',
            clientHeight: '',      //设备高度
            clientWidth: '',       //设备宽度
            cententHeight:'',      //主体内容高度
            shopcartHeight: '',    //购物车导航高度
            loading: false,  //是否加载
            newMsg:"" , //更新公告和菜品，菜单信息
            /************
             * 公告字段 *
             ***********/
            openFullscreen: false,  //公告详情窗口
            Notice:{
              "nStatus":1
            },
            updateNotice:{
              "nStatus":1
            },
            isHasNotice:false,
            /************
             *  搜索字段
             * *********/
            f_search:'',  // 搜索字段
            isSearch:false, //搜索内容展示
            flag: false, //找不到菜品提示
            searchFoods:{}, //找到的菜品
            /***********
             * 推荐商品字段
             * ********/
            recommendfoods:{
              "fIsrecommend":1,
              "fStatus":0,
              "mStatue":0
            },
            /***********
             * 菜单字段
             * *********/
            menuType:{
              mStatue:0
            },  // 发送到后台交换数据
            menuTypeArry:[],  //获取后台数据
            /***********
             * 菜品字段
             * *********/
            openFoodscreen:false,  //菜品详情窗口
            foodMaster:{}, //菜品详情
            food:{
              "fIsrecommend": 0,
              "fStatus":0,
              "mStatue":0
            },
            /***********
             * 购物车字段
             * *********/
            isshopcartContent:false,  //购物车显示
            isShopcart:false,      //购物车disabled不能操作
            isToPay:true,          //点餐订单按钮
            shopNum: "0",
            foodAmount:'未选购商品',//选购的商品价格总额
            shopcartContent:[],       //购物车内容
            toPay:"暂无",      //点餐
            foodNum:0,

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
        openFoodscreenDialog (fid) {
          for(let i=0;i<this.food.length;i++){
            if(this.food[i].fId == fid){
              this.foodMaster = this.food[i]
            }
          }
          console.log(this.foodMaster)
          this.openFoodscreen = false;
        },
        closeFoodscreenDialog () {
          this.openFoodscreen = false;
        },
        searchFood(){
          if(this.f_search==''||this.f_search==null){
              this.isSearch=false
            }else{
              this.isSearch=true
              this.searchFoods=={}
              let foodName ={"fName":this.f_search,"fStatus":0}
              this.LikequeryFood(foodName)
          }
          let updateNotice ={"nStatus":1}
          this.getNotice(updateNotice)
        },
        orderList(){
          /*let menu = document.getElementsByClassName("mu-popover");
          menu[0].style.display='none';*/
          window.location.href="http://192.168.43.139:8088/CustomerOrder/orderList"
        },
        /*打开购物车详情*/
        openBotttomSheet(){
          this.isshopcartContent=!this.isshopcartContent
        },
        addFoodMaster(foodMaster){
          let flag = false
          let foodNum = 0;
          for(let i =0 ; i<this.shopcartContent.length;i++){
            console.log(this.shopcartContent[i].fId == foodMaster.fId)
            if(this.shopcartContent[i].fId == foodMaster.fId){
              this.shopcartContent[i].fQuantity++
              flag = true
            }
          }
          if(!false){
            var content ={}
            content.fId =foodMaster.fId,
            content.fName =foodMaster.fName,
            content.fPrice =foodMaster.fPrice
            content.fQuantity = 1
            this.shopcartContent.push(content)
          }

          let removeBtn = document.getElementById(foodMaster.fId)
          let foodNumSpan = removeBtn.nextElementSibling || removeBtn.nextSibling
          for(let i =0 ; i<this.shopcartContent.length;i++){
            if(this.shopcartContent[i].fId == foodMaster.fId){
              foodNum = this.shopcartContent[i].fQuantity
            }
          }
          console.log(foodNum)
          foodNumSpan.innerText = foodNum+''
          this.getShopCartNum()
          this.countOmAmount()
        },
        removeFoodMaster(fid){

        },
        addFoods(food,foodType){
          let foodList =''
          if(foodType =='foods'){
            foodList = this.food
          }else if(foodType =='RecommendFoods'){
            foodList = this.recommendfoods
          }else if(foodType =='shopcartFoods'){
            foodList = this.shopcartContent
          }else if(foodType =='searchFoods'){
            foodList = this.searchFoods
          }
          let foodNum = 0;
          let removeBtn = document.getElementById(foodList[food].fId)

          let foodNumSpan = removeBtn.nextElementSibling || removeBtn.nextSibling
          removeBtn.style.display="block";
          for(let i =0 ; i<this.shopcartContent.length;i++){
            if(this.shopcartContent[i].fId == foodList[food].fId){
              this.shopcartContent[i].fQuantity++
              isFlag = true
            }
          }
          if(!isFlag){
            var content ={}
            var isFlag =false
            content.fId =foodList[food].fId,
            content.fName =foodList[food].fName,
            content.fPrice =foodList[food].fPrice
            content.fQuantity = 1
            this.shopcartContent.push(content)
          }

          for(let i =0 ; i<this.shopcartContent.length;i++){
            if(this.shopcartContent[i].fId == foodList[food].fId){
              foodNum = this.shopcartContent[i].fQuantity
            }
          }
         // console.log(foodNum)
          foodNumSpan.innerText = foodNum+''
          this.getShopCartNum()
          this.countOmAmount()
        },
        removeFoods(food,foodType){
          let foodList =''
          if(foodType =='foods'){
            foodList = this.food
          }else if(foodType =='RecommendFoods'){
            foodList = this.recommendfoods
          }else if(foodType =='shopcartFoods'){
            foodList = this.shopcartContent
          }else if(foodType =='searchFoods'){
            foodList = this.searchFoods
          }

          let foodNum = 0;
          let removeBtn = document.getElementById(foodList[food].fId)
          let foodNumSpan = removeBtn.nextElementSibling || removeBtn.nextSibling
          if(this.shopcartContent.length>0){
            for(let i =0 ; i<this.shopcartContent.length;i++){
              if(this.shopcartContent[i].fId == foodList[food].fId){
                if(this.shopcartContent[i].fQuantity>1){
                  this.shopcartContent[i].fQuantity--
                  foodNum =  this.shopcartContent[i].fQuantity
                }else{
                  this.shopcartContent.splice(i,1)
                  foodNum = ''
                  removeBtn.style.display="none";
                  console.log("remove")
                  console.log(removeBtn)
                }
              }
            }
          }

          //console.log(foodNum)
          foodNumSpan.innerText = foodNum+''
          this.getShopCartNum()
          this.countOmAmount()
        },

        deleteShopcart(){
          let removeBtn
          let foodNumSpan
          for(let i =0 ; i<this.shopcartContent.length;i++){
           // shopnum = shopnum+this.shopcartContent[i].fQuantity
            removeBtn = document.getElementById(this.shopcartContent[i].fId)
            removeBtn.style.display="none";
            foodNumSpan = removeBtn.nextElementSibling || removeBtn.nextSibling
            foodNumSpan.innerText = ''
          }
          this.shopcartContent = []
          this.getShopCartNum()
          this.countOmAmount()
          this.isshopcartContent=!this.isshopcartContent

        },
        getShopCartNum(){
          let Num = 0
          for(let i =0 ; i<this.shopcartContent.length;i++){
            Num = Num + this.shopcartContent[i].fQuantity
          }
          this.shopNum = Num+''
        },
        countOmAmount(){
          let OmAmount =  0
          if(this.shopNum == "0"){
            this.foodAmount = "未选购商品"
          }else{
            for(let i =0 ; i<this.shopcartContent.length;i++){
              OmAmount = OmAmount + (this.shopcartContent[i].fPrice * this.shopcartContent[i].fQuantity)
              this.foodAmount =  OmAmount
            }
          }
        },
        initBtn(){
          console.log("initBtn")
          for(let i=0; i<this.food.length;i++){
            document.getElementById(this.food[i].fId).style.display="none";
          }
          for(let i=0; i<this.recommendfoods.length;i++){
            document.getElementById(this.recommendfoods[i].fId).style.display="none";
          }
        },
        toOrderPage(){
          this.loading = true;
          let that = this
          console.log(this.shopcartContent)
          setTimeout(() => {
            that.loading = false;
            this.$router.push({
                name: 'createOrder',
                params: {
                  shopcartContent : this.shopcartContent,
                  foodAmount: this.foodAmount,
                  buyerId:this.userId,
                  sId:this.sId
                }
              }
            )
          }, 1000)
        },
        menuChange(mId){
          let temp = '#'+mId;
          let height = $('#foodsTip').find(temp).position().top;
          console.log(height);
          this.$nextTick(()=>{
            $('#foodsTip').animate({
              scrollTop:height
            },1000);
          })

          console.log(mId);
        },
        getUserId(app_auth_code){
          /*post请求访问接口，params为传递参数*/
          this.$axios.get('http://192.168.43.139:8080/orderSystem/SystemManager/getUserId',{
            params: {
              app_auth_code: app_auth_code
            }
          }).then((res)=> {
            this.userId = res.data.userId
           /*防止user_id过有效期后失效，保存状态*/
            if(this.userId != null){
              this.setCookie ("userId", this.userId, 1) ;
            }else{
              this.userId = this.getCookie("userId");
            }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        //设置cookie
        setCookie (cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
          var expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
          console.info(document.cookie);
        },
        getCookie: function (cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          //console.log("获取cookie,现在循环")
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            //console.log(c)
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1){
              return c.substring(name.length, c.length);
            }
          }
          return "";
        },
        getFood(){
          this.foods = {
            "fIsrecommend": 0,
              "fStatus":0
          },
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/queryFoodAndMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(this.food)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            this.food = res.data.data

          }).catch(function (error)
          {
            console.log(error)
          })
        },
        getRecommendFood(){
          this.loading = true
          let that = this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/queryFoodAndMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(this.recommendfoods)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.loading = false
            that.recommendfoods = res.data.data

          }).catch(function (error)
          {
            console.log(error)
            that.loading = false
          })
        },
        LikequeryFood(foodName){
          this.loading = true
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/LikequeryFood",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(foodName)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            if(res.data.data.length==0){
              this.flag = true
            }else{
              this.flag = false
            }
            this.loading = false
            this.searchFoods = res.data.data
          }).catch(function (error)
          {
            this.loading = false
            console.log(error)
          })
        },
        getMenu(){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/queryMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(this.menuType)
          }).then((res)=>{
            this.loading = false
            //console.log(JSON.stringify(this.menuType));
            //console.log(res.data.data[0].pType);
            if(res.data.data.length>0){
              var menuType = JSON.parse(JSON.stringify(res.data.data));
              this.menuTypeArry = menuType
              //console.log(this.menuType)
            }else{
            }
          }).catch(function (error)
          {
            console.log(error)
            this.loading = false
          })
        },
        getNotice(Notice){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Notice/queryNotice",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(Notice)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            this.Notice = res.data.data
            if(this.Notice.length == 0){
              this.isHasNotice =true
            }else{
              this.isHasNotice =false
            }

            //console.log("公告");
            //console.log(this.Notice[0].nDesc);
          }).catch(function (error)
          {
            console.log(error)
          })
        }
      },
      watch:{
        shopNum(newV,oldV){
          if(newV == 0){
            this.isShopcart=''
            this.isToOrder =''
            this.toPay = "暂无"
            this.isToPay = true
            this.isshopcartContent = false

          }else if(newV != 0){
            this.isShopcart=false
            this.isToOrder =false
            this.toPay = "点餐"
            this.isToPay =false
          }
        },
       food:function(){
          this.$nextTick(function(){
            //////方法
              this.initBtn()
            });
        },
        recommendfoods:function(){
          this.$nextTick(function(){
            //////方法
              this.initBtn()
            });
        },
        searchFoods:function(){
          this.$nextTick(function(){
            //////方法
            for(let i=0; i<this.searchFoods.length;i++){
              document.getElementById(this.searchFoods[i].fId).style.display="none";
            }
          });
        },
        newMsg:function () {
          let goEasy = new GoEasy({appkey: 'BS-5c690639637b4e91a82db6fd25d5dc96'});
          let that = this;
          // do something
          goEasy.subscribe({
            channel: 'newMsg',
            onMessage: function(message){
              alert(message.content)
              this.Notice.nDesc = message.content
              this.searchFood()

            }
          });

        }

      },
      created() {
        /*初始化 获取设备宽度除于10，作为rem的单位值*/
        document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
        this.$toast.message('欢迎光临本餐厅');
        //this.$toast.message(fId);
        this.sId = this.$route.query.sId
        //alert(this.sId)
        if(typeof(this.$route.query.sId )!="undefined"){
          this.sId = this.$route.query.sId
          //this.$toast.message(fId);
        }
        this.getFood()
        this.getRecommendFood()
        /*获取设备宽度除于10，作为rem的单位值*/


      },
      mounted(){
        this.getMenu()
        this.newMsg=this.$store.state.newOrderMsg
       /* let menu = document.getElementsByClassName("mu-popover");
        menu[0].style.display='none';*/
        /*获取设备高度*/
        document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
        this.shopcartHeight = document.getElementById("shopcart").offsetHeight
        /*- document.documentElement.clientWidth/ 10 *10.5- 50*/
        this.cententHeight = document.documentElement.clientHeight - 15 - this.shopcartHeight
        /*获取数据*/
        //console.log(this.tableNum)
        let url = window.location.href
        this.app_auth_code = url.substring(url.indexOf('app_auth_code=')+14,url.length);
        //this.app_auth_code = url
        this.getUserId(this.app_auth_code)

        this.getNotice(this.Notice)
        this.initBtn()
        /*判断购物车数量，显示购物车*/
        if(this.shopNum == "0"){
          this.isShopcart=true
          this.isToOrder =true
        }else{
          this.isShopcart=false
          this.isToOrder =false
        }
        const that = this;
        /*mounted监听窗口大小*/
        window.onresize = function temp() {
          document.documentElement.style.fontSize = document.documentElement.clientWidth/ 10 + 'px';
          /*获取设备高度*/
          that.clientHeight = document.documentElement.clientHeight;
          that.clientWidth = document.documentElement.clientWidth;
          /*that.shopcartHeight = document.getElementById("shopcart").offsetHeight*/
          /**- that.clientWidth / 10 *10.5 - 50 */
          that.cententHeight = that.clientHeight - 56 - 15
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
    border-bottom: 0.5px lavender solid;
  }
  .right{
    overflow: scroll;
    /*border-bottom: 1px silver solid;*/
  }
  /*右边价格*/
  .rightPrice{
    position: absolute;
    bottom: 10%;
    left: 0%;
  }

  /*右边菜品按钮*/
  /*.addRemoveButton{
    position: absolute;
    bottom: 0%;
    right: 0%;

  }*/
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
