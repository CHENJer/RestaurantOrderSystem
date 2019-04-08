<template>
  <div class="sortPage">
    <el-card class="box-card" style="overflow: scroll;height: 500px">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px;font-weight: bolder">序号列表</span>
        <el-button style="float: right;font-size: 16px" type="button" @click="addNum()">新增序号</el-button>
      </div>
      <div v-for="(value, index) in sortList" style="text-align: center;font-weight: bolder">
        <el-button type="text" style="font-size: 30px" @click="openSortNum(value)">{{value.Num}}</el-button>
        <el-dialog title="详情" :visible.sync="dialogVisible" width="30%">
          <div id="printSortNum" style="text-align: center;font-weight: bolder">
            <div style="font-size: 20px;margin-top: 0px;margin-bottom: 10px">
              餐厅候餐
            </div>
            <div style="font-size: 30px;">
              编号：{{Num}}
            </div>
            <div style="margin-top: 10px;font-size: 25px;">
              时间：{{NumData}}
            </div>
          </div>
          <span slot="footer" class="dialog-footer" >
            <el-button @click="changNum(0)" size="small">关闭</el-button>
            <el-button @click="changNum(1)" size="small">完成排队</el-button>
            <el-button type="primary"  v-print="'#printSortNum'" size="small">打印</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "sortPage",
    data(){
      return{
        dialogVisible: false,
        startNum: '1000',
        sortList:[],
        Num:'',
        NumData:'',
        value:''
      }
    },
    methods: {
      openSortNum(sortNum){
        this.Num = sortNum.Num
        this.NumData = sortNum.NumData
        this.value = sortNum
        this.dialogVisible= true
      },
      changNum(e){
        /*打印*/
        if(e == 1){
          for (let i = 0;i<this.sortList.length;i++){
            let obj = this.sortList[i];
            if (obj.Num == this.value.Num){
              this.sortList.splice(i,1);
            }
            localStorage.setItem("sortMsg",JSON.stringify(this.sortList))
          }
        }
        this.dialogVisible = false
      },
      addNum(){
        this.startNum++;
        let date = new Date().toLocaleTimeString();
        let newSortNum = {Num:this.startNum, NumData: date}
        this.sortList.push(newSortNum)
        /*使用localStorage存储数组与对象*/
        localStorage.setItem("sortMsg",JSON.stringify(this.sortList))
      }
    },
    created(){
      //在页面加载时读取localStorage里的状态信息
      /* this.sortList=localStorage.getItem("sortMsg");*/
      //在页面刷新时将this.sortList里的信息保存到localStorage里
      console.log(localStorage.getItem('sortMsg'))
      if(JSON.parse(localStorage.getItem('sortMsg'))!=null){
        this.sortList=JSON.parse(localStorage.getItem('sortMsg'));
      }

    },

  }
</script>

<style scoped>

</style>
