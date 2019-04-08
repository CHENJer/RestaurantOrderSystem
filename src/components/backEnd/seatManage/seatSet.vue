<template>
  <div class="seatSet">
    <div class="table" style="margin-top: 20px">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" style="width: 8px;height: 5px" @click="seatSearch(0)"></el-button>
          <span style="margin-top: 0px;margin-left: 5px">全部</span>
          <el-button type="success" style="width: 8px;height: 5px" @click="seatSearch(1)"></el-button>
          <span style="margin-top: 0px;margin-left: 5px">空闲</span>
          <el-button type="danger" style="width: 8px;height: 5px" @click="seatSearch(2)"></el-button>
          <span style="margin-top: 0px;margin-left: 5px">占用</span>
          <el-button type="danger"  round @click="addTable()"
                     style="position: absolute;right: 10%;top:8%;font-weight: bolder">
            添加餐桌
          </el-button>
        </el-col>
      </el-row>

      <div style="color: black;font-size: 25px;margin: 10px">
        {{tableName}}
      </div>

      <el-row style="margin-top: 30px;height: 700px;" id="seatView" >
        <el-col :span="5" v-for="(item, index) in tables" :key="index" :offset="2">
          <el-card class="box-card" style="width: 100%">
            <template v-if="item.tStatus == 0 ">
              <el-tooltip :content='item.tDesc' placement="top">
                <el-button type="success" style="height: 70px;width: 100%;font-size: 18px;position: relative" @click="chang(index)">
                  <span>{{item.tNum}}号桌</span>
                  <div style="font-size: 14px;position: absolute;bottom: 10%;left: 40%">
                    <div v-if="item.tSeattype ==0">
                      小桌
                    </div>
                    <div v-if="item.tSeattype ==1">
                      中桌
                    </div>
                    <div v-if="item.tSeattype ==2">
                      大桌
                    </div>
                  </div>
                </el-button>
              </el-tooltip>

            </template>
            <template v-if="item.tStatus == 1 ">
              <el-tooltip :content='item.tDesc' placement="top">
                <el-button type="danger" style="height: 70px;width: 100%;font-size: 18px;position: relative" @click="chang(index)">
                <span>{{item.tNum}}号桌</span>
                <div style="font-size: 14px;position: absolute;bottom: 10%;left: 40%">
                  <div v-if="item.tSeattype == 0">
                    小桌
                  </div>
                  <div v-if="item.tSeattype ==1">
                    中桌
                  </div>
                  <div v-if="item.tSeattype ==2">
                    大桌
                  </div>
                </div>
              </el-button>
              </el-tooltip>
            </template>
          </el-card>
          <div style="width: 20px;height: 20px"></div>
        </el-col>
      </el-row>

      <el-dialog title="新增餐桌"  :visible.sync="addFormVisible">
        <el-form :model="addForm" label-width="120px" :rules="editFormRules" ref="addForm" >
          <el-form-item label="桌子号" prop="tNum" >
            <el-input v-model="addForm.tNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="桌子类型" prop="tSeattype">
            <el-select v-model="addForm.tSeattype" placeholder="请选择餐桌类型">
              <el-option label="小桌" value="0"></el-option>
              <el-option label="中桌" value="1"></el-option>
              <el-option label="大桌" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="桌子状态" prop="tStatus">
            <el-radio-group v-model="addForm.tStatus">
              <el-radio class="radio" :label="0">空闲</el-radio>
              <el-radio class="radio" :label="1">占用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="桌子描述" prop="tDesc" >
            <el-input type="textarea" v-model="addForm.tDesc" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="eidtFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addSubmit('addForm')" >提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑餐桌"  :visible.sync="eidtFormVisible">
        <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm" >
          <el-form-item label="桌子号" prop="tNum" >
            <el-input v-model="editForm.tNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="桌子类型" prop="tSeattype">
            <el-select v-model="editForm.tSeattype" placeholder="请选择菜品状态">
              <el-option label="小桌" value="0"></el-option>
              <el-option label="中桌" value="1"></el-option>
              <el-option label="大桌" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="桌子状态" prop="tStatus">
            <el-radio-group v-model="editForm.tStatus">
              <el-radio class="radio" :label="0">空闲</el-radio>
              <el-radio class="radio" :label="1">占用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="桌子描述" prop="tDesc" >
            <el-input type="textarea" v-model="editForm.tDesc" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="eidtFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editSubmit('editForm')" >提交</el-button>
        </div>
      </el-dialog>


    </div>
  </div>
</template>

<script>
  import {getOnlyNum} from '../../../common/util/getRandom.js'
  export default {
    name: "tableView",
    data(){
      return{
        tables:{},
        tableName:'全部',
        addFormVisible:false,
        eidtFormVisible:false,
        editFormRules:{
          tNum: [
            { required: true, message: '桌子号', trigger: 'blur' },
            { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
          ],
          tSeattype: [
            { required: true, message: '请选择桌子类型', trigger: 'chang' }
          ],
          tStatus: [
            { required: true, message: '请选择桌子状态', trigger: 'chang' }
          ],
          tDesc: [
            { required: false, message: '桌子描述', trigger: 'blur' },
            { min: 1, max: 4, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
        },
        addForm:{
          tId:'',
          tNum:'',
          tSeattype:'',
          tStatus:'',
          tDesc:'',
        },
        editForm:{
          tId:'',
          tNum:'',
          tSeattype:'',
          tStatus:'',
          tDesc:'',
        },
      }
    },
    mounted(){
      let table = {}
      this.getTables(table)
    },
    methods:{
      seatSearch(status){
        if(status== 0){
          this.tableName = "全部"
         // this.$notify.info("0")
          let table = {}
          this.getTables(table)
        }else if(status== 1){
          this.tableName = "空闲"
          let table = {"tStatus":0}
          this.getTables(table)
         // this.$notify.info("1")
        }else if(status== 2){
          this.tableName = "占用"
          let table = {"tStatus":1}
          this.getTables(table)
          //this.$notify.info("2")
        }
      },
      chang(index){
        this.editForm = this.tables[index]
        this.editForm.tSeattype = String(this.tables[index].tSeattype)
       console.log(this.editForm)
        this.eidtFormVisible = true
      },
      addSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$notify.info("添加中，请稍等...")
            this.insertTable(this.addForm)

            setTimeout(()=>{
              let table = {"tNum":this.addForm.tNum}
              this.getTables(table)
            },1000)
            setTimeout(()=>{
              //console.log("tables")
              //console.log(this.tables)
              let table = this.tables[0].tId
              let seatA ={"tId":table,"sNum":getOnlyNum('S'),"sSeatnum":'A',"sStatus":0}
              let seatB ={"tId":table,"sNum":getOnlyNum('S'),"sSeatnum":'B',"sStatus":0}
              let seatC ={"tId":table,"sNum":getOnlyNum('S'),"sSeatnum":'C',"sStatus":0}
              let seatD ={"tId":table,"sNum":getOnlyNum('S'),"sSeatnum":'D',"sStatus":0}
              this.insertSeat(seatA)
              this.insertSeat(seatB)
              this.insertSeat(seatC)
              this.insertSeat(seatD)
            },2000)
            setTimeout(()=>{
              let tables = {}
              this.getTables(tables)
              this.$notify.success("添加成功")
              this.addFormVisible = false

            },3000)

          } else {
            return false;
          }
        });
      },
      editSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateTable(this.editForm)
            this.eidtFormVisible = false
          } else {
            return false;
          }
        });
      },
      addTable(){
        this.addFormVisible = true
      },
      getTables(table){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/TableAndMenu/queryTable",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(table)
        }).then((res)=>{
          that.tables = res.data.data
          console.log(that.tables)
        }).catch(function (error)
        {
          console.log(error)
        })
      },
      insertTable(table){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/TableAndMenu/insertTable",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(table)
        }).then((res)=>{

        }).catch(function (error)
        {
          console.log(error)
        })
      },
      updateTable(table){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/TableAndMenu/updateTable",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(table)
        }).then((res)=>{
          that.$notify.success("更新成功")
          setTimeout(()=>{
            let tables = {}
            that.getTables(tables)
          },1000)
        }).catch(function (error)
        {
          console.log(error)
        })
      },
      insertSeat(seat){
        let that =this
        this.$axios({
          method:"post",
          url:this.COMMON.backUrl+"orderSystem/TableAndMenu/insertSeats",
          headers:{
            'Content-type': 'application/json'
          },
          data: JSON.stringify(seat)
        }).then((res)=>{

        }).catch(function (error)
        {
          console.log(error)
        })
      },
    }
  }
</script>

<style scoped>

</style>
