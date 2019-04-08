<template>
  <div class="noticeList">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询公告">
          <el-input v-model="noticeTitle" placeholder="请输入公告的标题或内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="NoticeForm" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              height="500" stripe style="width: 100%;">
      <!--<el-table-column type="selection" width="55">
      </el-table-column>-->
      <el-table-column prop="nId" label="#" width="60" sortable>
      </el-table-column>
      <el-table-column prop="nTitle" label="公告标题" width="110">
      </el-table-column>
      <el-table-column  label="公告状态" width="110">
        <template slot-scope="scope" >
          <el-tag type="success" v-if="scope.row.nStatus == 1">
            生效
          </el-tag>
          <el-tag type="danger" v-else>
            过期
          </el-tag>
        </template>

      </el-table-column>
      <el-table-column prop="nCreatime" label="创建时间" width="160" sortable>
      </el-table-column>
     <!-- <el-table-column prop="nUpdatetime" label="更新时间" width="180" sortable>
      </el-table-column>-->
      <el-table-column prop="nEndtime" label="到期时间" width="160" sortable>
      </el-table-column>
      <el-table-column prop="nDesc" label="公告内容" min-width="250"  show-overflow-tooltip>
      </el-table-column>
      <!--<el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-if="nStatus=1">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <!--工具条-->
  <!--  <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
     &lt;!&ndash; <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"  style="float:right;">
      </el-pagination>&ndash;&gt;
    </el-col>-->

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" style="font-size: 16px"  ref="editForm">
        <el-form-item label="公告标题" prop="name">
          <el-input v-model="editForm.nTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告状态">
          <el-radio-group v-model="editForm.nStatus">
            <el-radio class="radio" :label="1">结束</el-radio>
            <el-radio class="radio" :label="0">发布</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="到期时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.nEndtime"></el-date-picker>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="editForm.nDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    export default {
      name: "noticeList",
      data() {
        return {
          noticeTitle:'',
          notices: [],
          listLoading: false,
          sels: [],//列表选中列
          editFormVisible: false,//编辑界面是否显示
          editLoading: false,
          //编辑界面数据
          editForm: {},
          Notice:{},
          NoticeForm:[],
        }
      },
      methods: {
        onSubmit() {
          if(this.noticeTitle =='' || this.noticeTitle==null ){
            this.Notice = {}
            this.getNotice()
          }else {
            let notice = {"nTitle":this.noticeTitle,"nDesc":this.noticeTitle}
            this.LikequeryNotice(notice)
          }
          console.log('submit!');
        },
        filterHandler(value, row,column){
          const property = column['property'];
          console.log(row[property])
          return row[property] === value;
        },
        //显示编辑界面
        handleEdit: function (index, row) {
          console.log(index, row);
          this.editFormVisible = true;
          this.editForm = row
          this.editForm = Object.assign({}, row);
        },
        handleDelete:function(index, row){
          console.log(index, row);
        },
        //编辑
        editSubmit: function () {
          this.$refs.editForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.editLoading = true;
                //NProgress.start();
                let para = Object.assign({}, this.editForm);
                para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                editUser(para).then((res) => {
                  this.editLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;

                });
              });
            }
          });
        },
        selsChange: function (sels) {
          this.sels = sels;
        },
        //批量删除
        batchRemove: function () {
          var ids = this.sels.map(item => item.id).toString();
          this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.listLoading = true;
            //NProgress.start();
            let para = { ids: ids };
            batchRemoveUser(para).then((res) => {
              this.listLoading = false;
              //NProgress.done();
              this.$message({
                message: '删除成功',
                type: 'success'
              });

            });
          }).catch(() => {

          });
        },
        getNotice(){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Notice/queryNotice",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(this.Notice)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            this.NoticeForm = res.data.data
            //console.log(this.Notice[0].nDesc);
          }).catch(function (error)
          {
            console.log(error)
          })
        },
        LikequeryNotice(notice){
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/Notice/LikequeryNotice",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(notice)
          }).then((res)=>{
            //console.log(res.data.data[0].pType);
            this.NoticeForm = res.data.data
            //console.log(this.Notice[0].nDesc);
          }).catch(function (error)
          {
            console.log(error)
          })
        }

      },
      mounted(){
        this.getNotice()
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
</style>
