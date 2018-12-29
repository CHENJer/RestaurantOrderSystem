<template>
  <!--背景图-->
  <div class = "note" :style = "note">
    <!--login框，表单+tab标签页的组合-->
    <div class = "loginFrame">

      <!--表单组件放在外面，标签栏在里面-->
       <!--rules属性传入验证规则-->
      <el-form ref = "AccountForm" status-icon :model = "AccountForm"  :rules = "rules"  class = "demo-ruleForm login-container">
        <h1>餐厅点餐系统用户登陆页面</h1>
        <!--tab标签-->
        <div class = "tabsUser">
          <el-tabs v-model = "activeName" @tab-click = "handleClick" class = "users" style = "height: 30px;font-size: 25px">
            <el-tab-pane label = "前台" name = "reception" class = "tab1"></el-tab-pane>
            <el-tab-pane label = "厨房" name = "kitchen" class = "tab2"></el-tab-pane>
            <el-tab-pane label = "管理员" name = "admin" class = "tab3"></el-tab-pane>
          </el-tabs>
        </div>

        <!--账号密码输入框-->
        <div class = "formGroup">
          <!--prop属性设置需要校验的字段名，表单验证时，就会验证el-input元素绑定的变量AccountForm.username的值是否符合验证规则-->
          <el-form-item  label = "账号" prop = "username" >
            <el-input type = "text"  auto-complete = "off" placeholder = "请输入您的账号"
                      class = "form-control" v-model="AccountForm.username"></el-input>
          </el-form-item>
          <el-form-item label = "密码" prop = "password" class = "form-inline">
            <el-input type = "password" auto-complete = "off" placeholder = "请输入密码"
                      class = "form-control" v-model="AccountForm.password"></el-input>
          </el-form-item>
        </div>

        <!--记住密码-->
        <div class = "remFor">
          <el-checkbox v-model = "checked" checked class = "remember">记住密码</el-checkbox>
          <a href ="'https://blog.csdn.net/Vanadis_outlook/article/details/72823024.html'" class = "forget">忘记密码？</a>
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
                callback();
              }
            }, 1000);
          }
        };
        var validatePassword= (rule, value, callback) => {
          if (value === '') {
            callback(new Error('密码不能为空'));
          } else {
            if (this.AccountForm.password !== '') {
             //this.$refs.AccountForm.validateField('password');
            }

            callback();


          }
        };
        return {
            /*标签页默认值：前台reception*/
            activeName:'reception',
            /*表单字段双向绑定*/
            AccountForm:{
              username:'',
              password:''
            },
            /*背景图样式*/
            note: {
              position:"absolute",
              top:"0px",
              left:"0px",
              width: "100%",
              height:"100%",
              backgroundImage: "url(" + require("../../assets/logo.png") + ")",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
          },
          rules: {
            username :[
              //{required: true, message: '账号不能为空',trigger: 'blur'},
              { validator: validateUsername,trigger: 'blur' }
            ],
            password: [
             // {required: true,message: '密码不能为空', trigger: 'blur'},
              { validator: validatePassword,trigger: 'blur' }
            ]
          },
          checked: false
        };
      },
      methods:{
        login(){
          this.$refs.ruleForm.validate((valid) => {

          })
          //this.$router.push('/aaa')
        },
        /*打印选择的标签页选项*/
        handleClick(tab, event) {
          console.log("tab:"+this.activeName, event);
        },
        /*登陆按钮提交事件*/
        submitForm(AccountForm) {
          this.$refs[AccountForm].validate((valid) => {
            if (valid) {
              //alert('submit!');
              this.$router.push("/"+this.activeName+"Page")
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 400px;
    padding: 20px 35px 15px 35px;
    background: rgba(255,255,255,0.7);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label{
    width:70px;
    text-align:left;
  }

  .form-control{
    width:270px;
    flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
  }
  .remember{
    width:250px;
    text-align:left;
  }
  .forget{
    width:500px;
    text-align:right;
    font-size:14px;
    font-family:PingFang SC;
  }
  .remFor{
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  .tabsUser{
    display: inline-block;
    margin-left: 0px;
    margin-right:0px;
    text-align:center;
    font-size:25px;
  }

</style>
