<template>
  <div class="question-view">
    <div class="toolbar">
      <span class="toolbar-label">题目</span>
      <el-input
        v-model="keyword"
        placeholder="题目关键词"
        class="toolbar-input"
      ></el-input>
      <el-button type="success" @click="handleSearch">查询题目</el-button>
      <el-button type="success" @click="handleAdd">添加题目</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="question" label="问题" width="180"></el-table-column>
      <el-table-column prop="options" label="选项" width="200"></el-table-column>
      <el-table-column prop="answer" label="答案" width="120"></el-table-column>
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
      :total="1000"
      :page-size="10"
      :current-page.sync="currentPage"
    ></el-pagination>

    <el-dialog title="题目" :visible.sync="dialogVisible" width="420px">
      <el-form :model="form" label-position="top">
        <el-form-item label="问题内容">
          <el-input v-model="form.question"></el-input>
        </el-form-item>
        <el-form-item label="选项A:">
          <el-input v-model="form.optionA"></el-input>
        </el-form-item>
        <el-form-item label="选项B:">
          <el-input v-model="form.optionB"></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="form.optionC"></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="form.optionD"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="form.answer"></el-input>
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
  name: 'QuestionView',
  data () {
    return {
      keyword: '',
      currentPage: 1,
      dialogVisible: false,
      form: {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: ''
      },
      tableData: [
        { id: 1, question: '法国的首都是什么？', options: '巴黎,巴黎,巴黎,巴黎', answer: '巴黎' },
        { id: 1, question: '法国的首都是什么？', options: '巴黎,巴黎,巴黎,巴黎', answer: '巴黎' },
        { id: 1, question: '法国的首都是什么？', options: '巴黎,巴黎,巴黎,巴黎', answer: '巴黎' },
        { id: 1, question: '法国的首都是什么？', options: '巴黎,巴黎,巴黎,巴黎', answer: '巴黎' },
        { id: 1, question: '法国的首都是什么？', options: '巴黎,巴黎,巴黎,巴黎', answer: '巴黎' }
      ]
    }
  },
  methods: {
    handleSearch () {
      this.$message.success('查询题目：' + (this.keyword || '全部'))
    },
    handleAdd () {
      this.form = {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: ''
      }
      this.dialogVisible = true
    },
    handleEdit (row) {
      this.form = {
        question: row.question,
        optionA: row.options.split(',')[0],
        optionB: row.options.split(',')[1],
        optionC: row.options.split(',')[2],
        optionD: row.options.split(',')[3],
        answer: row.answer
      }
      this.dialogVisible = true
    },
    handleDelete (row) {
      this.$confirm('确认删除题目「' + row.question + '」吗？', '提示', {
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

.pager {
  margin-top: 18px;
}
</style>
