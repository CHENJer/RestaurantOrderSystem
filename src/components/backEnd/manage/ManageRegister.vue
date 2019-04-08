<template>
  <!--背景图-->
  <div class = "note" :style = "note">
    <!--login框，表单+tab标签页的组合-->
    <div class = "loginFrame">
      <!--表单组件放在外面，标签栏在里面-->
       <!--rules属性传入验证规则-->
      <el-form ref = "AccountForm" status-icon :model = "AccountForm"  :rules = "rules"  class = "demo-ruleForm login-container">
        <h1>餐厅点餐系统登陆页面</h1>
        <!--tab标签-->
        <div class = "tabsUser">
          <el-tabs v-model = "activeName" @tab-click = "handleClick" class = "users" style = "height: 30px;font-size: 25px">
            <el-tab-pane label = "前台" name = "前台员工" class = "tab1"></el-tab-pane>
            <el-tab-pane label = "厨房" name = "厨房员工" class = "tab2"></el-tab-pane>
            <el-tab-pane label = "管理员" name = "管理员" class = "tab3"></el-tab-pane>
          </el-tabs>
        </div>

        <!--账号密码输入框-->
        <div class = "formGroup">
          <!--prop属性设置需要校验的字段名，表单验证时，就会验证el-input元素绑定的变量AccountForm.username的值是否符合验证规则-->
          <el-form-item  label = "账号" prop = "aUsername" >
            <el-input type = "text"  auto-complete = "off" placeholder = "请输入您的账号"
                      class = "form-control" v-model="AccountForm.aUsername"></el-input>
          </el-form-item>
          <el-form-item label = "密码" prop = "aPassword" class = "form-inline">
            <el-input type = "password" auto-complete = "off" placeholder = "请输入密码"
                      class = "form-control" v-model="AccountForm.aPassword"></el-input>
          </el-form-item>
        </div>

        <!--记住密码-->
        <div class = "remFor">
          <el-checkbox v-model = "checked" checked class = "remember">记住密码</el-checkbox>
          <!--<a href ="'https://blog.csdn.net/Vanadis_outlook/article/details/72823024.html'" class = "forget">忘记密码？</a>-->
        </div>

        <!--登陆按钮-->
        <div class = "formButton">
          <el-form-item style = "width:100%;">
            <el-button type = "primary" style = "width:100%;" @click="submitForm('AccountForm')">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>
    export default {
      name: "ManageRegister",
      data() {
        /*自定义检验账号方法*/
        var validateUsername = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('账号不能为空'));
          } else {
            setTimeout(() => {
              if (value.length<4) {
                callback(new Error('账号长度大于4位'));
              }else if(value.length>12){
                  callback(new Error('账号长度小于12位'));
              }else {
                /*账号密码校验*/
                callback();
              }
            }, 1000);
          }

        };
        var validatePassword= (rule, value, callback) => {
          if (value === '') {
            callback(new Error('密码不能为空'));
          } else {
            if (this.AccountForm.aPassword !== '') {
             //this.$refs.AccountForm.validateField('password');
            }
            callback();

          }
        };
        return {
            /*标签页默认值：前台reception*/
            activeName:'前台员工',
            activeNameEN:'reception',
            /*表单字段双向绑定*/
            AccountForm:{
              aUsername:"",
              aPassword:""
            },
            loginName:"",
            /*背景图样式*/
            note: {
              position:"absolute",
              top:"0px",
              left:"0px",
              width: "100%",
              height:"105%",
              backgroundImage: "url(" + require("../../../assets/OSManageLogin.jpg") + ")",
              backgroundSize: "100% 105%",
              backgroundRepeat: "no-repeat"
          },
          rules: {
            aUsername :[
              //{required: true, message: '账号不能为空',trigger: 'blur'},
              { validator: validateUsername,trigger: 'blur' }
            ],
            aPassword: [
             // {required: true,message: '密码不能为空', trigger: 'blur'},
              { validator: validatePassword,trigger: 'blur' }
            ]
          },
          checked: false
        };
      },
      methods:{
        /*@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")*/
        login(){
          this.getCookies();
          var vueGet = this;
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/UserInfo/queryUserInfo",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(this.AccountForm)
          }).then((res)=>{
            // console.log(res.data.data.length);
           // console.log(res.data.data[0].aStatus);
            if(res.data.data.length>0){
              if(vueGet.activeName==res.data.data[0].pType && res.data.data[0].aStatus != 1){
                this.loginName = res.data.data[0].uName
                if(this.checked){
                  this.setCookie (this.activeNameEN+"loginName", this.loginName, 1) ;
                  this.setCookie (this.activeNameEN, this.activeName, 1) ;
                  this.setCookie (this.activeNameEN+"uId", res.data.data[0].uId, 1) ;
                  this.setCookie (this.activeNameEN+"aUsername", this.AccountForm.aUsername, 1) ;
                  this.setCookie (this.activeNameEN+"aPassword", this.AccountForm.aPassword, 1) ;
                }else{
                  this.setCookie(this.activeNameEN+"loginName", "", -1);
                  this.setCookie (this.activeNameEN, this.activeName, -1) ;
                  this.setCookie (this.activeNameEN+"uId", res.data.data[0].uId, -1) ;
                  this.setCookie (this.activeNameEN+"aUsername", this.AccountForm.aUsername, -1) ;
                  this.setCookie (this.activeNameEN+"aPassword", this.AccountForm.aPassword, -1) ;
                  this.AccountForm.aUsername ="";
                  this.AccountForm.aPassword = "";
                }
                this.$router.push('/'+this.activeNameEN+'Page');
              }else{
               this.$notify.info("登录失败")
              }
            }else{
              this.$notify.info("账号密码错误")
            }
          }).catch(function (error)
          {
            console.log(error)
          })

        },
        /*打印选择的标签页选项*/
        handleClick(tab, event) {
          switch (this.activeName) {
            case "前台员工":
              this.activeNameEN = "reception"
              break;
            case "厨房员工":
              this.activeNameEN = "kitchen"
              break;
            case "管理员":
              this.activeNameEN = "admin"
              break;
          }
          // console.log("tab:"+this.activeNameEN, event);
         // console.log(this.getCookie (this.activeNameEN));
         // console.log(this.checked);
          if(this.activeName == this.getCookie (this.activeNameEN)){
            this.AccountForm.aUsername =this.getCookie (this.activeNameEN+"aUsername") ;
            this.AccountForm.aPassword = this.getCookie (this.activeNameEN+"aPassword") ;
          }else{
            this.AccountForm.aUsername ="";
            this.AccountForm.aPassword = "";
          }

        },
        /*登陆按钮提交事件*/
        submitForm(AccountForm) {
          this.$refs[AccountForm].validate((valid) => {
            if (valid) {
              this.login()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //设置cookie
        setCookie (cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
          var expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
          //console.info(document.cookie);
        },
        //获取cookie
        getCookies: function (){
          let loginName = this.getCookie("loginName");
          let loginType = this.getCookie("loginType");
          let aUsername = this.getCookie("aUsername");
          let aPassword = this.getCookie("aPassword");
          //console.log(loginName+loginType+aUsername+aPassword)
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
        //清除cookie
       /* clearCookie: function () {
          this.setCookie("username", "", -1);
        },*/
        checkCookie: function () {
          var user = this.getCookie("username");
          if (user != "") {
            alert("Welcome again " + user);
          } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
              this.setCookie("username", user, 365);
            }
          }
        }
      },
      mounted(){
        this.getCookie()
      }
    }
</script>
<!--全局属性-->
<style>
  .note .el-form-item__label{
    font-size: 22px;
    text-align:right;
    margin-left: 10px;
  }
  .note .el-tabs__item {
    font-size: 20px;
  }
</style>
<style scoped>
  /*整个登录页面*/
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 500px;
    text-align: center;
    padding: 20px 35px 15px 35px;
    background: rgba(255,255,255,0.7);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  /*输入密码框*/
  .form-control{
    width:270px;
    flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
  }
  /*记住密码*/
  .remember{
    width:250px;
    text-align:left;
  }
  /*忘记密码*/
  .forget{
    width:500px;
    text-align:right;
    font-size:14px;
    font-family:PingFang SC;
  }
  /*导航标签*/
  .tabsUser{
    display: inline-block;
    margin-left: 0px;
    margin-right:0px;
    text-align:center;
    font-size: 40px;
  }
  /*账号密码输入框*/
  .formGroup{
    margin-top: 30px;
  }
  /*记住密码和忘记密码*/
  .remFor{
    margin-bottom: 10px;
    padding-bottom: 10px;
    margin-top: 20px;
  }
  /*登录按钮*/
  .formButton{
    margin-top: 15px;
  }

</style>
