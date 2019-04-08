<template>
  <div class="foodManage" v-loading ="loading">
    <div style="height: 100px;text-align: center">
      <!--查询工具条-->
      <el-col :span="24" class="" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="search" size="medium" placeholder="请输入菜品名搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSearchSubmit">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-dialog title="新增菜品" :visible.sync="dialogVisible" width="40%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="菜品名" prop="fName">
            <el-input v-model="ruleForm.fName"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="fPrice">
            <el-input  v-model.number="ruleForm.fPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜品描述" prop="fDesc">
            <el-input type="textarea" v-model="ruleForm.fDesc"></el-input>
          </el-form-item>

          <el-form-item  label="菜品类型" prop="mId">
            <el-select  placeholder="请选择菜品类型" v-model="ruleForm.mId">
              <el-option
                v-for="item in menuTypeArry"
                :key="item.mType"
                :label="item.mType"
                :value="item.mId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜品状态" prop="fStatus">
            <el-select v-model="ruleForm.fStatus" placeholder="请选择菜品状态">
              <el-option label="正常" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐" prop="fIsrecommend">
            <el-select v-model="ruleForm.fIsrecommend" placeholder="是否推荐菜品">
              <el-option label="正常" value="0"></el-option>
              <el-option label="推荐" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label='' prop="" >
            <el-upload  class="" action=""
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :file-list="addformd.fileList"
                        :limit='1'
                        list-type="picture"
                        :show-file-list="showfilelist"
                        :on-exceed="handleExceed"
                        :http-request="fnUploadRequest">
              <el-button size="small" type="primary" style="position: absolute;left: -40%;top:50%">上传图片</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>
    <div class="search" v-show="isSearch">
      <el-row>
        <el-col :span="5" v-for="(item,key,index) in food" :key="index"  :offset="1">
          <el-card shadow="hover" style="width: 100%;text-align: center;height: 400px;position: relative" >
            <img :src="item.fPic" class="image" width="100%">
            <div>
              <span style="font-size: 20px;font-weight: bolder">{{item.fName}}</span>
              <el-input type="textarea" :value="item.fDesc" disabled style="font-weight: bolder;color: black;"></el-input>
              <!--
                            <div style="margin-top: 10px;overflow: scroll;">{{item.fDesc}}</div>
              -->
              <div class="bottom clearfix" style="position: absolute;left: 15%;bottom: 5%;">
                <div >价格：
                  <span style="color: red;font-size: 18px;font-weight: bold">￥{{item.fPrice}}</span>
                </div>
                <el-button type="info" round size="mini" :value="item.fId" >修改</el-button>
                <el-button type="danger" round size="mini" :value="item.fId" >删除</el-button>
              </div>
            </div>
          </el-card>
          <div style="width: 20px;height: 20px"></div>
        </el-col>
      </el-row>
    </div>

    <div class="main" v-show="!isSearch">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部菜品" name="全部菜品" id="0">
          <el-tabs :tab-position="tabPosition" style="height: 500px;overflow: scroll">
            <el-tab-pane label="上架" >
              <el-row>
                <el-col :span="6" v-for="(item,key,index) in food" :key="index"  :offset="1" v-if="item.fStatus ==0">
                  <el-card shadow="hover" style="width: 100%;text-align: center;height: 400px;position: relative" >
                    <img :src="item.fPic" class="image" width="100%">
                    <div>
                      <span style="font-size: 20px;font-weight: bolder">{{item.fName}}</span>
                      <el-input type="textarea" :value="item.fDesc" disabled style="font-weight: bolder;color: black;"></el-input>
                      <div class="bottom clearfix" style="position: absolute;left: 15%;bottom: 5%;">
                        <div >价格：
                          <span style="color: red;font-size: 18px;font-weight: bold">￥{{item.fPrice}}</span>
                        </div>
                        <el-button type="info" round size="mini" :value="item.fId" @click="toUpdateFood(item)">修改</el-button>
                        <el-button type="danger" round size="mini" :value="item.fId" @click="toDeleteFood(item)">删除</el-button>
                      </div>
                    </div>
                  </el-card>
                  <div style="width: 20px;height: 20px"></div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="下架">
              <el-row>
                <el-col :span="6" v-for="(item,key,index) in food" :key="index"  :offset="1" v-if="item.fStatus ==1">
                  <el-card shadow="hover" style="width: 100%;text-align: center;height: 400px;position: relative" >
                    <img :src="item.fPic" class="image" width="100%">
                    <div>
                      <span style="font-size: 20px;font-weight: bolder">{{item.fName}}</span>
                      <el-input type="textarea" :value="item.fDesc" disabled style="font-weight: bolder;color: black;"></el-input>
                      <div class="bottom clearfix" style="position: absolute;left: 15%;bottom: 5%;">
                        <div >价格：
                          <span style="color: red;font-size: 18px;font-weight: bold">￥{{item.fPrice}}</span>
                        </div>
                        <el-button type="info" round size="mini" :value="item.fId" @click="toUpdateFood(item)">修改</el-button>
                        <el-button type="danger" round size="mini" :value="item.fId" @click="toDeleteFood(item)">删除</el-button>
                      </div>
                    </div>
                  </el-card>
                  <div style="width: 20px;height: 20px"></div>
                </el-col>
              </el-row>
            </el-tab-pane>

          </el-tabs>

        </el-tab-pane>
        <el-tab-pane  v-for="item in menuTypeArry" :key="item.mType"
                     :label="item.mType"
                      :id = "item.mId"
                     :name="item.mType">
          <el-tabs :tab-position="tabPosition" style="height: 500px;overflow: scroll">
            <el-tab-pane label="上架" >
              <el-row>
                <el-col :span="6" v-for="(item,key,index) in food" :key="index"  :offset="1" v-if="item.fStatus ==0">
                  <el-card shadow="hover" style="width: 100%;text-align: center;height: 400px;position: relative" >
                    <img :src="item.fPic" class="image" width="100%">
                    <div>
                      <span style="font-size: 20px;font-weight: bolder">{{item.fName}}</span>
                      <el-input type="textarea" :value="item.fDesc" disabled style="font-weight: bolder;color: black;"></el-input>
                      <div class="bottom clearfix" style="position: absolute;left: 15%;bottom: 5%;">
                        <div >价格：
                          <span style="color: red;font-size: 18px;font-weight: bold">￥{{item.fPrice}}</span>
                        </div>
                        <el-button type="info" round size="mini" :value="item.fId" @click="toUpdateFood(item)">修改</el-button>
                        <el-button type="danger" round size="mini" :value="item.fId" @click="toDeleteFood(item)">删除</el-button>
                      </div>
                    </div>
                  </el-card>
                  <div style="width: 20px;height: 20px"></div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="下架">
              <el-row>
                <el-col :span="6" v-for="(item,key,index) in food" :key="index"  :offset="1" v-if="item.fStatus ==1">
                  <el-card shadow="hover" style="width: 100%;text-align: center;height: 400px;position: relative" >
                    <img :src="item.fPic" class="image" width="100%">
                    <div>
                      <span style="font-size: 20px;font-weight: bolder">{{item.fName}}</span>
                      <el-input type="textarea" :value="item.fDesc" disabled style="font-weight: bolder;color: black;"></el-input>
                      <div class="bottom clearfix" style="position: absolute;left: 15%;bottom: 5%;">
                        <div >价格：
                          <span style="color: red;font-size: 18px;font-weight: bold">￥{{item.fPrice}}</span>
                        </div>
                        <el-button type="info" round size="mini" :value="item.fId" @click="toUpdateFood(item)">修改</el-button>
                        <el-button type="danger" round size="mini" :value="item.fId" @click="toDeleteFood(item)">删除</el-button>
                      </div>
                    </div>
                  </el-card>
                  <div style="width: 20px;height: 20px"></div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="修改菜品" :visible.sync="updateDialog" width="40%">
        <el-form :model="updateruleForm" :rules="rules" ref="updateruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="菜品名" prop="fName">
            <el-input v-model="updateruleForm.fName"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="fPrice">
            <el-input  v-model.number="updateruleForm.fPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜品描述" prop="fDesc">
            <el-input type="textarea" v-model="updateruleForm.fDesc"></el-input>
          </el-form-item>

          <el-form-item  label="菜品类型" prop="mId">
            <el-select  placeholder="请选择菜品类型" v-model="updateruleForm.mId">
              <el-option
                v-for="item in menuTypeArry"
                :key="item.mType"
                :label="item.mType"
                :value="item.mId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜品状态" prop="fStatus">
            <el-select v-model="updateruleForm.fStatus" placeholder="请选择菜品状态">
              <el-option label="正常" value="0"></el-option>
              <el-option label="下架" value="1"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐" prop="fIsrecommend">
            <el-select v-model="updateruleForm.fIsrecommend" placeholder="是否推荐菜品">
              <el-option label="正常" value="0"></el-option>
              <el-option label="推荐" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label='' prop="" >
            <el-upload  class="" action=""
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :file-list="addformd.fileList"
                        :limit='1'
                        list-type="picture"
                        :show-file-list="showfilelist"
                        :on-exceed="handleExceed"
                        :http-request="fnUploadRequest">
              <el-button size="small" type="primary" style="position: absolute;left: -40%;top:50%">上传图片</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitupdateForm('updateruleForm')">修改</el-button>
            <el-button @click="closeForm()">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>
  </div>
</template>

<script>
  import OSS from 'ali-oss';
  import { Client } from '../../../common/util/common.js';
  import {getOnlyNum} from '../../../common/util/getRandom.js'
  export default {
    name: 'foodManage',
    data() {
      return {
        loading:true,
        search:'',
        isSearch:false,
        dialogVisible: false, // 新增弹出框
        updateDialog: false, // 修改弹出框
        activeName: '全部菜品',
        tabPosition: 'left',
        addformd:{
          delOBJ:[],
          fileList:[]
        },
        fileList:[],
        showfilelist: true,
        menuType:{},  // 发送到后台交换数据
        menuTypeArry:[],  //获取后台数据
        food:{},
        ruleForm: {
          mId:"",
          fNum:"",
          fName: "",
          fPrice: "",
          fDesc: "",
          fPic: "",
          fStatus:"",
          fIsrecommend:"",

        },
        updateruleForm: {
          mId:"",
          fId:"",
          fNum:"",
          fName: "",
          fPrice: "",
          fDesc: "",
          fPic: "",
          fStatus:"",
          fIsrecommend:"",
        },
        rules: {
          mId: [
            { required: true, message: '请选择菜品类型', trigger: 'change' }
          ],
          fName: [
            { required: true, message: '请输入菜品名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          fPrice: [
            { required: true, message: '请输入价格'},
            { type: 'number', message: '价格必须为数字值'}
          ],
          menuType: [
            { required: true, message: '请选择菜品类型', trigger: 'change' }
          ],
          fDesc: [
            { required: true, message: '请输入菜品描述', trigger: 'blur' },
            { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
          ],
          fStatus: [
            { required: true, message: '请选择菜品状态', trigger: 'change' }
          ],
          fIsrecommend: [
            { required: true, message: '请选择是否推荐', trigger: 'change' }
          ]
        },
      }
    },
    methods: {
      onSearchSubmit(){
        if(this.search.length==0){
          this.food ={}
          this.getFood()
          this.isSearch = false
        }else{
          this.food ={}
          let foodName = {"fName":this.search}
          this.LikequeryFood(JSON.parse(JSON.stringify(foodName)))
          this.isSearch = true
        }
      },
      handleAdd(){
        this.getMenu()
        this.ruleForm.fPic =""
        this.dialogVisible = true
      },
      /*导航栏*/
      handleClick(tab, event) {
        if(tab.$el.id == 0)
        {
          this.food ={}
          this.getFood()
        }else{
          this.food = { "mId": tab.$el.id}
          this.getFood()
        }
      },
      toUpdateFood(food){
        this.updateDialog =true
        //console.log(food)
        this.updateruleForm.mId = food.mId,
        this.updateruleForm.fId = food.fId,
        this.updateruleForm.fNum= food.fNum,
        this.updateruleForm.fName= food.fName,
        this.updateruleForm.fPrice= food.fPrice,
        this.updateruleForm.fDesc= food.fDesc,
        this.updateruleForm.fPic= food.fPic
        this.updateruleForm.fIsrecommend= String(food.fIsrecommend)
        this.updateruleForm.fStatus= String(food.fStatus)
        let fileList ={name: food.fName,url:food.fPic}
        this.addformd.fileList.push(fileList)
        //console.log(this.updateruleForm)
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
            this.$notify.success("修改成功")
            this.updateDialog =false
          }
        }).catch(function (error)
        {
          console.log(error)
        })
      },
      toDeleteFood(food){
        this.$confirm('此操作将永久删除该菜品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delFood ={"fId":food.fId}
          this.deleteFood(delFood)
          this.food = {}
          setTimeout(() => {this.getFood()},1000)
          this.$notify.success("删除成功");
        }).catch(() => {
          this.$notify.success("已取消删除");
        });
      },
      submitupdateForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateFood(this.updateruleForm)
            this.$refs[formName].resetFields();
            var addformd ={ delOBJ:[], fileList:[]}
            this.addformd = addformd
            this.food = {}
            setTimeout(() => {this.getFood()},1000)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*随机编号*/
            this.ruleForm.fNum = getOnlyNum("F")
            if(this.ruleForm.fPic==''){
              this.$notify.info('请上传图片!');
              return false;
            }
            this.addFood()
            this.$refs[formName].resetFields();
            var addformd ={ delOBJ:[], fileList:[]}
            this.addformd = addformd

            this.$router.push("/adminPage/foodManage")

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      closeForm(){
        this.updateDialog =false
      },
      handleRemove(file, fileList) {
        let client = Client.NewOSS();
        try {
          this.addformd.delOBJ = [];
          this.addformd.delOBJ.push(file.pathName);
          for(let i = 0; i < this.addformd.fileList.length; i++) {
            if(this.addformd.fileList[i] == file) {
              this.addformd.fileList.splice(i, 1);
            }
          }
        } catch(e) {
          console.log(e);
        }
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`图片类型只能上传1个`);
      },
      fnUploadRequest: function(val) {
        let _this = this;
        console.log(val,'val')
        let file = val.file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        // 文件base64化，以便获知图片原始尺寸
        reader.onload = function(event) {
          let baseData = event.target.result;
          let p = {};
          p.base64 = baseData.split(',')[1];
          p.fileType = baseData.split(';')[0].split(':')[1];
          p.name = file.name;
          let list = file.name.split('.');
          p.extensionName = list[list.length - 1];
          _this.uploadOSS(p);
        };
      },
      uploadOSS(data) {
        this.$notify.info("上传中....请稍等！！！！")
        let _this = this;
        let base64 = data.base64;
        let fileType = data.fileType;
        let fileName = data.name;
        let blob = this.toBlob(base64, fileType);
        let reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = function(event) {
          // 配置客户端服务器
          let client = Client.NewOSS();
          // 文件名按时间+文件名
          let date = new Date();
          let yyyymm = '' + date.getFullYear() + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));
          let storeAs = 'pic/food_picture/' + fileName;
          // 将数组Buffer转为普通Buffer
          var buffer = new OSS.Buffer(event.target.result);
          // put方法上传图片
          client.put(storeAs, buffer).then(function(result) {
            /*获得url地址*/
            data.url = result.url;
            console.log("result.url:"+result.url)
            _this.ruleForm.fPic = result.url;
            _this.updateruleForm.fPic = result.url;
            data.pathName = result.name;
            _this.addformd.fileList.push(data);
            _this.$notify.success("上传成功")
            //console.log(_this.addformd.fileList,"我到这里了")
          }).catch(function(err) {
            console.log(err);
          });
        }
      },
      toBlob: function(urlData, fileType) {
        let bytes = window.atob(urlData),
          n = bytes.length,
          u8arr = new Uint8Array(n);
        while(n--) {
          u8arr[n] = bytes.charCodeAt(n);
        }
        return new Blob([u8arr], {
          //type: fileType
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
          this.loading = false
          console.log(JSON.stringify(this.menuType));
          //console.log(res.data.data[0].pType);
          if(res.data.data.length>0){
            var menuType = JSON.parse(JSON.stringify(res.data.data));
            this.menuTypeArry = menuType
            console.log(this.menuType)
          }else{
            this.$notify.info("插入失败")
          }
        }).catch(function (error)
        {
          console.log(error)
          this.loading = false
          this.$notify.info("插入失败："+error)
        })
      },
      addFood(){
        this.loading = true
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/insertFood",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(this.ruleForm)
        }).then((res)=>{
          console.log(JSON.stringify(this.ruleForm));
          //console.log(res.data.data[0].pType);
          this.loading = false
          this.$notify.info("添加成功")
          this.dialogVisible = false
          this.food ={}
          this.getFood()

        }).catch(function (error)
        {
          this.loading = false
          this.$notify.info("添加失败")
          console.log(error)
        })
      },
      getFood(){
        this.loading = true
        let that = this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/queryFoodAndMenu",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(this.food)
        }).then((res)=>{
          //console.log(res.data.data[0].pType);
          that.loading = false
          that.food = res.data.data
        }).catch(function (error)
        {
          console.log(error)
          //that.$notify.info("加载数据失败")
          that.loading = false
        })
      },
      LikequeryFood(foodName){
        this.loading = true
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/FoodAndMenu/LikequeryFood",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(foodName)
        }).then((res)=>{
          //console.log(res.data.data[0].pType);
          this.loading = false
          this.food = res.data.data
          this.$notify.info(res.data.data)
        }).catch(function (error)
        {
          this.loading = false
          console.log(error)
        })
      },
      deleteFood(food){
        let that =this
        this.$axios({
          method:"post",
          url:that.COMMON.backUrl+"orderSystem/FoodAndMenu/deleteFood",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(food)
        }).then((res)=>{
          //console.log(res.data.data[0].pType);
          that.loading = false
          that.food = res.data.data
          that.$notify.info(res.data.data)
        }).catch(function (error)
        {
          that.loading = false
          console.log(error)
        })
      },

    },
    mounted() {
      this.getMenu()
      this.getFood()
    },
    watch:{
      updateDialog(newV,oldV){
        if(newV == false){
          this.addformd.fileList=[]
        }
      }
    }
  }
</script>

<style>

</style>
