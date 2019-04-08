<template>
  <div class="receptionPage">
    <el-row class="header">
      <el-col :span="4"><div :class="{OSName: isOSName}">餐厅点餐系统</div></el-col>
      <el-col :span="14">
        <div :class="{NavButton: isButton}" style="font-size: 21px;font-weight: bold">
          前台服务界面
        </div>
      </el-col>
      <el-col :span="6">
        <div style="height:5px;"></div>
        <el-dropdown trigger="click" style="position: absolute;right: 20%;top:15%">
          <mu-avatar >
            <!--<mu-icon value="assignment_ind"></mu-icon>-->
            <img src="../../../assets/1.jpg">
          </mu-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="outToLogin()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="font-size: 18px;font-weight: bolder;color: white;position: absolute;right: 3%;top:1%">
                  欢迎您，张三
        </span>
      </el-col>
    </el-row>

    <!--主体区域-->
    <el-row class="main">
      <!--导航栏-->
      <el-col :span="4">
        <el-aside style="width:100%;background-color: rgb(255, 255, 255);height: 1000px;border-right: 1px solid beige">
          <el-menu default-active="" class="el-menu-vertical-demo" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i><span slot="title">排队管理</span></template>
              <el-menu-item index="1-1" @click="onloadOne('1-1')">序号列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i><span slot="title">餐桌状态</span></template>
              <el-menu-item index="2-1"  @click="onloadOne('2-1')">餐桌视图</el-menu-item>
            </el-submenu>
            <!--<el-submenu index="3">
              <template slot="title"><i class="el-icon-goods"></i><span slot="title">菜品点餐</span></template>
              <el-menu-item index="3-1"  @click="onloadOne('3-1')">点餐视图</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-goods"></i><span slot="title">订单记录</span></template>
              <el-menu-item index="4-1"  @click="onloadOne('4-1')">查看订单</el-menu-item>
            </el-submenu>-->

          </el-menu>
        </el-aside>
      </el-col>
      <!--右侧主体部分-->
      <el-col :span="20">
        <div :class="{NavButton: isButton}">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{mainTitleInfo}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item >{{mainTitle}}</el-breadcrumb-item>
              <el-breadcrumb-item >{{mainTitleInfo}}</el-breadcrumb-item>
            </el-breadcrumb>

          </el-col>
          <!--右侧主题内容-->
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </el-col>

    </el-row>

  </div>

</template>

<script>
  export default {
    name: "adminPage",
    data() {
      return {
        isOSName: true ,  //顶部餐厅名字
        isButton: true ,  //顶部按钮
        isInfo: true ,    //顶部用户信息
        mainTitle: "",
        mainTitleInfo: '', //主体内容标题
        menuObject:{
          1 : {
            menuName:"排队管理",
            menuItems:{
              1:"序号列表"
            }
          },
          2 : {
            menuName:"餐桌状态",
            menuItems:{
              1:"餐桌视图",
            }
          },
          3 : {
            menuName:"菜品点餐",
            menuItems:{
              1:"点餐视图"
              }
            },
          4 : {
            menuName:"订单记录",
            menuItems:{
              1:"查看订单"
            }
          }
        },
        breadcrumbItems: ['']
      }
    },
    methods:{
      outToLogin:function () {
        //1、删除登陆cookie信息
        //2、路由跳转登陆页面
        this.$router.push("/ManageRegister")
        //console.log("aaa")
      },
      onloadOne(e){
        var cmenuName = e.split("-")[0]
        var cmenuItem = e.split("-")[1]
        this.mainTitleInfo = this.menuObject[cmenuName].menuItems[cmenuItem]
        this.mainTitle = this.menuObject[cmenuName].menuName

      },
      handleSelect(key, keyPath) {
        switch (key) {
          case '1-1':
            this.$router.push('/receptionPage/sortPage');
            this.breadcrumbItems = ['序号列表']
            break;
          case '2-1':
            this.$router.push('/receptionPage/tableView')
            this.breadcrumbItems = ['餐桌视图']
            break;
          case '3-1':
            this.$router.push('/receptionPage/receptionOrder')
            this.breadcrumbItems = ['菜品点餐']
            break;
          case '4-1':
            this.$router.push('/receptionPage/orderRecord')
            this.breadcrumbItems = ['订单记录']
            break;
        }
      }
    },
    components:{

    }
  }
</script>
<style>
  .container{

  }
  .header {
    height: 60px;
    line-height: 60px;
    background: #20a0ff;
    color:#fff;
  }
  .OSName{
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    border-right: 1px aliceblue solid;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .NavButton{
    text-align: left;
    padding-left: 15px;
    border-right: 1px aliceblue solid;
  }
  .UserInfo{
    text-align: center;
    padding-right: 20%;
  }
  .user{
    font-size: 18px;
  }
  .breadcrumb-inner {
    float: right;
    margin-top: 10px;
    padding: 5px;
  }
  /*右侧主体内容*/
  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
</style>

<style scoped>

  /*主体内容的标题*/
  .title{
    width: 200px;
    float: left;
    color: #475669;
    font-weight: bold;
    font-size: 18px;
    padding: 5px;
  }
</style>
