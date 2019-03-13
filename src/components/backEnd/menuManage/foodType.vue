<template>
    <div class="foodType">
      <!--查询工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="search" size="medium" placeholder="请输入类型或状态搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--highlight-current-row：单选
          current-change事件 ： 管理选中时触发的事件，它会传入currentRow，oldCurrentRow
          selection-change事件：多选
          slice(): 方法可从已有的数组中返回选定的元素。
          sortable: 实现以该列为基准的排序
          @sort-change:后端排序
      -->
      <el-table ref="multipleTable" v-loading="listLoading"  highlight-current-row tooltip-effect="dark"
                :data="tableDatas" stripe @current-change="handleCurrentChange"  @selection-change="handleSelectionChange"
                @sort-change = "handleSortChange"
                stripe  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="foodType" label="菜品类型" width="120" sortable="custom"></el-table-column>
        <el-table-column property="foodCreateTime" label="创建时间" width="120" sortable="custom"></el-table-column>
        <el-table-column property="foodUpdate" label="更新时间" width="120" sortable="custom"></el-table-column>
        <el-table-column property="foodTypeState" label="分类状态" width="120"></el-table-column>
        <el-table-column property="foodTypeDesc" label="分类描述" width="250"></el-table-column>
        <el-table-column label="操作" width="180">
         <!-- <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="width:70%;float:left;"/>
            <el-button type="primary" size="mini" @click="handleAdd" >新增</el-button>
          </template>-->
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--批量删除工具条-->
      <el-col :span="24" class="toolbar">
          <el-button type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">批量删除</el-button>
        <!--   layout (表示需要显示的内容)：prev表示上一页，next为下一页，pager表示页码列表
                                          jumper表示跳页元素，total表示总条目数，size用于设置每页显示的页码数量。
               background : 添加背景颜色
        -->
          <el-pagination  background @size-change="handleSizeChange" @current-change="PageChange" :current-page.sync="currentPage"
                         :page-size="pagesize" layout="total, sizes,prev, pager, next, jumper" :total="total" style="float:right;margin-top: 10px">
          </el-pagination>


      </el-col>

      <!--新增界面
        Form表单验证：1.rules属性传入验证规则
                     2.prop属性设置需要校验的字段名
      -->
      <el-dialog title="新增" v-model="addFormVisible" :visible.sync="addFormVisible">
        <el-form :model="addForm" label-width="150px" :rules="addFormRules" ref="addForm" >
          <el-form-item label="菜品类型" prop="addFoodType">
            <el-input v-model="addForm.addFoodType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="addcreatetime" disabled></el-date-picker>
          </el-form-item>
          <el-form-item label="类型状态" prop="addFoodTypeState">
            <el-dropdown size="medium" split-button type="primary" @command="handleCommand">
              {{chooseFoodTypeState}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">隐藏</el-dropdown-item>
                <el-dropdown-item command="1">发布</el-dropdown-item>
                <el-dropdown-item command="2">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item label="分类描述">
            <el-input type="textarea" :rows="6" placeholder="请输入分类描述" v-model="addForm.addfoodTypeDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  import moment from 'moment'
  import {randomNum} from '../../../common/util/getRandom.js'
    export default {
      name: "foodType",
      data(){
        return {
          getRandom:'',
          total: 100,    // 分页 数据总数
          pagesize: 10,  // 分页 每页数据条数
          currentPage: 1,  // 分页 当前页
          multipleSelection: [],//列表选中列
          listLoading: false,
          addFormVisible: false,//新增界面是否显示
          addLoading: false,    //新增页面加载
          chooseFoodTypeState: "选择状态",  //新增页面选择状态
          addcreatetime: new Date(),
          search: '', //查询功能
          addFormRules: {
            addFoodType: [
              { required: true, message: '请输入菜品类型', trigger: 'blur' }
            ],
            addFoodTypeState: [
              { required: true, message: '请选择状态', trigger: 'blur' }
            ]
          },
          //新增界面数据
          addForm: {
            addFoodType: '',    //新增菜品类型
            addcreatetime: '',  //新增时间
            addFoodTypeState: '',//新增菜品类型状态
            addfoodTypeDesc:''  //新增类型描述
          },
          tableDatas:[],  // 绑定的表格数据
          tableData: [{
            foodId:'1',
            foodType: '啦啦',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好'
            }, {
            foodId:'2',
            foodType: '5',
            foodCreateTime: '2014-05-02',
            foodUpdate: '2017-05-02',
            foodTypeState: '下架',
            foodTypeDesc: '这个不好'
          }, {
            foodId:'3',
            foodType: '32',
            foodCreateTime: '2015-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '删除',
            foodTypeDesc: '这个好aaaaaaaaaaaaaaaaaaa的速度速度速度速度速度速度课外读物i的肯定还是开会打瞌睡宽度根深蒂固少见多怪'
          }, {
            foodId:'4',
            foodType: '啦啦',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2018-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好'
          }, {
            foodId:'4',
            foodType: '4',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好'
          }, {
            foodId:'4',
            foodType: '4',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好'
          }, {
            foodId:'4',
            foodType: '4',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好eeeeeeee'
          }, {
            foodId:'4',
            foodType: '4',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2019-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好'
          }, {
            foodId:'4',
            foodType: '啦啦',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好wwwwwww'
          }, {
            foodId:'4',
            foodType: '4',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好'
          }, {
            foodId:'4',
            foodType: '4',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好ddddddddd'
          }, {
            foodId:'4',
            foodType: '4',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好'
          }, {
            foodId:'4',
            foodType: '4',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好aaaaaaaaa'
          }, {
            foodId:'4',
            foodType: '啦啦',
            foodCreateTime: '2016-05-02',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好'
          }, {
            foodId:'4',
            foodType: '啦啦啦end',
            foodCreateTime: '2019-09-09',
            foodUpdate: '2016-05-02',
            foodTypeState: '在售',
            foodTypeDesc: '这个好end'
          }

          ],
          currentRow: null
        }
      },
      /*页面渲染时*/
      created:function(){
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.listLoading = false
        this.fetchData();
        /*页面渲染时初始化分页数据数量*/
        this.total=this.tableData.length;
        console.log(randomNum(18))
      },
      beforeMount:function() {
      },

      methods: {
        /*搜索*/
        onSearchSubmit() {
          console.log('submit!');
          /* then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定。所以用变量来代替*/
          var vueGet = this;
          this.$axios({
            method:"post",
            url:"http://192.168.43.139:8080/orderSystem/SystemManager/qrcodeimg?tableNum=3A121",
           /* headers:{
              'Content-type': 'application/json'
            },*/
            data:{
              tableData: JSON.stringify(this.tableData)
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then((res)=>{
            console.log(res.data);
          })
            .catch(function (error)
          {
            console.log(error)
          })
        },
        fetchData(){ //获取数据
          /* then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定。所以用变量来代替*/
          var vueGet = this;
          console.log('当前页'+this.currentPage+"  每页数目"+this.pagesize);
          this.$axios.get(this.COMMON.backUrl+'/orderSystem/SystemManager/qrcodeimg')
            .then(function (res)
            {
              // vuedate.total = res.body.count;
              // vuedate.currentPage = res.body.curr;
              // vuedate.tableData = res.body.data;
              vueGet.listLoading = false
              vueGet.total = vueGet.tableData.length;
              // vuedate.currentPage = res.body.curr;
              vueGet.tableDatas = vueGet.tableData.slice((vueGet.currentPage-1)*vueGet.pagesize,vueGet.currentPage*vueGet.pagesize)
              // alert(vuedate.total+vuedate.tableDatas)

            })
            .catch(function (error)
            {
              this.listLoading = false
              console.log(error)
            })
        },
        /*后端排序
        *  column：当前列
        *  prop：当前列需要排序的数据
        *  order：排序的规则（ascending升序、descending降序和null默认[默认就是没排序]）
        * */
        handleSortChange(column, prop, order){
          console.log(column, prop, order)
        },
        /*分页每页条数*/
        handleSizeChange(val) {
          this.pagesize = val;
          this.currentPage = 1;
          this.fetchData(1, val);
          console.log(`每页 ${val} 条`);
        },
        /*分页 当前页*/
        PageChange(val){
          this.currentPage = val;
          this.fetchData(val, this.pageSize);
          // console.log(`当前页: ${val}`);
        },
        /*单选*/
        handleCurrentChange(val) {
          this.currentRow = val;
          console.log("单选")
          console.log(this.currentRow) //可以获取点击的对象的数据
        },
        /*多选*/
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log("多选")
          console.log(this.multipleSelection)
        },
        /*编辑*/
        handleEdit(index, row) {
          console.log(index, row);
        },
        /*删除*/
        handleDelete(index, row) {
          console.log(index, row);
        },
        //批量删除
        batchRemove: function () {
          var foodIds = this.multipleSelection.map(item => item.foodId).toString();
          this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.listLoading = true;
            //NProgress.start();
            let para = {foodIds: ids};
            /*batchRemoveUser(para).then((res) => {
              this.listLoading = false;
              //NProgress.done();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getUsers();
            });*/
          }).catch(() => {
            this.listLoading = false;
          });
        },
        //显示新增界面 格式化日期
        handleAdd: function () {
          this.addFormVisible = true;
          this.addcreatetime = moment(this.addcreatetime).format('YYYY-MM-DD HH:mm:ss')
          this.addForm.addcreatetime = this.addcreatetime
          // alert(this.addcreatetime)
        },
        //新增选择项
        handleCommand(command) {
          console.log(command)
          // alert('click on item ' + command);
          this.addForm.addFoodTypeState = command
          if(command == 0){
            this.chooseFoodTypeState = "隐藏"
          }else if(command == 1){
            this.chooseFoodTypeState = "发布"
          }else if(command == 2){
            this.chooseFoodTypeState = "删除"
          }

        },
        //新增提交
        addSubmit: function () {
          this.$refs.addForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.addLoading = true;
                console.log(this.addForm)
                //NProgress.start();
               /* let para = Object.assign({}, this.addForm);
                para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');*/
              /*  addUser(para).then((res) => {
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['addForm'].resetFields();
                  this.addFormVisible = false;
                });*/
              });
            }
          });
        },
      }

    }
</script>

<style>
  .content-wrapper{
    margin-top: 10px;
    margin-left: 10px;
    padding-top: 20px;
    padding-left: 20px;
    background-color: beige;
    width: 97%;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
