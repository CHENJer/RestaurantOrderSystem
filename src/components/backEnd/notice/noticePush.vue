<template>
    <div class="noticePush">
      <el-alert title="推送成功" type="success" show-icon v-show="isSuccess"></el-alert>
      <el-alert title="推送失败" type="error" show-icon v-show="isfailure"></el-alert>

      <el-form ref="form" :model="form" label-width="120px" v-loading="isLoading">
        <span style="color: red; margin-left: 15px">注意：公告必须填写标题，如果内容为空，结束时间不会生效，推送后会清空商家公告</span>

        <el-form-item label="*公告标题">
          <el-input v-model="form.noticeTitle" placeholder="请填写公告标题" ></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="6">
            <el-date-picker v-model="endDate" type="date" value-format="yyyy-MM-dd" @change="getEndDate" placeholder="选择结束日期" :picker-options="pickerOptions0"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">—</el-col>
          <el-col :span="6">
            <el-time-picker arrow-control v-model="endTime" value-format="HH:mm:ss" @change="getEndTime" :picker-options="{ selectableRange: '00:00:00 - 23:59:59'}" placeholder="结束时间点">
            </el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="公告内容">
          <el-input type="textarea" :rows="6" placeholder="请输入公告内容"
                    v-model="form.notice">
          </el-input>
        </el-form-item >
        <el-form-item>
          <el-button type="primary" :loading=isLoading @click="onSubmit">立即推送</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "noticePush",
      data() {
        return {
          textarea: '',
          isLoading: false,
          isSuccess:false,  // 推送成功提示窗口
          isfailure:false,  // 推送失败提示窗口
          endDate: '',
          endTime:'',
          pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
          form:{
            notice:'',
            noticeTitle:''
          }
        }
      },
      methods:{
        onSubmit() {
          /* then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定。所以用变量来代替*/
          var vueGet = this;
          vueGet.isLoading = true
          this.$axios.get(this.COMMON.backUrl+'/orderSystem/SystemManager/qrcodeimg')
            .then(function (res)
            {
              vueGet.isLoading = false
              vueGet.isSuccess=true
              alert("推送成功")
            })
            .catch(function (error)
            {
              vueGet.isLoading = false
              vueGet.isfailure=true
              console.log(error)
            })
        },
        getEndDate(val) {
          this.endDate=val;//这个endDate是在data中声明的，也就是v-model绑定的值
          alert(this.endDate)
        },
        getEndTime(val) {
          this.endTime=val;//这个endTime是在data中声明的，也就是v-model绑定的值
          alert(this.endTime)
        }
      }
    }
</script>

<style scoped>

</style>
<style>
  .el-form{
    margin-top: 15px;
    margin-left: 15px ;
    margin-right: 15px ;
    width: 90%;
  }

  .el-form-item__content{
    text-align: center;
  }
  .el-form-item__label{
    font-size: 19px;
    font-weight: bold;
    margin-left: 70px;
  }

</style>
