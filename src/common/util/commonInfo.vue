<script type="text/javascript">
  // 定义一些公共的属性和方法
  const frontUrl = 'http://192.168.43.139:8088/'
  const backUrl = 'http://192.168.43.139:8080/'
  function commonFun() {
    console.log("公共方法")
  }
  // 暴露出这些属性和方法
  export default {
    frontUrl,
    backUrl,
    commonFun
  }
</script>
