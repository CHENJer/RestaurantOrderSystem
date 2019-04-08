<template>
    <div class="noticePush" style="font-weight: bolder;font-size: 22px">
      <div style="color: red; font-size:20px;margin: 30px;height: 50px">注意：公告必须填写完整，如果内容为空，推送后会清空商家公告</div>
      <el-form ref="form" :model="form" label-width="180px" v-loading="isLoading" :rules="rules" >
        <el-form-item label="公告标题："  prop="nTitle" style="font-size: 25px">
          <el-input v-model="form.nTitle" placeholder="请填写公告标题" style="font-size:20px;text-align: center" ></el-input>
        </el-form-item>
        <el-form-item label="结束时间："  prop="nEndtime">
          <el-col :span="12">
            <div class="block">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.nEndtime"
                type="datetime"
                :picker-options="pickerOptions0"
                placeholder="选择结束的日期时间">
              </el-date-picker>
            </div>
          </el-col>
        </el-form-item>

        <el-form-item label="公告内容：">
          <el-input type="textarea" :rows="6" placeholder="请输入公告内容" style="font-size:20px;"
                    v-model="form.nDesc">
          </el-input>
        </el-form-item >
        <el-form-item>
          <el-button type="primary" :loading=isLoading @click="onSubmit('form')">立即推送</el-button>
          <el-button  @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
      <!--<button @click="Newmsg">dianwo</button>-->
    </div>
</template>

<script>
    import {getOnlyNum} from '../../../common/util/getRandom.js'
    export default {
      name: "noticePush",
      data() {
        return {
          textarea: '',
          isLoading: false,
          pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now();
            }
          },
          Notice:{
            nStatus:"1"
          },
          uNotice:{
            nStatus:"1"
          },
          endId:"",
          form:{
            nTitle:'',
            nEndtime:'',
            nDesc:'',
            uId:'',
            nStatus:'1',
            nNum:""
          },
          rules: {
            nTitle: [
              { required: true, message: '请输入公告标题', trigger: 'blur' },
              { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
            ],
            nEndtime: [
              { required: true, type: 'string',  message: '请选择结束时间', trigger: 'change' }
            ],
            /*nDesc: [
              { required: true, message: '请输入公告标题', trigger: 'blur' },
              { min: 3, max: 50, message: '至少输入 3 到 50 个字符之间', trigger: 'blur' }
            ]*/
          }
        }
      },
      methods:{
        Newmsg(){
          let that = this
          let goEasy = new GoEasy({appkey: 'BC-fa9286de3f184384a585e6f0429788f8'});
          goEasy.publish ({
            channel: 'newMsg',
            message: that.form.nDesc
          });
        },
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              /*清空进行的公告*/
              if(typeof this.Notice != "undefined"){
                console.log("this.Notice.nId："+this.Notice.nId)
                let update = {"nId":this.Notice.nId,"nStatus":"0"}
                this.updateNotice(update)
              }
              setTimeout(()=>{
                let Num =  getOnlyNum("N")
                this.form.nNum = Num
                /*插入新公告*/
                this.insertNotice()
              },1000)
              setTimeout(()=>{
                this.getNotice(this.uNotice)
              },1000)


              this.Newmsg()
              /*开启定时任务*/
              let endtimeNotice ={nId:this.endId.nId+1,nStatus:"0"}
              //console.log("endtimeNotice:")
              //console.log(endtimeNotice)
              this.openTimeout(endtimeNotice)
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        openTimeout(endtimeNotice){
          console.log("定时任务开启.............")
          /*当前时间*/
          let time = new Date()
          /*转换结束时间格式*/
          let endtime = new Date(this.form.nEndtime)
         /*差值*/
          let removetime = endtime.getTime() -time.getTime()
          console.log("任务开启时间............."+removetime)
          let _this=this
          setTimeout(function()  {
            _this.test(endtimeNotice)
          }, removetime);
        },
        test(endtimeNotice){
          console.log("任务开启成功+++++++++++++++++++++")
          console.log(endtimeNotice)
          this.updateNotice(endtimeNotice)
          this.Newmsg()
          this.getNotice(this.uNotice)
        },
        updateNotice(notice){
          let that =this
          this.$axios({
            method:"post",
            url:that.COMMON.backUrl+"orderSystem/Notice/updateNotice",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(notice)
          }).then((res)=>{
            console.log(res)
          }).catch(function (error)
          {
            console.log(error)
          })
        },
        insertNotice(){
          /* then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定。所以用变量来代替*/
          this.isLoading = true
          let that =this
          this.$axios({
            method:"post",
            url:that.COMMON.backUrl+"orderSystem/Notice/insertNotice",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(this.form)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.isLoading = false
            //console.log(res.data.code)
            if(res.data.code==20000){
              that.$notify.success("推送成功")
            }else{
              that.$notify.error("推送失败")
            }
          }).catch(function (error)
          {
            console.log(error)
            that.isLoading = false
          })
        },
        getNotice(notice){
          let that =this
          this.$axios({
            method:"post",
            url:that.COMMON.backUrl+"orderSystem/Notice/queryNotice",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(notice)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.Notice = res.data.data[0]
            if(typeof that.Notice != "undefined"){
              that.endId = that.Notice.nId
            }

           // console.log("查询到的：")
           // console.log(that.Notice)
           // console.log(typeof that.Notice == "undefined");

          }).catch(function (error)
          {
            console.log(error)
          })
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
      },
      mounted(){
        this.form.uId = this.getCookie("adminuId")
        console.log("uId")
        console.log(this.form.uId)
        this.getNotice(this.Notice)
      },
      watch:{
        Notice(newV,oldV){
          console.log(newV)
          if(typeof newV != "undefined"){
            if(newV.nTitle!="" && newV.nDesc!=""&& newV.nEndtime!=null ){
              this.form.nTitle = this.Notice.nTitle
              this.form.nDesc = this.Notice.nDesc
              this.form.nEndtime = this.Notice.nEndtime
              this.form.nStatus = this.Notice.nStatus
              //console.log(this.Notice)
            }
          }


        }
      }
    }
</script>

<style>
 .el-form{
    width: 90%;
  }
 .noticePush .el-form-item__label{
   font-size: 21px;
   font-weight: bold;
 }
 .noticePush .el-button--text{
   margin-top: 20px;
   display: none;
 }
/*
  .el-form-item__content{
    margin-top: 20px;
    text-align: center;
  }
  .el-form-item__label{
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
    margin-left: 70px;
  }
  .el-button--text{
    margin-top: 20px;
    display: none;
  }*/
</style>
