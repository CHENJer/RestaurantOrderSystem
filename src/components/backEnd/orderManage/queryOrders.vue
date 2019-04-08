<template>
  <div class="queryOrders">

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: 10px">
      <el-tab-pane label="进行的订单" name="doing" id="doing">
        <div>
          <el-input v-model="searchDoing" suffix-icon="el-icon-search" placeholder="输入订单ID或者座位号搜索"/>
        </div>
        <el-table  :data="doingTableData.filter(data => !searchDoing || data.omId.toLowerCase().includes(searchDoing.toLowerCase())
        || data.tNum.toLowerCase().includes(searchDoing.toLowerCase()) || data.sSeatnum.toLowerCase().includes(searchDoing.toLowerCase())  )"
                   height="500px"
                   style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">

          <el-table-column type="expand" >

            <template slot-scope="scope" >
              <!-- v-if="scope.row.omId==items.omId =="-->
              <div style="font-size: 18px"  v-for="(items,index) in OrderDetail" v-if="scope.row.omId==items.omId">
                <div></div>
                <span style="">{{items.fName}}</span>
                <span style="position: absolute;left: 45%">×{{items.fQuantity}}</span>
                <span style="position: absolute;left: 65%;color:red">￥{{items.fPrice}}</span>
              </div>
            </template>

          </el-table-column>
          <el-table-column label="订单ID" prop="omId" width="165">
          </el-table-column>
          <el-table-column label="下单时间" prop="omCreatetime" width="150" sortable>
          </el-table-column>
          <el-table-column label="桌号" prop="tNum" width="50">
          </el-table-column>
          <el-table-column label="座位" prop="sSeatnum" width="50">
          </el-table-column>
          <el-table-column label="订单总额" prop="omAmount" width="100" sortable>
          </el-table-column>
          <el-table-column label="订单状态" width="90">
            <template slot-scope="scope" >
              <el-tag type="success" v-if="scope.row.omStatus == 0">
                进行中
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="支付状态" >
            <template slot-scope="scope" >
              <el-tag type="success" v-if="scope.row.omPayStatus == 1">
                已支付
              </el-tag>
              <el-tag type="danger" v-else>
                未支付
              </el-tag>
            </template>

          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成的订单" name="finish" id="finish">
        <div>
          <el-input v-model="searchFinish" suffix-icon="el-icon-search" placeholder="输入订单ID或者座位号搜索"/>
        </div>
        <el-table  :data="finishTableData.filter(data => !searchFinish || data.omId.toLowerCase().includes(searchFinish.toLowerCase())
        || data.tNum.toLowerCase().includes(searchFinish.toLowerCase()) || data.sSeatnum.toLowerCase().includes(searchFinish.toLowerCase())  )"
                   height="500px"
                   style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column type="expand" >

            <template slot-scope="scope" >
              <!-- v-if="scope.row.omId==items.omId =="-->
              <div style="font-size: 18px"  v-for="(items,index) in OrderDetail" v-if="scope.row.omId==items.omId">
                <div></div>
                <span style="">{{items.fName}}</span>
                <span style="position: absolute;left: 45%">×{{items.fQuantity}}</span>
                <span style="position: absolute;left: 65%;color:red">￥{{items.fPrice}}</span>
              </div>
            </template>

          </el-table-column>
          <el-table-column label="订单ID" prop="omId" width="165">
          </el-table-column>
          <el-table-column label="下单时间" prop="omCreatetime" width="150" sortable>
          </el-table-column>
          <el-table-column label="桌号" prop="tNum" width="50">
          </el-table-column>
          <el-table-column label="座位" prop="sSeatnum" width="50">
          </el-table-column>
          <el-table-column label="订单总额" prop="omAmount" width="100" sortable>
          </el-table-column>
          <el-table-column label="订单状态" width="90">
            <template slot-scope="scope" >
              <el-tag type="success" v-if="scope.row.omStatus == 1">
                已完成
              </el-tag>
              <el-tag type="danger" v-if="scope.row.omStatus == 3">
                已退单
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="支付状态" >
            <template slot-scope="scope" >
              <el-tag type="success" v-if="scope.row.omPayStatus == 1">
                已支付
              </el-tag>
              <el-tag type="danger" v-else>
                未支付
              </el-tag>
            </template>

          </el-table-column>

        </el-table>
      </el-tab-pane>

    </el-tabs>



  </div>
</template>

<script>
    export default {
      name: "queryOrders",
      data(){
        return{
          activeName: 'doing',
          searchDoing: '',
          searchFinish: '',
          OrderMaster:[],
          OrderDetail:[],
          doingTableData: [],
          finishTableData: [],
        }
      },
      mounted() {
        this.getOrderMaster()
        this.getOrderDetail()
      },
      methods:{
        filterHandler(value, row,column){
          const property = column['property'];
          return row[property] === value;
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        getOrderMaster(){
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/queryOrderMasterInfo",
            headers:{
              'Content-type': 'application/json'
            }
            /*data: JSON.stringify(OrderMaster)*/
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            that.OrderMaster = res.data.data
            for(let i =0; i<that.OrderMaster.length;i++){
              if(that.OrderMaster[i].omStatus == 0 || that.OrderMaster[i].omPayStatus == 0){
                that.doingTableData.push(that.OrderMaster[i])
              }else if(that.OrderMaster[i].omStatus == 1 || that.OrderMaster[i].omStatus == 3){
                that.finishTableData.push(that.OrderMaster[i])
              }
            }
            //console.log(that.OrderMaster)
          }).catch(function (error)
          {
            console.log(error)
          })
        },
        getOrderDetail(){
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/queryOrderDetailInfo",
            headers:{
              'Content-type': 'application/json'
            },
            /*data: JSON.stringify(OrderDetail)*/
          }).then((res)=>{
            //console.log(res.data.data[0].pType);

            that.OrderDetail = res.data.data
            console.log(that.OrderDetail)
          }).catch(function (error)
          {
            console.log(error)
          })
        },
        updateOrderMaster(Order){
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Order/updateOrder",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(Order)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
          }).catch(function (error)
          {
            console.log(error)
          })
        },
      },
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100%;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
