<template>
  <div class="orderRecord">
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
      <el-table-column label="下单时间" prop="name" sortable :filters="[{text: '2019-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                       :filter-method="filterHandler">
      </el-table-column>
      <el-table-column label="完成时间" prop="name" sortable>
      </el-table-column>
      <el-table-column label="座位编号" prop="shopId">
      </el-table-column>
      <el-table-column label="订单总额" prop="shopId" sortable>
      </el-table-column>
      <el-table-column label="订单状态" prop="shopId">
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
    </el-table>

  </div>
</template>

<script>
  export default {
    name: "orderRecord",
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
          payStatus:'未支付'
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
      filterHandler(value, row,column){
        const property = column['property'];
        return row[property] === value;
      }
    }
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
