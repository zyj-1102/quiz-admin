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

    <el-table :data="pagedData" style="width: 100%">
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
      :total="tableData.length"
      :page-size="pageSize"
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
      pageSize: 10,
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
        { id: 1, question: '法国的首都是什么？', options: '巴黎,里昂,马赛,尼斯', answer: '巴黎' },
        { id: 2, question: '下列哪条河流最长？', options: '尼罗河,亚马逊河,长江,密西西比河', answer: '尼罗河' },
        { id: 3, question: 'Vue 中用于循环渲染的指令是？', options: 'v-if,v-for,v-model,v-bind', answer: 'v-for' },
        { id: 4, question: 'HTTP 状态码 404 表示什么？', options: '请求成功,资源不存在,服务器内部错误,永久重定向', answer: '资源不存在' },
        { id: 5, question: '《红楼梦》的作者是谁？', options: '罗贯中,曹雪芹,施耐庵,吴承恩', answer: '曹雪芹' },
        { id: 6, question: '水的化学式是什么？', options: 'CO2,H2O,O2,NaCl', answer: 'H2O' },
        { id: 7, question: 'JavaScript 中 typeof null 返回什么？', options: 'null,undefined,object,number', answer: 'object' },
        { id: 8, question: '一年中白昼最长的节气是？', options: '春分,夏至,秋分,冬至', answer: '夏至' },
        { id: 9, question: '下列哪项是前端框架？', options: 'Django,Vue,Spring,Flask', answer: 'Vue' },
        { id: 10, question: '光在真空中的传播速度约为？', options: '3×10^5 km/s,3×10^3 km/s,1×10^6 km/s,3×10^7 km/s', answer: '3×10^5 km/s' },
        { id: 11, question: '中国的首都是哪座城市？', options: '上海,北京,广州,深圳', answer: '北京' },
        { id: 12, question: '下列哪个是关系型数据库？', options: 'MySQL,Redis,MongoDB,Memcached', answer: 'MySQL' }
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
