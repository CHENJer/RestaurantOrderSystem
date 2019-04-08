<template>
  <div class="userManage">
    <!--查询工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="search" size="medium" placeholder="请输入姓名搜索"></el-input>
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
        @sort-change:后端排序 highlight-current-row tooltip-effect="dark"  @current-change="handleCurrentChange"  @selection-change="handleSelectionChange"
    -->
    <el-table ref="multipleTable" v-loading="listLoading"
              :data="tableDatas" stripe style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}">
     <!-- <el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="uName" label="姓名" width="100" ></el-table-column>
      <el-table-column  label="性别" width="80" sortable>
        <template slot-scope="scope" >
          <el-tag type="success" v-if="scope.row.uSex == 0">
            男
          </el-tag>
          <el-tag type="danger" v-else>
            女
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column property="uPhonenum" label="电话号码" width="150" ></el-table-column>
      <el-table-column property="uAddress" label="家庭住址" width="150" ></el-table-column>
      <el-table-column property="uDesc" label="备注" width="150" ></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--批量删除工具条-->
   <!-- <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">批量删除</el-button>
    </el-col>-->

    <!--新增界面
      Form表单验证：1.rules属性传入验证规则
                   2.prop属性设置需要校验的字段名
    -->
    <el-dialog title="新增员工"  :visible.sync="addFormVisible">
        <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm" >
        <el-form-item label="姓名" prop="uName" >
          <el-input v-model="addForm.uName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="uSex">
          <el-radio-group v-model="addForm.uSex">
            <el-radio class="radio" :label="0">男</el-radio>
            <el-radio class="radio" :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码" prop="uPhonenum">
          <el-input type="tel" placeholder="请输入11位电话号码" v-model="addForm.uPhonenum"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="uAddress">
          <el-input type="textarea" placeholder="请输入家庭住址" v-model="addForm.uAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="uDesc">
          <el-input type="textarea" placeholder="请输入备注" v-model="addForm.uDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit('addForm')" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑员工信息"  :visible.sync="eidtFormVisible">
      <el-form :model="editForm" label-width="120px" :rules="addFormRules" ref="editForm" >
        <el-form-item label="姓名" prop="uName" >
          <el-input v-model="editForm.uName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="uSex">
          <el-radio-group v-model="editForm.uSex">
            <el-radio class="radio" :label="0">男</el-radio>
            <el-radio class="radio" :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码" prop="uPhonenum">
          <el-input type="tel" placeholder="请输入11位电话号码" v-model="editForm.uPhonenum"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="uAddress">
          <el-input type="textarea" placeholder="请输入家庭住址" v-model="editForm.uAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="uDesc">
          <el-input type="textarea" placeholder="请输入备注" v-model="editForm.uDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="eidtFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit('editForm')" >提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  import {getOnlyNum} from '../../../common/util/getRandom.js'
  import {isvalidPhone} from '../../../common/util/validate'
  var validPhone=(rule, value,callback)=>{
    if (!value){
      callback(new Error('请输入电话号码'))
    }else  if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码'))
    }else {
      callback()
    }
  }
  export default {
    name: "foodType",
    data(){
      return {
        getRandom:'',
        multipleSelection: [],//列表选中列
        listLoading: false,
        addFormVisible: false,//新增界面是否显示
        eidtFormVisible: false,//编辑界面是否显示
        addLoading: false,    //新增页面加载
        chooseFoodTypeState: "选择状态",  //新增页面选择状态
        user:{},
        search: '', //查询功能
        addFormRules: {
          uName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 0 到 16 个字符', trigger: 'blur' }
          ],
          uSex: [
            { required: true, message: '请选择性别', trigger: 'chang' }
          ],
          uPhonenum: [
            { required: true, validator: validPhone  },
          ],
          uAddress: [
            {  message: '请选择输入100个字以内的地址', trigger: 'blur' },
            { min: 0, max: 100, message: '长度最大为100个字符', trigger: 'blur' }
          ],
          uDesc: [
            {  message: '请选择输入100个字以内的描述', trigger: 'blur' },
            { min: 0, max: 100, message: '长度最大为100个字符', trigger: 'blur' }
          ],
        },
        //新增界面数据
        addForm: {
          uNum: '',  //编号
          uName: '',//名字
          uSex:'' , //性别
          uPhonenum:'',
          uAddress:'',
          uDesc:'',
        },
        editForm:{
          uId:'',
          uNum: '',  //编号
          uName: '',//名字
          uSex:'' , //性别
          uPhonenum:'',
          uAddress:'',
          uDesc:'',
        },
        tableDatas:[],  // 绑定的表格数据
        menuType:{},
        currentRow: null
      }
    },
    /*页面渲染后*/
    mounted:function(){
      this.getUser(this.user);
    },

    methods: {
      /*搜索*/
      onSearchSubmit(){
        if(this.search ==''){
          let user = {}
          this.getUser(user)
        }else{
          let user = {"uName":this.search}
          this.likequeryUser(user)
        }
      },
      likequeryUser(user) {
        /* then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定。所以用变量来代替*/
        var that = this;
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/LikequeryUser",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(user)
        }).then((res)=>{
         // console.log(res.data.data)
          var user = JSON.parse(JSON.stringify(res.data.data));
          this.tableDatas = user
        }).catch(function (error)
        {
          console.log(error)
        })
      },
      getUser(user){
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/queryUser",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(user)
        }).then((res)=>{
          this.listLoading = false
          //console.log(res.data.data[0].pType);
          if(res.data.data.length>0){
            console.log(res.data.data)
            var user = JSON.parse(JSON.stringify(res.data.data));
            this.tableDatas = user
            console.log(this.tableDatas)
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
      insertUser(user){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/insertUser",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(user)
        }).then((res)=>{
          that.listLoading = false
          //console.log(res.data.data[0].pType);
          that.listLoading = false
          that.$notify.info("添加成功")

        }).catch(function (error)
        {
          console.log(error)
          that.listLoading = false
          that.$notify.info("添加失败："+error)
        })
      },
      updateUser(user){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/updateUser",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(user)
        }).then((res)=>{

          that.$notify.success("更新成功")

        }).catch(function (error)
        {
          console.log(error)
          that.$notify.info("更新失败："+error)
        })
      },
      deleteUser(user){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/delUser",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(user)
        }).then((res)=>{

          that.$notify.info("更新成功")

        }).catch(function (error)
        {
          console.log(error)
          that.$notify.info("更新失败："+error)
        })
      },
      /*编辑*/
      handleEdit(index, row) {
        console.log(index, row);
        this.editForm = row
        this.eidtFormVisible = true
        console.log(this.editForm);
      },

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
      /*删除*/
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确认删除选中记录吗？', '提示', {type: 'warning'
        }).then(() => {
          let users = []
          users.push(row.uId)
          this.deleteUser(users)
          this.eidtFormVisible = false;
          this.user = {}
          setTimeout(() => {this.getUser(this.user);},1000)
        }).catch(() => {
            this.$notify.info("取消删除")
        });
      },
      //批量删除
      batchRemove: function () {
        var foodIds = this.multipleSelection.map(item => item.foodId).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = {foodIds: ids};
        }).catch(() => {
          this.listLoading = false;
        });
      },
      //显示新增界面 格式化日期
      handleAdd: function () {
        this.addFormVisible = true;
      },

      //新增提交
      addSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.addForm)
              this.addForm.uNum = getOnlyNum("U")
              this.insertUser(this.addForm)
              this.user = {}
              setTimeout(() => {this.getUser(this.user);},1000)
              this.addFormVisible = false;
            });
          }
        });
      },
      editSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {

              this.updateUser(this.editForm)
              this.user = {}
              setTimeout(() => {this.getUser(this.user);},1000)
              this.eidtFormVisible = false;
            });
          }
        });
      }
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
