<template>
  <div class="permissionAssignment">
    <!--查询工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="search" size="medium" placeholder="请输入姓名搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchSubmit">查询</el-button>
        </el-form-item>
        <!--<el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>-->
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

      <el-table-column  label="职位" width="100" >
        <template slot-scope="scope" >
          <el-tag type="warning" v-if="scope.row.pType == null">
            暂无
          </el-tag>
          <el-tag type="success" v-if="scope.row.pType == '管理员'">
            {{scope.row.pType}}
          </el-tag>
          <el-tag type="info" v-if="scope.row.pType == '前台员工'">
            {{scope.row.pType}}
          </el-tag>
          <el-tag v-if="scope.row.pType == '厨房员工'">
            {{scope.row.pType}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column property="aUsername" label="账号" width="150" >
        <template slot-scope="scope" >
          <span v-if="scope.row.aUsername != null">
            {{scope.row.aUsername}}
          </span>
          <span type="warning" v-else-if="scope.row.aUsername == null">
            暂无
          </span>

        </template>

      </el-table-column>
      <el-table-column  label="账号状态" width="100" >
        <template slot-scope="scope" >
          <el-tag type="success" v-if="scope.row.aStatus == 0">
            正常
          </el-tag>
          <el-tag type="warning" v-else-if="scope.row.aStatus == null">
            暂无
          </el-tag>
          <el-tag type="danger" v-else>
            停用
          </el-tag>
        </template>

      </el-table-column>
      <el-table-column  label="账号创建时间" width="150" >
        <template slot-scope="scope" >
          <span v-if="scope.row.aCreatetime == null">
            暂无
          </span>
          <span type="danger" v-else-if="scope.row.aCreatetime != null">
            {{scope.row.aCreatetime}}
          </span>

        </template>

      </el-table-column>

      <el-table-column label="操作" width="180">

        <template slot-scope="scope" >
          <template v-if="scope.row.pType != null">
            <el-button size="mini" round type="danger" @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
          </template>
          <template  v-if="scope.row.pType == null">
            <el-button size="mini" round type="success" @click="handleAdd(scope.$index, scope.row)">分配权限</el-button>
          </template>

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
    <el-dialog title="分配权限"  :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm" >
        <el-form-item label="账号名" prop="aUsername" >
          <el-input v-model="addForm.aUsername" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="aPassword" >
          <el-input type="password" v-model="addForm.aPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkAPassword" >
          <el-input type="password" v-model="addForm.checkAPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="pId">
          <el-radio-group v-model="addForm.pId">
            <el-radio class="radio" :label="1000">前台员工</el-radio>
            <el-radio class="radio" :label="1001">厨房员工</el-radio>
            <el-radio class="radio" :label="1002">管理员</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit('addForm')" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑权限"  :visible.sync="eidtFormVisible">
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm" >
        <el-form-item label="账号名" prop="aUsername" >
          <el-input v-model="editForm.aUsername" auto-complete="off"></el-input>
        </el-form-item>
        <div v-show="isChangePwd">
          <el-form-item label="密码" prop="aPassword" >
            <el-input type="password" v-model="editForm.aPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkAPassword" >
            <el-input type="password" v-model="editForm.checkAPassword" auto-complete="off"></el-input>
          </el-form-item>
        </div>
          <el-form-item label="账号状态" prop="fStatus">
          <el-select v-model="editForm.aStatus" placeholder="请选择菜品状态">
            <el-option label="正常" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="pId">
          <el-radio-group v-model="editForm.pId">
            <el-radio class="radio" :label="1000">前台员工</el-radio>
            <el-radio class="radio" :label="1001">厨房员工</el-radio>
            <el-radio class="radio" :label="1002">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" @click="isChangePwd=!isChangePwd">修改密码</el-button>
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
        isChangePwd:false,
        getRandom:'',
        multipleSelection: [],//列表选中列
        listLoading: false,
        addFormVisible: false,//新增界面是否显示
        eidtFormVisible: false,//编辑界面是否显示
        addLoading: false,    //新增页面加载
        chooseFoodTypeState: "选择状态",  //新增页面选择状态
        user:{},
        userInfo:{},
        search: '', //查询功能
        addFormRules: {
          aUsername: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
          ],
          aPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          checkAPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min:4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          pId: [
            { required: true, message: '请选择职位', trigger: 'chang' }
          ],

        },
        editFormRules: {
          aUsername: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
          ],
          aPassword: [
            { required: false, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          checkAPassword: [
            { required: false, message: '请输入密码', trigger: 'blur' },
            { min:4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          pId: [
            { required: true, message: '请选择职位', trigger: 'chang' }
          ],

        },

        //新增界面数据
        addForm: {
          uId:'',
          aNum:'',
          aUsername:'',
          aPassword:'',
          checkAPassword:'',
          pId:''
        },

        editForm:{
          uId:'',
          aId:'',
          aNum:'',
          aUsername:'',
          aPassword:'',
          aStatus:'',
          checkAPassword:'',
          pId:''
        },
        account:{},
        tableDatas:[],  // 绑定的表格数据
        menuType:{},
        currentRow: null
      }
    },
    /*页面渲染后*/
    mounted:function(){
      this.getUserInfo()
    },
    methods: {
      /*搜索*/
      onSearchSubmit(){
        if(this.search ==''){
          this.getUserInfo()
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
      getUserInfo(){
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/queryUsers",
          headers:{
            'Content-type': 'application/json'
          },
          data: {}
        }).then((res)=>{
          this.listLoading = false
          //console.log(res.data.data[0].pType);
          if(res.data.data.length>0){
            var user = JSON.parse(JSON.stringify(res.data.data));
            this.tableDatas = user
           // console.log(this.tableDatas)
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
      getAccount(Account){
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/queryAccount",
          headers:{
            'Content-type': 'application/json'
          },
          data:  JSON.stringify(Account)
        }).then((res)=>{
          //console.log(res.data.data[0].pType);
          this.account = res.data.data

        }).catch(function (error)
        {
          console.log(error)
        })
      },
      insertAccount(Account){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/insertAccount",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(Account)
        }).then((res)=>{

          that.$notify.info("添加成功")

        }).catch(function (error)
        {
          console.log(error)
          that.$notify.info("添加失败："+error)
        })
      },
      updateAccount(Account){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/UserInfo/updateAccount",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(Account)
        }).then((res)=>{

          that.$notify.success("更新成功")

        }).catch(function (error)
        {
          console.log(error)
          that.$notify.info("更新失败："+error)
        })
      },
      /*编辑*/
      handleEdit(index, row) {
       // console.log(index, row);
        this.editForm.aUsername = row.aUsername
        this.editForm.pId = row.pId
        this.editForm.aStatus = String(row.aStatus)
        this.editForm.aId = row.aId
        this.editForm.uId = row.uId
        this.eidtFormVisible = true
        console.log(this.editForm);
        console.log(row);
      },


      //显示新增界面
      handleAdd: function (index , row) {
        this.addFormVisible = true;
        this.addForm.uId = row.uId
        //console.log(row)
      },

      //新增提交
      addSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.addForm.aPassword != this.addForm.checkAPassword){
              this.$notify.error("两次密码输入不一致")
            }else{
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
               // console.log(this.addForm)
                this.addForm.aNum = getOnlyNum("A")
                let aNum = this.addForm.aNum
                let account = {
                  "aNum":this.addForm.aNum,
                  "aUsername":this.addForm.aUsername,
                  "aPassword":this.addForm.aPassword,
                  "aStatus":0,
                }
                let chcekaccount = {"aUsername":this.addForm.aUsername}
                this.getAccount(chcekaccount)
                /*console.log("check")*/

             /*   setTimeout(() => {
                  console.log(this.account)
                  console.log(this.account.length ==1 )
                  console.log(typeof this.account == undefined)
                },1000)*/
                setTimeout(() => {
                  if(this.account.length !=1){
                    this.insertAccount(account)
                    setTimeout(() => {
                      let account = {"aNum":aNum}
                      this.getAccount(account)
                    },1000)
                    setTimeout(() => {
                      let user = {"uId":this.addForm.uId,"aId":this.account[0].aId,"pId":this.addForm.pId}
                      this.updateUser(user)
                    },2000)
                    setTimeout(() => {
                      this.getUserInfo()
                    },2000)
                    this.addFormVisible = false;
                  }else{
                    this.$notify.error("存在相同名字的账户名，请重新输入")
                  }
                },1000)



              });
            }

          }
        });
      },
      editSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isChangePwd == true){
                if(this.editForm.aPassword.length == 0 || this.editForm.checkAPassword.length ==0){
                  this.$notify.error("开启修改密码时，密码不能为空")
                }else if(this.editForm.aPassword != this.editForm.checkAPassword){
                  this.$notify.error("两次输入的密码不一致")
                }else {
                  let account ={
                    "aId":this.editForm.aId,
                    "aUsername":this.editForm.aUsername,
                    "aPassword":this.editForm.aPassword,
                    "aStatus":this.editForm.aStatus
                  }
                  this.updateAccount(account)
                  setTimeout(() => {
                    let user = {"uId":this.editForm.uId,"pId":this.editForm.pId}
                    this.updateUser(user)
                  },1000)
                  setTimeout(() => {this.getUserInfo();},1000)
                  this.eidtFormVisible = false;
                }
            }else if(this.isChangePwd == false){
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                let account ={
                  "aId":this.editForm.aId,
                  "aUsername":this.editForm.aUsername,
                  "aStatus":this.editForm.aStatus
                }
                this.updateAccount(account)
                setTimeout(() => {
                  let user = {"uId":this.editForm.uId,"pId":this.editForm.pId}
                  this.updateUser(user)
                  },1000)
                setTimeout(() => {this.getUserInfo();},1000)
                this.eidtFormVisible = false;
              });
            }

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
