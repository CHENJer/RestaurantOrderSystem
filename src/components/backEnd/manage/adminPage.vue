<template>
  <div class="adminPage">
    <el-row class="header">
      <el-col :span="4"><div :class="{OSName: isOSName}">餐厅点餐系统</div></el-col>
      <el-col :span="14">
        <div :class="{NavButton: isButton}" style="font-size: 21px;font-weight: bold;">
          后台管理界面
        </div>
      </el-col>
      <el-col :span="6">
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
                  欢迎您，{{userName}}
        </span>

      </el-col>
    </el-row>

    <!--主体区域-->
    <el-row class="main">
      <!--导航栏-->
      <el-col :span="4">
        <el-aside style="width:100%;background-color: rgb(255, 255, 255);height: 1000px;border-right: 1px solid beige">
          <el-menu default-active="" class="el-menu-vertical-demo" @select="handleSelect">
           <!-- <el-menu-item index="0">
              <i class="el-icon-mobile-phone"></i>
              <span slot="title"><router-link to='/CustomerOrder/Foods'>首页</router-link></span>
            </el-menu-item>-->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i><span slot="title">公告管理</span></template>
              <el-menu-item index="1-1" @click="onloadOne('1-1')">公告推送</el-menu-item>
              <el-menu-item index="1-2" @click="onloadOne('1-2')">公告记录</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i><span slot="title">菜单管理</span></template>
              <el-menu-item index="2-1"  @click="onloadOne('2-1')">菜品分类</el-menu-item>
              <el-menu-item index="2-2"  @click="onloadOne('2-2')">菜品推荐</el-menu-item>
              <el-menu-item index="2-3"  @click="onloadOne('2-3')">菜品管理</el-menu-item>
              <el-menu-item index="2-4"  @click="onloadOne('2-4')">销量统计</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-goods"></i><span slot="title">订单管理</span></template>
                <el-menu-item index="3-1"  @click="onloadOne('3-1')">查询订单</el-menu-item>
                <el-menu-item index="3-2"  @click="onloadOne('3-2')">退单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-news"></i><span slot="title">座位管理</span></template>
              <el-menu-item index="4-1"  @click="onloadOne('4-1')">座位布置</el-menu-item>
              <el-menu-item index="4-2"  @click="onloadOne('4-2')">座位二维码</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-date"></i><span slot="title">营业报表</span></template>
              <el-menu-item index="5-1"  @click="onloadOne('5-1')">日营业报表</el-menu-item>
              <el-menu-item index="5-2"  @click="onloadOne('5-2')">月营业报表</el-menu-item>
              <el-menu-item index="5-3"  @click="onloadOne('5-3')">年营业报表</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">系统管理</span></template>
              <el-menu-item index="6-1"  @click="onloadOne('6-1')">用户管理</el-menu-item>
              <el-menu-item index="6-2"  @click="onloadOne('6-2')">权限分配</el-menu-item>
            </el-submenu>
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
          userName:'',
          mainTitle: "",
          mainTitleInfo: '', //主体内容标题
          menuObject:{
            1 : {
              menuName:"公告管理",
              menuItems:{
                1:"公告推送",
                2:"公告记录"
              }
            },
            2 : {
              menuName:"菜单管理",
              menuItems:{
                1:"菜品分类",
                2:"菜品推荐",
                3:"菜品管理",
                4:"销量统计",
              }
            },
            3 : {
              menuName:"订单管理",
              menuItems:{
                1:"查询订单",
                2:{
                  menuItem:"退单管理",
                  1:"退单审核",
                  2:"退单记录"
                }
              }
            },
            4 : {
              menuName:"座位管理",
              menuItems:{
                1:"座位布置",
                2:"座位二维码"
              }
            },
            5: {
              menuName:"营业报表",
              menuItems:{
                1:"日营业报表",
                2:"月营业报表",
                3:"年营业报表"
              }
            },
            6 : {
              menuName:"系统管理",
              menuItems:{
                1:"用户管理",
                2:"权限分配"
              }
            }
          },
          breadcrumbItems: [''],
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
          // alert(menuName)
          //alert(this.menuObject[cmenuName].menuName)
          this.mainTitleInfo = this.menuObject[cmenuName].menuItems[cmenuItem]
          this.mainTitle = this.menuObject[cmenuName].menuName
          if(cmenuName =='3' && cmenuItem == "2"){
            this.mainTitleInfo = this.menuObject[cmenuName].menuItems[cmenuItem].menuItem
          }
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
        handleSelect(key, keyPath) {
          switch (key) {
            case '1-1':
              this.$router.push('/adminPage/noticePush');
              this.breadcrumbItems = ['公告推送']
              break;
            case '1-2':
              this.$router.push('/adminPage/noticeList')
              this.breadcrumbItems = ['公告记录']
              break;
            case '2-1':
              this.$router.push('/adminPage/foodType')
              this.breadcrumbItems = ['菜品分类']
              break;
            case '2-2':
              this.$router.push('/adminPage/foodRecommend')
              this.breadcrumbItems = ['菜品推荐']
              break;
            case '2-3':
              this.$router.push('/adminPage/foodManage')
              this.breadcrumbItems = ['菜品管理']
              break;
            case '2-4':
              this.$router.push('/adminPage/salesVolume')
              this.breadcrumbItems = ['销量管理']
              break;
            case '3-1':
              this.$router.push('/adminPage/queryOrders')
              this.breadcrumbItems = ['查询订单']
              break;
            case '3-2':
              this.$router.push('/adminPage/orderBack')
              this.breadcrumbItems = ['退单管理']
              break;
            case '4-1':
              this.$router.push('/adminPage/seatSet')
              this.breadcrumbItems = ['座位布置']
              break;
            case '4-2':
              this.$router.push('/adminPage/seatQrCodeImg')
              this.breadcrumbItems = ['座位二维码']
              break;
            case '5-1':
              this.$router.push('/adminPage/dayStatement')
              this.breadcrumbItems = ['日营业报表']
              break;
            case '5-2':
              this.$router.push('/adminPage/monthStatement')
              this.breadcrumbItems = ['月营业报表']
              break;
            case '5-3':
              this.$router.push('/adminPage/yearStatement')
              this.breadcrumbItems = ['年营业报表']
              break;
            case '6-1':
              this.$router.push('/adminPage/userManage')
              this.breadcrumbItems = ['用户管理']
              break;
            case '6-2':
              this.$router.push('/adminPage/permissionAssignment')
              this.breadcrumbItems = ['权限分配']
              break;
          }
        }
      },
      created(){
        this.userName = this.getCookie("adminloginName");
      },
      mounted(){

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
