<template>
  <div class="user-view">
    <div class="toolbar">
      <span class="toolbar-label">用户名</span>
      <el-input
        v-model="keyword"
        placeholder="用户名"
        class="toolbar-input"
      ></el-input>
      <el-button type="primary" @click="handleSearch">查询用户</el-button>
      <el-button type="success" @click="handleAdd">添加用户</el-button>
    </div>

    <el-table :data="pagedData" style="width: 100%">
      <el-table-column label="日期" width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="cell-date">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="240">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="password" label="密码" width="240"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pager"
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :page-size="pageSize"
      :current-page.sync="currentPage"
    ></el-pagination>

    <el-dialog title="新用户" :visible.sync="dialogVisible" width="420px">
      <el-form :model="form" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="初始密码">
          <el-input v-model="form.password" type="password" placeholder="请输入初始密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirm" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  data () {
    return {
      keyword: '',
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      form: {
        name: '',
        password: '',
        confirm: ''
      },
      tableData: [
        { date: '2026-09-28', name: '陈嘉宁', password: 'cjn@2026' },
        { date: '2026-09-25', name: '李思远', password: 'lsy#0925' },
        { date: '2026-09-21', name: '王雨桐', password: 'wyt2026!' },
        { date: '2026-09-18', name: '张浩然', password: 'zhr@0918' },
        { date: '2026-09-15', name: '刘子涵', password: 'lzh#2026' },
        { date: '2026-09-12', name: '赵欣怡', password: 'zxy2026@' },
        { date: '2026-09-09', name: '周铭轩', password: 'zmx!0909' },
        { date: '2026-09-06', name: '吴静雯', password: 'wjw#2026' },
        { date: '2026-09-02', name: '郑凯文', password: 'zkw@0902' },
        { date: '2026-08-29', name: '孙悦然', password: 'syr2026#' },
        { date: '2026-08-26', name: '徐若彤', password: 'xrt!0826' },
        { date: '2026-08-22', name: '何俊杰', password: 'hjj#2026' },
        { date: '2026-08-19', name: '黄梓萱', password: 'hzx@0819' },
        { date: '2026-08-15', name: '马晨曦', password: 'mcx2026!' },
        { date: '2026-08-11', name: '林瑾瑜', password: 'ljy#0811' },
        { date: '2026-08-07', name: '高以宁', password: 'gyn2026@' }
      ]
    }
  },
  computed: {
    pagedData () {
      const start = (this.currentPage - 1) * this.pageSize
      return this.tableData.slice(start, start + this.pageSize)
    }
  },
  methods: {
    handleSearch () {
      this.$message.success('查询用户：' + (this.keyword || '全部'))
    },
    handleAdd () {
      this.form = { name: '', password: '', confirm: '' }
      this.dialogVisible = true
    },
    handleEdit (row) {
      this.form = { name: row.name, password: row.password, confirm: '' }
      this.dialogVisible = true
    },
    handleDelete (row) {
      this.$confirm('确认删除用户「' + row.name + '」吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('已删除')
        })
        .catch(() => {})
    },
    handleConfirm () {
      this.dialogVisible = false
      this.$message.success('保存成功')
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

.toolbar-label {
  margin-right: 10px;
  font-size: 14px;
}

.toolbar-input {
  width: 200px;
  margin-right: 16px;
}

.cell-date {
  margin-left: 8px;
}

.pager {
  margin-top: 18px;
}
</style>
