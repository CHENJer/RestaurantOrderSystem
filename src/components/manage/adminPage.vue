<template>
    <div id="adminPage" :style = "backColor">
      <h1>餐厅点餐系统后台管理界面</h1>
      <el-container style="height: 500px; border: 5px solid #eee" direction="vertical">
        <el-header style="text-align: right; font-size: 16px; font-family:PingFang SC;">
          <el-dropdown>
            <el-button type="primary" icon="el-icon-setting"></el-button>
<!--
            <i class="el-icon-setting" style="margin-right: 20px"></i>
-->
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item @click.native="outToLogin">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="font-weight:bold;">欢迎您：王小虎</span>
        </el-header>

        <el-container>
          <el-aside width="20%" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '6']">
              <!--公告管理-->
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>公告管理</template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">公告推送</el-menu-item>
                  <el-menu-item index="1-2">公告记录</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!--菜单管理-->
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>菜单管理</template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">菜单分类</el-menu-item>
                  <el-menu-item index="2-2">菜品推荐</el-menu-item>
                  <el-menu-item index="2-3">菜品管理</el-menu-item>
                  <el-menu-item index="2-4">销量统计</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!--订单管理-->
              <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">查询订单</el-menu-item>
                </el-menu-item-group>

                <el-submenu index="3-2">
                  <template slot="title">退单管理</template>
                  <el-menu-item index="3-2-1">退单审核</el-menu-item>
                  <el-menu-item index="3-2-2">退单记录</el-menu-item>
                </el-submenu>
              </el-submenu>

              <!--座位管理-->
              <el-submenu index="4">
                <template slot="title"><i class="el-icon-menu"></i>座位管理</template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">座位布置</el-menu-item>
                  <el-menu-item index="4-2">二维码设置</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!--营业报表-->
              <el-submenu index="5">
                <template slot="title"><i class="el-icon-menu"></i>营业报表</template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">日营业报表</el-menu-item>
                  <el-menu-item index="5-2">月营业报表</el-menu-item>
                  <el-menu-item index="5-3">年营业报表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!--系统管理-->
              <el-submenu index="6">
                <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
                <el-menu-item-group>
                  <el-menu-item index="6-1">用户管理</el-menu-item>
                  <el-menu-item index="6-2">权限分配</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </el-menu>
          </el-aside>

          <!--主要内容-->
          <el-main>
            <!--:data="tableData"  是table的数据绑定-->
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "adminPage",
      data() {
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
          tableData: Array(20).fill(item),
          backColor:{
           backgroundColor:'#cac6c6'

          }
        }
      },
      methods:{
        outToLogin:function () {
            //1、删除登陆cookie信息
            //2、路由跳转登陆页面
            this.$router.push("/ManageRegister")
            //console.log("aaa")
          }
      },
      components:{

      }
    }
</script>

<style scoped>
  /*.el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }*/

  .el-aside {
    color: #333;
  }
  h1{
    border: red solid 1px;
    background-color: darkcyan;
    background-clip: border-box;
  }
  body{
    margin-top: 0px;
  }

</style>
