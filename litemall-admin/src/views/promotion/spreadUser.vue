<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.username" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户名"/>
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="用户ID" prop="id" sortable/>

      <el-table-column align="center" label="用户名" prop="nickname"/>

      <el-table-column align="center" label="手机号码" prop="mobile"/>

      <el-table-column align="center" label="性别" prop="gender">
        <template slot-scope="scope">
          <el-tag >{{ genderDic[scope.row.gender] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="生日" prop="birthday"/>

      <el-table-column align="center" label="分销等级" prop="userLevel">
        <template slot-scope="scope">
          <el-tag >Level{{ scope.row.level }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="当前佣金比例" prop="profitPertage">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.profitPertage }}%</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag>{{ statusDic[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/ad/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 修改对话框 -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名：" prop="nickname">
          <el-input v-model="dataForm.nickname" disabled/>
        </el-form-item>
        <el-form-item label="手机号码：" prop="mobile">
          <el-input v-model="dataForm.mobile" disabled/>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-input v-model="genderDic[dataForm.gender]" disabled/>
        </el-form-item>
        <el-form-item label="生日：" prop="birthday">
          <el-input v-model="dataForm.birthday" disabled/>
        </el-form-item>
        <el-form-item label="分销等级：" prop="level">
          <el-input v-model="dataForm.level" disabled/>
        </el-form-item>
        <el-form-item label="佣金比例：" prop="profitPertage">
          <el-input v-model="dataForm.profitPertage" type="number"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { spreadList, updateSpreadUser } from '@/api/spreaduser'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'User',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        nickname: undefined,
        mobile: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      downloadLoading: false,
      genderDic: ['未知', '男', '女'],
      statusDic: ['可用', '禁用', '注销'],
      dataForm: {
        id: undefined,
        nickname: undefined,
        mobile: undefined,
        gender: undefined,
        birthday: undefined,
        level: undefined,
        profitPertage: undefined,
        enabled: true
      },
      dialogStatus: '编辑分销用户',
      dialogFormVisible: false,
      rules: {
        profitPertage: [
          { required: true, message: '佣金比例不能为空', trigger: 'blur' },
          { validator: isPriceVlidator, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      spreadList(this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateSpreadUser(this.dataForm)
            .then(() => {
              for (const v of this.list) {
                if (v.id === this.dataForm.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.dataForm)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '编辑成功'
              })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleInput2(e) {
      // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
    },
    handleDownload() {
      this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                  const tHeader = ['用户名', '手机号码', '性别', '生日', '状态']
                  const filterVal = ['username', 'mobile', 'gender', 'birthday', 'status']
                  excel.export_json_to_excel2(tHeader, this.list, filterVal, '用户信息')
                  this.downloadLoading = false
                })
    }
  }
}
var isPriceVlidator = (rule, value, callback) => {
  var pattern = /^\d+.?\d{0,2}$/
  if (!pattern.test(value)) {
    return callback(new Error('最多输入两位小数'))
  } else return callback()
}
</script>
<style>
  /** 去除input输入框样式 */
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
