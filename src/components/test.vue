<template>
    <div class="back">
      <input type="button"  @click="getData()" value="获取后台数据" /><br/><br/>
      二维码：<br/><img :src="'data:image/jpg;base64,'+base64+''"><br/><br/>

    </div>
</template>

<script>
    export default {
      name: "back",
      data () {
        return {
          base64: '',
          baseImg:'data:image/jpg;base64,'
        }
      },
      mounted: function () {
        //this.getData()
      },
      methods: {
        getData()
        {
          console.log('getDataing......')
          /* then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定。所以用变量来代替*/
          var vuedate = this;
          this.$axios.get(this.COMMON.backUrl+'/orderSystem/SystemManager/qrcodeimg?sId=1')
            .then(function (response)
            {
              console.log(response)
              vuedate.base64 = response.data
              //console.log("vuedate.base64:"+vuedate.base64)
            })
            .catch(function (error)
            {
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped>

</style>
