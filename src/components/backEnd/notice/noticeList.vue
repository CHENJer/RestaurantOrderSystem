<template>
  <div class="noticeList">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查询公告">
          <el-input v-model="noticeTitle" placeholder="请输入公告的标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="notices" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="公告标题" width="120" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="公告状态" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="创建时间" width="130" sortable>
      </el-table-column>
      <el-table-column prop="age" label="更新时间" width="130" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="到期时间" width="130" sortable>
      </el-table-column>
      <el-table-column prop="addr" label="公告内容" min-width="250" sortable show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template>
          <el-button size="small" @click="handleEdit()">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel()">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
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
          editForm: {
            id: 0,
            name: '',
            sex: -1,
            age: 0,
            birth: '',
            addr: ''
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        //显示编辑界面
        handleEdit: function (index, row) {
          this.editFormVisible = true;
          this.editForm = Object.assign({}, row);
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
    background-color: beige;
    width: 97%;
  }
</style>
