<template>
    <div class="back">

      {{serverData}}
    </div>
</template>

<script>
    export default {
      name: "back",
      data () {
        return {
          serverData: '后端数据返回'
        }
      },
      mounted: function () {
        this.getData()
      },
      methods: {
        getData()
        {

          console.log('-------getData')

          var that = this.$axios.get('http://192.168.2.196:8090/orderSystemManager_war_exploded/SystemManager/qrcodeimg')
            .then(function (response) {
              console.log(response)
              that.serverData = response.data
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped>

</style>
