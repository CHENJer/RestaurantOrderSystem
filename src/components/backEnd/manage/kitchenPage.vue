<template>
  <div class="kitchenPage">
    <audio ref="newOrder"  src="../../../../static/mp3/orderMusic.mp3"></audio>
    <audio ref="getOrder"  src="../../../../static/mp3/getOrder.mp3"></audio>
    <el-row class="header">
      <el-col :span="4"><div :class="{OSName: isOSName}" style="overflow: hidden">餐厅点餐系统</div></el-col>
      <el-col :span="14">
        <div :class="{NavButton: isButton}" style="font-size: 21px;font-weight: bold">
          厨房管理界面
        </div>
      </el-col>
      <el-col :span="6">
       <!-- <div :class="{UserInfo: isInfo}">-->
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
                  欢迎您，{{userName}}
          </span>

      </el-col>
    </el-row>

    <!--主体区域-->
    <el-row class="main">
      <!--导航栏-->
      <el-col :span="4">
        <el-aside style="width:100%;background-color: rgb(255, 255, 255);height: 500px;border-right: 1px solid beige">
          <el-menu default-active="" class="el-menu-vertical-demo" @select="handleSelect">
            <!-- <el-menu-item index="0">
               <i class="el-icon-mobile-phone"></i>
               <span slot="title"><router-link to='/CustomerOrder/Foods'>首页</router-link></span>
             </el-menu-item>-->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i><span slot="title">订单视图</span></template>
              <el-menu-item index="1-1" @click="onloadOne('1-1')">订单视图</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i><span slot="title">菜单管理</span></template>
              <el-menu-item index="2-1"  @click="onloadOne('2-1')">菜品设置</el-menu-item>
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
          <el-col :span="24" class="content-wrapper" style="overflow: auto">
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
  let goEasy = new GoEasy({appkey: 'BS-5c690639637b4e91a82db6fd25d5dc96'});
  export default {
    name: "adminPage",
    data() {
      return {
        newOrderMsg:'', //下单消息
        isOSName: true ,  //顶部餐厅名字
        isButton: true ,  //顶部按钮
        isInfo: true ,    //顶部用户信息
        userName:'',      //用户名
        mainTitle: "",
        mainTitleInfo: '', //主体内容标题
        menuObject:{
          1 : {
            menuName:"订单视图",
            menuItems:{
              1:"订单视图"
            }
          },
          2 : {
            menuName:"菜单管理",
            menuItems:{
              1:"菜品设置",
            }
          }
        },
        breadcrumbItems: [''],
      }
    },
    methods:{
      newOrderAudio(num,title){
        if(num==0){
          let audio = this.$refs.newOrder
          audio.play()
          this.$notify.info({title: '消息', message: title});
        }else if(num==1){
          let audio = this.$refs.getOrder
          audio.play()
          this.$notify.warning({title: '消息', message: title});
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
      },
      handleSelect(key, keyPath) {
        switch (key) {
          case '1-1':
            this.$router.push('/kitchenPage/orderView');
            this.breadcrumbItems = ['订单视图']
            break;
          case '2-1':
            this.$router.push('/kitchenPage/kitchenFoodSet')
            this.breadcrumbItems = ['菜单设置']
            break;
        }
      }
    },
    watch: {
      newOrderMsg(newV,oldV) {
        let that = this;
        // do something
        goEasy.subscribe({
          channel: 'newsOrder',
          onMessage: function(message){
            //console.log(that);
            if(message.content=="有顾客下单了"){
              that.newOrderMsg = message.content
              that.newOrderAudio(0,message.content);

            }else if(message.content=="有顾客催单了"){
              that.newOrderMsg = message.content
              that.newOrderAudio(1,message.content);
            }

          }
        });

      }
    },
    mounted() {
      this.newOrderMsg=this.$store.state.newOrderMsg
      this.userName = this.getCookie("kitchenloginName");
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
  /* // background-color: #fff;*/
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
