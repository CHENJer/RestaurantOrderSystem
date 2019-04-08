<template>
  <div class="orderBack">
    <div>
      <el-input v-model="search" suffix-icon="el-icon-search" placeholder="输入订单ID搜索"/>
    </div>

    <el-table  :data="TableData.filter(data => !search || data.omId.toLowerCase().includes(search.toLowerCase())
        || data.tNum.toLowerCase().includes(search.toLowerCase()) || data.sSeatnum.toLowerCase().includes(search.toLowerCase())  )"
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
      <el-table-column label="桌号" prop="tNum" width="50">
      </el-table-column>
      <el-table-column label="座位" prop="sSeatnum" width="50">
      </el-table-column>
      <el-table-column label="订单总额" prop="omAmount" width="100" sortable>
      </el-table-column>
      <el-table-column label="下单时间" prop="omCreatetime" width="150" sortable>
      </el-table-column>
      <el-table-column label="退单时间" prop="omUpdatetime" width="150" sortable>
      </el-table-column>
      <!--<el-table-column label="订单状态" width="90">
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
      </el-table-column>-->
      <el-table-column label="退单审批">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)">审核</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "orderBack",
      data(){
        return{
          search: '',
          OrderMaster:[],
          OrderDetail:[],
          TableData: [],

        }
      },
      methods:{
        /*筛选条件*/
        filterHandler(value, row,column){
          const property = column['property'];
          return row[property] === value;
        },
        handleEdit(index, row) {
          console.log(row)
          /*确定是否退单对话框*/
          this.$confirm('是否同意顾客退单?', '提示', {confirmButtonText: '同意', cancelButtonText: '不同意', type: 'warning'
          }).then(() => {
            /*调用退款方法*/
              this.refundOrder(row.omId ,row.omAmount)
          }).catch(() => {
            /*不同意退单，更改订单状态*/
            let Order ={"omId":row.omId,"omStatus":0}
            this.updateOrderMaster(Order)
            setTimeout(()=>{
              this.getOrderMaster()
              this.getOrderDetail()
              this.$notify.success('不同意顾客退单');
            },1000)
          });
        },
        refundOrder(sn ,money){
          /*退款提示*/
          this.$notify.info("退款中，请稍候....")
          /*退款api，sn为订单编号，money为金额金额*/
          this.$axios.get('http://47.107.115.216:8002/Refund.php?sn='+sn+'&money='+money).then((res)=> {
            /*返回状态码 10000为退款成功*/
            if(res.status = 10000){
              let Order ={"omId":sn,"omStatus":3}
              /*更新主订单*/
              this.updateOrderMaster(Order)
              /*延迟获取主订单和订单详情*/
              setTimeout(()=>{
                this.getOrderMaster()
                this.getOrderDetail()
                this.$notify.success("退款成功")
              },2000)
            }
          }).catch(function (error) {
              console.log(error);
            });
        },
        getOrderMaster(){
          this.TableData =[]
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
              if(that.OrderMaster[i].omStatus == 2 ){
                that.TableData.push(that.OrderMaster[i])
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
            //console.log(that.OrderDetail)
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
      mounted() {
        this.getOrderMaster()
        this.getOrderDetail()
      },
    }
</script>

<style scoped>

</style>
