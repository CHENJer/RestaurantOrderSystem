<template>
  <div class="orderBack">
    <div>
      <el-input v-model="search" suffix-icon="el-icon-search" placeholder="输入订单ID搜索"/>
    </div>

    <el-table  :data="tableData5.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column type="expand" >
        <template slot-scope="props">
          <el-form label-position="center" inline class="demo-table-expand">
            <el-table :data="tableData5" height="300" show-summary stripe style="width: 100%;border: 3px solid silver;border-radius: 5px"  :default-sort = "{prop: 'date', order: 'descending'}">
              <el-table-column prop="name" label="菜品名字" >
              </el-table-column>
              <el-table-column prop="shopId" label="数量" >
              </el-table-column>
              <el-table-column prop="shopId" label="单价"  sortable>
              </el-table-column>
              <el-table-column prop="shopId" label="小计"  sortable>
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" prop="id">
      </el-table-column>
      <el-table-column label="下单时间" prop="name" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{new Date() | shortTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="座位编号" prop="shopId">
      </el-table-column>
      <el-table-column label="订单总额" prop="shopId" sortable>
      </el-table-column>
      <el-table-column label="支付状态" prop="payStatus" :filters="[{text: '已支付', value: '已支付'},{text: '未支付', value: '未支付'}]"
                       :filter-method="filterHandler" column-key="payStatus">
        <template slot-scope="scope">
          <el-tag :type="scope.row.payStatus === '未支付' ? 'primary' : 'success'" disable-transitions>
            {{scope.row.payStatus}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单员工" prop="name">
      </el-table-column>
      <el-table-column label="退单审批">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">同意</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">撤回</el-button>
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
          tableData5: [{
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333',
            payStatus:'已支付'
          }, {
            id: '12987123',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10323',
            payStatus:'未支付'
          }, {
            id: '12987125',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10334',
            payStatus:'已支付'
          }, {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333',
            payStatus:'未支付'
          }]

        }
      },
      methods:{
        /*筛选条件*/
        filterHandler(value, row,column){
          const property = column['property'];
          return row[property] === value;
        },
        handleEdit(index, row) {
          this.$confirm('此操作将同意顾客退单, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          }).then(() => {
            this.$message({showClose: true, message: '退单成功', type: 'success'});
          }).catch(() => {
            this.$message({type: 'info', message: '已取消退单'});
          });
          console.log(index, row);
        },
        handleDelete(index, row) {
          this.$confirm('此操作将撤销顾客的退单申请, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          }).then(() => {
            this.$message({type: 'success', message: '撤销成功!'});
          }).catch(() => {
            this.$message({type: 'info', message: '已取消撤销'});
          });
          console.log(index, row);
        }
      }
    }
</script>

<style scoped>

</style>
