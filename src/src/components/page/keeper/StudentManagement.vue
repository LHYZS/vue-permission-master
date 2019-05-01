<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i> 学生列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-input v-model="select_name" placeholder="姓名" class="handle-input mr10"></el-input>
        <el-input v-model="select_object" placeholder="专业" class="handle-input mr10"></el-input>
        <el-input v-model="select_class" placeholder="班级" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" icon="search" @click="search">新增学生</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="order" label="序号" sortable width="150">
        </el-table-column>
        <el-table-column prop="id" label="学号" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="sex" label="性别" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="age" label="年龄" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="major" label="专业" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="class" label="班级" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="addTime" label="添加时间" :formatter="formatter">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>

    <!--编辑弹出框-->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="学号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.object"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.class"></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
          <el-input v-model="form.addTime"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveEdit">确 定</el-button>
    </span>
    </el-dialog>

    <!--删除提示框-->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="delVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteRow">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            'order': '1',
            'id': '1601',
            'name': '赵静',
            'sex': '女',
            'age': '20',
            'object': '软件工程',
            'class': '软件11',
            'addTime': '2019-4-23'
          }, {
            'order': '1',
            'id': '1601',
            'name': '赵静',
            'sex': '女',
            'age': '20',
            'object': '软件工程',
            'class': '软件11',
            'addTime': '2019-4-23'
          }
        ],
        cur_page: 1,
        multipleSelection: [],
        select_name: '',
        select_teacher: '',
        del_list: [],
        is_search: false,
        editVisible: false,
        delVisible: false,
        form: {
          'id': '',
          'name': '',
          'sex': '',
          'age': '',
          'object': '',
          'class': '',
          'addTime': ''
        },
        idx: -1
      }
    }
  }

  //   created() {
  //     this.getData()
  // },
  //
  //   computed: {
  //     data() {
  //       return this.tableData.filter((d) => {
  //         let is_del = false
  //         for (let i = 0; i < this.del_list.length; i++) {
  //           if (d.name === this.del_list[i].name) {
  //             is_del = true
  //             break
  //           }
  //         }
  //         if (!is_del) {
  //           if (d.address.indexOf(this.select_cate) > -1 &&
  //             (d.name.indexOf(this.select_word) > -1 ||
  //               d.address.indexOf(this.select_word) > -1)
  //           ) {
  //             return d
  //           }
  //         }
  //       })
  //     }
  //   },
  //   methods: {
  //   // 分页导航
  //     handleCurrentChange(val) {
  //       this.cur_page = val
  //       this.getData()
  //     },
  //     // 获取 easy-mock 的模拟数据
  //     getData() {
  //     // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
  //       if (process.env.NODE_ENV === 'development') {
  //         this.url = '/ms/table/list'
  //       }
  //       this.$axios.post(this.url, {
  //         page: this.cur_page
  //       }).then((res) => {
  //         this.tableData = res.data.list
  //       })
  //     },
  //     search() {
  //       this.is_search = true
  //     },
  //     formatter(row, column) {
  //       return row.teacher
  //     },
  //     formatter(row, column) {
  //       return row.classNumber
  //     },
  //     formatter(row, column) {
  //       return row.studentNumber
  //     },
  //     formatter(row, column) {
  //       return row.classHour
  //     },
  //     filterTag(value, row) {
  //       return row.tag === value
  //     },
  //     handleEdit(index, row) {
  //       this.idx = index
  //       const item = this.tableData[index]
  //       this.form = {
  //         name: item.name,
  //         sex: item.sex,
  //         age: item.age,
  //         object: item.object,
  //         class: item.class,
  //         addTime: item.addTime
  //       }
  //       this.editVisible = true
  //     },
  //     handleDelete(index, row) {
  //       this.idx = index
  //       this.delVisible = true
  //     },
  //     delAll() {
  //       const length = this.multipleSelection.length
  //       let str = ''
  //       this.del_list = this.del_list.concat(this.multipleSelection)
  //       for (let i = 0; i < length; i++) {
  //         str += this.multipleSelection[i].name + ' '
  //       }
  //       this.$message.error('删除了' + str)
  //       this.multipleSelection = []
  //     },
  //     handleSelectionChange(val) {
  //       this.multipleSelection = val
  //     },
  //     // 保存编辑
  //     saveEdit() {
  //       this.$set(this.tableData, this.idx, this.form)
  //       this.editVisible = false
  //       this.$message.success(`修改第 ${this.idx + 1} 行成功`)
  //     },
  //     // 确定删除
  //     deleteRow() {
  //       this.tableData.splice(this.idx, 1)
  //       this.$message.success('删除成功')
  //       this.delVisible = false
  //     }
//   }
// }

</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .del-dialog-cnt {
    font-size: 16px;
    text-align: center
  }
</style>

