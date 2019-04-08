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
          @sort-change:后端排序  @current-change="handleCurrentChange"  @selection-change="handleSelectionChange"
      -->
      <el-table ref="multipleTable" v-loading="listLoading"  highlight-current-row tooltip-effect="dark"
                :data="tableDatas" stripe
                stripe  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="mType" label="菜品类型" width="80" ></el-table-column>
        <el-table-column property="mCreatetime" label="创建时间" width="150" sortable></el-table-column>
        <el-table-column property="mUpdatetime" label="更新时间" width="150" sortable></el-table-column>
        <el-table-column label="分类状态" width="80">
          <template slot-scope="scope" >
            <el-tag type="success" v-if="scope.row.mStatue == 0">
              上架
            </el-tag>
            <el-tag type="danger" v-else>
              下架
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="mDesc" label="分类描述" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini"  type="danger" @click="handleEdit(scope.$index, scope.row)">配置</el-button>
            <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <!--新增界面
        Form表单验证：1.rules属性传入验证规则
                     2.prop属性设置需要校验的字段名
      -->
      <el-dialog title="新增菜单"  :visible.sync="addFormVisible">
        <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm" >
          <el-form-item label="菜单名称" prop="mType">
            <el-input v-model="addForm.mType" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="创建时间">
            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="addcreatetime" disabled></el-date-picker>
          </el-form-item>-->
          <el-form-item label="类型状态" prop="mStatue">
            <el-select v-model="addForm.mStatue" placeholder="请选择菜品状态">
              <el-option label="上架" value="0"></el-option>
              <el-option label="下架" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类描述">
            <el-input type="textarea" :rows="6" placeholder="请输入分类描述" v-model="addForm.mDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit('addForm')" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑菜单"  :visible.sync="editFormVisible">
        <el-form :model="editForm" label-width="120px" :rules="addFormRules" ref="editForm" >
          <el-form-item label="菜单名称" prop="mType">
            <el-input v-model="editForm.mType" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="创建时间">
            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="addcreatetime" disabled></el-date-picker>
          </el-form-item>-->
          <el-form-item label="类型状态" prop="mStatue">
            <el-select v-model="editForm.mStatue" placeholder="请选择菜品状态">
              <el-option label="上架" value="0"></el-option>
              <el-option label="下架" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类描述">
            <el-input type="textarea" :rows="6" placeholder="请输入分类描述" v-model="editForm.mDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit('editForm')" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import moment from 'moment'
  import {getOnlyNum} from '../../../common/util/getRandom.js'
    export default {
      name: "foodType",
      data(){
        return {
          getRandom:'',
          multipleSelection: [],//列表选中列
          listLoading: false,
          addFormVisible: false,//新增界面是否显示
          editFormVisible: false,//新增界面是否显示
          addLoading: false,    //新增页面加载
          search: '', //查询功能
          addFormRules: {
            mType: [
              { required: true, message: '请输入菜品类型', trigger: 'blur' },
              { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            ],
            mStatue: [
              { required: true, message: '请选择状态', trigger: 'change' }
            ]
          },
          //新增界面数据
          addForm: {
            mNum:'',
            mType: '',    //新增菜品类型
            mStatue: '',//新增菜品类型状态
            mDesc:''  //新增类型描述
          },
          //编辑界面数据
          editForm: {
            mId:'',
            mNum:'',
            mType: '',    //新增菜品类型
            mStatue: '',//新增菜品类型状态
            mDesc:''  //新增类型描述
          },
          food:"",
          tableDatas:[],  // 绑定的表格数据
          menuType:{},
          currentRow: null
        }
      },
      /*页面渲染时*/
      created:function(){

        this.getMenu();

      },

      methods: {
        /*搜索*/
        onSearchSubmit() {
          console.log('submit!');
          /* then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定。所以用变量来代替*/
          let menu = {"mType": this.search}
          this.getLikeMenu(menu)
        },
        /*编辑*/
        handleEdit(index, row) {
          this.editFormVisible = true
          this.editForm = row
          this.editForm.mStatue = String(row.mStatue)
        },
        /*删除*/
        handleDelete(index, row) {
          console.log(index, row);
        },

        //显示新增界面 格式化日期
        handleAdd: function () {
          this.addFormVisible = true;

        },
        //新增提交
        addSubmit: function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.addForm.mNum = getOnlyNum('F')
                this.addMenu(this.addForm)
                this.editFormVisible = false;
                setTimeout(()=>{
                  this.getMenu()
                },1000)

              });
            }
          });
        },
        //编辑提交
        editSubmit: function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm('上下架会改变菜单下的菜品状态，确认提交吗？', '提示', {}).then(() => {
                let food = {"mId":this.editForm.mId}
                this.getFood(food)
                setTimeout(()=>{
                  if(this.editForm.mStatue == "0"){
                    for (let index in this.food){
                      console.log(index)
                      let food = {"fId":this.food[index].fId,"fStatus":0}
                      this.updateFood(food)
                    }
                  }else if(this.editForm.mStatue == "1"){
                    for (let index in this.food){
                      console.log(index)
                      let food = {"fId":this.food[index].fId,"fStatus":1}
                      this.updateFood(food)
                    }
                  }
                  this.updateMenu(this.editForm)
                  setTimeout(()=>{
                    this.getMenu()
                  },1000)
                  this.editFormVisible = false
                },2000)



              });
            }
          });
        },
        getMenu(){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/queryMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(this.menuType)
          }).then((res)=>{
            this.listLoading = false
            //console.log(res.data.data[0].pType);
            if(res.data.data.length>0){
              //console.log(res.data.data)
              var menuType = JSON.parse(JSON.stringify(res.data.data));
              this.tableDatas = menuType
              //console.log(this.tableDatas)
            }else{
              this.$notify.info("查询失败")
            }
          }).catch(function (error)
          {
            console.log(error)
            this.listLoading = false
            this.$notify.info("查询失败："+error)
          })
        },
        getLikeMenu(Menu){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/LikequeryMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(Menu)
          }).then((res)=>{
            this.listLoading = false
            //console.log(res.data.data[0].pType);
            if(res.data.data.length>0){
              //console.log(res.data.data)
              var menuType = JSON.parse(JSON.stringify(res.data.data));
              this.tableDatas = menuType
            }else{
              this.$notify.info("查询失败")
            }
          }).catch(function (error)
          {
            console.log(error)
            this.listLoading = false
            this.$notify.info("查询失败："+error)
          })
        },
        addMenu(menu){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/insertMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(menu)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
              this.$notify.success("添加菜单成功")
          }).catch(function (error)
          {
            console.log(error)
            this.$notify.error("添加菜单失败")
          })
        },
        updateMenu(menu){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/updateMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(menu)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            this.$notify.success("更新菜单成功")
          }).catch(function (error)
          {
            console.log(error)
            this.$notify.error("更新菜单失败")
          })
        },
        updateFood(food){
          let that = this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/updateFood",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(food)
          }).then((res)=>{
            console.log(res.data);
            if(res.data.code == 20000){
              //this.$notify.success("修改成功")
            }
          }).catch(function (error)
          {
            this.$notify.error("修改失败")
            console.log(error)
          })
        },
        getFood(food){
          this.food = {}
          let that = this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/queryFoodAndMenu",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(food)
          }).then((res)=>{
            that.food = res.data.data
           // console.log(that.food);
          }).catch(function (error)
          {
            console.log(error)
            that.$notify.info("加载数据失败")
          })
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
